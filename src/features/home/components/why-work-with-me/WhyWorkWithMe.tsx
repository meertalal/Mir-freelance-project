
import { useState } from "react";
import FeatureItem from "./FeatureItem";
import TestimonialCard from "./TestimonialCard";
import {
  workFeatures,
  testimonials,
} from "../../data/why-work.data";

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
      className="
        relative isolate w-full overflow-hidden
        bg-slate-50
        px-4 py-10
        sm:px-6 sm:py-14
        lg:px-10 lg:py-16
        xl:px-12 xl:py-20
        2xl:px-16 2xl:py-24
        min-[2560px]:px-24 min-[2560px]:py-28
      "
    >
      {/* Optional decorative background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-24 top-10
          h-64 w-64 rounded-full bg-blue-100/60 blur-3xl
          lg:h-80 lg:w-80
          2xl:h-96 2xl:w-96
        "
      />

      <div
        className="
          relative z-10 mx-auto grid w-full
          max-w-6xl grid-cols-1 items-center
          gap-8
          md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]
          md:gap-10
          lg:max-w-7xl lg:gap-14
          xl:gap-16
          2xl:max-w-[1680px] 2xl:gap-20
          min-[2560px]:max-w-[1920px]
          min-[2560px]:gap-24
        "
      >
        {/* Left: Introduction and features */}
        <div className="min-w-0">
          <p
            className="
              text-[10px] font-bold uppercase
              tracking-[0.16em] text-blue-600
              sm:text-xs
              lg:text-sm
              2xl:text-base
            "
          >
            Why Work With Me
          </p>

          <h2
            id="why-work-title"
            className="
              mt-2 max-w-2xl
              text-2xl font-bold leading-tight
              tracking-tight text-slate-900
              sm:text-3xl
              lg:text-4xl
              xl:text-[42px]
              2xl:text-5xl 2xl:leading-[1.15]
              min-[2560px]:text-6xl
            "
          >
            A Reliable Technology Partner
          </h2>

          <p
            className="
              mt-2 max-w-md
              text-xs leading-relaxed text-slate-600
              sm:text-sm
              lg:mt-4 lg:max-w-xl lg:text-base
              2xl:max-w-2xl 2xl:text-lg 2xl:leading-8
            "
          >
            I focus on long-term partnerships, quality work, and
            solutions that create real business value.
          </p>

          {/* Responsive feature grid */}
          <div
            className="
              mt-6 grid grid-cols-2
              gap-x-4 gap-y-5
              sm:gap-x-6 sm:gap-y-6
              lg:mt-8 lg:gap-x-8 lg:gap-y-8
              2xl:mt-10 2xl:gap-x-10 2xl:gap-y-10
            "
          >
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
          <div
            className="
              min-w-0 w-full
              md:justify-self-stretch
            "
          >
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
