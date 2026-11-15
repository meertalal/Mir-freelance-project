<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Service\ServiceCatalogService;
use App\Support\Json;
use App\Support\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ServiceController
{
    public function __construct(private readonly ServiceCatalogService $services)
    {
    }

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->services->adminList()]);
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->services->get((int) $args['id'])->toArray(),
        ]);
    }

    public function store(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $service = $this->services->create($this->body($request));

        return Json::write($response, ['data' => $service->toArray()], 201);
    }

    public function update(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $service = $this->services->update((int) $args['id'], $this->body($request));

        return Json::write($response, ['data' => $service->toArray()]);
    }

    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->services->delete((int) $args['id']);

        return Json::write($response, ['message' => 'Service deleted.']);
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
