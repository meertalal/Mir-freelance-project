<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\ServiceCatalogService;
use App\Support\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ServiceController
{
    public function __construct(private readonly ServiceCatalogService $services)
    {
    }

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->services->publicList()]);
    }
}
