import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type SharedProject = {
  id: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  tags: readonly string[] | string[];
  country?: string;
  flag: string;
  href: string;
};

type ProjectCardProps = {
  project: SharedProject;
  showCaseStudyLink?: boolean;
};

export default function ProjectCard({
  project,
  showCaseStudyLink = false,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_28px_rgba(15,48,91,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-[0_16px_40px_rgba(15,48,91,0.12)]">
      <Link
        to={project.href}
        aria-label={`View ${project.title}`}
        className="block overflow-hidden bg-slate-100"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#edf4ff] px-2 py-1 text-[10px] font-medium text-[#2761bb] sm:text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-montserrat text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-700 sm:text-base lg:text-lg">
          <Link to={project.href}>{project.title}</Link>
        </h3>

        {project.description && (
          <p className="mt-2 line-clamp-2 font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
            {project.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-2">
            <img
              src={project.flag}
              alt={project.country ? `${project.country} flag` : "Country flag"}
              className="h-5 w-5 rounded-full object-cover ring-1 ring-slate-200"
            />
            {project.country && (
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {project.country}
              </span>
            )}
          </div>

          {showCaseStudyLink && (
            <Link
              to={project.href}
              className="inline-flex items-center gap-1 font-playfair text-xs font-semibold text-[#092F58] hover:text-[#5882E8]"
            >
              View Case Study
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
