<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\BlogPostService;
use App\Support\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class BlogController
{
    public function __construct(private readonly BlogPostService $blogPosts) {}

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->blogPosts->publicList(),
            'meta' => $this->blogPosts->meta(),
        ]);
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->blogPosts->getBySlug((string) $args['slug'])->toArray(),
        ]);
    }
}
