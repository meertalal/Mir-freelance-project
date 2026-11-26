<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261120120000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create CMS blog post and case study tables.';
    }

    public function up(Schema $schema): void
    {
        $blog = $schema->createTable('blog_posts');
        $blog->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $blog->addColumn('slug', 'string', ['length' => 120]);
        $blog->addColumn('title', 'string', ['length' => 120]);
        $blog->addColumn('excerpt', 'text');
        $blog->addColumn('cover_image', 'string', ['length' => 255, 'default' => '']);
        $blog->addColumn('cover_image_alt', 'string', ['length' => 255, 'default' => '']);
        $blog->addColumn('body', 'text');
        $blog->addColumn('icon', 'string', ['length' => 40, 'default' => 'pen-line']);
        $blog->addColumn('category', 'string', ['length' => 40]);
        $blog->addColumn('sort_order', 'integer', ['default' => 0]);
        $blog->addColumn('is_published', 'boolean', ['default' => false]);
        $blog->addColumn('status', 'string', ['length' => 20, 'default' => 'draft']);
        $blog->addColumn('author_name', 'string', ['length' => 120, 'default' => '']);
        $blog->addColumn('author_role', 'string', ['length' => 120, 'default' => '']);
        $blog->addColumn('author_avatar', 'string', ['length' => 255, 'default' => '']);
        $blog->addColumn('meta_title', 'string', ['length' => 160, 'default' => '']);
        $blog->addColumn('meta_description', 'string', ['length' => 320, 'default' => '']);
        $blog->addColumn('meta_keywords', 'string', ['length' => 255, 'default' => '']);
        $blog->addColumn('created_at', 'datetime_immutable');
        $blog->addColumn('updated_at', 'datetime_immutable');
        $blog->setPrimaryKey(['id']);
        $blog->addUniqueIndex(['slug'], 'uniq_blog_posts_slug');
        $blog->addIndex(['slug'], 'idx_blog_posts_slug');
        $blog->addIndex(['status'], 'idx_blog_posts_status');
        $blog->addIndex(['is_published'], 'idx_blog_posts_published');
        $blog->addIndex(['category'], 'idx_blog_posts_category');

        $caseStudies = $schema->createTable('case_studies');
        $caseStudies->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $caseStudies->addColumn('slug', 'string', ['length' => 120]);
        $caseStudies->addColumn('title', 'string', ['length' => 120]);
        $caseStudies->addColumn('excerpt', 'text');
        $caseStudies->addColumn('cover_image', 'string', ['length' => 255, 'default' => '']);
        $caseStudies->addColumn('cover_image_alt', 'string', ['length' => 255, 'default' => '']);
        $caseStudies->addColumn('body', 'text');
        $caseStudies->addColumn('icon', 'string', ['length' => 40, 'default' => 'code2']);
        $caseStudies->addColumn('project_type', 'string', ['length' => 80]);
        $caseStudies->addColumn('sort_order', 'integer', ['default' => 0]);
        $caseStudies->addColumn('is_published', 'boolean', ['default' => false]);
        $caseStudies->addColumn('status', 'string', ['length' => 20, 'default' => 'draft']);
        $caseStudies->addColumn('testimonial_id', 'integer', ['notnull' => false]);
        $caseStudies->addColumn('client_company', 'string', ['length' => 120, 'default' => '']);
        $caseStudies->addColumn('client_name', 'string', ['length' => 120, 'default' => '']);
        $caseStudies->addColumn('client_role', 'string', ['length' => 120, 'default' => '']);
        $caseStudies->addColumn('client_website', 'string', ['length' => 255, 'default' => '']);
        $caseStudies->addColumn('challenge', 'text');
        $caseStudies->addColumn('solution', 'text');
        $caseStudies->addColumn('results', 'text');
        $caseStudies->addColumn('created_at', 'datetime_immutable');
        $caseStudies->addColumn('updated_at', 'datetime_immutable');
        $caseStudies->setPrimaryKey(['id']);
        $caseStudies->addUniqueIndex(['slug'], 'uniq_case_studies_slug');
        $caseStudies->addIndex(['slug'], 'idx_case_studies_slug');
        $caseStudies->addIndex(['status'], 'idx_case_studies_status');
        $caseStudies->addIndex(['is_published'], 'idx_case_studies_published');
        $caseStudies->addIndex(['project_type'], 'idx_case_studies_project_type');
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('case_studies');
        $schema->dropTable('blog_posts');
    }
}
