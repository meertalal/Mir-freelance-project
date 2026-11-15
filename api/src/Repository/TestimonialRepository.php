<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Testimonial;
use Doctrine\ORM\EntityManagerInterface;

final class TestimonialRepository
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    public function find(int $id): ?Testimonial
    {
        return $this->em->find(Testimonial::class, $id);
    }

    /**
     * @return list<Testimonial>
     */
    public function all(bool $publishedOnly = false): array
    {
        $qb = $this->em->createQueryBuilder()
            ->select('t')
            ->from(Testimonial::class, 't')
            ->orderBy('t.sortOrder', 'ASC')
            ->addOrderBy('t.id', 'ASC');

        if ($publishedOnly) {
            $qb->andWhere('t.isPublished = true');
        }

        /** @var list<Testimonial> $testimonials */
        $testimonials = $qb->getQuery()->getResult();

        return $testimonials;
    }

    public function nextSortOrder(): int
    {
        $max = $this->em->createQueryBuilder()
            ->select('MAX(t.sortOrder)')
            ->from(Testimonial::class, 't')
            ->getQuery()
            ->getSingleScalarResult();

        return $max === null ? 0 : ((int) $max) + 10;
    }

    public function save(Testimonial $testimonial): void
    {
        $this->em->persist($testimonial);
        $this->em->flush();
    }

    public function remove(Testimonial $testimonial): void
    {
        $this->em->remove($testimonial);
        $this->em->flush();
    }
}
