import { brand } from "./site.data";

export const siteUrl = (
  import.meta.env.VITE_SITE_URL || "https://mirtalal.freedev.app"
).replace(/\/+$/, "");

export const siteName = brand.name;

export const defaultImage = "/image/home-hero/global-connections-world-map.webp";

export type Breadcrumb = {
  label: string;
  path: string;
};

export type RouteSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile";
  image?: string;
  robots?: string;
  breadcrumbs?: readonly Breadcrumb[];
};

export const routeSeo: Record<string, RouteSeo> = {
  "/": {
    title: `Mir Talal | Full-Stack & AI Agent Developer for Businesses`,
    description:
      "Freelance full-stack developer building modern websites, mobile apps, SaaS products, and AI agents for startups and businesses in the USA, Canada, UK, UAE and worldwide.",
    path: "/",
    image: "/image/og/home.png",
  },
  "/services": {
    title: "Web, Mobile & AI Development Services | Mir Talal",
    description:
      "Explore services for web development, mobile apps, AI agents, chatbots, SaaS products, UI/UX design, cloud and DevOps, and digital marketing.",
    path: "/services",
    image: "/image/og/services.png",
    breadcrumbs: [{ label: "Services", path: "/services" }],
  },
  "/portfolio": {
    title: "Portfolio of Web, Mobile & SaaS Projects | Mir Talal",
    description:
      "Selected client work across web applications, mobile apps, AI voice agents, CRM systems, marketplaces and SaaS products for clients worldwide.",
    path: "/portfolio",
    image: "/image/og/portfolio.png",
    breadcrumbs: [{ label: "Portfolio", path: "/portfolio" }],
  },
  "/about": {
    title: "About Mir Talal | Freelance Web & AI Developer",
    description:
      "Learn about Mir Talal's background, experience, and client-first approach to designing, building and scaling digital products worldwide.",
    path: "/about",
    image: "/image/og/about.png",
    type: "profile",
    breadcrumbs: [{ label: "About", path: "/about" }],
  },
  "/process": {
    title: "Our Development Process | Mir Talal",
    description:
      "A transparent five-step process covering discovery, planning, development, launch and ongoing support for turning ideas into reliable digital products.",
    path: "/process",
    image: "/image/og/process.png",
    breadcrumbs: [{ label: "Process", path: "/process" }],
  },
  "/contact": {
    title: "Contact Mir Talal | Start Your Project",
    description:
      "Share your project goals and get a consultation on web, mobile, AI and automation solutions. Reach Mir Talal by email or WhatsApp.",
    path: "/contact",
    image: "/image/og/contact.png",
    breadcrumbs: [{ label: "Contact", path: "/contact" }],
  },
  "/pricing": {
    title: "Pricing & Packages | Mir Talal",
    description:
      "Transparent starting prices for websites, web apps, e-commerce stores and custom projects, with fixed quotes and milestone payments.",
    path: "/pricing",
    image: "/image/og/pricing.png",
    breadcrumbs: [{ label: "Pricing", path: "/pricing" }],
  },
  "/faq": {
    title: "Frequently Asked Questions | Mir Talal",
    description:
      "Answers about project scope, pricing, timelines, communication and post-launch support for web, mobile and AI projects.",
    path: "/faq",
    image: "/image/og/faq.png",
    breadcrumbs: [{ label: "FAQ", path: "/faq" }],
  },
  "/thank-you": {
    title: "Thank You | Mir Talal",
    description:
      "Your message has been received. I will review your project details and reply within one business day.",
    path: "/thank-you",
    robots: "noindex, follow",
  },
  "/blog": {
    title: "Blog & Insights on Web, AI & Product Development | Mir Talal",
    description:
      "Practical articles on AI agents, web development, SaaS products, discovery calls and turning ideas into a successful MVP.",
    path: "/blog",
    image: "/image/og/blog.png",
    breadcrumbs: [{ label: "Blog", path: "/blog" }],
  },
  "/privacy": {
    title: "Privacy Policy | Mir Talal",
    description:
      "How Mir Talal collects, uses and protects personal information submitted through this website and during client projects.",
    path: "/privacy",
    breadcrumbs: [{ label: "Privacy Policy", path: "/privacy" }],
  },
  "/terms": {
    title: "Terms of Service | Mir Talal",
    description:
      "The terms that apply when using this website and engaging Mir Talal for web, mobile, AI and product development services.",
    path: "/terms",
    breadcrumbs: [{ label: "Terms of Service", path: "/terms" }],
  },
  "/cookies": {
    title: "Cookie Policy | Mir Talal",
    description:
      "How this website uses cookies and similar technologies, and the choices available to visitors.",
    path: "/cookies",
    breadcrumbs: [{ label: "Cookie Policy", path: "/cookies" }],
  },
};

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbSchema(items: readonly Breadcrumb[], id?: string) {
  return {
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: absoluteUrl(item.path),
      })),
    ],
  };
}

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
