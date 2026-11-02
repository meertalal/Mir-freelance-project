
import SectionHeader from "./SectionHeader";
import { featuredWorkCopy, projects } from "../../data/works.data";
import { innerContainerClass, innerSectionClass } from "../../../../components/shared/section.styles";
import type { ProjectCardProps } from "../../types/works.types";

interface FeaturedWorkProps {
  showAllProjectsLink?: boolean;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="
        group flex h-full min-w-0 flex-col overflow-hidden
        rounded-xl border border-slate-100 bg-white
        transition-[transform,box-shadow,border-color] duration-300
        hover:-translate-y-1 hover:border-blue-100
        hover:shadow-[0_14px_35px_rgba(15,48,91,0.10)]
      "
    >
      {/* Project image */}
      <a
        href={project.href}
        aria-label={`View ${project.title} project`}
        className="block overflow-hidden rounded-xl bg-slate-100"
      >
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-105
            "
          />
        </div>
      </a>

      {/* Project details */}
      <div
        className="
          flex flex-1 flex-col
          px-3 py-3
          sm:px-3 sm:py-4
          xl:px-4
          2xl:px-5
        "
      >
        <h3
          className="
            min-w-0 text-sm font-bold leading-snug text-slate-900
            transition-colors duration-300 group-hover:text-blue-700
            sm:text-base xl:text-lg
          "
        >
          <a
            href={project.href}
            className="focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            {project.title}
          </a>
        </h3>

        {/* Technology tags and country flag */}
        <div className="mt-3 flex min-w-0 items-start justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5 xl:gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="
                  max-w-full rounded-md bg-[#edf4ff]
                  px-2 py-1 text-[10px] font-medium
                  leading-tight text-[#2761bb]
                  sm:text-[11px] xl:text-xs
                "
              >
                {tag}
              </span>
            ))}
          </div>

          <img
            src={project.flag}
            alt="Country flag"
            loading="lazy"
            className="mt-0.5 h-auto w-5 shrink-0 object-contain sm:w-6"
          />
        </div>
      </div>
    </article>
  );
}

export default function FeaturedWork({
  showAllProjectsLink = true,
}: FeaturedWorkProps) {
  return (
    <section
      id="featured-work"
      aria-label="Featured projects"
      className={`
        ${innerSectionClass}
        bg-white
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      `}
    >
      <div className={`relative z-10 ${innerContainerClass}`}>
        <SectionHeader
          eyebrow={featuredWorkCopy.eyebrow}
          title={featuredWorkCopy.title}
          description={featuredWorkCopy.description}
          actionLabel={
            showAllProjectsLink ? "View All Projects" : undefined
          }
          actionHref="/projects"
        />

        {/* Responsive project grid */}
        <div
          className="
            grid w-full grid-cols-1 items-stretch
            gap-5
            min-[480px]:gap-6
            sm:grid-cols-2 sm:gap-6
            lg:grid-cols-3 lg:gap-6
            xl:gap-7
            2xl:gap-8
            min-[1920px]:gap-9
          "
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
