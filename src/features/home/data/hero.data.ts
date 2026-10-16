import {
  Globe2,
  Layers3,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Country = {
  name: string;
  flag: string;
};

export type TrustItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

export const countries: Country[] = [
  { name: "USA", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "Oman", flag: "🇴🇲" },
];

export const mapCountries = [
  { name: "Canada", flag: "🇨🇦", className: "map-country-canada" },
  { name: "UK", flag: "🇬🇧", className: "map-country-uk" },
  { name: "USA", flag: "🇺🇸", className: "map-country-usa" },
  { name: "UAE", flag: "🇦🇪", className: "map-country-uae" },
  { name: "Oman", flag: "🇴🇲", className: "map-country-oman" },
  { name: "Australia", flag: "🇦🇺", className: "map-country-australia" },
];

export const trustItems: TrustItem[] = [
  {
    title: "Reliable & Trusted",
    description: "100% Genuine Process",
    Icon: ShieldCheck,
  },
  {
    title: "Expert Guidance",
    description: "From Idea to Deployment",
    Icon: Users,
  },
  {
    title: "Global Clients",
    description: "USA, Canada, UK, Australia",
    Icon: Globe2,
  },
];

export const floatingCards = [
  {
    title: "5+ Years",
    subtitle: "Experience",
    icon: "award" as const,
    className: "floating-card-experience",
  },
  {
    title: "100+",
    subtitle: "Projects Delivered",
    icon: "layers" as const,
    className: "floating-card-projects",
  },
  {
    title: "Global Clients",
    subtitle: "6+ Countries",
    icon: "globe" as const,
    className: "floating-card-global",
  },
];

export const floatingCardIcons = {
  award: Layers3,
  layers: Layers3,
  globe: Globe2,
} as const;
