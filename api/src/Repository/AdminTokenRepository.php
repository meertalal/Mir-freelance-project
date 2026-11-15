<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Admin;
use App\Entity\AdminToken;
use Doctrine\ORM\EntityManagerInterface;

final class AdminTokenRepository
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    public static function hash(string $plainToken): string
    {
        return hash('sha256', $plainToken);
    }

    public function create(Admin $admin, string $plainToken, \DateTimeImmutable $expiresAt): AdminToken
    {
        $token = new AdminToken($admin, self::hash($plainToken), $expiresAt);
        $this->em->persist($token);
        $this->em->flush();

        return $token;
    }

    public function findActive(string $plainToken): ?AdminToken
    {
        if ($plainToken === '') {
            return null;
        }

        /** @var AdminToken|null $token */
        $token = $this->em->createQueryBuilder()
            ->select('t', 'a')
            ->from(AdminToken::class, 't')
            ->join('t.admin', 'a')
            ->where('t.tokenHash = :hash')
            ->andWhere('t.expiresAt > :now')
            ->andWhere('a.isActive = true')
            ->setParameter('hash', self::hash($plainToken))
            ->setParameter('now', new \DateTimeImmutable())
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        return $token;
    }

    public function touch(AdminToken $token): void
    {
        $token->markUsed();
        $this->em->flush();
    }

    public function delete(AdminToken $token): void
    {
        $this->em->remove($token);
        $this->em->flush();
    }

    public function deleteForAdminExcept(Admin $admin, AdminToken $keep): int
    {
        $adminId = $admin->getId();
        $keepId = $keep->getId();

        if ($adminId === null || $keepId === null) {
            return 0;
        }

        return (int) $this->em->createQueryBuilder()
            ->delete(AdminToken::class, 't')
            ->where('t.admin = :admin')
            ->andWhere('t.id != :keepId')
            ->setParameter('admin', $adminId)
            ->setParameter('keepId', $keepId)
            ->getQuery()
            ->execute();
    }

    public function purgeExpired(): int
    {
        return (int) $this->em->createQueryBuilder()
            ->delete(AdminToken::class, 't')
            ->where('t.expiresAt <= :now')
            ->setParameter('now', new \DateTimeImmutable())
            ->getQuery()
            ->execute();
    }
}
