import {
  ShieldCheck,
  Users,
  Clock3,
  MessageSquare,
  Rocket,
  Cpu,
  Headset,
} from "lucide-react";

export const servicesHero = {
  eyebrow: "Our Services",
  titleBefore: "Build, ",
  highlightRed: "Automate",
  titleMid: " & ",
  highlightBlue: "Scale",
  titleAfter: " Your Business.",
  description:
    "End-to-end digital solutions — websites, mobile apps, AI agents, chatbots, SaaS platforms and marketing that help you grow faster.",
  image: "/image/profile.webp",
  floatingCards: [
    { id: "dev", title: "Development", subtitle: "Web & Mobile" },
    { id: "ai", title: "AI Automation", subtitle: "Agents & Bots" },
    { id: "marketing", title: "Digital Marketing", subtitle: "Growth Ready" },
  ],
};

export const servicesTrust = [
  {
    title: "Reliable & Trusted",
    description: "Genuine process",
    Icon: ShieldCheck,
  },
  {
    title: "Expert Team",
    description: "Idea to deployment",
    Icon: Users,
  },
  {
    title: "On-time Delivery",
    description: "Clear milestones",
    Icon: Clock3,
  },
];

export const servicesWhyFeatures = [
  {
    id: "communication",
    title: "Clear Communication",
    description: "Regular updates and transparent process.",
    Icon: MessageSquare,
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    description: "Committed to timelines and milestones.",
    Icon: Rocket,
  },
  {
    id: "technology",
    title: "Modern Technology",
    description: "Latest tools and best practices.",
    Icon: Cpu,
  },
  {
    id: "support",
    title: "Ongoing Support",
    description: "Post-launch support and maintenance.",
    Icon: Headset,
  },
];
