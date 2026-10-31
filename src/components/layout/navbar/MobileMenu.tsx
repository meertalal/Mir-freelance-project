import { Menu, X } from "lucide-react";
import type { NavigationLink } from "../../../types/navigation";
import NavLinks from "./NavLinks";
import NavCta from "./NavCta";

type MobileMenuProps = {
  open: boolean;
  onToggle: () => void;
  links: NavigationLink[];
  ctaLabel: string;
  ctaHref: string;
};

export default function MobileMenu({
  open,
  onToggle,
  links,
  ctaLabel,
  ctaHref,
}: MobileMenuProps) {
  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={onToggle}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:hidden"
      >
        <span className={open ? "rotate-90 transition-transform" : "transition-transform"}>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </span>
      </button>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
        className={[
          "absolute left-0 right-0 top-[calc(100%+8px)] max-h-[calc(100dvh-100px)] overflow-y-auto",
          "overscroll-contain rounded-2xl border border-white/10 bg-[#092f58] p-3",
          "shadow-[0_12px_32px_rgba(15,23,42,0.3)] origin-top transition-[opacity,transform,visibility] duration-300 ease-out xl:hidden",
          open
            ? "visible translate-y-0 scale-y-100 opacity-100"
            : "invisible -translate-y-2 scale-y-95 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col gap-1">
          <NavLinks links={links} mobile />
        </div>
        <NavCta
          label={ctaLabel}
          href={ctaHref}
          fullWidth
          tabIndex={open ? 0 : -1}
        />
      </div>
    </>
  );
}
