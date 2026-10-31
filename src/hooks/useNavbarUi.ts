import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DESKTOP_NAV_QUERY = "(min-width: 1280px)";
const SCROLL_SHRINK_AT = 40;

export default function useNavbarUi() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_SHRINK_AT);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_NAV_QUERY);
    const handleResize = () => {
      if (mediaQuery.matches) setMenuOpen(false);
    };
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return { menuOpen, isScrolled, toggleMenu, closeMenu };
}
