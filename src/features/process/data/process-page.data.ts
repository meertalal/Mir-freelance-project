import {
  Eye,
  Clock3,
  Users,
  Headset,
  MessageSquare,
  BadgeCheck,
  Rocket,
  HeartHandshake,
} from "lucide-react";

export const processHero = {
  eyebrow: "Our Process",
  title: "From Idea to Successful Digital Product",
  description:
    "A transparent, collaborative process that turns your vision into a polished product — with clear milestones and ongoing support.",
  image: "/image/profile.webp",
};

export const processTrust = [
  { title: "Transparent Process", Icon: Eye },
  { title: "On-Time Delivery", Icon: Clock3 },
  { title: "Experienced Team", Icon: Users },
  { title: "Ongoing Support", Icon: Headset },
];

export const processWhyFeatures = [
  {
    id: "communication",
    title: "Clear Communication",
    description: "You always know where the project stands.",
    Icon: MessageSquare,
  },
  {
    id: "quality",
    title: "Quality Focus",
    description: "Clean code, careful testing, solid UX.",
    Icon: BadgeCheck,
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    description: "Milestones we commit to and meet.",
    Icon: Rocket,
  },
  {
    id: "satisfaction",
    title: "Client Satisfaction",
    description: "Partnerships built for long-term success.",
    Icon: HeartHandshake,
  },
];
