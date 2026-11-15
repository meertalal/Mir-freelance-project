import {
  Headset,
  MessageSquare,
  Rocket,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { homeFaqs } from "../../home/data/faq.data";
import { faqs as contactFaqs } from "../../contact/data/contact-page.data";
import { servicesFaqs } from "../../services/data/services-page.data";
import { processFaqs } from "../../process/data/process-page.data";

export type FaqPageItem = {
  id: string;
  question: string;
  answer: string;
  Icon: LucideIcon;
};

export type FaqCategory = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  items: FaqPageItem[];
};

function pickFaqs<T extends FaqPageItem>(
  pool: readonly T[],
  ids: readonly string[],
): FaqPageItem[] {
  return ids.flatMap((id) => {
    const item = pool.find((entry) => entry.id === id);
    return item ? [item] : [];
  });
}

export const faqPageCopy = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  highlight: "Questions",
  subtitle: "Straight answers before we start.",
  description:
    "Everything you need to know about scope, pricing, timelines and support, collected in one place.",
  chips: ["Pricing", "Timelines", "Process", "Support"],
} as const;

export const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "How projects begin, how quickly we can start, and what I need from you.",
    Icon: Rocket,
    items: [
      ...pickFaqs(homeFaqs, ["start"]),
      ...pickFaqs(contactFaqs, ["start"]),
      ...pickFaqs(homeFaqs, ["international"]),
      ...pickFaqs(contactFaqs, ["nda"]),
    ],
  },
  {
    id: "services-pricing",
    title: "Services & Pricing",
    description:
      "Scope, quotes, ownership and the technology choices behind each project.",
    Icon: Wallet,
    items: [
      ...pickFaqs(servicesFaqs, [
        "included",
        "payments",
        "redesign",
        "ownership",
      ]),
      ...pickFaqs(contactFaqs, ["pricing", "stack"]),
      ...pickFaqs(homeFaqs, ["existing"]),
    ],
  },
  {
    id: "process-communication",
    title: "Process & Communication",
    description:
      "Timelines, updates and how changes are handled from kickoff to launch.",
    Icon: MessageSquare,
    items: pickFaqs(processFaqs, [
      "timeline",
      "communication",
      "changes",
      "existing",
    ]),
  },
  {
    id: "support-aftercare",
    title: "Support & Aftercare",
    description:
      "What happens after launch and how ongoing help works if you need it.",
    Icon: Headset,
    items: [
      ...pickFaqs(homeFaqs, ["support"]),
      ...pickFaqs(servicesFaqs, ["maintenance"]),
      ...pickFaqs(processFaqs, ["support"]),
    ],
  },
];
