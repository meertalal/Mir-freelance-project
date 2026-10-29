import { ArrowRight } from "lucide-react";
import { processSteps } from "../../data/site.data";
import SectionHeading from "./SectionHeading";

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
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        {showHeading && (
          <SectionHeading title={title} description={description} />
        )}

        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                style={{ animationDelay: `${index * 90}ms` }}
                className="relative flex flex-col items-center text-center motion-safe:animate-page-reveal"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1670F5] text-white shadow-[0_10px_24px_rgba(22,112,245,0.28)]">
                  <Icon size={24} aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#092f58] text-[10px] font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-[180px] font-inter text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-2 top-7 hidden text-[#93C5FD] lg:block"
                    size={18}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
