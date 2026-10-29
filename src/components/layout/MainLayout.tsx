import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);

      return () => window.clearTimeout(timer);
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
