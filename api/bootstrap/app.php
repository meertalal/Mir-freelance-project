<?php

declare(strict_types=1);

use App\Support\Env;
use DI\ContainerBuilder;
use Slim\App;
use Slim\Factory\AppFactory;

$root = dirname(__DIR__);

require_once $root . '/vendor/autoload.php';

Env::load($root);

$builder = new ContainerBuilder();
/** @var array<string, mixed> $definitions */
$definitions = require $root . '/config/dependencies.php';
$builder->addDefinitions($definitions);
$container = $builder->build();

$app = AppFactory::createFromContainer($container);

/** @var callable(App, Psr\Container\ContainerInterface): void $middleware */
$middleware = require $root . '/config/middleware.php';
$middleware($app, $container);

/** @var callable(App, Psr\Container\ContainerInterface): void $routes */
$routes = require $root . '/config/routes.php';
$routes($app, $container);

return $app;
