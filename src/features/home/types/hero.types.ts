import type { LucideIcon } from "lucide-react";

export interface HeroCountry {
  name: string;
  flag: string;
}

export interface HeroTrustItem {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface InfoCardProps {
  title: string;
  subtitle?: string;
  Icon: LucideIcon;
  className: string;
}
