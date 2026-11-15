import { CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";
import {
  servicesIncludedCopy,
  servicesIncludedItems,
} from "../data/services-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function ServicesIncluded() {
  return (
    <section
      id="included"
      aria-labelledby="included-title"
      className={`${innerSectionClass} scroll-mt-20 bg-[#F7FAFF] sm:scroll-mt-24`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div
        className={`relative z-10 ${innerContainerClass} grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 xl:gap-16`}
      >
        <Reveal className="lg:sticky lg:top-28">
          <SectionHeading
            titleId="included-title"
            align="left"
            eyebrow={servicesIncludedCopy.eyebrow}
            title={servicesIncludedCopy.title}
            description={servicesIncludedCopy.description}
          />

          <div className="mt-7 flex items-start gap-3.5 rounded-2xl border border-[#D6E4F7] bg-white/80 p-4 shadow-[0_10px_24px_rgba(15,48,91,0.05)]">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7]">
              <ShieldCheck size={17} aria-hidden="true" />
            </span>
            <p className="font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">
              <span className="font-semibold text-[#10234B]">
                {servicesIncludedCopy.noteTitle}
              </span>{" "}
              {servicesIncludedCopy.note}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[1.75rem] border border-[#D6E4F7] bg-white shadow-[0_20px_50px_rgba(15,48,91,0.10)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDF3FB] bg-[#F7FAFF] px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#092f58] to-[#0f3d6e] text-white shadow-[0_8px_18px_rgba(9,47,88,0.22)]">
                  <ClipboardList size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-montserrat text-sm font-bold text-[#10234B]">
                    The project baseline
                  </p>
                  <p className="font-inter text-[11px] text-[#8298B5]">
                    Included in every engagement
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-white px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-wide text-[#3B6EA8] ring-1 ring-[#D6E4F7]">
                {servicesIncludedItems.length} items
              </span>
            </div>

            <ul className="grid gap-x-6 gap-y-5 px-5 py-6 sm:grid-cols-2 sm:px-7 sm:py-7">
              {servicesIncludedItems.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1670F5] ring-1 ring-[#D6E4F7]">
                    <CheckCircle2 size={15} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-montserrat text-sm font-bold text-[#10234B]">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-inter text-xs leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
