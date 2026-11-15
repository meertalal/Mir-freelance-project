import { Code2, Cpu, Globe2, Sparkles, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LinkButton from "../ui/LinkButton";
import SocialFollowRow from "./SocialFollowRow";
import type { TrustItem } from "./TrustRow";
import { innerContainerClass, innerSectionClass } from "./section.styles";

type HeroCta = {
  label: string;
  href: string;
  showArrow?: boolean;
};

type HeroMedia = {
  src: string;
  alt: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  aspect?: string;
  widthClass?: string;
};

type PageHeroCenteredProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  trustItems: TrustItem[];
  subtitle?: string;
  media?: HeroMedia;
  eyebrowIcon?: LucideIcon;
  floatingIcons?: LucideIcon[];
  steps?: readonly string[];
  chips?: readonly string[];
  availability?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
};

export default function PageHeroCentered({
  eyebrow,
  title,
  highlight,
  description,
  trustItems,
  subtitle,
  media,
  eyebrowIcon: EyebrowIcon = Sparkles,
  floatingIcons,
  steps,
  chips,
  availability,
  primaryCta = { label: "Get a Free Quote", href: "/contact", showArrow: true },
  secondaryCta = { label: "Discuss Your Project", href: "/contact" },
}: PageHeroCenteredProps) {
  const highlightIndex = title.indexOf(highlight);
  const titleLead = highlightIndex === -1 ? title : title.slice(0, highlightIndex);
  const titleAccent = highlightIndex === -1 ? "" : highlight;
  const titleTrail = highlightIndex === -1 ? "" : title.slice(highlightIndex + highlight.length);
  const BadgeIcon = media?.badgeIcon ?? Sparkles;
  const mediaAspect = media?.aspect ?? "aspect-[16/9]";
  const mediaWidth = media?.widthClass ?? "max-w-4xl";
  const trustGridClass =
    trustItems.length === 2
      ? "mx-auto mt-12 grid w-full max-w-2xl grid-cols-2 gap-3 sm:mt-14 sm:gap-4"
      : trustItems.length === 3
        ? "mx-auto mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4"
        : "mx-auto mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4";
  const tileIcons = floatingIcons ?? [Code2, Cpu, Globe2, Sparkles];
  const floatingTiles = [
    { position: "left-[7%] top-[26%] h-12 w-12 rounded-2xl", size: 20, delay: "0s", tilt: "-rotate-6" },
    { position: "right-[7%] top-[32%] h-12 w-12 rounded-2xl", size: 20, delay: "1.1s", tilt: "rotate-6" },
    { position: "bottom-[23%] left-[11%] h-9 w-9 rounded-full", size: 16, delay: "1.8s", tilt: "" },
    { position: "bottom-[20%] right-[11%] h-9 w-9 rounded-full", size: 16, delay: "0.6s", tilt: "" },
  ];

  return (
    <section
      aria-labelledby="page-hero-title"
      className={innerSectionClass + " bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F9FF_55%,#F7FAFF_100%)]"}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/image/background-image/global-network-wave-background.webp"
          alt=""
          className="h-full w-full object-cover object-center animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-white/60" />
        <div className="absolute left-1/2 top-[-24rem] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#DCEBFF_0%,rgba(220,235,255,0.5)_45%,transparent_70%)]" />
        <div className="absolute left-1/2 top-12 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full border border-[#DFEAF9] sm:h-[40rem] sm:w-[40rem]" />
        <div className="absolute left-1/2 top-0 h-[45rem] w-[45rem] -translate-x-1/2 rounded-full border border-dashed border-[#E7F0FC] sm:h-[58rem] sm:w-[58rem]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E3ECF8_1px,transparent_1px),linear-gradient(to_bottom,#E3ECF8_1px,transparent_1px)] [background-size:64px_64px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_60%)]" />
        {floatingTiles.map(({ position, size, delay, tilt }, index) => {
          const Icon = tileIcons[index] ?? Code2;
          return (
            <div
              key={position}
              className={"absolute hidden items-center justify-center border border-white/90 bg-white/75 text-[#4A83E6]/80 shadow-[0_14px_34px_rgba(15,48,91,0.1)] backdrop-blur-sm motion-safe:animate-float-soft min-[1280px]:flex " + tilt + " " + position}
              style={{ animationDelay: delay }}
            >
              <Icon size={size} strokeWidth={1.7} aria-hidden="true" />
            </div>
          );
        })}
      </div>

      <div className={innerContainerClass + " relative"}>
        <div className="mx-auto max-w-4xl text-center motion-safe:animate-page-reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D6E4F7] bg-white/90 px-3.5 py-1.5 shadow-[0_4px_16px_rgba(15,48,91,0.06)] backdrop-blur-sm">
            <EyebrowIcon size={14} aria-hidden="true" className="text-[#1670F5]" />
            <span className="font-playfair text-[11px] font-semibold uppercase tracking-[0.16em] text-[#092f58] sm:text-xs">
              {eyebrow}
            </span>
          </span>

          <h1
            id="page-hero-title"
            className="mx-auto mt-6 max-w-4xl text-balance font-montserrat text-[2.15rem] font-bold leading-[1.06] tracking-[-0.02em] text-[#10234b] sm:text-5xl lg:text-[3.3rem] xl:text-[3.8rem]"
          >
            {titleLead}
            <span className="[box-decoration-break:clone] bg-[linear-gradient(180deg,transparent_88%,rgba(37,99,235,0.2)_88%)] text-[#2563eb]">{titleAccent}</span>
            {titleTrail}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl font-inter text-base font-semibold text-[#0f3d6e] sm:text-lg">
              {subtitle}
            </p>
          )}

          <p className="mx-auto mt-5 max-w-xl font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <LinkButton
              to={primaryCta.href}
              showArrow={primaryCta.showArrow}
              className="w-full sm:w-auto"
            >
              {primaryCta.label}
            </LinkButton>
            <LinkButton
              to={secondaryCta.href}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {secondaryCta.label}
            </LinkButton>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-inter text-xs text-slate-500">
            <span className="flex items-center gap-0.5 text-[#F59E0B]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span>
              <span className="font-bold text-[#092f58]">5.0</span> average rating
            </span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
            <span>from 50+ happy clients</span>
          </div>

          {availability && (
            <p className="mt-2.5 flex items-center justify-center gap-1.5 font-inter text-xs text-slate-500">
              <Globe2 size={14} aria-hidden="true" className="text-[#1670F5]" />
              {availability}
            </p>
          )}
          {chips && chips.length > 0 && (
            <ul className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D9E7FB] bg-white/85 px-3 py-1.5 font-inter text-[11px] font-semibold text-[#0f2c56] shadow-[0_4px_14px_rgba(15,48,91,0.05)] backdrop-blur-sm motion-safe:animate-page-reveal"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1670F5]" />
                  {chip}
                </li>
              ))}
            </ul>
          )}
          {steps && steps.length > 1 && (
            <ol
              aria-label="Project journey"
              className="mx-auto mt-7 hidden max-w-3xl flex-wrap items-center justify-center gap-y-2 sm:flex"
            >
              {steps.map((step, index) => (
                <li key={step} className="flex items-center motion-safe:animate-page-reveal" style={{ animationDelay: 120 + index * 80 + "ms" }}>
                  <span className="flex items-center gap-2 rounded-full border border-[#D9E7FB] bg-white/90 px-2.5 py-1.5 shadow-[0_4px_14px_rgba(15,48,91,0.05)] backdrop-blur-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(150deg,#EAF2FF_0%,#D9E8FF_100%)] font-montserrat text-[10px] font-bold text-[#1670F5]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="whitespace-nowrap font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f2c56]">
                      {step}
                    </span>
                  </span>
                  {index < steps.length - 1 && (
                    <span aria-hidden="true" className="mx-1.5 h-px w-5 bg-[linear-gradient(90deg,#9FC2F0,#DCE9FF)] sm:w-7" />
                  )}
                </li>
              ))}
            </ol>
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

        <div className={trustGridClass}>
          {trustItems.map(({ title: itemTitle, description: itemDescription, Icon }, index) => (
            <div
              key={itemTitle}
              style={{ animationDelay: (140 + index * 90) + "ms" }}
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-[#DEE8F5] bg-white px-4 py-5 text-center shadow-[0_10px_24px_rgba(15,48,91,0.06)] motion-safe:animate-page-reveal transition duration-300 hover:-translate-y-1 hover:border-[#BFD7F4] hover:shadow-[0_18px_40px_rgba(15,48,91,0.12)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-[2px] rounded-full bg-[linear-gradient(90deg,transparent,rgba(76,134,232,0.65),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(160deg,#EFF5FF_0%,#DCEAFF_100%)] text-[#1E63D0] ring-1 ring-inset ring-white/80 transition-colors duration-300 group-hover:bg-[linear-gradient(160deg,#0F3D6E_0%,#092F58_100%)] group-hover:text-white">
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <p className="font-montserrat text-xs font-bold text-[#0f2c56] sm:text-sm">
                  {itemTitle}
                </p>
                {itemDescription && (
                  <p className="mt-1 font-inter text-[11px] leading-relaxed text-slate-500">
                    {itemDescription}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <SocialFollowRow className="mt-9 justify-center" />
      </div>
    </section>
  );
}
