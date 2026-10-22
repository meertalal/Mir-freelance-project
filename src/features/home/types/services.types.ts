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
export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}
export interface ProjectTagsProps {
  tags: string[];
}

export interface Service {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface ServiceCardProps {
  service: Service;
  index?: number;
}
export interface ServiceStatsProps {
  stats: ServiceStat[];
}