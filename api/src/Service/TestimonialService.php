<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Testimonial;
use App\Repository\TestimonialRepository;
use App\Support\ApiException;
use App\Support\ValidationException;

final class TestimonialService
{
    public function __construct(private readonly TestimonialRepository $testimonials)
    {
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function publicList(): array
    {
        return array_map(
            static fn (Testimonial $testimonial): array => $testimonial->toArray(),
            $this->testimonials->all(true),
        );
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function adminList(): array
    {
        return array_map(
            static fn (Testimonial $testimonial): array => $testimonial->toArray(),
            $this->testimonials->all(false),
        );
    }

    public function get(int $id): Testimonial
    {
        $testimonial = $this->testimonials->find($id);

        if ($testimonial === null) {
            throw new ApiException('Testimonial not found.', 404);
        }

        return $testimonial;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function create(array $input): Testimonial
    {
        $testimonial = new Testimonial();
        $testimonial->setSortOrder($this->testimonials->nextSortOrder());
        $this->hydrate($testimonial, $input);

        $this->testimonials->save($testimonial);

        return $testimonial;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function update(int $id, array $input): Testimonial
    {
        $testimonial = $this->get($id);
        $this->hydrate($testimonial, $input);
        $testimonial->touch();
        $this->testimonials->save($testimonial);

        return $testimonial;
    }

    public function delete(int $id): void
    {
        $this->testimonials->remove($this->get($id));
    }

    /**
     * @param array<string, mixed> $input
     */
    private function hydrate(Testimonial $testimonial, array $input): void
    {
        $errors = [];

        $author = $this->text($input['author'] ?? $testimonial->getAuthor());
        if (mb_strlen($author) < 2 || mb_strlen($author) > 120) {
            $errors['author'] = 'Client name must be 2 to 120 characters.';
        }

        $quote = $this->text($input['quote'] ?? $testimonial->getQuote());
        if (mb_strlen($quote) < 10 || mb_strlen($quote) > 1000) {
            $errors['quote'] = 'Quote must be 10 to 1000 characters.';
        }

        $role = $this->text($input['role'] ?? $testimonial->getRole());
        if (mb_strlen($role) > 120) {
            $errors['role'] = 'Role is too long.';
        }

        $company = $this->text($input['company'] ?? $testimonial->getCompany());
        if (mb_strlen($company) > 160) {
            $errors['company'] = 'Company is too long.';
        }

        $avatar = $this->text($input['avatar'] ?? $testimonial->getAvatar());
        if (mb_strlen($avatar) > 255) {
            $errors['avatar'] = 'Avatar path is too long.';
        }

        $rating = is_numeric($input['rating'] ?? null)
            ? (int) $input['rating']
            : $testimonial->getRating();

        if ($rating < 1 || $rating > 5) {
            $errors['rating'] = 'Rating must be between 1 and 5.';
        }

        $sortOrder = is_numeric($input['sort_order'] ?? null)
            ? (int) $input['sort_order']
            : $testimonial->getSortOrder();

        if ($sortOrder < 0 || $sortOrder > 100000) {
            $errors['sort_order'] = 'Sort order must be between 0 and 100000.';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        $testimonial->setAuthor($author);
        $testimonial->setQuote($quote);
        $testimonial->setRole($role);
        $testimonial->setCompany($company);
        $testimonial->setAvatar($avatar);
        $testimonial->setRating($rating);
        $testimonial->setSortOrder($sortOrder);

        $published = $input['is_published'] ?? true;
        $testimonial->setPublished(
            is_bool($published)
                ? $published
                : in_array(strtolower((string) $published), ['1', 'true', 'yes', 'on'], true),
        );
    }

    private function text(mixed $value): string
    {
        return is_scalar($value) ? trim((string) $value) : '';
    }
}
