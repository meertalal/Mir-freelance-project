import { useState } from "react";
import FeatureItem from "./FeatureItem";
import TestimonialCard from "./TestimonialCard";
import SectionHeader from "../Works/SectionHeader";
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
          relative z-10 mx-auto w-full
          max-w-6xl
          lg:max-w-7xl
          2xl:max-w-[1680px]
          min-[1920px]:max-w-[1840px]
          min-[2560px]:max-w-[2100px]
        "
      >
        <div
          className="
            grid w-full grid-cols-1 items-start gap-8
            sm:gap-10
            xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]
            xl:items-center xl:gap-16
            2xl:gap-20
            min-[2560px]:gap-24
          "
        >
          <div className="min-w-0">
            <SectionHeader
              align="left"
              titleId="why-work-title"
              eyebrow="Why Work With Me"
              title="A Reliable Technology Partner"
              description="I focus on long-term partnerships, quality work, and solutions that create real business value."
            />

            <div
              className="
                grid grid-cols-1
                gap-x-4 gap-y-5
                min-[420px]:grid-cols-2
                sm:gap-x-8 sm:gap-y-7
                lg:gap-x-10 lg:gap-y-8
                2xl:gap-x-12 2xl:gap-y-10
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

          {testimonials.length > 0 && (
            <div className="min-w-0 w-full xl:justify-self-stretch">
              <TestimonialCard
                testimonials={testimonials}
                onPrevious={goToPrevious}
                onNext={goToNext}
                currentIndex={currentIndex}
                onSelect={goToTestimonial}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
