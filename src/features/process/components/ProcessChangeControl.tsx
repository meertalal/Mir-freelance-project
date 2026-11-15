import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import {
  processChangeCopy,
  processChangePoints,
} from "../data/process-page.data";

export default function ProcessChangeControl() {
  return (
    <section
      aria-labelledby="process-change-title"
      className={`${innerSectionClass} bg-white`}
    >
      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <SectionHeading
            titleId="process-change-title"
            eyebrow={processChangeCopy.eyebrow}
            title={processChangeCopy.title}
            description={processChangeCopy.description}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {processChangePoints.map((point, index) => {
            const Icon = point.Icon;

            return (
              <Reveal key={point.id} delay={index * 80} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-6 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[#C9DEFF] hover:bg-white hover:shadow-[0_16px_36px_rgba(15,48,91,0.09)]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1670F5] ring-1 ring-[#DCE9FF]">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-montserrat text-base font-bold text-[#10234B]">
                    {point.title}
                  </h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-[#526987]">
                    {point.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
