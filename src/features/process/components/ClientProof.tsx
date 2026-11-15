import { Star } from "lucide-react";
import { sharedTestimonials } from "../../../data/site.data";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
} from "../../../components/shared/section.styles";

const proofIds = ["james-wilson", "michael-thompson", "sarah-johnson"] as const;
const proofTestimonials = sharedTestimonials.filter((item) =>
  (proofIds as readonly string[]).includes(item.id),
);

export default function ClientProof() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] px-4 py-12 min-[480px]:px-5 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-12 xl:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#1670F5]/20 blur-2xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 font-playfair text-[11px] font-bold uppercase tracking-[0.14em] text-[#93C5FD] sm:gap-3 sm:text-xs">
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-[#93C5FD]/60 sm:w-8" />
            Client Feedback
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-[#93C5FD]/60 sm:w-8" />
          </p>
          <h2 className="mt-3 font-montserrat text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[34px]">
            Trusted for a Clear, Reliable Process
          </h2>
          <p className="mt-3 font-inter text-sm leading-relaxed text-white/70 sm:text-[15px]">
            A few words from clients about how the process felt from kickoff to launch.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3 lg:gap-5">
          {proofTestimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition duration-300 hover:border-white/20 hover:bg-white/10 sm:p-6">
                <div
                  className="flex items-center gap-0.5 text-[#FBBF24]"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 font-inter text-sm leading-relaxed text-white/85">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
                  />
                  <div className="min-w-0">
                    <p className="font-montserrat text-sm font-bold text-white">
                      {testimonial.author}
                    </p>
                    <p className="font-inter text-[11px] text-[#A9C6EC]">
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
