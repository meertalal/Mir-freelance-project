
import type {
  WorkFeature,
  Testimonial,
} from "../types/why-work.types";

export const whyWorkCopy = {
  eyebrow: "Why Work With Me",
  title: "A Reliable Technology Partner",
  description:
    "I focus on long-term partnerships, quality work, and solutions that create real business value.",
} as const;

export const workFeatures: WorkFeature[] = [
  {
    id: "communication",
    title: "Clear Communication",
    description: "Regular updates and transparent process.",
    icon: "communication",
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    description: "Committed to timelines and milestones.",
    icon: "delivery",
  },
  {
    id: "technology",
    title: "Modern Technology",
    description: "Latest tools and best practices.",
    icon: "technology",
  },
  {
    id: "support",
    title: "Ongoing Support",
    description: "Post-launch support and maintenance.",
    icon: "support",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "michael-thompson",
    quote:
      "Excellent work! Delivered our platform on time with outstanding quality. Communication was smooth and professional throughout the project. Highly recommended!",
    author: "Michael Thompson",
    role: "CEO",
    company: "Real Estate Company",
    avatar: "/images/testimonials/michael-thompson.webp",
    rating: 5,
  },
  {
    id: "sarah-johnson",
    quote:
      "The entire process was smooth and professional. The final product was thoughtfully designed and delivered to a high standard.",
    author: "Sarah Johnson",
    role: "Founder",
    company: "Digital Solutions",
    avatar: "/images/testimonials/sarah-johnson.webp",
    rating: 5,
  },
  {
    id: "david-lee",
    quote:
      "A reliable development partner who transformed our ideas into a polished digital experience.",
    author: "David Lee",
    role: "Product Manager",
    company: "Technology Company",
    avatar: "/images/testimonials/david-lee.webp",
    rating: 5,
  },
];
