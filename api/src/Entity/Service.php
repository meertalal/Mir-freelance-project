<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'services')]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 120, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'string', length: 120)]
    private string $title = '';

    #[ORM\Column(type: 'string', length: 500)]
    private string $description = '';

    #[ORM\Column(type: 'string', length: 40, options: ['default' => 'code2'])]
    private string $icon = 'code2';

    #[ORM\Column(type: 'string', length: 255, options: ['default' => ''])]
    private string $image = '';

    #[ORM\Column(name: 'image_alt', type: 'string', length: 255, options: ['default' => ''])]
    private string $imageAlt = '';

    #[ORM\Column(name: 'sort_order', type: 'integer', options: ['default' => 0])]
    private int $sortOrder = 0;

    #[ORM\Column(name: 'is_published', type: 'boolean', options: ['default' => true])]
    private bool $isPublished = true;

    #[ORM\Column(name: 'created_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $updatedAt;

    public function __construct(string $slug = '')
    {
        $this->slug = $slug;
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getIcon(): string
    {
        return $this->icon;
    }

    public function getImage(): string
    {
        return $this->image;
    }

    public function getImageAlt(): string
    {
        return $this->imageAlt;
    }

    public function getSortOrder(): int
    {
        return $this->sortOrder;
    }

    public function isPublished(): bool
    {
        return $this->isPublished;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setSlug(string $slug): void
    {
        $this->slug = $slug;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function setIcon(string $icon): void
    {
        $this->icon = $icon;
    }

    public function setImage(string $image): void
    {
        $this->image = $image;
    }

    public function setImageAlt(string $imageAlt): void
    {
        $this->imageAlt = $imageAlt;
    }

    public function setSortOrder(int $sortOrder): void
    {
        $this->sortOrder = $sortOrder;
    }

    public function setPublished(bool $published): void
    {
        $this->isPublished = $published;
    }

    public function touch(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'icon' => $this->icon,
            'image' => $this->image,
            'image_alt' => $this->imageAlt,
            'href' => '/services/' . $this->slug,
            'sort_order' => $this->sortOrder,
            'is_published' => $this->isPublished,
            'updated_at' => $this->updatedAt->format(\DATE_ATOM),
        ];
    }
}
