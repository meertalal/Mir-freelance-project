import { aboutHero, aboutTrust } from "../data/about-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import TrustRow from "../../../components/shared/TrustRow";
import PageEyebrow from "../../../components/shared/PageEyebrow";
import {
  innerContainerClass,
  innerSectionClass,
  pageHeroDescClass,
  pageHeroTitleClass,
} from "../../../components/shared/section.styles";

export default function AboutHero() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={`${innerContainerClass} grid items-center gap-10 lg:grid-cols-2`}>
        <div className="motion-safe:animate-page-reveal">
          <PageEyebrow>{aboutHero.eyebrow}</PageEyebrow>
          <h1 className={pageHeroTitleClass}>
            {aboutHero.title}
          </h1>
          <p className={pageHeroDescClass}>
            {aboutHero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton to="/contact" showArrow>
              Get a Free Quote
            </LinkButton>
            <a
              href="#our-story"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white/95 px-5 font-inter text-xs font-bold uppercase tracking-wide text-[#092f58] transition hover:-translate-y-0.5 hover:border-[#5882E8] sm:min-h-12 sm:px-6 sm:text-sm"
            >
              Our Story
            </a>
          </div>
          <TrustRow items={aboutTrust} className="mt-8" />
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="overflow-hidden rounded-[40%_60%_55%_45%/45%_40%_60%_55%] bg-[#EAF2FF] p-2 shadow-xl">
            <img
              src={aboutHero.image}
              alt="Team collaborating on digital products"
              className="h-[360px] w-full object-cover sm:h-[440px]"
            />
          </div>
          {aboutHero.stats.map((stat, index) => (
            <div
              key={stat.title}
              style={{ animationDelay: `${index * 160}ms` }}
              className={[
                "absolute rounded-2xl border border-white/70 bg-white px-3 py-2 shadow-lg motion-safe:animate-float-soft",
                index === 0 && "left-0 top-10",
                index === 1 && "right-0 top-1/3",
                index === 2 && "bottom-8 left-6",
              ]
                .filter(Boolean)
                .join(" ")}
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
