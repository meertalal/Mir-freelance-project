<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Service\SiteSettingService;
use App\Support\Json;
use App\Support\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class SiteSettingController
{
    public function __construct(private readonly SiteSettingService $settings)
    {
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->settings->get()->toArray()]);
    }

    public function update(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();

        if (!is_array($body)) {
            throw new ValidationException(['body' => 'A JSON body is required.']);
        }

        $settings = $this->settings->update($body);

        return Json::write($response, [
            'message' => 'Settings saved.',
            'data' => $settings->toArray(),
        ]);
    }
}
