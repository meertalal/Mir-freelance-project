<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\FeedbackForm;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;

final class FeedbackFormRepository
{
    public function __construct(private readonly EntityManagerInterface $em) {}

    public function find(int $id): ?FeedbackForm
    {
        return $this->em->find(FeedbackForm::class, $id);
    }

    /** @return list<FeedbackForm> */
    public function all(?string $status = null, int $limit = 100): array
    {
        $qb = $this->em->createQueryBuilder()
            ->select('f')
            ->from(FeedbackForm::class, 'f')
            ->addOrderBy('f.createdAt', 'DESC')
            ->setMaxResults($limit);

        if ($status !== null) {
            $qb->andWhere('f.status = :status')->setParameter('status', $status);
        }

        return $qb->getQuery()->getResult();
    }

    /** @return list<FeedbackForm> */
    public function findApproved(int $limit = 100): array
    {
        $qb = $this->em->createQueryBuilder()
            ->select('f')
            ->from(FeedbackForm::class, 'f')
            ->where('f.status = :status')
            ->setParameter('status', FeedbackForm::STATUS_APPROVED)
            ->addOrderBy('f.createdAt', 'DESC')
            ->setMaxResults($limit);

        return $qb->getQuery()->getResult();
    }

    /** @return list<FeedbackForm> */
    public function findPending(): array
    {
        return $this->em->getRepository(FeedbackForm::class)->findBy([
            'status' => FeedbackForm::STATUS_NEW,
        ], ['createdAt' => 'ASC']);
    }

    /** @return array<string, int> */
    public function statusCounts(): array
    {
        $rows = $this->em->createQueryBuilder()
            ->select('f.status AS status', 'COUNT(f.id) AS total')
            ->from(FeedbackForm::class, 'f')
            ->groupBy('f.status')
            ->getQuery()
            ->getArrayResult();

        $counts = array_fill_keys(FeedbackForm::STATUSES, 0);

        foreach ($rows as $row) {
            $counts[$row['status']] = (int) $row['total'];
        }

        return $counts;
    }

    public function nextSortOrder(): int
    {
        $max = $this->em->createQueryBuilder()
            ->select('MAX(f.id)')
            ->from(FeedbackForm::class, 'f')
            ->getQuery()
            ->getSingleScalarResult();

        return $max === null ? 0 : ((int) $max) + 10;
    }

    public function save(FeedbackForm $feedback): void
    {
        $this->em->persist($feedback);
        $this->em->flush();
    }

    public function remove(FeedbackForm $feedback): void
    {
        $this->em->remove($feedback);
        $this->em->flush();
    }

    public function markReviewed(int $id, int $reviewedBy, string $notes = ''): FeedbackForm
    {
        $feedback = $this->find($id);
        if ($feedback === null) {
            throw new \App\Support\ApiException('Feedback not found.', 404);
        }

        $now = new DateTimeImmutable();

        $feedback->setReviewedBy($reviewedBy);
        $feedback->setReviewedAt($now);
        $feedback->setNotes($notes);
        $feedback->setStatus(FeedbackForm::STATUS_REVIEWED);
        $feedback->touch();
        $this->save($feedback);

        return $feedback;
    }

    public function approve(int $id, int $reviewedBy, string $notes = ''): FeedbackForm
    {
        $feedback = $this->find($id);
        if ($feedback === null) {
            throw new \App\Support\ApiException('Feedback not found.', 404);
        }

        $now = new DateTimeImmutable();

        $feedback->setReviewedBy($reviewedBy);
        $feedback->setReviewedAt($now);
        $feedback->setNotes($notes);
        $feedback->setStatus(FeedbackForm::STATUS_APPROVED);
        $feedback->touch();
        $this->save($feedback);

        return $feedback;
    }

    public function reject(int $id, int $reviewedBy, string $notes = ''): FeedbackForm
    {
        $feedback = $this->find($id);
        if ($feedback === null) {
            throw new \App\Support\ApiException('Feedback not found.', 404);
        }

        $now = new DateTimeImmutable();

        $feedback->setReviewedBy($reviewedBy);
        $feedback->setReviewedAt($now);
        $feedback->setNotes($notes);
        $feedback->setStatus(FeedbackForm::STATUS_REJECTED);
        $feedback->touch();
        $this->save($feedback);

        return $feedback;
    }
}
