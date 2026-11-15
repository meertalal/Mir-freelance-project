import { CheckCircle2, ClipboardList } from "lucide-react";
import { processClientNeeds } from "../data/process-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function WhatINeed() {
  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
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
            align="left"
            eyebrow="Before We Start"
            title="What I Need From You"
            description="You do not need a full spec or final copy to begin. These four things keep the project moving smoothly from day one."
          />

          <div className="mt-7 flex items-start gap-3.5 rounded-2xl border border-[#D6E4F7] bg-white/80 p-4 shadow-[0_10px_24px_rgba(15,48,91,0.05)]">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7]">
              <CheckCircle2 size={17} aria-hidden="true" />
            </span>
            <p className="font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">
              <span className="font-semibold text-[#10234B]">
                Have all four ready?
              </span>{" "}
              Most projects can begin within a few days of our first call.
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
                    Project Kickoff Checklist
                  </p>
                  <p className="font-inter text-[11px] text-[#8298B5]">
                    Everything I need to start strong
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-white px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-wide text-[#3B6EA8] ring-1 ring-[#D6E4F7]">
                4 items
              </span>
            </div>

            <ul className="divide-y divide-[#EDF3FB]">
              {processClientNeeds.map(({ id, title, description }) => (
                <li
                  key={id}
                  className="flex items-start gap-4 px-5 py-4 transition-colors duration-200 hover:bg-[#F9FBFF] sm:px-7 sm:py-5"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1670F5] ring-1 ring-[#D6E4F7]">
                    <CheckCircle2 size={16} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                      {title}
                    </h3>
                    <p className="mt-1 font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5 border-t border-[#EDF3FB] bg-[#F7FAFF] px-5 py-3.5 sm:px-7">
              <CheckCircle2
                size={14}
                className="shrink-0 text-[#1670F5]"
                aria-hidden="true"
              />
              <p className="font-inter text-[11px] leading-relaxed text-[#526987] sm:text-xs">
                Missing something? We can sort out the details together during
                discovery.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
