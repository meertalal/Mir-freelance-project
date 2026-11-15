import {
  Eye,
  Clock3,
  Users,
  Headset,
  MessageSquare,
  Rocket,
  HeartHandshake,
  CalendarCheck2,
  FolderKanban,
  MonitorPlay,
  MessagesSquare,
  RefreshCw,
  Repeat,
  CheckCircle2,
  MonitorSmartphone,
  Gauge,
  ShieldCheck,
  FileText,
  TriangleAlert,
  Activity,
  GraduationCap,
} from "lucide-react";

export const processHero = {
  eyebrow: "Our Process",
  title: "From Idea to Successful Digital Product",
  highlight: "Successful Digital Product",
  description:
    "A transparent, collaborative process that turns your vision into a polished product, with clear milestones and ongoing support.",
};

export const processTrust = [
  { title: "Transparent Process", description: "Clear milestones at every step.", Icon: Eye },
  { title: "On-Time Delivery", description: "Deadlines we commit to and meet.", Icon: Clock3 },
  { title: "Experienced Team", description: "Senior developers and designers.", Icon: Users },
  { title: "Ongoing Support", description: "Guidance after launch.", Icon: Headset },
];


export const processCollabPoints = [
  {
    id: "updates",
    title: "Weekly Updates",
    description:
      "A short written update every week: what shipped, what is next and anything that needs your input.",
    Icon: CalendarCheck2,
    tag: "Every week",
  },
  {
    id: "workspace",
    title: "One Shared Workspace",
    description:
      "Tasks, files and progress live in one place, so you always know exactly where things stand.",
    Icon: FolderKanban,
    tag: "One place",
  },
  {
    id: "demos",
    title: "Demo at Every Milestone",
    description:
      "You review a working build at the end of each stage before we move on to the next one.",
    Icon: MonitorPlay,
    tag: "Each milestone",
  },
  {
    id: "direct",
    title: "Direct Communication",
    description:
      "Email, WhatsApp or a call: you work directly with me, not an account manager.",
    Icon: MessagesSquare,
    tag: "Direct line",
  },
] as const;

export const processClientNeeds = [
  {
    id: "goal",
    title: "A Clear Goal",
    description:
      "What the product should achieve, who it is for, and how we will measure success.",
  },
  {
    id: "assets",
    title: "Brand and Content",
    description:
      "Logo, colours, images or existing copy. If you do not have them yet, we can shape them together.",
  },
  {
    id: "contact",
    title: "One Decision-Maker",
    description:
      "A single point of contact for feedback and approvals so nothing gets lost in translation.",
  },
  {
    id: "feedback",
    title: "Timely Feedback",
    description:
      "Replies within 1 to 2 business days keep the timeline and budget on track.",
  },
] as const;

export const processFaqs = [
  {
    id: "timeline",
    question: "How long does a typical project take?",
    answer:
      "Most projects take 3 to 8 weeks depending on scope. After discovery you get a milestone timeline, so you know exactly what happens and when.",
    Icon: Clock3,
  },
  {
    id: "communication",
    question: "How often will I hear from you?",
    answer:
      "At least once a week, plus a short recap at the end of every milestone. You can reach me any time by email or WhatsApp.",
    Icon: MessageSquare,
  },
  {
    id: "changes",
    question: "What if I need changes after a stage is approved?",
    answer:
      "Small refinements are handled as we go. Larger scope changes are estimated and approved before any extra work starts, so there are no surprises.",
    Icon: RefreshCw,
  },
  {
    id: "existing",
    question: "Can you work with an existing team or codebase?",
    answer:
      "Yes. I can join an existing team, pick up an existing codebase, or work alongside your in-house developers without disrupting the current workflow.",
    Icon: Users,
  },
  {
    id: "support",
    question: "What happens after launch?",
    answer:
      "You get a handover session, documentation and a support window for fixes. Ongoing maintenance is available if you want a long-term partner.",
    Icon: Rocket,
  },
] as const;


