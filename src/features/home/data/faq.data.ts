import {
  HelpCircle,
  Globe2,
  Layers3,
  Code2,
  Clock3,
  type LucideIcon,
} from "lucide-react";

export const homeFaqCopy = {
  eyebrow: "Frequently Asked Questions",
  title: "Have Questions? We've Got Answers",
  description:
    "Find quick answers to common questions about my services, process, and collaboration.",
  promoTitle: "Still Have a Question?",
  promoDescription:
    "Can't find what you're looking for? Feel free to get in touch — I'm happy to help.",
  ctaLabel: "Let's Talk",
  ctaHref: "#contact",
} as const;

export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
  Icon: LucideIcon;
};

export const homeFaqs: HomeFaqItem[] = [
  {
    id: "start",
    question: "How do we start a project?",
    answer:
      "It's simple! Share your requirements through the contact form or book a call. We'll discuss your goals, scope, timeline and budget, and then get started with a clear plan.",
    Icon: HelpCircle,
  },
  {
    id: "international",
    question: "Do you work with international clients?",
    answer:
      "Yes. I regularly collaborate with clients in the USA, Canada, UK, UAE, Australia, Oman and more — fully remote, with clear communication across time zones.",
    Icon: Globe2,
  },
  {
    id: "support",
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes. After launch I offer maintenance, feature updates, monitoring, and performance improvements so your product stays reliable as it grows.",
    Icon: Layers3,
  },
  {
    id: "existing",
    question: "Can you work on an existing project?",
    answer:
      "Absolutely. I can review your current codebase, fix issues, add features, or help modernize the stack without starting from scratch.",
    Icon: Code2,
  },
  {
    id: "timeline",
    question: "What is the typical project delivery timeline?",
    answer:
      "Timelines depend on scope. Smaller sites can ship in a few weeks; larger apps and SaaS products are planned in milestones so you see progress early.",
    Icon: Clock3,
  },
];
