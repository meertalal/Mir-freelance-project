import { ArrowRight } from "lucide-react";
import { processSteps } from "../../data/site.data";
import SectionHeading from "./SectionHeading";
import { innerContainerClass, innerSectionClass } from "./section.styles";

type ProcessStripProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  showHeading?: boolean;
};

export default function ProcessStrip({
  eyebrow = "Our Process",
  title = "How We Deliver Your Project",
  description = "A clear, transparent process from idea to launch and beyond.",
  showHeading = true,
}: ProcessStripProps) {
  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div className={innerContainerClass}>
        {showHeading && (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        )}

        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                style={{ animationDelay: `${index * 90}ms` }}
                className="relative flex min-w-0 motion-safe:animate-page-reveal"
              >
                <article className="flex h-full w-full flex-col items-center rounded-2xl border border-slate-100 bg-white px-4 py-6 text-center shadow-[0_8px_28px_rgba(15,48,91,0.05)] transition hover:-translate-y-1 hover:border-[#D6E4F7] hover:shadow-[0_16px_36px_rgba(37,99,235,0.1)]">
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1670F5] ring-4 ring-white">
                    <Icon size={24} aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#092F58] font-montserrat text-[10px] font-bold text-white">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="mt-4 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 font-inter text-xs leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </article>
                {index < processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[22px] top-[26px] z-10 hidden h-7 w-7 items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-[#1670F5] shadow-sm lg:flex"
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
