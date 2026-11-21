<?php

declare(strict_types=1);

namespace App\Entity;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'case_studies')]
#[ORM\Index(name: 'idx_case_studies_slug', columns: ['slug'])]
#[ORM\Index(name: 'idx_case_studies_status', columns: ['status'])]
#[ORM\Index(name: 'idx_case_studies_published', columns: ['is_published'])]
#[ORM\Index(name: 'idx_case_studies_project_type', columns: ['project_type'])]
class CaseStudy
{
    public const string STATUS_DRAFT = 'draft';
    public const string STATUS_PUBLISHED = 'published';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 120, unique: true)]
    private string $slug = '';

    #[ORM\Column(type: 'string', length: 120)]
    private string $title = '';

    #[ORM\Column(type: 'text', options: ['default' => ''])]
    private string $excerpt = '';

    #[ORM\Column(name: 'cover_image', type: 'string', length: 255, options: ['default' => ''])]
    private string $coverImage = '';

    #[ORM\Column(name: 'cover_image_alt', type: 'string', length: 255, options: ['default' => ''])]
    private string $coverImageAlt = '';

    #[ORM\Column(type: 'text', options: ['default' => ''])]
    private string $body = '';

    #[ORM\Column(type: 'string', length: 40, options: ['default' => 'code2'])]
    private string $icon = 'code2';

    #[ORM\Column(name: 'project_type', type: 'string', length: 80)]
    private string $projectType = '';

    #[ORM\Column(name: 'sort_order', type: 'integer', options: ['default' => 0])]
    private int $sortOrder = 0;

    #[ORM\Column(name: 'is_published', type: 'boolean', options: ['default' => false])]
    private bool $isPublished = false;

    #[ORM\Column(type: 'string', length: 20, options: ['default' => self::STATUS_DRAFT])]
    private string $status = self::STATUS_DRAFT;

    #[ORM\Column(name: 'testimonial_id', type: 'integer', nullable: true)]
    private ?int $testimonialId = null;

    #[ORM\Column(name: 'client_company', type: 'string', length: 120, options: ['default' => ''])]
    private string $clientCompany = '';

    #[ORM\Column(name: 'client_name', type: 'string', length: 120, options: ['default' => ''])]
    private string $clientName = '';

    #[ORM\Column(name: 'client_role', type: 'string', length: 120, options: ['default' => ''])]
    private string $clientRole = '';

    #[ORM\Column(name: 'client_website', type: 'string', length: 255, options: ['default' => ''])]
    private string $clientWebsite = '';

    #[ORM\Column(name: 'challenge', type: 'text', options: ['default' => ''])]
    private string $challenge = '';

    #[ORM\Column(name: 'solution', type: 'text', options: ['default' => ''])]
    private string $solution = '';

    #[ORM\Column(name: 'results', type: 'text', options: ['default' => ''])]
    private string $results = '';

    #[ORM\Column(name: 'created_at', type: 'datetime_immutable')]
    private DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetime_immutable')]
    private DateTimeImmutable $updatedAt;

    public function __construct(string $slug = '')
    {
        $this->slug = $slug;
        $now = new DateTimeImmutable();
        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): void
    {
        $this->slug = $slug;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getExcerpt(): string
    {
        return $this->excerpt;
    }

    public function setExcerpt(string $excerpt): void
    {
        $this->excerpt = $excerpt;
    }

    public function getCoverImage(): string
    {
        return $this->coverImage;
    }

    public function setCoverImage(string $coverImage): void
    {
        $this->coverImage = $coverImage;
    }

    public function getCoverImageAlt(): string
    {
        return $this->coverImageAlt;
    }

    public function setCoverImageAlt(string $coverImageAlt): void
    {
        $this->coverImageAlt = $coverImageAlt;
    }

    public function getBody(): string
    {
        return $this->body;
    }

    public function setBody(string $body): void
    {
        $this->body = $body;
    }

    public function getIcon(): string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): void
    {
        $this->icon = $icon;
    }

    public function getProjectType(): string
    {
        return $this->projectType;
    }

    public function setProjectType(string $projectType): void
    {
        $this->projectType = $projectType;
    }

    public function getSortOrder(): int
    {
        return $this->sortOrder;
    }

    public function setSortOrder(int $sortOrder): void
    {
        $this->sortOrder = $sortOrder;
    }

    public function isPublished(): bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): void
    {
        $this->isPublished = $isPublished;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function getTestimonialId(): ?int
    {
        return $this->testimonialId;
    }

    public function setTestimonialId(?int $testimonialId): void
    {
        $this->testimonialId = $testimonialId;
    }

    public function getClientCompany(): string
    {
        return $this->clientCompany;
    }

    public function setClientCompany(string $clientCompany): void
    {
        $this->clientCompany = $clientCompany;
    }

    public function getClientName(): string
    {
        return $this->clientName;
    }

    public function setClientName(string $clientName): void
    {
        $this->clientName = $clientName;
    }

    public function getClientRole(): string
    {
        return $this->clientRole;
    }

    public function setClientRole(string $clientRole): void
    {
        $this->clientRole = $clientRole;
    }

    public function getClientWebsite(): string
    {
        return $this->clientWebsite;
    }

    public function setClientWebsite(string $clientWebsite): void
    {
        $this->clientWebsite = $clientWebsite;
    }

    public function getChallenge(): string
    {
        return $this->challenge;
    }

    public function setChallenge(string $challenge): void
    {
        $this->challenge = $challenge;
    }

    public function getSolution(): string
    {
        return $this->solution;
    }

    public function setSolution(string $solution): void
    {
        $this->solution = $solution;
    }

    public function getResults(): string
    {
        return $this->results;
    }

    public function setResults(string $results): void
    {
        $this->results = $results;
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
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'cover_image' => $this->coverImage,
            'cover_image_alt' => $this->coverImageAlt,
            'body' => $this->body,
            'icon' => $this->icon,
            'project_type' => $this->projectType,
            'sort_order' => $this->sortOrder,
            'is_published' => $this->isPublished,
            'status' => $this->status,
            'testimonial_id' => $this->testimonialId,
            'client_company' => $this->clientCompany,
            'client_name' => $this->clientName,
            'client_role' => $this->clientRole,
            'client_website' => $this->clientWebsite,
            'challenge' => $this->challenge,
            'solution' => $this->solution,
            'results' => $this->results,
            'created_at' => $this->createdAt->format(\DATE_ATOM),
            'updated_at' => $this->updatedAt->format(\DATE_ATOM),
        ];
    }
}
