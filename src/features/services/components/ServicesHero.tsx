import { servicesHero, servicesTrust } from "../data/services-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import TrustRow from "../../../components/shared/TrustRow";
import PageEyebrow from "../../../components/shared/PageEyebrow";
import {
  innerContainerClass,
  innerSectionClass,
  pageHeroDescClass,
  pageHeroTitleClass,
} from "../../../components/shared/section.styles";

export default function ServicesHero() {
  const { eyebrow, titleBefore, highlightRed, titleMid, highlightBlue, titleAfter, description, image, floatingCards } =
    servicesHero;

  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={`${innerContainerClass} grid items-center gap-10 lg:grid-cols-2 lg:gap-12`}>
        <div className="motion-safe:animate-page-reveal">
          <PageEyebrow>{eyebrow}</PageEyebrow>
          <h1 className={pageHeroTitleClass}>
            {titleBefore}
            <span className="text-[#E11D48]">{highlightRed}</span>
            {titleMid}
            <span className="bg-gradient-to-r from-[#092f58] via-[#2563eb] to-[#5882E8] bg-clip-text text-transparent">
              {highlightBlue}
            </span>
            {titleAfter}
          </h1>
          <p className={pageHeroDescClass}>
            {description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton to="/contact" showArrow>
              Get a Free Quote
            </LinkButton>
            <LinkButton to="/contact" variant="secondary">
              Schedule a Call
            </LinkButton>
          </div>
          <TrustRow items={servicesTrust} className="mt-8" />
        </div>

        <div className="relative mx-auto w-full max-w-md motion-safe:animate-page-reveal lg:max-w-lg">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#EAF2FF] to-[#C9DEFF] p-3 shadow-[0_20px_50px_rgba(22,112,245,0.18)]">
            <img
              src={image}
              alt="Professional working on digital solutions"
              className="h-[340px] w-full rounded-[1.5rem] object-cover sm:h-[400px] lg:h-[460px]"
            />
          </div>

          {floatingCards.map((card, index) => (
            <div
              key={card.id}
              style={{ animationDelay: `${index * 200}ms` }}
              className={[
                "absolute rounded-2xl border border-white/60 bg-white/90 px-3 py-2 shadow-lg backdrop-blur motion-safe:animate-float-soft",
                index === 0 && "left-0 top-8 sm:-left-6",
                index === 1 && "right-0 top-1/3 sm:-right-4",
                index === 2 && "bottom-10 left-4 sm:left-8",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="text-xs font-bold text-[#10234B] sm:text-sm">{card.title}</p>
              <p className="text-[10px] text-slate-500 sm:text-xs">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
