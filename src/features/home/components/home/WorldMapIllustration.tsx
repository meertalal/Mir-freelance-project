import type { CSSProperties } from "react";
import FloatingInfoCard from "././InfoCard";
import {floatingCards, floatingCardIcons,} from "../../data/hero.data";

export default function WorldMapIllustration() {
  return (
    <div
      className="world-map-illustration relative isolate mx-auto w-full max-w-3xl border-0 py-12 outline-none ring-0 max-[767px]:py-1 max-[420px]:py-0"
      aria-label="Global technology services and project experience"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="world-map-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/30 opacity-70 blur-3xl"
      />

      {/* Profile image */}
      <div className="world-map-profile group relative z-10 mx-auto mt-28 w-[76%] overflow-hidden rounded-2xl border-0 bg-white/70 shadow-[0_20px_60px_rgba(15,48,91,0.14)] outline-none ring-0 transition-shadow duration-500 hover:shadow-[0_28px_70px_rgba(37,99,235,0.22)] sm:mt-36 sm:w-[74%] sm:rounded-3xl max-[767px]:mt-3 max-[767px]:w-[88%] max-[420px]:mt-2">
        {/* Image highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-1 ring-inset ring-white/30 sm:rounded-3xl"
        />

        <img
          src="/image/profile.webp"
          alt="Professional workspace representing web development and digital solutions"
          className="block aspect-[4/3] h-auto w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035] sm:aspect-[3/2] motion-reduce:transition-none"
          width={900}
          height={600}
          fetchPriority="high"
        />

        {/* Subtle image shimmer */}
        <div
          aria-hidden="true"
          className="world-map-image-shimmer pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent motion-reduce:animate-none"
        />
      </div>

      {/* Floating information cards */}
      {floatingCards.map((card, index) => {
        const Icon = floatingCardIcons[card.icon];

        const entranceStyle = {
          "--card-delay": `${350 + index * 220}ms`,
          "--float-delay": `${index * -1.2}s`,
        } as CSSProperties;

        return (
          <div
            key={card.title}
            style={entranceStyle}
            className={`info-card-entrance absolute z-20 border-0 outline-none ring-0 ${card.className}`}
          >
            <div className="info-card-float">
              <FloatingInfoCard
                title={card.title}
                subtitle={card.subtitle}
                Icon={Icon}
                className="!static !z-auto !gap-2 !rounded-xl !border-0 !px-2 !py-2 shadow-[0_8px_24px_rgba(15,48,91,0.12)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(37,99,235,0.22)] sm:!gap-3 sm:!px-3 sm:!py-3"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
