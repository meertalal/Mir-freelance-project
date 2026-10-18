import { ArrowRight } from "lucide-react";
import type { ServicesSectionProps } from "../types/services.types";

import { services, serviceStats } from "../data/services.data";
import ServiceCard from "./ServiceCard";
import ServiceStats from "./ServiceStats";

export default function ServicesSection({
  title = "End-to-End Digital Solutions",
  subtitle =
    "From idea to deployment, we provide complete development and AI automation services.",
  allServicesHref = "/services",
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="
        services-section relative isolate w-full overflow-hidden
        border-t border-[#D6E4F7]
        bg-[#EAF2FF] px-4 py-10
        min-[480px]:px-5
        sm:px-6 sm:py-14
        lg:px-8 lg:py-16
      "
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-28 -top-28
          h-64 w-64 rounded-full bg-white/40 blur-3xl
          motion-safe:animate-service-orb
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-36 -right-24
          h-80 w-80 rounded-full bg-[#C9DEFF]/40 blur-3xl
          motion-safe:animate-service-orb
        "
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Section heading */}
        <header
          className="
            services-heading relative mb-6 text-center
            motion-safe:animate-service-heading
            sm:mb-9 lg:mb-10
          "
        >
          <div
            className="
              mb-2 flex items-center justify-center
              gap-2.5 sm:gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px w-5 origin-right bg-[#092F58]
                motion-safe:animate-service-line
                sm:w-7
              "
            />

            <p
              className="
                whitespace-nowrap font-playfair text-xs
                font-bold uppercase tracking-[0.16em]
                text-[#092F58] sm:text-sm
              "
            >
              Our Services
            </p>

            <span
              aria-hidden="true"
              className="
                h-px w-5 origin-left bg-[#092F58]
                motion-safe:animate-service-line
                sm:w-7
              "
              style={{ animationDelay: "150ms" }}
            />
          </div>

          <h2
            id="services-heading"
            className="
              mx-auto max-w-3xl font-montserrat
              text-2xl font-bold leading-tight
              tracking-tight text-[#10234B]
              min-[480px]:text-3xl lg:text-[38px]
            "
          >
            {title}
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-2xl font-inter
              text-xs leading-6 text-[#526580]
              min-[480px]:text-sm
            "
          >
            {subtitle}
          </p>

          <a
            href={allServicesHref}
            className="
              group mt-3 inline-flex items-center gap-2
              font-playfair text-xs font-semibold text-[#092F58]
              transition-colors duration-300 hover:text-[#5882E8]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#5882E8] focus-visible:ring-offset-4
              sm:absolute sm:right-0 sm:top-1 sm:mt-0
            "
          >
            View All Services

            <ArrowRight
              aria-hidden="true"
              className="
                h-4 w-4 transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </header>

        {/* Responsive service cards */}
        <div
          className="
            grid grid-cols-2 gap-3
            min-[480px]:gap-4
            sm:grid-cols-2 sm:gap-4
            lg:grid-cols-4 lg:gap-5
          "
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Website statistics */}
        <div
          className="
            services-stats-wrap mt-5
            motion-safe:animate-service-stats
            sm:mt-8
          "
        >
          <ServiceStats stats={serviceStats} />
        </div>
      </div>
    </section>
  );
}
