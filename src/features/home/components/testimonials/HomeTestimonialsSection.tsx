import { useEffect, useState, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import SectionHeading from "../../../../components/shared/SectionHeading";
import Reveal from "../../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../../components/shared/section.styles";
import {
  clientLogos,
  homeTestimonials,
  homeTestimonialsCopy,
} from "../../data/testimonials.data";

const navButtonClass =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-white/40 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD]";

export default function HomeTestimonialsSection() {
  const total = homeTestimonials.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const active = homeTestimonials[index] ?? homeTestimonials[0];

  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % total),
      7000,
    );
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const goPrev = () => setIndex((current) => (current - 1 + total) % total);
  const goNext = () => setIndex((current) => (current + 1) % total);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX == null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
    setTouchStartX(null);
    if (delta > 48) goPrev();
    if (delta < -48) goNext();
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className={innerSectionClass + " scroll-mt-20 bg-white sm:scroll-mt-24"}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl motion-safe:animate-float-soft" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl" />

      <div className={"relative z-10 " + innerContainerClass}>
        <Reveal>
          <SectionHeading
            titleId="testimonials-title"
            eyebrow={homeTestimonialsCopy.eyebrow}
            title={homeTestimonialsCopy.title}
            description={homeTestimonialsCopy.description}
          />
          <div className="-mt-2 flex flex-wrap items-center justify-center gap-2 sm:-mt-4">
            <span className="flex items-center gap-0.5 text-[#F59E0B]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <p className="font-inter text-xs font-semibold text-[#526987] sm:text-sm">
              {homeTestimonialsCopy.rating}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] px-4 py-5 sm:mt-8 sm:grid-cols-4 sm:gap-6 sm:px-8">
            {clientLogos.map((logo) => (
              <li key={logo.id} className="flex min-w-0 items-center justify-center gap-2.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DCE9FF] bg-white font-montserrat text-[10px] font-black tracking-tight text-[#0B2C55]/70">
                  {logo.initials}
                </span>
                <span className="truncate font-montserrat text-xs font-bold tracking-tight text-[#0B2C55]/60 sm:text-sm">
                  {logo.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative mx-auto mt-8 max-w-4xl sm:mt-10">
            <article
              aria-roledescription="carousel"
              aria-label="Client testimonials"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
              className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] px-5 pb-6 pt-7 shadow-[0_24px_60px_rgba(9,47,88,0.28)] sm:px-9 sm:pb-8 sm:pt-9 lg:px-12 lg:pb-9 lg:pt-10"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/10" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 rounded-full border border-white/10" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-[#1670F5]/20 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-playfair text-[11px] font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
                    Client Feedback
                  </p>
                  <div
                    className="flex items-center gap-0.5 text-[#FBBF24]"
                    aria-label={active.rating + " out of 5 stars"}
                  >
                    {Array.from({ length: active.rating }).map((_, starIndex) => (
                      <Star key={starIndex} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                    ))}
                  </div>
                </div>

                <div
                  className="mt-4 overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{ transform: "translateX(-" + index * 100 + "%)" }}
                  >
                    {homeTestimonials.map((testimonial) => (
                      <div key={testimonial.id} className="flex w-full shrink-0 flex-col">
                        <Quote size={34} className="text-[#93C5FD]/40" aria-hidden="true" />
                        <blockquote className="mt-3 min-h-[150px] font-inter text-base leading-relaxed text-white/90 sm:min-h-[130px] sm:text-lg lg:text-xl">
                          {testimonial.quote}
                        </blockquote>
                        <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            loading="lazy"
                            decoding="async"
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20"
                          />
                          <div className="min-w-0">
                            <p className="font-montserrat text-sm font-bold text-white">
                              {testimonial.author}
                            </p>
                            <p className="font-inter text-xs text-[#A9C6EC]">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <button type="button" onClick={goPrev} className={navButtonClass} aria-label="Previous testimonial">
                    <ArrowLeft size={17} aria-hidden="true" />
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap font-montserrat text-[11px] font-bold tabular-nums text-white/60">
                      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1">
                      {homeTestimonials.map((item, dotIndex) => (
                        <button
                          key={item.id}
                          type="button"
                          aria-label={"Go to testimonial " + (dotIndex + 1)}
                          aria-current={dotIndex === index ? "true" : undefined}
                          onClick={() => setIndex(dotIndex)}
                          className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD]"
                        >
                          <span
                            className={
                              "block h-1.5 rounded-full transition-all duration-300 " +
                              (dotIndex === index ? "w-6 bg-[#93C5FD]" : "w-1.5 bg-white/30")
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="button" onClick={goNext} className={navButtonClass} aria-label="Next testimonial">
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>

                <p aria-live="polite" className="sr-only">
                  Testimonial {index + 1} of {total}
                </p>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
