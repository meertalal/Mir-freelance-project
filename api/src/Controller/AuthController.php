<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Admin;
use App\Entity\AdminToken;
use App\Service\AuthService;
use App\Support\Json;
use App\Support\ClientIp;
use App\Support\ValidationException;
use App\Service\RateLimitService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class AuthController
{
    public function __construct(
        private readonly AuthService $auth,
        private readonly RateLimitService $rateLimits,
    )
    {
    }

    public function login(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $this->body($request);
        $ip = ClientIp::fromRequest($request);
        $email = mb_strtolower(trim((string) ($body['email'] ?? '')));
        $this->rateLimits->enforce('login-ip', $ip, 20, 900, 'Too many login attempts. Please wait 15 minutes and try again.');
        $this->rateLimits->enforce('login-account', $ip . '|' . $email, 5, 900, 'Too many login attempts for this account. Please wait 15 minutes and try again.');

        $result = $this->auth->login(
            (string) ($body['email'] ?? ''),
            (string) ($body['password'] ?? ''),
        );

        return Json::write($response, $result);
    }

    public function me(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $admin = $request->getAttribute('admin');

        return Json::write($response, [
            'admin' => $admin instanceof Admin ? $admin->toArray() : null,
        ]);
    }

    public function logout(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $token = $request->getAttribute('admin_token');

        if ($token instanceof AdminToken) {
            $this->auth->logout($token);
        }

        return Json::write($response, ['message' => 'Signed out.']);
    }

    /**
     * @return array<string, mixed>
     */
    private function body(ServerRequestInterface $request): array
    {
        $body = $request->getParsedBody();

        if (!is_array($body)) {
            throw new ValidationException(['body' => 'A JSON body is required.']);
        }

        return $body;
    }
}
