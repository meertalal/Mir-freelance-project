import {
  Award,
  Globe2,
  Layers3,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

// Country type
export type Country = {
  name: string;
  flag: string;
};

// Trust item type
export type TrustItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

// Country flag images
export const countries: Country[] = [
  {
    name: "USA",
    flag: "/image/flags/usa-flag.png",
  },
  {
    name: "Canada",
    flag: "/image/flags/canadian-flag.png",
  },
  {
    name: "UK",
    flag: "/image/flags/uk-flag.png",
  },
  {
    name: "Australia",
    flag: "/image/flags/australian-flag.png",
  },
  {
    name: "UAE",
    flag: "/image/flags/uae-flag.png",
  },
  {
    name: "Oman",
    flag: "/image/flags/omani-flag.png",
  },
  {
    name: "Bahrain",
    flag: "/image/flags/bahrain-flag.png",
  },
  {
    name: "Switzerland",
    flag: "/image/flags/switzerland-flag.png",
  },
  {
    name: "Turkey",
    flag: "/image/flags/turkish-flag.png",
  },
  {
    name: "Germany",
    flag: "/image/flags/german-flag.png",
  },
];

// Trust information
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
    description: "USA, Canada, UK, UAE, Etc.",
    Icon: Globe2,
  },
];

// Floating information cards
// Positions use Tailwind CSS utility classes.
// Experience: left side, lower-middle.
// Projects: left side, near the bottom.
// Global clients: right side, lower-middle.
export const floatingCards = [
  {
    title: "5+ Years",
    subtitle: "Experience",
    icon: "award" as const,
    className: "left-0 top-[38%]",
  },
  {
    title: "100+",
    subtitle: "Projects Delivered",
    icon: "layers" as const,
    className: "left-0 bottom-[2%]",
  },
  {
    title: "Global Clients",
    subtitle: "128+ Countries",
    icon: "globe" as const,
    className: "right-0 bottom-[12%]",
  },
];

// Floating card icons
export const floatingCardIcons = {
  award: Award,
  layers: Layers3,
  globe: Globe2,
} as const;

// Type for floating card icon keys
export type FloatingCardIconKey = keyof typeof floatingCardIcons;