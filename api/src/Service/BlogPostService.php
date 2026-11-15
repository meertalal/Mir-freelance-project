<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\BlogPost;
use App\Repository\BlogPostRepository;
use App\Support\ApiException;
use App\Support\ValidationException;

final class BlogPostService
{
    public function __construct(private readonly BlogPostRepository $blogPosts) {}

    /** @return list<array<string, mixed>> */
    public function publicList(): array
    {
        return array_map(
            static fn (BlogPost $b): array => $b->toArray(),
            $this->blogPosts->all(true)
        );
    }

    /** @return list<array<string, mixed>> */
    public function adminList(): array
    {
        return array_map(
            static fn (BlogPost $b): array => $b->toArray(),
            $this->blogPosts->all(false)
        );
    }

    public function get(int $id): BlogPost
    {
        $blogPost = $this->blogPosts->find($id);
        if ($blogPost === null) {
            throw new ApiException('Blog post not found.', 404);
        }

        return $blogPost;
    }

    public function getBySlug(string $slug): BlogPost
    {
        $blogPost = $this->blogPosts->findBySlug($slug);
        if ($blogPost === null) {
            throw new ApiException('Blog post not found.', 404);
        }

        return $blogPost;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function create(array $input): BlogPost
    {
        $blogPost = new BlogPost();
        $blogPost->setSortOrder($this->blogPosts->nextSortOrder());
        $this->hydrate($blogPost, $input);
        $this->blogPosts->save($blogPost);

        return $blogPost;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function update(int $id, array $input): BlogPost
    {
        $blogPost = $this->get($id);
        $this->hydrate($blogPost, $input);
        $blogPost->touch();
        $this->blogPosts->save($blogPost);

        return $blogPost;
    }

    public function delete(int $id): void
    {
        $this->blogPosts->remove($this->get($id));
    }

    /**
     * @return array<string, list<string>>
     */
    public function meta(): array
    {
        return [
            'categories' => $this->blogPosts->categories(),
        ];
    }

    /**
     * @param array<string, mixed> $input
     */
    private function hydrate(BlogPost $blogPost, array $input): void
    {
        $errors = [];

        $title = $this->text($input['title'] ?? $blogPost->getTitle());
        if (mb_strlen($title) < 2 || mb_strlen($title) > 120) {
            $errors['title'] = 'Title must be 2 to 120 characters.';
        }

        $slugSource = $this->text($input['slug'] ?? '');
        $slug = $slugSource !== '' ? $this->slugify($slugSource) : $this->slugify($title);
        if ($slug === '') {
            $errors['slug'] = 'A URL slug is required.';
        } elseif ($blogPost->getSlug() !== $slug && $this->blogPosts->findBySlug($slug) !== null) {
            $errors['slug'] = 'Another blog post already uses this slug.';
        }

        $excerpt = $this->text($input['excerpt'] ?? $blogPost->getExcerpt());
        if (mb_strlen($excerpt) > 600) {
            $errors['excerpt'] = 'Excerpt is too long.';
        }

        $coverImage = $this->text($input['cover_image'] ?? $blogPost->getCoverImage());
        if (mb_strlen($coverImage) > 255) {
            $errors['cover_image'] = 'Cover image path is too long.';
        }

        $coverImageAlt = $this->text($input['cover_image_alt'] ?? $blogPost->getCoverImageAlt());
        if (mb_strlen($coverImageAlt) > 255) {
            $errors['cover_image_alt'] = 'Cover image alt text is too long.';
        }

        $body = $this->text($input['body'] ?? $blogPost->getBody());
        if (mb_strlen($body) < 20) {
            $errors['body'] = 'Body must be at least 20 characters.';
        }

        $category = $this->text($input['category'] ?? $blogPost->getCategory());
        if ($category === '') {
            $errors['category'] = 'Category is required.';
        }
        if (mb_strlen($category) > 40) {
            $errors['category'] = 'Category is too long.';
        }

        $icon = $this->text($input['icon'] ?? $blogPost->getIcon());
        if ($icon === '') {
            $icon = 'pen-line';
        }
        if (!preg_match('/^[a-z0-9-]{1,40}$/', $icon)) {
            $errors['icon'] = 'Icon key can only contain lowercase letters, numbers and dashes.';
        }

        $authorName = $this->text($input['author_name'] ?? $blogPost->getAuthorName());
        if (mb_strlen($authorName) > 120) {
            $errors['author_name'] = 'Author name is too long.';
        }

        $authorRole = $this->text($input['author_role'] ?? $blogPost->getAuthorRole());
        if (mb_strlen($authorRole) > 120) {
            $errors['author_role'] = 'Author role is too long.';
        }

        $authorAvatar = $this->text($input['author_avatar'] ?? $blogPost->getAuthorAvatar());
        if (mb_strlen($authorAvatar) > 255) {
            $errors['author_avatar'] = 'Author avatar path is too long.';
        }

        $metaTitle = $this->text($input['meta_title'] ?? $blogPost->getMetaTitle());
        if (mb_strlen($metaTitle) > 160) {
            $errors['meta_title'] = 'Meta title is too long.';
        }

        $metaDescription = $this->text($input['meta_description'] ?? $blogPost->getMetaDescription());
        if (mb_strlen($metaDescription) > 320) {
            $errors['meta_description'] = 'Meta description is too long.';
        }

        $metaKeywords = $this->text($input['meta_keywords'] ?? $blogPost->getMetaKeywords());
        if (mb_strlen($metaKeywords) > 255) {
            $errors['meta_keywords'] = 'Meta keywords is too long.';
        }

        $status = $this->text($input['status'] ?? $blogPost->getStatus());
        if ($status !== BlogPost::STATUS_DRAFT && $status !== BlogPost::STATUS_PUBLISHED) {
            $errors['status'] = 'Status must be: draft, published.';
        }

        $isPublished = $blogPost->isPublished();
        if (isset($input['is_published'])) {
            $isPublished = $this->bool($input['is_published']);
        }

        $sortOrder = $this->intOrNull($input['sort_order'] ?? null) ?? $blogPost->getSortOrder();
        if ($sortOrder < 0 || $sortOrder > 100000) {
            $errors['sort_order'] = 'Sort order must be between 0 and 100000.';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        $blogPost->setTitle($title);
        $blogPost->setSlug($slug);
        $blogPost->setExcerpt($excerpt);
        $blogPost->setCoverImage($coverImage);
        $blogPost->setCoverImageAlt($coverImageAlt);
        $blogPost->setBody($body);
        $blogPost->setCategory($category);
        $blogPost->setIcon($icon);
        $blogPost->setAuthorName($authorName);
        $blogPost->setAuthorRole($authorRole);
        $blogPost->setAuthorAvatar($authorAvatar);
        $blogPost->setMetaTitle($metaTitle);
        $blogPost->setMetaDescription($metaDescription);
        $blogPost->setMetaKeywords($metaKeywords);
        $blogPost->setStatus($status);
        $blogPost->setIsPublished($isPublished);
        $blogPost->setSortOrder($sortOrder);
    }

    private function text(mixed $value): string
    {
        return is_scalar($value) ? trim((string) $value) : '';
    }

    private function intOrNull(mixed $value): ?int
    {
        return is_numeric($value) ? (int) $value : null;
    }

    private function bool(mixed $value): bool
    {
        if (is_bool($value)) {
            return $value;
        }

        return in_array(strtolower((string) $value), ['1', 'true', 'yes', 'on'], true);
    }

    private function slugify(string $value): string
    {
        $slug = strtolower(trim($value));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';

        return trim($slug, '-');
    }
}
