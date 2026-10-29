import { ArrowRight } from "lucide-react";
import type { ServicesSectionProps } from "../../types/services.types";
import { services, serviceStats } from "../../data/services.data";
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
        xl:px-10 xl:py-20
        2xl:px-14 2xl:py-24
        min-[1920px]:px-20 min-[1920px]:py-28
        min-[2560px]:px-24 min-[2560px]:py-32
      "
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-28 -top-28
          h-64 w-64 rounded-full bg-white/40 blur-3xl
          motion-safe:animate-service-orb
          xl:h-80 xl:w-80
          2xl:h-96 2xl:w-96
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-36 -right-24
          h-80 w-80 rounded-full bg-[#C9DEFF]/40 blur-3xl
          motion-safe:animate-service-orb
          xl:h-96 xl:w-96
          2xl:h-[30rem] 2xl:w-[30rem]
        "
        style={{ animationDelay: "1.5s" }}
      />

      {/* Main container */}
      <div
        className="
          relative z-10 mx-auto w-full max-w-[1280px]
          xl:max-w-[1400px]
          2xl:max-w-[1600px]
          min-[1920px]:max-w-[1760px]
          min-[2560px]:max-w-[2000px]
        "
      >
        {/* Section heading */}
        <header
          className="
            services-heading relative mb-6 text-center
            motion-safe:animate-service-heading
            sm:mb-9 lg:mb-10
            xl:mb-12 2xl:mb-14
            min-[1920px]:mb-16
          "
        >
          <div
            className="
              mb-2 flex items-center justify-center
              gap-2.5 sm:gap-3
              xl:mb-3 2xl:gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px w-5 origin-right bg-[#092F58]
                motion-safe:animate-service-line
                sm:w-7 xl:w-10 2xl:w-14
              "
            />

            <p
              className="
                whitespace-nowrap font-playfair text-xs
                font-bold uppercase tracking-[0.16em]
                text-[#092F58] sm:text-sm
                xl:text-base 2xl:text-lg
              "
            >
              Our Services
            </p>

            <span
              aria-hidden="true"
              className="
                h-px w-5 origin-left bg-[#092F58]
                motion-safe:animate-service-line
                sm:w-7 xl:w-10 2xl:w-14
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
              xl:max-w-4xl xl:text-4xl
              2xl:max-w-5xl 2xl:text-5xl
              min-[1920px]:text-6xl
              min-[2560px]:text-7xl
            "
          >
            {title}
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-2xl font-inter
              text-xs leading-6 text-[#526580]
              min-[480px]:text-sm
              xl:mt-4 xl:max-w-3xl xl:text-base xl:leading-7
              2xl:mt-5 2xl:max-w-4xl 2xl:text-lg 2xl:leading-8
              min-[1920px]:text-xl
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
              xl:top-2 xl:text-sm
              2xl:text-base
            "
          >
            View All Services

            <ArrowRight
              aria-hidden="true"
              className="
                h-4 w-4 transition-transform duration-300
                group-hover:translate-x-1
                xl:h-5 xl:w-5
              "
            />
          </a>
        </header>

        {/* Responsive service cards */}
        <div
          className="
            grid grid-cols-2 items-stretch gap-3
            min-[480px]:gap-4
            sm:grid-cols-2 sm:gap-4
            lg:grid-cols-4 lg:gap-5
            xl:gap-6
            2xl:gap-7
            min-[1920px]:gap-8
            min-[2560px]:gap-10
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
            xl:mt-10
            2xl:mt-12
            min-[1920px]:mt-14
          "
        >
          <ServiceStats stats={serviceStats} />
        </div>
      </div>
    </section>
  );
}