<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Service\FeedbackFormService;
use App\Entity\Admin;
use App\Support\Json;
use App\Support\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class FeedbackController
{
    public function __construct(private readonly FeedbackFormService $feedbackForms) {}

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $params = $request->getQueryParams();
        $status = isset($params['status']) && $params['status'] !== '' ? (string) $params['status'] : null;
        $limit = isset($params['limit']) ? (int) $params['limit'] : 100;

        return Json::write($response, [
            'data' => $this->feedbackForms->list($status, $limit),
            'meta' => [
                'status_counts' => $this->feedbackForms->statusCounts(),
            ],
        ]);
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        return Json::write($response, [
            'data' => $this->feedbackForms->get((int) $args['id'])->toArray(),
        ]);
    }

    public function updateStatus(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $body = $request->getParsedBody();

        if (!is_array($body) || !isset($body['status'])) {
            throw new ValidationException(['status' => 'A status value is required.']);
        }

        $notes = isset($body['notes']) ? (string) $body['notes'] : '';
        $admin = $request->getAttribute('admin');
        $reviewerId = $admin instanceof Admin ? (int) $admin->getId() : 0;

        $feedback = $this->feedbackForms->updateStatus(
            (int) $args['id'],
            (string) $body['status'],
            $reviewerId,
            $notes
        );

        return Json::write($response, ['data' => $feedback->toArray()]);
    }

    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->feedbackForms->delete((int) $args['id']);

        return Json::write($response, ['message' => 'Feedback deleted.']);
    }
}
