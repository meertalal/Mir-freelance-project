import type { InfoCardProps } from "../../types/hero.types";

export default function FloatingInfoCard({
  title,
  subtitle,
  Icon,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={[
        "group relative flex w-max max-w-[155px] items-center gap-2",
        "rounded-xl border-0 bg-white/95 px-2 py-2",
        "outline-none ring-0 backdrop-blur-md",
        "transition-[box-shadow,background-color] duration-300",
        "hover:bg-white hover:shadow-[0_14px_35px_rgba(37,99,235,0.20)]",
        "sm:max-w-none sm:gap-3 sm:px-3 sm:py-3",
        "2xl:gap-3 2xl:px-4 2xl:py-3",
        "min-[1920px]:gap-4 min-[1920px]:px-5 min-[1920px]:py-4",
        "motion-reduce:transition-none",
        className,
      ].join(" ")}
    >
      {/* Ambient glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-blue-400/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Icon */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50 text-blue-600 transition-[background-color,transform,color] duration-300 group-hover:scale-105 group-hover:bg-[#092f58] group-hover:text-white sm:h-10 sm:w-10 sm:rounded-xl 2xl:h-11 2xl:w-11 min-[1920px]:h-12 min-[1920px]:w-12 motion-reduce:transition-none">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full"
        />

        <Icon
          size={19}
          strokeWidth={2}
          aria-hidden="true"
          className="relative z-10 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 motion-reduce:transition-none"
        />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="whitespace-nowrap text-[11px] font-bold text-[#102f59] transition-colors duration-300 group-hover:text-blue-700 sm:text-sm 2xl:text-base min-[1920px]:text-lg">
          {title}
        </p>

        <p className="whitespace-nowrap text-[9px] text-slate-500 sm:text-xs 2xl:text-sm min-[1920px]:text-base">
          {subtitle}
        </p>
      </div>
    </div>
  );
}