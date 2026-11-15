import LinkButton from "../../../components/ui/LinkButton";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import {
  processPaymentMilestones,
  processPaymentsCopy,
} from "../data/process-page.data";

export default function ProcessPaymentMilestones() {
  return (
    <section
      aria-labelledby="process-payments-title"
      className={`${innerSectionClass} bg-[#F7FAFF]`}
    >
      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <SectionHeading
            titleId="process-payments-title"
            eyebrow={processPaymentsCopy.eyebrow}
            title={processPaymentsCopy.title}
            description={processPaymentsCopy.description}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {processPaymentMilestones.map((milestone, index) => (
            <Reveal
              key={milestone.id}
              delay={index * 80}
              className="h-full"
            >
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCE9FF] bg-white p-6 shadow-[0_10px_28px_rgba(15,48,91,0.05)]">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,#1670F5,#8FB8FF)]"
                />
                <p className="font-playfair text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3B6EA8]">
                  {milestone.step}
                </p>
                <h3 className="mt-2 font-montserrat text-lg font-bold text-[#10234B]">
                  {milestone.title}
                </h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-[#526987]">
                  {milestone.description}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-auto pt-5 font-montserrat text-3xl font-black leading-none text-[#EAF2FF]"
                >
                  0{index + 1}
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mx-auto mt-7 flex max-w-3xl flex-col items-start justify-between gap-3 rounded-2xl border border-[#DCE9FF] bg-white px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <p className="font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">
              {processPaymentsCopy.note}
            </p>
            <LinkButton
              to={processPaymentsCopy.cta.href}
              variant="secondary"
              showArrow
              className="w-full shrink-0 sm:w-auto"
            >
              {processPaymentsCopy.cta.label}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
