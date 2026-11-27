<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\CaseStudy;
use Doctrine\ORM\EntityManagerInterface;

final class CaseStudyRepository
{
    public function __construct(private readonly EntityManagerInterface $em) {}

    public function find(int $id): ?CaseStudy
    {
        return $this->em->find(CaseStudy::class, $id);
    }

    public function findBySlug(string $slug): ?CaseStudy
    {
        return $this->em->getRepository(CaseStudy::class)->findOneBy(['slug' => $slug]);
    }

    public function findPublishedBySlug(string $slug): ?CaseStudy
    {
        return $this->em->createQueryBuilder()
            ->select('c')
            ->from(CaseStudy::class, 'c')
            ->where('c.slug = :slug')
            ->andWhere('c.isPublished = true')
            ->andWhere('c.status = :status')
            ->setParameter('slug', $slug)
            ->setParameter('status', CaseStudy::STATUS_PUBLISHED)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /** @return list<CaseStudy> */
    public function all(bool $publishedOnly = false): array
    {
        $qb = $this->em->createQueryBuilder()
            ->select('c')
            ->from(CaseStudy::class, 'c')
            ->addOrderBy('c.sortOrder', 'ASC')
            ->addOrderBy('c.id', 'ASC');

        if ($publishedOnly) {
            $qb->andWhere('c.isPublished = true')
                ->andWhere('c.status = :publishedStatus')
                ->setParameter('publishedStatus', CaseStudy::STATUS_PUBLISHED);
        }

        return $qb->getQuery()->getResult();
    }

    /**
     * @return array<string, int>
     */
    public function statusCounts(): array
    {
        $rows = $this->em->createQueryBuilder()
            ->select('c.status AS status', 'COUNT(c.id) AS total')
            ->from(CaseStudy::class, 'c')
            ->groupBy('c.status')
            ->getQuery()
            ->getArrayResult();

        $counts = [
            CaseStudy::STATUS_DRAFT => 0,
            CaseStudy::STATUS_PUBLISHED => 0,
        ];

        foreach ($rows as $row) {
            $counts[$row['status']] = (int) $row['total'];
        }

        return $counts;
    }

    public function nextSortOrder(): int
    {
        $max = $this->em->createQueryBuilder()
            ->select('MAX(c.sortOrder)')
            ->from(CaseStudy::class, 'c')
            ->getQuery()
            ->getSingleScalarResult();

        return $max === null ? 0 : ((int) $max) + 10;
    }

    public function save(CaseStudy $caseStudy): void
    {
        $this->em->persist($caseStudy);
        $this->em->flush();
    }

    public function remove(CaseStudy $caseStudy): void
    {
        $this->em->remove($caseStudy);
        $this->em->flush();
    }
}
