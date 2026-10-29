import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { sharedTestimonials } from "../../data/site.data";
import SectionHeading from "./SectionHeading";

export type WhyFeature = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

type WhyChooseSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  features: WhyFeature[];
  testimonialIds?: string[];
};

export default function WhyChooseSection({
  eyebrow = "Why Choose Us",
  title = "A Reliable Technology Partner",
  description = "Clear communication, modern technology, and delivery you can trust.",
  features,
  testimonialIds,
}: WhyChooseSectionProps) {
  const testimonials = testimonialIds
    ? sharedTestimonials.filter((item) => testimonialIds.includes(item.id))
    : sharedTestimonials;

  const [index, setIndex] = useState(0);
  const active = testimonials[index] ?? testimonials[0];

  const goPrev = () =>
    setIndex((current) =>
      testimonials.length ? (current - 1 + testimonials.length) % testimonials.length : 0,
    );
  const goNext = () =>
    setIndex((current) =>
      testimonials.length ? (current + 1) % testimonials.length : 0,
    );

  return (
    <section className="w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14 2xl:max-w-[1600px]">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="left"
            className="mb-6 sm:mb-8"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {features.map(({ id, title: featureTitle, description: featureDesc, Icon }) => (
              <div
                key={id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                  {featureTitle}
                </h3>
                <p className="mt-1 font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {featureDesc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {active && (
          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)] sm:p-7 lg:p-8">
            <span className="block text-5xl font-bold leading-none text-blue-200">“</span>
            <p className="mt-2 font-inter text-sm italic leading-relaxed text-slate-700 sm:text-base">
              {active.quote}
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
              <img
                src={active.avatar}
                alt={active.author}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-100"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{active.author}</p>
                <p className="text-xs text-slate-500">
                  {active.role}, {active.company}
                </p>
              </div>
              <div className="flex gap-0.5 text-[#F59E0B]" aria-label={`${active.rating} star rating`}>
                {Array.from({ length: active.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="rounded-full px-3 py-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-blue-500" : "w-2 bg-blue-200"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                className="rounded-full px-3 py-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
