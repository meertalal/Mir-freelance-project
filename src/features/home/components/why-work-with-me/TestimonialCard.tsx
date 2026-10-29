
import type { TestimonialCardProps } from "../../types/why-work.types";
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
    <article
      className="
        relative flex min-w-0 w-full flex-col justify-between
        min-h-[225px]
        rounded-xl border border-slate-100 bg-white
        p-4
        shadow-[0_8px_30px_rgba(15,23,42,0.04)]
        transition-shadow duration-300
        hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]
        sm:min-h-[250px] sm:rounded-2xl sm:p-5
        lg:min-h-[280px] lg:p-6
        xl:min-h-[300px] xl:p-7
        2xl:min-h-[320px] 2xl:p-9
        min-[2560px]:min-h-[360px]
        min-[2560px]:p-10
      "
    >
      {/* Testimonial quote */}
      <div className="min-w-0">
        <span
          aria-hidden="true"
          className="
            block h-7 text-4xl font-bold leading-none text-blue-200
            sm:h-8 sm:text-5xl
            lg:h-9 lg:text-6xl
            2xl:h-11 2xl:text-7xl
          "
        >
          “
        </span>

        <p
          className="
            mt-1 break-words
            text-xs italic leading-relaxed text-slate-700
            sm:text-[13px]
            lg:text-sm lg:leading-7
            xl:text-base
            2xl:text-lg 2xl:leading-8
            min-[2560px]:text-xl
          "
        >
          {testimonial.quote}
        </p>
      </div>

      {/* Client information and rating */}
      <div
        className="
          mt-5 flex min-w-0 items-center gap-2.5
          sm:mt-6 sm:gap-3
          lg:mt-7 lg:gap-4
          2xl:mt-9 2xl:gap-5
        "
      >
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          loading="lazy"
          className="
            h-9 w-9 shrink-0 rounded-full object-cover
            ring-1 ring-slate-100
            sm:h-10 sm:w-10
            lg:h-12 lg:w-12
            2xl:h-14 2xl:w-14
            min-[2560px]:h-16 min-[2560px]:w-16
          "
        />

        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate text-[11px] font-bold text-slate-800
              sm:text-xs
              lg:text-sm
              2xl:text-base
              min-[2560px]:text-lg
            "
          >
            {testimonial.author}
          </h3>

          <p
            className="
              mt-0.5 break-words text-[9px] leading-relaxed
              text-slate-500
              sm:text-[10px]
              lg:text-xs
              2xl:text-sm
            "
          >
            {testimonial.role}, {testimonial.company}
          </p>
        </div>

        <div className="shrink-0">
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      {/* Carousel navigation */}
      <div
        className="
          mt-5 flex items-center justify-between
          border-t border-slate-100 pt-3
          sm:mt-6 sm:pt-4
          lg:mt-7
          2xl:mt-8 2xl:pt-5
        "
      >
        {/* Previous button */}
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous testimonial"
          className="
            inline-flex h-8 w-8 shrink-0 items-center justify-center
            rounded-full text-slate-500
            transition-colors duration-200
            hover:bg-blue-50 hover:text-blue-600
            active:scale-95
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-blue-600
            sm:h-9 sm:w-9
            lg:h-10 lg:w-10
            2xl:h-12 2xl:w-12
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"
            aria-hidden="true"
          >
            <path
              d="M19 12H5m6-6-6 6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Testimonial pagination */}
        <div
          className="
            flex min-w-0 flex-1 items-center justify-center
            gap-1.5 px-2
            sm:gap-2
            2xl:gap-2.5
          "
          aria-label="Testimonial pagination"
        >
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
                className={`
                  h-1.5 shrink-0 rounded-full
                  transition-all duration-300
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-blue-600
                  sm:h-2
                  ${
                    currentIndex === index
                      ? "w-4 bg-blue-500 sm:w-6 2xl:w-8"
                      : "w-1.5 bg-blue-200 hover:bg-blue-400 sm:w-2"
                  }
                `}
              />
            )
          )}
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next testimonial"
          className="
            inline-flex h-8 w-8 shrink-0 items-center justify-center
            rounded-full text-slate-500
            transition-colors duration-200
            hover:bg-blue-50 hover:text-blue-600
            active:scale-95
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-blue-600
            sm:h-9 sm:w-9
            lg:h-10 lg:w-10
            2xl:h-12 2xl:w-12
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"
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