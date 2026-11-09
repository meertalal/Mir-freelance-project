import { useMemo, useState } from "react";
import { sharedProjects } from "../../../data/site.data";
import { portfolioFilters } from "../data/portfolio-page.data";
import ProjectCard from "../../../components/shared/ProjectCard";
import SectionHeading from "../../../components/shared/SectionHeading";
import { innerContainerClass } from "../../../components/shared/section.styles";

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof portfolioFilters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (active === "all") return sharedProjects;
    if (active === "ai") {
      return sharedProjects.filter((project) =>
        project.tags.some((tag) => /ai|automation/i.test(tag)),
      );
    }
    return sharedProjects.filter((project) => project.category === active);
  }, [active]);

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F7FAFF] px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
      <div className={innerContainerClass}>
        <SectionHeading
          title="Featured Projects"
          description="Filter by category to explore selected case studies."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {portfolioFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              aria-pressed={active === filter.id}
              className={[
                "inline-flex min-h-11 items-center rounded-full px-4 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8] sm:px-5 sm:text-sm",
                active === filter.id
                  ? "bg-[#092f58] text-white shadow-md"
                  : "border border-slate-200 bg-white font-inter text-slate-600 hover:border-[#5882E8] hover:text-[#092f58]",
              ].join(" ")}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} showCaseStudyLink />
          ))}
        </div>
      </div>
    </section>
  );
}
