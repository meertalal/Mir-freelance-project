<?php

declare(strict_types=1);

namespace App\Support;

final class ValidationException extends ApiException
{
    /**
     * @param array<string, string> $errors field => message
     */
    public function __construct(array $errors, string $message = 'The submitted data is invalid.')
    {
        parent::__construct($message, 422, ['errors' => $errors]);
    }

    /**
     * @return array<string, string>
     */
    public function getErrors(): array
    {
        /** @var array<string, string> $errors */
        $errors = $this->getDetails()['errors'] ?? [];

        return $errors;
    }
}
