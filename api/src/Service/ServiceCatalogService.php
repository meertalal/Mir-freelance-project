<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use App\Support\ApiException;
use App\Support\ValidationException;

final class ServiceCatalogService
{
    public function __construct(private readonly ServiceRepository $services)
    {
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function publicList(): array
    {
        return array_map(
            static fn (Service $service): array => $service->toArray(),
            $this->services->all(true),
        );
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function adminList(): array
    {
        return array_map(
            static fn (Service $service): array => $service->toArray(),
            $this->services->all(false),
        );
    }

    public function get(int $id): Service
    {
        $service = $this->services->find($id);

        if ($service === null) {
            throw new ApiException('Service not found.', 404);
        }

        return $service;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function create(array $input): Service
    {
        $service = new Service();
        $service->setSortOrder($this->services->nextSortOrder());
        $this->hydrate($service, $input);

        $this->services->save($service);

        return $service;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function update(int $id, array $input): Service
    {
        $service = $this->get($id);
        $this->hydrate($service, $input);
        $service->touch();
        $this->services->save($service);

        return $service;
    }

    public function delete(int $id): void
    {
        $this->services->remove($this->get($id));
    }

    /**
     * @param array<string, mixed> $input
     */
    private function hydrate(Service $service, array $input): void
    {
        $errors = [];

        $title = $this->text($input['title'] ?? $service->getTitle());
        if (mb_strlen($title) < 2 || mb_strlen($title) > 120) {
            $errors['title'] = 'Title must be 2 to 120 characters.';
        }

        $slugSource = $this->text($input['slug'] ?? '');
        $slug = $slugSource !== '' ? $this->slugify($slugSource) : $this->slugify($title);

        if ($slug === '') {
            $errors['slug'] = 'A URL slug is required.';
        } elseif ($service->getSlug() !== $slug && $this->services->findBySlug($slug) !== null) {
            $errors['slug'] = 'Another service already uses this slug.';
        }

        $description = $this->text($input['description'] ?? $service->getDescription());
        if (mb_strlen($description) < 5 || mb_strlen($description) > 500) {
            $errors['description'] = 'Description must be 5 to 500 characters.';
        }

        $icon = $this->text($input['icon'] ?? $service->getIcon());
        if (!preg_match('/^[a-z0-9-]{1,40}$/', $icon)) {
            $errors['icon'] = 'Icon key can only contain lowercase letters, numbers and dashes.';
        }

        $image = $this->text($input['image'] ?? $service->getImage());
        if (mb_strlen($image) > 255) {
            $errors['image'] = 'Image path is too long.';
        }

        $imageAlt = $this->text($input['image_alt'] ?? $service->getImageAlt());
        if (mb_strlen($imageAlt) > 255) {
            $errors['image_alt'] = 'Image alt text is too long.';
        }

        $sortOrder = $this->intOrNull($input['sort_order'] ?? null) ?? $service->getSortOrder();
        if ($sortOrder < 0 || $sortOrder > 100000) {
            $errors['sort_order'] = 'Sort order must be between 0 and 100000.';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        $service->setTitle($title);
        $service->setSlug($slug);
        $service->setDescription($description);
        $service->setIcon($icon);
        $service->setImage($image);
        $service->setImageAlt($imageAlt);
        $service->setSortOrder($sortOrder);
        $service->setPublished($this->bool($input['is_published'] ?? true));
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
