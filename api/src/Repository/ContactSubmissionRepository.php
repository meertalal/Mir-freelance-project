<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\ContactSubmission;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;

final class ContactSubmissionRepository
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    public function save(ContactSubmission $submission): void
    {
        $this->em->persist($submission);
        $this->em->flush();
    }

    public function find(int $id, bool $includeDeleted = false): ?ContactSubmission
    {
        $qb = $this->em->createQueryBuilder()
            ->select('s')
            ->from(ContactSubmission::class, 's')
            ->where('s.id = :id')
            ->setParameter('id', $id);

        if (!$includeDeleted) {
            $qb->andWhere('s.deletedAt IS NULL');
        }

        /** @var ContactSubmission|null $submission */
        $submission = $qb->getQuery()->getOneOrNullResult();

        return $submission;
    }

    /**
     * @return array{items: list<ContactSubmission>, total: int, page: int, per_page: int, pages: int}
     */
    public function paginate(
        int $page,
        int $perPage,
        ?string $status = null,
        ?string $search = null,
        bool $includeDeleted = false,
    ): array {
        $qb = $this->em->createQueryBuilder()
            ->select('s')
            ->from(ContactSubmission::class, 's')
            ->orderBy('s.createdAt', 'DESC');

        if (!$includeDeleted) {
            $qb->andWhere('s.deletedAt IS NULL');
        }

        if ($status !== null) {
            $qb->andWhere('s.status = :status')->setParameter('status', $status);
        }

        if ($search !== null && trim($search) !== '') {
            $qb->andWhere(
                's.fullName LIKE :search OR s.email LIKE :search OR s.company LIKE :search'
                . ' OR s.subject LIKE :search OR s.message LIKE :search OR s.country LIKE :search'
                . ' OR s.phone LIKE :search',
            )->setParameter('search', '%' . trim($search) . '%');
        }

        $qb->setFirstResult(($page - 1) * $perPage)->setMaxResults($perPage);

        $paginator = new Paginator($qb, fetchJoinCollection: false);
        $total = count($paginator);

        /** @var list<ContactSubmission> $items */
        $items = iterator_to_array($paginator, false);

        return [
            'items' => $items,
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage,
            'pages' => $perPage > 0 ? (int) ceil($total / $perPage) : 0,
        ];
    }

    /**
     * @return array<string, int>
     */
    public function statusCounts(): array
    {
        /** @var list<array{status: string, total: int|string}> $rows */
        $rows = $this->em->createQueryBuilder()
            ->select('s.status AS status', 'COUNT(s.id) AS total')
            ->from(ContactSubmission::class, 's')
            ->where('s.deletedAt IS NULL')
            ->groupBy('s.status')
            ->getQuery()
            ->getArrayResult();

        $counts = [
            ContactSubmission::STATUS_NEW => 0,
            ContactSubmission::STATUS_READ => 0,
            ContactSubmission::STATUS_ARCHIVED => 0,
        ];

        foreach ($rows as $row) {
            $counts[$row['status']] = (int) $row['total'];
        }

        return $counts;
    }

    public function countRecentByIp(string $ipAddress, \DateTimeImmutable $since): int
    {
        if ($ipAddress === '') {
            return 0;
        }

        return (int) $this->em->createQueryBuilder()
            ->select('COUNT(s.id)')
            ->from(ContactSubmission::class, 's')
            ->where('s.ipAddress = :ip')
            ->andWhere('s.createdAt >= :since')
            ->setParameter('ip', $ipAddress)
            ->setParameter('since', $since)
            ->getQuery()
            ->getSingleScalarResult();
    }
}
