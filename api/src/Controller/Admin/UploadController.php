<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Service\UploadService;
use App\Support\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UploadController
{
    public function __construct(private readonly UploadService $upload) {}

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $params = $request->getQueryParams();
        $limit = isset($params['limit']) ? (int) $params['limit'] : 100;

        return Json::write($response, ['data' => $this->upload->listAll($limit)]);
    }

    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->upload->delete((int) $args['id']);

        return Json::write($response, ['message' => 'File deleted.']);
    }

    public function detach(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $file = $this->upload->detach((int) $args['id']);

        return Json::write($response, ['data' => $file->toArray()]);
    }

    public function cleanup(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $params = $request->getQueryParams();
        $days = isset($params['days']) ? (int) $params['days'] : 7;
        $deleted = $this->upload->deleteUnattached($days);

        return Json::write($response, ['message' => "Deleted {$deleted} unattached file(s)."]);
    }
}
