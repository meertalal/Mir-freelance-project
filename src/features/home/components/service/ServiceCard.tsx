import { ArrowRight, ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { ServiceCardProps } from "../../types/services.types";

export default function ServiceCard({
  service,
  index = 0,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article
      style={
        {
          "--service-delay": `${index * 100}ms`,
        } as CSSProperties
      }
      className="
        service-card group relative flex h-full min-w-0
        flex-row items-center gap-3
        overflow-hidden rounded-2xl border border-[#D6E4F7] bg-white
        p-3
        shadow-[0_5px_22px_rgba(23,61,112,0.055)]
        transition-[transform,box-shadow,border-color]
        duration-500 ease-out
        motion-safe:animate-service-reveal
        hover:-translate-y-1
        hover:border-[#9FC3FF]
        hover:shadow-[0_18px_40px_rgba(37,99,235,0.13)]
        min-[480px]:p-4
        md:gap-4 md:p-5 md:pr-28
        xl:flex-col xl:items-stretch xl:gap-0
        xl:rounded-xl xl:p-6 xl:pr-6
        2xl:rounded-2xl 2xl:p-7
        min-[1920px]:p-8
        min-[2560px]:p-9
      "
    >
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          -translate-x-full bg-gradient-to-r
          from-transparent via-[#EAF2FF]/60 to-transparent
          opacity-0 transition-all duration-700
          group-hover:translate-x-full
          group-hover:opacity-100
        "
      />

      <div
        className="
          service-icon relative z-10 flex h-11 w-11 shrink-0
          items-center justify-center rounded-xl
          border border-[#D5E5FF]
          bg-gradient-to-br from-[#EAF2FF] to-[#D9E8FF]
          transition-[transform,background-color,box-shadow]
          duration-500 ease-out
          group-hover:scale-110
          group-hover:shadow-[0_5px_16px_rgba(22,112,245,0.16)]
          min-[480px]:h-12 min-[480px]:w-12
          md:h-14 md:w-14
          xl:mb-4 xl:h-12 xl:w-12
          2xl:mb-4 2xl:h-14 2xl:w-14
        "
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5 text-[#1670F5] sm:h-6 sm:w-6 2xl:h-6 2xl:w-6"
          strokeWidth={2.4}
        />
      </div>

      <div className="relative z-10 min-w-0 flex-1 xl:flex xl:h-full xl:flex-col">
        <h3
          className="
            font-georgia text-sm font-bold
            leading-snug tracking-tight text-[#10234B]
            transition-colors duration-300
            group-hover:text-[#174A91]
            md:text-base
            xl:mb-2 xl:text-lg
            2xl:mb-3 2xl:text-xl
            min-[2560px]:text-2xl
          "
        >
          {service.title}
        </h3>

        <p
          className="
            mt-1 font-inter text-[11px] leading-[1.55]
            text-[#526580]
            md:text-xs
            xl:mb-4 xl:text-sm
            2xl:mb-5 2xl:text-base 2xl:leading-7
            min-[2560px]:text-lg min-[2560px]:leading-8
          "
        >
          {service.description}
        </p>

        <a
          href={service.href}
          aria-label={`Learn more about ${service.title}`}
          className="
            mt-2 inline-flex w-fit items-center gap-1.5
            font-poppins text-[11px] font-semibold text-[#1670F5]
            transition-colors duration-300 hover:text-[#0f5fd4]
            md:absolute md:right-5 md:top-1/2 md:mt-0 md:-translate-y-1/2
            md:text-[#092F58] md:text-xs
            xl:static xl:mt-auto xl:translate-y-0 xl:text-sm
            2xl:text-base
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#5882E8] focus-visible:ring-offset-2
          "
        >
          Learn More

          <ArrowRight
            aria-hidden="true"
            className="
              h-3.5 w-3.5 shrink-0
              transition-transform duration-300 ease-out
              group-hover:translate-x-1
              2xl:h-4 2xl:w-4
            "
          />
        </a>
      </div>

      <ChevronRight
        aria-hidden="true"
        className="relative z-10 h-5 w-5 shrink-0 text-slate-300 md:hidden"
      />
    </article>
  );
}
