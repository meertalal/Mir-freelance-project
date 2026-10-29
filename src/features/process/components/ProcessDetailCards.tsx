import { Check } from "lucide-react";
import { processSteps } from "../../../data/site.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function ProcessDetailCards() {
  return (
    <section className="w-full bg-[#F7FAFF] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <SectionHeading
          title="How We Work at Every Stage"
          description="Each stage has clear activities, deliverables, and checkpoints."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.id}
                style={{ animationDelay: `${index * 80}ms` }}
                className="flex h-full flex-col rounded-2xl border border-[#D6E4F7] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg motion-safe:animate-page-reveal"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1670F5] text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#1670F5]">
                  Step {step.step}
                </p>
                <h3 className="mt-1 font-montserrat text-base font-bold text-[#10234B]">
                  {step.title}
                </h3>
                <p className="mt-2 font-inter text-xs leading-relaxed text-slate-600">
                  {step.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {step.tasks.map((task) => (
                    <li
                      key={task}
                      className="flex items-start gap-2 font-inter text-xs text-slate-700"
                    >
                      <Check size={14} className="mt-0.5 shrink-0 text-[#1670F5]" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
