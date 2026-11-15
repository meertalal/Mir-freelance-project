<?php
require __DIR__ . '/vendor/autoload.php';

use Doctrine\DBAL\DriverManager;
use Doctrine\Migrations\Configuration\Configuration;
use Doctrine\Migrations\Configuration\Connection\ExistingConnection;
use Doctrine\Migrations\Metadata\Storage\TableMetadataStorage;
use Doctrine\Migrations\Tools\Console\Command\ExecuteCommand;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\NullOutput;
use Doctrine\Migrations\Version\AlphabeticalComparator;

$conn = DriverManager::getConnection([
    'driver' => 'pdo_mysql',
    'host' => getenv('MYSQL_HOST') ?: '127.0.0.1',
    'port' => (int) (getenv('MYSQL_PORT') ?: 3306),
    'dbname' => getenv('MYSQL_DATABASE') ?: 'mir_talal',
    'user' => getenv('MYSQL_USER') ?: 'root',
    'password' => getenv('MYSQL_PASSWORD') ?: '',
]);

$storage = new TableMetadataStorage($conn, new AlphabeticalComparator());
$config = new Configuration($storage);

// ConfigurationArray needs the migration classes keyed by name.
$configArray = new \Doctrine\Migrations\Configuration\Migration\ConfigurationArray($config->getMigrationClasses());

$connectionProvider = new ExistingConnection($conn);

$dependencyFactory = \Doctrine\Migrations\DependencyFactory::fromConnection(
    $configArray,
    $connectionProvider
);

$command = new ExecuteCommand($dependencyFactory);

$definition = $command->getDefinition();
$newArgs = [];
$addedDirection = false;
foreach ($definition->getArguments() as $name => $argument) {
    if ($name === 'versions' && !$addedDirection) {
        $newArgs['direction'] = new InputArgument('direction', null, false, 'up');
        $addedDirection = true;
    }
    $newArgs[$name] = $argument;
}
if (!$addedDirection) {
    $newArgs['direction'] = new InputArgument('direction', null, false, 'up');
}

// Reorder so any required args stay before optional ones.
$required = [];
$optional = [];
foreach ($newArgs as $name => $argument) {
    if ($argument->isRequired()) {
        $required[$name] = $argument;
    } else {
        $optional[$name] = $argument;
    }
}
$ordered = array_merge($required, $optional);

$definition = new \Symfony\Component\Console\Input\InputDefinition($ordered);
$command->setDefinition($definition);

$input = new ArrayInput([
    'direction' => 'up',
    'no-interaction' => true,
    'version' => 'Version20261115170000',
], $definition);
$output = new NullOutput();
$result = $command->run($input, $output);

echo "Migration exit code: {$result}\n";

$exists = $conn->fetchOne('SELECT 1 FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = "uploaded_files"');
echo "uploaded_files exists: " . ($exists ? 'yes' : 'no') . "\n";
