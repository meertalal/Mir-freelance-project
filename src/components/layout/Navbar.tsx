import {
  navigationLinks,
  navbarBrand,
  navbarCta,
} from "../../data/navigation";
import type { NavbarProps } from "../../types/navigation";
import useNavbarUi from "../../hooks/useNavbarUi";
import { MessageCircle } from "lucide-react";
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
    <header className={navbarShellClassName(isScrolled)}>
      <nav aria-label="Main navigation" className={navbarBarClassName(isScrolled)}>
        <NavBrand
          name={brandName}
          subtitle={brandSubtitle}
          href={navbarBrand.href}
          isScrolled={isScrolled}
        />

        <div className="hidden min-h-11 min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex 2xl:gap-1 min-[1920px]:gap-2 min-[2560px]:gap-3">
          <NavLinks links={navigationLinks} />
        </div>

        <div className="hidden shrink-0 items-center gap-2 lg:ml-2 lg:flex 2xl:ml-4 2xl:gap-3 min-[1920px]:ml-6 min-[2560px]:ml-8">
          <a href={brand.whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <MessageCircle size={18} aria-hidden="true" />
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
