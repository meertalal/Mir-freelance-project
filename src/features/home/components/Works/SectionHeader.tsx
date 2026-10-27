import { ArrowRight } from "lucide-react";
import type { SectionHeaderProps } from "../../types/works.types";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref = "#",
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex w-full flex-col items-center gap-3 text-center sm:mb-10 lg:mb-12">
      {/* Eyebrow and action link */}
      <div className="relative flex min-h-6 w-full items-center justify-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <span
            aria-hidden="true"
            className="h-px w-4 shrink-0 bg-[#092F58] sm:w-10"
          />
          <p className="whitespace-nowrap font-playfair text-[8px] font-bold uppercase tracking-[0.1em] text-[#092F58] sm:text-sm sm:tracking-[0.16em] lg:text-base">
            {eyebrow}
          </p>
          <span
            aria-hidden="true"
            className="h-px w-4 shrink-0 bg-[#092F58] sm:w-10"
          />
        </div>

        {actionLabel && (
          <a
            href={actionHref}
            className="
              group absolute right-0 top-1/2 inline-flex
              -translate-y-1/2 items-center gap-0.5
              whitespace-nowrap font-playfair text-[7px]
              font-semibold text-[#092F58]
              transition-colors duration-300 hover:text-[#5882E8]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#5882E8] focus-visible:ring-offset-2
              sm:gap-1.5 sm:text-xs lg:text-sm
            "
          >
            {actionLabel}
            <ArrowRight
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
            />
          </a>
        )}
      </div>

      {/* Heading and description */}
      <div className="flex w-full flex-col items-center">
        <h2 className="font-montserrat text-lg font-bold leading-tight tracking-tight text-[#10234b] sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-1 max-w-2xl font-inter text-[9px] leading-relaxed text-[#256580] sm:mt-3 sm:text-sm lg:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}