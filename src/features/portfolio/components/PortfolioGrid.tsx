import { useMemo, useState } from "react";
import { sharedProjects } from "../../../data/site.data";
import { useCaseStudies } from "../../content/useEditorialContent";
import { portfolioFilters } from "../data/portfolio-page.data";
import PortfolioProjectCard from "./PortfolioProjectCard";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import { innerContainerClass } from "../../../components/shared/section.styles";

type FilterId = (typeof portfolioFilters)[number]["id"];
type ProjectCardData = {
  id: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  tags: readonly string[];
  category?: string;
  country?: string;
  flag: string;
  href: string;
};

function filterProjects(id: FilterId, projects: ProjectCardData[]) {
  if (id === "all") return projects;
  if (id === "ai") {
    return projects.filter((project) =>
      project.tags.some((tag) => /ai|automation/i.test(tag)),
    );
  }
  return projects.filter((project) => project.category === id);
}

export default function PortfolioGrid() {
  const [active, setActive] = useState<FilterId>("all");
  const { data: caseStudies, remote } = useCaseStudies();
  const projects: ProjectCardData[] = useMemo(() => remote
    ? (() => {
      const cmsStudies = caseStudies.filter((study) => study.managedByCms);
      const cmsSlugs = new Set(cmsStudies.map((study) => study.slug));
      const cmsProjects = cmsStudies.map((study) => {
        const staticProject = sharedProjects.find((project) => project.id === study.slug);
        const type = study.projectType.toLowerCase();
        const category = /mobile|app/.test(type) ? "mobile" : /saas|platform/.test(type) ? "saas" : staticProject?.category ?? "web";
        return {
          id: study.slug,
          title: study.title,
          description: study.excerpt,
          image: study.coverImage || staticProject?.image || "/image/projects/voice-agent.webp",
          imageAlt: study.coverImageAlt || staticProject?.imageAlt || study.title,
          tags: study.services.length ? study.services : staticProject?.tags ?? [],
          category,
          flag: "",
          href: `/portfolio/${study.slug}`,
        };
      });
      const remainingStatic = sharedProjects.filter((project) => !cmsSlugs.has(project.id));
      return [...cmsProjects, ...remainingStatic];
    })()
    : [...sharedProjects], [caseStudies, remote]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        portfolioFilters.map((filter) => [
          filter.id,
          filterProjects(filter.id, projects).length,
        ]),
      ) as Record<FilterId, number>,
    [projects],
  );

  const filtered = useMemo(() => filterProjects(active, projects), [active, projects]);

  return (
    <section
      aria-labelledby="featured-projects-title"
      className="relative isolate w-full overflow-hidden bg-[#F7FAFF] px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#DCE9FF]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-10 h-80 w-80 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D6E4F7_1px,transparent_1px)] bg-[size:28px_28px] opacity-30"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal className="[&>header]:mb-0">
          <SectionHeading
            titleId="featured-projects-title"
            eyebrow="Selected Work"
            title="Featured Projects"
            description="A closer look at the platforms, products and apps delivered for clients worldwide."
            align="left"
          />
        </Reveal>

        <Reveal delay={80}>
        <div className="mt-7 flex flex-col gap-4 sm:mt-8 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-[#E1EAF6] bg-white p-1.5 shadow-[0_8px_24px_rgba(15,48,91,0.05)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2 lg:flex-wrap lg:overflow-visible"
          >
            {portfolioFilters.map((filter) => {
              const isActive = active === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActive(filter.id)}
                  aria-pressed={isActive}
                  className={[
                    "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8] sm:px-4 sm:text-[13px]",
                    isActive
                      ? "bg-[#092f58] text-white shadow-[0_8px_18px_-8px_rgba(9,47,88,0.75)]"
                      : "text-[#526987] hover:bg-[#F2F7FF] hover:text-[#092f58]",
                  ].join(" ")}
                >
                  {filter.label}
                  <span
                    className={[
                      "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold tabular-nums",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#EAF2FF] text-[#1670F5]",
                    ].join(" ")}
                  >
                    {counts[filter.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className="font-inter text-xs font-medium text-[#526987] sm:text-sm"
          >
            Showing{" "}
            <span className="font-bold text-[#10234B]">{filtered.length}</span> of{" "}
            {projects.length} projects
          </p>
        </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 70} className="h-full">
              <PortfolioProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
