import {
  Code2,
  Smartphone,
  Bot,
  MessageSquareMore,
  Database,
  Palette,
  Cloud,
  ChartNoAxesCombined,
  Users,
  BriefcaseBusiness,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import type {
  Service,
  ServiceStat,
} from "../types/services.types";

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Modern, responsive websites using latest technologies.",
    icon: Code2,
    href: "/services/web-development",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "iOS & Android apps tailored to your business needs.",
    icon: Smartphone,
    href: "/services/mobile-app-development",
  },
  {
    id: "ai-agents-automation",
    title: "AI Agents & Automation",
    description:
      "AI voice agents, chatbots and workflow automation.",
    icon: Bot,
    href: "/services/ai-automation",
  },
  {
    id: "chatbot-development",
    title: "Chatbot Development",
    description:
      "Smart chatbots for websites, WhatsApp and business platforms.",
    icon: MessageSquareMore,
    href: "/services/chatbot-development",
  },
  {
    id: "saas-development",
    title: "SaaS & Product Development",
    description:
      "Scalable SaaS products with multi-tenant architecture.",
    icon: Database,
    href: "/services/saas-development",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Clean, modern and conversion-focused designs.",
    icon: Palette,
    href: "/services/ui-ux-design",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description:
      "Deployment, server setup, CI/CD and maintenance.",
    icon: Cloud,
    href: "/services/cloud-devops",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "SEO, content strategy and social media marketing.",
    icon: ChartNoAxesCombined,
    href: "/services/digital-marketing",
  },
];

export const serviceStats: ServiceStat[] = [
  {
    id: "clients",
    value: "50+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    id: "projects",
    value: "100+",
    label: "Projects Delivered",
    icon: BriefcaseBusiness,
  },
  {
    id: "countries",
    value: "128+",
    label: "Countries Served",
    icon: MapPin,
  },
  {
    id: "satisfaction",
    value: "100%",
    label: "Client Satisfaction",
    icon: ShieldCheck,
  },
];