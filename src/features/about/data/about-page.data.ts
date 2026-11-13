import { Users, Rocket, TrendingUp } from "lucide-react";

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

export const purposePillars = [
  {
    id: "people-first",
    title: "People First",
    description:
      "We design around real people — clear collaboration, user-focused thinking, and long-term success.",
    Icon: Users,
  },
  {
    id: "impact-driven",
    title: "Impact Driven",
    description:
      "We measure success by the value our work creates — better experiences, smoother operations, and measurable growth.",
    Icon: Rocket,
  },
  {
    id: "future-ready",
    title: "Future Ready",
    description:
      "We embrace modern technology and build scalable, future-proof solutions that keep your business ahead of change.",
    Icon: TrendingUp,
  },
];

export const timeline = [
  {
    id: "2020",
    year: "2020",
    title: "The Beginning",
    description: "Started freelancing with web projects for local and regional clients.",
  },
  {
    id: "2022",
    year: "2022",
    title: "Product Growth",
    description: "Expanded into SaaS, mobile apps, and automation for international businesses.",
  },
  {
    id: "2024",
    year: "2024",
    title: "AI & Scale",
    description: "Added automated agents and chatbots, plus advanced cloud delivery, to the service stack.",
  },
  {
    id: "today",
    year: "Today",
    title: "Global Partnerships",
    description: "Serving clients across USA, Canada, UK, UAE, Oman, Australia and beyond.",
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
