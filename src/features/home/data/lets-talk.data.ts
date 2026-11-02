import {
  Rocket,
  Layers3,
  Zap,
  Headset,
  Mail,
  MessageCircle,
} from "lucide-react";
import { brand } from "../../../data/site.data";
import { projectTypes } from "../../contact/data/contact-page.data";

export type CountryOption = {
  code: string;
  name: string;
  phoneCode: string;
  flag: string;
};

export const countries: CountryOption[] = [
  { code: "PK", name: "Pakistan", phoneCode: "+92", flag: "🇵🇰" },
  { code: "US", name: "United States", phoneCode: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", phoneCode: "+1", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44", flag: "🇬🇧" },
  { code: "AU", name: "Australia", phoneCode: "+61", flag: "🇦🇺" },
  { code: "AE", name: "United Arab Emirates", phoneCode: "+971", flag: "🇦🇪" },
  { code: "OM", name: "Oman", phoneCode: "+968", flag: "🇴🇲" },
  { code: "BH", name: "Bahrain", phoneCode: "+973", flag: "🇧🇭" },
  { code: "CH", name: "Switzerland", phoneCode: "+41", flag: "🇨🇭" },
  { code: "TR", name: "Turkey", phoneCode: "+90", flag: "🇹🇷" },
  { code: "DE", name: "Germany", phoneCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", phoneCode: "+33", flag: "🇫🇷" },
  { code: "NL", name: "Netherlands", phoneCode: "+31", flag: "🇳🇱" },
  { code: "ES", name: "Spain", phoneCode: "+34", flag: "🇪🇸" },
  { code: "IT", name: "Italy", phoneCode: "+39", flag: "🇮🇹" },
  { code: "BR", name: "Brazil", phoneCode: "+55", flag: "🇧🇷" },
  { code: "IN", name: "India", phoneCode: "+91", flag: "🇮🇳" },
  { code: "CN", name: "China", phoneCode: "+86", flag: "🇨🇳" },
  { code: "JP", name: "Japan", phoneCode: "+81", flag: "🇯🇵" },
  { code: "SG", name: "Singapore", phoneCode: "+65", flag: "🇸🇬" },
  { code: "NZ", name: "New Zealand", phoneCode: "+64", flag: "🇳🇿" },
  { code: "IE", name: "Ireland", phoneCode: "+353", flag: "🇮🇪" },
  { code: "SE", name: "Sweden", phoneCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", phoneCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", phoneCode: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", phoneCode: "+358", flag: "🇫🇮" },
  { code: "PL", name: "Poland", phoneCode: "+48", flag: "🇵🇱" },
  { code: "CZ", name: "Czechia", phoneCode: "+420", flag: "🇨🇿" },
  { code: "AT", name: "Austria", phoneCode: "+43", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", phoneCode: "+32", flag: "🇧🇪" },
  { code: "PT", name: "Portugal", phoneCode: "+351", flag: "🇵🇹" },
  { code: "AR", name: "Argentina", phoneCode: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", phoneCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", phoneCode: "+57", flag: "🇨🇴" },
  { code: "MX", name: "Mexico", phoneCode: "+52", flag: "🇲🇽" },
  { code: "ZA", name: "South Africa", phoneCode: "+27", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", phoneCode: "+234", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", phoneCode: "+254", flag: "🇰🇪" },
  { code: "EG", name: "Egypt", phoneCode: "+20", flag: "🇪🇬" },
  { code: "IL", name: "Israel", phoneCode: "+972", flag: "🇮🇱" },
  { code: "PH", name: "Philippines", phoneCode: "+63", flag: "🇵🇭" },
  { code: "ID", name: "Indonesia", phoneCode: "+62", flag: "🇮🇩" },
  { code: "MY", name: "Malaysia", phoneCode: "+60", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", phoneCode: "+66", flag: "🇹🇭" },
  { code: "VN", name: "Vietnam", phoneCode: "+84", flag: "🇻🇳" },
  { code: "TW", name: "Taiwan", phoneCode: "+886", flag: "🇹🇼" },
  { code: "HK", name: "Hong Kong", phoneCode: "+852", flag: "🇭🇰" },
];

export const countryPhoneOptions: string[] = countries.map(
  (country) => country.phoneCode,
);



export const letsTalkCopy = {
  eyebrow: "Let's Talk",
  title: "Let's Build Something Together",
  description:
    "Have an idea, project, or campaign in mind? Get in touch and let's turn it into a real, results-driven solution.",
  formTitle: "Start Your Project",
  formSubtitle: "Fill in the details below and I'll get back to you shortly.",
} as const;

export const letsTalkSteps = [
  {
    id: "idea",
    title: "Share Your Idea",
    description: "Tell me about your goals and requirements.",
    Icon: Rocket,
  },
  {
    id: "plan",
    title: "Get a Plan",
    description: "Receive a clear approach, timeline, and estimate.",
    Icon: Layers3,
  },
  {
    id: "deliver",
    title: "Build & Deliver",
    description: "I turn your idea into a high-quality solution.",
    Icon: Zap,
  },
  {
    id: "support",
    title: "Ongoing Support",
    description: "Reliable support and long-term maintenance.",
    Icon: Headset,
  },
] as const;

export const budgetRanges = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
] as const;

export const letsTalkProjectTypes = projectTypes;

const whatsappNumber = brand.phone.replace(/[^\d]/g, "");

export const letsTalkActions = [
  {
    id: "email",
    title: "Email Me",
    value: brand.email,
    href: `mailto:${brand.email}`,
    Icon: Mail,
  },
  {
    id: "whatsapp",
    title: "Chat on WhatsApp",
    value: brand.phone,
    href: `https://wa.me/${whatsappNumber}`,
    Icon: MessageCircle,
  },
] as const;
