<?php

declare(strict_types=1);

use App\Application\Handlers\JsonErrorHandler;
use App\Middleware\CorsMiddleware;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;
use Slim\App;

return static function (App $app, ContainerInterface $container): void {
    /** @var array{display_error_details: bool} $settings */
    $settings = $container->get('settings');

    $app->addBodyParsingMiddleware();
    $app->addRoutingMiddleware();

    $errorMiddleware = $app->addErrorMiddleware(
        (bool) $settings['display_error_details'],
        true,
        true,
        $container->get(LoggerInterface::class),
    );
    $errorMiddleware->setDefaultErrorHandler($container->get(JsonErrorHandler::class));

    $app->add($container->get(CorsMiddleware::class));
};
