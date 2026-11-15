<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\CaseStudy;
use App\Repository\CaseStudyRepository;
use App\Support\ApiException;
use App\Support\ValidationException;

final class CaseStudyService
{
    public function __construct(private readonly CaseStudyRepository $caseStudies) {}

    /** @return list<array<string, mixed>> */
    public function publicList(): array
    {
        return array_map(
            static fn (CaseStudy $c): array => $c->toArray(),
            $this->caseStudies->all(true)
        );
    }

    /** @return list<array<string, mixed>> */
    public function adminList(): array
    {
        return array_map(
            static fn (CaseStudy $c): array => $c->toArray(),
            $this->caseStudies->all(false)
        );
    }

    public function get(int $id): CaseStudy
    {
        $caseStudy = $this->caseStudies->find($id);
        if ($caseStudy === null) {
            throw new ApiException('Case study not found.', 404);
        }

        return $caseStudy;
    }

    public function getBySlug(string $slug): CaseStudy
    {
        $caseStudy = $this->caseStudies->findBySlug($slug);
        if ($caseStudy === null) {
            throw new ApiException('Case study not found.', 404);
        }

        return $caseStudy;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function create(array $input): CaseStudy
    {
        $caseStudy = new CaseStudy();
        $caseStudy->setSortOrder($this->caseStudies->nextSortOrder());
        $this->hydrate($caseStudy, $input);
        $this->caseStudies->save($caseStudy);

        return $caseStudy;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function update(int $id, array $input): CaseStudy
    {
        $caseStudy = $this->get($id);
        $this->hydrate($caseStudy, $input);
        $caseStudy->touch();
        $this->caseStudies->save($caseStudy);

        return $caseStudy;
    }

    public function delete(int $id): void
    {
        $this->caseStudies->remove($this->get($id));
    }

    /**
     * @param array<string, mixed> $input
     */
    private function hydrate(CaseStudy $caseStudy, array $input): void
    {
        $errors = [];

        $title = $this->text($input['title'] ?? $caseStudy->getTitle());
        if (mb_strlen($title) < 2 || mb_strlen($title) > 120) {
            $errors['title'] = 'Title must be 2 to 120 characters.';
        }

        $slugSource = $this->text($input['slug'] ?? '');
        $slug = $slugSource !== '' ? $this->slugify($slugSource) : $this->slugify($title);
        if ($slug === '') {
            $errors['slug'] = 'A URL slug is required.';
        } elseif ($caseStudy->getSlug() !== $slug && $this->caseStudies->findBySlug($slug) !== null) {
            $errors['slug'] = 'Another case study already uses this slug.';
        }

        $excerpt = $this->text($input['excerpt'] ?? $caseStudy->getExcerpt());
        if (mb_strlen($excerpt) > 600) {
            $errors['excerpt'] = 'Excerpt is too long.';
        }

        $coverImage = $this->text($input['cover_image'] ?? $caseStudy->getCoverImage());
        if (mb_strlen($coverImage) > 255) {
            $errors['cover_image'] = 'Cover image path is too long.';
        }

        $coverImageAlt = $this->text($input['cover_image_alt'] ?? $caseStudy->getCoverImageAlt());
        if (mb_strlen($coverImageAlt) > 255) {
            $errors['cover_image_alt'] = 'Cover image alt text is too long.';
        }

        $body = $this->text($input['body'] ?? $caseStudy->getBody());
        if (mb_strlen($body) < 20) {
            $errors['body'] = 'Body must be at least 20 characters.';
        }

        $projectType = $this->text($input['project_type'] ?? $caseStudy->getProjectType());
        if ($projectType === '') {
            $errors['project_type'] = 'Project type is required.';
        }

        $icon = $this->text($input['icon'] ?? $caseStudy->getIcon());
        if ($icon === '') {
            $icon = 'code2';
        }
        if (!preg_match('/^[a-z0-9-]{1,40}$/', $icon)) {
            $errors['icon'] = 'Icon key can only contain lowercase letters, numbers and dashes.';
        }

        $clientCompany = $this->text($input['client_company'] ?? $caseStudy->getClientCompany());
        if (mb_strlen($clientCompany) > 120) {
            $errors['client_company'] = 'Client company is too long.';
        }

        $clientName = $this->text($input['client_name'] ?? $caseStudy->getClientName());
        if (mb_strlen($clientName) > 120) {
            $errors['client_name'] = 'Client name is too long.';
        }

        $clientRole = $this->text($input['client_role'] ?? $caseStudy->getClientRole());
        if (mb_strlen($clientRole) > 120) {
            $errors['client_role'] = 'Client role is too long.';
        }

        $clientWebsite = $this->text($input['client_website'] ?? $caseStudy->getClientWebsite());
        if ($clientWebsite !== '' && filter_var($clientWebsite, FILTER_VALIDATE_URL) === false) {
            $errors['client_website'] = 'Client website must be a valid URL.';
        }

        $challenge = $this->text($input['challenge'] ?? $caseStudy->getChallenge());
        if (mb_strlen($challenge) > 4000) {
            $errors['challenge'] = 'Challenge is too long.';
        }

        $solution = $this->text($input['solution'] ?? $caseStudy->getSolution());
        if (mb_strlen($solution) > 4000) {
            $errors['solution'] = 'Solution is too long.';
        }

        $results = $this->text($input['results'] ?? $caseStudy->getResults());
        if (mb_strlen($results) > 4000) {
            $errors['results'] = 'Results is too long.';
        }

        $status = $this->text($input['status'] ?? $caseStudy->getStatus());
        if ($status !== CaseStudy::STATUS_DRAFT && $status !== CaseStudy::STATUS_PUBLISHED) {
            $errors['status'] = 'Status must be: draft, published.';
        }

        $isPublished = $caseStudy->isPublished();
        if (isset($input['is_published'])) {
            $isPublished = $this->bool($input['is_published']);
        }

        $sortOrder = $this->intOrNull($input['sort_order'] ?? null) ?? $caseStudy->getSortOrder();
        if ($sortOrder < 0 || $sortOrder > 100000) {
            $errors['sort_order'] = 'Sort order must be between 0 and 100000.';
        }

        $testimonialId = $this->intOrNull($input['testimonial_id'] ?? null) ?? $caseStudy->getTestimonialId();
        if ($testimonialId !== null && $testimonialId < 0) {
            $testimonialId = null;
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        $caseStudy->setTitle($title);
        $caseStudy->setSlug($slug);
        $caseStudy->setExcerpt($excerpt);
        $caseStudy->setCoverImage($coverImage);
        $caseStudy->setCoverImageAlt($coverImageAlt);
        $caseStudy->setBody($body);
        $caseStudy->setProjectType($projectType);
        $caseStudy->setIcon($icon);
        $caseStudy->setClientCompany($clientCompany);
        $caseStudy->setClientName($clientName);
        $caseStudy->setClientRole($clientRole);
        $caseStudy->setClientWebsite($clientWebsite);
        $caseStudy->setChallenge($challenge);
        $caseStudy->setSolution($solution);
        $caseStudy->setResults($results);
        $caseStudy->setStatus($status);
        $caseStudy->setIsPublished($isPublished);
        $caseStudy->setSortOrder($sortOrder);
        $caseStudy->setTestimonialId($testimonialId);
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
