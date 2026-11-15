<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Service;
use Doctrine\ORM\EntityManagerInterface;

final class ServiceRepository
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    public function find(int $id): ?Service
    {
        return $this->em->find(Service::class, $id);
    }

    public function findBySlug(string $slug): ?Service
    {
        return $this->em->getRepository(Service::class)->findOneBy(['slug' => $slug]);
    }

    /**
     * @return list<Service>
     */
    public function all(bool $publishedOnly = false): array
    {
        $qb = $this->em->createQueryBuilder()
            ->select('s')
            ->from(Service::class, 's')
            ->orderBy('s.sortOrder', 'ASC')
            ->addOrderBy('s.id', 'ASC');

        if ($publishedOnly) {
            $qb->andWhere('s.isPublished = true');
        }

        /** @var list<Service> $services */
        $services = $qb->getQuery()->getResult();

        return $services;
    }

    public function nextSortOrder(): int
    {
        $max = $this->em->createQueryBuilder()
            ->select('MAX(s.sortOrder)')
            ->from(Service::class, 's')
            ->getQuery()
            ->getSingleScalarResult();

        return $max === null ? 0 : ((int) $max) + 10;
    }

    public function save(Service $service): void
    {
        $this->em->persist($service);
        $this->em->flush();
    }

    public function remove(Service $service): void
    {
        $this->em->remove($service);
        $this->em->flush();
    }
}
