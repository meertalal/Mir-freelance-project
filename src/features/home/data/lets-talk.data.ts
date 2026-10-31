import {
  Rocket,
  Layers3,
  Zap,
  Headset,
  Mail,
  MessageCircle,
} from "lucide-react";
import { brand } from "../../../data/site.data";
import { projectTypes } from "../../contact/data/contact-page.data";

export const letsTalkCopy = {
  eyebrow: "Let's Talk",
  title: "Let's Build Something Together",
  description:
    "Have an idea, project, or campaign in mind? Get in touch and let's turn it into a real, results-driven solution.",
  formTitle: "Start Your Project",
  formSubtitle: "Fill in the details below and I'll get back to you shortly.",
} as const;

export const letsTalkSteps = [
  {
    id: "idea",
    title: "Share Your Idea",
    description: "Tell me about your goals and requirements.",
    Icon: Rocket,
  },
  {
    id: "plan",
    title: "Get a Plan",
    description: "Receive a clear approach, timeline, and estimate.",
    Icon: Layers3,
  },
  {
    id: "deliver",
    title: "Build & Deliver",
    description: "I turn your idea into a high-quality solution.",
    Icon: Zap,
  },
  {
    id: "support",
    title: "Ongoing Support",
    description: "Reliable support and long-term maintenance.",
    Icon: Headset,
  },
] as const;

export const budgetRanges = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
] as const;

export const letsTalkProjectTypes = projectTypes;

const whatsappNumber = brand.phone.replace(/[^\d]/g, "");

export const letsTalkActions = [
  {
    id: "email",
    title: "Email Me",
    value: brand.email,
    href: `mailto:${brand.email}`,
    Icon: Mail,
  },
  {
    id: "whatsapp",
    title: "Chat on WhatsApp",
    value: brand.phone,
    href: `https://wa.me/${whatsappNumber}`,
    Icon: MessageCircle,
  },
] as const;
