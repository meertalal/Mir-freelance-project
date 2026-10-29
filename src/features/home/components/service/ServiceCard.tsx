import { ArrowRight } from "lucide-react";
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
        service-card group relative flex h-full min-w-0 flex-col
        overflow-hidden rounded-xl border border-[#D6E4F7] bg-white
        p-3 min-[480px]:p-4 sm:p-5
        lg:p-5 xl:p-6 2xl:p-7
        min-[1920px]:p-8 min-[2560px]:p-9
        shadow-[0_5px_22px_rgba(23,61,112,0.055)]
        transition-[transform,box-shadow,border-color]
        duration-500 ease-out
        motion-safe:animate-service-reveal
        hover:-translate-y-1.5
        hover:border-[#9FC3FF]
        hover:shadow-[0_18px_40px_rgba(37,99,235,0.13)]
        focus-within:border-[#9FC3FF]
        focus-within:shadow-[0_12px_30px_rgba(37,99,235,0.10)]
        2xl:rounded-2xl
      "
    >
      {/* Animated light sweep */}
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

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Icon */}
        <div
          className="
            service-icon mb-2.5 flex h-9 w-9 shrink-0
            items-center justify-center rounded-xl
            border border-[#D5E5FF]
            bg-gradient-to-br from-[#EAF2FF] to-[#D9E8FF]
            transition-[transform,background-color,box-shadow]
            duration-500 ease-out
            group-hover:scale-110
            group-hover:rotate-3
            group-hover:shadow-[0_5px_16px_rgba(22,112,245,0.16)]
            min-[480px]:h-10 min-[480px]:w-10
            sm:mb-3 sm:h-11 sm:w-11
            xl:h-12 xl:w-12
            2xl:mb-4 2xl:h-14 2xl:w-14
          "
        >
          <Icon
            aria-hidden="true"
            className="
              h-[18px] w-[18px] text-[#1670F5]
              transition-transform duration-500 ease-out
              group-hover:scale-110
              sm:h-5 sm:w-5
              2xl:h-6 2xl:w-6
            "
            strokeWidth={2.4}
          />
        </div>

        {/* Title */}
        <h3
          className="
            mb-2 font-georgia text-[13px] font-bold
            leading-snug tracking-tight text-[#10234B]
            transition-colors duration-300
            group-hover:text-[#174A91]
            min-[480px]:text-sm sm:text-base
            xl:text-lg 2xl:mb-3 2xl:text-xl
            min-[2560px]:text-2xl
          "
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="
            mb-3 font-inter text-[11px] leading-[1.6]
            text-[#526580]
            min-[480px]:text-xs sm:mb-4 sm:text-[13px]
            xl:text-sm 2xl:mb-5 2xl:text-base 2xl:leading-7
            min-[2560px]:text-lg min-[2560px]:leading-8
          "
        >
          {service.description}
        </p>

        {/* Learn More */}
        <a
          href={service.href}
          aria-label={`Learn more about ${service.title}`}
          className="
            mt-auto inline-flex w-fit items-center gap-1.5
            font-poppins text-[11px] font-semibold text-[#092F58]
            transition-colors duration-300 hover:text-[#1670F5]
            min-[480px]:text-xs xl:text-sm 2xl:text-base
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
    </article>
  );
}