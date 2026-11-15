import { ArrowRight } from "lucide-react";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import {
  contactNextSteps,
  contactNextStepsCopy,
} from "../data/contact-page.data";

export default function ContactNextSteps() {
  return (
    <section
      aria-labelledby="contact-next-steps-title"
      className={`${innerSectionClass} bg-white`}
    >
      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <SectionHeading
            titleId="contact-next-steps-title"
            eyebrow={contactNextStepsCopy.eyebrow}
            title={contactNextStepsCopy.title}
            description={contactNextStepsCopy.description}
          />
        </Reveal>

        <div className="mx-auto max-w-5xl">
          <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
            {contactNextSteps.map((step, index) => (
              <li key={step.id} className="h-full">
                <Reveal delay={index * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-5 sm:p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#092F58] font-montserrat text-sm font-bold text-white">
                      0{index + 1}
                    </span>
                    <h3 className="mt-4 font-montserrat text-base font-bold text-[#10234B]">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-inter text-sm leading-relaxed text-[#526987]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={240}>
            <div className="mt-6 flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-2">
              <p className="font-inter text-sm text-[#8298B5]">
                {contactNextStepsCopy.footnote}
              </p>
              <a
                href={contactNextStepsCopy.link.href}
                className="group inline-flex min-h-11 items-center gap-1.5 font-inter text-sm font-semibold text-[#1670F5] transition-colors hover:text-[#0F3D6E]"
              >
                {contactNextStepsCopy.link.label}
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
