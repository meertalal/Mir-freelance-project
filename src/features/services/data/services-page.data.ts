import {
  ShieldCheck,
  Users,
  Clock3,
  MessageSquare,
  Rocket,
  Cpu,
  Headset,
} from "lucide-react";

export const servicesHero = {
  eyebrow: "Services · Digital Solutions",
  label: "Our Services",
  titleBefore: "Build, ",
  highlightRed: "Automate",
  titleMid: " & ",
  highlightBlue: "Scale",
  titleAfter: " Your Business.",
  description:
    "Complete digital solutions — websites, mobile apps and marketing that help you grow faster.",
  image: "/image/profile.webp",
  floatingCards: [
    { id: "dev", title: "Development", subtitle: "Web & Mobile" },
    { id: "ai", title: "AI Automation", subtitle: "Agents & Bots" },
    { id: "marketing", title: "Digital Marketing", subtitle: "Growth Ready" },
  ],
};

export const servicesTrust = [
  {
    title: "Reliable & Trusted",
    description: "Genuine process",
    Icon: ShieldCheck,
  },
  {
    title: "Expert Team",
    description: "Idea to deployment",
    Icon: Users,
  },
  {
    title: "On-time Delivery",
    description: "Clear milestones",
    Icon: Clock3,
  },
];

export const servicesGridCopy = {
  eyebrow: "Our Services",
  title: "End-to-End Digital Solutions",
  description:
    "Everything you need to build, launch, and grow your business in the digital world.",
} as const;

export const servicesProcessCopy = {
  eyebrow: "Our Process",
  title: "How We Deliver Your Project",
  description:
    "A simple, transparent, and proven process to turn your idea into a successful digital product.",
} as const;

export const servicesTechCopy = {
  eyebrow: "Technologies We Work With",
  title: "Modern Technologies for Better Solutions",
  description:
    "We use industry-leading technologies to deliver high-performance, scalable, and secure solutions.",
} as const;

export const servicesProjectsCopy = {
  eyebrow: "Featured Service Projects",
  title: "Real Projects. Real Results.",
  description:
    "A selection of projects delivered for clients using our core services.",
} as const;

export const servicesCtaCopy = {
  eyebrow: "Ready to Start?",
  title: "Let's Build Something Amazing Together",
  description:
    "Share your idea and let's map the right digital solution for your business — anywhere in the world.",
  supportNote: "Clients across the USA, Canada, UK, UAE, Australia & beyond.",
} as const;

export const servicesWhyCopy = {
  eyebrow: "Why Choose Us",
  title: "A Reliable Technology Partner",
  description:
    "A client-first approach, modern engineering, and dependable delivery on every project.",
} as const;

export const servicesWhyFeatures = [
  {
    id: "communication",
    title: "Clear Communication",
    description: "Regular updates and transparent process.",
    Icon: MessageSquare,
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    description: "Committed to timelines and milestones.",
    Icon: Rocket,
  },
  {
    id: "technology",
    title: "Modern Technology",
    description: "Latest tools and best practices.",
    Icon: Cpu,
  },
  {
    id: "support",
    title: "Ongoing Support",
    description: "Post-launch support and maintenance.",
    Icon: Headset,
  },
];
