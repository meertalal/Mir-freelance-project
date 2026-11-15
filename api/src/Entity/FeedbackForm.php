<?php

declare(strict_types=1);

namespace App\Entity;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'feedback_forms')]
#[ORM\Index(name: 'idx_feedback_forms_status', columns: ['status'])]
#[ORM\Index(name: 'idx_feedback_forms_created_at', columns: ['created_at'])]
#[ORM\Index(name: 'idx_feedback_forms_service_id', columns: ['service_id'])]
class FeedbackForm
{
    public const string STATUS_NEW = 'new';
    public const string STATUS_REVIEWED = 'reviewed';
    public const string STATUS_APPROVED = 'approved';
    public const string STATUS_REJECTED = 'rejected';
    public const array STATUSES = [
        self::STATUS_NEW,
        self::STATUS_REVIEWED,
        self::STATUS_APPROVED,
        self::STATUS_REJECTED,
    ];

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
    private string $message = '';

    #[ORM\Column(type: 'string', length: 255, options: ['default' => ''])]
    private string $avatar = '';

    #[ORM\Column(type: 'string', length: 180, options: ['default' => ''])]
    private string $email = '';

    #[ORM\Column(type: 'smallint', options: ['default' => 5])]
    private int $rating = 5;

    #[ORM\Column(name: 'service_title', type: 'string', length: 120, options: ['default' => ''])]
    private string $serviceTitle = '';

    #[ORM\Column(name: 'service_id', type: 'integer', nullable: true)]
    private ?int $serviceId = null;

    #[ORM\Column(name: 'source', type: 'string', length: 40, options: ['default' => 'services'])]
    private string $source = 'services';

    #[ORM\Column(type: 'string', length: 20, options: ['default' => self::STATUS_NEW])]
    private string $status = self::STATUS_NEW;

    #[ORM\Column(name: 'reviewed_by', type: 'integer', nullable: true)]
    private ?int $reviewedBy = null;

    #[ORM\Column(name: 'reviewed_at', type: 'datetime_immutable', nullable: true)]
    private ?DateTimeImmutable $reviewedAt = null;

    #[ORM\Column(name: 'notes', type: 'text', options: ['default' => ''])]
    private string $notes = '';

    #[ORM\Column(name: 'sort_order', type: 'integer', options: ['default' => 0])]
    private int $sortOrder = 0;

    #[ORM\Column(name: 'created_at', type: 'datetime_immutable')]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetime_immutable')]
    private DateTimeImmutable $updatedAt;

    public function __construct()
    {
        $now = new DateTimeImmutable();
        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    public function getRole(): string
    {
        return $this->role;
    }

    public function setRole(string $role): void
    {
        $this->role = $role;
    }

    public function getCompany(): string
    {
        return $this->company;
    }

    public function setCompany(string $company): void
    {
        $this->company = $company;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function setMessage(string $message): void
    {
        $this->message = $message;
    }

    public function getAvatar(): string
    {
        return $this->avatar;
    }

    public function setAvatar(string $avatar): void
    {
        $this->avatar = $avatar;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getRating(): int
    {
        return $this->rating;
    }

    public function setRating(int $rating): void
    {
        $this->rating = $rating;
    }

    public function getServiceTitle(): string
    {
        return $this->serviceTitle;
    }

    public function setServiceTitle(string $serviceTitle): void
    {
        $this->serviceTitle = $serviceTitle;
    }

    public function getServiceId(): ?int
    {
        return $this->serviceId;
    }

    public function setServiceId(?int $serviceId): void
    {
        $this->serviceId = $serviceId;
    }

    public function getSource(): string
    {
        return $this->source;
    }

    public function setSource(string $source): void
    {
        $this->source = $source;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function getReviewedBy(): ?int
    {
        return $this->reviewedBy;
    }

    public function setReviewedBy(?int $reviewedBy): void
    {
        $this->reviewedBy = $reviewedBy;
    }

    public function getReviewedAt(): ?DateTimeImmutable
    {
        return $this->reviewedAt;
    }

    public function setReviewedAt(?DateTimeImmutable $reviewedAt): void
    {
        $this->reviewedAt = $reviewedAt;
    }

    public function getNotes(): string
    {
        return $this->notes;
    }

    public function setNotes(string $notes): void
    {
        $this->notes = $notes;
    }

    public function getSortOrder(): int
    {
        return $this->sortOrder;
    }

    public function setSortOrder(int $sortOrder): void
    {
        $this->sortOrder = $sortOrder;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function touch(): void
    {
        $this->updatedAt = new DateTimeImmutable();
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'author' => $this->author,
            'role' => $this->role,
            'company' => $this->company,
            'message' => $this->message,
            'avatar' => $this->avatar,
            'email' => $this->email,
            'rating' => $this->rating,
            'service_title' => $this->serviceTitle,
            'service_id' => $this->serviceId,
            'source' => $this->source,
            'status' => $this->status,
            'reviewed_by' => $this->reviewedBy,
            'reviewed_at' => $this->reviewedAt?->format(\DATE_ATOM),
            'notes' => $this->notes,
            'sort_order' => $this->sortOrder,
            'created_at' => $this->createdAt->format(\DATE_ATOM),
            'updated_at' => $this->updatedAt->format(\DATE_ATOM),
        ];
    }
}
