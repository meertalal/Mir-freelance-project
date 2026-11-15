import { brand } from "./site.data";

export const siteUrl = (
  import.meta.env.VITE_SITE_URL || "https://mirtalal.web.app"
).replace(/\/+$/, "");

export const siteName = brand.name;

export const defaultImage = "/image/home-hero/global-connections-world-map.webp";

export type RouteSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile";
  image?: string;
  robots?: string;
};

export const routeSeo: Record<string, RouteSeo> = {
  "/": {
    title: `Mir Talal | Full-Stack & AI Agent Developer for Businesses`,
    description:
      "Freelance full-stack developer building modern websites, mobile apps, SaaS products, and AI agents for startups and businesses in the USA, Canada, UK, UAE and worldwide.",
    path: "/",
  },
  "/services": {
    title: "Web, Mobile & AI Development Services | Mir Talal",
    description:
      "Explore services for web development, mobile apps, AI agents, chatbots, SaaS products, UI/UX design, cloud and DevOps, and digital marketing.",
    path: "/services",
  },
  "/portfolio": {
    title: "Portfolio of Web, Mobile & SaaS Projects | Mir Talal",
    description:
      "Selected client work across web applications, mobile apps, AI voice agents, CRM systems, marketplaces and SaaS products for clients worldwide.",
    path: "/portfolio",
  },
  "/about": {
    title: "About Mir Talal | Freelance Web & AI Developer",
    description:
      "Learn about Mir Talal's background, experience, and client-first approach to designing, building and scaling digital products worldwide.",
    path: "/about",
    type: "profile",
  },
  "/process": {
    title: "Our Development Process | Mir Talal",
    description:
      "A transparent five-step process covering discovery, planning, development, launch and ongoing support for turning ideas into reliable digital products.",
    path: "/process",
  },
  "/contact": {
    title: "Contact Mir Talal | Start Your Project",
    description:
      "Share your project goals and get a consultation on web, mobile, AI and automation solutions. Reach Mir Talal by email or WhatsApp.",
    path: "/contact",
  },
  "/blog": {
    title: "Blog & Insights on Web, AI & Product Development | Mir Talal",
    description:
      "Practical articles on AI agents, web development, SaaS products, discovery calls and turning ideas into a successful MVP.",
    path: "/blog",
  },
  "/privacy": {
    title: "Privacy Policy | Mir Talal",
    description:
      "How Mir Talal collects, uses and protects personal information submitted through this website and during client projects.",
    path: "/privacy",
  },
  "/terms": {
    title: "Terms of Service | Mir Talal",
    description:
      "The terms that apply when using this website and engaging Mir Talal for web, mobile, AI and product development services.",
    path: "/terms",
  },
  "/cookies": {
    title: "Cookie Policy | Mir Talal",
    description:
      "How this website uses cookies and similar technologies, and the choices available to visitors.",
    path: "/cookies",
  },
};

export const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: `${siteUrl}/`,
  email: brand.email,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/favicon.svg`,
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: brand.email,
    contactType: "customer support",
    availableLanguage: "English",
  },
} as const;

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: siteName,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en",
} as const;
