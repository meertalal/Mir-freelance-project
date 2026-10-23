import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../types/works.types";
import ProjectTags from "./ProjectTags";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-[0_2px_10px_rgba(15,35,75,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <a
        href={project.href}
        aria-label={`View ${project.title}`}
        className="block overflow-hidden bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className="aspect-[1.65/1] w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </a>

      <div className="p-2 sm:p-2.5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-playfair text-[12px] font-bold leading-snug text-[#10234a] sm:text-[14px]">
            {project.title}
          </h3>

          <a
            href={project.href}
            aria-label={`Open ${project.title}`}
            className="mt-0.5 text-slate-400 transition-colors hover:text-blue-600"
          >
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <ProjectTags tags={project.tags} />

          <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-inter text-[9px] font-semibold text-slate-600 sm:text-[10px]">
            <span
              role="img"
              aria-label={`${project.country} flag`}
              className="text-xs leading-none"
            >
              {project.countryCode === "US"
                ? "🇺🇸"
                : project.countryCode === "CA"
                  ? "🇨🇦"
                  : project.countryCode === "AU"
                    ? "🇦🇺"
                    : "🌐"}
            </span>

            {project.country}
          </span>
        </div>
      </div>
    </article>
  );
}