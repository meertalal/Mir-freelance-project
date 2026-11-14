import { Globe2, Sparkles } from "lucide-react";
import { servicesHero } from "../data/services-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import {
  innerSectionClass,
  pageHeroGridClass,
} from "../../../components/shared/section.styles";

export default function ServicesHero() {
  const {
    badge,
    titleBefore,
    titleAccent,
    titleAfter,
    description,
    image,
    imageAlt,
    primaryCta,
    secondaryCta,
    availability,
  } = servicesHero;

  return (
    <section
      aria-labelledby="services-hero-title"
      className={`${innerSectionClass} bg-[#072444]`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#1670F5]/20 blur-[120px]" />
        <div className="absolute -bottom-48 right-0 h-[34rem] w-[34rem] rounded-full bg-[#5882E8]/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,#93C5FD_1px,transparent_1px)] bg-[size:22px_22px] opacity-[0.07]" />
      </div>

      <div className={pageHeroGridClass}>
        <div className="motion-safe:animate-page-reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 backdrop-blur-sm">
            <Sparkles
              size={14}
              aria-hidden="true"
              className="text-[#93C5FD]"
            />
            <span className="font-playfair text-[11px] font-semibold uppercase tracking-[0.16em] text-[#BFD6F5] sm:text-xs">
              {badge}
            </span>
          </span>

          <h1
            id="services-hero-title"
            className="mt-5 max-w-[640px] font-montserrat text-[2rem] font-bold leading-[1.08] tracking-tight text-white min-[480px]:text-4xl sm:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] 2xl:text-[3.75rem]"
          >
            {titleBefore}
            <span className="text-[#8FC0FF]">{titleAccent}</span>
            {titleAfter}
          </h1>

          <p className="mt-5 max-w-xl font-inter text-sm leading-relaxed text-[#C7D7EE] sm:text-base lg:text-[17px]">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <LinkButton
              to={primaryCta.href}
              variant="secondary"
              showArrow
              external
            >
              {primaryCta.label}
            </LinkButton>
            <LinkButton to={secondaryCta.href} variant="ghost">
              {secondaryCta.label}
            </LinkButton>
          </div>

          <p className="mt-7 flex items-center gap-2 font-inter text-xs text-[#9FB6D6] sm:text-sm">
            <Globe2
              size={16}
              aria-hidden="true"
              className="shrink-0 text-[#93C5FD]"
            />
            {availability}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] motion-safe:animate-page-reveal lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/10 motion-safe:animate-float-soft sm:h-32 sm:w-32"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full border border-dashed border-[#93C5FD]/30 sm:h-36 sm:w-36"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2.5rem] bg-[#1670F5]/20 blur-2xl"
          />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#0b2f56] shadow-[0_30px_70px_rgba(0,0,0,0.4)] sm:rounded-[2rem]">
            <img
              src={image}
              alt={imageAlt}
              width={1024}
              height={768}
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover object-[center_20%]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#072444]/70 via-[#072444]/10 to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#072444]/50 via-transparent to-transparent"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-inter text-[11px] font-semibold text-white backdrop-blur-md motion-safe:animate-float-soft sm:bottom-5 sm:left-5 sm:text-xs">
              <Globe2
                size={14}
                aria-hidden="true"
                className="text-[#93C5FD]"
              />
              Client First Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
