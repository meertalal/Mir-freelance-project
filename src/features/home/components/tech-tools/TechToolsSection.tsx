import { innerContainerClass, innerSectionClass } from "../../../../components/shared/section.styles";
import Reveal from "../../../../components/shared/Reveal";
import { techToolCategories, techToolsCopy } from "../../data/tech-tools.data";
import TechCategoryCard from "./TechCategoryCard";

export default function TechToolsSection() {
  const toolCount = techToolCategories.reduce(
    (total, category) => total + category.tools.length,
    0,
  );

  return (
    <section
      id="tech-tools"
      aria-labelledby="tech-tools-title"
      className={`
        ${innerSectionClass}
        scroll-mt-20 sm:scroll-mt-24
        bg-[#F7FAFF]
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      `}
    >
      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
        <div
          className="relative isolate overflow-hidden rounded-[1.5rem] bg-[#08294D] px-5 py-8 shadow-[0_30px_80px_-30px_rgba(8,41,77,0.55)] ring-1 ring-inset ring-white/10 sm:rounded-[2rem] sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-14"
          style={{
            backgroundImage:
              "radial-gradient(1000px 460px at 88% -12%, rgba(22,112,245,0.42), transparent 62%), radial-gradient(760px 420px at -6% 112%, rgba(125,211,252,0.16), transparent 58%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 0)",
              backgroundSize: "24px 24px",
              maskImage:
                "linear-gradient(180deg, black 0%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(180deg, black 0%, transparent 85%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#1670F5]/30 blur-3xl"
          />

          <header className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 shrink-0 bg-[#7DD3FC] sm:w-10"
                />
                <p className="font-playfair text-[11px] font-bold uppercase tracking-[0.14em] text-[#93C5FD] sm:text-xs sm:tracking-[0.16em]">
                  {techToolsCopy.eyebrow}
                </p>
              </div>

              <h2
                id="tech-tools-title"
                className="mt-3 font-montserrat text-2xl font-bold leading-tight tracking-tight text-white min-[480px]:text-3xl sm:text-[34px] lg:text-[40px]"
              >
                {techToolsCopy.title}
              </h2>

              <p className="mt-3 max-w-2xl font-inter text-sm leading-relaxed text-[#A9C4E4] sm:text-base">
                {techToolsCopy.description}
              </p>
            </div>

            <p className="inline-flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-inter text-xs font-medium text-[#C9DCF2] backdrop-blur-sm sm:text-[13px]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#7DD3FC]"
              />
              {toolCount} tools across {techToolCategories.length} categories
            </p>
          </header>

          <ul className="relative z-10 mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {techToolCategories.map((category, index) => (
              <li key={category.id} className="min-w-0">
                <Reveal delay={index * 70} className="h-full">
                  <TechCategoryCard category={category} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
