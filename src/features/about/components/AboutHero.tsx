import { aboutHero, aboutTrust } from "../data/about-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import TrustRow from "../../../components/shared/TrustRow";

export default function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 2xl:max-w-[1600px]">
        <div className="motion-safe:animate-page-reveal">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5] sm:text-xs">
            {aboutHero.eyebrow}
          </p>
          <h1 className="max-w-xl font-georgia text-3xl font-bold leading-[1.15] text-[#10234B] sm:text-4xl lg:text-5xl">
            {aboutHero.title}
          </h1>
          <p className="mt-4 max-w-lg font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
            {aboutHero.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton to="/contact" showArrow>
              Get a Free Quote
            </LinkButton>
            <a
              href="#our-story"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold uppercase tracking-wide text-[#092f58] transition hover:-translate-y-0.5 hover:border-[#1670F5] hover:bg-[#f0f5ff] sm:min-h-12 sm:px-6 sm:text-sm"
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
