import { portfolioHero, portfolioTrust } from "../data/portfolio-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import TrustRow from "../../../components/shared/TrustRow";

export default function PortfolioHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 2xl:max-w-[1600px]">
        <div className="motion-safe:animate-page-reveal">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5] sm:text-xs">
            {portfolioHero.eyebrow}
          </p>
          <h1 className="max-w-xl font-georgia text-3xl font-bold leading-[1.15] text-[#10234B] sm:text-4xl lg:text-5xl">
            {portfolioHero.title}
          </h1>
          <p className="mt-4 max-w-lg font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
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

        <div className="relative mx-auto w-full max-w-lg">
          <div className="overflow-hidden rounded-3xl border border-[#D6E4F7] bg-[#EAF2FF] p-4 shadow-xl">
            <img
              src={portfolioHero.image}
              alt="Featured project mockups"
              className="h-[280px] w-full rounded-2xl object-cover sm:h-[360px]"
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
