<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20261115150000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create services and testimonials tables and seed the current site content.';
    }

    public function up(Schema $schema): void
    {
        $services = $schema->createTable('services');
        $services->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $services->addColumn('slug', 'string', ['length' => 120]);
        $services->addColumn('title', 'string', ['length' => 120]);
        $services->addColumn('description', 'string', ['length' => 500]);
        $services->addColumn('icon', 'string', ['length' => 40, 'default' => 'code2']);
        $services->addColumn('image', 'string', ['length' => 255, 'default' => '']);
        $services->addColumn('image_alt', 'string', ['length' => 255, 'default' => '']);
        $services->addColumn('sort_order', 'integer', ['default' => 0]);
        $services->addColumn('is_published', 'boolean', ['default' => true]);
        $services->addColumn('created_at', 'datetime_immutable');
        $services->addColumn('updated_at', 'datetime_immutable');
        $services->setPrimaryKey(['id']);
        $services->addUniqueIndex(['slug'], 'uniq_services_slug');
        $services->addIndex(['sort_order'], 'idx_services_sort');

        $testimonials = $schema->createTable('testimonials');
        $testimonials->addColumn('id', 'integer', ['autoincrement' => true, 'unsigned' => true]);
        $testimonials->addColumn('author', 'string', ['length' => 120]);
        $testimonials->addColumn('role', 'string', ['length' => 120, 'default' => '']);
        $testimonials->addColumn('company', 'string', ['length' => 160, 'default' => '']);
        $testimonials->addColumn('quote', 'text');
        $testimonials->addColumn('avatar', 'string', ['length' => 255, 'default' => '']);
        $testimonials->addColumn('rating', 'integer', ['default' => 5]);
        $testimonials->addColumn('sort_order', 'integer', ['default' => 0]);
        $testimonials->addColumn('is_published', 'boolean', ['default' => true]);
        $testimonials->addColumn('created_at', 'datetime_immutable');
        $testimonials->addColumn('updated_at', 'datetime_immutable');
        $testimonials->setPrimaryKey(['id']);
        $testimonials->addIndex(['sort_order'], 'idx_testimonials_sort');
    }

    public function postUp(Schema $schema): void
    {
        $now = (new \DateTimeImmutable())->format('Y-m-d H:i:s');

        $services = [
            ['web-development', 'Web Development', 'Modern, responsive websites using latest technologies.', 'code2', '/image/services/serviceWebDevelopment.webp', 'Laptop displaying code in a modern workspace'],
            ['mobile-app-development', 'Mobile App Development', 'iOS & Android apps tailored to your business needs.', 'smartphone', '/image/services/serviceMobileAppDevelopment.webp', 'Smartphone displaying a mobile app beside design sketches'],
            ['ai-agents-automation', 'AI Agents & Automation', 'AI voice agents, chatbots and workflow automation.', 'bot', '/image/services/serviceAiAgentsAutomation.webp', 'Glowing AI neural network orb above a laptop'],
            ['chatbot-development', 'Chatbot Development', 'Smart chatbots for websites, WhatsApp and business platforms.', 'message-square', '/image/services/serviceChatbotDevelopment.webp', 'Smartphone showing a chatbot conversation on a desk'],
            ['saas-development', 'SaaS & Product Development', 'Scalable SaaS products built for multiple tenants.', 'database', '/image/services/serviceSaasProductDevelopment.webp', 'Laptop displaying a SaaS analytics dashboard'],
            ['ui-ux-design', 'UI/UX Design', 'Clean, modern designs built to convert.', 'palette', '/image/services/serviceUiUxDesign.webp', 'Designer wireframes, tablet mockup and blue color swatches'],
            ['cloud-devops', 'Cloud & DevOps', 'Deployment, server setup, CI/CD and maintenance.', 'cloud', '/image/services/serviceCloudDevops.webp', 'Server room with blue-lit racks and cabling'],
            ['digital-marketing', 'Digital Marketing', 'SEO, content strategy and social media marketing.', 'chart', '/image/services/serviceDigitalMarketing.webp', 'Laptop with marketing analytics charts beside a planning notebook'],
        ];

        foreach ($services as $index => $service) {
            $this->connection->executeStatement(
                'INSERT INTO services (slug, title, description, icon, image, image_alt, sort_order, is_published, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)',
                [
                    $service[0],
                    $service[1],
                    $service[2],
                    $service[3],
                    $service[4],
                    $service[5],
                    ($index + 1) * 10,
                    $now,
                    $now,
                ],
            );
        }

        $testimonials = [
            ['Michael Thompson', 'CEO', 'Real Estate Company', 'Excellent work! Delivered our platform on time with outstanding quality. Communication was smooth and professional throughout the project. Highly recommended!', '/image/clients/clientMichaelThompson.webp'],
            ['Sarah Johnson', 'Founder', 'Digital Solutions', 'The entire process was smooth and professional. The final product was thoughtfully designed and delivered to a high standard.', '/image/clients/clientSarahJohnson.webp'],
            ['David Lee', 'Product Manager', 'Technology Company', 'A reliable development partner who transformed our ideas into a polished digital experience.', '/image/clients/clientDavidLee.webp'],
            ['James Wilson', 'CEO', 'Growth Labs', 'Clear process, strong communication, and excellent delivery quality. Exactly the partner we needed for a complex digital product.', '/image/clients/clientJamesWilson.webp'],
        ];

        foreach ($testimonials as $index => $testimonial) {
            $this->connection->executeStatement(
                'INSERT INTO testimonials (author, role, company, quote, avatar, rating, sort_order, is_published, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, 5, ?, 1, ?, ?)',
                [
                    $testimonial[0],
                    $testimonial[1],
                    $testimonial[2],
                    $testimonial[3],
                    $testimonial[4],
                    ($index + 1) * 10,
                    $now,
                    $now,
                ],
            );
        }
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('testimonials');
        $schema->dropTable('services');
    }
}
