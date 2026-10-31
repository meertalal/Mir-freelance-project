export interface NavigationLink {
  label: string;
  href: string;
}

export interface NavbarCta {
  label: string;
  href: string;
}

export interface NavbarProps {
  brandName?: string;
  brandSubtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}
