import {
  MessageSquare,
  Rocket,
  Cpu,
  Headset,
} from "lucide-react";

export const servicesHero = {
  badge: "Services & Digital Solutions",
  titleBefore: "Next Generation ",
  titleAccent: "Digital Solutions",
  titleAfter: " for Growing Businesses",
  description:
    "Complete digital solutions: websites, mobile apps and marketing that help you grow faster.",
  image: "/image/services/servicesHeroTeamProfessionals.webp",
  imageAlt:
    "Two digital professionals collaborating with a laptop in a modern office",
  primaryCta: { label: "Explore Our Services", href: "#services" },
  secondaryCta: { label: "Get a Free Quote", href: "/contact" },
  availability: "Serving clients worldwide with remote collaboration.",
} as const;

export const servicesGridCopy = {
  eyebrow: "Our Services",
  title: "End to End Digital Solutions",
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
    "We use proven tools to deliver fast, scalable and secure solutions for every project.",
} as const;

export const servicesTechStack = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    description: "Interactive interfaces built with reusable, testable components.",
    logo: "/image/technologies/react.webp",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    description: "Fast APIs and live services powered by JavaScript.",
    logo: "/image/technologies/nodejs.webp",
  },
  {
    id: "php",
    name: "PHP",
    category: "Backend",
    description: "Dependable server side logic for custom web platforms.",
    logo: "/image/technologies/php.webp",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    description: "Organized relational data with fast, reliable queries.",
    logo: "/image/technologies/mysql.webp",
  },
  {
    id: "android",
    name: "Android",
    category: "Mobile",
    description: "Native Android apps tuned for speed and stability.",
    logo: "/image/technologies/android.webp",
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    description: "Consistent environments from development to production.",
    logo: "/image/technologies/docker.webp",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    description: "Secure cloud hosting that grows with your business.",
    logo: "/image/technologies/aws.webp",
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "DevOps",
    description: "Automated builds and deployments for faster releases.",
    logo: "/image/technologies/cicd.webp",
  },
] as const;

export const servicesFeedbackCopy = {
  eyebrow: "Client Feedback",
  title: "Tell Me About Your Experience",
  description:
    "Worked with me on a project? Share a few words about the process, the result and how it felt to work together.",
  formTitle: "Share Your Feedback",
  formSubtitle:
    "Your feedback helps me improve and helps future clients know what to expect.",
} as const;

export const servicesWhyCopy = {
  eyebrow: "Why Choose Us",
  title: "A Reliable Technology Partner",
  description:
    "A client focused approach, modern engineering, and dependable delivery on every project.",
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
    title: "On Time Delivery",
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
    description: "Support and maintenance after launch.",
    Icon: Headset,
  },
];
