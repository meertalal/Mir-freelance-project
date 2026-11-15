import { useEffect, useRef } from "react";
import { Mail, Menu, MessageCircle, X } from "lucide-react";
import type { NavigationLink } from "../../../types/navigation";
import { brand } from "../../../data/site.data";
import NavLinks from "./NavLinks";
import NavCta from "./NavCta";

type MobileMenuProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  links: NavigationLink[];
  ctaLabel: string;
  ctaHref: string;
};

export default function MobileMenu({
  open,
  onToggle,
  onClose,
  links,
  ctaLabel,
  ctaHref,
}: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open, onClose]);

  return (
    <div ref={containerRef} className="xl:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={onToggle}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition duration-300 hover:border-white/25 hover:bg-white/10 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD] sm:h-11 sm:w-11"
      >
        <span className={open ? "rotate-90 transition-transform duration-300" : "transition-transform duration-300"}>
          {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </span>
      </button>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
        className={[
          "absolute left-0 right-0 top-[calc(100%+8px)] max-h-[calc(100dvh-110px)] overflow-y-auto",
          "overscroll-contain rounded-2xl border border-white/10 bg-[#082846] p-3 shadow-[0_24px_60px_rgba(2,14,30,0.5)]",
          "origin-top backdrop-blur-xl transition-[opacity,transform,visibility] duration-300 ease-out sm:p-4",
          open
            ? "visible translate-y-0 scale-y-100 opacity-100"
            : "invisible -translate-y-2 scale-y-95 opacity-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="font-playfair text-[10px] font-bold uppercase tracking-[0.18em] text-[#93C5FD]">
            Navigate
          </span>
          <span className="inline-flex items-center gap-1.5 font-inter text-[10px] font-medium text-emerald-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Available for work
          </span>
        </div>

        <div className="grid gap-1 sm:grid-cols-2" onClick={onClose}>
          <NavLinks links={links} mobile />
        </div>

        <div className="my-3 h-px bg-white/10" aria-hidden="true" />

        <NavCta
          label={ctaLabel}
          href={ctaHref}
          fullWidth
          tabIndex={open ? 0 : -1}
          onClick={onClose}
        />

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <a
            href={`mailto:${brand.email}`}
            tabIndex={open ? 0 : -1}
            onClick={onClose}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 font-inter text-sm font-semibold text-white/85 transition duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <Mail size={15} aria-hidden="true" />
            Email me
          </a>
          <a
            href={brand.whatsappHref}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 font-inter text-sm font-semibold text-white/85 transition duration-300 hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-100"
          >
            <MessageCircle size={15} aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <p className="mt-3 px-2 font-inter text-[11px] leading-relaxed text-white/40">
          Usually replies within one business day.
        </p>
      </div>
    </div>
  );
}
