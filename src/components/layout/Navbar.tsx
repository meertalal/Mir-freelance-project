
import { useState } from "react";
import { ArrowRight, Code2, Menu, X } from "lucide-react";
import { navigationLinks } from "../../data/navigation";
import type { NavbarProps } from "../../types/navigation";

export default function Navbar({
  brandName = "Mir Talal",
  brandSubtitle = "Freelance Web Developer",
  ctaLabel = "Let's Work Together",
}: NavbarProps) {
  const [activeLink, setActiveLink] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

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
            "group relative flex items-center justify-center",
            "whitespace-nowrap text-xs font-semibold",
            "transition-all duration-300 ease-out",
            mobile
              ? [
                  "min-h-11 w-full justify-start rounded-lg px-4",
                  "text-sm",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600",
                ].join(" ")
              : [
                  "min-h-11 px-0.5",
                  isActive
                    ? "text-blue-600"
                    : "text-slate-700 hover:text-blue-600",
                ].join(" "),
          ].join(" ")}
        >
          {label}

          {!mobile && (
            <span
              className={[
                "absolute -bottom-px left-1/2 h-0.5 -translate-x-1/2",
                "rounded-full bg-blue-600",
                "transition-[width,opacity] duration-300 ease-out",
                isActive
                  ? "w-[18px] opacity-100"
                  : "w-0 opacity-0 group-hover:w-[18px] group-hover:opacity-100",
              ].join(" ")}
            />
          )}
        </a>
      );
    });

  const ctaClasses = [
    "group inline-flex min-h-11 shrink-0 items-center justify-center gap-2",
    "rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white",
    "shadow-[0_3px_12px_rgba(37,99,235,0.16)]",
    "transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 hover:bg-blue-700",
    "hover:shadow-[0_6px_18px_rgba(37,99,235,0.24)]",
    "active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-4",
    "focus-visible:outline-blue-600",
  ].join(" ");

  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-slate-100/80 bg-white/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="
          relative mx-auto grid min-h-[80px] max-w-[1440px]
          grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
          items-center gap-5 px-6
          max-[1100px]:gap-3 max-[1100px]:px-5
          max-[820px]:flex max-[820px]:min-h-[70px]
          max-[820px]:justify-between max-[820px]:px-5
        "
      >
        <a
          href="#home"
          onClick={() => handleNavigation("#home")}
          aria-label={`${brandName} - ${brandSubtitle}`}
          className="
            group flex min-w-0 items-center gap-2 justify-self-start
            rounded-md outline-none
            focus-visible:ring-2 focus-visible:ring-blue-600
            focus-visible:ring-offset-4
          "
        >
          <Code2
            aria-hidden="true"
            className="
              h-9 w-9 shrink-0 text-blue-600
              transition-transform duration-300 ease-out
              group-hover:scale-110 group-hover:-rotate-3
            "
            strokeWidth={2.8}
          />

          <span className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold leading-tight tracking-tight text-slate-900">
              {brandName}
            </span>

            <span className="truncate text-[11px] font-medium leading-tight text-slate-500">
              {brandSubtitle}
            </span>
          </span>
        </a>

        <div
          className="
            flex items-center justify-center self-stretch
            max-[820px]:hidden
          "
        >
          <div
            className="
              flex h-full items-center justify-center gap-6
              max-[1100px]:gap-3
              max-[950px]:gap-2
            "
          >
            {renderLinks()}
          </div>
        </div>

        <div className="flex items-center justify-self-end max-[820px]:hidden">
          <a
            href="#contact"
            onClick={() => handleNavigation("#contact")}
            className={ctaClasses}
          >
            <span>{ctaLabel}</span>

            <ArrowRight
              aria-hidden="true"
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="
            relative inline-flex h-11 w-11 shrink-0 items-center
            justify-center overflow-hidden rounded-lg
            border border-slate-200 bg-white text-slate-800
            transition-all duration-300
            hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-blue-600
            min-[821px]:hidden
          "
        >
          <Menu
            size={22}
            aria-hidden="true"
            className={[
              "absolute transition-all duration-300 ease-out",
              menuOpen
                ? "rotate-90 scale-50 opacity-0"
                : "rotate-0 scale-100 opacity-100",
            ].join(" ")}
          />

          <X
            size={22}
            aria-hidden="true"
            className={[
              "absolute transition-all duration-300 ease-out",
              menuOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-50 opacity-0",
            ].join(" ")}
          />
        </button>
        <div
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          className={[
            "absolute left-0 right-0 top-full overflow-hidden",
            "border-t border-slate-100 bg-white shadow-xl",
            "origin-top transition-all duration-300 ease-out",
            "min-[821px]:hidden",
            menuOpen
              ? "visible translate-y-0 scale-y-100 opacity-100"
              : "invisible -translate-y-2 scale-y-95 opacity-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-[1440px] px-5 pb-5 pt-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {renderLinks(true)}
            </div>

            <a
              href="#contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => handleNavigation("#contact")}
              className={`${ctaClasses} mt-4 min-h-12 w-full text-sm`}
            >
              <span>{ctaLabel}</span>

              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
