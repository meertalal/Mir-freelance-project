import { ShieldCheck } from "lucide-react";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import {
  processQualityCopy,
  processQualityGates,
} from "../data/process-page.data";

export default function ProcessQualityGates() {
  return (
    <section
      aria-labelledby="process-quality-title"
      className={`${innerSectionClass} bg-[#F7FAFF]`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal className="[&>header]:mb-0">
          <SectionHeading
            titleId="process-quality-title"
            eyebrow={processQualityCopy.eyebrow}
            title={processQualityCopy.title}
            description={processQualityCopy.description}
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mb-7 mt-4 flex justify-center sm:mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#DCE9FF] bg-white px-3.5 py-1.5 font-inter text-[11px] font-semibold text-[#0F3D6E] shadow-sm sm:text-xs">
              <ShieldCheck
                size={14}
                aria-hidden="true"
                className="text-[#1670F5]"
              />
              {processQualityCopy.badge}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {processQualityGates.map((gate, index) => {
            const Icon = gate.Icon;

            return (
              <Reveal key={gate.id} delay={index * 80} className="h-full">
                <article className="flex h-full items-start gap-4 rounded-2xl border border-[#E6EEF9] bg-white p-5 shadow-[0_10px_28px_rgba(15,48,91,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#C9DEFF] hover:shadow-[0_16px_36px_rgba(15,48,91,0.1)] sm:p-6">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5] ring-1 ring-[#D6E4F7]">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-montserrat text-base font-bold text-[#10234B]">
                      {gate.title}
                    </h3>
                    <p className="mt-1.5 font-inter text-sm leading-relaxed text-[#526987]">
                      {gate.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
