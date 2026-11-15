<?php

declare(strict_types=1);

namespace App\Support;

use RuntimeException;

/**
 * Expected, client-facing failure (401, 404, 409, 422, 429, ...).
 * The JSON error handler turns this into a stable response shape.
 */
class ApiException extends RuntimeException
{
    /**
     * @param array<string, mixed> $details
     */
    public function __construct(
        string $message,
        private readonly int $status = 400,
        private readonly array $details = [],
    ) {
        parent::__construct($message);
    }

    public function getStatus(): int
    {
        return $this->status;
    }

    /**
     * @return array<string, mixed>
     */
    public function getDetails(): array
    {
        return $this->details;
    }
}
