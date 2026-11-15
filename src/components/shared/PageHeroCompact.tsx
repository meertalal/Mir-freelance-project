import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import LinkButton from "../ui/LinkButton";
import { innerContainerClass, innerSectionClass } from "./section.styles";

type HeroCta = {
  label: string;
  href: string;
  showArrow?: boolean;
};

type HeroBreadcrumb = {
  label: string;
  href?: string;
};

type HeroMedia = {
  src: string;
  alt: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  aspect?: string;
  widthClass?: string;
};

type PageHeroCompactProps = {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  breadcrumbs?: readonly HeroBreadcrumb[];
  title: string;
  highlight?: string;
  subtitle?: string;
  description?: string;
  meta?: ReactNode;
  chips?: readonly string[];
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  backgroundImage?: string;
  media?: HeroMedia;
};

const sectionClass = innerSectionClass + " bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F8FF_60%,#F7FAFF_100%)]";

export default function PageHeroCompact({
  eyebrow,
  eyebrowIcon: EyebrowIcon = Sparkles,
  breadcrumbs,
  title,
  highlight,
  subtitle,
  description,
  meta,
  chips,
  primaryCta,
  secondaryCta,
  backgroundImage,
  media,
}: PageHeroCompactProps) {
  const highlightIndex = highlight ? title.indexOf(highlight) : -1;
  const titleLead = highlightIndex === -1 ? title : title.slice(0, highlightIndex);
  const titleAccent = highlightIndex === -1 ? "" : highlight;
  const titleTrail = highlightIndex === -1 || !highlight ? "" : title.slice(highlightIndex + highlight.length);
  const BadgeIcon = media?.badgeIcon ?? Sparkles;
  const mediaAspect = media?.aspect ?? "aspect-[16/9]";
  const mediaWidth = media?.widthClass ?? "max-w-4xl";

  return (
    <section aria-labelledby="page-hero-title" className={sectionClass}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {backgroundImage && (<>
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover object-center animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-white/60" />
        </>)}
        <div className="absolute left-1/2 top-[-22rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#D9E9FF_0%,rgba(217,233,255,0.45)_45%,transparent_72%)]" />
        <div className="absolute left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full border border-[#E1EAF6]/90 sm:h-[38rem] sm:w-[38rem]" />
        <div className="absolute left-1/2 top-0 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full border border-[#EAF2FF] sm:h-[56rem] sm:w-[56rem]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E3ECF8_1px,transparent_1px),linear-gradient(to_bottom,#E3ECF8_1px,transparent_1px)] [background-size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_62%)]" />
      </div>

      <div className={innerContainerClass + " relative"}>
        <div className="mx-auto max-w-4xl text-center motion-safe:animate-page-reveal">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center justify-center gap-2 font-inter text-xs text-[#526987] sm:text-sm">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.label} className="inline-flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link to={crumb.href} className="transition hover:text-[#092F58]">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-[#10234B]">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <span className="inline-flex items-center gap-2 rounded-full border border-[#D6E4F7] bg-white/90 px-3.5 py-1.5 shadow-[0_4px_16px_rgba(15,48,91,0.06)] backdrop-blur-sm">
            <EyebrowIcon size={14} aria-hidden="true" className="text-[#1670F5]" />
            <span className="font-playfair text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092f58] sm:text-xs">
              {eyebrow}
            </span>
          </span>

          <h1
            id="page-hero-title"
            className="mx-auto mt-6 max-w-4xl font-montserrat text-[2.15rem] font-bold leading-[1.05] tracking-[-0.02em] text-[#10234b] sm:text-5xl lg:text-[3.3rem] xl:text-[3.8rem]"
          >
            {titleLead}
            {titleAccent && (
              <span className="whitespace-nowrap bg-[linear-gradient(180deg,transparent_87%,rgba(37,99,235,0.22)_87%)] text-[#2563eb]">{titleAccent}</span>
            )}
            {titleTrail}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl font-inter text-base font-semibold text-[#0f3d6e] sm:text-lg">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="mx-auto mt-4 max-w-2xl font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
              {description}
            </p>
          )}

          {meta && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-inter text-xs text-[#526987] sm:text-sm">
              {meta}
            </div>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              {primaryCta && (
                <LinkButton to={primaryCta.href} showArrow={primaryCta.showArrow} className="w-full sm:w-auto">
                  {primaryCta.label}
                </LinkButton>
              )}
              {secondaryCta && (
                <LinkButton to={secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
                  {secondaryCta.label}
                </LinkButton>
              )}
            </div>
          )}

          {chips && chips.length > 0 && (
            <ul className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE9FF] bg-white/80 px-3 py-1.5 font-inter text-[11px] font-semibold text-[#0f2c56] shadow-[0_4px_14px_rgba(15,48,91,0.05)] backdrop-blur-sm"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1670F5]" />
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </div>

        {media && (
          <div className={"mx-auto mt-10 motion-safe:animate-page-reveal sm:mt-12 " + mediaWidth}>
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-[#DCE9FF]/70 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-2 shadow-[0_24px_60px_rgba(15,48,91,0.14)]">
              <div className="relative overflow-hidden rounded-[1.4rem]">
                <img
                  src={media.src}
                  alt={media.alt}
                  loading="eager"
                  decoding="async"
                  width={1280}
                  height={800}
                  className={"w-full object-cover " + mediaAspect}
                />
                {media.badge && (
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3.5 py-2 font-inter text-[11px] font-semibold text-[#0f2c56] shadow-sm backdrop-blur-md">
                    <BadgeIcon size={12} className="text-[#1670F5]" aria-hidden="true" />
                    {media.badge}
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
