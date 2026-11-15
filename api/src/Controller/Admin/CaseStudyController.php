<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Service\CaseStudyService;
use App\Support\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class CaseStudyController
{
    public function __construct(private readonly CaseStudyService $caseStudies) {}

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->caseStudies->adminList(),
            'meta' => [
                'status_counts' => $this->caseStudies->statusCounts(),
            ],
        ]);
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->caseStudies->get((int) $args['id'])->toArray(),
        ]);
    }

    public function store(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $caseStudy = $this->caseStudies->create($this->body($request));

        return Json::write($response, ['data' => $caseStudy->toArray()], 201);
    }

    public function update(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $caseStudy = $this->caseStudies->update((int) $args['id'], $this->body($request));

        return Json::write($response, ['data' => $caseStudy->toArray()]);
    }

    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->caseStudies->delete((int) $args['id']);

        return Json::write($response, ['message' => 'Case study deleted.']);
    }

    /** @return array<string, mixed> */
    private function body(ServerRequestInterface $request): array
    {
        $body = $request->getParsedBody();
        if (!is_array($body)) {
            throw new \App\Support\ValidationException(['body' => 'A JSON body is required.']);
        }

        return $body;
    }
}
