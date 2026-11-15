<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'site_settings')]
class SiteSetting
{
    public const ROW_ID = 1;

    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    private int $id = self::ROW_ID;

    #[ORM\Column(type: 'string', length: 180)]
    private string $email = 'mirtalal.baloch@yahoo.com';

    #[ORM\Column(type: 'string', length: 32)]
    private string $phone = '+1 438 905 4165';

    #[ORM\Column(name: 'whatsapp_href', type: 'string', length: 255)]
    private string $whatsappHref = 'https://wa.me/14389054165';

    #[ORM\Column(type: 'string', length: 120)]
    private string $location = 'Serving Clients Worldwide';

    #[ORM\Column(type: 'string', length: 120)]
    private string $hours = 'Mon to Sat, 10:00 AM to 7:00 PM';

    #[ORM\Column(name: 'linkedin_url', type: 'string', length: 255, options: ['default' => ''])]
    private string $linkedinUrl = '';

    #[ORM\Column(name: 'github_url', type: 'string', length: 255, options: ['default' => ''])]
    private string $githubUrl = '';

    #[ORM\Column(name: 'x_url', type: 'string', length: 255, options: ['default' => ''])]
    private string $xUrl = '';

    #[ORM\Column(name: 'instagram_url', type: 'string', length: 255, options: ['default' => ''])]
    private string $instagramUrl = '';

    #[ORM\Column(name: 'facebook_url', type: 'string', length: 255, options: ['default' => ''])]
    private string $facebookUrl = '';

    #[ORM\Column(name: 'youtube_url', type: 'string', length: 255, options: ['default' => ''])]
    private string $youtubeUrl = '';

    #[ORM\Column(name: 'seo_title', type: 'string', length: 200, options: ['default' => ''])]
    private string $seoTitle = '';

    #[ORM\Column(name: 'seo_description', type: 'string', length: 320, options: ['default' => ''])]
    private string $seoDescription = '';

    #[ORM\Column(name: 'og_image', type: 'string', length: 255, options: ['default' => ''])]
    private string $ogImage = '';

    #[ORM\Column(name: 'updated_at', type: 'datetime_immutable')]
    private \DateTimeImmutable $updatedAt;

    public function __construct()
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function getWhatsappHref(): string
    {
        return $this->whatsappHref;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function getHours(): string
    {
        return $this->hours;
    }

    public function getLinkedinUrl(): string
    {
        return $this->linkedinUrl;
    }

    public function getGithubUrl(): string
    {
        return $this->githubUrl;
    }

    public function getXUrl(): string
    {
        return $this->xUrl;
    }

    public function getInstagramUrl(): string
    {
        return $this->instagramUrl;
    }

    public function getFacebookUrl(): string
    {
        return $this->facebookUrl;
    }

    public function getYoutubeUrl(): string
    {
        return $this->youtubeUrl;
    }

    public function getSeoTitle(): string
    {
        return $this->seoTitle;
    }

    public function getSeoDescription(): string
    {
        return $this->seoDescription;
    }

    public function getOgImage(): string
    {
        return $this->ogImage;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setPhone(string $phone): void
    {
        $this->phone = $phone;
    }

    public function setWhatsappHref(string $whatsappHref): void
    {
        $this->whatsappHref = $whatsappHref;
    }

    public function setLocation(string $location): void
    {
        $this->location = $location;
    }

    public function setHours(string $hours): void
    {
        $this->hours = $hours;
    }

    public function setLinkedinUrl(string $url): void
    {
        $this->linkedinUrl = $url;
    }

    public function setGithubUrl(string $url): void
    {
        $this->githubUrl = $url;
    }

    public function setXUrl(string $url): void
    {
        $this->xUrl = $url;
    }

    public function setInstagramUrl(string $url): void
    {
        $this->instagramUrl = $url;
    }

    public function setFacebookUrl(string $url): void
    {
        $this->facebookUrl = $url;
    }

    public function setYoutubeUrl(string $url): void
    {
        $this->youtubeUrl = $url;
    }

    public function setSeoTitle(string $title): void
    {
        $this->seoTitle = $title;
    }

    public function setSeoDescription(string $description): void
    {
        $this->seoDescription = $description;
    }

    public function setOgImage(string $path): void
    {
        $this->ogImage = $path;
    }

    public function touch(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'email' => $this->email,
            'phone' => $this->phone,
            'whatsapp_href' => $this->whatsappHref,
            'location' => $this->location,
            'hours' => $this->hours,
            'social' => [
                'linkedin' => $this->linkedinUrl,
                'github' => $this->githubUrl,
                'x' => $this->xUrl,
                'instagram' => $this->instagramUrl,
                'facebook' => $this->facebookUrl,
                'youtube' => $this->youtubeUrl,
            ],
            'seo' => [
                'title' => $this->seoTitle,
                'description' => $this->seoDescription,
                'og_image' => $this->ogImage,
            ],
            'updated_at' => $this->updatedAt->format(\DATE_ATOM),
        ];
    }
}
