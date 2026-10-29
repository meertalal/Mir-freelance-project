import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  actionLabel,
  actionHref,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={[
        "mb-8 sm:mb-10 lg:mb-12",
        isCenter ? "text-center" : "text-left",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-wrap items-end gap-4",
          isCenter ? "justify-center" : "justify-between",
        ].join(" ")}
      >
        <div className={isCenter ? "mx-auto max-w-3xl" : "max-w-3xl"}>
          {eyebrow && (
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5] sm:text-xs">
              {eyebrow}
            </p>
          )}
          <h2 className="font-georgia text-2xl font-bold tracking-tight text-[#10234B] sm:text-3xl lg:text-4xl 2xl:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 font-inter text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
              {description}
            </p>
          )}
        </div>

        {actionLabel && actionHref && (
          <Link
            to={actionHref}
            className="inline-flex items-center gap-2 rounded-xl border border-[#1670F5] bg-[#1670F5] px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0f5fd4] sm:text-sm"
          >
            {actionLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
