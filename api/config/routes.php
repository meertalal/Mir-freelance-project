<?php

declare(strict_types=1);

use App\Controller\Admin\AccountController;
use App\Controller\Admin\AdminToolsController;
use App\Controller\Admin\BlogController;
use App\Controller\Admin\CaseStudyController;
use App\Controller\Admin\ContactSubmissionController;
use App\Controller\Admin\FeedbackController as AdminFeedbackController;
use App\Controller\Admin\ServiceController as AdminServiceController;
use App\Controller\Admin\SiteSettingController as AdminSiteSettingController;
use App\Controller\Admin\TestimonialController as AdminTestimonialController;
use App\Controller\AuthController;
use App\Controller\BlogController as PublicBlogController;
use App\Controller\ContactController;
use App\Controller\FeedbackController;
use App\Controller\HealthController;
use App\Controller\ServiceController;
use App\Controller\SiteSettingController;
use App\Controller\TestimonialController;
use App\Controller\UploadController;
use App\Middleware\AdminAuthMiddleware;
use Psr\Container\ContainerInterface;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use Slim\Views\PhpRenderer;

return static function (App $app, ContainerInterface $container): void {
    // Public.
    $app->get('/api/health', HealthController::class . ':health');
    $app->post('/api/auth/login', AuthController::class . ':login');
    $app->post('/api/contact', ContactController::class . ':submit');
    $app->get('/api/site-settings', SiteSettingController::class . ':show');
    $app->get('/api/services', ServiceController::class . ':index');
    $app->get('/api/testimonials', TestimonialController::class . ':index');
    $app->get('/api/case-studies', \App\Controller\CaseStudyController::class . ':index');
    $app->get('/api/case-studies/{slug}', \App\Controller\CaseStudyController::class . ':show');
    $app->get('/api/blog', PublicBlogController::class . ':index');
    $app->get('/api/blog/{slug}', PublicBlogController::class . ':show');
    $app->get('/api/faqs', AdminToolsController::class . ':publicFaqs');
    $app->get('/api/countries/markets', AdminToolsController::class . ':publicCountries');
    $app->get('/api/seo/page', AdminToolsController::class . ':publicSeoPage');
    $app->get('/api/seo/redirects', AdminToolsController::class . ':publicRedirects');

    // Image uploads require an admin token; uploaded files are managed through content forms.
    $app->group('/api/uploads', function (RouteCollectorProxy $group): void {
        $group->post('/{type:(?:service|testimonial|case_study|blog_post|feedback_form|site_asset)}', UploadController::class . ':store');
    })->add(AdminAuthMiddleware::class);

    // Feedback form (public submission).
    $app->post('/api/feedback', FeedbackController::class . ':submit');
    $app->get('/api/feedback/approved', FeedbackController::class . ':approved');

    // Admin (Bearer / X-Admin-Token).
    $app->group('/api', function (RouteCollectorProxy $group): void {
        $group->post('/auth/logout', AuthController::class . ':logout');
        $group->get('/auth/me', AuthController::class . ':me');
        $group->patch('/admin/account/password', AccountController::class . ':changePassword');

        $group->get('/admin/insights', AdminToolsController::class . ':insights');
        $group->patch('/admin/content-order', AdminToolsController::class . ':reorderContent');
        $group->get('/admin/audit-log', AdminToolsController::class . ':audit');
        $group->get('/admin/backup', AdminToolsController::class . ':backup');
        $group->get('/admin/faqs', AdminToolsController::class . ':faqs');
        $group->get('/admin/countries', AdminToolsController::class . ':countries');
        $group->post('/admin/countries', AdminToolsController::class . ':createCountry');
        $group->patch('/admin/countries/order', AdminToolsController::class . ':reorderCountries');
        $group->patch('/admin/countries/{id:[0-9]+}', AdminToolsController::class . ':updateCountry');
        $group->delete('/admin/countries/{id:[0-9]+}', AdminToolsController::class . ':deleteCountry');
        $group->post('/admin/faqs', AdminToolsController::class . ':createFaq');
        $group->patch('/admin/faqs/order', AdminToolsController::class . ':reorderFaqs');
        $group->patch('/admin/faqs/{id:[0-9]+}', AdminToolsController::class . ':updateFaq');
        $group->delete('/admin/faqs/{id:[0-9]+}', AdminToolsController::class . ':deleteFaq');
        $group->get('/admin/seo/pages', AdminToolsController::class . ':seoPages');
        $group->put('/admin/seo/pages', AdminToolsController::class . ':saveSeoPage');
        $group->get('/admin/seo/redirects', AdminToolsController::class . ':redirects');
        $group->post('/admin/seo/redirects', AdminToolsController::class . ':createRedirect');
        $group->delete('/admin/seo/redirects/{id:[0-9]+}', AdminToolsController::class . ':deleteRedirect');

        $group->get('/admin/site-settings', AdminSiteSettingController::class . ':show');
        $group->put('/admin/site-settings', AdminSiteSettingController::class . ':update');

        $group->get('/admin/services', AdminServiceController::class . ':index');
        $group->post('/admin/services', AdminServiceController::class . ':store');
        $group->get('/admin/services/{id:[0-9]+}', AdminServiceController::class . ':show');
        $group->patch('/admin/services/{id:[0-9]+}', AdminServiceController::class . ':update');
        $group->delete('/admin/services/{id:[0-9]+}', AdminServiceController::class . ':destroy');

        $group->get('/admin/testimonials', AdminTestimonialController::class . ':index');
        $group->post('/admin/testimonials', AdminTestimonialController::class . ':store');
        $group->get('/admin/testimonials/{id:[0-9]+}', AdminTestimonialController::class . ':show');
        $group->patch('/admin/testimonials/{id:[0-9]+}', AdminTestimonialController::class . ':update');
        $group->delete('/admin/testimonials/{id:[0-9]+}', AdminTestimonialController::class . ':destroy');

        $group->get('/admin/case-studies', CaseStudyController::class . ':index');
        $group->post('/admin/case-studies', CaseStudyController::class . ':store');
        $group->get('/admin/case-studies/{id:[0-9]+}', CaseStudyController::class . ':show');
        $group->patch('/admin/case-studies/{id:[0-9]+}', CaseStudyController::class . ':update');
        $group->delete('/admin/case-studies/{id:[0-9]+}', CaseStudyController::class . ':destroy');

        $group->get('/admin/blog', BlogController::class . ':index');
        $group->post('/admin/blog', BlogController::class . ':store');
        $group->get('/admin/blog/{id:[0-9]+}', BlogController::class . ':show');
        $group->patch('/admin/blog/{id:[0-9]+}', BlogController::class . ':update');
        $group->delete('/admin/blog/{id:[0-9]+}', BlogController::class . ':destroy');

        $group->get('/admin/contact-submissions', ContactSubmissionController::class . ':index');
        $group->get('/admin/contact-submissions/{id:[0-9]+}', ContactSubmissionController::class . ':show');
        $group->patch('/admin/contact-submissions/{id:[0-9]+}', ContactSubmissionController::class . ':update');
        $group->delete('/admin/contact-submissions/{id:[0-9]+}', ContactSubmissionController::class . ':destroy');

        $group->get('/admin/feedback', AdminFeedbackController::class . ':index');
        $group->get('/admin/feedback/{id:[0-9]+}', AdminFeedbackController::class . ':show');
        $group->patch('/admin/feedback/{id:[0-9]+}/status', AdminFeedbackController::class . ':updateStatus');
        $group->delete('/admin/feedback/{id:[0-9]+}', AdminFeedbackController::class . ':destroy');

    })->add(AdminAuthMiddleware::class);
};
