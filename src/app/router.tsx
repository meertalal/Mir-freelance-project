import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PageLoader from "../components/shared/PageLoader";
import { AdminAuthProvider } from "../features/admin/context/AdminAuthContext";
import ProtectedRoute from "../features/admin/components/ProtectedRoute";
import AdminLayout from "../features/admin/components/AdminLayout";
import {
  AboutPage,
  AdminAccountPage,
  AdminBlogPage,
  AdminCountriesPage,
  AdminDashboardPage,
  AdminFeedbackPage,
  AdminFaqPage,
  AdminLoginPage,
  AdminMediaPage,
  AdminPortfolioPage,
  AdminServicesPage,
  AdminSeoPage,
  AdminSettingsPage,
  AdminSubmissionDetailPage,
  AdminSubmissionsPage,
  AdminTestimonialsPage,
  AdminSystemPage,
  BlogPage,
  BlogPostPage,
  CaseStudyPage,
  ContactPage,
  FaqPage,
  HomePage,
  LegalPage,
  NotFoundPage,
  PortfolioPage,
  PricingPage,
  ProcessPage,
  ServiceDetailPage,
  ServicesPage,
  ThankYouPage,
} from "./lazy-pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "services/:slug", element: <ServiceDetailPage /> },
      { path: "process", element: <ProcessPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "thank-you", element: <ThankYouPage /> },
      { path: "portfolio/:slug", element: <CaseStudyPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogPostPage /> },
      { path: "privacy", element: <LegalPage doc="privacy" /> },
      { path: "terms", element: <LegalPage doc="terms" /> },
      { path: "cookies", element: <LegalPage doc="cookies" /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminAuthProvider>
        <Outlet />
      </AdminAuthProvider>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminLoginPage />
          </Suspense>
        ),
      },
      {
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "submissions", element: <AdminSubmissionsPage /> },
          { path: "submissions/:id", element: <AdminSubmissionDetailPage /> },
          { path: "testimonials", element: <AdminTestimonialsPage /> },
          { path: "services", element: <AdminServicesPage /> },
          { path: "portfolio", element: <AdminPortfolioPage /> },
          { path: "blog", element: <AdminBlogPage /> },
          { path: "media", element: <AdminMediaPage /> },
          { path: "feedback", element: <AdminFeedbackPage /> },
          { path: "faqs", element: <AdminFaqPage /> },
          { path: "countries", element: <AdminCountriesPage /> },
          { path: "seo", element: <AdminSeoPage /> },
          { path: "system", element: <AdminSystemPage /> },
          { path: "settings", element: <AdminSettingsPage /> },
          { path: "account", element: <AdminAccountPage /> },
        ],
      },
    ],
  },
]);
