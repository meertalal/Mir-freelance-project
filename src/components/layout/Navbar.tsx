import {
  navigationLinks,
  navbarBrand,
  navbarCta,
} from "../../data/navigation";
import type { NavbarProps } from "../../types/navigation";
import useNavbarUi from "../../hooks/useNavbarUi";
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
  const { menuOpen, isScrolled, toggleMenu } = useNavbarUi();

  return (
    <header className={navbarShellClassName(isScrolled)}>
      <nav aria-label="Main navigation" className={navbarBarClassName(isScrolled)}>
        <NavBrand
          name={brandName}
          subtitle={brandSubtitle}
          href={navbarBrand.href}
          isScrolled={isScrolled}
        />

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1 min-[1920px]:gap-2 min-[2560px]:gap-3">
          <NavLinks links={navigationLinks} />
        </div>

        <div className="hidden shrink-0 items-center xl:ml-2 xl:flex 2xl:ml-4 min-[1920px]:ml-6 min-[2560px]:ml-8">
          <NavCta label={ctaLabel} href={ctaHref} />
        </div>

        <MobileMenu
          open={menuOpen}
          onToggle={toggleMenu}
          links={navigationLinks}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </nav>
    </header>
  );
}
