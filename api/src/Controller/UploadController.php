<?php

declare(strict_types=1);

namespace App\Controller;

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

}
