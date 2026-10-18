import { useEffect, useState } from "react";
import { ArrowRight, Code2, Menu, X } from "lucide-react";
import { navigationLinks } from "../../data/navigation";
import type { NavbarProps } from "../../types/navigation";

export default function Navbar({
  brandName = "Mir Talal",
  brandSubtitle = "Freelance Web Developer",
  ctaLabel = "Let's Talk",
}: NavbarProps) {
  const [activeLink, setActiveLink] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navbar scroll animation.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Desktop breakpoint: close the dropdown on large screens.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  // Close the dropdown using Escape.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close the dropdown when a navigation link is selected.
  const handleNavigation = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  // Navigation links for desktop and dropdown menus.
  const renderLinks = (mobile = false) =>
    navigationLinks.map(({ label, href }) => {
      const isActive = activeLink === href;

      return (
        <a
          key={href}
          href={href}
          onClick={() => handleNavigation(href)}
          aria-current={isActive ? "location" : undefined}
          className={[
            "whitespace-nowrap font-roboto-condensed",
            "text-sm font-semibold tracking-wide",
            "transition-colors duration-300 ease-in-out",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-white",
            mobile
              ? [
                  "flex min-h-11 w-full items-center rounded-lg px-4",
                  "transition-[background-color,color,transform]",
                  "duration-300 ease-out",
                  "hover:translate-x-1",
                  "hover:bg-white/10 hover:text-[#FFFFFF]",
                  isActive ? "bg-white/10 text-[#FFFFFF]" : "text-white/85",
                ].join(" ")
              : [
                  "relative flex min-h-10 items-center px-2",
                  "after:absolute after:bottom-1 after:left-2",
                  "after:right-2 after:h-0.5 after:rounded-full",
                  "after:bg-[#FFFFFF]",
                  "after:origin-center after:transition-transform",
                  "after:duration-300 after:ease-out",
                  "hover:text-[#FFFFFF]",
                  isActive
                    ? "text-[#FFFFFF] after:scale-x-100"
                    : "text-white/85 after:scale-x-0 hover:after:scale-x-100",
                ].join(" "),
          ].join(" ")}
        >
          {label}
        </a>
      );
    });

  // Shared CTA styling.
  const ctaClasses = [
    "group inline-flex min-h-11 items-center justify-center gap-2",
    "rounded-lg bg-[#5882E8] px-4",
    "font-playfair text-xs font-semibold text-[#000000]",
    "shadow-sm transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 hover:bg-[#092f87] hover:shadow-md",
    "active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-4",
    "focus-visible:outline-white",
  ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-1000 w-full",
        "transition-[padding] duration-500 ease-in-out",
        isScrolled ? "px-2 pt-2 sm:px-4 lg:px-6" : "px-0 pt-0",
      ].join(" ")}
    >
      <nav
        aria-label="Main navigation"
        className={[
          "relative mx-auto flex w-full items-center justify-between",
          "gap-2 sm:gap-3 xl:gap-4",
          "border border-white/10 bg-[#092f58]",
          "backdrop-blur-xl",
          "transition-[max-width,min-height,border-radius,box-shadow,padding]",
          "duration-500 ease-in-out",
          isScrolled
            ? [
                "min-h-14 max-w-280 rounded-full",
                "px-3 shadow-[0_8px_30px_rgba(15,23,42,0.25)]",
                "sm:px-5",
              ].join(" ")
            : [
                "min-h-16 max-w-none rounded-none px-3",
                "sm:min-h-18 sm:px-5",
                "lg:px-6 xl:min-h-19 xl:px-8",
              ].join(" "),
        ].join(" ")}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={() => handleNavigation("#home")}
          aria-label={`${brandName} - ${brandSubtitle}`}
          className={[
            "group flex min-w-0 shrink items-center gap-2",
            "sm:gap-2.5",
          ].join(" ")}
        >
          <Code2
            aria-hidden="true"
            className={[
              "shrink-0 text-[#5882E8]",
              "transition-transform duration-300 ease-out",
              isScrolled ? "h-6 w-6" : "h-7 w-7 sm:h-8 sm:w-8",
              "group-hover:scale-110",
            ].join(" ")}
            strokeWidth={2.5}
          />

          <span className="flex min-w-0 flex-col">
            <span
              className={[
                "truncate font-montserrat font-bold",
                "tracking-tight text-[#FFFFFF]",
                "transition-all duration-300 ease-in-out",
                isScrolled ? "text-sm" : "text-sm sm:text-base",
              ].join(" ")}
            >
              {brandName}
            </span>

            <span
              className={[
                "truncate font-inter font-medium text-white/75",
                "transition-all duration-300 ease-in-out",
                isScrolled ? "text-[9px]" : "text-[9px] sm:text-[10px]",
              ].join(" ")}
            >
              {brandSubtitle}
            </span>
          </span>
        </a>

        {/* Desktop and laptop navigation: 1280px and wider */}
        <div className="hidden flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
          {renderLinks()}
        </div>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 items-center xl:ml-2 xl:flex">
          <a
            href="#contact"
            onClick={() => handleNavigation("#contact")}
            className={ctaClasses}
          >
            <span>{ctaLabel}</span>
            <ArrowRight
              aria-hidden="true"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Mobile, tablet and iPad menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className={[
            "inline-flex h-10 w-10 shrink-0 items-center justify-center",
            "rounded-lg border border-white/15 bg-white/5",
            "text-[#FFFFFF]",
            "transition-[background-color,border-color,transform]",
            "duration-300 ease-out",
            "hover:border-white/30 hover:bg-white/10",
            "active:scale-95",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-white xl:hidden",
          ].join(" ")}
        >
          <span
            className={[
              "transition-transform duration-300 ease-out",
              menuOpen ? "rotate-90" : "rotate-0",
            ].join(" ")}
          >
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </span>
        </button>

        {/* Animated dropdown: all navigation links + Let's Talk */}
        <div
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={[
            "absolute left-0 right-0 top-[calc(100%+8px)]",
            "max-h-[calc(100dvh-100px)] overflow-y-auto",
            "overscroll-contain rounded-2xl",
            "border border-white/10 bg-[#092f58] p-3",
            "shadow-[0_12px_32px_rgba(15,23,42,0.3)]",
            "origin-top",
            "transition-[opacity,transform,visibility]",
            "duration-300 ease-out",
            "xl:hidden",
            menuOpen
              ? "visible translate-y-0 scale-y-100 opacity-100"
              : "invisible -translate-y-2 scale-y-95 opacity-0",
          ].join(" ")}
        >
          <div className="flex flex-col gap-1">{renderLinks(true)}</div>

          {/* Let's Talk stays inside the mobile/tablet dropdown */}
          <a
            href="#contact"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => handleNavigation("#contact")}
            className={`${ctaClasses} mt-3 w-full`}
          >
            <span>{ctaLabel}</span>
            <ArrowRight
              aria-hidden="true"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
