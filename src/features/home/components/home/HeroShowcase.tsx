import type { CSSProperties } from "react";
import FloatingInfoCard from "./InfoCard";
import {
  floatingCards,
  floatingCardIcons,
} from "../../data/hero.data";

export default function HeroShowcase() {
  return (
    <div
      className={[
        "relative mx-auto w-full max-w-[520px]",
        "px-5 pb-4 sm:px-8 xl:max-w-[540px] 2xl:max-w-[600px]",
        "min-[1920px]:max-w-[660px] min-[2560px]:max-w-[760px]",
        "max-[767px]:px-3",
      ].join(" ")}
      aria-label="Mir Talal, freelance web and AI developer"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/30 blur-3xl motion-safe:animate-float-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 -z-10 rounded-[38px] border border-dashed border-[#AFCBF0]/70 sm:-inset-4 sm:rounded-[46px]"
      />
      <div
        className={[
          "relative overflow-hidden rounded-[26px] border border-white/80",
          "bg-white/85 p-2 shadow-[0_24px_70px_rgba(15,48,91,0.18)]",
          "backdrop-blur-sm sm:rounded-[34px] sm:p-2.5",
        ].join(" ")}
      >
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[27px]">
          <img
            src="/image/profile.webp"
            alt="Mir Talal, freelance web and AI developer"
            width={900}
            height={1125}
            fetchPriority="high"
            className="block aspect-[4/5] w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,47,88,0)_42%,rgba(9,47,88,0.5)_72%,rgba(9,47,88,0.9)_100%)]"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f2c56] shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:text-[11px]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </span>
          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4">
            <p className="font-montserrat text-base font-bold text-white sm:text-lg">
              Mir Talal
            </p>
            <p className="mt-0.5 font-inter text-[11px] text-blue-50/90 sm:text-xs">
              Freelance Web &amp; AI Developer
            </p>
          </div>
        </div>
      </div>
      {floatingCards.map((card, index) => {
        const Icon = floatingCardIcons[card.icon];

        const entranceStyle = {
          "--card-delay": 350 + index * 220 + "ms",
          "--float-delay": index * -1.2 + "s",
        } as CSSProperties;

        return (
          <div
            key={card.title}
            style={entranceStyle}
            className={"info-card-entrance absolute z-20 border-0 outline-none ring-0 " + card.className}
          >
            <div className="info-card-float">
              <FloatingInfoCard
                title={card.title}
                subtitle={card.subtitle}
                Icon={Icon}
                className={[
                  "!static !z-auto !gap-2 !rounded-xl",
                  "!border-0 !px-2 !py-2",
                  "shadow-[0_8px_24px_rgba(15,48,91,0.12)]",
                  "transition-shadow duration-300",
                  "hover:shadow-[0_14px_32px_rgba(37,99,235,0.22)]",
                  "sm:!gap-3 sm:!px-3 sm:!py-3",
                  "2xl:!gap-3 2xl:!px-4 2xl:!py-3",
                  "min-[1920px]:!gap-4 min-[1920px]:!px-5 min-[1920px]:!py-4",
                ].join(" ")}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
