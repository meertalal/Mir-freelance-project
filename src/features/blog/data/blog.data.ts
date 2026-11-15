import {
  Bot,
  ClipboardList,
  Code2,
  Gauge,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateTime: string;
  readTime: string;
  Icon: LucideIcon;
  coverClass: string;
  intro: string;
  sections: BlogSection[];
  takeaways: string[];
};

export const blogHero = {
  eyebrow: "Insights",
  title: "Ideas, Guides and Build Notes",
  description:
    "Practical articles on web development, AI automation and building digital products that actually help businesses grow.",
} as const;

export const blogTopics = ["AI & Automation", "Web Development", "Process", "SaaS"] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-agents-customer-support",
    title: "How AI Agents Are Changing Customer Support for Small Businesses",
    excerpt:
      "Voice and chat agents can now handle routine enquiries, bookings and follow-ups. Here is where they genuinely help and where a human still wins.",
    category: "AI & Automation",
    date: "Oct 8, 2026",
    dateTime: "2026-10-08",
    readTime: "6 min read",
    Icon: Bot,
    coverClass: "from-[#0f3d6e] via-[#092f58] to-[#06172D]",
    intro:
      "AI agents have moved from novelty demos to tools that answer real calls and messages every day. For small teams, the value is not replacing people, it is removing the repetitive work that eats their time.",
    sections: [
      {
        heading: "Where AI agents genuinely help",
        paragraphs: [
          "The strongest use cases are narrow and repetitive: answering common questions, qualifying inbound leads, booking appointments and collecting the details a human needs before a call.",
          "In these situations an agent is available after hours, never forgets the script, and writes a clean summary into your CRM.",
        ],
        bullets: [
          "Answering pricing, availability and service questions",
          "Booking, rescheduling and confirming appointments",
          "Qualifying leads before they reach a salesperson",
          "Sending summaries and next steps automatically",
        ],
      },
      {
        heading: "Where a human still wins",
        paragraphs: [
          "Complex negotiations, sensitive complaints and high-value consultations still need judgment. The best setups hand off to a person with full context rather than trying to automate everything.",
          "A clear handoff, with the conversation history attached, is often more valuable than a perfect script.",
        ],
      },
      {
        heading: "What to prepare before launching one",
        paragraphs: [
          "Start with the ten questions your team answers most often. Those become the agent script. Then decide which outcomes should trigger a human handoff and connect the agent to your calendar and CRM.",
          "Measure the basics first: calls handled, bookings made, handoff quality and customer feedback. Optimise from real transcripts, not assumptions.",
        ],
      },
    ],
    takeaways: [
      "Automate narrow, repetitive conversations first",
      "Design a clean human handoff with full context",
      "Measure bookings and handoff quality, not just call volume",
    ],
  },
  {
    slug: "react-vs-nextjs-2026",
    title: "React vs Next.js in 2026: Choosing the Right Stack",
    excerpt:
      "Both are excellent. The right choice depends on your content, SEO needs, team and how the product will grow.",
    category: "Web Development",
    date: "Sep 22, 2026",
    dateTime: "2026-09-22",
    readTime: "7 min read",
    Icon: Code2,
    coverClass: "from-[#0e2f58] via-[#12427A] to-[#0b2f52]",
    intro:
      "React gives you a flexible UI library. Next.js gives you a framework with routing, rendering and deployment conventions. For most business websites, that difference is the whole decision.",
    sections: [
      {
        heading: "When Next.js is the better fit",
        paragraphs: [
          "If SEO, fast first loads and content publishing matter, Next.js removes a lot of manual setup. Server rendering and static generation make it easier to ship pages that load quickly and index well.",
          "Marketing sites, blogs, e-commerce storefronts and product sites usually benefit most.",
        ],
        bullets: [
          "Content-driven websites and blogs",
          "E-commerce and marketing pages",
          "Projects that need strong technical SEO",
          "Teams that want routing and conventions built in",
        ],
      },
      {
        heading: "When plain React is enough",
        paragraphs: [
          "For dashboards, internal tools and apps behind a login, SEO is irrelevant. A Vite React setup is simpler, lighter and faster to iterate on.",
          "If the product is mostly client-side state and API calls, adding a full framework can be unnecessary overhead.",
        ],
      },
      {
        heading: "The practical recommendation",
        paragraphs: [
          "Choose based on where the product will live next year, not just today. A website expected to grow into a content platform should start with Next.js. An internal dashboard can stay lean with React.",
          "Either way, the quality of the architecture, accessibility and performance work matters more than the logo on the stack diagram.",
        ],
      },
    ],
    takeaways: [
      "Pick Next.js for SEO-heavy, content-driven products",
      "Plain React is often enough for dashboards and apps",
      "Decide based on the next 12 months, not launch day",
    ],
  },
  {
    slug: "prepare-for-discovery-call",
    title: "What to Prepare Before Your First Discovery Call",
    excerpt:
      "A short prep checklist that turns a vague idea into a project you can scope, price and start with confidence.",
    category: "Process",
    date: "Sep 4, 2026",
    dateTime: "2026-09-04",
    readTime: "4 min read",
    Icon: ClipboardList,
    coverClass: "from-[#123c68] via-[#0d4074] to-[#092f58]",
    intro:
      "The best discovery calls are not presentations. They are working sessions where we clarify the goal, the users and the constraints. A little preparation makes that hour twice as useful.",
    sections: [
      {
        heading: "Bring the business goal, not just the feature list",
        paragraphs: [
          "Features are solutions. The goal behind them is what actually shapes scope. If the aim is more qualified leads, a booking flow and better landing pages may matter more than a long list of menu items.",
        ],
        bullets: [
          "The main business outcome for the next 6 to 12 months",
          "Who the primary users or customers are",
          "What happens today without the product",
        ],
      },
      {
        heading: "Know your constraints",
        paragraphs: [
          "Timeline, budget range and any existing systems all affect the technical approach. Sharing approximate ranges early prevents proposals that do not fit.",
          "Mention any tools you already use: CRM, email platform, payment provider, hosting or internal software.",
        ],
      },
      {
        heading: "Bring examples you like",
        paragraphs: [
          "Two or three reference websites or apps communicate more than a page of adjectives. They show the level of polish, tone and complexity you expect.",
          "It is equally useful to mention what you do not want, including styles or features you have already rejected.",
        ],
      },
    ],
    takeaways: [
      "Lead with the business outcome",
      "Share realistic timeline and budget ranges",
      "Bring references for style and complexity",
    ],
  },
  {
    slug: "signs-website-needs-rebuild",
    title: "5 Signs Your Business Website Needs a Rebuild",
    excerpt:
      "A website does not have to be old to be holding you back. These are the signals that a rebuild will pay for itself.",
    category: "Web Development",
    date: "Aug 18, 2026",
    dateTime: "2026-08-18",
    readTime: "5 min read",
    Icon: Gauge,
    coverClass: "from-[#0b2f52] via-[#14508c] to-[#092f58]",
    intro:
      "Redesigns are expensive, so they should be justified by business problems, not boredom. These five signals usually mean the current site is costing more than a rebuild would.",
    sections: [
      {
        heading: "1. Mobile visitors are dropping off",
        paragraphs: [
          "If most traffic is mobile but most conversions come from desktop, the mobile experience is likely slow, cramped or confusing. A responsive rebuild often fixes this faster than patching an old theme.",
        ],
      },
      {
        heading: "2. Simple edits take days",
        paragraphs: [
          "When changing a phone number requires a developer, content stays stale. A modern CMS or component-based build lets the team update pages without touching code.",
        ],
      },
      {
        heading: "3. The site is slow or insecure",
        paragraphs: [
          "Outdated plugins and unmaintained themes create risk. If security updates are being avoided because they might break the site, that is a strong argument for a clean rebuild.",
        ],
        bullets: [
          "Warning alerts in the browser",
          "Page loads consistently above three seconds",
          "Broken layouts on new devices",
          "No backups or update process",
        ],
      },
      {
        heading: "4. The brand has moved on",
        paragraphs: [
          "If the site no longer reflects the quality of the work or the clients you want, it is quietly costing trust. A focused redesign can reposition the business without changing what you sell.",
        ],
      },
      {
        heading: "5. You cannot measure anything",
        paragraphs: [
          "Without analytics, form tracking and clear calls to action, decisions are guesses. A rebuild is a good moment to add proper measurement from day one.",
        ],
      },
    ],
    takeaways: [
      "Judge the site by conversions, not age",
      "Slow, insecure platforms are a business risk",
      "Rebuilds are the right time to add analytics",
    ],
  },
  {
    slug: "idea-to-mvp-roadmap",
    title: "From Idea to MVP: A Practical Roadmap",
    excerpt:
      "How to go from a rough concept to a working first version without overbuilding or burning the budget.",
    category: "SaaS",
    date: "Jul 30, 2026",
    dateTime: "2026-07-30",
    readTime: "8 min read",
    Icon: Rocket,
    coverClass: "from-[#0f3d6e] via-[#0c3560] to-[#0b2f52]",
    intro:
      "An MVP is not a smaller version of the final product. It is the smallest release that proves the core value and teaches you what to build next.",
    sections: [
      {
        heading: "Start with one clear problem",
        paragraphs: [
          "Write the problem in a single sentence from the user perspective. If it needs three sentences, the scope is probably two products.",
          "Then define the one action that proves the product works: a booking made, an invoice sent, a report generated. Everything else is secondary for version one.",
        ],
        bullets: [
          "Who has the problem and how often",
          "What they do today instead",
          "What success looks like in numbers",
        ],
      },
      {
        heading: "Cut scope until it hurts, then cut again",
        paragraphs: [
          "Most first versions fail from too many features, not too few. Move anything that does not directly support the core action into a later phase.",
          "Admin tools, advanced permissions and edge-case automation are common candidates for phase two. Build them when real usage proves they are needed.",
        ],
      },
      {
        heading: "Design for change",
        paragraphs: [
          "You will learn from the first users. Keep the architecture simple, the data model clear and the code readable so changes are cheap.",
          "Ship in short cycles with feedback between them. A working weekly demo is more useful than a perfect monthly release.",
        ],
      },
      {
        heading: "Measure, then decide",
        paragraphs: [
          "Define two or three metrics before launch. After a few weeks of real usage, decide whether to double down, adjust the core flow or stop.",
          "The point of an MVP is learning fast, not proving the original idea was perfect.",
        ],
      },
    ],
    takeaways: [
      "One problem, one core action",
      "Postpone anything that does not support the core value",
      "Decide the next move with real usage data",
    ],
  },
];

export function getBlogPost(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}
