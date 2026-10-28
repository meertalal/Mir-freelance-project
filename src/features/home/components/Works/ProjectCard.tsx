import SectionHeader from "./SectionHeader";
import { projects } from "../../data/works.data";

interface ProjectCardItemProps {
  project: any;
}

function ProjectCard({ project }: ProjectCardItemProps) {
  return <div key={project?.id}>{project?.id}</div>;
}

interface FeaturedWorkProps {
  showAllProjectsLink?: boolean;
}

export default function FeaturedWork({
  showAllProjectsLink = true,
}: FeaturedWorkProps) {
  return (
    <section
      id="featured-work"
      aria-label="Featured projects"
      className="
        w-full overflow-hidden bg-white
        px-1.5 py-4
        sm:px-6 sm:py-14
        md:px-8 md:py-16
        lg:px-10 lg:py-20
        xl:px-12
        2xl:px-16
      "
    >
      <div className="mx-auto w-full max-w-screen-2xl">
        <SectionHeader
          eyebrow="Our Selected Creations"
          title="Where Ideas Take Shape"
          description="Bringing bold ideas to life through thoughtful design and innovative digital solutions."
          actionLabel={showAllProjectsLink ? "View All Projects" : undefined}
          actionHref="/projects"
        />

        {/* Three cards in a row on mobile, tablet, and desktop */}
        <div
          className="
            grid w-full grid-cols-3 items-stretch
            gap-1
            sm:gap-5
            lg:gap-6
            xl:gap-7
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
