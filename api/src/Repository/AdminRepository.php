<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Admin;
use Doctrine\ORM\EntityManagerInterface;

final class AdminRepository
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    public function findOneByEmail(string $email): ?Admin
    {
        return $this->em->getRepository(Admin::class)->findOneBy([
            'email' => mb_strtolower(trim($email)),
        ]);
    }

    public function save(Admin $admin): void
    {
        $this->em->persist($admin);
        $this->em->flush();
    }
}
