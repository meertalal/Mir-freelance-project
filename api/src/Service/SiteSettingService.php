<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\SiteSetting;
use App\Repository\SiteSettingRepository;
use App\Support\ValidationException;

final class SiteSettingService
{
    private const URL_FIELDS = [
        'whatsapp_href' => 'WhatsApp link',
        'linkedin' => 'LinkedIn URL',
        'github' => 'GitHub URL',
        'x' => 'X (Twitter) URL',
        'instagram' => 'Instagram URL',
        'facebook' => 'Facebook URL',
        'youtube' => 'YouTube URL',
    ];

    public function __construct(private readonly SiteSettingRepository $settings)
    {
    }

    public function get(): SiteSetting
    {
        $settings = $this->settings->find();

        if ($settings === null) {
            $settings = new SiteSetting();
            $this->settings->save($settings);
        }

        return $settings;
    }

    /**
     * @param array<string, mixed> $input
     */
    public function update(array $input): SiteSetting
    {
        $settings = $this->get();
        $errors = [];

        $email = $this->text($input['email'] ?? $settings->getEmail());
        if (!filter_var($email, \FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 180) {
            $errors['email'] = 'Enter a valid contact email address.';
        }

        $phone = $this->text($input['phone'] ?? $settings->getPhone());
        $digits = preg_replace('/\D+/', '', $phone) ?? '';
        if (!preg_match('/^[0-9+()\-.\s]{7,32}$/', $phone) || strlen($digits) < 7 || strlen($digits) > 15) {
            $errors['phone'] = 'Enter a valid phone number with 7 to 15 digits.';
        }

        $location = $this->text($input['location'] ?? $settings->getLocation());
        if (mb_strlen($location) > 120) {
            $errors['location'] = 'Location is too long.';
        }

        $hours = $this->text($input['hours'] ?? $settings->getHours());
        if (mb_strlen($hours) > 120) {
            $errors['hours'] = 'Working hours are too long.';
        }

        /** @var array<string, mixed> $social */
        $social = is_array($input['social'] ?? null) ? $input['social'] : [];
        $socialValues = [];

        foreach (self::URL_FIELDS as $field => $label) {
            if ($field === 'whatsapp_href') {
                continue;
            }

            $value = $this->text($social[$field] ?? '');
            if ($value !== '' && !$this->isHttpUrl($value)) {
                $errors['social.' . $field] = $label . ' must start with http:// or https://.';
            } elseif (mb_strlen($value) > 255) {
                $errors['social.' . $field] = $label . ' is too long.';
            }

            $socialValues[$field] = $value;
        }

        $whatsapp = $this->text($input['whatsapp_href'] ?? $settings->getWhatsappHref());
        if ($whatsapp !== '' && !$this->isHttpUrl($whatsapp)) {
            $errors['whatsapp_href'] = 'WhatsApp link must start with http:// or https://.';
        } elseif (mb_strlen($whatsapp) > 255) {
            $errors['whatsapp_href'] = 'WhatsApp link is too long.';
        }

        /** @var array<string, mixed> $seo */
        $seo = is_array($input['seo'] ?? null) ? $input['seo'] : [];
        $seoTitle = $this->text($seo['title'] ?? $settings->getSeoTitle());
        $seoDescription = $this->text($seo['description'] ?? $settings->getSeoDescription());
        $ogImage = $this->text($seo['og_image'] ?? $settings->getOgImage());

        if (mb_strlen($seoTitle) > 200) {
            $errors['seo.title'] = 'SEO title is too long (max 200 characters).';
        }

        if (mb_strlen($seoDescription) > 320) {
            $errors['seo.description'] = 'SEO description is too long (max 320 characters).';
        }

        if (mb_strlen($ogImage) > 255) {
            $errors['seo.og_image'] = 'OG image path is too long.';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        $settings->setEmail($email);
        $settings->setPhone($phone);
        $settings->setWhatsappHref($whatsapp);
        $settings->setLocation($location);
        $settings->setHours($hours);
        $settings->setLinkedinUrl($socialValues['linkedin']);
        $settings->setGithubUrl($socialValues['github']);
        $settings->setXUrl($socialValues['x']);
        $settings->setInstagramUrl($socialValues['instagram']);
        $settings->setFacebookUrl($socialValues['facebook']);
        $settings->setYoutubeUrl($socialValues['youtube']);
        $settings->setSeoTitle($seoTitle);
        $settings->setSeoDescription($seoDescription);
        $settings->setOgImage($ogImage);
        $settings->touch();

        $this->settings->save($settings);

        return $settings;
    }

    private function text(mixed $value): string
    {
        if (!is_scalar($value)) {
            return '';
        }

        return trim((string) $value);
    }

    private function isHttpUrl(string $value): bool
    {
        if (filter_var($value, \FILTER_VALIDATE_URL) === false) {
            return false;
        }

        $scheme = strtolower((string) parse_url($value, \PHP_URL_SCHEME));

        return in_array($scheme, ['http', 'https'], true);
    }
}
