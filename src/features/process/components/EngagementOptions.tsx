import { Check, Clock3 } from "lucide-react";
import { processEngagementOptions } from "../data/process-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import LinkButton from "../../../components/ui/LinkButton";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function EngagementOptions() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <SectionHeading
          eyebrow="Engagement Options"
          title="Choose How We Work Together"
          description="Every project starts with a short discovery call. From there, pick the model that matches your goals and budget."
          className="mx-auto max-w-3xl"
        />

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2 lg:gap-6">
          {processEngagementOptions.map((option, index) => {
            const Icon = option.Icon;

            return (
              <Reveal key={option.id} delay={index * 90} className="h-full">
                <article
                  className={
                    "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7 " +
                    (option.featured
                      ? "bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] shadow-[0_24px_60px_rgba(9,47,88,0.3)]"
                      : "border border-[#D6E4F7] bg-white shadow-[0_16px_44px_rgba(15,48,91,0.08)]")
                  }
                >
                  {option.featured && (
                    <>
                      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/10" />
                      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-[#1670F5]/20 blur-2xl" />
                    </>
                  )}

                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={
                          "inline-flex h-12 w-12 items-center justify-center rounded-2xl " +
                          (option.featured
                            ? "bg-white/10 text-[#93C5FD] ring-1 ring-white/15"
                            : "bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7]")
                        }
                      >
                        <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span
                        className={
                          "rounded-full px-3 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.1em] " +
                          (option.featured
                            ? "bg-white/10 text-[#A9C6EC] ring-1 ring-white/15"
                            : "bg-[#EAF2FF] text-[#1456C0]")
                        }
                      >
                        {option.timelineLabel}
                      </span>
                    </div>

                    <h3
                      className={
                        "mt-5 font-montserrat text-xl font-bold " +
                        (option.featured ? "text-white" : "text-[#10234B]")
                      }
                    >
                      {option.title}
                    </h3>
                    <p
                      className={
                        "mt-2 font-inter text-sm leading-relaxed " +
                        (option.featured ? "text-white/80" : "text-[#526987]")
                      }
                    >
                      {option.tagline}
                    </p>

                    <p
                      className={
                        "mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-inter text-xs font-semibold " +
                        (option.featured
                          ? "bg-white/10 text-[#DCE9FF]"
                          : "bg-[#F7FAFF] text-[#3B6EA8] ring-1 ring-[#E6EEF9]")
                      }
                    >
                      <Clock3 size={13} aria-hidden="true" />
                      {option.timeline}
                    </p>

                    <ul
                      className={
                        "mt-5 space-y-2.5 border-t pt-5 " +
                        (option.featured ? "border-white/10" : "border-[#EDF3FB]")
                      }
                    >
                      {option.includes.map((item) => (
                        <li
                          key={item}
                          className={
                            "flex items-start gap-2.5 font-inter text-xs leading-relaxed sm:text-sm " +
                            (option.featured ? "text-white/85" : "text-slate-700")
                          }
                        >
                          <Check
                            size={15}
                            className={
                              "mt-0.5 shrink-0 " +
                              (option.featured ? "text-[#93C5FD]" : "text-[#1670F5]")
                            }
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative mt-auto pt-6">
                    <LinkButton
                      to="/contact"
                      variant={option.featured ? "secondary" : "primary"}
                      className="w-full"
                      showArrow
                    >
                      {option.ctaLabel}
                    </LinkButton>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">
          Not sure which model fits? Share your project and I will recommend the right one, with no obligation.
        </p>
      </div>
    </section>
  );
}
