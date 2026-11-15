import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredWorkCopy, projects } from "../../data/works.data";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../../components/shared/section.styles";
import Reveal from "../../../../components/shared/Reveal";
import type { Project } from "../../types/works.types";

interface FeaturedWorkProps {
  showAllProjectsLink?: boolean;
}

const padIndex = (value: number) => String(value).padStart(2, "0");

function ProjectTags({
  tags,
  overlay = false,
}: {
  tags: string[];
  overlay?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className={
            overlay
              ? "rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-inter text-[11px] font-medium leading-tight text-white backdrop-blur-md"
              : "rounded-full border border-[#DCE8F8] bg-[#F4F8FF] px-2.5 py-1 font-inter text-[11px] font-medium leading-tight text-[#2B5EA7] transition-colors duration-300 group-hover:border-[#C3DAF8] group-hover:bg-white"
          }
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function FeaturedProjectLink({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      to={project.href}
      aria-label={`View ${project.title} project`}
      className="
        group relative col-span-1 block overflow-hidden rounded-[1.75rem]
        bg-[#092F58] shadow-[0_24px_60px_-20px_rgba(9,47,88,0.5)]
        ring-1 ring-inset ring-white/10
        transition-[transform,box-shadow] duration-500 ease-out
        hover:-translate-y-1 hover:shadow-[0_34px_74px_-18px_rgba(9,47,88,0.55)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#5882E8] focus-visible:ring-offset-4
        xl:col-span-7 xl:h-full
      "
    >
      <div className="relative aspect-[16/12] w-full overflow-hidden sm:aspect-[16/10] xl:aspect-auto xl:h-full xl:min-h-[520px]">
        <img
          src={project.image}
          alt={project.imageAlt}
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,21,43,0)_0%,rgba(4,21,43,0.35)_45%,rgba(4,21,43,0.9)_70%,#04152B_100%)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#04152B]/45 sm:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute right-5 top-4 select-none font-playfair text-[56px] font-bold leading-none text-white/10 sm:right-7 sm:text-[72px] lg:text-[84px]"
        >
          {padIndex(index + 1)}
        </span>

        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-9">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:text-[11px]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#7DD3FC]"
            />
            Featured Project
          </span>

          <h3 className="mt-3 max-w-lg font-montserrat text-[22px] font-bold leading-[1.15] text-white sm:text-[28px] lg:text-[34px]">
            {project.title}
          </h3>

          <p className="mt-2.5 max-w-md font-inter text-sm leading-relaxed text-white/75 line-clamp-2 max-sm:hidden sm:text-[15px]">
            {project.description}
          </p>

          <div className="mt-4">
            <ProjectTags tags={project.tags} overlay />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
            <img
              src={project.flag}
              alt="Country flag"
              loading="lazy"
              className="h-7 w-7 rounded-full object-cover ring-2 ring-white/30"
            />
            <span className="inline-flex items-center gap-2.5 font-inter text-xs font-semibold text-white sm:text-sm">
              View Project
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#092F58]"
              >
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SideProjectLink({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      to={project.href}
      aria-label={`View ${project.title} project`}
      className="
        group grid h-full grid-cols-1 overflow-hidden rounded-[1.5rem]
        border border-[#E4EEFA] bg-white
        shadow-[0_10px_30px_rgba(15,48,91,0.06)]
        transition-[transform,box-shadow,border-color] duration-300
        hover:-translate-y-1 hover:border-[#C3DAF8]
        hover:shadow-[0_22px_48px_rgba(15,48,91,0.14)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#5882E8] focus-visible:ring-offset-4
        xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
      "
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 xl:aspect-auto xl:h-full xl:min-h-[200px]">
        <img
          src={project.image}
          alt={project.imageAlt}
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,21,43,0.18)_0%,rgba(4,21,43,0)_35%)]"
        />
      </div>

      <div className="flex flex-col justify-center p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <ProjectTags tags={project.tags} />
          <span className="shrink-0 pt-0.5 font-playfair text-sm font-bold text-[#C6D6EA] transition-colors duration-300 group-hover:text-[#9FBEE0]">
            {padIndex(index + 1)}
          </span>
        </div>

        <h3 className="mt-2 font-montserrat text-base font-bold leading-snug text-[#10234B] transition-colors duration-300 group-hover:text-[#174A91] sm:text-lg">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 font-inter text-xs leading-relaxed text-[#526580] sm:text-[13px]">
          {project.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <img
            src={project.flag}
            alt="Country flag"
            loading="lazy"
            className="h-5 w-5 rounded-full object-cover ring-1 ring-slate-200"
          />
          <span className="inline-flex items-center gap-2 font-inter text-xs font-semibold text-[#0F5FD4]">
            View Project
            <span
              aria-hidden="true"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1670F5] transition-colors duration-300 group-hover:bg-[#1670F5] group-hover:text-white"
            >
              <ArrowRight size={12} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedWork({
  showAllProjectsLink = true,
}: FeaturedWorkProps) {
  const [featured, ...rest] = projects;

  return (
    <section
      id="featured-work"
      aria-labelledby="featured-work-heading"
      className={`
        ${innerSectionClass}
        scroll-mt-20 sm:scroll-mt-24
        bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F9FF_36%,#F4F9FF_70%,#FFFFFF_100%)]
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      `}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(9,47,88,0.07) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#E2EEFF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#E8F1FF] blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
        <header className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-[#092F58] sm:w-10"
              />
              <p className="font-playfair text-[11px] font-bold uppercase tracking-[0.14em] text-[#092F58] sm:text-xs sm:tracking-[0.16em]">
                {featuredWorkCopy.eyebrow}
              </p>
            </div>

            <h2
              id="featured-work-heading"
              className="mt-3 font-montserrat text-2xl font-bold leading-tight tracking-tight text-[#10234b] min-[480px]:text-3xl sm:text-[34px] lg:text-[40px]"
            >
              {featuredWorkCopy.title}
            </h2>

            <p className="mt-3 max-w-2xl font-inter text-sm leading-relaxed text-[#526987] sm:text-base">
              {featuredWorkCopy.description}
            </p>
          </div>

          {showAllProjectsLink && (
            <Link
              to="/portfolio"
              className="
                group inline-flex min-h-11 w-fit items-center gap-2.5 rounded-full
                border border-[#D6E4F7] bg-white px-5
                font-inter text-xs font-semibold text-[#092F58]
                shadow-[0_6px_20px_rgba(15,48,91,0.06)]
                transition-[background-color,border-color,color,box-shadow] duration-300
                hover:border-[#092F58] hover:bg-[#092F58] hover:text-white
                hover:shadow-[0_12px_28px_rgba(9,47,88,0.2)]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#5882E8] focus-visible:ring-offset-4
                sm:text-sm
              "
            >
              View All Projects
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}
        </header>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-12">
            {featured && <FeaturedProjectLink project={featured} index={0} />}

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:col-span-5 xl:grid-cols-1 xl:grid-rows-2">
              {rest.map((project, index) => (
                <SideProjectLink
                  key={project.id}
                  project={project}
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
