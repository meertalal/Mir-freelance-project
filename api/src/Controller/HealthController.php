<?php

declare(strict_types=1);

namespace App\Controller;

use App\Support\Env;
use App\Support\Json;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class HealthController
{
    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    public function health(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $database = 'ok';

        try {
            $this->em->getConnection()->executeQuery('SELECT 1');
        } catch (\Throwable) {
            $database = 'unavailable';
        }

        return Json::write($response, [
            'status' => $database === 'ok' ? 'ok' : 'degraded',
            'database' => $database,
            'env' => Env::get('APP_ENV', 'production'),
            'time' => gmdate(\DATE_ATOM),
        ], $database === 'ok' ? 200 : 503);
    }
}
