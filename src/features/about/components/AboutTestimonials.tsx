import { Quote, Star } from "lucide-react";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import { useTestimonials } from "../../content/useContent";
import { aboutTestimonialsCopy } from "../data/about-page.data";

export default function AboutTestimonials() {
  const testimonials = useTestimonials().slice(0, 3);

  return (
    <section
      aria-labelledby="about-testimonials-title"
      className={`${innerSectionClass} bg-white`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
          <SectionHeading
            titleId="about-testimonials-title"
            eyebrow={aboutTestimonialsCopy.eyebrow}
            title={aboutTestimonialsCopy.title}
            description={aboutTestimonialsCopy.description}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={index * 80}
              className="h-full"
            >
              <figure className="relative flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#C9DEFF] hover:shadow-[0_18px_40px_rgba(15,48,91,0.09)]">
                <Quote
                  size={36}
                  aria-hidden="true"
                  className="absolute right-5 top-5 text-[#DCE9FF]"
                />

                <div className="flex items-center gap-1 text-[#F59E0B]">
                  <span className="sr-only">
                    {testimonial.rating} out of 5 stars
                  </span>
                  {Array.from({ length: testimonial.rating }).map((_, star) => (
                    <Star
                      key={star}
                      size={14}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="relative mt-4 flex-1 font-inter text-sm leading-relaxed text-[#526987]">
                  “{testimonial.quote}”
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-[#E6EEF9] pt-4">
                  <img
                    src={testimonial.avatar}
                    alt={`Portrait of ${testimonial.author}`}
                    width={44}
                    height={44}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                  />
                  <div className="min-w-0">
                    <p className="font-montserrat text-sm font-bold text-[#10234B]">
                      {testimonial.author}
                    </p>
                    <p className="mt-0.5 font-inter text-xs text-[#8298B5]">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
