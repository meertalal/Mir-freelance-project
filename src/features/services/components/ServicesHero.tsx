import { servicesHero, servicesTrust } from "../data/services-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import TrustRow from "../../../components/shared/TrustRow";

export default function ServicesHero() {
  const { eyebrow, titleBefore, highlightRed, titleMid, highlightBlue, titleAfter, description, image, floatingCards } =
    servicesHero;

  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12 2xl:max-w-[1600px]">
        <div className="motion-safe:animate-page-reveal">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5] sm:text-xs">
            {eyebrow}
          </p>
          <h1 className="max-w-xl font-georgia text-3xl font-bold leading-[1.15] tracking-tight text-[#10234B] sm:text-4xl lg:text-5xl 2xl:text-6xl">
            {titleBefore}
            <span className="text-[#E11D48]">{highlightRed}</span>
            {titleMid}
            <span className="text-[#1670F5]">{highlightBlue}</span>
            {titleAfter}
          </h1>
          <p className="mt-4 max-w-lg font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
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
