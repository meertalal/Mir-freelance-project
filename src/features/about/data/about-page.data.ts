import {
  ShieldCheck,
  Globe2,
  HeartHandshake,
  Target,
  Eye,
  Gem,
  Link2,
  Code2,
  Share2,
} from "lucide-react";

export const aboutHero = {
  eyebrow: "About Us",
  title: "Building Digital Solutions for a Smarter Tomorrow.",
  description:
    "I help startups and businesses design, build, and scale modern digital products with a global mindset and a client-first approach.",
  image: "/image/profile.webp",
  stats: [
    { title: "5+ Years", subtitle: "Experience" },
    { title: "100+", subtitle: "Projects Delivered" },
    { title: "Passionate", subtitle: "Team Focus" },
  ],
};

export const aboutTrust = [
  { title: "Reliable & Trusted", Icon: ShieldCheck },
  { title: "Global Mindset", Icon: Globe2 },
  { title: "Client-Focused", Icon: HeartHandshake },
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

export const missionVisionValues = [
  {
    id: "mission",
    title: "Mission",
    description:
      "Deliver reliable digital products that help businesses grow with clarity and speed.",
    Icon: Target,
    checklist: null as string[] | null,
  },
  {
    id: "vision",
    title: "Vision",
    description:
      "Become a trusted global partner for modern web, AI, and automation solutions.",
    Icon: Eye,
    checklist: null as string[] | null,
  },
  {
    id: "values",
    title: "Values",
    description: "Principles that guide every engagement.",
    Icon: Gem,
    checklist: [
      "Client success first",
      "Quality and innovation",
      "Transparent communication",
      "Long-term partnership",
    ],
  },
];

export const teamMembers = [
  {
    id: "alex",
    name: "Alex Khan",
    role: "Full-Stack Developer",
    image: "/image/profile.webp",
    socials: [
      { id: "linkedin", Icon: Link2, href: "#" },
      { id: "github", Icon: Code2, href: "#" },
      { id: "twitter", Icon: Share2, href: "#" },
    ],
  },
  {
    id: "sarah",
    name: "Sarah Ali",
    role: "UI/UX Designer",
    image: "/image/profile.webp",
    socials: [
      { id: "linkedin", Icon: Link2, href: "#" },
      { id: "github", Icon: Code2, href: "#" },
      { id: "twitter", Icon: Share2, href: "#" },
    ],
  },
  {
    id: "usman",
    name: "Usman Tariq",
    role: "AI Engineer",
    image: "/image/profile.webp",
    socials: [
      { id: "linkedin", Icon: Link2, href: "#" },
      { id: "github", Icon: Code2, href: "#" },
      { id: "twitter", Icon: Share2, href: "#" },
    ],
  },
  {
    id: "bilal",
    name: "Bilal Ahmed",
    role: "Cloud & DevOps",
    image: "/image/profile.webp",
    socials: [
      { id: "linkedin", Icon: Link2, href: "#" },
      { id: "github", Icon: Code2, href: "#" },
      { id: "twitter", Icon: Share2, href: "#" },
    ],
  },
];

export const trustedBy = [
  "Google",
  "Microsoft",
  "Shopify",
  "Adobe",
  "AWS",
  "Stripe",
  "Meta",
  "Slack",
];

export const presenceFlags = [
  { name: "Canada", flag: "/image/flags/canadian-flag.webp" },
  { name: "USA", flag: "/image/flags/usa-flag.webp" },
  { name: "UK", flag: "/image/flags/uk-flag.webp" },
  { name: "UAE", flag: "/image/flags/uae-flag.webp" },
  { name: "Oman", flag: "/image/flags/omani-flag.webp" },
  { name: "Australia", flag: "/image/flags/australian-flag.webp" },
];
