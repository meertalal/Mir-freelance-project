import {
  MessageSquare,
  Rocket,
  Cpu,
  Headset,
  Bot,
  Code2,
  Smartphone,
  TrendingUp,
  ClipboardList,
  KeyRound,
  CreditCard,
  RefreshCw,
  CalendarDays,
  Wrench,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export const servicesHero = {
  badge: "Services & Digital Solutions",
  titleBefore: "Next Generation ",
  titleAccent: "Digital Solutions",
  titleAfter: " for Growing Businesses",
  description:
    "Complete digital solutions: websites, mobile apps and marketing that help you grow faster.",
  primaryCta: { label: "Explore Our Services", href: "#services", showArrow: true },
  secondaryCta: { label: "Get a Free Quote", href: "/contact" },
  availability: "Serving clients worldwide with remote collaboration.",
} as const;

export const servicesHeroTrust = [
  { title: "Web Development", description: "Fast, responsive business websites.", Icon: Code2 },
  { title: "Mobile Apps", description: "iOS and Android apps built to scale.", Icon: Smartphone },
  { title: "AI & Automation", description: "Chatbots, agents and smart workflows.", Icon: Bot },
  { title: "Growth & Support", description: "SEO, marketing and ongoing care.", Icon: TrendingUp },
];

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

export const servicesAllTech = [
  { id: "react", name: "React", logo: "/image/technologies/react.webp" },
  { id: "next", name: "Next.js", logo: "/image/technologies/nextjs.webp" },
  { id: "vue", name: "Vue.js", logo: "/image/technologies/vue.webp" },
  { id: "tailwind", name: "Tailwind CSS", logo: "/image/technologies/tailwindcss.webp" },
  { id: "laravel", name: "Laravel", logo: "/image/technologies/laravel.webp" },
  { id: "node", name: "Node.js", logo: "/image/technologies/nodejs.webp" },
  { id: "php", name: "PHP", logo: "/image/technologies/php.webp" },
  { id: "django", name: "Django", logo: "/image/technologies/django.webp" },
  { id: "flutter", name: "Flutter", logo: "/image/technologies/flutter.webp" },
  { id: "react-native", name: "React Native", logo: "/image/technologies/reactnative.webp" },
  { id: "android", name: "Android", logo: "/image/technologies/android.webp" },
  { id: "ios", name: "iOS", logo: "/image/technologies/ios.webp" },
  { id: "mysql", name: "MySQL", logo: "/image/technologies/mysql.webp" },
  { id: "postgres", name: "PostgreSQL", logo: "/image/technologies/postgresql.webp" },
  { id: "mongo", name: "MongoDB", logo: "/image/technologies/mongodb.webp" },
  { id: "redis", name: "Redis", logo: "/image/technologies/redis.webp" },
  { id: "aws", name: "AWS", logo: "/image/technologies/aws.webp" },
  { id: "docker", name: "Docker", logo: "/image/technologies/docker.webp" },
  { id: "github", name: "GitHub", logo: "/image/technologies/github.webp" },
  { id: "cicd", name: "CI/CD", logo: "/image/technologies/cicd.webp" },
  { id: "figma", name: "Figma", logo: "/image/technologies/figma.svg" },
  { id: "git", name: "Git", logo: "/image/technologies/git.svg" },
  { id: "jira", name: "Jira", logo: "/image/technologies/jira.svg" },
  { id: "slack", name: "Slack", logo: "/image/technologies/slack.svg" },
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

export const servicesPricingCopy = {
  eyebrow: "Pricing",
  title: "Simple Packages, Clear Value",
  description:
    "Transparent starting prices for the most requested projects. Every quote is confirmed after a free discovery call.",
  note: "Prices are in USD and act as starting points. Final cost depends on scope, features and timeline.",
} as const;

export const servicesPricing = [
  {
    id: "launch",
    name: "Launch",
    tagline: "A polished website to get you online",
    price: "$349",
    priceNote: "starting at",
    timeline: "5-7 days",
    features: [
      "Up to 3 responsive pages",
      "Contact form and WhatsApp link",
      "Basic on-page SEO",
      "Speed and mobile checks",
      "1 revision round",
    ],
    cta: { label: "Start Your Project", href: "/contact" },
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For businesses ready to scale",
    price: "$799",
    priceNote: "starting at",
    timeline: "2-3 weeks",
    features: [
      "Up to 8 custom pages",
      "CMS or blog setup",
      "Advanced SEO and analytics",
      "Accessibility and performance pass",
      "2 revision rounds",
      "30 days of support",
    ],
    cta: { label: "Get a Free Quote", href: "/contact" },
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For custom apps and online stores",
    price: "$1,499",
    priceNote: "starting at",
    timeline: "3-6 weeks",
    features: [
      "Custom web app or e-commerce store",
      "Payments and order management",
      "Admin dashboard and roles",
      "API and third-party integrations",
      "3 revision rounds",
      "60 days of support",
    ],
    cta: { label: "Discuss Your Project", href: "/contact" },
    highlighted: false,
  },
] as const;

export const servicesPricingCustom = {
  title: "Need something custom?",
  description:
    "AI agents, workflow automation, SaaS platforms or a mix of services. I will scope it with you and send a fixed quote.",
  cta: { label: "Book a Discovery Call", href: "/contact" },
} as const;


export const servicesIncludedCopy = {
  eyebrow: "Always Included",
  title: "Included in Every Project",
  description:
    "Whatever the package, every project ships with the same baseline, so you know exactly what you are getting.",
  noteTitle: "Fixed, transparent quotes",
  note: "No hidden extras. If the scope changes, you approve the cost before any extra work continues.",
} as const;

export const servicesIncludedItems = [
  {
    id: "discovery",
    title: "Discovery & Scoping",
    description:
      "Goals, requirements and success measures agreed before anything is built.",
  },
  {
    id: "responsive",
    title: "Responsive Design",
    description:
      "A consistent experience on mobile, tablet and desktop.",
  },
  {
    id: "performance",
    title: "Performance & SEO Basics",
    description:
      "Fast pages, clean markup and essential metadata from day one.",
  },
  {
    id: "qa",
    title: "QA & Browser Testing",
    description:
      "Tested across modern browsers and screen sizes before launch.",
  },
  {
    id: "handover",
    title: "Source Code & Handover",
    description:
      "Full ownership plus a documented handover session at launch.",
  },
  {
    id: "support",
    title: "Post-Launch Support",
    description:
      "A support window for fixes and questions after go-live.",
  },
] as const;

export const servicesCareCopy = {
  eyebrow: "After Launch",
  title: "Care & Maintenance Plans",
  description:
    "Keep your product secure, current and improving long after go-live. Plans are month-to-month and shaped around your stack.",
  note: "All plans are month-to-month. Final scope and pricing are confirmed after launch based on your setup.",
} as const;

export const servicesCarePlans = [
  {
    id: "essential",
    name: "Essential Care",
    tagline: "Keep your site secure and healthy.",
    Icon: ShieldCheck,
    features: [
      "Security updates and backups",
      "Uptime monitoring and alerts",
      "Small fixes up to 2 hours a month",
      "Monthly health report",
    ],
    cta: { label: "Ask About Essential Care", href: "/contact" },
    featured: false,
  },
  {
    id: "growth",
    name: "Growth Care",
    tagline: "Keep improving after launch.",
    Icon: TrendingUp,
    features: [
      "Everything in Essential Care",
      "Content and image updates",
      "Monthly performance and SEO check",
      "Priority support",
      "Up to 5 hours of improvements",
    ],
    cta: { label: "Choose Growth Care", href: "/contact" },
    featured: true,
  },
  {
    id: "partner",
    name: "Partner Care",
    tagline: "A long-term product partner.",
    Icon: HeartHandshake,
    features: [
      "Everything in Growth Care",
      "Ongoing feature development",
      "Quarterly roadmap planning",
      "SEO and analytics review",
      "Dedicated monthly development hours",
    ],
    cta: { label: "Talk About Partner Care", href: "/contact" },
    featured: false,
  },
] as const;

export const servicesFaqCopy = {
  eyebrow: "Services FAQ",
  title: "Questions Before You Start",
  description:
    "Straight answers about scope, ownership, payments and what happens after launch.",
  ctaTitle: "Still deciding?",
  ctaText: "Ask me anything before you commit — no pressure, no sales script.",
  cta: { label: "Ask a Question", href: "/contact" },
} as const;

export const servicesFaqs = [
  {
    id: "included",
    question: "What is included in a project quote?",
    answer:
      "Every quote lists the pages, features, revision rounds and support window included. Anything outside that list is estimated and approved before any extra work starts.",
    Icon: ClipboardList,
  },
  {
    id: "ownership",
    question: "Do I own the website and its code?",
    answer:
      "Yes. Once the final invoice is paid, you own the code, design files and content created for your project. The repository, assets and documentation are handed over at launch.",
    Icon: KeyRound,
  },
  {
    id: "payments",
    question: "How do payments work?",
    answer:
      "Projects start with a deposit that reserves your slot, then the remainder is split across milestones. The full amount is confirmed in a fixed quote before work begins, and all invoices are in USD.",
    Icon: CreditCard,
  },
  {
    id: "redesign",
    question: "Can you redesign or improve an existing website?",
    answer:
      "Yes. I can audit your current website, keep what already works and rebuild only what needs improving, or start fresh if that is the better path.",
    Icon: RefreshCw,
  },
  {
    id: "start",
    question: "How soon can you start?",
    answer:
      "Usually within one to two weeks, depending on scope and current availability. A short discovery call confirms the start date before you commit to anything.",
    Icon: CalendarDays,
  },
  {
    id: "maintenance",
    question: "Do you offer ongoing maintenance?",
    answer:
      "Every project includes a post-launch support window for fixes. After that, monthly care plans cover updates, small changes and ongoing improvements.",
    Icon: Wrench,
  },
] as const;
