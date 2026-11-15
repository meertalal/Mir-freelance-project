<?php

declare(strict_types=1);

namespace App\Support;

use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Configuration;
use Doctrine\ORM\Mapping\Driver\AttributeDriver;
use Psr\Cache\CacheItemPoolInterface;
use Symfony\Component\Cache\Adapter\PhpFilesAdapter;

/**
 * Builds the Doctrine EntityManager from environment configuration.
 * Shared by the HTTP app and the CLI console.
 */
final class EntityManagerFactory
{
    public static function create(string $root): EntityManagerInterface
    {
        $config = new Configuration();
        $config->setMetadataDriverImpl(
            new AttributeDriver([$root . '/src/Entity']),
        );

        $proxyDir = $root . '/var/cache/doctrine/proxies';
        if (!is_dir($proxyDir) && !mkdir($proxyDir, 0775, true) && !is_dir($proxyDir)) {
            throw new \RuntimeException(sprintf('Unable to create proxy directory "%s".', $proxyDir));
        }

        $config->setProxyDir($proxyDir);
        $config->setProxyNamespace('App\\DoctrineProxies');
        $config->setAutoGenerateProxyClasses(!Env::isProduction());
        $config->setMetadataCache(self::cache('metadata', $root));
        $config->setQueryCache(self::cache('query', $root));

        return new EntityManager(self::connection(), $config);
    }

    private static function connection(): \Doctrine\DBAL\Connection
    {
        return DriverManager::getConnection([
            'driver' => 'pdo_mysql',
            'host' => Env::get('DB_HOST', '127.0.0.1'),
            'port' => Env::int('DB_PORT', 3306),
            'dbname' => Env::get('DB_NAME', 'mir_talal'),
            'user' => Env::get('DB_USER', 'root'),
            'password' => Env::get('DB_PASSWORD', ''),
            'charset' => 'utf8mb4',
        ]);
    }

    private static function cache(string $namespace, string $root): CacheItemPoolInterface
    {
        $directory = $root . '/var/cache/doctrine';

        return new PhpFilesAdapter($namespace, 0, $directory);
    }
}
