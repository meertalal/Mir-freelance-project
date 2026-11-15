import { Clock3, MessagesSquare } from "lucide-react";
import { processCollabPoints } from "../data/process-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function HowWeWork() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#E3EDFB]/60 blur-3xl"
      />

      <div
        className={`relative z-10 ${innerContainerClass} grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-16`}
      >
        <Reveal className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="Collaboration"
            title="How We Work Together"
            description="No black boxes. You see progress as it happens, review working builds, and always know what happens next."
          />
          <p className="inline-flex items-center gap-2 rounded-full bg-[#F7FAFF] px-3.5 py-2 font-inter text-[11px] font-medium text-[#526987] ring-1 ring-[#E6EEF9] sm:text-xs">
            <Clock3 size={13} className="text-[#1670F5]" aria-hidden="true" />
            Replies within one business day
          </p>
        </Reveal>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {processCollabPoints.map(
              ({ id, title, description, Icon, tag }, index) => (
                <Reveal key={id} delay={index * 70} className="h-full">
                  <article className="group relative flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-white p-5 shadow-[0_10px_28px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:shadow-[0_18px_40px_rgba(15,48,91,0.10)]">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7] transition duration-300 group-hover:from-[#092f58] group-hover:to-[#0f3d6e] group-hover:text-white">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-[#F7FAFF] px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-wide text-[#3B6EA8] ring-1 ring-[#E6EEF9]">
                        {tag}
                      </span>
                    </div>
                    <h3 className="mt-4 font-montserrat text-base font-bold text-[#10234B]">
                      {title}
                    </h3>
                    <p className="mt-1.5 font-inter text-sm leading-relaxed text-slate-600">
                      {description}
                    </p>
                  </article>
                </Reveal>
              ),
            )}
          </div>

          <Reveal delay={280}>
            <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#092F58] px-5 py-4 shadow-[0_16px_36px_rgba(9,47,88,0.18)]">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#8FB8FF] ring-1 ring-white/15">
                <MessagesSquare size={18} aria-hidden="true" />
              </span>
              <p className="font-inter text-xs leading-relaxed text-[#DCE9FF] sm:text-sm">
                <span className="font-semibold text-white">
                  One direct line,
                </span>{" "}
                from the first call to launch and beyond.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
