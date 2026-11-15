<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115180000 extends AbstractMigration
{
    public function getDescription(): string { return 'Add FAQ, per-page SEO, redirects and admin audit tables.'; }

    public function up(Schema $schema): void
    {
        $faq = $schema->createTable('faq_entries');
        $faq->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $faq->addColumn('category', 'string', ['length' => 120, 'default' => 'General']);
        $faq->addColumn('question', 'string', ['length' => 500]);
        $faq->addColumn('answer', 'text');
        $faq->addColumn('sort_order', 'integer', ['default' => 0]);
        $faq->addColumn('is_published', 'boolean', ['default' => true]);
        $faq->addColumn('created_at', 'datetime_immutable');
        $faq->addColumn('updated_at', 'datetime_immutable');
        $faq->setPrimaryKey(['id']);
        $faq->addIndex(['category', 'sort_order'], 'idx_faq_category_order');

        $seo = $schema->createTable('page_seo');
        $seo->addColumn('path', 'string', ['length' => 255]);
        $seo->addColumn('title', 'string', ['length' => 200, 'default' => '']);
        $seo->addColumn('description', 'string', ['length' => 320, 'default' => '']);
        $seo->addColumn('og_title', 'string', ['length' => 200, 'default' => '']);
        $seo->addColumn('og_description', 'string', ['length' => 320, 'default' => '']);
        $seo->addColumn('og_image', 'string', ['length' => 255, 'default' => '']);
        $seo->addColumn('updated_at', 'datetime_immutable');
        $seo->setPrimaryKey(['path']);

        $redirects = $schema->createTable('url_redirects');
        $redirects->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $redirects->addColumn('from_path', 'string', ['length' => 255]);
        $redirects->addColumn('to_path', 'string', ['length' => 255]);
        $redirects->addColumn('status_code', 'integer', ['default' => 301]);
        $redirects->addColumn('created_at', 'datetime_immutable');
        $redirects->setPrimaryKey(['id']);
        $redirects->addUniqueIndex(['from_path'], 'uniq_redirect_from_path');

        $audit = $schema->createTable('admin_audit_log');
        $audit->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $audit->addColumn('admin_id', 'integer', ['notnull' => false]);
        $audit->addColumn('admin_email', 'string', ['length' => 180, 'default' => '']);
        $audit->addColumn('method', 'string', ['length' => 10]);
        $audit->addColumn('path', 'string', ['length' => 255]);
        $audit->addColumn('status_code', 'integer');
        $audit->addColumn('created_at', 'datetime_immutable');
        $audit->setPrimaryKey(['id']);
        $audit->addIndex(['created_at'], 'idx_admin_audit_created');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('admin_audit_log');
        $schema->dropTable('url_redirects');
        $schema->dropTable('page_seo');
        $schema->dropTable('faq_entries');
    }
}
