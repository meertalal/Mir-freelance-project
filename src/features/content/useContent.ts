import { useSyncExternalStore } from "react";
import {
  Bot,
  ChartNoAxesCombined,
  Cloud,
  Code2,
  Database,
  MessageSquareMore,
  Palette,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { sharedServices, sharedTestimonials } from "../../data/site.data";

export type SiteService = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  image: string;
  imageAlt: string;
  href: string;
};

export type SiteTestimonial = {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
};

type ServiceResponse = {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  image_alt: string;
  href: string;
};

type TestimonialResponse = {
  id: number;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
};

const API_URL = (
  (import.meta.env.VITE_API_URL as string | undefined) || ""
).replace(/\/+$/, "");

const iconMap: Record<string, LucideIcon> = {
  code2: Code2,
  smartphone: Smartphone,
  bot: Bot,
  "message-square": MessageSquareMore,
  database: Database,
  palette: Palette,
  cloud: Cloud,
  chart: ChartNoAxesCombined,
};

const fallbackServices: SiteService[] = sharedServices.map((service) => ({
  id: service.id,
  title: service.title,
  description: service.description,
  Icon: service.icon,
  image: service.image,
  imageAlt: service.imageAlt,
  href: service.href,
}));

const fallbackTestimonials: SiteTestimonial[] = sharedTestimonials.map(
  (testimonial) => ({
    id: testimonial.id,
    author: testimonial.author,
    role: testimonial.role,
    company: testimonial.company,
    quote: testimonial.quote,
    avatar: testimonial.avatar,
    rating: testimonial.rating,
  }),
);

let services: SiteService[] = fallbackServices;
let testimonials: SiteTestimonial[] = fallbackTestimonials;
let started = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

async function fetchJson(path: string): Promise<unknown> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) return null;

  return response.json().catch(() => null);
}

async function load() {
  const [servicesPayload, testimonialsPayload] = await Promise.all([
    fetchJson("/api/services"),
    fetchJson("/api/testimonials"),
  ]);

  let changed = false;

  const serviceRows = (servicesPayload as { data?: ServiceResponse[] } | null)
    ?.data;

  if (Array.isArray(serviceRows) && serviceRows.length > 0) {
    services = serviceRows.map((row) => ({
      id: String(row.id),
      title: row.title,
      description: row.description,
      Icon: iconMap[row.icon] ?? Code2,
      image: row.image,
      imageAlt: row.image_alt,
      href: row.href,
    }));
    changed = true;
  }

  const testimonialRows = (
    testimonialsPayload as { data?: TestimonialResponse[] } | null
  )?.data;

  if (Array.isArray(testimonialRows) && testimonialRows.length > 0) {
    testimonials = testimonialRows.map((row) => ({
      id: String(row.id),
      author: row.author,
      role: row.role,
      company: row.company,
      quote: row.quote,
      avatar: row.avatar,
      rating: row.rating,
    }));
    changed = true;
  }

  if (changed) emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!started) {
    started = true;
    void load();
  }

  return () => {
    listeners.delete(listener);
  };
}

function getServices() {
  return services;
}

function getTestimonials() {
  return testimonials;
}

function getFallbackServices() {
  return fallbackServices;
}

function getFallbackTestimonials() {
  return fallbackTestimonials;
}

export function useServices(): SiteService[] {
  return useSyncExternalStore(subscribe, getServices, getFallbackServices);
}

export function useTestimonials(): SiteTestimonial[] {
  return useSyncExternalStore(subscribe, getTestimonials, getFallbackTestimonials);
}
