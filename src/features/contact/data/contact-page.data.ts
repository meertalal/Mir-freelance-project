import {
  Zap,
  Users,
  Lock,
  Calendar,
  MessagesSquare,
  Mail,
  FileText,
  Award,
  Puzzle,
  Clock3,
  Headset,
  Globe2,
  Wallet,
  Cpu,
  ShieldCheck,
  Code2,
  Smartphone,
  Boxes,
  Bot,
} from "lucide-react";

export const contactHero = {
  eyebrow: "Get In Touch",
  title: "Let's Discuss Your Project",
  description:
    "Share your goals and I'll help you map the right digital solution for web, mobile, AI or automation.",
};

export const contactTrust = [
  {
    title: "Quick Response",
    description: "Clear replies and next steps within one business day.",
    Icon: Zap,
  },
  {
    title: "Expert Consultation",
    description: "Practical guidance on scope, technology, and timeline.",
    Icon: Users,
  },
  {
    title: "100% Confidential",
    description: "Your ideas and project details stay private.",
    Icon: Lock,
  },
];

export const projectTypes = [
  "Web Development",
  "Mobile App",
  "AI Agents / Automation",
  "Chatbot",
  "SaaS / Product",
  "UI/UX Design",
  "Cloud & DevOps",
  "Digital Marketing",
  "Other",
];

export const remoteRegions = [
  {
    id: "americas",
    title: "Americas",
    countries: "USA and Canada",
    flags: ["/image/flags/usa-flag.webp", "/image/flags/canadian-flag.webp"],
  },
  {
    id: "europe",
    title: "Europe",
    countries: "UK, Germany and Switzerland",
    flags: [
      "/image/flags/uk-flag.webp",
      "/image/flags/german-flag.webp",
      "/image/flags/switzerland-flag.webp",
    ],
  },
  {
    id: "middle-east",
    title: "Middle East",
    countries: "UAE, Oman, Bahrain and Turkey",
    flags: [
      "/image/flags/uae-flag.webp",
      "/image/flags/omani-flag.webp",
      "/image/flags/bahrain-flag.webp",
      "/image/flags/turkish-flag.webp",
    ],
  },
  {
    id: "asia-pacific",
    title: "Asia-Pacific",
    countries: "Australia",
    flags: ["/image/flags/australian-flag.webp"],
  },
] as const;

export const contactActions = [
  { id: "call", title: "Schedule a Call", Icon: Calendar, href: "/contact" },
  { id: "chat", title: "Live Chat", Icon: MessagesSquare, href: "/contact" },
  { id: "email", title: "Email Us", Icon: Mail, href: "mailto:hello@mirtalal.com" },
  { id: "inquiry", title: "Project Inquiry", Icon: FileText, href: "#contact-form" },
];

export const contactWhyCopy = {
  eyebrow: "Why Businesses Choose Us",
  title: "A Partner Focused on Outcomes",
  description:
    "Clear communication, dependable delivery, and support that continues long after launch.",
};

export const contactWhy = [
  {
    id: "team",
    title: "Experienced Team",
    description: "Hands-on delivery across web, mobile, AI and cloud.",
    Icon: Award,
  },
  {
    id: "tailored",
    title: "Tailored Solutions",
    description: "Built around your goals, users, and budget.",
    Icon: Puzzle,
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    description: "Clear milestones and accountable timelines.",
    Icon: Clock3,
  },
  {
    id: "support",
    title: "Ongoing Support",
    description: "Reliable maintenance after launch.",
    Icon: Headset,
  },
];

export const faqs = [
  {
    id: "start",
    question: "How quickly can you start?",
    answer:
      "Most projects can begin within a few days after discovery and scope alignment. Urgent timelines can be discussed during the first call.",
    Icon: Zap,
  },
  {
    id: "international",
    question: "Do you work with international clients?",
    answer:
      "Yes. I regularly collaborate with clients in the USA, Canada, UK, UAE, Australia, Oman and more, fully remote.",
    Icon: Globe2,
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      "Pricing depends on scope, complexity, and timeline. After a short discovery call I share a clear proposal with milestones.",
    Icon: Wallet,
  },
  {
    id: "stack",
    question: "What technologies do you use?",
    answer:
      "React, Next.js, Laravel, Node.js, Python, Flutter, AWS, Docker, MySQL, MongoDB and modern AI tooling, chosen to fit the product.",
    Icon: Cpu,
  },
  {
    id: "support",
    question: "Do you provide post-launch support?",
    answer:
      "Yes. Maintenance, feature updates, monitoring, and performance improvements are available after launch.",
    Icon: Headset,
  },
  {
    id: "nda",
    question: "Can we sign an NDA?",
    answer:
      "Absolutely. Confidentiality is standard. An NDA can be signed before sharing sensitive product details.",
    Icon: ShieldCheck,
  },
];

export const contactNextStepsCopy = {
  eyebrow: "After You Submit",
  title: "What Happens Next",
  description:
    "A simple, predictable path from your first message to a clear proposal.",
  footnote: "Prefer to talk it through first?",
  link: { label: "Book a Discovery Call", href: "#book-a-call" },
};

export const contactNextSteps = [
  {
    id: "review",
    title: "I Review Your Brief",
    description:
      "Within one business day, I read through your goals, requirements and timeline.",
  },
  {
    id: "discuss",
    title: "We Talk It Through",
    description:
      "A short call to answer questions, clarify scope and make sure we're aligned.",
  },
  {
    id: "proposal",
    title: "You Get a Clear Proposal",
    description:
      "Scope, milestones, timeline and a fixed quote — with no obligation.",
  },
] as const;

export const contactTestimonialsCopy = {
  eyebrow: "Client Feedback",
  title: "Trusted Before the First Call",
  description:
    "A few words from the clients behind recent projects.",
};

export const contactServicesCopy = {
  eyebrow: "Explore Services",
  title: "Not Sure Where to Start?",
  description:
    "Start with the service closest to your goal — each page covers scope, process and what you get.",
  action: { label: "View All Services", href: "/services" },
};

export const contactServiceLinks = [
  {
    id: "web",
    title: "Web Development",
    description: "Websites, platforms and web apps built to perform.",
    href: "/services/web-development",
    Icon: Code2,
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    description: "iOS and Android apps from concept to store launch.",
    href: "/services/mobile-app-development",
    Icon: Smartphone,
  },
  {
    id: "ai",
    title: "AI & Automation",
    description: "Voice agents, chatbots and workflow automation.",
    href: "/services/ai-agents-automation",
    Icon: Bot,
  },
  {
    id: "saas",
    title: "SaaS & Product",
    description: "Multi-tenant products designed to scale.",
    href: "/services/saas-development",
    Icon: Boxes,
  },
] as const;
