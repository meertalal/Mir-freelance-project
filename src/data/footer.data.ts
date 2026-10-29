export const footerBrand = {
  name: "Mir Talal",
  description:
    "Freelance Designer & Developer helping businesses in USA, Canada & worldwide succeed online.",
} as const;

export const footerSocialLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
  },
] as const;

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/#why-work-with-me" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerCountries = [
  {
    id: "usa",
    name: "United States",
    flag: "/image/flags/usa-flag.webp",
    path: "M8 18 L12 8 L20 6 L34 10 L42 8 L48 14 L46 22 L40 28 L28 30 L18 28 L10 24 Z",
  },
  {
    id: "canada",
    name: "Canada",
    flag: "/image/flags/canadian-flag.webp",
    path: "M10 28 L14 10 L22 6 L30 8 L38 6 L44 12 L46 22 L40 30 L28 34 L16 32 Z",
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "/image/flags/uk-flag.webp",
    path: "M18 8 L28 6 L34 10 L36 18 L30 28 L20 30 L14 22 L16 12 Z",
  },
  {
    id: "australia",
    name: "Australia",
    flag: "/image/flags/australian-flag.webp",
    path: "M8 16 L16 10 L30 8 L42 12 L46 20 L40 28 L24 32 L12 28 L8 22 Z",
  },
  {
    id: "uae",
    name: "UAE",
    flag: "/image/flags/uae-flag.webp",
    path: "M14 10 L34 8 L40 14 L38 24 L28 30 L16 28 L12 18 Z",
  },
  {
    id: "oman",
    name: "Oman",
    flag: "/image/flags/omani-flag.webp",
    path: "M20 6 L34 10 L36 22 L30 32 L18 30 L14 18 Z",
  },
  {
    id: "bahrain",
    name: "Bahrain",
    flag: "/image/flags/bahrain-flag.webp",
    path: "M22 8 L32 10 L34 22 L28 30 L20 28 L18 16 Z",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    flag: "/image/flags/switzerland-flag.webp",
    path: "M16 10 L34 8 L38 18 L32 30 L18 28 L14 18 Z",
  },
  {
    id: "turkey",
    name: "Turkey",
    flag: "/image/flags/turkish-flag.webp",
    path: "M10 14 L24 8 L40 10 L44 18 L36 28 L18 30 L10 22 Z",
  },
  {
    id: "germany",
    name: "Germany",
    flag: "/image/flags/german-flag.webp",
    path: "M12 10 L28 6 L40 10 L42 20 L34 30 L16 28 L10 18 Z",
  },
] as const;
