import {
  Code2,
  Smartphone,
  Bot,
  MessageSquareMore,
  Database,
  Palette,
  Cloud,
  ChartNoAxesCombined,
  Search,
  CalendarDays,
  Rocket,
  Headset,
  type LucideIcon,
} from "lucide-react";

export const brand = {
  name: "Mir Talal",
  subtitle: "Freelance Web Developer",
  tagline:
    "Helping startups and businesses build modern websites, mobile apps and automation solutions that actually deliver.",
  email: "mirtalal.baloch@yahoo.com",
  phone: "+1 438 905 4165",
  location: "Pakistan (Serving Worldwide)",
  hours: "Mon – Sat · 10:00 AM – 7:00 PM (PKT)",
} as const;

export const socialLinks = [
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { id: "facebook", label: "Facebook", href: "https://facebook.com" },
  { id: "twitter", label: "Twitter", href: "https://twitter.com" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  { id: "github", label: "GitHub", href: "https://github.com" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com" },
] as const;

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerServices = [
  { label: "Web Development", href: "/services" },
  { label: "Mobile Apps", href: "/services" },
  { label: "AI Agents", href: "/services" },
  { label: "SaaS Development", href: "/services" },
  { label: "Cloud & DevOps", href: "/services" },
  { label: "Digital Marketing", href: "/services" },
] as const;

export const processSteps: {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  tasks: string[];
}[] = [
  {
    id: "discovery",
    step: 1,
    title: "Discovery",
    description: "Understanding goals, users, and requirements.",
    icon: Search,
    tasks: [
      "Requirement analysis",
      "Competitor research",
      "Stakeholder interviews",
      "Success metrics definition",
    ],
  },
  {
    id: "planning",
    step: 2,
    title: "Planning",
    description: "Creating timelines, architecture, and roadmaps.",
    icon: CalendarDays,
    tasks: [
      "Project roadmap",
      "Technical architecture",
      "Sprint planning",
      "Risk assessment",
    ],
  },
  {
    id: "development",
    step: 3,
    title: "Development",
    description: "Design, build, and rigorously test the product.",
    icon: Code2,
    tasks: [
      "UI/UX design",
      "Frontend & backend build",
      "Integrations",
      "QA & testing",
    ],
  },
  {
    id: "launch",
    step: 4,
    title: "Launch",
    description: "Smooth rollout with monitoring and handover.",
    icon: Rocket,
    tasks: [
      "Production deployment",
      "Performance checks",
      "Training & docs",
      "Go-live support",
    ],
  },
  {
    id: "support",
    step: 5,
    title: "Ongoing Support",
    description: "Maintenance, updates, and continuous improvement.",
    icon: Headset,
    tasks: [
      "Bug fixes",
      "Feature updates",
      "Security patches",
      "Performance tuning",
    ],
  },
];

export const techStack = [
  { id: "react", name: "React", color: "#61DAFB" },
  { id: "nextjs", name: "Next.js", color: "#111827" },
  { id: "laravel", name: "Laravel", color: "#FF2D20" },
  { id: "nodejs", name: "Node.js", color: "#339933" },
  { id: "python", name: "Python", color: "#3776AB" },
  { id: "aws", name: "AWS", color: "#FF9900" },
  { id: "mysql", name: "MySQL", color: "#4479A1" },
  { id: "mongodb", name: "MongoDB", color: "#47A248" },
  { id: "flutter", name: "Flutter", color: "#02569B" },
  { id: "docker", name: "Docker", color: "#2496ED" },
  { id: "figma", name: "Figma", color: "#F24E1E" },
  { id: "wordpress", name: "WordPress", color: "#21759B" },
] as const;

export const sharedServices = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Modern, responsive websites using latest technologies.",
    icon: Code2,
    href: "/services",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description: "iOS & Android apps tailored to your business needs.",
    icon: Smartphone,
    href: "/services",
  },
  {
    id: "ai-agents-automation",
    title: "AI Agents & Automation",
    description: "AI voice agents, chatbots and workflow automation.",
    icon: Bot,
    href: "/services",
  },
  {
    id: "chatbot-development",
    title: "Chatbot Development",
    description: "Smart chatbots for websites, WhatsApp and business platforms.",
    icon: MessageSquareMore,
    href: "/services",
  },
  {
    id: "saas-development",
    title: "SaaS & Product Development",
    description: "Scalable SaaS products with multi-tenant architecture.",
    icon: Database,
    href: "/services",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Clean, modern and conversion-focused designs.",
    icon: Palette,
    href: "/services",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Deployment, server setup, CI/CD and maintenance.",
    icon: Cloud,
    href: "/services",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "SEO, content strategy and social media marketing.",
    icon: ChartNoAxesCombined,
    href: "/services",
  },
] as const;

