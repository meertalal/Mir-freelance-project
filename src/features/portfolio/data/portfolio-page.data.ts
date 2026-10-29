import {
  BriefcaseBusiness,
  Layers3,
  Cpu,
  Headset,
  Users,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export const portfolioHero = {
  eyebrow: "Portfolio",
  title: "Innovative Projects That Create Real Business Impact.",
  description:
    "Selected work across web applications, mobile apps, AI platforms, and SaaS products for clients worldwide.",
  image: "/image/projects/voice-agent.webp",
  stats: [
    { title: "100+", subtitle: "Projects Delivered" },
    { title: "50+", subtitle: "Happy Clients" },
  ],
};

export const portfolioTrust = [
  { title: "Real Projects", Icon: BriefcaseBusiness },
  { title: "Diverse Industries", Icon: Layers3 },
  { title: "Modern Technologies", Icon: Cpu },
  { title: "Long-Term Support", Icon: Headset },
];

export const portfolioFilters = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "saas", label: "SaaS Platforms" },
  { id: "ai", label: "AI & Automation" },
] as const;

export const impactStats = [
  { id: "clients", value: "50+", label: "Happy Clients", Icon: Users },
  { id: "projects", value: "100+", label: "Projects Delivered", Icon: BriefcaseBusiness },
  { id: "countries", value: "6+", label: "Countries Served", Icon: MapPin },
  { id: "satisfaction", value: "100%", label: "Client Satisfaction", Icon: ShieldCheck },
];
