<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\UploadedFile;
use Doctrine\ORM\EntityManagerInterface;

final class UploadedFileRepository
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    public function find(int $id): ?UploadedFile
    {
        return $this->em->find(UploadedFile::class, $id);
    }

    /**
     * @return list<UploadedFile>
     */
    public function findByUploadable(string $uploadableType, ?int $uploadableId): array
    {
        return $this->em->getRepository(UploadedFile::class)->findBy([
            UploadedFile::UPLOADABLE_TYPE_FIELD => $uploadableType,
            UploadedFile::UPLOADABLE_ID_FIELD => $uploadableId,
        ]);
    }

    /**
     * @return list<UploadedFile>
     */
    public function findUnattached(int $limit = 100): array
    {
        return $this->em->getRepository(UploadedFile::class)->findBy([
            UploadedFile::UPLOADABLE_TYPE_FIELD => '',
            UploadedFile::UPLOADABLE_ID_FIELD => null,
        ], ['createdAt' => 'DESC'], $limit);
    }

    public function save(UploadedFile $file): void
    {
        $this->em->persist($file);
        $this->em->flush();
    }

    public function remove(UploadedFile $file): void
    {
        $this->em->remove($file);
        $this->em->flush();
    }
}
