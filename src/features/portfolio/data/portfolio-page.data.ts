import {
  BriefcaseBusiness,
  Layers3,
  Cpu,
  Headset,
  Users,
  ShieldCheck,
  Building2,
  ShoppingBag,
  HeartPulse,
  Cloud,
  GraduationCap,
  Bot,
  FolderOpen,
  Sparkles,
  Clock3,
  KeyRound,
} from "lucide-react";

export const portfolioHero = {
  eyebrow: "Portfolio",
  title: "Innovative Projects That Create Real Business Impact.",
  highlight: "Real Business Impact.",
  description:
    "Selected work across web applications, mobile apps, AI platforms, and SaaS products for clients worldwide.",
};

export const portfolioTrust = [
  { title: "Real Projects", description: "Live products used by real businesses.", Icon: BriefcaseBusiness },
  { title: "Diverse Industries", description: "Web, mobile, SaaS and AI work.", Icon: Layers3 },
  { title: "Modern Technologies", description: "Current, maintainable tech stacks.", Icon: Cpu },
  { title: "Long-Term Support", description: "Help well after launch.", Icon: Headset },
];

export const portfolioFilters = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "saas", label: "SaaS Platforms" },
  { id: "ai", label: "AI & Automation" },
] as const;

export const portfolioIndustriesCopy = {
  eyebrow: "Industries & Specialties",
  description:
    "Project experience across real estate, commerce, healthcare, SaaS and education — plus AI and automation in every sector.",
};

export const portfolioIndustries = [
  { id: "real-estate", label: "Real Estate", Icon: Building2 },
  { id: "ecommerce", label: "E-commerce", Icon: ShoppingBag },
  { id: "healthcare", label: "Healthcare", Icon: HeartPulse },
  { id: "saas", label: "SaaS", Icon: Cloud },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "ai", label: "AI & Automation", Icon: Bot },
] as const;

export const portfolioFaqCopy = {
  eyebrow: "Portfolio FAQ",
  title: "Questions About the Work",
  description:
    "How these projects were scoped, documented and delivered — and how yours would run.",
  ctaTitle: "Want results like these?",
  ctaText:
    "Tell me what you're building and I'll map out the right approach, timeline and next step.",
  cta: { label: "Start a Project", href: "/contact" },
};

export const portfolioFaqs = [
  {
    id: "full-case-study",
    question: "Can I see the full case study for a project?",
    answer:
      "Yes. Every project links to a detailed case study covering the challenge, approach, tech stack and measured results. If you'd like a deeper walkthrough, I'm happy to go through it with you on a call.",
    Icon: FolderOpen,
  },
  {
    id: "nda",
    question: "Can you sign an NDA before we discuss details?",
    answer:
      "Absolutely. I'm happy to sign an NDA before you share anything sensitive. Client work can stay completely private, or be published only once you approve it.",
    Icon: ShieldCheck,
  },
  {
    id: "similar-project",
    question: "Can you build something similar for my business?",
    answer:
      "Yes — existing work is a starting point, not a template. We'll scope the version that fits your goals, users and budget, then quote it clearly before any work begins.",
    Icon: Sparkles,
  },
  {
    id: "existing-code",
    question: "Do you work with existing codebases and teams?",
    answer:
      "Yes. I regularly join existing products, review the codebase and work alongside in-house developers or designers without disrupting your current delivery.",
    Icon: Users,
  },
  {
    id: "timeline",
    question: "How long do projects like these take?",
    answer:
      "The projects shown here took 6–10 weeks from kickoff to launch. Timelines depend on scope, feedback speed and integrations, and you get a clear schedule before we start.",
    Icon: Clock3,
  },
  {
    id: "ownership",
    question: "Do I own the code and design after launch?",
    answer:
      "Yes. On final payment you own the source code, designs and assets, along with documentation for handover. Nothing is held back.",
    Icon: KeyRound,
  },
] as const;
