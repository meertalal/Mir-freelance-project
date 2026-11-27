<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\UploadedFile;
use App\Repository\UploadedFileRepository;
use App\Support\ApiException;
use App\Support\Env;
use App\Support\ValidationException;
use Psr\Log\LoggerInterface;

final class UploadService
{
    public const UPLOADABLE_SERVICE = 'service';
    public const UPLOADABLE_TESTIMONIAL = 'testimonial';
    public const UPLOADABLE_CASESTUDY = 'case_study';
    public const UPLOADABLE_BLOGPOST = 'blog_post';
    public const UPLOADABLE_FEEDBACKFORM = 'feedback_form';
    public const UPLOADABLE_SITE_ASSET = 'site_asset';

    /** @var list<string> */
    public const ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
    ];

    /** @var list<string> */
    public const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    public const int DEFAULT_MAX_UPLOAD_BYTES = 5242880; // 5 MB

    private const array EXTENSION_FOR_MIME = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
    ];

    /** @var array<string, list<string>> */
    private const array EXTENSIONS_FOR_MIME = [
        'image/jpeg' => ['jpg', 'jpeg'],
        'image/png' => ['png'],
        'image/webp' => ['webp'],
        'image/gif' => ['gif'],
    ];

    private const int MAX_IMAGE_DIMENSION = 8000;
    private const int MAX_IMAGE_PIXELS = 20000000;

    public function __construct(
        private readonly UploadedFileRepository $files,
        private readonly LoggerInterface $logger,
    ) {
    }

    /**
     * @param array<string, mixed> $data Data from $request->getParsedBody()
     * @param array<string, array<int, Psr\Http\Message\UploadedFileInterface>> $uploadedFiles From $request->getUploadedFiles()
     * @param string $uploadableType One of self::UPLOADABLE_* constants
     * @param int|null $uploadableId Optional owning entity id to attach the file to
     * @return UploadedFile
     * @throws ApiException|ValidationException
     */
    public function store(
        array $data,
        array $uploadedFiles,
        string $uploadableType,
        ?int $uploadableId = null
    ): UploadedFile {
        $filenameValue = $data['originalFilename'] ?? 'file';
        $filename = is_scalar($filenameValue) ? (string) $filenameValue : 'file';
        if (mb_strlen($filename) > 255) {
            throw new ValidationException(['originalFilename' => 'Filename must be 255 characters or fewer.']);
        }
        $declaredExtension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

        $fieldFiles = $uploadedFiles['companyLogo'] ?? null;
        if ($fieldFiles === null || !is_array($fieldFiles) || count($fieldFiles) === 0) {
            throw new ValidationException([
                'field' => 'No file was uploaded for the requested field.',
            ]);
        }

        $uploadedFile = $fieldFiles[0] ?? null;
        if ($uploadedFile === null) {
            throw new ValidationException([
                'field' => 'No file was uploaded for the requested field.',
            ]);
        }

        $this->assertUploadedFile($uploadedFile);
        $this->enforceSizeLimit($uploadedFile);
        $mediaType = $this->detectMimeType($uploadedFile);
        $this->enforceLimits($mediaType, $declaredExtension);

        $extension = self::extForMimeType($mediaType);
        $safeName = $this->safeName($filename, $extension);
        $relativePath = 'uploads/' . $safeName;

        $targetPath = $this->targetDir() . '/' . $safeName;
        $this->ensureTargetDir();

        try {
            $uploadedFile->moveTo($targetPath);
        } catch (\Throwable $e) {
            $this->logger->error('File upload move failed.', [
                'exception' => $e,
                'original_filename' => $filename,
                'target_path' => $targetPath,
            ]);

            throw new ApiException('File upload failed. Please retry.', 500);
        }

        $file = new UploadedFile();
        $file->setRelativePath($relativePath);
        $file->setOriginalFilename($filename);
        $file->setMimeType($mediaType);
        $file->setSizeBytes($uploadedFile->getSize() ?: 0);
        $file->setUploadableType($uploadableType);
        $file->setUploadableId($uploadableId);
        try {
            $this->files->save($file);
        } catch (\Throwable $e) {
            if (is_file($targetPath) && !unlink($targetPath)) {
                $this->logger->error('Failed to remove uploaded file after database save failed.', [
                    'target_path' => $targetPath,
                    'exception' => $e,
                ]);
            }

            throw $e;
        }

        return $file;
    }

    /**
     * @param array<string, mixed> $data
     * @param array<string, array<int, Psr\Http\Message\UploadedFileInterface>> $uploadedFiles
     * @param string $uploadableType
     * @param int $uploadableId
     * @return UploadedFile
     */
    public function replace(
        array $data,
        array $uploadedFiles,
        string $uploadableType,
        int $uploadableId
    ): UploadedFile {
        $replacement = $this->store($data, $uploadedFiles, $uploadableType, $uploadableId);

        foreach ($this->files->findByUploadable($uploadableType, $uploadableId) as $existing) {
            if ($existing->getId() === $replacement->getId()) {
                continue;
            }

            $this->deleteFile($existing);
            $this->files->remove($existing);
        }

        return $replacement;
    }

    public function attach(int $fileId, string $uploadableType, int $uploadableId): UploadedFile
    {
        $file = $this->files->find($fileId);
        if ($file === null) {
            throw new ApiException('File not found.', 404);
        }

        foreach ($this->files->findByUploadable($uploadableType, $uploadableId) as $existing) {
            if ($existing->getId() === $file->getId()) {
                continue;
            }

            $this->deleteFile($existing);
            $this->files->remove($existing);
        }

        $file->setUploadableType($uploadableType);
        $file->setUploadableId($uploadableId);
        $this->files->save($file);

        return $file;
    }

    public function detach(int $fileId): UploadedFile
    {
        $file = $this->files->find($fileId);
        if ($file === null) {
            throw new ApiException('File not found.', 404);
        }

        $file->setUploadableType('');
        $file->setUploadableId(null);
        $this->files->save($file);

        return $file;
    }

    public function delete(int $fileId): void
    {
        $file = $this->files->find($fileId);
        if ($file === null) {
            throw new ApiException('File not found.', 404);
        }

        $this->deleteFile($file);
        $this->files->remove($file);
    }

    public function deleteUnattached(int $olderThanDays = 7): int
    {
        $cutOff = new \DateTimeImmutable("-{$olderThanDays} days");
        $files = $this->files->findUnattached(1000);
        $deleted = 0;

        foreach ($files as $file) {
            if ($file->getCreatedAt() < $cutOff) {
                $this->deleteFile($file);
                $this->files->remove($file);
                $deleted++;
            }
        }

        return $deleted;
    }

    /** @throws ValidationException */
    private function assertUploadedFile(mixed $uploadedFile): void
    {
        if (!($uploadedFile instanceof \Slim\Psr7\UploadedFile)) {
            throw new ValidationException([
                'field' => 'The uploaded file is not a valid uploaded file.',
            ]);
        }

        $error = $uploadedFile->getError();
        if ($error !== UPLOAD_ERR_OK) {
            $messages = [
                UPLOAD_ERR_INI_SIZE => 'The uploaded file exceeds the server limit.',
                UPLOAD_ERR_FORM_SIZE => 'The uploaded file exceeds the form limit.',
                UPLOAD_ERR_PARTIAL => 'The uploaded file was only partially uploaded.',
                UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
                UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder.',
                UPLOAD_ERR_CANT_WRITE => 'Failed to write the uploaded file to disk.',
                UPLOAD_ERR_EXTENSION => 'A PHP extension stopped the upload.',
            ];
            $message = $messages[$error] ?? 'The uploaded file could not be processed.';

            throw new ValidationException([
                'field' => $message,
            ]);
        }
    }

    /** @throws ValidationException */
    private function enforceLimits(string $declaredMimeType, string $declaredExtension): void
    {
        $detectedExtension = self::extForMimeType($declaredMimeType);
        if (!in_array($declaredMimeType, self::ALLOWED_MIME_TYPES, true)
            || !in_array($declaredExtension, self::EXTENSIONS_FOR_MIME[$declaredMimeType] ?? [], true)) {
            throw new ValidationException([
                'field' => 'The file extension must match a supported image format.',
            ]);
        }

        if (!in_array($detectedExtension, self::ALLOWED_EXTENSIONS, true)) {
            throw new ValidationException(['field' => 'This file type is not allowed.']);
        }
    }

    private function enforceSizeLimit(\Slim\Psr7\UploadedFile $uploadedFile): void
    {
        $maxBytes = $this->maxUploadBytes();
        if ($uploadedFile->getSize() > $maxBytes) {
            throw new ValidationException([
                'field' => "The uploaded file is too large. Maximum size is {$this->humanSize($maxBytes)}.",
            ]);
        }
    }

    private function detectMimeType(\Slim\Psr7\UploadedFile $uploadedFile): string
    {
        $stream = $uploadedFile->getStream();
        $uri = $stream->getMetadata('uri');
        $imageInfo = false;

        if (is_string($uri) && is_file($uri)) {
            $mimeType = (new \finfo(FILEINFO_MIME_TYPE))->file($uri);
            $imageInfo = @getimagesize($uri);
        } else {
            if (!$stream->isSeekable()) {
                throw new ValidationException(['field' => 'The uploaded image could not be inspected.']);
            }
            $stream->rewind();
            $contents = $stream->getContents();
            $stream->rewind();
            $mimeType = (new \finfo(FILEINFO_MIME_TYPE))->buffer($contents);
            $imageInfo = @getimagesizefromstring($contents);
            unset($contents);
        }

        if (!is_string($mimeType)
            || !in_array($mimeType, self::ALLOWED_MIME_TYPES, true)
            || !is_array($imageInfo)
            || ($imageInfo['mime'] ?? null) !== $mimeType) {
            throw new ValidationException(['field' => 'The uploaded file must contain a valid JPEG, PNG, WebP, or GIF image.']);
        }

        $width = (int) ($imageInfo[0] ?? 0);
        $height = (int) ($imageInfo[1] ?? 0);
        if ($width < 1 || $height < 1
            || $width > self::MAX_IMAGE_DIMENSION
            || $height > self::MAX_IMAGE_DIMENSION
            || $width > intdiv(self::MAX_IMAGE_PIXELS, $height)) {
            throw new ValidationException(['field' => 'The uploaded image dimensions are too large.']);
        }

        return $mimeType;
    }

    private function maxUploadBytes(): int
    {
        $bytes = (int) (Env::get('MAX_UPLOAD_BYTES', (string) self::DEFAULT_MAX_UPLOAD_BYTES) ?: (string) self::DEFAULT_MAX_UPLOAD_BYTES);

        return max(1024, min($bytes, 52428800));
    }

    private function humanSize(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }

        return round($bytes, 1) . ' ' . $units[$i];
    }

    private function safeName(string $originalFilename, string $extension): string
    {
        $base = preg_replace('/[^a-zA-Z0-9._-]/', '', pathinfo($originalFilename, PATHINFO_FILENAME));
        if ($base === '') {
            $base = 'file';
        }

        $ext = $extension !== '' ? $extension : 'jpg';

        return $base . '-' . bin2hex(random_bytes(8)) . '.' . $ext;
    }

    private function targetDir(): string
    {
        return \dirname(__DIR__, 2) . '/public/uploads';
    }

    private function ensureTargetDir(): void
    {
        $dir = $this->targetDir();

        if (!is_dir($dir)) {
            if (!mkdir($dir, 0775, true) && !is_dir($dir)) {
                throw new ApiException('Unable to create upload directory.', 500);
            }
        }
    }

    private function deleteFile(UploadedFile $file): void
    {
        $relativePath = str_replace('\\', '/', $file->getRelativePath());
        if (!str_starts_with($relativePath, 'uploads/')
            || basename($relativePath) !== substr($relativePath, strlen('uploads/'))) {
            throw new ApiException('Stored upload path is invalid.', 500);
        }

        $uploadDir = realpath($this->targetDir());
        if ($uploadDir === false) {
            return;
        }

        $path = realpath($uploadDir . DIRECTORY_SEPARATOR . basename($relativePath));
        if ($path === false) {
            return;
        }

        $prefix = $uploadDir . DIRECTORY_SEPARATOR;
        if (!str_starts_with(strtolower($path), strtolower($prefix))) {
            throw new ApiException('Stored upload path is outside the upload directory.', 500);
        }

        if (is_file($path) && !unlink($path)) {
            $this->logger->error('Failed to delete uploaded file from disk.', [
                'path' => $path,
                'file_id' => $file->getId(),
            ]);
            throw new ApiException('Could not delete the stored upload. Please retry.', 500);
        }
    }

    private static function extForMimeType(string $mimeType): string
    {
        return self::EXTENSION_FOR_MIME[$mimeType] ?? '';
    }
}
