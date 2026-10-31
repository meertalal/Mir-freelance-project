import { useMemo, useState } from "react";
import { sharedProjects } from "../../../data/site.data";
import { portfolioFilters } from "../data/portfolio-page.data";
import ProjectCard from "../../../components/shared/ProjectCard";
import SectionHeading from "../../../components/shared/SectionHeading";

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
      <div className="mx-auto w-full max-w-[1280px] min-[1440px]:max-w-[1360px]">
        <SectionHeading
          title="Featured Projects"
          description="Filter by category to explore selected case studies."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {portfolioFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              className={[
                "rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm",
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
