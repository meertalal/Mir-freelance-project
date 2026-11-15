import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import HeroShowcase from "./HeroShowcase";
import { trustItems } from "../../data/hero.data";
import { useCountryMarkets } from "../../../countries/useCountryMarkets";

export default function HeroSection() {
  const countries = useCountryMarkets().filter((country) => country.show_in_hero);
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="hero-section relative isolate w-full overflow-hidden bg-[#F6FAFF]"
    >
      <div
        aria-hidden="true"
        className="hero-background pointer-events-none absolute inset-0 z-0 bg-[url(/image/home-hero/global-connections-world-map.webp)] bg-cover bg-center bg-no-repeat motion-safe:animate-[heroBackground_24s_ease-in-out_infinite_alternate]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(247,250,255,0.96)_0%,rgba(247,250,255,0.88)_34%,rgba(247,250,255,0.4)_62%,rgba(247,250,255,0.06)_100%)] max-[1279px]:bg-[linear-gradient(180deg,rgba(247,250,255,0.94)_0%,rgba(247,250,255,0.82)_55%,rgba(247,250,255,0.68)_100%)]"
      />
      <div
        aria-hidden="true"
        className="hero-ambient-glow pointer-events-none absolute -right-16 top-12 z-[1] h-64 w-64 rounded-full bg-blue-300/20 blur-3xl sm:h-72 sm:w-72 2xl:h-96 2xl:w-96"
      />
      <div
        className={[
          "relative z-10 mx-auto grid w-[calc(100%-3rem)]",
          "max-w-[1248px] grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]",
          "items-center gap-6 py-10",
          "xl:min-h-[calc(100svh-76px)]",
          "xl:max-w-[1360px] xl:gap-8 xl:py-[clamp(2rem,5vh,4rem)]",
          "2xl:w-[calc(100%-5rem)] 2xl:max-w-[1680px]",
          "2xl:min-h-[calc(100svh-80px)] 2xl:gap-12",
          "min-[1920px]:w-[calc(100%-6rem)]",
          "min-[1920px]:max-w-[2000px]",
          "min-[1920px]:min-h-[calc(100svh-92px)]",
          "min-[1920px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
          "min-[1920px]:gap-16",
          "min-[1920px]:py-[clamp(2.5rem,6vh,5.5rem)]",
          "min-[2560px]:w-[calc(100%-10rem)]",
          "min-[2560px]:max-w-[2400px]",
          "min-[2560px]:min-h-[calc(100svh-104px)]",
          "min-[2560px]:gap-24",
          "max-[1279px]:min-h-0",
          "max-[767px]:w-[calc(100%-2rem)]",
          "max-[1279px]:grid-cols-1 max-[1279px]:gap-4 max-[1279px]:py-6",
          "max-[767px]:gap-2 max-[767px]:py-5",
          "max-[420px]:w-[calc(100%-1.5rem)]",
        ].join(" ")}
      >
        <div className="relative z-10 min-w-0 xl:py-4 2xl:py-6 min-[1920px]:py-8 min-[2560px]:py-10">
          <div className="mb-5 motion-safe:animate-[heroReveal_700ms_cubic-bezier(0.22,1,0.36,1)_both] 2xl:mb-6 max-[767px]:mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D6E4F7] bg-white/90 px-3.5 py-1.5 shadow-[0_4px_16px_rgba(15,48,91,0.06)] backdrop-blur-sm">
              <Sparkles size={14} aria-hidden="true" className="text-[#1670F5]" />
              <span className="font-playfair text-[10px] font-semibold uppercase tracking-[0.16em] text-[#092f58] sm:text-[11px]">
                Software Development · AI · Automation
              </span>
            </span>
          </div>

          <h1
            id="hero-title"
            className={[
              "mb-4 max-w-[620px] font-montserrat font-bold",
              "text-[clamp(2.05rem,3.3vw,3rem)] leading-[1.05]",
              "tracking-[-0.035em] text-[#10234b]",
              "motion-safe:animate-[heroReveal_850ms_cubic-bezier(0.22,1,0.36,1)_120ms_both]",
              "2xl:max-w-[800px]",
              "2xl:text-[clamp(3.2rem,3.3vw,4.1rem)]",
              "min-[1920px]:max-w-[940px]",
              "min-[1920px]:text-[clamp(3.9rem,3.1vw,5.1rem)]",
              "min-[2560px]:max-w-[1120px]",
              "min-[2560px]:text-[5.6rem]",
              "max-[767px]:mb-3",
              "max-[420px]:text-[clamp(1.7rem,8vw,2.2rem)]",
            ].join(" ")}
          >
            Digital Solutions
            <br />
            for Businesses
            <br />
            <span className="bg-[linear-gradient(180deg,transparent_87%,rgba(37,99,235,0.22)_87%)] text-[#2563eb]">
              Worldwide
            </span>
          </h1>
          <p
            className={[
              "mb-5 max-w-[500px] font-inter text-xs",
              "leading-[1.8] text-slate-700",
              "motion-safe:animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_240ms_both]",
              "2xl:mb-6 2xl:max-w-[650px] 2xl:text-base",
              "min-[1920px]:max-w-[770px] min-[1920px]:text-lg min-[1920px]:leading-8",
              "min-[2560px]:max-w-[900px] min-[2560px]:text-xl min-[2560px]:leading-9",
              "max-[767px]:mb-4 max-[767px]:text-[13px]",
              "max-[420px]:text-[12px] max-[420px]:leading-[1.65]",
            ].join(" ")}
          >
            We help startups and businesses build modern websites, mobile apps
            and automation solutions, backed by reliable support and on-time
            delivery.
          </p>

          <div className="flex flex-wrap items-center gap-3 motion-safe:animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_340ms_both] 2xl:gap-4 max-[420px]:gap-2">
            <Link
              to="/contact"
              className={[
                "group inline-flex min-h-12 items-center justify-center gap-4",
                "rounded-xl border border-[#092f58] bg-[#092f58] px-6",
                "font-inter text-xs font-bold uppercase tracking-wide text-white",
                "no-underline shadow-[0_6px_18px_rgba(9,47,88,0.18)]",
                "transition-[transform,box-shadow,background-color] duration-300",
                "hover:-translate-y-1 hover:border-[#5882E8]",
                "hover:bg-[#5882E8] hover:shadow-[0_12px_28px_rgba(88,130,232,0.35)]",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-[#5882E8] motion-reduce:transition-none",
                "2xl:min-h-14 2xl:px-8 2xl:text-sm",
                "min-[1920px]:min-h-16 min-[1920px]:px-10 min-[1920px]:text-base",
                "min-[2560px]:min-h-[4.25rem] min-[2560px]:px-12 min-[2560px]:text-lg",
                "max-[420px]:min-h-11 max-[420px]:gap-2",
                "max-[420px]:rounded-lg max-[420px]:px-3 max-[420px]:text-[11px]",
              ].join(" ")}
            >
              Get a Quote
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
              />
            </Link>
            <Link
              to="/portfolio"
              className={[
                "inline-flex min-h-12 items-center justify-center rounded-xl",
                "border border-slate-200 bg-white/95 px-6",
                "font-inter text-xs font-bold text-[#092f58] no-underline",
                "shadow-sm transition-[transform,box-shadow,background-color,border-color] duration-300",
                "hover:-translate-y-1 hover:border-[#5882E8]",
                "hover:bg-[#f0f5ff] hover:shadow-[0_10px_24px_rgba(9,47,88,0.12)]",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-[#5882E8] motion-reduce:transition-none",
                "2xl:min-h-14 2xl:px-8 2xl:text-sm",
                "min-[1920px]:min-h-16 min-[1920px]:px-10 min-[1920px]:text-base",
                "min-[2560px]:min-h-[4.25rem] min-[2560px]:px-12 min-[2560px]:text-lg",
                "max-[420px]:min-h-11 max-[420px]:rounded-lg",
                "max-[420px]:px-3 max-[420px]:text-[11px]",
              ].join(" ")}
            >
              View Our Work
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-inter text-xs text-slate-600 motion-safe:animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_420ms_both] 2xl:mt-6 2xl:text-sm max-[420px]:text-[11px]">
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
          <div className="hero-trust-grid mt-6 grid grid-cols-3 gap-2 sm:gap-3 2xl:mt-8 2xl:gap-4 min-[1920px]:gap-6 max-[767px]:mt-5 max-[767px]:gap-2 max-[420px]:gap-1">
            {trustItems.map(({ title, description, Icon }, index) => (
              <div
                key={title}
                style={{ animationDelay: 450 + index * 140 + "ms" }}
                className="flex min-w-0 items-start gap-2 rounded-xl border border-white/80 bg-white/70 px-2.5 py-2.5 shadow-[0_6px_18px_rgba(15,48,91,0.05)] backdrop-blur-sm motion-safe:animate-[heroReveal_750ms_cubic-bezier(0.22,1,0.36,1)_both] 2xl:gap-3 2xl:px-4 2xl:py-3 max-[420px]:gap-1.5 max-[420px]:px-2 max-[420px]:py-2">
                <Icon
                  size={22}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#2580ff] sm:h-6 sm:w-6 2xl:h-7 2xl:w-7 max-[420px]:h-4 max-[420px]:w-4"
                />
                <div className="min-w-0">
                  <p className="font-roboto-condensed text-xs font-bold leading-snug text-[#092f58] sm:text-sm 2xl:text-base">
                    {title}
                  </p>
                  <p className="mt-0.5 font-inter text-[10px] leading-relaxed text-slate-500 sm:text-xs 2xl:text-sm">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 motion-safe:animate-[heroReveal_800ms_cubic-bezier(0.22,1,0.36,1)_650ms_both] 2xl:mt-8 2xl:gap-x-4 max-[767px]:mt-4">
            <span className="font-inter text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Clients in
            </span>
            <div className="hero-country-flags" aria-label="Countries served">
              {countries.map(({ name, flag_image: flag }, index) => (
                <span
                  key={name}
                  title={name}
                  style={
                    {
                      "--flag-delay": index * 100 + "ms",
                    } as CSSProperties
                  }
                  className="hero-country-flag inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_2px_8px_rgba(9,47,88,0.18)] ring-1 ring-slate-200 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-[0_8px_18px_rgba(88,130,232,0.28)] motion-reduce:animate-none max-[767px]:h-7 max-[767px]:w-7 max-[420px]:h-6 max-[420px]:w-6 sm:h-10 sm:w-10 2xl:h-11 2xl:w-11"
                >
                  <img
                    src={flag}
                    alt={name + " flag"}
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
        </div>
        <div className="relative z-10 flex min-w-0 items-center justify-center motion-safe:animate-[heroVisualReveal_1100ms_cubic-bezier(0.22,1,0.36,1)_180ms_both] max-[1279px]:mt-8 max-[767px]:mt-4">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
