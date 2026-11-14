import { processHero, processTrust } from "../data/process-page.data";
import { processSteps } from "../../../data/site.data";
import LinkButton from "../../../components/ui/LinkButton";
import TrustRow from "../../../components/shared/TrustRow";
import PageEyebrow from "../../../components/shared/PageEyebrow";
import {
  innerSectionClass,
  pageHeroCopyClass,
  pageHeroDescClass,
  pageHeroGridClass,
  pageHeroMediaClass,
  pageHeroTitleClass,
} from "../../../components/shared/section.styles";

export default function ProcessHero() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={pageHeroGridClass}>
        <div className={pageHeroCopyClass}>
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

        <div className={pageHeroMediaClass}>
          <div className="overflow-hidden rounded-[2rem] bg-[#EAF2FF] p-3 shadow-xl">
            <img
              loading="lazy"
              decoding="async"
              width={640}
              height={480}
              src={processHero.image}
              alt="Working through the delivery process"
              className="aspect-[4/3] w-full rounded-[1.5rem] object-cover sm:h-[420px] sm:aspect-auto"
            />
          </div>
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className={[
                "absolute rounded-xl border border-white/70 bg-white/95 px-2.5 py-1.5 text-[11px] font-bold text-[#10234B] shadow-md animate-float-soft sm:px-3 sm:py-2 sm:text-xs",
                index === 0 && "left-2 top-6",
                index === 1 && "right-2 top-16",
                index === 2 && "left-4 top-1/2",
                index === 3 && "right-4 bottom-24",
                index === 4 && "left-8 bottom-8",
                /* At 320px the label stack can't avoid covering the photo, so only the first two are shown. */
                index >= 2 && "hidden min-[480px]:block",
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
    </section>
  );
}
