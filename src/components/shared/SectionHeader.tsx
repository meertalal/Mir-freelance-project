import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  titleId?: string;
  align?: "left" | "center";
  alignLg?: "left" | "center";
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

const actionClass = `
  group inline-flex items-center justify-center gap-1.5
  font-playfair text-xs font-semibold text-[#092F58]
  transition-colors duration-300 hover:text-[#5882E8]
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-[#5882E8] focus-visible:ring-offset-4
  sm:text-sm 2xl:text-base
`;

function HeaderAction({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className: string;
}) {
  const content = (
    <>
      {label}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 2xl:h-5 2xl:w-5"
      />
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  align = "center",
  alignLg,
  actionLabel,
  actionHref = "#",
  className = "",
}: SectionHeaderProps) {
  const isLeft = align === "left";
  const isLeftLg = (alignLg ?? align) === "left";

  return (
    <header
      className={[
        "flex w-full flex-col",
        isLeft
          ? "mb-6 sm:mb-7 lg:mb-8"
          : isLeftLg
            ? "mx-auto mb-7 sm:mb-10 lg:mb-8"
            : "mx-auto mb-7 sm:mb-10 lg:mb-12 2xl:mb-14",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "relative flex min-h-6 w-full items-center",
          isLeft ? "justify-start" : "justify-center",
          isLeftLg ? "lg:justify-start" : "lg:justify-center",
        ].join(" ")}
      >
        {eyebrow && (
          <div
            className={[
              "flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-4",
              isLeft ? "justify-start" : "justify-center",
              isLeftLg ? "lg:justify-start" : "lg:justify-center",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="h-px w-5 shrink-0 bg-[#092F58] sm:w-8 lg:w-10"
            />
            <p className="whitespace-nowrap font-playfair font-bold uppercase tracking-[0.10em] text-[#092F58] text-[10px] sm:text-xs sm:tracking-[0.14em] lg:text-sm">
              {eyebrow}
            </p>
            <span
              aria-hidden="true"
              className="h-px w-5 shrink-0 bg-[#092F58] sm:w-8 lg:w-10"
            />
          </div>
        )}

        {actionLabel && (
          <HeaderAction
            href={actionHref}
            label={actionLabel}
            className={`${actionClass} absolute right-0 top-1/2 hidden -translate-y-1/2 sm:inline-flex`}
          />
        )}
      </div>

      <div
        className={[
          "flex w-full flex-col",
          isLeft ? "items-start text-left" : "items-center text-center",
          isLeftLg ? "lg:items-start lg:text-left" : "lg:items-center lg:text-center",
        ].join(" ")}
      >
        <h2
          id={titleId}
          className={[
            "mt-2 font-montserrat font-bold leading-tight tracking-tight text-[#10234b]",
            "text-2xl min-[480px]:text-3xl sm:text-3xl lg:text-4xl xl:text-[42px]",
            isLeft ? "max-w-2xl" : "max-w-4xl",
            isLeftLg ? "lg:max-w-2xl" : "lg:max-w-4xl",
          ].join(" ")}
        >
          {title}
        </h2>

        {description && (
          <p
            className={[
              "mt-3 w-full px-0 font-inter leading-6 text-[#526987]",
              "text-xs min-[480px]:text-sm lg:mt-4 lg:text-base",
              isLeft ? "max-w-md" : "mx-auto max-w-2xl px-1",
              isLeftLg
                ? isLeft
                  ? "lg:max-w-md lg:max-w-xl"
                  : "lg:max-w-xl lg:mx-0 lg:px-0"
                : "lg:mx-auto lg:max-w-2xl lg:px-1",
            ].join(" ")}
          >
            {description}
          </p>
        )}

        {actionLabel && (
          <HeaderAction
            href={actionHref}
            label={actionLabel}
            className={`${actionClass} mt-3 sm:hidden`}
          />
        )}
      </div>
    </header>
  );
}
