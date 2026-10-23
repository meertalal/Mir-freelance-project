import type { Project } from "../types/works.types";

export const projects: Project[] = [
  {
    id: "voice-agent",
    title: "AI Voice Agent Platform",
    image: "/images/voice-agent.png",
    imageAlt: "AI voice agent dashboard with audio controls",
    tags: ["AI", "SaaS", "Web App"],
    country: "USA",
    countryCode: "US",
    href: "/projects/voice-agent",
  },
  {
    id: "estate-crm",
    title: "Real Estate CRM",
    image: "/images/estate-crm.png",
    imageAlt: "Real estate CRM dashboard with property listings",
    tags: ["Web", "CRM", "Automation"],
    country: "CANADA",
    countryCode: "CA",
    href: "/projects/estate-crm",
  },
  {
    id: "ecommerce-marketplace",
    title: "E-commerce Marketplace",
    image: "/images/ecommerce-marketplace.png",
    imageAlt: "E-commerce marketplace displayed on a laptop",
    tags: ["Mobile", "Payment", "SaaS"],
    country: "AUSTRALIA",
    countryCode: "AU",
    href: "/projects/ecommerce-marketplace",
  },
];