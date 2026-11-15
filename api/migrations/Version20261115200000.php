<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115200000 extends AbstractMigration
{
    public function getDescription(): string { return 'Store the star rating submitted with feedback.'; }

    public function up(Schema $schema): void
    {
        if (!$schema->hasTable('feedback_forms')) {
            $table = $schema->createTable('feedback_forms');
            $table->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
            $table->addColumn('author', 'string', ['length' => 120]);
            $table->addColumn('role', 'string', ['length' => 120, 'default' => '']);
            $table->addColumn('company', 'string', ['length' => 160, 'default' => '']);
            $table->addColumn('message', 'text');
            $table->addColumn('avatar', 'string', ['length' => 255, 'default' => '']);
            $table->addColumn('email', 'string', ['length' => 180, 'default' => '']);
            $table->addColumn('rating', 'smallint', ['default' => 5]);
            $table->addColumn('service_title', 'string', ['length' => 120, 'default' => '']);
            $table->addColumn('service_id', 'integer', ['notnull' => false]);
            $table->addColumn('source', 'string', ['length' => 40, 'default' => 'services']);
            $table->addColumn('status', 'string', ['length' => 20, 'default' => 'new']);
            $table->addColumn('reviewed_by', 'integer', ['notnull' => false]);
            $table->addColumn('reviewed_at', 'datetime_immutable', ['notnull' => false]);
            $table->addColumn('notes', 'text');
            $table->addColumn('sort_order', 'integer', ['default' => 0]);
            $table->addColumn('created_at', 'datetime_immutable');
            $table->addColumn('updated_at', 'datetime_immutable');
            $table->setPrimaryKey(['id']);
            $table->addIndex(['status'], 'idx_feedback_forms_status');
            $table->addIndex(['created_at'], 'idx_feedback_forms_created_at');
            $table->addIndex(['service_id'], 'idx_feedback_forms_service_id');
            return;
        }

        $table = $schema->getTable('feedback_forms');
        foreach ([
            'rating' => ['smallint', ['default' => 5]],
            'service_title' => ['string', ['length' => 120, 'default' => '']],
            'sort_order' => ['integer', ['default' => 0]],
        ] as $column => [$type, $options]) {
            if (!$table->hasColumn($column)) {
                $table->addColumn($column, $type, $options);
            }
        }
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE feedback_forms DROP rating, DROP service_title, DROP sort_order');
    }
}
