import LinkButton from "../../../components/ui/LinkButton";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import { aboutBeyondCopy } from "../data/about-page.data";

export default function AboutBeyondCode() {
  return (
    <section
      aria-labelledby="about-beyond-title"
      className={`${innerSectionClass} bg-[#F7FAFF]`}
    >
      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#D6E4F7] bg-[linear-gradient(120deg,#FFFFFF_0%,#F4F8FF_52%,#EAF2FF_100%)] p-6 sm:p-8 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#DCE9FF]/80 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 right-10 hidden h-32 w-40 bg-[radial-gradient(#C7D9F4_1.5px,transparent_1.5px)] [background-size:14px_14px] lg:block"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
              <div>
                <p className="flex items-center gap-2.5 font-playfair text-[11px] font-bold uppercase tracking-[0.14em] text-[#092F58]">
                  <span
                    aria-hidden="true"
                    className="h-px w-6 shrink-0 bg-[#092F58]"
                  />
                  {aboutBeyondCopy.eyebrow}
                </p>
                <h2
                  id="about-beyond-title"
                  className="mt-3 font-montserrat text-2xl font-bold leading-tight tracking-tight text-[#10234B] sm:text-3xl lg:text-4xl"
                >
                  {aboutBeyondCopy.title}
                </h2>
                <p className="mt-3 max-w-xl font-inter text-sm leading-relaxed text-[#526987] sm:text-base">
                  {aboutBeyondCopy.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {aboutBeyondCopy.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-[#DCE9FF] bg-white/85 px-3 py-1.5 font-inter text-[11px] font-semibold text-[#0F3D6E] backdrop-blur-sm sm:text-xs"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <LinkButton
                    to={aboutBeyondCopy.cta.href}
                    variant="primary"
                    showArrow
                    className="w-full sm:w-auto"
                  >
                    {aboutBeyondCopy.cta.label}
                  </LinkButton>
                  <span className="inline-flex items-center gap-2 self-start rounded-full border border-[#BFE3CF] bg-[#F0FAF3] px-3 py-1.5 font-inter text-[11px] font-semibold text-[#15803D] sm:self-auto">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_0_3px_rgba(34,197,94,0.18)]"
                    />
                    {aboutBeyondCopy.availability}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_12px_36px_rgba(15,48,91,0.07)] backdrop-blur-sm sm:p-6">
                <p className="font-playfair text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8298B5]">
                  At a glance
                </p>
                <ul className="mt-4 divide-y divide-[#E6EEF9]">
                  {aboutBeyondCopy.details.map((detail) => {
                    const Icon = detail.Icon;

                    return (
                      <li
                        key={detail.id}
                        className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
                          <Icon
                            size={16}
                            strokeWidth={1.9}
                            aria-hidden="true"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8298B5]">
                            {detail.label}
                          </p>
                          <p className="mt-0.5 font-inter text-xs font-semibold text-[#10234B] sm:text-sm">
                            {detail.value}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
