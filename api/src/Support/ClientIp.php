<?php

declare(strict_types=1);

namespace App\Support;

use Psr\Http\Message\ServerRequestInterface;

final class ClientIp
{
    public static function fromRequest(ServerRequestInterface $request): string
    {
        if (Env::bool('TRUST_PROXY')) {
            $forwarded = $request->getHeaderLine('X-Forwarded-For');
            if ($forwarded !== '') {
                $first = trim(explode(',', $forwarded)[0]);
                if (filter_var($first, \FILTER_VALIDATE_IP) !== false) {
                    return $first;
                }
            }
        }

        $remote = (string) ($request->getServerParams()['REMOTE_ADDR'] ?? '');

        return filter_var($remote, \FILTER_VALIDATE_IP) !== false ? $remote : 'unknown';
    }
}
