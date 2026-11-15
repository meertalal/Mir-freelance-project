import { useRef, useState } from "react";
import { Quote, Star } from "lucide-react";
import { sharedTestimonials } from "../../../data/site.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import { innerContainerClass } from "../../../components/shared/section.styles";

export default function TestimonialsGrid() {
  const items = sharedTestimonials.slice(0, 3);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const averageRating = (
    items.reduce((total, item) => total + item.rating, 0) / items.length
  ).toFixed(1);

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const left = scroller.getBoundingClientRect().left;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(scroller.children).forEach((child, index) => {
      const distance = Math.abs(child.getBoundingClientRect().left - left);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveSlide(nearestIndex);
  };

  const scrollToSlide = (index: number) => {
    const scroller = scrollerRef.current;
    const slide = scroller?.children[index];
    if (!scroller || !(slide instanceof HTMLElement)) return;

    const left =
      slide.getBoundingClientRect().left -
      scroller.getBoundingClientRect().left +
      scroller.scrollLeft;

    scroller.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF5FF_55%,#F7FAFF_100%)] px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#DCE9FF]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 bottom-10 h-80 w-80 rounded-full bg-[#EAF2FF] blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal className="[&>header]:mb-0">
          <SectionHeading
            eyebrow="Client Feedback"
            title="Trusted by Businesses Worldwide."
            description="What clients say about working together."
          />
        </Reveal>

        <Reveal delay={80} className="mt-5 flex justify-center sm:mt-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl border border-[#E1EAF6] bg-white px-4 py-2 shadow-[0_8px_24px_rgba(15,48,91,0.05)] sm:rounded-full">
            <span
              className="flex items-center gap-0.5 text-[#F59E0B]"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  size={13}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </span>
            <span className="font-inter text-xs font-bold text-[#10234B] sm:text-[13px]">
              {averageRating} average rating
            </span>
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-slate-300"
            />
            <span className="font-inter text-xs text-[#526987] sm:text-[13px]">
              from 50+ happy clients
            </span>
          </div>
        </Reveal>

        <Reveal delay={140}>
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          role="group"
          aria-label="Client testimonials"
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-8 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative flex w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-[#E1EAF6] bg-white p-5 shadow-[0_12px_32px_rgba(15,48,91,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:shadow-[0_22px_48px_rgba(15,48,91,0.12)] sm:p-6 md:w-auto"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1670F5] via-[#6FA8F8] to-[#93C5FD] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex items-center gap-0.5 text-[#F59E0B]"
                  aria-label={item.rating + " out of 5 stars"}
                >
                  {Array.from({ length: item.rating }).map(
                    (_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={14}
                        fill="currentColor"
                        strokeWidth={0}
                        aria-hidden="true"
                      />
                    ),
                  )}
                </div>
                <Quote
                  size={34}
                  aria-hidden="true"
                  className="shrink-0 text-[#E8F1FC]"
                />
              </div>

              <blockquote className="mt-4 flex-1 font-inter text-sm leading-relaxed text-[#42546D] sm:text-[15px]">
                {item.quote}
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-[#EDF3FB] pt-5">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-[#DCE9FF]"
                />
                <div className="min-w-0">
                  <p className="font-montserrat text-sm font-bold text-[#10234B]">
                    {item.author}
                  </p>
                  <p className="mt-0.5 font-inter text-xs text-[#6B7F99]">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        </Reveal>

        <div className="mt-4 flex items-center justify-center gap-1 md:hidden">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={"Show testimonial " + (index + 1) + " from " + item.author}
              aria-current={activeSlide === index}
              className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8]"
            >
              <span
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  activeSlide === index
                    ? "w-5 bg-[#092f58]"
                    : "w-1.5 bg-slate-300",
                ].join(" ")}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
