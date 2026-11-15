import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ServiceCardProps } from "../../types/services.types";

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link
      to={service.href}
      aria-label={`View ${service.title}`}
      className="
        group flex h-full items-start gap-3.5
        rounded-2xl border border-[#DCE8F8] bg-white p-4
        shadow-[0_4px_18px_rgba(15,48,91,0.04)]
        transition-[transform,box-shadow,border-color]
        duration-300 ease-out
        hover:-translate-y-1
        hover:border-[#B7D3F7]
        hover:shadow-[0_16px_36px_rgba(37,99,235,0.12)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#5882E8] focus-visible:ring-offset-2
        sm:items-center sm:gap-4 sm:p-5
        xl:p-5
      "
    >
      <span
        className="
          inline-flex h-12 w-12 shrink-0 items-center justify-center
          rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#D8E8FF]
          text-[#1670F5] ring-1 ring-[#D6E4F7]
          transition-colors duration-300
          group-hover:from-[#1670F5] group-hover:to-[#0F5FD4]
          group-hover:text-white group-hover:ring-[#1670F5]
          xl:h-13 xl:w-13
        "
      >
        <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <h3 className="font-montserrat text-[15px] font-bold leading-snug text-[#10234B] transition-colors duration-300 group-hover:text-[#174A91] sm:text-base">
          {service.title}
        </h3>
        <p className="mt-1 font-inter text-xs leading-relaxed text-[#526580] sm:text-[13px]">
          {service.description}
        </p>
      </span>

      <ArrowRight
        aria-hidden="true"
        size={16}
        className="mt-1 h-4 w-4 shrink-0 text-[#9CB4D4] transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-[#1670F5] sm:mt-0"
      />
    </Link>
  );
}
