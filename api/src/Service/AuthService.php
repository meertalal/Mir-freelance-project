<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Admin;
use App\Entity\AdminToken;
use App\Repository\AdminRepository;
use App\Repository\AdminTokenRepository;
use App\Support\ApiException;
use App\Support\Env;
use App\Support\ValidationException;

final class AuthService
{
    public function __construct(
        private readonly AdminRepository $admins,
        private readonly AdminTokenRepository $tokens,
    ) {
    }

    /**
     * @return array{token: string, expires_at: string, admin: array<string, mixed>}
     */
    public function login(string $email, string $password): array
    {
        $email = mb_strtolower(trim($email));
        $errors = [];

        if ($email === '' || !filter_var($email, \FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'A valid email address is required.';
        }

        if ($password === '') {
            $errors['password'] = 'A password is required.';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        $admin = $this->admins->findOneByEmail($email);

        if ($admin === null || !$admin->isActive() || !password_verify($password, $admin->getPasswordHash())) {
            throw new ApiException('Invalid email or password.', 401);
        }

        $this->tokens->purgeExpired();

        $plainToken = bin2hex(random_bytes(32));
        $ttlDays = max(1, Env::int('AUTH_TOKEN_TTL_DAYS', 7));
        $expiresAt = (new \DateTimeImmutable())->modify(sprintf('+%d days', $ttlDays));

        $this->tokens->create($admin, $plainToken, $expiresAt);

        return [
            'token' => $plainToken,
            'expires_at' => $expiresAt->format(\DATE_ATOM),
            'admin' => $admin->toArray(),
        ];
    }

    /**
     * @return array{admin: Admin, token: AdminToken}|null
     */
    public function authenticate(string $plainToken): ?array
    {
        $token = $this->tokens->findActive(trim($plainToken));

        if ($token === null || $token->getAdmin() === null) {
            return null;
        }

        $this->tokens->touch($token);

        return ['admin' => $token->getAdmin(), 'token' => $token];
    }

    public function logout(AdminToken $token): void
    {
        $this->tokens->delete($token);
    }

    public function changePassword(
        Admin $admin,
        AdminToken $currentToken,
        string $currentPassword,
        string $newPassword,
    ): void {
        $errors = [];

        if (!password_verify($currentPassword, $admin->getPasswordHash())) {
            $errors['current_password'] = 'Current password is incorrect.';
        }

        if (strlen($newPassword) < 8) {
            $errors['new_password'] = 'New password must be at least 8 characters.';
        } elseif (strlen($newPassword) > 255) {
            $errors['new_password'] = 'New password is too long.';
        } elseif (password_verify($newPassword, $admin->getPasswordHash())) {
            $errors['new_password'] = 'New password must be different from the current one.';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        $admin->setPasswordHash(password_hash($newPassword, \PASSWORD_DEFAULT));
        $this->admins->save($admin);

        // Keep the caller signed in, but sign out every other device.
        $this->tokens->deleteForAdminExcept($admin, $currentToken);
    }
}
