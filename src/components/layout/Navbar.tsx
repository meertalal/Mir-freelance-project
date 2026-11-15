import { MessageCircle } from "lucide-react";
import {
  navigationLinks,
  navbarBrand,
  navbarCta,
} from "../../data/navigation";
import type { NavbarProps } from "../../types/navigation";
import useNavbarUi from "../../hooks/useNavbarUi";
import { brand } from "../../data/site.data";
import NavBrand from "./navbar/NavBrand";
import NavLinks from "./navbar/NavLinks";
import NavCta from "./navbar/NavCta";
import MobileMenu from "./navbar/MobileMenu";
import { navbarBarClassName, navbarShellClassName } from "./navbar/nav.styles";

export default function Navbar({
  brandName = navbarBrand.name,
  brandSubtitle = navbarBrand.subtitle,
  ctaLabel = navbarCta.label,
  ctaHref = navbarCta.href,
}: NavbarProps) {
  const { menuOpen, isScrolled, toggleMenu, closeMenu } = useNavbarUi();

  return (
    <header className={navbarShellClassName()}>
      <nav aria-label="Main navigation" className={navbarBarClassName(isScrolled)}>
        <NavBrand
          name={brandName}
          subtitle={brandSubtitle}
          href={navbarBrand.href}
        />

        <div className="hidden min-h-10 min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1 min-[1920px]:gap-1.5">
          <NavLinks links={navigationLinks} />
        </div>

        <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex xl:ml-2 2xl:gap-2.5">
          <a
            href={brand.whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-emerald-400/15 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD] 2xl:h-11 2xl:w-11"
          >
            <MessageCircle size={17} aria-hidden="true" />
          </a>
          <NavCta label={ctaLabel} href={ctaHref} />
        </div>

        <MobileMenu
          open={menuOpen}
          onToggle={toggleMenu}
          onClose={closeMenu}
          links={navigationLinks}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </nav>
    </header>
  );
}
