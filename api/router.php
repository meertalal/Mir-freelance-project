<?php

declare(strict_types=1);

$publicRoot = realpath(__DIR__ . '/public');
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

if ($publicRoot !== false && is_string($requestPath)) {
    $decodedPath = rawurldecode($requestPath);

    if (!str_contains($decodedPath, "\0")) {
        $relativePath = ltrim($decodedPath, "/\\");
        $assetPath = realpath($publicRoot . DIRECTORY_SEPARATOR . $relativePath);
        $publicPrefix = rtrim($publicRoot, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;

        if (
            $assetPath !== false
            && str_starts_with($assetPath, $publicPrefix)
            && is_file($assetPath)
            && !str_starts_with(basename($assetPath), '.')
            && !in_array(strtolower(pathinfo($assetPath, PATHINFO_EXTENSION)), ['php', 'phtml', 'phar'], true)
        ) {
            return false;
        }
    }
}

require __DIR__ . '/public/index.php';
