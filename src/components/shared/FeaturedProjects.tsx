import { sharedProjects } from "../../data/site.data";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

type FeaturedProjectsProps = {
  title?: string;
  description?: string;
  limit?: number;
  showCaseStudyLink?: boolean;
  actionLabel?: string;
  actionHref?: string;
};

export default function FeaturedProjects({
  title = "Real Projects. Real Results.",
  description = "Selected work delivered for clients across web, mobile, AI and SaaS.",
  limit = 3,
  showCaseStudyLink = false,
  actionLabel = "View All Projects",
  actionHref = "/portfolio",
}: FeaturedProjectsProps) {
  const items = sharedProjects.slice(0, limit);

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <SectionHeading
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