export const processEngagementOptions = [
  {
    id: "fixed",
    title: "Fixed-Scope Project",
    tagline: "Best for launches with a clear finish line and a defined budget.",
    timelineLabel: "Typical timeline",
    timeline: "3 to 8 weeks",
    Icon: Rocket,
    featured: true,
    ctaLabel: "Get a Fixed-Scope Quote",
    includes: [
      "Discovery, scope and milestone plan",
      "Design, build and testing",
      "Weekly updates and milestone demos",
      "Launch, handover and documentation",
      "A support window after launch",
    ],
  },
  {
    id: "ongoing",
    title: "Ongoing Partnership",
    tagline: "Best for products that keep growing after the first release.",
    timelineLabel: "Rolling commitment",
    timeline: "Month to month",
    Icon: Repeat,
    featured: false,
    ctaLabel: "Discuss an Ongoing Plan",
    includes: [
      "Continuous feature development",
      "Priority fixes and improvements",
      "Regular planning and progress updates",
      "Flexible monthly capacity",
      "No re-onboarding between projects",
    ],
  },
] as const;

export const processQualityCopy = {
  eyebrow: "Quality Gates",
  title: "Tested Before It Reaches You",
  description:
    "Every milestone passes a set of checks before it is handed over or moved to production.",
  badge: "Staging review before every handoff",
};

export const processQualityGates = [
  {
    id: "functional",
    title: "Functional QA",
    description:
      "Every flow, form and edge case tested against the agreed scope.",
    Icon: CheckCircle2,
  },
  {
    id: "responsive",
    title: "Responsive & Browser Testing",
    description:
      "Checked across modern browsers, tablets and mobile devices.",
    Icon: MonitorSmartphone,
  },
  {
    id: "performance",
    title: "Performance & Accessibility",
    description:
      "Page speed, asset weight and keyboard and screen-reader basics reviewed.",
    Icon: Gauge,
  },
  {
    id: "security",
    title: "Security & Launch Checks",
    description:
      "Secure configuration, backups and a final launch checklist.",
    Icon: ShieldCheck,
  },
] as const;

export const processPaymentsCopy = {
  eyebrow: "Payment Structure",
  title: "Payments Tied to Progress",
  description:
    "No large upfront commitment. Each payment follows work you have seen and approved.",
  note: "The exact split is confirmed in your proposal, so everything is agreed before kickoff.",
  cta: { label: "Discuss Your Project", href: "/contact" },
};

export const processPaymentMilestones = [
  {
    id: "kickoff",
    step: "At Kickoff",
    title: "Kickoff Deposit",
    description:
      "Secures your place in the schedule and starts discovery.",
  },
  {
    id: "milestones",
    step: "At Milestones",
    title: "Milestone Payments",
    description:
      "Released only after each agreed stage is reviewed and approved.",
  },
  {
    id: "launch",
    step: "At Launch",
    title: "Final on Launch",
    description:
      "Paid after the final review, handover and sign-off.",
  },
] as const;

export const processChangeCopy = {
  eyebrow: "Keeping Things on Track",
  title: "How Changes and Risks Are Handled",
  description:
    "Plans change. The process keeps changes predictable instead of letting them derail the timeline.",
};

export const processChangePoints = [
  {
    id: "requests",
    title: "Written Change Requests",
    description:
      "Anything beyond the agreed scope is documented, estimated and approved before extra work starts.",
    Icon: FileText,
  },
  {
    id: "risks",
    title: "Early Risk Flags",
    description:
      "Blockers, dependencies or timeline risks are raised as soon as they appear, with clear options.",
    Icon: TriangleAlert,
  },
  {
    id: "record",
    title: "One Source of Truth",
    description:
      "Decisions, approvals and documents live in the shared workspace so nothing is lost in email.",
    Icon: FolderKanban,
  },
] as const;

export const processAfterLaunchCopy = {
  eyebrow: "After Launch",
  title: "The First 30 Days",
  description:
    "Launch is not the finish line. The month after go-live is planned, monitored and supported.",
  cta: { label: "Ask About Post-Launch Support", href: "/contact" },
};

export const processAfterLaunchPhases = [
  {
    id: "week-1",
    label: "Week 1",
    title: "Monitoring & Quick Fixes",
    description:
      "I watch the live product, fix anything urgent and confirm the launch is stable.",
    Icon: Activity,
  },
  {
    id: "week-2",
    label: "Week 2",
    title: "Feedback & Refinements",
    description:
      "Early user feedback is reviewed and small refinements are shipped.",
    Icon: MessagesSquare,
  },
  {
    id: "week-3-4",
    label: "Weeks 3–4",
    title: "Training & Roadmap",
    description:
      "Team walkthroughs, documentation updates and a clear next-step plan.",
    Icon: GraduationCap,
  },
  {
    id: "ongoing",
    label: "Ongoing",
    title: "Optional Care Plan",
    description:
      "Continued maintenance and improvements if you want the product looked after.",
    Icon: HeartHandshake,
  },
] as const;
