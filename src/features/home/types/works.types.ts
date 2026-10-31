export interface Project {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  tags: string[];
  flag: string;
  href: string;
}

export interface ProjectCardProps {
  project: Project;
}
export type { SectionHeaderProps } from "../../../components/shared/SectionHeader";