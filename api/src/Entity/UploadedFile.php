<?php

declare(strict_types=1);

namespace App\Entity;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'uploaded_files')]
#[ORM\Index(name: 'idx_uploaded_files_uploadable_type', columns: ['uploadable_type'])]
#[ORM\Index(name: 'idx_uploaded_files_uploadable_id', columns: ['uploadable_id'])]
#[ORM\Index(name: 'idx_uploaded_files_created_at', columns: ['created_at'])]
#[ORM\HasLifecycleCallbacks]
class UploadedFile
{
    public const RELATIVE_PATH = 'avatar';
    public const ORIGINAL_FILENAME = 'companyLogo';
    public const MIME_TYPE = 'mimeType';
    public const SIZE_BYTES = 'sizeBytes';
    public const UPLOADABLE_TYPE = 'uploadableType';
    public const UPLOADABLE_ID = 'uploadableId';
    public const UPLOADABLE_TYPE_FIELD = 'uploadableType';
    public const UPLOADABLE_ID_FIELD = 'uploadableId';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    private string $relativePath = '';

    #[ORM\Column(type: 'string', length: 255, options: ['default' => ''])]
    private string $originalFilename = '';

    #[ORM\Column(type: 'string', length: 120, options: ['default' => ''])]
    private string $mimeType = '';

    #[ORM\Column(type: 'integer', options: ['default' => 0])]
    private int $sizeBytes = 0;

    #[ORM\Column(type: 'string', length: 40, options: ['default' => ''])]
    private string $uploadableType = '';

    #[ORM\Column(name: 'uploadable_id', type: 'integer', nullable: true)]
    private ?int $uploadableId = null;

    #[ORM\Column(name: 'created_at', type: 'datetime_immutable')]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetime_immutable')]
    private DateTimeImmutable $updatedAt;

    public function __construct()
    {
        $now = new DateTimeImmutable();
        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRelativePath(): string
    {
        return $this->relativePath;
    }

    public function setRelativePath(string $relativePath): void
    {
        $this->relativePath = $relativePath;
    }

    public function getOriginalFilename(): string
    {
        return $this->originalFilename;
    }

    public function setOriginalFilename(string $originalFilename): void
    {
        $this->originalFilename = $originalFilename;
    }

    public function getMimeType(): string
    {
        return $this->mimeType;
    }

    public function setMimeType(string $mimeType): void
    {
        $this->mimeType = $mimeType;
    }

    public function getSizeBytes(): int
    {
        return $this->sizeBytes;
    }

    public function setSizeBytes(int $sizeBytes): void
    {
        $this->sizeBytes = $sizeBytes;
    }

    public function getUploadableType(): string
    {
        return $this->uploadableType;
    }

    public function setUploadableType(string $uploadableType): void
    {
        $this->uploadableType = $uploadableType;
    }

    public function getUploadableId(): ?int
    {
        return $this->uploadableId;
    }

    public function setUploadableId(?int $uploadableId): void
    {
        $this->uploadableId = $uploadableId;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): DateTimeImmutable
    {
        return $this->updatedAt;
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new DateTimeImmutable();
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            self::RELATIVE_PATH => $this->relativePath,
            self::ORIGINAL_FILENAME => $this->originalFilename,
            self::MIME_TYPE => $this->mimeType,
            self::SIZE_BYTES => $this->sizeBytes,
            self::UPLOADABLE_TYPE => $this->uploadableType,
            self::UPLOADABLE_ID => $this->uploadableId,
            'created_at' => $this->createdAt->format(\DATE_ATOM),
            'updated_at' => $this->updatedAt->format(\DATE_ATOM),
        ];
    }
}
