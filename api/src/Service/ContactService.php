<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\ContactSubmission;
use App\Repository\ContactSubmissionRepository;
use App\Support\ApiException;
use App\Support\Env;
use App\Support\ValidationException;

final class ContactService
{
    public function __construct(
        private readonly ContactSubmissionRepository $submissions,
        private readonly ContactNotifier $notifier,
    ) {
    }

    /**
     * @param array<string, mixed> $input
     */
    public function submit(array $input, string $ipAddress, string $userAgent): ContactSubmission
    {
        $data = $this->validate($input);

        $since = (new \DateTimeImmutable())->modify('-1 hour');
        $limit = max(1, Env::int('CONTACT_RATE_LIMIT_PER_HOUR', 5));

        if ($this->submissions->countRecentByIp($ipAddress, $since) >= $limit) {
            throw new ApiException(
                'Too many messages from this connection. Please try again in an hour or email directly.',
                429,
            );
        }

        $submission = new ContactSubmission($data, $ipAddress, $userAgent);
        $this->submissions->save($submission);
        $this->notifier->notify($submission);

        return $submission;
    }

    /**
     * @param array<string, mixed> $input
     * @return array{
     *     fullName: string, email: string, phone: string, company: string,
     *     designation: string, projectType: string, budgetRange: string,
     *     message: string, country: string, countryPhone: string, subject: string
     * }
     */
    private function validate(array $input): array
    {
        $errors = [];

        $fullName = $this->text($input['fullName'] ?? '');
        if (mb_strlen($fullName) < 2 || mb_strlen($fullName) > 120) {
            $errors['fullName'] = 'Please enter your full name.';
        }

        $email = $this->text($input['email'] ?? '');
        if (!filter_var($email, \FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 180) {
            $errors['email'] = 'Please enter a valid email address.';
        }

        $phone = $this->text($input['phone'] ?? '');
        $digits = preg_replace('/\D+/', '', $phone) ?? '';
        if ($phone !== '' && (!preg_match('/^[0-9+()\-.\s]{7,32}$/', $phone) || strlen($digits) < 7 || strlen($digits) > 15)) {
            $errors['phone'] = 'Please enter a valid phone number with 7 to 15 digits.';
        }

        $projectType = $this->text($input['projectType'] ?? $input['project_type'] ?? '');
        if (mb_strlen($projectType) < 2 || mb_strlen($projectType) > 80) {
            $errors['projectType'] = 'Please select the type of project.';
        }

        $message = $this->text($input['message'] ?? '');
        if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
            $errors['message'] = 'Please describe your project in 10 to 5000 characters.';
        }

        $company = $this->text($input['company'] ?? '');
        if (mb_strlen($company) > 180) {
            $errors['company'] = 'Company name is too long.';
        }

        $designation = $this->text($input['designation'] ?? '');
        if (mb_strlen($designation) > 180) {
            $errors['designation'] = 'Designation is too long.';
        }

        $budgetRange = $this->text($input['budgetRange'] ?? $input['budget_range'] ?? '');
        if (mb_strlen($budgetRange) > 80) {
            $errors['budgetRange'] = 'Budget range is too long.';
        }

        $country = $this->text($input['country'] ?? '');
        if (mb_strlen($country) > 80) {
            $errors['country'] = 'Country is too long.';
        }

        $countryPhone = $this->text($input['countryPhone'] ?? $input['country_phone'] ?? '');
        if (mb_strlen($countryPhone) > 16) {
            $errors['countryPhone'] = 'Country code is too long.';
        }

        $subject = $this->text($input['subject'] ?? '');
        if (mb_strlen($subject) > 200) {
            $errors['subject'] = 'Subject is too long.';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        return [
            'fullName' => $fullName,
            'email' => $email,
            'phone' => $phone,
            'company' => $company,
            'designation' => $designation,
            'projectType' => $projectType,
            'budgetRange' => $budgetRange,
            'message' => $message,
            'country' => $country,
            'countryPhone' => $countryPhone,
            'subject' => $subject,
        ];
    }

    private function text(mixed $value): string
    {
        if (!is_scalar($value)) {
            return '';
        }

        $text = (string) $value;
        $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $text) ?? '';

        return trim($text);
    }
}
