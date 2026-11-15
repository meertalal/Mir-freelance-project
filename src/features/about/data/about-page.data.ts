import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Boxes,
  CalendarCheck2,
  ClipboardCheck,
  Clock3,
  CloudCog,
  Code2,
  Globe2,
  HeartHandshake,
  Layers,
  PackageCheck,
  PenTool,
  ShieldCheck,
  Smartphone,
  Target,
  Telescope,
  UserRoundCheck,
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

export const aboutTestimonialsCopy = {
  eyebrow: "Client Feedback",
  title: "What Clients Say",
  description:
    "Direct feedback from the founders and teams behind these products.",
};

export const aboutHowIWorkCopy = {
  eyebrow: "How I Work",
  title: "A Process Built Around Clarity",
  description:
    "No black boxes and no silent weeks. You always know what is being built, what comes next and when it lands.",
  cta: { label: "See the Full Process", href: "/process" },
};

export const aboutHowIWorkPoints = [
  {
    id: "scope",
    title: "Clear from Day One",
    description:
      "Scope, milestones and a fixed quote agreed before any build starts.",
    Icon: ClipboardCheck,
  },
  {
    id: "momentum",
    title: "Weekly Momentum",
    description:
      "A working demo or written progress update every week, not only at the end.",
    Icon: CalendarCheck2,
  },
  {
    id: "quality",
    title: "Tested Before Delivery",
    description:
      "Responsive checks, QA and browser testing completed before anything goes live.",
    Icon: ShieldCheck,
  },
  {
    id: "handover",
    title: "Clean Handover",
    description:
      "Documented code, design files and a walkthrough, with support after launch.",
    Icon: PackageCheck,
  },
] as const;

export const aboutBeyondCopy = {
  eyebrow: "Beyond the Code",
  title: "The Person Behind the Work",
  description:
    "I'm Mir Talal, a freelance developer working with clients worldwide. I keep a deliberately small roster so you work directly with me — from the first call to post-launch support.",
  chips: ["Remote-first", "Direct communication", "Long-term focus"],
  cta: { label: "Start a Conversation", href: "/contact" },
  details: [
    {
      id: "location",
      label: "Location",
      value: "Serving Clients Worldwide",
      Icon: Globe2,
    },
    {
      id: "hours",
      label: "Working Hours",
      value: "Mon to Sat, 10:00 AM to 7:00 PM",
      Icon: Clock3,
    },
    {
      id: "style",
      label: "Working Style",
      value: "Remote-first, async-friendly",
      Icon: UserRoundCheck,
    },
  ],
  availability: "Open to new projects",
} as const;
