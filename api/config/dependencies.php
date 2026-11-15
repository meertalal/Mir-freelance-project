<?php

declare(strict_types=1);

use App\Application\Handlers\JsonErrorHandler;
use App\Middleware\CorsMiddleware;
use App\Repository\BlogPostRepository;
use App\Repository\CaseStudyRepository;
use App\Repository\FeedbackFormRepository;
use App\Repository\UploadedFileRepository;
use App\Service\BlogPostService;
use App\Service\CaseStudyService;
use App\Service\FeedbackFormService;
use App\Service\RateLimitService;
use App\Service\UploadService;
use App\Support\EntityManagerFactory;
use App\Support\Env;
use Doctrine\ORM\EntityManagerInterface;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

return [
    'app.root' => dirname(__DIR__),

    'settings' => [
        'display_error_details' => !Env::isProduction(),
        'cors_origins' => Env::csv('CORS_ORIGINS', [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ]),
    ],

    EntityManagerInterface::class => static function (ContainerInterface $container): EntityManagerInterface {
        /** @var string $root */
        $root = $container->get('app.root');

        return EntityManagerFactory::create($root);
    },

    LoggerInterface::class => static function (ContainerInterface $container): LoggerInterface {
        /** @var string $root */
        $root = $container->get('app.root');
        $logDir = $root . '/logs';

        if (!is_dir($logDir) && !mkdir($logDir, 0775, true) && !is_dir($logDir)) {
            throw new RuntimeException(sprintf('Unable to create log directory "%s".', $logDir));
        }

        $logger = new Logger('api');
        $logger->pushHandler(new StreamHandler($logDir . '/app.log', Logger::DEBUG));

        return $logger;
    },

    CorsMiddleware::class => static function (ContainerInterface $container): CorsMiddleware {
        /** @var array{cors_origins: list<string>} $settings */
        $settings = $container->get('settings');

        return new CorsMiddleware($settings['cors_origins']);
    },

    JsonErrorHandler::class => static fn (ContainerInterface $container): JsonErrorHandler => new JsonErrorHandler(
        $container->get(LoggerInterface::class),
    ),

    UploadService::class => static function (ContainerInterface $container): UploadService {
        return new UploadService(
            $container->get(UploadedFileRepository::class),
            $container->get(LoggerInterface::class),
        );
    },

    UploadedFileRepository::class => static function (ContainerInterface $container): UploadedFileRepository {
        return new UploadedFileRepository($container->get(EntityManagerInterface::class));
    },

    CaseStudyRepository::class => static function (ContainerInterface $container): CaseStudyRepository {
        return new CaseStudyRepository($container->get(EntityManagerInterface::class));
    },

    BlogPostRepository::class => static function (ContainerInterface $container): BlogPostRepository {
        return new BlogPostRepository($container->get(EntityManagerInterface::class));
    },

    FeedbackFormRepository::class => static function (ContainerInterface $container): FeedbackFormRepository {
        return new FeedbackFormRepository($container->get(EntityManagerInterface::class));
    },

    CaseStudyService::class => static function (ContainerInterface $container): CaseStudyService {
        return new CaseStudyService($container->get(CaseStudyRepository::class));
    },

    BlogPostService::class => static function (ContainerInterface $container): BlogPostService {
        return new BlogPostService($container->get(BlogPostRepository::class));
    },

    FeedbackFormService::class => static function (ContainerInterface $container): FeedbackFormService {
        return new FeedbackFormService($container->get(FeedbackFormRepository::class));
    },

    RateLimitService::class => static function (ContainerInterface $container): RateLimitService {
        return new RateLimitService($container->get(EntityManagerInterface::class));
    },
];
