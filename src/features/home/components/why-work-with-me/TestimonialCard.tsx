
import type {
  TestimonialCardProps,
} from "../../types/why-work.types";
import StarRating from "./StarRating";

export default function TestimonialCard({
  testimonial,
  onPrevious,
  onNext,
  currentIndex,
  totalTestimonials,
  onSelect,
}: TestimonialCardProps) {
  return (
    <article className="relative flex min-h-[225px] flex-col justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-5">
      <div>
        <span
          aria-hidden="true"
          className="block h-7 text-4xl font-bold leading-none text-blue-200"
        >
          “
        </span>

        <p className="mt-1 text-xs italic leading-relaxed text-slate-700 sm:text-[13px]">
          {testimonial.quote}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
          loading="lazy"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[11px] font-bold text-slate-800 sm:text-xs">
            {testimonial.author}
          </h3>

          <p className="truncate text-[9px] text-slate-500 sm:text-[10px]">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>

        <StarRating rating={testimonial.rating} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous testimonial"
          className="rounded-full p-1 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M19 12H5m6-6-6 6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from(
            { length: totalTestimonials },
            (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onSelect(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={
                  currentIndex === index ? "true" : undefined
                }
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-4 bg-blue-500"
                    : "w-1.5 bg-blue-200 hover:bg-blue-400"
                }`}
              />
            )
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next testimonial"
          className="rounded-full p-1 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
