<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Service\ContactSubmissionService;
use App\Support\ValidationException;
use App\Support\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ContactSubmissionController
{
    public function __construct(private readonly ContactSubmissionService $submissions)
    {
    }

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $params = $request->getQueryParams();

        return Json::write($response, $this->submissions->list(
            (int) ($params['page'] ?? 1),
            (int) ($params['per_page'] ?? 20),
            isset($params['status']) && $params['status'] !== '' ? (string) $params['status'] : null,
            isset($params['q']) && $params['q'] !== '' ? (string) $params['q'] : null,
            filter_var($params['include_deleted'] ?? false, \FILTER_VALIDATE_BOOL),
        ));
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $submission = $this->submissions->get((int) $args['id']);

        return Json::write($response, ['data' => $submission->toArray()]);
    }

    public function update(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $body = $request->getParsedBody();

        if (!is_array($body) || !isset($body['status'])) {
            throw new ValidationException(['status' => 'A status value is required.']);
        }

        $submission = $this->submissions->updateStatus((int) $args['id'], (string) $body['status']);

        return Json::write($response, ['data' => $submission->toArray()]);
    }

    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->submissions->delete((int) $args['id']);

        return Json::write($response, ['message' => 'Submission deleted.']);
    }
}
