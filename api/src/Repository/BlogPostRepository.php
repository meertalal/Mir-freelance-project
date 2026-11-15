<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\BlogPost;
use Doctrine\ORM\EntityManagerInterface;

final class BlogPostRepository
{
    public function __construct(private readonly EntityManagerInterface $em) {}

    public function find(int $id): ?BlogPost
    {
        return $this->em->find(BlogPost::class, $id);
    }

    public function findBySlug(string $slug): ?BlogPost
    {
        return $this->em->getRepository(BlogPost::class)->findOneBy(['slug' => $slug]);
    }

    /** @return list<BlogPost> */
    public function all(bool $publishedOnly = false): array
    {
        $qb = $this->em->createQueryBuilder()
            ->select('b')
            ->from(BlogPost::class, 'b')
            ->addOrderBy('b.sortOrder', 'ASC')
            ->addOrderBy('b.createdAt', 'DESC');

        if ($publishedOnly) {
            $qb->andWhere('b.isPublished = true');
        }

        return $qb->getQuery()->getResult();
    }

    /**
     * @return array<string, int>
     */
    public function statusCounts(): array
    {
        $rows = $this->em->createQueryBuilder()
            ->select('b.status AS status', 'COUNT(b.id) AS total')
            ->from(BlogPost::class, 'b')
            ->groupBy('b.status')
            ->getQuery()
            ->getArrayResult();

        $counts = [
            BlogPost::STATUS_DRAFT => 0,
            BlogPost::STATUS_PUBLISHED => 0,
        ];

        foreach ($rows as $row) {
            $counts[$row['status']] = (int) $row['total'];
        }

        return $counts;
    }

    /** @return list<string> */
    public function categories(): array
    {
        $rows = $this->em->createQueryBuilder()
            ->select('DISTINCT b.category AS category')
            ->from(BlogPost::class, 'b')
            ->where('b.category <> \'\'')
            ->orderBy('b.category', 'ASC')
            ->getQuery()
            ->getArrayResult();

        return array_map(static fn (array $r): string => $r['category'], $rows);
    }

    public function nextSortOrder(): int
    {
        $max = $this->em->createQueryBuilder()
            ->select('MAX(b.sortOrder)')
            ->from(BlogPost::class, 'b')
            ->getQuery()
            ->getSingleScalarResult();

        return $max === null ? 0 : ((int) $max) + 10;
    }

    public function save(BlogPost $blogPost): void
    {
        $this->em->persist($blogPost);
        $this->em->flush();
    }

    public function remove(BlogPost $blogPost): void
    {
        $this->em->remove($blogPost);
        $this->em->flush();
    }
}
