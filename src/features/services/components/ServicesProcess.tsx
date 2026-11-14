import { ArrowRight } from "lucide-react";
import { processSteps } from "../../../data/site.data";
import { servicesProcessCopy } from "../data/services-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function ServicesProcess() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl motion-safe:animate-float-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
          <SectionHeading
            eyebrow={servicesProcessCopy.eyebrow}
            title={servicesProcessCopy.title}
            description={servicesProcessCopy.description}
          />
        </Reveal>

        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.id} className="relative flex h-full min-w-0">
                <Reveal delay={index * 80} className="flex h-full w-full">
                  <article className="group relative flex h-full w-full flex-col rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:bg-white hover:shadow-[0_16px_36px_rgba(15,48,91,0.10)]">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7] transition duration-300 group-hover:from-[#092f58] group-hover:to-[#0f3d6e] group-hover:text-white">
                        <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-montserrat text-[10px] font-bold uppercase tracking-[0.14em] text-[#A9C6EC]"
                      >
                        Step {String(step.step).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 font-inter text-xs leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </article>
                </Reveal>

                {index < processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[18px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-[#1670F5] shadow-sm lg:flex"
                  >
                    <ArrowRight size={13} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
