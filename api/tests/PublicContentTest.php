<?php

declare(strict_types=1);

use App\Entity\BlogPost;
use App\Entity\CaseStudy;
use App\Entity\ContactSubmission;
use App\Entity\FeedbackForm;
use App\Entity\UploadedFile;
use App\Repository\BlogPostRepository;
use App\Repository\CaseStudyRepository;
use App\Repository\ContactSubmissionRepository;
use App\Repository\FeedbackFormRepository;
use App\Repository\UploadedFileRepository;
use App\Service\BlogPostService;
use App\Service\CaseStudyService;
use App\Service\ContactNotifier;
use App\Service\ContactService;
use App\Service\FeedbackFormService;
use App\Service\UploadService;
use App\Support\ApiException;
use App\Support\ValidationException;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\Configuration;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\Driver\AttributeDriver;
use Doctrine\ORM\Tools\SchemaTool;
use Monolog\Handler\NullHandler;
use Monolog\Logger;
use Slim\Psr7\UploadedFile as SlimUploadedFile;

require dirname(__DIR__) . '/vendor/autoload.php';

$root = dirname(__DIR__);
$proxyDir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'mir-talal-test-' . bin2hex(random_bytes(8));
if (!mkdir($proxyDir, 0700) && !is_dir($proxyDir)) {
    throw new RuntimeException('Unable to create the Doctrine test proxy directory.');
}
$config = new Configuration();
$config->setMetadataDriverImpl(new AttributeDriver([$root . '/src/Entity']));
$config->setProxyDir($proxyDir);
$config->setProxyNamespace('App\\Tests\\DoctrineProxies');
$config->setAutoGenerateProxyClasses(false);
$em = new EntityManager(
    DriverManager::getConnection(['driver' => 'pdo_sqlite', 'memory' => true]),
    $config,
);

$classes = array_map(
    static fn (string $class) => $em->getClassMetadata($class),
    [BlogPost::class, CaseStudy::class, ContactSubmission::class, FeedbackForm::class, UploadedFile::class],
);
(new SchemaTool($em))->createSchema($classes);

$assert = static function (bool $condition, string $message): void {
    if (!$condition) {
        throw new RuntimeException($message);
    }
};

$blogRepository = new BlogPostRepository($em);
$blogService = new BlogPostService($blogRepository);
$publishedBlog = new BlogPost('public-article');
$publishedBlog->setTitle('Public article');
$publishedBlog->setBody('This is a sufficiently long article body.');
$publishedBlog->setCategory('Engineering');
$publishedBlog->setStatus(BlogPost::STATUS_PUBLISHED);
$publishedBlog->setIsPublished(true);
$draftBlog = new BlogPost('draft-article');
$draftBlog->setTitle('Draft article');
$draftBlog->setBody('This is a sufficiently long unpublished article.');
$draftBlog->setCategory('Engineering');
$draftBlog->setStatus(BlogPost::STATUS_DRAFT);
$draftBlog->setIsPublished(false);
$mismatchedBlog = new BlogPost('mismatched-article');
$mismatchedBlog->setTitle('Mismatched article');
$mismatchedBlog->setBody('This is a sufficiently long unpublished article.');
$mismatchedBlog->setCategory('Engineering');
$mismatchedBlog->setStatus(BlogPost::STATUS_DRAFT);
$mismatchedBlog->setIsPublished(true);
$em->persist($publishedBlog);
$em->persist($draftBlog);
$em->persist($mismatchedBlog);
$em->flush();
$assert(count($blogService->publicList()) === 1, 'Blog public list must include only published records.');
$assert($blogService->getBySlug('public-article')->getSlug() === 'public-article', 'Published blog detail should resolve.');
try {
    $blogService->getBySlug('draft-article');
    throw new RuntimeException('Draft blog details must not be public.');
} catch (ApiException) {
}
try {
    $blogService->getBySlug('mismatched-article');
    throw new RuntimeException('A draft marked published must not be public.');
} catch (ApiException) {
}

