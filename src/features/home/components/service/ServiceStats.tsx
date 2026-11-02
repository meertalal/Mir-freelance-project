import type { CSSProperties } from "react";
import type { ServiceStatsProps } from "../../types/services.types";

export default function ServiceStats({
  stats,
}: ServiceStatsProps) {
  return (
    <div
      className="
        service-stats grid grid-cols-2 overflow-hidden
        rounded-xl border border-[#D2E2F8]
        bg-[#DFEBFF]
        sm:grid-cols-4
        xl:rounded-2xl
        2xl:rounded-3xl
      "
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            style={
              {
                "--stat-delay": `${index * 120}ms`,
              } as CSSProperties
            }
            className={`
              service-stat-item group flex min-w-0 items-center gap-2
              px-2.5 py-3
              transition-colors duration-300 hover:bg-white/60
              motion-safe:animate-service-reveal
              min-[480px]:gap-3 min-[480px]:px-3
              sm:justify-center sm:px-4 sm:py-5
              xl:gap-4 xl:px-5 xl:py-6
              2xl:gap-5 2xl:px-7 2xl:py-8
              min-[1920px]:px-9 min-[1920px]:py-10
              ${
                index % 2 === 0
                  ? "border-r border-[#D2E2F8] sm:border-r-0"
                  : ""
              }
              ${
                index < 2
                  ? "border-b border-[#D2E2F8] sm:border-b-0"
                  : ""
              }
              ${
                index !== stats.length - 1
                  ? "sm:border-r sm:border-[#D2E2F8]"
                  : ""
              }
            `}
          >
            {/* Statistics icon */}
            <div
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-xl border border-[#D1E2FF] bg-[#DCE9FF]
                transition-[transform,box-shadow] duration-300
                group-hover:scale-110
                group-hover:shadow-[0_4px_14px_rgba(22,112,245,0.16)]
                min-[480px]:h-10 min-[480px]:w-10
                sm:h-11 sm:w-11
                xl:h-12 xl:w-12
                2xl:h-14 2xl:w-14
                min-[1920px]:h-16 min-[1920px]:w-16
              "
            >
              <Icon
                aria-hidden="true"
                className="
                  h-5 w-5 text-[#1670F5]
                  transition-transform duration-300
                  group-hover:scale-110
                  sm:h-[22px] sm:w-[22px]
                  xl:h-6 xl:w-6
                  2xl:h-7 2xl:w-7
                "
                strokeWidth={2.4}
              />
            </div>

            {/* Statistics text */}
            <div className="min-w-0">
              <p
                className="
                  font-lato text-lg font-bold
                  leading-tight tracking-tight text-[#10234B]
                  min-[480px]:text-xl sm:text-2xl
                  xl:text-3xl
                  2xl:text-4xl
                  min-[1920px]:text-5xl
                "
              >
                {stat.value}
              </p>

              <p
                className="
                  mt-1 font-inter text-[10px] leading-4
                  text-[#526580]
                  min-[480px]:text-[11px] sm:text-xs
                  xl:text-sm
                  2xl:text-base 2xl:leading-6
                  min-[1920px]:text-lg
                "
              >
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}