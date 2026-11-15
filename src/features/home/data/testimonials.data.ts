import { sharedTestimonials } from "../../../data/site.data";

export const homeTestimonialsCopy = {
  eyebrow: "Client Stories",
  title: "Trusted by Businesses Worldwide",
  description:
    "Real feedback from founders and teams who trusted me with their websites, apps and AI products.",
  rating: "5.0 average rating from 50+ happy clients.",
} as const;

export const homeTestimonials = sharedTestimonials;

export const clientLogos = [
  { id: "real-estate", name: "Real Estate Co.", initials: "RE" },
  { id: "digital-solutions", name: "Digital Solutions", initials: "DS" },
  { id: "technology-co", name: "Technology Co.", initials: "TC" },
  { id: "growth-labs", name: "Growth Labs", initials: "GL" },
] as const;
