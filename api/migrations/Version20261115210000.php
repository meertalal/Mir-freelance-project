<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115210000 extends AbstractMigration
{
    public function getDescription(): string { return 'Add persistent counters for public API rate limits.'; }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('api_rate_limits');
        $table->addColumn('bucket_key', 'string', ['length' => 64]);
        $table->addColumn('window_started_at', 'bigint');
        $table->addColumn('hit_count', 'integer', ['default' => 0]);
        $table->setPrimaryKey(['bucket_key']);
        $table->addIndex(['window_started_at'], 'idx_api_rate_limits_window');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('api_rate_limits');
    }
}
