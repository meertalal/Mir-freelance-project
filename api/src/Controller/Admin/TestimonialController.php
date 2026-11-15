<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Service\TestimonialService;
use App\Support\Json;
use App\Support\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class TestimonialController
{
    public function __construct(private readonly TestimonialService $testimonials)
    {
    }

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->testimonials->adminList()]);
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->testimonials->get((int) $args['id'])->toArray(),
        ]);
    }

    public function store(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $testimonial = $this->testimonials->create($this->body($request));

        return Json::write($response, ['data' => $testimonial->toArray()], 201);
    }

    public function update(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $testimonial = $this->testimonials->update((int) $args['id'], $this->body($request));

        return Json::write($response, ['data' => $testimonial->toArray()]);
    }

    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->testimonials->delete((int) $args['id']);

        return Json::write($response, ['message' => 'Testimonial deleted.']);
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
