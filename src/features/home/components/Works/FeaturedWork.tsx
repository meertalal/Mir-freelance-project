import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import { projects } from "../../data/works.data";

interface FeaturedWorkProps {
  showAllProjectsLink?: boolean;
}

export default function FeaturedWork({
  showAllProjectsLink = true,
}: FeaturedWorkProps) {
  return (
    <section
      id="featured-work"
      aria-labelledby="featured-work-heading"
      className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Featured Work"
          title="Selected Projects"
          description="A selection of projects delivered for clients around the world."
          actionLabel={
            showAllProjectsLink ? "View All Projects" : undefined
          }
          actionHref="/projects"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}