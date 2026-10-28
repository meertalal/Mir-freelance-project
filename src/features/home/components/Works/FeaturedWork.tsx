import SectionHeader from "./SectionHeader";
import { projects } from "../../data/works.data";
import type { ProjectCardProps } from "../../types/works.types";

interface FeaturedWorkProps {
  showAllProjectsLink?: boolean;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-lg bg-white">
      {/* Project image */}
      <a href={project.href} className="block">
        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </a>

      {/* Project details */}
      <div className="px-0.5 py-2 sm:px-1 sm:py-3">
        <h3 className="truncate text-[10px] font-bold leading-4 text-slate-900 sm:text-sm">
          <a href={project.href} className="hover:text-blue-600">
            {project.title}
          </a>
        </h3>

        <div className="mt-1.5 flex items-center justify-between gap-1">
          {/* Technology tags */}
          <div className="flex min-w-0 flex-wrap items-center gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-slate-100 px-1 py-0.5 text-[8px] font-medium leading-3 text-slate-600 sm:px-2 sm:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Country flag image */}
          <img
            src={project.flag}
            alt="Country flag"
            loading="lazy"
            className="h-auto w-4 shrink-0 object-contain sm:w-5"
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
      className="w-full overflow-hidden bg-white px-3 py-5 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:px-12 2xl:px-16"
    >
      <div className="mx-auto w-full max-w-screen-2xl">
        <SectionHeader
          eyebrow="Our Selected Creations"
          title="Where Ideas Take Shape"
          description="Bringing bold ideas to life through thoughtful design and innovative digital solutions."
          actionLabel={
            showAllProjectsLink ? "View All Projects" : undefined
          }
          actionHref="/projects"
        />

        {/* Three project cards in one row */}
        <div className="grid w-full grid-cols-3 items-start gap-2 sm:gap-5 lg:gap-6 xl:gap-7">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
