<?php

declare(strict_types=1);

namespace App\Entity;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'blog_posts')]
#[ORM\Index(name: 'idx_blog_posts_slug', columns: ['slug'])]
#[ORM\Index(name: 'idx_blog_posts_status', columns: ['status'])]
#[ORM\Index(name: 'idx_blog_posts_published', columns: ['is_published'])]
#[ORM\Index(name: 'idx_blog_posts_category', columns: ['category'])]
class BlogPost
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

    #[ORM\Column(type: 'string', length: 255, options: ['default' => ''])]
    private string $coverImage = '';

    #[ORM\Column(name: 'cover_image_alt', type: 'string', length: 255, options: ['default' => ''])]
    private string $coverImageAlt = '';

    #[ORM\Column(type: 'text', options: ['default' => ''])]
    private string $body = '';

    #[ORM\Column(type: 'string', length: 40, options: ['default' => 'pen-line'])]
    private string $icon = 'pen-line';

    #[ORM\Column(type: 'string', length: 40)]
    private string $category = '';

    #[ORM\Column(name: 'sort_order', type: 'integer', options: ['default' => 0])]
    private int $sortOrder = 0;

    #[ORM\Column(name: 'is_published', type: 'boolean', options: ['default' => false])]
    private bool $isPublished = false;

    #[ORM\Column(type: 'string', length: 20, options: ['default' => self::STATUS_DRAFT])]
    private string $status = self::STATUS_DRAFT;

    #[ORM\Column(name: 'author_name', type: 'string', length: 120, options: ['default' => ''])]
    private string $authorName = '';

    #[ORM\Column(name: 'author_role', type: 'string', length: 120, options: ['default' => ''])]
    private string $authorRole = '';

    #[ORM\Column(name: 'author_avatar', type: 'string', length: 255, options: ['default' => ''])]
    private string $authorAvatar = '';

    #[ORM\Column(name: 'meta_title', type: 'string', length: 160, options: ['default' => ''])]
    private string $metaTitle = '';

    #[ORM\Column(name: 'meta_description', type: 'string', length: 320, options: ['default' => ''])]
    private string $metaDescription = '';

    #[ORM\Column(name: 'meta_keywords', type: 'string', length: 255, options: ['default' => ''])]
    private string $metaKeywords = '';

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

    public function getCategory(): string
    {
        return $this->category;
    }

    public function setCategory(string $category): void
    {
        $this->category = $category;
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

    public function getAuthorName(): string
    {
        return $this->authorName;
    }

    public function setAuthorName(string $authorName): void
    {
        $this->authorName = $authorName;
    }

    public function getAuthorRole(): string
    {
        return $this->authorRole;
    }

    public function setAuthorRole(string $authorRole): void
    {
        $this->authorRole = $authorRole;
    }

    public function getAuthorAvatar(): string
    {
        return $this->authorAvatar;
    }

    public function setAuthorAvatar(string $authorAvatar): void
    {
        $this->authorAvatar = $authorAvatar;
    }

    public function getMetaTitle(): string
    {
        return $this->metaTitle;
    }

    public function setMetaTitle(string $metaTitle): void
    {
        $this->metaTitle = $metaTitle;
    }

    public function getMetaDescription(): string
    {
        return $this->metaDescription;
    }

    public function setMetaDescription(string $metaDescription): void
    {
        $this->metaDescription = $metaDescription;
    }

    public function getMetaKeywords(): string
    {
        return $this->metaKeywords;
    }

    public function setMetaKeywords(string $metaKeywords): void
    {
        $this->metaKeywords = $metaKeywords;
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
            'category' => $this->category,
            'sort_order' => $this->sortOrder,
            'is_published' => $this->isPublished,
            'status' => $this->status,
            'author_name' => $this->authorName,
            'author_role' => $this->authorRole,
            'author_avatar' => $this->authorAvatar,
            'meta_title' => $this->metaTitle,
            'meta_description' => $this->metaDescription,
            'meta_keywords' => $this->metaKeywords,
            'created_at' => $this->createdAt->format(\DATE_ATOM),
            'updated_at' => $this->updatedAt->format(\DATE_ATOM),
        ];
    }
}
