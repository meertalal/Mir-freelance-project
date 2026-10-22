import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import WorldMapIllustration from "./WorldMapIllustration";
import { countries, trustItems } from "../../data/hero.data";

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="hero-section relative isolate w-full overflow-hidden bg-white"
    >
      {/* Background: desktop image by default; mobile image via animations.css */}
      <div
        aria-hidden="true"
        className="hero-background pointer-events-none absolute inset-0 z-0 bg-[url('/image/home-hero/global-connections-world-map.webp')] bg-cover bg-center bg-no-repeat motion-safe:animate-[heroBackground_24s_ease-in-out_infinite_alternate]"
      />

      {/* Ambient blue glow */}
      <div
        aria-hidden="true"
        className="hero-ambient-glow pointer-events-none absolute -right-24 top-24 z-[1] h-72 w-72 rounded-full bg-blue-300/20 blur-3xl motion-safe:animate-[ambientGlow_9s_ease-in-out_infinite]"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto grid min-h-screen w-[calc(100%-3rem)] max-w-[1248px] grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-6 py-12 max-[767px]:min-h-0 max-[767px]:w-[calc(100%-2rem)] max-[767px]:grid-cols-1 max-[767px]:gap-2 max-[767px]:py-5 max-[420px]:w-[calc(100%-1.5rem)]">

        {/* LEFT: Hero content */}
        <div className="relative z-10 min-w-0">

          {/* Decorative label */}
          <div className="mb-5 flex w-full max-w-max items-center gap-3 motion-safe:animate-[heroReveal_700ms_cubic-bezier(0.22,1,0.36,1)_both] max-[767px]:mb-3 max-[420px]:gap-2">
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0 bg-[#092f58] sm:w-12"
            />

            <p className="whitespace-nowrap font-playfair text-[10px] font-semibold uppercase tracking-[0.12em] text-[#092f58] sm:text-xs max-[420px]:text-[8px] max-[420px]:tracking-[0.04em]">
              Software Development · AI · Automation
            </p>

            <span
              aria-hidden="true"
              className="h-px min-w-3 flex-1 bg-[#092f58] sm:min-w-8"
            />
          </div>

          {/* Main heading */}
          <h1
            id="hero-title"
            className="mb-4 max-w-[600px] font-montserrat text-[clamp(2rem,3.45vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#10234b] motion-safe:animate-[heroReveal_850ms_cubic-bezier(0.22,1,0.36,1)_120ms_both] max-[767px]:mb-3 max-[420px]:text-[clamp(1.65rem,8vw,2.15rem)]"
          >
            Digital Solutions
            <br />
            for Businesses in
            <br />
            <span className="bg-gradient-to-r from-[#092f58] via-[#2563eb] to-[#5882E8] bg-clip-text text-transparent">
              Worldwide
            </span>
          </h1>

          {/* Description */}
          <p className="mb-5 max-w-[490px] font-inter text-xs leading-[1.8] text-slate-700 motion-safe:animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_240ms_both] max-[767px]:mb-4 max-[767px]:text-[13px] max-[420px]:text-[12px] max-[420px]:leading-[1.65]">
            We help startups and businesses build modern websites, mobile apps,
            AI agents, chatbots, SaaS platforms and automation solutions with
            reliable support and on-time delivery.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 motion-safe:animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_340ms_both] max-[420px]:gap-2">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-xl border border-[#092f58] bg-[#092f58] px-6 font-inter text-xs font-bold uppercase tracking-wide text-white no-underline shadow-[0_6px_18px_rgba(9,47,88,0.18)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:border-[#5882E8] hover:bg-[#5882E8] hover:shadow-[0_12px_28px_rgba(88,130,232,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5882E8] motion-reduce:transition-none max-[420px]:min-h-10 max-[420px]:gap-2 max-[420px]:rounded-lg max-[420px]:px-3 max-[420px]:text-[10px]"
            >
              Get a Quote
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
              />
            </a>

            <a
              href="#portfolio"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white/95 px-6 font-inter text-xs font-bold text-[#092f58] no-underline shadow-sm transition-[transform,box-shadow,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-[#5882E8] hover:bg-[#f0f5ff] hover:shadow-[0_10px_24px_rgba(9,47,88,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5882E8] motion-reduce:transition-none max-[420px]:min-h-10 max-[420px]:rounded-lg max-[420px]:px-3 max-[420px]:text-[10px]"
            >
              View Our Work
            </a>
          </div>

          {/* Trust information: three columns on every screen */}
          <div className="hero-trust-grid mt-7 grid grid-cols-3 gap-4 max-[767px]:mt-5 max-[767px]:gap-2 max-[420px]:gap-1">
            {trustItems.map(({ title, description, Icon }, index) => (
              <div
                key={title}
                style={{
                  animationDelay: `${450 + index * 140}ms`,
                }}
                className="flex min-w-0 items-start gap-2.5 motion-safe:animate-[heroReveal_750ms_cubic-bezier(0.22,1,0.36,1)_both] max-[767px]:gap-1.5"
              >
                <Icon
                  size={23}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#2580ff] sm:h-7 sm:w-7 max-[420px]:h-4 max-[420px]:w-4"
                />

                <div className="min-w-0">
                  <p className="font-roboto-condensed text-[12px] font-bold leading-snug text-[#092f58] sm:text-sm max-[420px]:text-[8px]">
                    {title}
                  </p>

                  <p className="mt-1 font-inter text-[10px] leading-relaxed text-slate-600 sm:text-xs max-[420px]:mt-0.5 max-[420px]:text-[7px] max-[420px]:leading-tight">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Country flags: remain in a single row on mobile */}
          <div
            className="hero-country-flags mt-7 flex flex-nowrap items-center gap-2 motion-safe:animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_650ms_both] max-[767px]:mt-4"
            aria-label="Countries served"
          >
            {countries.map(({ name, flag }, index) => (
              <span
                key={name}
                title={name}
                style={
                  {
                    "--flag-delay": `${index * 100}ms`,
                  } as CSSProperties
                }
                className="hero-country-flag inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_2px_8px_rgba(9,47,88,0.18)] ring-1 ring-slate-200 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-[0_8px_18px_rgba(88,130,232,0.28)] motion-reduce:animate-none max-[767px]:h-7 max-[767px]:w-7 max-[420px]:h-5 max-[420px]:w-5 sm:h-10 sm:w-10"
              >
                <img
                  src={flag}
                  alt={`${name} flag`}
                  width={40}
                  height={40}
                  loading="eager"
                  decoding="async"
                  className="block h-full w-full rounded-full object-cover"
                />
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: World map and profile illustration */}
        <div className="relative z-10 flex min-w-0 items-center justify-center motion-safe:animate-[heroVisualReveal_1100ms_cubic-bezier(0.22,1,0.36,1)_180ms_both] max-[767px]:mt-0">
          <div className="w-full max-w-[650px]">
            <WorldMapIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
