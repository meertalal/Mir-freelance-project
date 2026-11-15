<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'testimonials')]
class Testimonial
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 120)]
    private string $author = '';

    #[ORM\Column(type: 'string', length: 120, options: ['default' => ''])]
    private string $role = '';

    #[ORM\Column(type: 'string', length: 160, options: ['default' => ''])]
    private string $company = '';

    #[ORM\Column(type: 'text')]
    private string $quote = '';

    #[ORM\Column(type: 'string', length: 255, options: ['default' => ''])]
    private string $avatar = '';

    #[ORM\Column(type: 'integer', options: ['default' => 5])]
    private int $rating = 5;

    #[ORM\Column(name: 'sort_order', type: 'integer', options: ['default' => 0])]
    private int $sortOrder = 0;

    #[ORM\Column(name: 'is_published', type: 'boolean', options: ['default' => true])]
    private bool $isPublished = true;

    #[ORM\Column(name: 'created_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $updatedAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function getRole(): string
    {
        return $this->role;
    }

    public function getCompany(): string
    {
        return $this->company;
    }

    public function getQuote(): string
    {
        return $this->quote;
    }

    public function getAvatar(): string
    {
        return $this->avatar;
    }

    public function getRating(): int
    {
        return $this->rating;
    }

    public function getSortOrder(): int
    {
        return $this->sortOrder;
    }

    public function isPublished(): bool
    {
        return $this->isPublished;
    }

    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    public function setRole(string $role): void
    {
        $this->role = $role;
    }

    public function setCompany(string $company): void
    {
        $this->company = $company;
    }

    public function setQuote(string $quote): void
    {
        $this->quote = $quote;
    }

    public function setAvatar(string $avatar): void
    {
        $this->avatar = $avatar;
    }

    public function setRating(int $rating): void
    {
        $this->rating = $rating;
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
            'author' => $this->author,
            'role' => $this->role,
            'company' => $this->company,
            'quote' => $this->quote,
            'avatar' => $this->avatar,
            'rating' => $this->rating,
            'sort_order' => $this->sortOrder,
            'is_published' => $this->isPublished,
            'updated_at' => $this->updatedAt->format(\DATE_ATOM),
        ];
    }
}
