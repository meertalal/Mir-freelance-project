import SectionHeader from "../Works/SectionHeader";
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
      className="
        relative isolate w-full overflow-hidden bg-[#F7FAFF]
        px-4 py-10
        min-[480px]:px-5
        sm:px-6 sm:py-14
        lg:px-8 lg:py-16
        xl:px-12 xl:py-20
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      "
    >
      <div
        className="
          mx-auto w-full
          max-w-[1280px]
          min-[1440px]:max-w-[1360px]
          min-[1600px]:max-w-[1480px]
          min-[1920px]:max-w-[1640px]
          min-[2560px]:max-w-[1800px]
        "
      >
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
