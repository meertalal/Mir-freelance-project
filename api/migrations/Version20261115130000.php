<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115130000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create the site_settings table and seed the current contact details.';
    }

    public function up(Schema $schema): void
    {
        $settings = $schema->createTable('site_settings');
        $settings->addColumn('id', 'integer');
        $settings->addColumn('email', 'string', ['length' => 180]);
        $settings->addColumn('phone', 'string', ['length' => 32]);
        $settings->addColumn('whatsapp_href', 'string', ['length' => 255, 'default' => '']);
        $settings->addColumn('location', 'string', ['length' => 120, 'default' => '']);
        $settings->addColumn('hours', 'string', ['length' => 120, 'default' => '']);
        $settings->addColumn('linkedin_url', 'string', ['length' => 255, 'default' => '']);
        $settings->addColumn('github_url', 'string', ['length' => 255, 'default' => '']);
        $settings->addColumn('x_url', 'string', ['length' => 255, 'default' => '']);
        $settings->addColumn('instagram_url', 'string', ['length' => 255, 'default' => '']);
        $settings->addColumn('facebook_url', 'string', ['length' => 255, 'default' => '']);
        $settings->addColumn('youtube_url', 'string', ['length' => 255, 'default' => '']);
        $settings->addColumn('seo_title', 'string', ['length' => 200, 'default' => '']);
        $settings->addColumn('seo_description', 'string', ['length' => 320, 'default' => '']);
        $settings->addColumn('og_image', 'string', ['length' => 255, 'default' => '']);
        $settings->addColumn('updated_at', 'datetime_immutable');
        $settings->setPrimaryKey(['id']);
    }

    public function postUp(Schema $schema): void
    {
        // postUp runs after the migration has been frozen, so execute directly.
        $this->connection->executeStatement(
            'INSERT INTO site_settings (id, email, phone, whatsapp_href, location, hours, updated_at)
             VALUES (1, :email, :phone, :whatsapp, :location, :hours, :updatedAt)',
            [
                'email' => 'mirtalal.baloch@yahoo.com',
                'phone' => '+1 438 905 4165',
                'whatsapp' => 'https://wa.me/14389054165',
                'location' => 'Serving Clients Worldwide',
                'hours' => 'Mon to Sat, 10:00 AM to 7:00 PM',
                'updatedAt' => (new \DateTimeImmutable())->format('Y-m-d H:i:s'),
            ],
        );
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('site_settings');
    }
}
