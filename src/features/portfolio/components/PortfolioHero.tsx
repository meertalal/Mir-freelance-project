import { portfolioHero, portfolioTrust } from "../data/portfolio-page.data";
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

export default function PortfolioHero() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={pageHeroGridClass}>
        <div className={pageHeroCopyClass}>
          <PageEyebrow>{portfolioHero.eyebrow}</PageEyebrow>
          <h1 className={pageHeroTitleClass}>
            {portfolioHero.title}
          </h1>
          <p className={pageHeroDescClass}>
            {portfolioHero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton to="/contact" showArrow>
              Get a Free Quote
            </LinkButton>
            <LinkButton to="/contact" variant="secondary">
              Discuss Your Project
            </LinkButton>
          </div>
          <TrustRow items={portfolioTrust} className="mt-8" />
        </div>

        <div className={pageHeroMediaClass}>
          <div className="overflow-hidden rounded-3xl border border-[#D6E4F7] bg-[#EAF2FF] p-4 shadow-xl">
            <img
              loading="lazy"
              decoding="async"
              width={640}
              height={480}
              src={portfolioHero.image}
              alt="Featured project mockups"
              className="aspect-[4/3] w-full rounded-2xl object-cover sm:h-[360px] sm:aspect-auto lg:h-[420px]"
            />
          </div>
          {portfolioHero.stats.map((stat, index) => (
            <div
              key={stat.title}
              className={[
                "absolute rounded-2xl bg-white px-4 py-3 shadow-lg motion-safe:animate-float-soft",
                index === 0 ? "left-2 top-6" : "bottom-6 right-2",
              ].join(" ")}
            >
              <p className="text-sm font-bold text-[#10234B]">{stat.title}</p>
              <p className="text-[11px] text-slate-500">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
