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

  // Close mobile navigation when entering desktop screens.
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

  // Close dropdown with Escape.
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

  // Close dropdown when a navigation link is selected.
  const handleNavigation = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  // Navigation links for desktop and mobile.
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
            "font-semibold tracking-wide",
            "transition-colors duration-300 ease-in-out",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-white",

            mobile
              ? [
                  "flex min-h-11 w-full items-center rounded-lg px-4",
                  "text-sm",
                  "transition-[background-color,color,transform]",
                  "duration-300 ease-out",
                  "hover:translate-x-1",
                  "hover:bg-white/10 hover:text-white",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/85",
                ].join(" ")
              : [
                  "relative flex min-h-10 items-center justify-center",
                  "px-2 2xl:px-3",
                  "2xl:text-base",
                  "min-[1920px]:min-h-12",
                  "min-[1920px]:px-4",
                  "min-[1920px]:text-lg",
                  "min-[2560px]:px-5",
                  "min-[2560px]:text-xl",
                  "after:absolute after:bottom-1",
                  "after:left-2 after:right-2",
                  "after:h-0.5 after:rounded-full",
                  "after:bg-white",
                  "after:origin-center after:transition-transform",
                  "after:duration-300 after:ease-out",
                  "hover:text-white",
                  isActive
                    ? "text-white after:scale-x-100"
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
    "font-playfair text-xs font-semibold text-black",
    "shadow-sm transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 hover:bg-[#7296f0] hover:shadow-md",
    "active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-4",
    "focus-visible:outline-white",
    "2xl:min-h-12 2xl:gap-3 2xl:px-5 2xl:text-sm",
    "min-[1920px]:min-h-14 min-[1920px]:gap-3",
    "min-[1920px]:rounded-xl min-[1920px]:px-7",
    "min-[1920px]:text-base",
    "min-[2560px]:min-h-16 min-[2560px]:px-9",
    "min-[2560px]:text-lg",
  ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-[1000] w-full",
        "transition-[padding] duration-500 ease-in-out",
        isScrolled
          ? [
              "px-2 pt-2",
              "sm:px-4 lg:px-6",
              "2xl:px-8",
              "min-[1920px]:px-12",
              "min-[2560px]:px-16",
            ].join(" ")
          : "px-0 pt-0",
      ].join(" ")}
    >
      <nav
        aria-label="Main navigation"
        className={[
          "relative mx-auto flex w-full items-center justify-between",
          "gap-2 sm:gap-3 xl:gap-4 2xl:gap-6",
          "min-[1920px]:gap-10",
          "min-[2560px]:gap-14",
          "border border-white/10 bg-[#092f58]",
          "backdrop-blur-xl",
          "transition-[max-width,min-height,border-radius,box-shadow,padding]",
          "duration-500 ease-in-out",

          isScrolled
            ? [
                "min-h-14 max-w-[1600px] rounded-full",
                "px-3 shadow-[0_8px_30px_rgba(15,23,42,0.25)]",
                "sm:px-5 lg:px-6 2xl:px-8",
                "min-[1920px]:min-h-16 min-[1920px]:max-w-[1900px]",
                "min-[1920px]:px-10",
                "min-[2560px]:min-h-[76px]",
                "min-[2560px]:max-w-[2200px]",
                "min-[2560px]:px-14",
              ].join(" ")
            : [
                "min-h-16 max-w-none rounded-none px-3",
                "sm:min-h-[72px] sm:px-5",
                "lg:px-6 xl:min-h-[76px] xl:px-8",
                "2xl:min-h-20 2xl:px-12",
                "min-[1920px]:min-h-[92px]",
                "min-[1920px]:px-16",
                "min-[2560px]:min-h-[104px]",
                "min-[2560px]:px-20",
              ].join(" "),
        ].join(" ")}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={() => handleNavigation("#home")}
          aria-label={`${brandName} - ${brandSubtitle}`}
          className={[
            "group flex min-w-0 shrink-0 items-center gap-2",
            "sm:gap-2.5 2xl:gap-3",
            "min-[1920px]:gap-4",
            "min-[2560px]:gap-5",
          ].join(" ")}
        >
          <Code2
            aria-hidden="true"
            className={[
              "shrink-0 text-[#5882E8]",
              "transition-transform duration-300 ease-out",
              isScrolled
                ? "h-6 w-6"
                : "h-7 w-7 sm:h-8 sm:w-8",
              "2xl:h-9 2xl:w-9",
              "min-[1920px]:h-10 min-[1920px]:w-10",
              "min-[2560px]:h-12 min-[2560px]:w-12",
              "group-hover:scale-110",
            ].join(" ")}
            strokeWidth={2.5}
          />

          <span className="flex min-w-0 flex-col">
            <span
              className={[
                "truncate font-montserrat font-bold",
                "tracking-tight text-white",
                "transition-all duration-300 ease-in-out",
                isScrolled
                  ? "text-sm 2xl:text-base"
                  : "text-sm sm:text-base 2xl:text-lg",
                "min-[1920px]:text-xl",
                "min-[2560px]:text-2xl",
              ].join(" ")}
            >
              {brandName}
            </span>

            <span
              className={[
                "truncate font-inter font-medium text-white/75",
                "transition-all duration-300 ease-in-out",
                isScrolled
                  ? "text-[9px] 2xl:text-[10px]"
                  : "text-[9px] sm:text-[10px] 2xl:text-xs",
                "min-[1920px]:text-sm",
                "min-[2560px]:text-base",
              ].join(" ")}
            >
              {brandSubtitle}
            </span>
          </span>
        </a>

        {/* Desktop navigation: 1280px and wider */}
        <div
          className={[
            "hidden min-w-0 flex-1 items-center justify-center",
            "gap-0.5 xl:flex 2xl:gap-1",
            "min-[1920px]:gap-2",
            "min-[2560px]:gap-3",
          ].join(" ")}
        >
          {renderLinks()}
        </div>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 items-center xl:ml-2 xl:flex 2xl:ml-4 min-[1920px]:ml-6 min-[2560px]:ml-8">
          <a
            href="#contact"
            onClick={() => handleNavigation("#contact")}
            className={ctaClasses}
          >
            <span>{ctaLabel}</span>

            <ArrowRight
              aria-hidden="true"
              size={14}
              className={[
                "transition-transform duration-300 group-hover:translate-x-1",
                "2xl:h-4 2xl:w-4",
                "min-[1920px]:h-5 min-[1920px]:w-5",
                "min-[2560px]:h-6 min-[2560px]:w-6",
              ].join(" ")}
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
            "text-white",
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

        {/* Animated mobile and tablet dropdown */}
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
          <div className="flex flex-col gap-1">
            {renderLinks(true)}
          </div>

          {/* CTA inside mobile and tablet dropdown */}
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