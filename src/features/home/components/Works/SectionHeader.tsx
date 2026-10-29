
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
    <header
      className="
        mx-auto mb-7 flex w-full flex-col
        sm:mb-10
        lg:mb-12
        2xl:mb-14
        min-[1920px]:mb-16
      "
    >
      {/* Eyebrow and desktop/tablet View All link */}
      <div className="relative flex min-h-6 w-full items-center justify-center">
        <div className="flex min-w-0 items-center justify-center gap-2 sm:gap-3 lg:gap-4">
          <span
            aria-hidden="true"
            className="h-px w-5 shrink-0 bg-[#092F58] sm:w-8 lg:w-10"
          />

          <p
            className="
              whitespace-nowrap font-playfair font-bold uppercase
              tracking-[0.10em] text-[#092F58]
              text-[10px]
              sm:text-xs sm:tracking-[0.14em]
              lg:text-sm
              2xl:text-base
            "
          >
            {eyebrow}
          </p>

          <span
            aria-hidden="true"
            className="h-px w-5 shrink-0 bg-[#092F58] sm:w-8 lg:w-10"
          />
        </div>

        {/* Desktop and tablet link */}
        {actionLabel && (
          <a
            href={actionHref}
            className="
              group absolute right-0 top-1/2
              hidden -translate-y-1/2
              items-center justify-center gap-1.5
              font-playfair text-xs font-semibold text-[#092F58]
              transition-colors duration-300 hover:text-[#5882E8]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#5882E8] focus-visible:ring-offset-4
              sm:inline-flex sm:text-sm
              2xl:text-base
            "
          >
            {actionLabel}

            <ArrowRight
              aria-hidden="true"
              className="
                h-4 w-4 shrink-0
                transition-transform duration-300
                group-hover:translate-x-1
                2xl:h-5 2xl:w-5
              "
            />
          </a>
        )}
      </div>

      {/* Heading and description */}
      <div className="flex w-full flex-col items-center text-center">
        <h2
          className="
            mt-2 max-w-4xl font-montserrat font-bold
            leading-tight tracking-tight text-[#10234b]
            text-2xl
            min-[480px]:text-3xl
            sm:text-3xl
            lg:text-4xl
            xl:text-[42px]
            2xl:text-5xl
            min-[1920px]:text-[52px]
          "
        >
          {title}
        </h2>

        <p
          className="
            mx-auto mt-3 w-full max-w-2xl
            px-1 font-inter leading-6 text-[#526987]
            text-xs
            min-[480px]:text-sm
            lg:mt-4 lg:text-base
            2xl:max-w-3xl 2xl:text-lg 2xl:leading-8
            min-[1920px]:max-w-4xl
          "
        >
          {description}
        </p>

        {/* Mobile link: centered below the description */}
        {actionLabel && (
          <a
            href={actionHref}
            className="
              group mt-3 inline-flex items-center justify-center gap-1.5
              font-playfair text-xs font-semibold text-[#092F58]
              transition-colors duration-300 hover:text-[#5882E8]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#5882E8] focus-visible:ring-offset-4
              sm:hidden
            "
          >
            {actionLabel}

            <ArrowRight
              aria-hidden="true"
              className="
                h-4 w-4 shrink-0
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        )}
      </div>
    </header>
  );
}
