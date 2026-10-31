import {
  MessageSquare,
  PenLine,
  Code2,
  Rocket,
  Zap,
  ShieldCheck,
  Clock3,
  RefreshCw,
} from "lucide-react";

export const workingProcessCopy = {
  eyebrow: "My Working Process",
  title: "A Clear & Proven Process",
  description:
    "From idea to launch, here's how I turn your requirements into a successful digital solution.",
} as const;

export const workingProcessSteps = [
  {
    id: "discovery",
    step: "01",
    title: "Discovery & Planning",
    description:
      "Understand your goals, requirements and business needs to define the right solution.",
    Icon: MessageSquare,
  },
  {
    id: "design",
    step: "02",
    title: "Design & Strategy",
    description:
      "Turn ideas into clean, modern and user-friendly designs with a clear development plan.",
    Icon: PenLine,
  },
  {
    id: "development",
    step: "03",
    title: "Development & Testing",
    description:
      "Build a scalable, secure and high-performing solution with continuous testing and feedback.",
    Icon: Code2,
  },
  {
    id: "deployment",
    step: "04",
    title: "Deployment & Support",
    description:
      "Launch your project smoothly and provide ongoing support, updates and maintenance.",
    Icon: Rocket,
  },
] as const;

export const workingProcessHighlights = [
  {
    id: "transparent",
    title: "Transparent & Collaborative",
    Icon: Zap,
  },
  {
    id: "quality",
    title: "Quality-First Approach",
    Icon: ShieldCheck,
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    Icon: Clock3,
  },
  {
    id: "support",
    title: "Ongoing Support",
    Icon: RefreshCw,
  },
] as const;
