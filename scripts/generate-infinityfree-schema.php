<?php

declare(strict_types=1);

use Doctrine\DBAL\Platforms\MySQLPlatform;
use Doctrine\DBAL\Schema\Schema;

$root = dirname(__DIR__);
require $root . '/api/vendor/autoload.php';

$schema = new Schema();
$migrationFiles = glob($root . '/api/migrations/Version*.php') ?: [];
sort($migrationFiles, SORT_STRING);

foreach ($migrationFiles as $file) {
    $class = 'App\\Migrations\\' . basename($file, '.php');
    $migration = (new ReflectionClass($class))->newInstanceWithoutConstructor();
    $migration->up($schema);
}

$sql = "-- Generated from api/migrations. Import into a new InfinityFree database with phpMyAdmin.\n";
$sql .= "-- Do not import this over a database that already contains application tables.\n\n";

foreach ($schema->toSql(new MySQLPlatform()) as $statement) {
    $sql .= $statement . ";\n\n";
}

$output = $argv[1] ?? 'php://stdout';
if (file_put_contents($output, $sql) === false) {
    fwrite(STDERR, "Unable to write schema SQL to {$output}.\n");
    exit(1);
}
