<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\SiteSetting;
use Doctrine\ORM\EntityManagerInterface;

final class SiteSettingRepository
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    public function find(): ?SiteSetting
    {
        return $this->em->find(SiteSetting::class, SiteSetting::ROW_ID);
    }

    public function save(SiteSetting $settings): void
    {
        $this->em->persist($settings);
        $this->em->flush();
    }
}
