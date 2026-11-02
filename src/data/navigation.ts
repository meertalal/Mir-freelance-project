import type { NavigationLink, NavbarCta } from "../types/navigation";
import { brand } from "./site.data";

export const navigationLinks: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export const navbarBrand = {
  name: brand.name,
  subtitle: brand.subtitle,
  href: "/",
} as const;

export const navbarCta: NavbarCta = {
  label: "Let's Talk",
  href: "/contact",
};
