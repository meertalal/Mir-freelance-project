<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\SiteSettingService;
use App\Support\Json;
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
}
