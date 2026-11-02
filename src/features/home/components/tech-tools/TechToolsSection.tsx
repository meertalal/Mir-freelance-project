import SectionHeader from "../Works/SectionHeader";
import { innerContainerClass, innerSectionClass } from "../../../../components/shared/section.styles";
import {
  techToolCategories,
  techToolsCopy,
} from "../../data/tech-tools.data";
import TechCategoryCard from "./TechCategoryCard";

export default function TechToolsSection() {
  return (
    <section
      id="tech-tools"
      aria-labelledby="tech-tools-title"
      className={`
        ${innerSectionClass}
        bg-[#F7FAFF]
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      `}
    >
      <div className={`relative z-10 ${innerContainerClass}`}>
        <SectionHeader
          titleId="tech-tools-title"
          eyebrow={techToolsCopy.eyebrow}
          title={techToolsCopy.title}
          description={techToolsCopy.description}
        />

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-7">
          {techToolCategories.map((category) => (
            <li key={category.id} className="min-w-0">
              <TechCategoryCard category={category} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
