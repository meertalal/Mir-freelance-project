<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\UploadedFile;
use App\Service\UploadService;
use App\Service\RateLimitService;
use App\Entity\Admin;
use App\Support\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UploadController
{
    public function __construct(
        private readonly UploadService $upload,
        private readonly RateLimitService $rateLimits,
    ) {}

    public function store(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $data = $request->getParsedBody() ?: [];
        $files = $request->getUploadedFiles() ?: [];

        $uploadableType = (string) $request->getAttribute('type');
        $admin = $request->getAttribute('admin');
        $identity = $admin instanceof Admin ? (string) $admin->getId() : 'unknown';
        $this->rateLimits->enforce('admin-upload', $identity, 30, 3600, 'Upload limit reached. Please try again later.');

        $file = $this->upload->store($data, $files, $uploadableType);

        return Json::write($response, ['data' => $file->toArray()], 201);
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $file = $this->upload->fileData((int) $args['id']);

        return Json::write($response, ['data' => $file]);
    }

    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $this->upload->delete((int) $args['id']);

        return Json::write($response, ['message' => 'File deleted.']);
    }

    public function listUnattached(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Json::write($response, ['data' => $this->upload->listUnattached()]);
    }

    public function deleteUnattached(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $deleted = $this->upload->deleteUnattached(7);

        return Json::write($response, ['message' => "Deleted {$deleted} unattached file(s)."]);
    }
}
