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
    <div className="mb-5 flex flex-col items-center gap-4 text-center">
      {/* Eyebrow and action button */}
      <div className="relative flex w-full items-center justify-center">
        {/* Centered eyebrow with decorative lines */}
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-10 shrink-0 bg-[#092F58]"
          />

          <p className="whitespace-nowrap font-playfair text-xs font-bold uppercase tracking-[0.16em] text-[#092F58] sm:text-base">
            {eyebrow}
          </p>

          <span
            aria-hidden="true"
            className="h-px w-10 shrink-0 bg-[#092F58]"
          />
        </div>

        {/* Action button positioned at the top-right */}
        {actionLabel && (
          <a
            href={actionHref}
            className="absolute right-0 inline-flex shrink-0 items-center justify-center gap-2 font-playfair text-xs font-semibold text-[#092F58] transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            {actionLabel}

            <ArrowRight size={18} aria-hidden="true" />
          </a>
        )}
      </div>

      {/* Centered main heading */}
      <div className="flex w-full flex-col items-center">
        <h2 className="font-playfair text-2xl font-bold leading-tight tracking-tight text-[#0b1d43] sm:text-[30px]">
          {title}
        </h2>

        {/* Centered description */}
        <p className="mx-auto mt-1.5 max-w-xl font-inter text-xs leading-relaxed text-slate-500 sm:text-[13px]">
          {description}
        </p>
      </div>
    </div>
  );
}