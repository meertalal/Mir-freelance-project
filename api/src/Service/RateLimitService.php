<?php

declare(strict_types=1);

namespace App\Service;

use App\Support\ApiException;
use Doctrine\ORM\EntityManagerInterface;

final class RateLimitService
{
    public function __construct(private readonly EntityManagerInterface $em) {}

    public function enforce(string $bucket, string $identity, int $limit, int $windowSeconds, string $message): void
    {
        $windowSeconds = max(1, $windowSeconds);
        $windowStart = intdiv(time(), $windowSeconds) * $windowSeconds;
        $bucketKey = hash('sha256', $bucket . "\0" . $identity);
        $db = $this->em->getConnection();

        $db->executeStatement(
            'INSERT INTO api_rate_limits (bucket_key, window_started_at, hit_count) VALUES (?, ?, 1) '
            . 'ON DUPLICATE KEY UPDATE hit_count = IF(window_started_at = ?, hit_count + 1, 1), window_started_at = ?',
            [$bucketKey, $windowStart, $windowStart, $windowStart],
        );

        $count = (int) $db->fetchOne('SELECT hit_count FROM api_rate_limits WHERE bucket_key = ?', [$bucketKey]);
        // Keep the limiter table bounded without a scheduled job.
        if (mt_rand(1, 100) === 1) {
            $db->executeStatement('DELETE FROM api_rate_limits WHERE window_started_at < ?', [time() - 86400]);
        }

        if ($count > $limit) {
            throw new ApiException($message, 429);
        }
    }
}
