import { Award, Quote, Star } from "lucide-react";
import LinkButton from "../../../components/ui/LinkButton";
import SocialIcon from "../../../components/layout/footer/SocialIcon";
import { aboutHero, aboutHeroServices, heroServiceIcons } from "../data/about-page.data";
import { brand, sharedTestimonials } from "../../../data/site.data";
import { footerSocialLinks } from "../../../data/footer.data";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

const floatCardClass =
  "rounded-2xl border border-[#E6EEF9] bg-white p-4 shadow-[0_10px_28px_rgba(15,48,91,0.06)] lg:border-white/70 lg:bg-white/85 lg:backdrop-blur-sm";

const stripPaddingClass =
  "mt-12 -mx-4 -mb-10 px-4 py-3.5 min-[480px]:-mx-5 sm:-mx-6 sm:-mb-14 sm:px-6 lg:-mx-8 lg:-mb-16 lg:px-8 xl:-mx-12 xl:-mb-20 xl:px-12 min-[1920px]:-mx-16 min-[1920px]:-mb-24 min-[1920px]:px-16";

export default function AboutHero() {
  const review = sharedTestimonials[0];

  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/image/background-image/global-network-wave-background.webp"
          alt=""
          className="h-full w-full object-cover object-center animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-white/60" />
      </div>

      <div className={`${innerContainerClass} relative`}>
        <div className="mx-auto max-w-3xl text-center motion-safe:animate-page-reveal">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-[#092f58] sm:w-8" />
            <p className="whitespace-nowrap font-playfair text-[11px] font-bold uppercase tracking-[0.12em] text-[#092f58] sm:text-xs sm:tracking-[0.14em]">
              {aboutHero.badge}
            </p>
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-[#092f58] sm:w-8" />
          </div>
          <h1 className="mt-5 font-montserrat text-3xl font-bold leading-[1.12] tracking-tight text-[#10234b] sm:text-4xl lg:text-5xl xl:text-[3.35rem]">
            {aboutHero.titleBefore}
            <span className="text-[#1670F5]">{aboutHero.titleHighlight}</span>
            {aboutHero.titleAfter}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
            {aboutHero.description}
          </p>
        </div>

        <div className="relative mx-auto mt-10 flex w-full max-w-5xl flex-col items-center lg:mt-4 lg:min-h-[560px]">
          <div className="relative z-10 w-full max-w-[380px] motion-safe:animate-page-reveal sm:max-w-[420px] lg:max-w-[440px]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EAF2FF]/80 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-3 h-24 w-24 rounded-full border border-dashed border-[#BFD6F5] sm:-left-7"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-6 right-0 h-24 w-24 bg-[radial-gradient(#C7D9F4_1.5px,transparent_1.5px)] [background-size:14px_14px]"
            />
            <div className="relative overflow-hidden rounded-t-[12rem] rounded-b-[2rem] border border-white bg-white p-2 shadow-[0_24px_60px_rgba(15,48,91,0.16)]">
              <div className="overflow-hidden rounded-t-[11rem] rounded-b-[1.6rem]">
                <img
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={640}
                  height={800}
                  src={aboutHero.image}
                  alt="Mir Talal, freelance web and AI developer"
                  className="aspect-[4/5] w-full scale-[1.12] object-cover object-[62%_center]"
                />
              </div>
            </div>
            <div className="absolute -right-2 top-6 z-20 animate-float-soft sm:-right-8">
              <div className="flex h-28 w-28 rotate-6 flex-col items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-center shadow-[0_16px_36px_rgba(15,48,91,0.2)]">
                <Award size={22} aria-hidden="true" className="text-[#1670F5]" />
                <p className="mt-1 font-montserrat text-sm font-black text-[#10234B]">
                  {aboutHero.experience.value}
                </p>
                <p className="font-inter text-[10px] uppercase tracking-[0.1em] text-slate-500">
                  {aboutHero.experience.label}
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-20 -mt-7 flex flex-wrap items-center justify-center gap-3 max-[420px]:gap-2">
            <LinkButton to="/contact" showArrow>
              Get a Free Quote
            </LinkButton>
            <a
              href="#our-story"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white/95 px-5 font-inter text-xs font-bold uppercase tracking-wide text-[#092f58] shadow-sm transition hover:-translate-y-0.5 hover:border-[#5882E8] sm:min-h-12 sm:px-6 sm:text-sm"
            >
              Our Story
            </a>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:contents">
            <div className={`${floatCardClass} relative z-20 self-start lg:absolute lg:left-4 lg:top-[24%] lg:w-44 xl:left-10`}>
              <p className="font-playfair text-[11px] font-semibold uppercase tracking-[0.14em] text-[#092F58]">
                Follow Me On
              </p>
              <div className="mt-3 flex items-center gap-2">
                {footerSocialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-[#092F58] transition duration-300 hover:-translate-y-1 hover:border-[#092F58] hover:bg-[#092F58] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8]"
                  >
                    <SocialIcon id={social.id} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className={`${floatCardClass} relative z-20 lg:absolute lg:bottom-[9%] lg:left-4 lg:w-60 xl:left-10`}>
              <div
                className="flex items-center gap-1 text-[#F59E0B]"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-2 font-playfair text-[11px] font-semibold uppercase tracking-[0.14em] text-[#092F58]">
                Client Reviews
              </p>
              <p className="mt-1 font-inter text-xs leading-relaxed text-slate-600">
                {review.quote}
              </p>
              <p className="mt-1.5 font-inter text-[11px] font-semibold text-slate-500">
                {review.author}, {review.role}
              </p>
            </div>

            <div className={`${floatCardClass} relative z-20 lg:absolute lg:right-0 lg:top-[24%] lg:w-56 xl:w-64`}>
              <span
                aria-hidden="true"
                className="absolute -top-1 right-2 text-[#BFD6F5] lg:-top-3 lg:right-0"
              >
                <Quote size={36} strokeWidth={0} fill="currentColor" />
              </span>
              <p className="relative font-inter text-sm italic leading-relaxed text-slate-600">
                {brand.tagline}
              </p>
            </div>

            <div className="relative z-20 lg:absolute lg:bottom-[11%] lg:right-4 lg:w-72 xl:right-10">
              <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
                {aboutHeroServices.slice(0, 5).map((service, index) => (
                  <span
                    key={service}
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1.5 font-inter text-[11px] font-semibold transition duration-300 hover:-translate-y-0.5",
                      index === 0
                        ? "bg-[#092f58] text-white shadow-sm"
                        : "border border-[#D6E4F7] bg-white text-[#092F58] shadow-sm",
                    ].join(" ")}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${stripPaddingClass} relative bg-[#092f58]`}>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6">
          {aboutHeroServices.map((service) => {
            const Icon = heroServiceIcons[service];

            return (
              <li key={service} className="flex items-center gap-x-4 text-white/85 sm:gap-x-6">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-playfair text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-xs">
                  <Icon
                    size={13}
                    strokeWidth={1.9}
                    aria-hidden="true"
                    className="text-[#93C5FD]"
                  />
                  {service}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
