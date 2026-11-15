<?php

declare(strict_types=1);

namespace App\Controller;

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
            'data' => $this->caseStudies->publicList(),
        ]);
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->caseStudies->getBySlug((string) $args['slug'])->toArray(),
        ]);
    }
}
