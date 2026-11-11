import { sharedProjects } from "../../data/site.data";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import { innerContainerClass } from "./section.styles";

type FeaturedProjectsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  limit?: number;
  showCaseStudyLink?: boolean;
  actionLabel?: string;
  actionHref?: string;
};

export default function FeaturedProjects({
  eyebrow = "Featured Service Projects",
  title = "Real Projects. Real Results.",
  description = "Selected work delivered for clients across web, mobile, AI and SaaS.",
  limit = 3,
  showCaseStudyLink = false,
  actionLabel = "View All Projects",
  actionHref = "/portfolio",
}: FeaturedProjectsProps) {
  const items = sharedProjects.slice(0, limit);

  return (
    <section className="relative isolate w-full overflow-hidden bg-white px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
      <div className={innerContainerClass}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          actionLabel={actionLabel}
          actionHref={actionHref}
          align="left"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {items.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showCaseStudyLink={showCaseStudyLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
