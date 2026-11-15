<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\ContactSubmission;
use App\Repository\ContactSubmissionRepository;
use App\Support\ApiException;
use App\Support\ValidationException;

final class ContactSubmissionService
{
    public function __construct(private readonly ContactSubmissionRepository $submissions)
    {
    }

    /**
     * @return array<string, mixed>
     */
    public function list(
        int $page,
        int $perPage,
        ?string $status,
        ?string $search = null,
        bool $includeDeleted = false,
    ): array {
        if ($status !== null && !in_array($status, ContactSubmission::STATUSES, true)) {
            throw new ValidationException(['status' => 'Unknown status filter.']);
        }

        $page = max(1, $page);
        $perPage = min(100, max(1, $perPage));

        $result = $this->submissions->paginate($page, $perPage, $status, $search, $includeDeleted);

        return [
            'data' => array_map(
                static fn (ContactSubmission $submission): array => $submission->toArray(),
                $result['items'],
            ),
            'meta' => [
                'total' => $result['total'],
                'page' => $result['page'],
                'per_page' => $result['per_page'],
                'pages' => $result['pages'],
                'counts' => $this->submissions->statusCounts(),
            ],
        ];
    }

    public function get(int $id): ContactSubmission
    {
        return $this->findOrFail($id);
    }

    public function updateStatus(int $id, string $status): ContactSubmission
    {
        if (!in_array($status, ContactSubmission::STATUSES, true)) {
            throw new ValidationException(['status' => 'Status must be one of: ' . implode(', ', ContactSubmission::STATUSES) . '.']);
        }

        $submission = $this->findOrFail($id);
        $submission->setStatus($status);
        $this->submissions->save($submission);

        return $submission;
    }

    public function delete(int $id): void
    {
        $submission = $this->findOrFail($id);
        $submission->softDelete();
        $this->submissions->save($submission);
    }

    private function findOrFail(int $id): ContactSubmission
    {
        $submission = $this->submissions->find($id);

        if ($submission === null) {
            throw new ApiException('Submission not found.', 404);
        }

        return $submission;
    }
}
