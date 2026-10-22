export interface Project {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  tags: string[];
  country: string;
  countryCode: string;
  href: string;
}
export interface ProjectCardProps {
  project: Project;
}
export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}