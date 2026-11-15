<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\ContactService;
use App\Support\ClientIp;
use App\Support\Json;
use App\Support\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ContactController
{
    public function __construct(private readonly ContactService $contacts)
    {
    }

    public function submit(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = $request->getParsedBody();

        if (!is_array($body)) {
            throw new ValidationException(['body' => 'A JSON body is required.']);
        }

        $this->contacts->submit(
            $body,
            ClientIp::fromRequest($request),
            mb_substr($request->getHeaderLine('User-Agent'), 0, 500),
        );

        return Json::write($response, [
            'message' => "Thanks! Your message has been received. I'll reply within one business day.",
        ], 201);
    }
}
