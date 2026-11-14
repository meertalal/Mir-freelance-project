import type { LucideIcon } from "lucide-react";
import {
  Award,
  Bot,
  Boxes,
  CloudCog,
  Code2,
  Globe2,
  HeartHandshake,
  Layers,
  PenTool,
  Smartphone,
  Target,
  Telescope,
} from "lucide-react";

export const aboutHero = {
  badge: "About Us",
  titleBefore: "Building ",
  titleHighlight: "Digital Solutions",
  titleAfter: " for a Smarter Tomorrow.",
  description:
    "I help startups and businesses design, build, and scale modern digital products with a global mindset and a client-first approach.",
  image: "/image/profile.webp",
  experience: { value: "5+ Years", label: "Experience" },
};

export const aboutHeroServices = [
  "Web Development",
  "Mobile Apps",
  "AI & Automation",
  "UI/UX Design",
  "SaaS Products",
  "Cloud & DevOps",
] as const;

export const heroServiceIcons: Record<(typeof aboutHeroServices)[number], LucideIcon> = {
  "Web Development": Code2,
  "Mobile Apps": Smartphone,
  "AI & Automation": Bot,
  "UI/UX Design": PenTool,
  "SaaS Products": Boxes,
  "Cloud & DevOps": CloudCog,
};

export const purposePillars = [
  {
    id: "people-first",
    title: "People First",
    description:
      "We design around real people, with clear collaboration, user-focused thinking, and long-term success.",
    Icon: HeartHandshake,
  },
  {
    id: "impact-driven",
    title: "Impact Driven",
    description:
      "We measure success by the value our work creates: better experiences, smoother operations, and measurable growth.",
    Icon: Target,
  },
  {
    id: "future-ready",
    title: "Future Ready",
    description:
      "We embrace modern technology and build scalable, future-proof solutions that keep your business ahead of change.",
    Icon: Telescope,
  },
];

export const timeline = [
  {
    id: "2020",
    year: "2020",
    title: "The Beginning",
    description: "Started freelancing with web projects for local and regional clients.",
    Icon: Code2,
  },
  {
    id: "2022",
    year: "2022",
    title: "Product Growth",
    description: "Expanded into SaaS, mobile apps, and automation for international businesses.",
    Icon: Layers,
  },
  {
    id: "2024",
    year: "2024",
    title: "AI & Scale",
    description: "Added automated agents and chatbots, plus advanced cloud delivery, to the service stack.",
    Icon: Bot,
  },
  {
    id: "today",
    year: "Today",
    title: "Global Partnerships",
    description: "Serving clients across USA, Canada, UK, UAE, Oman, Australia and beyond.",
    Icon: Globe2,
  },
];

export const presenceFlags = [
  { name: "USA", flag: "/image/flags/usa-flag.webp" },
  { name: "Canada", flag: "/image/flags/canadian-flag.webp" },
  { name: "UK", flag: "/image/flags/uk-flag.webp" },
  { name: "Australia", flag: "/image/flags/australian-flag.webp" },
  { name: "UAE", flag: "/image/flags/uae-flag.webp" },
  { name: "Oman", flag: "/image/flags/omani-flag.webp" },
  { name: "Bahrain", flag: "/image/flags/bahrain-flag.webp" },
  { name: "Switzerland", flag: "/image/flags/switzerland-flag.webp" },
  { name: "Turkey", flag: "/image/flags/turkish-flag.webp" },
  { name: "Germany", flag: "/image/flags/german-flag.webp" },
];

export const aboutHeroHighlights: {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "experience",
    title: "Our Experience",
    description: "Building web, mobile, and AI products for clients since 2020.",
    Icon: Award,
  },
  {
    id: "expertise",
    title: "Our Expertise",
    description: "Web development, mobile apps, UI/UX design, AI automation, and SaaS.",
    Icon: Layers,
  },
  {
    id: "reach",
    title: "Our Global Reach",
    description: `Serving clients across ${presenceFlags.length} countries, from the USA to Australia.`,
    Icon: Globe2,
  },
];
