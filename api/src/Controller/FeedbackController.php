<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\FeedbackFormService;
use App\Service\RateLimitService;
use App\Support\ClientIp;
use App\Support\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class FeedbackController
{
    public function __construct(
        private readonly FeedbackFormService $feedbackForms,
        private readonly RateLimitService $rateLimits,
    ) {}

    public function submit(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();

        if (!is_array($body)) {
            throw new \App\Support\ValidationException(['body' => 'A JSON body is required.']);
        }

        $this->rateLimits->enforce('feedback', ClientIp::fromRequest($request), 5, 3600, 'Too many feedback submissions. Please try again in an hour.');

        $feedback = $this->feedbackForms->create($body);

        return Json::write($response, [
            'message' => 'Thanks! Your feedback has been submitted for review.',
            'data' => $feedback->toArray(),
        ], 201);
    }

    public function approved(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $limit = isset($request->getQueryParams()['limit']) ? (int) $request->getQueryParams()['limit'] : 12;

        return Json::write($response, [
            'data' => $this->feedbackForms->approved($limit),
        ]);
    }

    public function pending(ServerRequestInterface $response): ResponseInterface
    {
        // Only admin should call this - public endpoint returns nothing
        return Json::write($response, ['data' => []]);
    }
}
