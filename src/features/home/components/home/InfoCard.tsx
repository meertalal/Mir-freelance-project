import type { LucideIcon } from "lucide-react";
import type {InfoCardProps} from "../../types/hero.types";

export default function FloatingInfoCard({
  title,
  subtitle,
  Icon,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={`group relative flex w-max max-w-[155px] items-center gap-2 rounded-xl border-0 bg-white/95 px-2 py-2 outline-none ring-0 backdrop-blur-md transition-[box-shadow,background-color] duration-300 hover:bg-white hover:shadow-[0_14px_35px_rgba(37,99,235,0.20)] sm:max-w-none sm:gap-3 sm:px-3 sm:py-3 motion-reduce:transition-none ${className}`}
    >
      {/* Soft blue ambient glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-blue-400/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Icon container */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50 text-blue-600 transition-[background-color,transform,color] duration-300 group-hover:scale-105 group-hover:bg-[#092f58] group-hover:text-white sm:h-10 sm:w-10 sm:rounded-xl motion-reduce:transition-none">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />

        <Icon
          size={19}
          strokeWidth={2}
          aria-hidden="true"
          className="relative z-10 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
        />
      </div>

      {/* Card text */}
      <div className="min-w-0">
        <p className="whitespace-nowrap text-[11px] font-bold text-[#102f59] transition-colors duration-300 group-hover:text-blue-700 sm:text-sm">
          {title}
        </p>

        <p className="whitespace-nowrap text-[9px] text-slate-500 sm:text-xs">
          {subtitle}
        </p>
      </div>
    </div>
  );
}