<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Service\AuthService;
use App\Support\Json;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Response;

final class AdminAuthMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly AuthService $auth,
        private readonly EntityManagerInterface $em,
    ) {}

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $token = $this->extractToken($request);
        $authenticated = $this->auth->authenticate($token);

        if ($authenticated === null) {
            return Json::write(new Response(), [
                'error' => ['message' => 'Unauthorized. Provide a valid admin token.'],
            ], 401);
        }

        $admin = $authenticated['admin'];
        $response = $handler->handle(
            $request->withAttribute('admin', $admin)
                ->withAttribute('admin_token', $authenticated['token']),
        );

        if (in_array(strtoupper($request->getMethod()), ['POST', 'PUT', 'PATCH', 'DELETE'], true)
            || str_ends_with($request->getUri()->getPath(), '/admin/backup')) {
            try {
                $this->em->getConnection()->insert('admin_audit_log', [
                    'admin_id' => $admin->getId(),
                    'admin_email' => $admin->getEmail(),
                    'method' => strtoupper($request->getMethod()),
                    'path' => substr($request->getUri()->getPath(), 0, 255),
                    'status_code' => $response->getStatusCode(),
                    'created_at' => date('Y-m-d H:i:s'),
                ]);
            } catch (\Throwable) {
                // Audit logging must not break an admin action.
            }
        }

        return $response;
    }

    private function extractToken(ServerRequestInterface $request): string
    {
        $header = $request->getHeaderLine('Authorization');

        if ($header !== '' && preg_match('/^Bearer\s+(.+)$/i', $header, $matches) === 1) {
            return trim($matches[1]);
        }

        return trim($request->getHeaderLine('X-Admin-Token'));
    }
}
