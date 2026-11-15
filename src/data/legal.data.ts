export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDoc = {
  slug: "privacy" | "terms" | "cookies";
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  privacy: {
    slug: "privacy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "How personal information is collected, used and protected when you use this website or work with me on a project.",
    updated: "November 2026",
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          "This Privacy Policy explains what information is collected when you visit this website, submit a project enquiry or become a client, and how that information is handled.",
          "By using the website or sharing your details through a form, you agree to the practices described here.",
        ],
      },
      {
        id: "information-we-collect",
        title: "Information We Collect",
        paragraphs: [
          "Information is collected in two ways: details you share directly, and limited technical data gathered automatically.",
        ],
        bullets: [
          "Contact details such as your name, email address and phone number",
          "Project information you include in a message or enquiry form",
          "Business details such as company name, role and country",
          "Basic usage data such as pages visited, browser type and approximate location",
        ],
      },
      {
        id: "how-we-use-information",
        title: "How Information Is Used",
        paragraphs: [
          "Your information is used only for legitimate business purposes related to your enquiry or project.",
        ],
        bullets: [
          "Responding to enquiries and preparing proposals",
          "Delivering agreed services and communicating about the project",
          "Issuing invoices and keeping required records",
          "Improving the website and understanding which content is useful",
        ],
      },
      {
        id: "sharing",
        title: "Sharing Information",
        paragraphs: [
          "Personal information is never sold. Data may be shared with trusted service providers that help run the business, such as email, hosting and analytics providers, and only to the extent needed to provide those services.",
          "Information may also be disclosed where required by applicable law or to protect legal rights.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies and Analytics",
        paragraphs: [
          "The website may use cookies and similar technologies for essential functionality and basic analytics. See the Cookie Policy for details and how to manage your preferences.",
        ],
      },
      {
        id: "retention",
        title: "Data Retention",
        paragraphs: [
          "Enquiry and project information is kept only for as long as needed to respond, deliver services, meet legal or accounting requirements, and resolve disputes.",
        ],
      },
      {
        id: "your-rights",
        title: "Your Rights",
        paragraphs: [
          "You can request access to, correction of, or deletion of the personal information you have shared. Reasonable requests are handled promptly.",
        ],
      },
      {
        id: "security",
        title: "Security",
        paragraphs: [
          "Reasonable technical and organisational safeguards are used to protect personal information. No method of transmission or storage is completely secure, so absolute security cannot be guaranteed.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        paragraphs: [
          "For privacy questions or requests, email mirtalal.baloch@yahoo.com and include enough detail to identify your request.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    eyebrow: "Legal",
    title: "Terms of Service",
    description:
      "The terms that apply when you engage me for design, development or consulting services.",
    updated: "November 2026",
    sections: [
      {
        id: "agreement",
        title: "Agreement",
        paragraphs: [
          "These terms apply to services provided by Mir Talal, a freelance web and AI developer. By accepting a proposal or starting a project, you agree to these terms together with the scope agreed in writing.",
        ],
      },
      {
        id: "services",
        title: "Services and Proposals",
        paragraphs: [
          "Each project begins with a written proposal or scope document describing the deliverables, timeline, milestones and price.",
          "Work outside the agreed scope is treated as a change request and may affect the timeline and cost, always confirmed in writing first.",
        ],
      },
      {
        id: "payments",
        title: "Quotes and Payments",
        paragraphs: [
          "Prices are quoted in USD unless stated otherwise. Projects typically start with a deposit, with remaining milestones invoiced during delivery.",
          "Invoices are payable by the due date shown on the invoice. Work may be paused if payments are significantly overdue.",
        ],
      },
      {
        id: "client-responsibilities",
        title: "Client Responsibilities",
        paragraphs: [
          "Timely feedback, content and access to required accounts help keep projects on schedule.",
        ],
        bullets: [
          "Providing accurate brand assets, copy and product information",
          "Reviewing milestones and giving consolidated feedback",
          "Ensuring you have rights to any material you supply",
          "Maintaining backups and access to your own accounts after handover",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual Property",
        paragraphs: [
          "Upon full payment, ownership of the custom deliverables created for your project transfers to you.",
          "Third-party libraries, frameworks and licensed assets remain subject to their own licences. Rights to preliminary concepts and internal tooling remain with the developer unless agreed otherwise.",
        ],
      },
      {
        id: "revisions",
        title: "Revisions and Change Requests",
        paragraphs: [
          "The number of revision rounds is defined in each proposal. Revisions are intended to refine agreed work; new features or directional changes are quoted separately.",
        ],
      },
      {
        id: "confidentiality",
        title: "Confidentiality",
        paragraphs: [
          "Project details, credentials and business information are treated as confidential and are not shared publicly without permission. An NDA can be signed on request.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of Liability",
        paragraphs: [
          "Services are provided with reasonable skill and care. Liability for any claim is limited to the fees paid for the specific service giving rise to the claim, to the extent permitted by applicable law.",
          "The developer is not responsible for indirect losses, third-party outages or issues caused by changes made by others after handover.",
        ],
      },
      {
        id: "termination",
        title: "Termination",
        paragraphs: [
          "Either party may end a project with written notice. Work completed up to that point is invoiced, and deliverables are handed over once outstanding invoices are settled.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        paragraphs: [
          "Questions about these terms can be sent to mirtalal.baloch@yahoo.com.",
        ],
      },
    ],
  },
  cookies: {
    slug: "cookies",
    eyebrow: "Legal",
    title: "Cookie Policy",
    description:
      "How cookies and similar technologies are used on this website, and how you can control them.",
    updated: "November 2026",
    sections: [
      {
        id: "what-are-cookies",
        title: "What Are Cookies",
        paragraphs: [
          "Cookies are small text files stored on your device by a website. They help sites remember preferences, keep features working and understand how pages are used.",
        ],
      },
      {
        id: "cookies-we-use",
        title: "Cookies We Use",
        paragraphs: [
          "This website aims to keep cookie usage minimal. The categories below describe what may be used.",
        ],
        bullets: [
          "Essential cookies needed for basic site functionality and security",
          "Preference cookies that remember choices during a visit",
          "Analytics cookies that show which pages are visited, in aggregate",
        ],
      },
      {
        id: "third-party",
        title: "Third-Party Services",
        paragraphs: [
          "Some pages may load third-party services such as analytics or embedded media. These providers may set their own cookies, governed by their respective privacy policies.",
        ],
      },
      {
        id: "managing-cookies",
        title: "Managing Cookies",
        paragraphs: [
          "You can block or delete cookies through your browser settings. Blocking essential cookies may affect how parts of the website work. Browser help pages explain how to manage cookies for your device.",
        ],
      },
      {
        id: "changes",
        title: "Changes to This Policy",
        paragraphs: [
          "This policy may be updated when tools or legal requirements change. The latest version is always published on this page.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        paragraphs: [
          "For questions about cookies, email mirtalal.baloch@yahoo.com.",
        ],
      },
    ],
  },
};
