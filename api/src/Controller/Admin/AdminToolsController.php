<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Support\Json;
use App\Support\ValidationException;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class AdminToolsController
{
    public function __construct(private readonly EntityManagerInterface $em) {}

    public function insights(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $db = $this->em->getConnection();
        $counts = [];
        foreach (['services', 'testimonials', 'case_studies', 'blog_posts', 'faq_entries'] as $table) {
            $counts[$table] = (int) $db->fetchOne("SELECT COUNT(*) FROM {$table}");
        }
        $submissionCounts = array_fill_keys(['new', 'read', 'archived'], 0);
        foreach ($db->fetchAllAssociative('SELECT status, COUNT(*) total FROM contact_submissions WHERE deleted_at IS NULL GROUP BY status') as $row) {
            $submissionCounts[$row['status']] = (int) $row['total'];
        }
        $from = new \DateTimeImmutable('first day of -5 months 00:00:00');
        $monthly = $db->fetchAllAssociative(
            "SELECT DATE_FORMAT(created_at, '%Y-%m') month_key, COUNT(*) total FROM contact_submissions WHERE deleted_at IS NULL AND created_at >= ? GROUP BY month_key ORDER BY month_key",
            [$from->format('Y-m-d H:i:s')],
        );
        $byMonth = [];
        foreach ($monthly as $row) $byMonth[$row['month_key']] = (int) $row['total'];
        $trend = [];
        for ($offset = 5; $offset >= 0; $offset--) {
            $month = (new \DateTimeImmutable('first day of this month'))->modify("-{$offset} months");
            $key = $month->format('Y-m');
            $trend[] = ['month' => $month->format('M Y'), 'count' => $byMonth[$key] ?? 0];
        }

        return Json::write($response, [
            'data' => [
                'inquiries' => $submissionCounts,
                'trend' => $trend,
                'content' => $counts,
                'recent_activity' => $db->fetchAllAssociative('SELECT id, admin_email, method, path, status_code, created_at FROM admin_audit_log ORDER BY id DESC LIMIT 12'),
                'recent_inquiries' => $db->fetchAllAssociative('SELECT id, full_name, email, project_type, status, created_at FROM contact_submissions WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 5'),
            ],
        ]);
    }

    public function audit(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAllAssociative(
            'SELECT id, admin_email, method, path, status_code, created_at FROM admin_audit_log ORDER BY id DESC LIMIT 200',
        )]);
    }

    public function reorderContent(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();
        $tables = ['services' => 'services', 'testimonials' => 'testimonials', 'portfolio' => 'case_studies'];
        if (!is_array($body) || !isset($tables[$body['type'] ?? '']) || !is_array($body['ids'] ?? null)) {
            throw new ValidationException(['items' => 'A supported content type and ordered IDs are required.']);
        }
        $db = $this->em->getConnection();
        $db->beginTransaction();
        try {
            foreach (array_values($body['ids']) as $index => $id) {
                $db->update($tables[$body['type']], ['sort_order' => ($index + 1) * 10], ['id' => (int) $id]);
            }
            $db->commit();
        } catch (\Throwable $error) { $db->rollBack(); throw $error; }
        return Json::write($response, ['message' => 'Content order saved.']);
    }

    public function backup(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $db = $this->em->getConnection();
        $tables = ['admins', 'admin_tokens', 'site_settings', 'services', 'testimonials', 'case_studies', 'blog_posts', 'contact_submissions', 'feedback_forms', 'uploaded_files', 'faq_entries', 'country_markets', 'page_seo', 'url_redirects', 'admin_audit_log'];
        $snapshot = ['format' => 'mir-talal-backup-v1', 'created_at' => (new \DateTimeImmutable())->format(\DATE_ATOM), 'tables' => []];
        foreach ($tables as $table) {
            $snapshot['tables'][$table] = $db->fetchAllAssociative("SELECT * FROM {$table}");
        }
        $response->getBody()->write(json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8')
            ->withHeader('Content-Disposition', 'attachment; filename="mir-talal-backup-' . date('Y-m-d-His') . '.json"');
    }

    public function faqs(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $rows = $this->em->getConnection()->fetchAllAssociative('SELECT id, category, question, answer, sort_order, is_published FROM faq_entries ORDER BY category, sort_order, id');
        return Json::write($response, ['data' => $rows]);
    }

    public function publicFaqs(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAllAssociative('SELECT id, category, question, answer, sort_order FROM faq_entries WHERE is_published = 1 ORDER BY category, sort_order, id')]);
    }

    public function publicCountries(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAllAssociative(
            'SELECT id, name, region, flag_image, sort_order, show_in_hero, show_in_coverage FROM country_markets WHERE show_in_hero = 1 OR show_in_coverage = 1 ORDER BY sort_order, id',
        )]);
    }

    public function countries(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAllAssociative(
            'SELECT id, name, region, flag_image, sort_order, show_in_hero, show_in_coverage FROM country_markets ORDER BY sort_order, id',
        )]);
    }

    public function createCountry(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $data = $this->countryInput($request);
        $now = date('Y-m-d H:i:s');
        $db = $this->em->getConnection();
        $db->insert('country_markets', $data + ['created_at' => $now, 'updated_at' => $now]);
        return Json::write($response, ['data' => $db->fetchAssociative('SELECT id, name, region, flag_image, sort_order, show_in_hero, show_in_coverage FROM country_markets WHERE id = ?', [$db->lastInsertId()])], 201);
    }

    public function updateCountry(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $data = $this->countryInput($request);
        $data['updated_at'] = date('Y-m-d H:i:s');
        $db = $this->em->getConnection();
        $db->update('country_markets', $data, ['id' => (int) $args['id']]);
        $row = $db->fetchAssociative('SELECT id, name, region, flag_image, sort_order, show_in_hero, show_in_coverage FROM country_markets WHERE id = ?', [(int) $args['id']]);
        if (!$row) throw new \RuntimeException('Country not found.');
        return Json::write($response, ['data' => $row]);
    }

    public function deleteCountry(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->em->getConnection()->delete('country_markets', ['id' => (int) $args['id']]);
        return Json::write($response, ['message' => 'Country deleted.']);
    }

    public function reorderCountries(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();
        if (!is_array($body) || !is_array($body['ids'] ?? null)) throw new ValidationException(['ids' => 'An ordered list of country IDs is required.']);
        $db = $this->em->getConnection();
        $db->beginTransaction();
        try {
            foreach (array_values($body['ids']) as $index => $id) $db->update('country_markets', ['sort_order' => ($index + 1) * 10], ['id' => (int) $id]);
            $db->commit();
        } catch (\Throwable $error) { $db->rollBack(); throw $error; }
        return Json::write($response, ['message' => 'Country order saved.']);
    }

    public function createFaq(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $data = $this->faqInput($request);
        $now = date('Y-m-d H:i:s');
        $this->em->getConnection()->insert('faq_entries', $data + ['created_at' => $now, 'updated_at' => $now]);
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAssociative('SELECT * FROM faq_entries WHERE id = ?', [$this->em->getConnection()->lastInsertId()])], 201);
    }

    public function updateFaq(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $data = $this->faqInput($request);
        $data['updated_at'] = date('Y-m-d H:i:s');
        $db = $this->em->getConnection();
        $db->update('faq_entries', $data, ['id' => (int) $args['id']]);
        $row = $db->fetchAssociative('SELECT * FROM faq_entries WHERE id = ?', [(int) $args['id']]);
        if (!$row) throw new \RuntimeException('FAQ not found.');
        return Json::write($response, ['data' => $row]);
    }

    public function deleteFaq(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->em->getConnection()->delete('faq_entries', ['id' => (int) $args['id']]);
        return Json::write($response, ['message' => 'FAQ deleted.']);
    }

    public function reorderFaqs(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();
        if (!is_array($body) || !is_array($body['items'] ?? null)) throw new ValidationException(['items' => 'An ordered list is required.']);
        $db = $this->em->getConnection();
        $db->beginTransaction();
        try {
            foreach ($body['items'] as $index => $item) {
                if (isset($item['id'])) $db->update('faq_entries', ['sort_order' => ($index + 1) * 10], ['id' => (int) $item['id']]);
            }
            $db->commit();
        } catch (\Throwable $error) { $db->rollBack(); throw $error; }
        return Json::write($response, ['message' => 'FAQ order saved.']);
    }

    public function seoPages(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAllAssociative('SELECT * FROM page_seo ORDER BY path')]);
    }

    public function publicSeoPage(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $path = $this->path((string) ($request->getQueryParams()['path'] ?? '/'));
        $db = $this->em->getConnection();
        $row = $db->fetchAssociative('SELECT * FROM page_seo WHERE path = ?', [$path]);
        if (!$row) {
            foreach ($db->fetchAllAssociative("SELECT * FROM page_seo WHERE path LIKE '%:%'") as $candidate) {
                $pattern = preg_replace('/:[a-zA-Z][a-zA-Z0-9_]*/', '[^/]+', preg_quote($candidate['path'], '#'));
                if (is_string($pattern) && preg_match('#^' . str_replace('\\/', '/', $pattern) . '$#', $path) === 1) { $row = $candidate; break; }
            }
        }
        return Json::write($response, ['data' => $row ?: null]);
    }

    public function saveSeoPage(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();
        if (!is_array($body)) throw new ValidationException(['body' => 'A JSON body is required.']);
        $path = $this->path((string) ($body['path'] ?? ''));
        $title = trim((string) ($body['title'] ?? ''));
        $description = trim((string) ($body['description'] ?? ''));
        $ogTitle = trim((string) ($body['og_title'] ?? ''));
        $ogDescription = trim((string) ($body['og_description'] ?? ''));
        $ogImage = trim((string) ($body['og_image'] ?? ''));
        $errors = [];
        if (mb_strlen($title) > 200 || mb_strlen($ogTitle) > 200) $errors['title'] = 'Titles must be 200 characters or fewer.';
        if (mb_strlen($description) > 320 || mb_strlen($ogDescription) > 320) $errors['description'] = 'Descriptions must be 320 characters or fewer.';
        if (mb_strlen($ogImage) > 255) $errors['og_image'] = 'Image path is too long.';
        if ($errors) throw new ValidationException($errors);
        $now = date('Y-m-d H:i:s');
        $this->em->getConnection()->executeStatement(
            'INSERT INTO page_seo (path,title,description,og_title,og_description,og_image,updated_at) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE title=VALUES(title),description=VALUES(description),og_title=VALUES(og_title),og_description=VALUES(og_description),og_image=VALUES(og_image),updated_at=VALUES(updated_at)',
            [$path, $title, $description, $ogTitle, $ogDescription, $ogImage, $now],
        );
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAssociative('SELECT * FROM page_seo WHERE path = ?', [$path])]);
    }

    public function redirects(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAllAssociative('SELECT * FROM url_redirects ORDER BY id DESC')]);
    }

    public function publicRedirects(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAllAssociative('SELECT from_path, to_path, status_code FROM url_redirects')]);
    }

    public function createRedirect(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();
        if (!is_array($body)) throw new ValidationException(['body' => 'A JSON body is required.']);
        $from = $this->path((string) ($body['from_path'] ?? ''));
        $to = $this->path((string) ($body['to_path'] ?? ''));
        if ($from === '/' || $to === '/' || $from === $to) throw new ValidationException(['from_path' => 'Choose different, non-root paths.']);
        $status = (int) ($body['status_code'] ?? 301);
        if (!in_array($status, [301, 302], true)) throw new ValidationException(['status_code' => 'Redirect status must be 301 or 302.']);
        $this->em->getConnection()->insert('url_redirects', ['from_path' => $from, 'to_path' => $to, 'status_code' => $status, 'created_at' => date('Y-m-d H:i:s')]);
        return Json::write($response, ['data' => $this->em->getConnection()->fetchAssociative('SELECT * FROM url_redirects WHERE id = ?', [$this->em->getConnection()->lastInsertId()])], 201);
    }

    public function deleteRedirect(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->em->getConnection()->delete('url_redirects', ['id' => (int) $args['id']]);
        return Json::write($response, ['message' => 'Redirect deleted.']);
    }

    private function faqInput(ServerRequestInterface $request): array
    {
        $body = $request->getParsedBody();
        if (!is_array($body)) throw new ValidationException(['body' => 'A JSON body is required.']);
        $category = trim((string) ($body['category'] ?? 'General'));
        $question = trim((string) ($body['question'] ?? ''));
        $answer = trim((string) ($body['answer'] ?? ''));
        $errors = [];
        if ($category === '' || mb_strlen($category) > 120) $errors['category'] = 'Category is required (maximum 120 characters).';
        if (mb_strlen($question) < 4 || mb_strlen($question) > 500) $errors['question'] = 'Question must be 4 to 500 characters.';
        if (mb_strlen($answer) < 2) $errors['answer'] = 'Answer is required.';
        if ($errors) throw new ValidationException($errors);
        return ['category' => $category, 'question' => $question, 'answer' => $answer, 'sort_order' => max(0, (int) ($body['sort_order'] ?? 0)), 'is_published' => filter_var($body['is_published'] ?? true, FILTER_VALIDATE_BOOL)];
    }

    private function countryInput(ServerRequestInterface $request): array
    {
        $body = $request->getParsedBody();
        if (!is_array($body)) throw new ValidationException(['body' => 'A JSON body is required.']);
        $name = trim((string) ($body['name'] ?? ''));
        $region = trim((string) ($body['region'] ?? ''));
        $flag = trim((string) ($body['flag_image'] ?? ''));
        $errors = [];
        if ($name === '' || mb_strlen($name) > 100) $errors['name'] = 'Country name is required (maximum 100 characters).';
        if ($region === '' || mb_strlen($region) > 80) $errors['region'] = 'Region is required (maximum 80 characters).';
        if ($flag === '' || mb_strlen($flag) > 255) $errors['flag_image'] = 'Flag image path is required (maximum 255 characters).';
        if ($errors) throw new ValidationException($errors);
        return ['name' => $name, 'region' => $region, 'flag_image' => $flag, 'sort_order' => max(0, (int) ($body['sort_order'] ?? 0)), 'show_in_hero' => filter_var($body['show_in_hero'] ?? true, FILTER_VALIDATE_BOOL), 'show_in_coverage' => filter_var($body['show_in_coverage'] ?? true, FILTER_VALIDATE_BOOL)];
    }

    private function path(string $path): string
    {
        $path = trim($path);
        if ($path === '' || $path[0] !== '/' || str_starts_with($path, '//') || str_contains($path, '?') || str_contains($path, '#') || str_contains($path, '..')) {
            throw new ValidationException(['path' => 'Use a local path starting with / and without query or fragment.']);
        }
        return rtrim($path, '/') ?: '/';
    }
}
