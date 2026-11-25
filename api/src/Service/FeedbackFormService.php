<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\FeedbackForm;
use App\Repository\FeedbackFormRepository;
use App\Support\ApiException;
use App\Support\ValidationException;

final class FeedbackFormService
{
    public function __construct(private readonly FeedbackFormRepository $feedbackForms) {}

    /**
     * @return list<array<string, mixed>>
     */
    public function list(?string $status = null, int $limit = 100): array
    {
        return array_map(
            static fn (FeedbackForm $f): array => $f->toArray(),
            $this->feedbackForms->all($status, $limit)
        );
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function approved(int $limit = 100): array
    {
        return array_map(
            static fn (FeedbackForm $f): array => $f->toPublicArray(),
            $this->feedbackForms->findApproved($limit)
        );
    }

    public function pending(): array
    {
        return array_map(
            static fn (FeedbackForm $f): array => $f->toArray(),
            $this->feedbackForms->findPending()
        );
    }

    public function get(int $id): FeedbackForm
    {
        $feedback = $this->feedbackForms->find($id);
        if ($feedback === null) {
            throw new ApiException('Feedback not found.', 404);
        }

        return $feedback;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function create(array $input): FeedbackForm
    {
        $errors = [];

        $author = $this->text($input['author'] ?? '');
        if (mb_strlen($author) < 2 || mb_strlen($author) > 120) {
            $errors['author'] = 'Author name must be 2 to 120 characters.';
        }

        $message = $this->text($input['message'] ?? '');
        if (mb_strlen($message) < 10 || mb_strlen($message) > 2000) {
            $errors['message'] = 'Message must be 10 to 2000 characters.';
        }

        $email = $this->text($input['email'] ?? '');
        if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $errors['email'] = 'Please provide a valid email address.';
        }

        $rating = $this->intOrNull($input['rating'] ?? 5) ?? 5;
        if ($rating < 1 || $rating > 5) {
            $errors['rating'] = 'Rating must be between 1 and 5.';
        }

        $role = $this->text($input['role'] ?? '');
        if (mb_strlen($role) > 120) {
            $errors['role'] = 'Role is too long.';
        }

        $company = $this->text($input['company'] ?? '');
        if (mb_strlen($company) > 160) {
            $errors['company'] = 'Company is too long.';
        }

        $serviceTitle = $this->text($input['service_title'] ?? '');
        if (mb_strlen($serviceTitle) > 120) {
            $errors['service_title'] = 'Service title is too long.';
        }

        $avatar = $this->text($input['avatar'] ?? '');
        if (mb_strlen($avatar) > 255) {
            $errors['avatar'] = 'Avatar path is too long.';
        }

        $serviceId = $this->intOrNull($input['service_id'] ?? null) ?? null;
        if ($serviceId !== null && $serviceId < 0) {
            $serviceId = null;
        }

        $source = $this->text($input['source'] ?? 'services');
        if (!in_array($source, ['services', 'testimonials', 'case_studies', 'blog_posts', 'custom'], true)) {
            $source = 'custom';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        $feedback = new FeedbackForm();
        $feedback->setAuthor($author);
        $feedback->setMessage($message);
        $feedback->setEmail($email);
        $feedback->setRating($rating);
        $feedback->setServiceTitle($serviceTitle);
        $feedback->setRole($role);
        $feedback->setCompany($company);
        $feedback->setAvatar($avatar);
        $feedback->setServiceId($serviceId);
        $feedback->setSource($source);
        $feedback->setSortOrder($this->feedbackForms->nextSortOrder());
        $this->feedbackForms->save($feedback);

        return $feedback;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function updateStatus(int $id, string $status, int $reviewerId, string $notes = ''): FeedbackForm
    {
        if (!in_array($status, FeedbackForm::STATUSES, true)) {
            throw new ValidationException(['status' => 'Status must be one of: ' . implode(', ', FeedbackForm::STATUSES) . '.']);
        }

        $feedback = $this->get($id);

        if ($reviewerId <= 0) {
            throw new ValidationException(['reviewed_by' => 'A reviewer must be assigned to moderate feedback.']);
        }

        // For review, notes required
        if ($status === FeedbackForm::STATUS_REVIEWED && $notes === '') {
            throw new ValidationException(['notes' => 'Review notes are required to mark feedback as reviewed.']);
        }

        if ($status === FeedbackForm::STATUS_REVIEWED) {
            return $this->feedbackForms->markReviewed($id, $reviewerId, $notes);
        }

        if ($status === FeedbackForm::STATUS_APPROVED) {
            return $this->feedbackForms->approve($id, $reviewerId, $notes);
        }

        if ($status === FeedbackForm::STATUS_REJECTED) {
            return $this->feedbackForms->reject($id, $reviewerId, $notes);
        }

        // STATUS_NEW: clear review data
        $feedback->setReviewedBy(null);
        $feedback->setReviewedAt(null);
        $feedback->setNotes('');
        $feedback->setStatus($status);
        $feedback->touch();
        $this->feedbackForms->save($feedback);

        return $feedback;
    }

    public function delete(int $id): void
    {
        $this->feedbackForms->remove($this->get($id));
    }

    /** @return array<string, int> */
    public function statusCounts(): array
    {
        return $this->feedbackForms->statusCounts();
    }

    private function intOrNull(mixed $value): ?int
    {
        return is_numeric($value) ? (int) $value : null;
    }

    private function text(mixed $value): string
    {
        return is_scalar($value) ? trim((string) $value) : '';
    }
}
