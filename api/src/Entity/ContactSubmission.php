<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'contact_submissions')]
#[ORM\Index(name: 'idx_contact_submissions_status', columns: ['status'])]
#[ORM\Index(name: 'idx_contact_submissions_created', columns: ['created_at'])]
#[ORM\Index(name: 'idx_contact_submissions_ip', columns: ['ip_address'])]
class ContactSubmission
{
    public const STATUS_NEW = 'new';
    public const STATUS_READ = 'read';
    public const STATUS_ARCHIVED = 'archived';

    public const STATUSES = [
        self::STATUS_NEW,
        self::STATUS_READ,
        self::STATUS_ARCHIVED,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(name: 'full_name', type: 'string', length: 120)]
    private string $fullName;

    #[ORM\Column(type: 'string', length: 180)]
    private string $email;

    #[ORM\Column(type: 'string', length: 32)]
    private string $phone;

    #[ORM\Column(type: 'string', length: 180, options: ['default' => ''])]
    private string $company = '';

    #[ORM\Column(type: 'string', length: 180, options: ['default' => ''])]
    private string $designation = '';

    #[ORM\Column(name: 'project_type', type: 'string', length: 80)]
    private string $projectType;

    #[ORM\Column(name: 'budget_range', type: 'string', length: 80, options: ['default' => ''])]
    private string $budgetRange = '';

    #[ORM\Column(type: 'text')]
    private string $message;

    #[ORM\Column(type: 'string', length: 80, options: ['default' => ''])]
    private string $country = '';

    #[ORM\Column(name: 'country_phone', type: 'string', length: 16, options: ['default' => ''])]
    private string $countryPhone = '';

    #[ORM\Column(type: 'string', length: 200, options: ['default' => ''])]
    private string $subject = '';

    #[ORM\Column(type: 'string', length: 20, options: ['default' => self::STATUS_NEW])]
    private string $status = self::STATUS_NEW;

    #[ORM\Column(name: 'ip_address', type: 'string', length: 45, options: ['default' => ''])]
    private string $ipAddress = '';

    #[ORM\Column(name: 'user_agent', type: 'string', length: 500, options: ['default' => ''])]
    private string $userAgent = '';

    #[ORM\Column(name: 'created_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(name: 'updated_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $updatedAt;

    #[ORM\Column(name: 'deleted_at', type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $deletedAt = null;

    /**
     * @param array{
     *     fullName: string, email: string, phone: string, company?: string,
     *     designation?: string, projectType: string, budgetRange?: string,
     *     message: string, country?: string, countryPhone?: string, subject?: string
     * } $data
     */
    public function __construct(array $data, string $ipAddress = '', string $userAgent = '')
    {
        $this->fullName = $data['fullName'];
        $this->email = $data['email'];
        $this->phone = $data['phone'];
        $this->company = $data['company'] ?? '';
        $this->designation = $data['designation'] ?? '';
        $this->projectType = $data['projectType'];
        $this->budgetRange = $data['budgetRange'] ?? '';
        $this->message = $data['message'];
        $this->country = $data['country'] ?? '';
        $this->countryPhone = $data['countryPhone'] ?? '';
        $this->subject = $data['subject'] ?? '';
        $this->ipAddress = $ipAddress;
        $this->userAgent = mb_substr($userAgent, 0, 500);
        $now = new \DateTimeImmutable();
        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getDeletedAt(): ?\DateTimeImmutable
    {
        return $this->deletedAt;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function softDelete(): void
    {
        $this->deletedAt = new \DateTimeImmutable();
        $this->updatedAt = $this->deletedAt;
    }

    /**
     * Admin representation. The public API never exposes submissions.
     *
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->fullName,
            'email' => $this->email,
            'phone' => $this->phone,
            'company' => $this->company,
            'designation' => $this->designation,
            'project_type' => $this->projectType,
            'budget_range' => $this->budgetRange,
            'message' => $this->message,
            'country' => $this->country,
            'country_phone' => $this->countryPhone,
            'subject' => $this->subject,
            'status' => $this->status,
            'ip_address' => $this->ipAddress,
            'user_agent' => $this->userAgent,
            'created_at' => $this->createdAt->format(\DATE_ATOM),
            'updated_at' => $this->updatedAt->format(\DATE_ATOM),
            'deleted_at' => $this->deletedAt?->format(\DATE_ATOM),
        ];
    }
}
