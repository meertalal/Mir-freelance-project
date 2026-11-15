
import type { Project } from "../types/works.types";

export const featuredWorkCopy = {
  eyebrow: "Our Selected Creations",
  title: "Where Ideas Take Shape",
  description:
    "Bringing bold ideas to life through thoughtful design and innovative digital solutions.",
} as const;

export const projects: Project[] = [
  {
    id: "voice-agent",
    title: "AI Voice Agent Platform",
    description:
      "Conversational AI platform that handles customer calls and bookings automatically.",
    image: "/image/projects/voice-agent.webp",
    imageAlt: "AI voice agent dashboard with audio controls",
    tags: ["AI", "SaaS", "Web App"],
    flag: "/image/flags/bahrain-flag.webp",
    href: "/portfolio/voice-agent",
  },
  {
    id: "estate-crm",
    title: "Real Estate CRM",
    description:
      "Property management CRM with lead tracking, listings, and automation workflows.",
    image: "/image/projects/estate-crm.webp",
    imageAlt: "Real estate CRM dashboard with property listings",
    tags: ["Web", "CRM", "Automation"],
    flag: "/image/flags/canadian-flag.webp",
    href: "/portfolio/estate-crm",
  },
  {
    id: "ecommerce-marketplace",
    title: "E-commerce Marketplace",
    description:
      "Multi-vendor marketplace with payments, inventory, and mobile shopping experience.",
    image: "/image/projects/ecommerce-marketplace.webp",
    imageAlt: "E-commerce marketplace displayed on a laptop",
    tags: ["Mobile", "Payment", "SaaS"],
    flag: "/image/flags/australian-flag.webp",
    href: "/portfolio/ecommerce-marketplace",
  },
];
