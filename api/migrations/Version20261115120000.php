<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115120000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create admins, admin_tokens and contact_submissions tables.';
    }

    public function up(Schema $schema): void
    {
        $admins = $schema->createTable('admins');
        $admins->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $admins->addColumn('email', 'string', ['length' => 180]);
        $admins->addColumn('password_hash', 'string', ['length' => 255]);
        $admins->addColumn('name', 'string', ['length' => 120]);
        $admins->addColumn('is_active', 'boolean', ['default' => true]);
        $admins->addColumn('created_at', 'datetime_immutable');
        $admins->setPrimaryKey(['id']);
        $admins->addUniqueIndex(['email'], 'uniq_admins_email');

        $tokens = $schema->createTable('admin_tokens');
        $tokens->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $tokens->addColumn('admin_id', 'integer', ['unsigned' => true]);
        $tokens->addColumn('token_hash', 'string', ['length' => 64]);
        $tokens->addColumn('created_at', 'datetime_immutable');
        $tokens->addColumn('expires_at', 'datetime_immutable');
        $tokens->addColumn('last_used_at', 'datetime_immutable', ['notnull' => false]);
        $tokens->setPrimaryKey(['id']);
        $tokens->addUniqueIndex(['token_hash'], 'uniq_admin_tokens_hash');
        $tokens->addIndex(['admin_id'], 'idx_admin_tokens_admin');
        $tokens->addForeignKeyConstraint('admins', ['admin_id'], ['id'], ['onDelete' => 'CASCADE'], 'fk_admin_tokens_admin');

        $submissions = $schema->createTable('contact_submissions');
        $submissions->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $submissions->addColumn('full_name', 'string', ['length' => 120]);
        $submissions->addColumn('email', 'string', ['length' => 180]);
        $submissions->addColumn('phone', 'string', ['length' => 32]);
        $submissions->addColumn('company', 'string', ['length' => 180, 'default' => '']);
        $submissions->addColumn('designation', 'string', ['length' => 180, 'default' => '']);
        $submissions->addColumn('project_type', 'string', ['length' => 80]);
        $submissions->addColumn('budget_range', 'string', ['length' => 80, 'default' => '']);
        $submissions->addColumn('message', 'text');
        $submissions->addColumn('country', 'string', ['length' => 80, 'default' => '']);
        $submissions->addColumn('country_phone', 'string', ['length' => 16, 'default' => '']);
        $submissions->addColumn('subject', 'string', ['length' => 200, 'default' => '']);
        $submissions->addColumn('status', 'string', ['length' => 20, 'default' => 'new']);
        $submissions->addColumn('ip_address', 'string', ['length' => 45, 'default' => '']);
        $submissions->addColumn('user_agent', 'string', ['length' => 500, 'default' => '']);
        $submissions->addColumn('created_at', 'datetime_immutable');
        $submissions->addColumn('updated_at', 'datetime_immutable');
        $submissions->addColumn('deleted_at', 'datetime_immutable', ['notnull' => false]);
        $submissions->setPrimaryKey(['id']);
        $submissions->addIndex(['status'], 'idx_contact_submissions_status');
        $submissions->addIndex(['created_at'], 'idx_contact_submissions_created');
        $submissions->addIndex(['ip_address'], 'idx_contact_submissions_ip');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('contact_submissions');
        $schema->dropTable('admin_tokens');
        $schema->dropTable('admins');
    }
}
