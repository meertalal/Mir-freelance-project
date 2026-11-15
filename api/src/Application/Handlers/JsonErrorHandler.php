<?php

declare(strict_types=1);

namespace App\Application\Handlers;

use App\Support\ApiException;
use App\Support\Json;
use App\Support\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpException;
use Slim\Interfaces\ErrorHandlerInterface;
use Slim\Psr7\Response;
use Throwable;

final class JsonErrorHandler implements ErrorHandlerInterface
{
    public function __construct(private readonly LoggerInterface $logger)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        Throwable $exception,
        bool $displayErrorDetails,
        bool $logErrors,
        bool $logErrorDetails,
    ): ResponseInterface {
        [$status, $message, $details] = $this->map($exception);

        if ($logErrors && $status >= 500) {
            $this->logger->error($exception->getMessage(), [
                'exception' => $exception,
                'path' => $request->getUri()->getPath(),
                'method' => $request->getMethod(),
            ]);
        }

        $error = ['message' => $message];

        if ($details !== []) {
            $error['details'] = $details;
        }

        if ($displayErrorDetails) {
            $error['debug'] = [
                'type' => $exception::class,
                'message' => $exception->getMessage(),
            ];

            if ($status >= 500) {
                $error['debug']['trace'] = $exception->getTraceAsString();
            }
        }

        return Json::write(new Response(), ['error' => $error], $status);
    }

    /**
     * @return array{0: int, 1: string, 2: array<string, mixed>}
     */
    private function map(Throwable $exception): array
    {
        if ($exception instanceof ValidationException) {
            return [422, $exception->getMessage(), $exception->getDetails()];
        }

        if ($exception instanceof ApiException) {
            return [$exception->getStatus(), $exception->getMessage(), $exception->getDetails()];
        }

        if ($exception instanceof HttpException) {
            $code = (int) $exception->getCode();
            $status = $code >= 400 && $code < 600 ? $code : 500;
            $message = $exception->getMessage() !== '' ? $exception->getMessage() : 'Request failed.';

            return [$status, $message, []];
        }

        return [500, 'Unexpected server error.', []];
    }
}
