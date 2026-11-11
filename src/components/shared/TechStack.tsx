import { techStack } from "../../data/site.data";
import SectionHeading from "./SectionHeading";
import { innerContainerClass, innerSectionClass } from "./section.styles";

type TechStackProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function TechStack({
  eyebrow = "Technologies We Work With",
  title = "Modern Technologies for Better Solutions",
  description = "We use industry-leading technologies to deliver high-performance, scalable, and secure solutions.",
}: TechStackProps) {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={innerContainerClass}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <ul className="grid grid-cols-3 gap-3 min-[480px]:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-12 xl:gap-3">
          {techStack.map((tech, index) => (
            <li
              key={tech.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="flex flex-col items-center gap-2 rounded-2xl border border-[#D6E4F7] bg-[#F7FAFF] px-2 py-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#BCE0F5] hover:bg-white hover:shadow-md motion-safe:animate-page-reveal"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold text-white ring-4 ring-white"
                style={{ backgroundColor: tech.color }}
                aria-hidden="true"
              >
                {tech.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="font-inter text-[11px] font-semibold leading-tight text-slate-700 sm:text-xs">
                {tech.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
