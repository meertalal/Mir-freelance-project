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
} from "lucide-react";

export const contactHero = {
  eyebrow: "Get In Touch",
  title: "Let’s Discuss Your Project",
  description:
    "Share your goals and I’ll help you map the right digital solution — web, mobile, AI, or automation.",
  image: "/image/profile.webp",
};

export const contactTrust = [
  { title: "Quick Response", Icon: Zap },
  { title: "Expert Consultation", Icon: Users },
  { title: "100% Confidential", Icon: Lock },
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

export const offices = [
  {
    id: "pakistan",
    title: "Pakistan (Head Office)",
    flag: "/image/flags/uae-flag.webp",
    address: "Karachi / Remote · Pakistan",
    phone: "+92 300 0000000",
    email: "hello@mirtalal.com",
  },
  {
    id: "usa",
    title: "USA",
    flag: "/image/flags/usa-flag.webp",
    address: "Remote collaboration · United States",
    phone: "+1 (000) 000-0000",
    email: "usa@mirtalal.com",
  },
  {
    id: "uk",
    title: "UK",
    flag: "/image/flags/uk-flag.webp",
    address: "Remote collaboration · United Kingdom",
    phone: "+44 0000 000000",
    email: "uk@mirtalal.com",
  },
  {
    id: "uae",
    title: "UAE",
    flag: "/image/flags/uae-flag.webp",
    address: "Remote collaboration · United Arab Emirates",
    phone: "+971 00 000 0000",
    email: "uae@mirtalal.com",
  },
];

export const contactActions = [
  { id: "call", title: "Schedule a Call", Icon: Calendar, href: "/contact" },
  { id: "chat", title: "Live Chat", Icon: MessagesSquare, href: "/contact" },
  { id: "email", title: "Email Us", Icon: Mail, href: "mailto:hello@mirtalal.com" },
  { id: "inquiry", title: "Project Inquiry", Icon: FileText, href: "#contact-form" },
];

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
  },
  {
    id: "international",
    question: "Do you work with international clients?",
    answer:
      "Yes. I regularly collaborate with clients in the USA, Canada, UK, UAE, Australia, Oman and more — fully remote.",
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      "Pricing depends on scope, complexity, and timeline. After a short discovery call I share a clear proposal with milestones.",
  },
  {
    id: "stack",
    question: "What technologies do you use?",
    answer:
      "React, Next.js, Laravel, Node.js, Python, Flutter, AWS, Docker, MySQL, MongoDB and modern AI tooling — chosen to fit the product.",
  },
  {
    id: "support",
    question: "Do you provide post-launch support?",
    answer:
      "Yes. Maintenance, feature updates, monitoring, and performance improvements are available after launch.",
  },
  {
    id: "nda",
    question: "Can we sign an NDA?",
    answer:
      "Absolutely. Confidentiality is standard. An NDA can be signed before sharing sensitive product details.",
  },
];
