import { processHero, processTrust } from "../data/process-page.data";
import { processSteps } from "../../../data/site.data";
import LinkButton from "../../../components/ui/LinkButton";
import TrustRow from "../../../components/shared/TrustRow";

export default function ProcessHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 2xl:max-w-[1600px]">
        <div className="motion-safe:animate-page-reveal">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5] sm:text-xs">
            {processHero.eyebrow}
          </p>
          <h1 className="max-w-xl font-georgia text-3xl font-bold leading-[1.15] text-[#10234B] sm:text-4xl lg:text-5xl">
            {processHero.title}
          </h1>
          <p className="mt-4 max-w-lg font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
            {processHero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton to="/contact" showArrow>
              Get a Free Quote
            </LinkButton>
            <LinkButton to="/contact" variant="secondary">
              Discuss Your Project
            </LinkButton>
          </div>
          <TrustRow items={processTrust} className="mt-8" />
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="overflow-hidden rounded-[2rem] bg-[#EAF2FF] p-3 shadow-xl">
            <img
              src={processHero.image}
              alt="Working through the delivery process"
              className="h-[340px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={[
                  "absolute rounded-xl border border-white/70 bg-white/95 px-3 py-2 text-xs font-bold text-[#10234B] shadow-md motion-safe:animate-float-soft",
                  index === 0 && "left-2 top-6",
                  index === 1 && "right-2 top-16",
                  index === 2 && "left-4 top-1/2",
                  index === 3 && "right-4 bottom-24",
                  index === 4 && "left-8 bottom-8",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ animationDelay: `${index * 180}ms` }}
              >
                {step.step}. {step.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
