import type { StarRatingProps } from "../../types/why-work.types";

export default function StarRating({
  rating,
}: StarRatingProps) {
  const safeRating = Math.max(
    0,
    Math.min(5, Math.round(rating))
  );

  return (
    <div
      className="
        flex shrink-0 items-center gap-0.5
        lg:gap-1
        2xl:gap-1.5
      "
      role="img"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`
            text-sm leading-none
            sm:text-base
            lg:text-lg
            2xl:text-xl
            ${
              index < safeRating
                ? "text-amber-400"
                : "text-slate-200"
            }
          `}
        >
          ★
        </span>
      ))}
    </div>
  );
}
