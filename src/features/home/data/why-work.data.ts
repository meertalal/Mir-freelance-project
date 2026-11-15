
import type { WorkFeature } from "../types/why-work.types";

export const whyWorkCopy = {
  eyebrow: "Why Work With Me",
  title: "A Reliable Technology Partner",
  description:
    "I focus on long-term partnerships, quality work, and solutions that create real business value.",
} as const;

export const workFeatures: WorkFeature[] = [
  {
    id: "communication",
    title: "Clear Communication",
    description: "Regular updates and transparent process.",
    icon: "communication",
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    description: "Committed to timelines and milestones.",
    icon: "delivery",
  },
  {
    id: "technology",
    title: "Modern Technology",
    description: "Latest tools and best practices.",
    icon: "technology",
  },
  {
    id: "support",
    title: "Ongoing Support",
    description: "Post-launch support and maintenance.",
    icon: "support",
  },
];