$caseRepository = new CaseStudyRepository($em);
$caseService = new CaseStudyService($caseRepository);
$publishedCase = new CaseStudy('public-case-study');
$publishedCase->setTitle('Public case study');
$publishedCase->setBody('This is a sufficiently long case study description.');
$publishedCase->setProjectType('Web');
$publishedCase->setStatus(CaseStudy::STATUS_PUBLISHED);
$publishedCase->setIsPublished(true);
$draftCase = new CaseStudy('draft-case-study');
$draftCase->setTitle('Draft case study');
$draftCase->setBody('This is a sufficiently long unpublished case study.');
$draftCase->setProjectType('Web');
$draftCase->setStatus(CaseStudy::STATUS_DRAFT);
$draftCase->setIsPublished(false);
$mismatchedCase = new CaseStudy('mismatched-case-study');
$mismatchedCase->setTitle('Mismatched case study');
$mismatchedCase->setBody('This is a sufficiently long unpublished case study.');
$mismatchedCase->setProjectType('Web');
$mismatchedCase->setStatus(CaseStudy::STATUS_DRAFT);
$mismatchedCase->setIsPublished(true);
$em->persist($publishedCase);
$em->persist($draftCase);
$em->persist($mismatchedCase);
$em->flush();
$assert(count($caseService->publicList()) === 1, 'Case-study public list must include only published records.');
$assert($caseService->getBySlug('public-case-study')->getSlug() === 'public-case-study', 'Published case-study detail should resolve.');
try {
    $caseService->getBySlug('draft-case-study');
    throw new RuntimeException('Draft case-study details must not be public.');
} catch (ApiException) {
}
try {
    $caseService->getBySlug('mismatched-case-study');
    throw new RuntimeException('A draft marked published must not be public.');
} catch (ApiException) {
}

$feedbackRepository = new FeedbackFormRepository($em);
$feedbackService = new FeedbackFormService($feedbackRepository);
$feedback = new FeedbackForm();
$feedback->setAuthor('Public reviewer');
$feedback->setMessage('A public testimonial message.');
$feedback->setEmail('private@example.test');
$feedback->setNotes('Private moderation note.');
$feedback->setStatus(FeedbackForm::STATUS_APPROVED);
$em->persist($feedback);
$em->flush();
$publicFeedback = $feedbackService->approved(12);
$assert(count($publicFeedback) === 1, 'Approved feedback should be returned.');
$assert(!array_key_exists('email', $publicFeedback[0]), 'Public feedback must not expose email.');
$assert(!array_key_exists('notes', $publicFeedback[0]), 'Public feedback must not expose moderation notes.');

$uploadDir = $root . '/public/uploads';
$createdUploadDir = !is_dir($uploadDir);
if ($createdUploadDir && !mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
    throw new RuntimeException('Unable to create the upload test directory.');
}
$uploadRepository = new UploadedFileRepository($em);
$logger = new Logger('upload-test');
$logger->pushHandler(new NullHandler());
$contactService = new ContactService(new ContactSubmissionRepository($em), new ContactNotifier($logger));
try {
    $contactService->submit([
        'fullName' => 'A',
        'email' => 'not-an-email',
        'projectType' => '',
        'message' => 'short',
    ], '', '');
    throw new RuntimeException('Invalid contact submissions must be rejected.');
} catch (ValidationException $exception) {
    $errors = $exception->getErrors();
    $assert(isset($errors['fullName'], $errors['email'], $errors['projectType'], $errors['message']), 'Contact validation should reject invalid required fields.');
}

$uploadService = new UploadService($uploadRepository, $logger);
$temporaryFiles = [];
$makeImageUpload = static function (string $clientFilename, int $width = 2) use (&$temporaryFiles): SlimUploadedFile {
    $path = tempnam(sys_get_temp_dir(), 'mir-upload-test-');
    if ($path === false) {
        throw new RuntimeException('Unable to create a temporary upload.');
    }
    $temporaryFiles[] = $path;
    $image = imagecreatetruecolor($width, 2);
    if ($image === false || !imagepng($image, $path)) {
        throw new RuntimeException('Unable to create the test image.');
    }
    imagedestroy($image);
    return new SlimUploadedFile($path, $clientFilename, 'image/png', filesize($path), UPLOAD_ERR_OK, false);
};
$uploadData = static fn (string $filename): array => [
    'originalFilename' => $filename,
];
$uploadedFiles = static fn (SlimUploadedFile $file): array => [
    'companyLogo' => [$file],
];

