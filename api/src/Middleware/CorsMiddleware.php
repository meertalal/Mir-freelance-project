<?php

declare(strict_types=1);

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Response;

final class CorsMiddleware implements MiddlewareInterface
{
    /**
     * @param list<string> $allowedOrigins
     */
    public function __construct(private readonly array $allowedOrigins)
    {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $allowedOrigin = $this->resolveOrigin($request->getHeaderLine('Origin'));

        if ($request->getMethod() === 'OPTIONS') {
            $response = new Response(204);

            return $this->secure($allowedOrigin === null ? $response : $this->apply($response, $allowedOrigin));
        }

        $response = $handler->handle($request);

        return $this->secure($allowedOrigin === null ? $response : $this->apply($response, $allowedOrigin));
    }

    private function resolveOrigin(string $origin): ?string
    {
        if ($origin === '') {
            return null;
        }

        if (in_array('*', $this->allowedOrigins, true)) {
            return $origin;
        }

        return in_array($origin, $this->allowedOrigins, true) ? $origin : null;
    }

    private function apply(ResponseInterface $response, string $origin): ResponseInterface
    {
        return $response
            ->withHeader('Access-Control-Allow-Origin', $origin)
            ->withHeader('Vary', 'Origin')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token')
            ->withHeader('Access-Control-Max-Age', '86400');
    }

    private function secure(ResponseInterface $response): ResponseInterface
    {
        return $response
            ->withHeader('X-Content-Type-Options', 'nosniff')
            ->withHeader('X-Frame-Options', 'DENY')
            ->withHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
            ->withHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    }
}
