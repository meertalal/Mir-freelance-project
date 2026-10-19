import type { CSSProperties } from "react";
import type { ServiceStat } from "../types/services.types";

interface ServiceStatsProps {
  stats: ServiceStat[];
}

export default function ServiceStats({
  stats,
}: ServiceStatsProps) {
  return (
    <div
      className="
        service-stats grid grid-cols-2 overflow-hidden
        rounded-xl border border-[#D2E2F8]
        bg-gradient-to-r
        from-[#DFEBFF] via-[#F5F8FF] to-[#DFEBFF]
        sm:grid-cols-4
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
              "
            >
              <Icon
                aria-hidden="true"
                className="
                  h-5 w-5 text-[#1670F5]
                  transition-transform duration-300
                  group-hover:scale-110
                  sm:h-[22px] sm:w-[22px]
                "
                strokeWidth={2.4}
              />
            </div>

            {/* Statistics text */}
            <div className="min-w-0">
              <p
                className="
                  font-playfair text-lg font-bold
                  leading-tight tracking-tight text-[#10234B]
                  min-[480px]:text-xl sm:text-2xl
                "
              >
                {stat.value}
              </p>

              <p
                className="
                  mt-1 font-inter text-[10px] leading-4
                  text-[#526580]
                  min-[480px]:text-[11px] sm:text-xs
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
