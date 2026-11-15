<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115190000 extends AbstractMigration
{
    public function getDescription(): string { return 'Add admin-managed country markets for the hero and global coverage section.'; }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('country_markets');
        $table->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $table->addColumn('name', 'string', ['length' => 100]);
        $table->addColumn('region', 'string', ['length' => 80, 'default' => 'Other']);
        $table->addColumn('flag_image', 'string', ['length' => 255]);
        $table->addColumn('sort_order', 'integer', ['default' => 0]);
        $table->addColumn('show_in_hero', 'boolean', ['default' => true]);
        $table->addColumn('show_in_coverage', 'boolean', ['default' => true]);
        $table->addColumn('created_at', 'datetime_immutable');
        $table->addColumn('updated_at', 'datetime_immutable');
        $table->setPrimaryKey(['id']);
        $table->addUniqueIndex(['name'], 'uniq_country_markets_name');
        $table->addIndex(['sort_order'], 'idx_country_markets_order');
    }

    public function postUp(Schema $schema): void
    {
        $rows = [
            ['USA', 'Americas', '/image/flags/usa-flag.webp'],
            ['Canada', 'Americas', '/image/flags/canadian-flag.webp'],
            ['UK', 'Europe', '/image/flags/uk-flag.webp'],
            ['Australia', 'Asia-Pacific', '/image/flags/australian-flag.webp'],
            ['UAE', 'Middle East', '/image/flags/uae-flag.webp'],
            ['Oman', 'Middle East', '/image/flags/omani-flag.webp'],
            ['Bahrain', 'Middle East', '/image/flags/bahrain-flag.webp'],
            ['Switzerland', 'Europe', '/image/flags/switzerland-flag.webp'],
            ['Turkey', 'Middle East', '/image/flags/turkish-flag.webp'],
            ['Germany', 'Europe', '/image/flags/german-flag.webp'],
        ];
        $now = date('Y-m-d H:i:s');
        foreach ($rows as $index => [$name, $region, $flag]) {
            $this->connection->insert('country_markets', [
                'name' => $name,
                'region' => $region,
                'flag_image' => $flag,
                'sort_order' => ($index + 1) * 10,
                'show_in_hero' => true,
                'show_in_coverage' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    public function down(Schema $schema): void { $schema->dropTable('country_markets'); }
}
