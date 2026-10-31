import { processHero, processTrust } from "../data/process-page.data";
import { processSteps } from "../../../data/site.data";
import LinkButton from "../../../components/ui/LinkButton";
import TrustRow from "../../../components/shared/TrustRow";
import PageEyebrow from "../../../components/shared/PageEyebrow";
import {
  innerContainerClass,
  innerSectionClass,
  pageHeroDescClass,
  pageHeroTitleClass,
} from "../../../components/shared/section.styles";

export default function ProcessHero() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={`${innerContainerClass} grid items-center gap-10 lg:grid-cols-2`}>
        <div className="motion-safe:animate-page-reveal">
          <PageEyebrow>{processHero.eyebrow}</PageEyebrow>
          <h1 className={pageHeroTitleClass}>
            {processHero.title}
          </h1>
          <p className={pageHeroDescClass}>
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
