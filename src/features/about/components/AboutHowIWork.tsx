import LinkButton from "../../../components/ui/LinkButton";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import {
  aboutHowIWorkCopy,
  aboutHowIWorkPoints,
} from "../data/about-page.data";

export default function AboutHowIWork() {
  return (
    <section
      aria-labelledby="about-how-i-work-title"
      className={`${innerSectionClass} bg-white`}
    >
      <div className={`${innerContainerClass} relative`}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="[&>header]:mb-0">
              <SectionHeading
                titleId="about-how-i-work-title"
                align="left"
                eyebrow={aboutHowIWorkCopy.eyebrow}
                title={aboutHowIWorkCopy.title}
                description={aboutHowIWorkCopy.description}
              />
            </div>
            <LinkButton
              to={aboutHowIWorkCopy.cta.href}
              variant="secondary"
              showArrow
              className="mt-6 w-full sm:w-auto"
            >
              {aboutHowIWorkCopy.cta.label}
            </LinkButton>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#092F58] p-6 shadow-[0_24px_60px_-30px_rgba(9,47,88,0.6)] sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1670F5]/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#5882E8]/20 blur-3xl"
              />

              <p className="relative font-playfair text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8FB8FF]">
                The working rhythm
              </p>

              <ol className="relative mt-4 divide-y divide-white/10">
                {aboutHowIWorkPoints.map((point, index) => {
                  const Icon = point.Icon;

                  return (
                    <li
                      key={point.id}
                      className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#8FB8FF] ring-1 ring-white/15">
                        <Icon
                          size={18}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                          <span className="font-montserrat text-[10px] font-bold tracking-[0.18em] text-[#8FB8FF]">
                            0{index + 1}
                          </span>
                          <h3 className="font-montserrat text-sm font-bold text-white sm:text-base">
                            {point.title}
                          </h3>
                        </div>
                        <p className="mt-1.5 font-inter text-xs leading-relaxed text-white/70 sm:text-sm">
                          {point.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
