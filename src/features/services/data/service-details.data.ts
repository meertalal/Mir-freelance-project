export type ServiceDetail = {
  id: string;
  tagline: string;
  intro: string;
  idealFor: string[];
  deliverables: string[];
  outcomes: { value: string; label: string }[];
  tech: string[];
};

const serviceDetails: ServiceDetail[] = [
  {
    id: "web-development",
    tagline: "Fast, responsive websites built to convert",
    intro:
      "Modern business websites and web applications that load quickly, work on every device and turn visitors into enquiries. Every build is structured for easy updates and long-term growth.",
    idealFor: [
      "Businesses replacing an outdated website",
      "Startups launching a first public product",
      "Companies that need a fast, SEO-ready site",
    ],
    deliverables: [
      "Custom responsive design in your brand style",
      "Content pages, landing pages and contact flows",
      "On-page SEO, metadata and analytics setup",
      "Performance and accessibility checks",
      "CMS or simple content editing",
      "Deployment and launch support",
    ],
    outcomes: [
      { value: "90+", label: "Lighthouse performance target" },
      { value: "100%", label: "responsive layouts" },
      { value: "2-4 wks", label: "typical delivery" },
    ],
    tech: ["React", "Next.js", "Laravel", "Tailwind CSS", "Node.js"],
  },
  {
    id: "mobile-app-development",
    tagline: "iOS and Android apps built to scale",
    intro:
      "Cross-platform mobile apps with clean UX, reliable APIs and a build process that keeps releases predictable. Designed for real users first, then hardened for growth.",
    idealFor: [
      "Businesses extending a service to mobile",
      "Products that need iOS and Android together",
      "Teams replacing a slow or outdated app",
    ],
    deliverables: [
      "App UX and interface design",
      "Cross-platform build for iOS and Android",
      "API and backend integration",
      "Push notifications and analytics",
      "Store listing assets and submission support",
      "Post-launch updates and monitoring",
    ],
    outcomes: [
      { value: "2", label: "platforms from one codebase" },
      { value: "4.8", label: "target store rating" },
      { value: "6-10 wks", label: "typical delivery" },
    ],
    tech: ["Flutter", "React Native", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "ai-agents-automation",
    tagline: "AI agents and workflows that save real time",
    intro:
      "Voice agents, chat assistants and automated workflows that handle repetitive tasks and keep your team focused on work that needs a human. Integrated with the tools you already use.",
    idealFor: [
      "Teams answering the same questions daily",
      "Businesses missing calls outside office hours",
      "Operations that rely on manual data entry",
    ],
    deliverables: [
      "Agent scoping and conversation design",
      "Voice or chat agent implementation",
      "CRM, calendar and tool integrations",
      "Human handoff and escalation flows",
      "Dashboard with transcripts and reports",
      "Monitoring and iteration after launch",
    ],
    outcomes: [
      { value: "24/7", label: "automated coverage" },
      { value: "60%+", label: "repetitive tasks automated" },
      { value: "3-6 wks", label: "typical delivery" },
    ],
    tech: ["Node.js", "Python", "OpenAI", "Twilio", "React", "PostgreSQL"],
  },
  {
    id: "chatbot-development",
    tagline: "Smart assistants for web, WhatsApp and more",
    intro:
      "Conversational assistants that answer questions, qualify leads and route enquiries to the right place. Trained on your services and connected to your actual business data.",
    idealFor: [
      "Sites with high enquiry volume",
      "Businesses using WhatsApp for support",
      "Sales teams that need pre-qualified leads",
    ],
    deliverables: [
      "Conversation flows and response library",
      "Website and WhatsApp chatbot build",
      "Knowledge base and content training",
      "Lead capture and CRM integration",
      "Analytics for conversations and conversions",
      "Ongoing tuning of answers and flows",
    ],
    outcomes: [
      { value: "70%", label: "queries answered instantly" },
      { value: "24/7", label: "availability" },
      { value: "2-4 wks", label: "typical delivery" },
    ],
    tech: ["Node.js", "OpenAI", "React", "Redis", "PostgreSQL"],
  },
  {
    id: "saas-development",
    tagline: "Multi-tenant products built for growth",
    intro:
      "SaaS platforms with accounts, roles, billing and dashboards, architected so new customers and features can be added without rework. From MVP to a product you can scale.",
    idealFor: [
      "Founders validating a product idea",
      "Businesses turning an internal tool into a product",
      "Teams outgrowing a prototype build",
    ],
    deliverables: [
      "Product and data model design",
      "Authentication, roles and billing",
      "Customer dashboard and admin panel",
      "API design and integrations",
      "Automated testing and deployment",
      "Documentation and handover",
    ],
    outcomes: [
      { value: "MVP", label: "in weeks, not months" },
      { value: "99.9%", label: "uptime target" },
      { value: "6-12 wks", label: "typical delivery" },
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "Docker"],
  },
  {
    id: "ui-ux-design",
    tagline: "Interfaces that look sharp and convert",
    intro:
      "Practical UX and clean interface design based on how real users behave. Wireframes, prototypes and design systems that developers can build without guesswork.",
    idealFor: [
      "Products with confusing user flows",
      "Teams starting a new app or website",
      "Businesses needing a consistent design system",
    ],
    deliverables: [
      "UX audit and user flow mapping",
      "Wireframes and interactive prototypes",
      "High-fidelity UI screens",
      "Responsive layouts for mobile and desktop",
      "Component library and design tokens",
      "Developer handoff documentation",
    ],
    outcomes: [
      { value: "50%+", label: "fewer usability issues" },
      { value: "100%", label: "responsive screens" },
      { value: "2-4 wks", label: "typical delivery" },
    ],
    tech: ["Figma", "Tailwind CSS", "React", "Storybook"],
  },
  {
    id: "cloud-devops",
    tagline: "Reliable hosting, deployments and monitoring",
    intro:
      "Setups that keep your product online and your releases calm: infrastructure, CI/CD pipelines, backups and monitoring configured for your stack and budget.",
    idealFor: [
      "Products with unstable or manual deployments",
      "Teams preparing for traffic growth",
      "Businesses needing monitoring and backups",
    ],
    deliverables: [
      "Cloud infrastructure setup",
      "CI/CD pipeline automation",
      "Dockerised environments",
      "Backups and recovery procedures",
      "Monitoring, logging and alerts",
      "Security and performance hardening",
    ],
    outcomes: [
      { value: "99.9%", label: "availability target" },
      { value: "1-click", label: "deployments" },
      { value: "1-3 wks", label: "typical delivery" },
    ],
    tech: ["AWS", "Docker", "CI/CD", "GitHub", "Redis", "PostgreSQL"],
  },
  {
    id: "digital-marketing",
    tagline: "SEO and content that bring qualified traffic",
    intro:
      "Search and content work tied to business goals, not vanity metrics. Technical SEO, on-page structure and a publishing plan that compounds over time.",
    idealFor: [
      "Websites with little organic traffic",
      "Businesses launching new services",
      "Teams needing a clear content plan",
    ],
    deliverables: [
      "Technical SEO audit and fixes",
      "Keyword and competitor research",
      "On-page optimization and internal links",
      "Analytics, tracking and reporting",
      "Content plan and page outlines",
      "Monthly performance review",
    ],
    outcomes: [
      { value: "3-6 mo", label: "typical SEO horizon" },
      { value: "100%", label: "tracking coverage" },
      { value: "Monthly", label: "reporting cadence" },
    ],
    tech: ["Google Analytics", "Search Console", "Figma", "React"],
  },
];

export function getServiceDetail(id: string | undefined) {
  return serviceDetails.find((service) => service.id === id);
}
