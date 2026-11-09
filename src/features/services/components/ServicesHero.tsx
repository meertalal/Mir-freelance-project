import { servicesHero, servicesTrust } from "../data/services-page.data";
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

export default function ServicesHero() {
  const {
    eyebrow,
    label,
    titleBefore,
    highlightRed,
    titleMid,
    highlightBlue,
    titleAfter,
    description,
    image,
    floatingCards,
  } = servicesHero;

  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={pageHeroGridClass}>
        <div className={pageHeroCopyClass}>
          <PageEyebrow>{eyebrow}</PageEyebrow>
          <p className="mb-2 font-playfair text-xs font-semibold uppercase tracking-[0.2em] text-[#5882E8] sm:text-sm">
            {label}
          </p>
          <h1 className={pageHeroTitleClass}>
            {titleBefore}
            <span className="text-[#E11D48]">{highlightRed}</span>
            {titleMid}
            <span className="text-[#2563eb]">{highlightBlue}</span>
            {titleAfter}
          </h1>
          <p className={pageHeroDescClass}>{description}</p>
          <div className="mt-7 flex flex-wrap gap-3 max-[420px]:gap-2">
            <LinkButton to="/contact" showArrow>
              Get a Free Quote
            </LinkButton>
            <LinkButton to="/contact" variant="secondary">
              Schedule a Call
            </LinkButton>
          </div>
          <TrustRow items={servicesTrust} className="mt-8" />
        </div>

        <div className={pageHeroMediaClass}>
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div
              aria-hidden="true"
              className="absolute inset-[6%] rounded-full bg-gradient-to-br from-[#EAF2FF] via-[#DCE9FF] to-[#C9DEFF]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-dashed border-[#BCE0F5]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[16%] rounded-full border border-[#D6E4F7]"
            />

            <div className="absolute inset-[13%] overflow-hidden rounded-full bg-white p-2 shadow-[0_24px_60px_rgba(22,112,245,0.18)]">
              <img
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={640}
                height={640}
                src={image}
                alt="Mir Talal, freelance web and AI developer"
                className="h-full w-full rounded-full object-cover object-[62%_30%]"
              />
            </div>

            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[2%] inline-flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-[#1670F5] shadow-md sm:h-12 sm:w-12"
            >
              <span className="font-montserrat text-[10px] font-black tracking-tight">
                AI
              </span>
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-[8%] right-[6%] inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-[#E11D48] shadow-md sm:h-11 sm:w-11"
            >
              <span className="font-montserrat text-[10px] font-black tracking-tight">
                UX
              </span>
            </span>

            {floatingCards.map((card, index) => (
              <div
                key={card.id}
                style={{ animationDelay: `${index * 200}ms` }}
                className={[
                  "absolute rounded-2xl border border-white/70 bg-white/95 px-3 py-2 shadow-[0_12px_30px_rgba(15,48,91,0.14)] backdrop-blur motion-safe:animate-float-soft sm:px-4 sm:py-2.5",
                  index === 0 && "left-0 top-[16%]",
                  index === 1 && "right-0 top-[42%]",
                  index === 2 && "bottom-[6%] left-[8%]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p className="font-montserrat text-[11px] font-bold text-[#10234B] sm:text-sm">
                  {card.title}
                </p>
                <p className="font-inter text-[10px] text-slate-500 sm:text-xs">
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
