import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import ProcessPage from "../pages/ProcessPage";
import AboutPage from "../pages/AboutPage";
import PortfolioPage from "../pages/PortfolioPage";
import ContactPage from "../pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "process", element: <ProcessPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);
