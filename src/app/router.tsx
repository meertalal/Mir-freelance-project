import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import ProcessPage from "../pages/ProcessPage";
import AboutPage from "../pages/AboutPage";
import PortfolioPage from "../pages/PortfolioPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import CaseStudyPage from "../pages/CaseStudyPage";
import LegalPage from "../pages/LegalPage";
import BlogPage from "../pages/BlogPage";
import BlogPostPage from "../pages/BlogPostPage";
import ServiceDetailPage from "../pages/ServiceDetailPage";

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
      { path: "portfolio/:slug", element: <CaseStudyPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogPostPage /> },
      { path: "privacy", element: <LegalPage doc="privacy" /> },
      { path: "terms", element: <LegalPage doc="terms" /> },
      { path: "cookies", element: <LegalPage doc="cookies" /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
