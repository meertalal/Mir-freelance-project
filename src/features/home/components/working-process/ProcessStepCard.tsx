import { ArrowRight } from "lucide-react";
import type { workingProcessSteps } from "../../data/working-process.data";

type ProcessStep = (typeof workingProcessSteps)[number];

type ProcessStepCardProps = {
  step: ProcessStep;
  showConnector?: boolean;
};

export default function ProcessStepCard({
  step,
  showConnector = false,
}: ProcessStepCardProps) {
  const Icon = step.Icon;

  return (
    <li className="relative flex h-full min-w-0 flex-col">
      <article
        className="
          flex h-full flex-col rounded-2xl border border-slate-100 bg-white
          p-5 shadow-[0_8px_28px_rgba(15,48,91,0.05)]
          transition duration-300 hover:-translate-y-1 hover:shadow-lg
          sm:p-6
        "
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
            <Icon size={22} aria-hidden="true" />
          </span>
          <span className="font-montserrat text-sm font-bold text-slate-300 sm:text-base">
            {step.step}
          </span>
        </div>
        <h3 className="font-montserrat text-base font-bold text-[#10234B] sm:text-lg">
          {step.title}
        </h3>
        <p className="mt-2 font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
          {step.description}
        </p>
      </article>

      {showConnector && (
        <span
          aria-hidden="true"
          className="
            absolute -right-4 top-1/2 z-10 hidden h-8 w-8
            -translate-y-1/2 items-center justify-center
            rounded-full border border-[#D6E4F7] bg-white text-[#1670F5]
            shadow-sm lg:flex xl:-right-5
          "
        >
          <ArrowRight size={14} />
        </span>
      )}
    </li>
  );
}
