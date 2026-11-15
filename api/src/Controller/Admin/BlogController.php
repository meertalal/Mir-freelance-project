<?php

declare(strict_types=1);

namespace App\Controller\Admin;

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
            'data' => $this->blogPosts->adminList(),
            'meta' => [
                'status_counts' => $this->blogPosts->statusCounts(),
                'categories' => $this->blogPosts->categories(),
            ],
        ]);
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->blogPosts->get((int) $args['id'])->toArray(),
        ]);
    }

    public function store(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $blogPost = $this->blogPosts->create($this->body($request));

        return Json::write($response, ['data' => $blogPost->toArray()], 201);
    }

    public function update(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $blogPost = $this->blogPosts->update((int) $args['id'], $this->body($request));

        return Json::write($response, ['data' => $blogPost->toArray()]);
    }

    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->blogPosts->delete((int) $args['id']);

        return Json::write($response, ['message' => 'Blog post deleted.']);
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
