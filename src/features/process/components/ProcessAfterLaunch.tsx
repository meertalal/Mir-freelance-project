import LinkButton from "../../../components/ui/LinkButton";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import {
  processAfterLaunchCopy,
  processAfterLaunchPhases,
} from "../data/process-page.data";

export default function ProcessAfterLaunch() {
  return (
    <section
      aria-labelledby="process-after-launch-title"
      className={`${innerSectionClass} bg-white`}
    >
      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <SectionHeading
            titleId="process-after-launch-title"
            eyebrow={processAfterLaunchCopy.eyebrow}
            title={processAfterLaunchCopy.title}
            description={processAfterLaunchCopy.description}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {processAfterLaunchPhases.map((phase, index) => {
            const Icon = phase.Icon;

            return (
              <Reveal key={phase.id} delay={index * 70} className="h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-5 pt-6">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,#1670F5,#8FB8FF)]"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1670F5] ring-1 ring-[#DCE9FF]">
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.1em] text-[#3B6EA8] ring-1 ring-[#E6EEF9]">
                      {phase.label}
                    </span>
                  </div>
                  <h3 className="mt-4 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                    {phase.title}
                  </h3>
                  <p className="mt-2 font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">
                    {phase.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={280}>
          <div className="mt-7 flex justify-center">
            <LinkButton
              to={processAfterLaunchCopy.cta.href}
              variant="secondary"
              showArrow
              className="w-full sm:w-auto"
            >
              {processAfterLaunchCopy.cta.label}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
