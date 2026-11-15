<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Create the uploaded_files table used by the file storage service.
 */
final class Version20261115170000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create uploaded_files table.';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('uploaded_files');

        $table->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $table->addColumn('relative_path', 'string', ['length' => 255]);
        $table->addColumn('original_filename', 'string', ['length' => 255, 'default' => '']);
        $table->addColumn('mime_type', 'string', ['length' => 120, 'default' => '']);
        $table->addColumn('size_bytes', 'integer', ['default' => 0]);
        $table->addColumn('uploadable_type', 'string', ['length' => 40, 'default' => '']);
        $table->addColumn('uploadable_id', 'integer', ['notnull' => false]);
        $table->addColumn('created_at', 'datetime_immutable');
        $table->addColumn('updated_at', 'datetime_immutable');

        $table->setPrimaryKey(['id']);

        $table->addIndex(['uploadable_type', 'uploadable_id'], 'idx_uploaded_files_uploadable');
        $table->addIndex(['created_at'], 'idx_uploaded_files_created');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('uploaded_files');
    }
}
