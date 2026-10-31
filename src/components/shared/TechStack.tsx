import { techStack } from "../../data/site.data";
import SectionHeading from "./SectionHeading";
import { innerContainerClass, innerSectionClass } from "./section.styles";

type TechStackProps = {
  title?: string;
  description?: string;
};

export default function TechStack({
  title = "Technologies We Work With",
  description = "Modern tools and platforms for scalable, reliable digital products.",
}: TechStackProps) {
  const loop = [...techStack, ...techStack];

  return (
    <section className={`${innerSectionClass} overflow-hidden bg-[#F7FAFF]`}>
      <div className={innerContainerClass}>
        <SectionHeading title={title} description={description} />

        <div className="relative overflow-hidden">
          <div className="flex w-max gap-4 motion-safe:animate-marquee sm:gap-6">
            {loop.map((tech, index) => (
              <div
                key={`${tech.id}-${index}`}
                className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-2 rounded-full border border-[#D6E4F7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:h-28 sm:w-28"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white sm:h-11 sm:w-11 sm:text-sm"
                  style={{ backgroundColor: tech.color }}
                  aria-hidden="true"
                >
                  {tech.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="font-inter text-[10px] font-semibold text-slate-700 sm:text-xs">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
