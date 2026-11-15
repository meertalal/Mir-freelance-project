<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\Admin;
use App\Entity\AdminToken;
use App\Service\AuthService;
use App\Support\ApiException;
use App\Support\Json;
use App\Support\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class AccountController
{
    public function __construct(private readonly AuthService $auth)
    {
    }

    public function changePassword(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $admin = $request->getAttribute('admin');
        $token = $request->getAttribute('admin_token');

        if (!$admin instanceof Admin || !$token instanceof AdminToken) {
            throw new ApiException('Unauthorized.', 401);
        }

        $body = $request->getParsedBody();

        if (!is_array($body)) {
            throw new ValidationException(['body' => 'A JSON body is required.']);
        }

        $this->auth->changePassword(
            $admin,
            $token,
            (string) ($body['current_password'] ?? ''),
            (string) ($body['new_password'] ?? ''),
        );

        return Json::write($response, ['message' => 'Password updated.']);
    }
}
