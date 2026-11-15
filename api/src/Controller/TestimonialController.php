<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\TestimonialService;
use App\Support\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class TestimonialController
{
    public function __construct(private readonly TestimonialService $testimonials)
    {
    }

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->testimonials->publicList()]);
    }
}
