import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { sharedTestimonials } from "../../../data/site.data";
import {
  servicesWhyCopy,
  servicesWhyFeatures,
} from "../data/services-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

const navButtonClass =
  "inline-flex size-10 min-h-10 min-w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD]";

export default function ServicesWhyChoose() {
  const testimonials = sharedTestimonials;
  const [index, setIndex] = useState(0);
  const active = testimonials[index] ?? testimonials[0];

  const goPrev = () =>
    setIndex((current) =>
      testimonials.length
        ? (current - 1 + testimonials.length) % testimonials.length
        : 0,
    );
  const goNext = () =>
    setIndex((current) =>
      testimonials.length ? (current + 1) % testimonials.length : 0,
    );

  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-10 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl motion-safe:animate-float-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div
        className={`relative z-10 ${innerContainerClass} grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14`}
      >
        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={servicesWhyCopy.eyebrow}
              title={servicesWhyCopy.title}
              description={servicesWhyCopy.description}
              className="mb-6 sm:mb-8"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {servicesWhyFeatures.map(
              ({ id, title, description, Icon }, featureIndex) => (
                <Reveal key={id} delay={featureIndex * 80} className="h-full">
                  <div className="group relative flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:bg-white hover:shadow-[0_16px_36px_rgba(15,48,91,0.10)]">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7] transition duration-300 group-hover:from-[#092f58] group-hover:to-[#0f3d6e] group-hover:text-white">
                        <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-montserrat text-[11px] font-bold tracking-wider text-[#C9DEFF]"
                      >
                        0{featureIndex + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                      {title}
                    </h3>
                    <p className="mt-1.5 font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {description}
                    </p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>

        {active && (
          <Reveal delay={120} className="min-w-0">
            <article className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] p-6 shadow-[0_24px_60px_rgba(9,47,88,0.3)] sm:p-8 lg:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-[#1670F5]/20 blur-2xl"
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-playfair text-[11px] font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
                    Client Feedback
                  </p>
                  <div
                    className="flex items-center gap-0.5 text-[#FBBF24]"
                    aria-label={`${active.rating} out of 5 stars`}
                  >
                    {Array.from({ length: active.rating }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={14}
                        fill="currentColor"
                        strokeWidth={0}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-4 font-inter text-base leading-relaxed text-white/90 sm:text-lg">
                  {active.quote}
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <img
                    src={active.avatar}
                    alt={active.author}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20"
                  />
                  <div className="min-w-0">
                    <p className="font-montserrat text-sm font-bold text-white">
                      {active.author}
                    </p>
                    <p className="font-inter text-xs text-[#A9C6EC]">
                      {active.role}, {active.company}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className={navButtonClass}
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                  </button>
                  <div className="flex items-center gap-1">
                    {testimonials.map((item, testimonialIndex) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Go to testimonial ${testimonialIndex + 1}`}
                        aria-current={
                          testimonialIndex === index ? "true" : undefined
                        }
                        onClick={() => setIndex(testimonialIndex)}
                        className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD]"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-300 ${
                            testimonialIndex === index
                              ? "w-6 bg-[#93C5FD]"
                              : "w-1.5 bg-white/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={goNext}
                    className={navButtonClass}
                    aria-label="Next testimonial"
                  >
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  );
}
