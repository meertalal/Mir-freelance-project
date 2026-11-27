import { lazy } from "react";

export const HomePage = lazy(() => import("../pages/HomePage"));
export const ServicesPage = lazy(() => import("../pages/ServicesPage"));
export const ServiceDetailPage = lazy(() => import("../pages/ServiceDetailPage"));
export const ProcessPage = lazy(() => import("../pages/ProcessPage"));
export const AboutPage = lazy(() => import("../pages/AboutPage"));
export const PortfolioPage = lazy(() => import("../pages/PortfolioPage"));
export const CaseStudyPage = lazy(() => import("../pages/CaseStudyPage"));
export const ContactPage = lazy(() => import("../pages/ContactPage"));
export const PricingPage = lazy(() => import("../pages/PricingPage"));
export const FaqPage = lazy(() => import("../pages/FaqPage"));
export const BlogPage = lazy(() => import("../pages/BlogPage"));
export const BlogPostPage = lazy(() => import("../pages/BlogPostPage"));
export const LegalPage = lazy(() => import("../pages/LegalPage"));
export const ThankYouPage = lazy(() => import("../pages/ThankYouPage"));
export const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Admin
export const AdminLoginPage = lazy(
  () => import("../features/admin/pages/AdminLoginPage"),
);
export const AdminDashboardPage = lazy(
  () => import("../features/admin/pages/AdminDashboardPage"),
);
export const AdminSubmissionsPage = lazy(
  () => import("../features/admin/pages/AdminSubmissionsPage"),
);
export const AdminSubmissionDetailPage = lazy(
  () => import("../features/admin/pages/AdminSubmissionDetailPage"),
);
export const AdminSettingsPage = lazy(
  () => import("../features/admin/pages/AdminSettingsPage"),
);
export const AdminAccountPage = lazy(
  () => import("../features/admin/pages/AdminAccountPage"),
);
export const AdminTestimonialsPage = lazy(
  () => import("../features/admin/pages/AdminTestimonialsPage"),
);
export const AdminServicesPage = lazy(
  () => import("../features/admin/pages/AdminServicesPage"),
);
export const AdminPortfolioPage = lazy(() => import("../features/admin/pages/AdminPortfolioPage"));
export const AdminBlogPage = lazy(() => import("../features/admin/pages/AdminBlogPage"));
export const AdminFeedbackPage = lazy(() => import("../features/admin/pages/AdminFeedbackPage"));
export const AdminFaqPage = lazy(() => import("../features/admin/pages/AdminFaqPage"));
export const AdminCountriesPage = lazy(() => import("../features/admin/pages/AdminCountriesPage"));
export const AdminSeoPage = lazy(() => import("../features/admin/pages/AdminSeoPage"));
export const AdminSystemPage = lazy(() => import("../features/admin/pages/AdminSystemPage"));