export const sharedProjects = [
  {
    id: "voice-agent",
    title: "AI Voice Agent Platform",
    description:
      "Conversational AI platform that handles customer calls and bookings automatically.",
    image: "/image/projects/voice-agent.webp",
    imageAlt: "AI voice agent dashboard",
    tags: ["AI", "SaaS", "Web App"],
    category: "saas",
    country: "USA",
    flag: "/image/flags/usa-flag.webp",
    href: "/portfolio",
  },
  {
    id: "estate-crm",
    title: "Real Estate CRM",
    description:
      "Property management CRM with lead tracking, listings, and automation workflows.",
    image: "/image/projects/estate-crm.webp",
    imageAlt: "Real estate CRM dashboard",
    tags: ["Web", "CRM", "Automation"],
    category: "web",
    country: "Canada",
    flag: "/image/flags/canadian-flag.webp",
    href: "/portfolio",
  },
  {
    id: "ecommerce-marketplace",
    title: "E-commerce Marketplace",
    description:
      "Multi-vendor marketplace with payments, inventory, and mobile shopping experience.",
    image: "/image/projects/ecommerce-marketplace.webp",
    imageAlt: "E-commerce marketplace",
    tags: ["Mobile", "Payment", "SaaS"],
    category: "mobile",
    country: "Australia",
    flag: "/image/flags/australian-flag.webp",
    href: "/portfolio",
  },
  {
    id: "healthcare-app",
    title: "Healthcare Mobile App",
    description:
      "Patient-friendly mobile experience for appointments, records, and telehealth.",
    image: "/image/projects/voice-agent.webp",
    imageAlt: "Healthcare mobile app",
    tags: ["Mobile", "Health", "UX"],
    category: "mobile",
    country: "UK",
    flag: "/image/flags/uk-flag.webp",
    href: "/portfolio",
  },
  {
    id: "saas-analytics",
    title: "SaaS Analytics Platform",
    description:
      "Real-time analytics dashboard for product teams with custom reporting.",
    image: "/image/projects/estate-crm.webp",
    imageAlt: "SaaS analytics platform",
    tags: ["SaaS", "Analytics", "Web"],
    category: "saas",
    country: "UAE",
    flag: "/image/flags/uae-flag.webp",
    href: "/portfolio",
  },
  {
    id: "lms",
    title: "Learning Management System",
    description:
      "Course delivery platform with progress tracking, quizzes, and certificates.",
    image: "/image/projects/ecommerce-marketplace.webp",
    imageAlt: "Learning management system",
    tags: ["Web", "EdTech", "SaaS"],
    category: "web",
    country: "Oman",
    flag: "/image/flags/omani-flag.webp",
    href: "/portfolio",
  },
] as const;

export const sharedTestimonials = [
  {
    id: "michael-thompson",
    quote:
      "Excellent work! Delivered our platform on time with outstanding quality. Communication was smooth and professional throughout the project. Highly recommended!",
    author: "Michael Thompson",
    role: "CEO",
    company: "Real Estate Company",
    avatar: "/image/profile.webp",
    rating: 5,
  },
  {
    id: "sarah-johnson",
    quote:
      "The entire process was smooth and professional. The final product was thoughtfully designed and delivered to a high standard.",
    author: "Sarah Johnson",
    role: "Founder",
    company: "Digital Solutions",
    avatar: "/image/profile.webp",
    rating: 5,
  },
  {
    id: "david-lee",
    quote:
      "A reliable development partner who transformed our ideas into a polished digital experience.",
    author: "David Lee",
    role: "Product Manager",
    company: "Technology Company",
    avatar: "/image/profile.webp",
    rating: 5,
  },
  {
    id: "james-wilson",
    quote:
      "Clear process, strong communication, and excellent delivery quality. Exactly the partner we needed for a complex digital product.",
    author: "James Wilson",
    role: "CEO",
    company: "Growth Labs",
    avatar: "/image/profile.webp",
    rating: 5,
  },
] as const;
