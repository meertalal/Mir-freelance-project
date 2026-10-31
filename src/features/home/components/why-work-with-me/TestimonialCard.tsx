import { useState, type TouchEvent } from "react";
import type { Testimonial, TestimonialCardProps } from "../../types/why-work.types";
import StarRating from "./StarRating";

function authorInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function TestimonialAvatar({
  src,
  author,
}: {
  src: string;
  author: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <span
        aria-hidden="true"
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-full bg-[#EAF2FF] font-montserrat text-[11px]
          font-bold text-[#1670F5]
          sm:h-11 sm:w-11 sm:text-xs
          lg:h-12 lg:w-12
          2xl:h-14 2xl:w-14 2xl:text-sm
        "
      >
        {authorInitials(author)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={author}
      loading="lazy"
      onError={() => setFailed(true)}
      className="
        h-10 w-10 shrink-0 rounded-full object-cover
        ring-1 ring-slate-100
        sm:h-11 sm:w-11
        lg:h-12 lg:w-12
        2xl:h-14 2xl:w-14
      "
    />
  );
}

function Slide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex w-full shrink-0 flex-col px-4 sm:px-5 lg:px-6 xl:px-7 2xl:px-9">
      <div className="min-w-0">
        <span
          aria-hidden="true"
          className="
            block h-7 font-georgia text-4xl font-bold leading-none text-blue-200
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
            font-georgia text-xs italic leading-relaxed text-slate-700
            sm:text-[13px]
            lg:text-sm lg:leading-7
            xl:text-base
            2xl:text-lg 2xl:leading-8
          "
        >
          {testimonial.quote}
        </p>
      </div>

      <div className="mt-3 flex min-w-0 items-center gap-3 sm:mt-4 lg:mt-5 2xl:mt-7">
        <TestimonialAvatar src={testimonial.avatar} author={testimonial.author} />

        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="truncate font-montserrat text-[11px] font-bold text-slate-800 sm:text-xs lg:text-sm 2xl:text-base">
            {testimonial.author}
          </h3>
          <p className="mt-0.5 truncate font-lato text-[9px] leading-relaxed text-slate-500 sm:text-[10px] lg:text-xs 2xl:text-sm">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>

        <div className="shrink-0">
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
    </div>
  );
}

export default function TestimonialCard({
  testimonials,
  onPrevious,
  onNext,
  currentIndex,
  onSelect,
}: TestimonialCardProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const total = testimonials.length;
  const safeIndex = total > 0 ? currentIndex % total : 0;

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX == null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
    setTouchStartX(null);
    if (delta > 48) onPrevious();
    if (delta < -48) onNext();
  };

  return (
    <article
      className="
        relative flex min-w-0 w-full flex-col
        overflow-hidden rounded-2xl border border-slate-100 bg-white
        py-3
        shadow-[0_8px_30px_rgba(15,23,42,0.04)]
        sm:rounded-2xl sm:py-4
        lg:py-5
        xl:py-7
        2xl:py-9
      "
    >
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="
            flex
            transition-transform duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            motion-reduce:transition-none
          "
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <Slide key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 px-4 pt-2.5 sm:mt-4 sm:px-5 sm:pt-3 lg:mt-5 lg:px-6 xl:mt-7 2xl:mt-8 2xl:px-9 2xl:pt-5">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous testimonial"
          className="
            inline-flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full border border-slate-200 text-slate-500
            transition duration-200
            hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600
            active:scale-95
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-blue-600
            sm:h-10 sm:w-10
            lg:h-11 lg:w-11
            2xl:h-12 2xl:w-12
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
          >
            <path
              d="M19 12H5m6-6-6 6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-2 sm:gap-2"
          aria-label="Testimonial pagination"
        >
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={safeIndex === index ? "true" : undefined}
              className={`
                h-1.5 shrink-0 rounded-full transition-all duration-300
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-blue-600 sm:h-2
                ${
                  safeIndex === index
                    ? "w-5 bg-blue-500 sm:w-6 2xl:w-8"
                    : "w-1.5 bg-blue-200 hover:bg-blue-400 sm:w-2"
                }
              `}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next testimonial"
          className="
            inline-flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full border border-slate-200 text-slate-500
            transition duration-200
            hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600
            active:scale-95
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-blue-600
            sm:h-10 sm:w-10
            lg:h-11 lg:w-11
            2xl:h-12 2xl:w-12
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 sm:h-5 sm:w-5"
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
