import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface ServiceStat {
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  allServicesHref?: string;
}