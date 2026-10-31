import { ArrowRight } from "lucide-react";
import { processSteps } from "../../data/site.data";
import SectionHeading from "./SectionHeading";
import { innerContainerClass, innerSectionClass } from "./section.styles";

type ProcessStripProps = {
  title?: string;
  description?: string;
  showHeading?: boolean;
};

export default function ProcessStrip({
  title = "How We Deliver Your Project",
  description = "A clear, transparent process from idea to launch and beyond.",
  showHeading = true,
}: ProcessStripProps) {
  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div className={innerContainerClass}>
        {showHeading && (
          <SectionHeading title={title} description={description} />
        )}

        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                style={{ animationDelay: `${index * 90}ms` }}
                className="relative flex min-w-0 flex-col motion-safe:animate-page-reveal"
              >
                <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_28px_rgba(15,48,91,0.05)]">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className="font-montserrat text-sm font-bold text-slate-300">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-inter text-xs leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </article>
                {index < processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-[#1670F5] shadow-sm lg:flex"
                  >
                    <ArrowRight size={14} />
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
