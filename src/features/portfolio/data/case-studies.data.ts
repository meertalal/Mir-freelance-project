export type CaseStudy = {
  id: string;
  industry: string;
  year: string;
  duration: string;
  services: string[];
  overview: string;
  challenge: string;
  challengePoints: string[];
  solution: string;
  solutionPoints: string[];
  stack: string[];
  results: { value: string; label: string }[];
  deliverables: string[];
  testimonialId: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "voice-agent",
    industry: "Real Estate",
    year: "2025",
    duration: "6 weeks",
    services: ["AI Agents", "Web App", "Automation"],
    overview:
      "A conversational AI platform that answers inbound calls, qualifies leads and books property viewings around the clock for a growing real estate team.",
    challenge:
      "The client was losing enquiries outside office hours and spending hours each day on repetitive qualification calls.",
    challengePoints: [
      "Missed calls after hours and on weekends",
      "Agents manually qualifying every new lead",
      "No central record of call outcomes",
    ],
    solution:
      "I built a voice agent that follows the team script, captures requirements and writes a clean summary into their CRM after every conversation.",
    solutionPoints: [
      "Natural voice conversations with guided call flows",
      "Automatic lead scoring and viewing bookings",
      "Call summaries and transcripts synced to the CRM",
      "Admin dashboard with live call monitoring",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "OpenAI", "Twilio", "AWS"],
    results: [
      { value: "68%", label: "fewer missed calls" },
      { value: "3x", label: "faster booking process" },
      { value: "24/7", label: "call coverage" },
    ],
    deliverables: [
      "AI voice agent with custom call scripts",
      "CRM integration and lead routing",
      "Booking calendar automation",
      "Admin dashboard and reporting",
    ],
    testimonialId: "michael-thompson",
  },
  {
    id: "estate-crm",
    industry: "Real Estate",
    year: "2025",
    duration: "8 weeks",
    services: ["Web Application", "CRM", "Automation"],
    overview:
      "A property management CRM that centralises listings, leads and follow-ups so a busy agency can move faster with fewer manual steps.",
    challenge:
      "Leads, listings and client notes lived in spreadsheets and inboxes, making follow-up slow and reporting almost impossible.",
    challengePoints: [
      "Scattered lead and listing data",
      "Slow follow-up on new enquiries",
      "No reliable pipeline reporting",
    ],
    solution:
      "A tailored CRM that brings the full sales pipeline into one place, with automations that keep every lead moving.",
    solutionPoints: [
      "Unified pipeline with lead stages and owners",
      "Automated follow-up reminders and emails",
      "Listing management with media galleries",
      "Role based access for agents and managers",
    ],
    stack: ["React", "Laravel", "MySQL", "Redis", "Docker"],
    results: [
      { value: "42%", label: "faster lead response" },
      { value: "2.1x", label: "more listings managed" },
      { value: "30%", label: "less admin time" },
    ],
    deliverables: [
      "Custom CRM with pipeline views",
      "Automated follow-up workflows",
      "Listing and media management",
      "Reporting dashboard for managers",
    ],
    testimonialId: "michael-thompson",
  },
  {
    id: "ecommerce-marketplace",
    industry: "E-commerce",
    year: "2025",
    duration: "10 weeks",
    services: ["Marketplace", "Payments", "Mobile"],
    overview:
      "A multi-vendor marketplace with storefronts, payments and inventory sync, designed to give small sellers a professional online presence.",
    challenge:
      "The client needed to launch quickly with multiple sellers, without the overhead of building each store separately.",
    challengePoints: [
      "Multiple sellers with separate catalogues",
      "Complex payment and payout flows",
      "Mobile shoppers dropping at checkout",
    ],
    solution:
      "I delivered a shared marketplace core with seller dashboards, a streamlined checkout and a fast mobile experience.",
    solutionPoints: [
      "Vendor onboarding and store management",
      "Secure payments with split payouts",
      "Inventory and order sync across sellers",
      "Mobile-first storefront and checkout",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Stripe", "React Native"],
    results: [
      { value: "55%", label: "faster checkout" },
      { value: "12k+", label: "orders in first quarter" },
      { value: "99.9%", label: "platform uptime" },
    ],
    deliverables: [
      "Multi-vendor marketplace platform",
      "Seller dashboard and onboarding",
      "Payments, payouts and invoicing",
      "Responsive storefront and mobile app",
    ],
    testimonialId: "sarah-johnson",
  },
  {
    id: "healthcare-app",
    industry: "Healthcare",
    year: "2024",
    duration: "9 weeks",
    services: ["Mobile App", "Telehealth", "UX"],
    overview:
      "A patient-friendly mobile app for appointments, records and telehealth visits, built to reduce friction for both patients and clinic staff.",
    challenge:
      "Patients were calling reception for every appointment change, and no-shows were eating into clinic capacity.",
    challengePoints: [
      "Phone-only appointment management",
      "High no-show rate",
      "Fragmented access to records",
    ],
    solution:
      "A clean mobile experience with reminders, rescheduling and secure video visits, connected to the clinic schedule.",
    solutionPoints: [
      "Self-service booking and rescheduling",
      "Automated reminders and confirmations",
      "Secure telehealth video visits",
      "Patient records and visit history",
    ],
    stack: ["Flutter", "Node.js", "PostgreSQL", "AWS", "Twilio"],
    results: [
      { value: "4.8", label: "App Store rating" },
      { value: "60%", label: "fewer no-shows" },
      { value: "15k+", label: "appointments booked" },
    ],
    deliverables: [
      "iOS and Android patient app",
      "Appointment and reminder flows",
      "Telehealth video integration",
      "Clinic admin dashboard",
    ],
    testimonialId: "david-lee",
  },
  {
    id: "saas-analytics",
    industry: "SaaS",
    year: "2024",
    duration: "7 weeks",
    services: ["SaaS Product", "Analytics", "Cloud"],
    overview:
      "A real-time analytics platform that gives product teams custom dashboards, saved reports and scheduled exports in one workspace.",
    challenge:
      "Reporting was assembled manually each week, so product decisions were based on stale numbers.",
    challengePoints: [
      "Manual weekly reporting",
      "Data spread across several tools",
      "No self-service dashboards for teams",
    ],
    solution:
      "I designed a reporting workspace with live data sources, reusable dashboard templates and role based sharing.",
    solutionPoints: [
      "Live dashboards with custom widgets",
      "Saved reports and scheduled exports",
      "Role based workspace sharing",
      "Scalable cloud data pipeline",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Docker"],
    results: [
      { value: "5x", label: "faster reporting" },
      { value: "40+", label: "dashboard templates" },
      { value: "99.9%", label: "uptime" },
    ],
    deliverables: [
      "Multi-tenant analytics workspace",
      "Customisable dashboard builder",
      "Scheduled report delivery",
      "Cloud infrastructure and monitoring",
    ],
    testimonialId: "james-wilson",
  },
  {
    id: "lms",
    industry: "Education",
    year: "2024",
    duration: "8 weeks",
    services: ["Web Platform", "EdTech", "SaaS"],
    overview:
      "A learning management system for course delivery, progress tracking, quizzes and certificates, used by trainers and learners remotely.",
    challenge:
      "The team was delivering courses through email and shared folders, with no way to track progress or issue certificates.",
    challengePoints: [
      "Course material scattered across folders",
      "No progress visibility for trainers",
      "Manual certificate creation",
    ],
    solution:
      "A structured learning platform with clear course paths, automated quizzes and certificates issued on completion.",
    solutionPoints: [
      "Structured courses with lessons and media",
      "Progress tracking and learner dashboards",
      "Quizzes with automatic grading",
      "Certificates generated on completion",
    ],
    stack: ["Next.js", "Laravel", "MySQL", "Redis", "AWS"],
    results: [
      { value: "20k+", label: "course completions" },
      { value: "35%", label: "higher engagement" },
      { value: "3x", label: "faster publishing" },
    ],
    deliverables: [
      "Course builder and lesson player",
      "Learner and trainer dashboards",
      "Quiz engine and grading",
      "Certificate generation",
    ],
    testimonialId: "sarah-johnson",
  },
];

export function getCaseStudy(slug: string | undefined) {
  return caseStudies.find((study) => study.id === slug);
}
