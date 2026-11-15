<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\ContactSubmission;
use App\Support\Env;
use Psr\Log\LoggerInterface;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

final class ContactNotifier
{
    public function __construct(private readonly LoggerInterface $logger)
    {
    }

    public function notify(ContactSubmission $submission): void
    {
        $dsn = Env::get('MAIL_DSN', '');
        $to = Env::get('CONTACT_NOTIFY_TO', '');

        // Notifications stay off until an SMTP DSN and recipient are configured.
        if ($dsn === '' || $to === '') {
            return;
        }

        $data = $submission->toArray();

        try {
            $mailer = new Mailer(Transport::fromDsn($dsn));
            $from = Env::get('MAIL_FROM', 'no-reply@mirtalal.com');

            $email = (new Email())
                ->from(new Address($from, 'Mir Talal Website'))
                ->to($to)
                ->replyTo(new Address((string) $data['email'], (string) $data['full_name']))
                ->subject(sprintf(
                    'New project inquiry: %s (%s)',
                    (string) $data['full_name'],
                    (string) $data['project_type'],
                ))
                ->text($this->plainBody($data))
                ->html($this->htmlBody($data));

            $mailer->send($email);
        } catch (\Throwable $exception) {
            // A failed notification must never fail the visitor's submission.
            $this->logger->error('Contact notification email failed.', [
                'exception' => $exception,
                'submission_id' => $submission->getId(),
            ]);
        }
    }

    /**
     * @param array<string, mixed> $data
     */
    private function plainBody(array $data): string
    {
        $value = static fn (string $key): string => trim((string) ($data[$key] ?? '')) ?: '-';

        return implode("\n", [
            'New message from the website contact form.',
            '',
            'Name: ' . (string) $data['full_name'],
            'Email: ' . (string) $data['email'],
            'Phone: ' . trim((string) $data['country_phone'] . ' ' . (string) $data['phone']),
            'Company: ' . $value('company'),
            'Designation: ' . $value('designation'),
            'Project type: ' . (string) $data['project_type'],
            'Budget: ' . $value('budget_range'),
            'Country: ' . $value('country'),
            'Received: ' . (string) $data['created_at'],
            '',
            'Message:',
            (string) $data['message'],
            '',
            'Reply to this email to answer the client directly.',
        ]);
    }

    /**
     * @param array<string, mixed> $data
     */
    private function htmlBody(array $data): string
    {
        $e = static fn (string $value): string => htmlspecialchars($value, \ENT_QUOTES, 'UTF-8');
        $value = static fn (string $key): string => trim((string) ($data[$key] ?? '')) ?: '-';

        $rows = [
            'Name' => (string) $data['full_name'],
            'Email' => (string) $data['email'],
            'Phone' => trim((string) $data['country_phone'] . ' ' . (string) $data['phone']),
            'Company' => $value('company'),
            'Designation' => $value('designation'),
            'Project type' => (string) $data['project_type'],
            'Budget' => $value('budget_range'),
            'Country' => $value('country'),
            'Received' => (string) $data['created_at'],
        ];

        $table = '';

        foreach ($rows as $label => $row) {
            $table .= sprintf(
                '<tr><td style="padding:6px 12px 6px 0;color:#64748b;font:14px Arial,sans-serif;">%s</td>'
                . '<td style="padding:6px 0;color:#0f172a;font:14px Arial,sans-serif;">%s</td></tr>',
                $e($label),
                $e($row),
            );
        }

        return sprintf(
            '<div style="max-width:640px;margin:0 auto;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;">'
            . '<h2 style="margin:0 0 4px;color:#10234b;font-size:20px;">New contact form message</h2>'
            . '<p style="margin:0 0 18px;color:#64748b;font-size:13px;">Sent from mirtalal.com</p>'
            . '<table style="border-collapse:collapse;">%s</table>'
            . '<h3 style="margin:24px 0 8px;color:#10234b;font-size:15px;">Message</h3>'
            . '<p style="margin:0;padding:14px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;'
            . 'color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap;">%s</p>'
            . '<p style="margin:18px 0 0;color:#64748b;font-size:12px;">Reply to this email to answer the client directly.</p>'
            . '</div>',
            $table,
            $e((string) $data['message']),
        );
    }
}