$firstUpload = $uploadService->store($uploadData('first.png'), $uploadedFiles($makeImageUpload('first.png')), 'blog_post', 42);
$firstPath = $root . '/public/' . $firstUpload->getRelativePath();
$assert(is_file($firstPath), 'Uploaded file should be present on disk.');
$replacement = $uploadService->replace($uploadData('replacement.png'), $uploadedFiles($makeImageUpload('replacement.png')), 'blog_post', 42);
$replacementPath = $root . '/public/' . $replacement->getRelativePath();
$assert(!is_file($firstPath), 'Replacing an attachment should delete the old file.');
$assert(is_file($replacementPath), 'Replacement file should remain on disk.');

$unattached = $uploadService->store($uploadData('unattached.png'), $uploadedFiles($makeImageUpload('unattached.png')), 'blog_post');
$unattachedPath = $root . '/public/' . $unattached->getRelativePath();
$uploadService->attach((int) $unattached->getId(), 'blog_post', 42);
$assert(!is_file($replacementPath), 'Attaching a replacement should remove the previous attachment.');
$uploadService->detach((int) $unattached->getId());
$assert($uploadService->deleteUnattached(0) === 1, 'Unattached cleanup should remove the detached file.');
$assert(!is_file($unattachedPath), 'Unattached cleanup should remove the physical file.');

$badExtension = $makeImageUpload('payload.php');
try {
    $uploadService->store($uploadData('payload.php'), $uploadedFiles($badExtension), 'blog_post');
    throw new RuntimeException('A mismatched upload extension must be rejected.');
} catch (\App\Support\ValidationException) {
}

$oversizedImage = $makeImageUpload('oversized.png', 8001);
try {
    $uploadService->store($uploadData('oversized.png'), $uploadedFiles($oversizedImage), 'blog_post');
    throw new RuntimeException('An oversized image must be rejected.');
} catch (\App\Support\ValidationException) {
}

$invalidImagePath = tempnam(sys_get_temp_dir(), 'mir-invalid-upload-');
if ($invalidImagePath === false) {
    throw new RuntimeException('Unable to create an invalid upload fixture.');
}
$temporaryFiles[] = $invalidImagePath;
file_put_contents($invalidImagePath, 'not an image');
try {
    $invalidImage = new SlimUploadedFile($invalidImagePath, 'not-image.png', 'image/png', filesize($invalidImagePath), UPLOAD_ERR_OK, false);
    $uploadService->store($uploadData('not-image.png'), $uploadedFiles($invalidImage), 'blog_post');
    throw new RuntimeException('Invalid image content must be rejected.');
} catch (\App\Support\ValidationException) {
}

$outsidePath = $root . '/public/upload-path-traversal-test.txt';
file_put_contents($outsidePath, 'keep');
$unsafeFile = new UploadedFile();
$unsafeFile->setRelativePath('uploads/../upload-path-traversal-test.txt');
$uploadRepository->save($unsafeFile);
try {
    $uploadService->delete((int) $unsafeFile->getId());
    throw new RuntimeException('Path traversal in stored file paths must be rejected.');
} catch (ApiException) {
}
$assert(is_file($outsidePath), 'Path traversal must not delete files outside the upload directory.');
unlink($outsidePath);

foreach ($temporaryFiles as $temporaryFile) {
    if (is_file($temporaryFile)) {
        unlink($temporaryFile);
    }
}
if ($createdUploadDir && is_dir($uploadDir) && count(scandir($uploadDir) ?: []) === 2) {
    rmdir($uploadDir);
}

$em->close();
rmdir($proxyDir);
echo "Public content tests passed.\n";
