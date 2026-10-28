
import { useState } from "react";
import FeatureItem from "./FeatureItem";
import TestimonialCard from "./TestimonialCard";
import { workFeatures, testimonials } from "../../data/why-work.data";

export default function WhyWorkWithMe() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalTestimonials = testimonials.length;

  const goToPrevious = () => {
    setCurrentIndex((current) =>
      totalTestimonials > 0
        ? (current - 1 + totalTestimonials) % totalTestimonials
        : 0
    );
  };

  const goToNext = () => {
    setCurrentIndex((current) =>
      totalTestimonials > 0
        ? (current + 1) % totalTestimonials
        : 0
    );
  };

  const goToTestimonial = (index: number) => {
    if (index >= 0 && index < totalTestimonials) {
      setCurrentIndex(index);
    }
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section
      id="why-work-with-me"
      aria-labelledby="why-work-title"
      className="w-full bg-slate-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-[1fr_0.95fr] md:gap-10 lg:gap-14">
        {/* Left: Introduction and features */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
            Why Work With Me
          </p>

          <h2
            id="why-work-title"
            className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl"
          >
            A Reliable Technology Partner
          </h2>

          <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
            I focus on long-term partnerships, quality work, and
            solutions that create real business value.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6">
            {workFeatures.map((feature) => (
              <FeatureItem
                key={feature.id}
                feature={feature}
              />
            ))}
          </div>
        </div>

        {/* Right: Client testimonial carousel */}
        {activeTestimonial && (
          <div className="min-w-0">
            <TestimonialCard
              testimonial={activeTestimonial}
              onPrevious={goToPrevious}
              onNext={goToNext}
              currentIndex={currentIndex}
              totalTestimonials={totalTestimonials}
              onSelect={goToTestimonial}
            />
          </div>
        )}
      </div>
    </section>
  );
}
