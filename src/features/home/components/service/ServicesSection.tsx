import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ServicesSectionProps } from "../../types/services.types";
import { services, serviceStats } from "../../data/services.data";
import Reveal from "../../../../components/shared/Reveal";
import ServiceCard from "./ServiceCard";
import ServiceStats from "./ServiceStats";

export default function ServicesSection({
  title = "End to End Digital Solutions",
  subtitle =
    "Everything you need to build, launch, and grow your business in the digital world.",
  allServicesHref = "/services",
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="
        services-section relative isolate w-full overflow-hidden scroll-mt-20 sm:scroll-mt-24
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

      <div
        className="
          relative z-10 mx-auto w-full max-w-[1280px]
          xl:max-w-[1360px]
          min-[1600px]:max-w-[1480px]
          min-[1920px]:max-w-[1680px]
          min-[2560px]:max-w-[1920px]
        "
      >
        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-14 2xl:gap-16">
          <header className="services-heading mb-0 xl:sticky xl:top-24">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-[#092F58] sm:w-10"
              />
              <p className="font-playfair text-xs font-bold uppercase tracking-[0.14em] text-[#092F58] sm:text-sm">
                Our Services
              </p>
            </div>

            <h2
              id="services-heading"
              className="
                mt-3 max-w-md font-montserrat text-3xl font-bold
                leading-[1.12] tracking-tight text-[#10234B]
                min-[480px]:text-4xl
                xl:text-[42px]
                2xl:text-5xl
              "
            >
              {title}
            </h2>

            <p className="mt-3 max-w-md font-inter text-sm leading-7 text-[#526580] xl:mt-4 xl:text-base xl:leading-8">
              {subtitle}
            </p>

            <Link
              to={allServicesHref}
              className="
                group mt-6 inline-flex min-h-12 items-center justify-center gap-2
                rounded-xl bg-[#092F58] px-5 py-2.5
                font-inter text-sm font-semibold text-white
                shadow-[0_10px_24px_rgba(9,47,88,0.22)]
                transition-colors duration-300
                hover:bg-[#12427A]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#5882E8] focus-visible:ring-offset-4
              "
            >
              View All Services
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <div className="mt-8 max-w-md rounded-2xl border border-[#D6E4F7] bg-white/70 p-4 backdrop-blur-sm sm:p-5">
              <p className="font-montserrat text-sm font-bold text-[#10234B]">
                Need something custom?
              </p>
              <p className="mt-1 font-inter text-xs leading-relaxed text-[#526580] sm:text-[13px]">
                Tell me about your idea and I will map the right solution for your business.
              </p>
              <Link
                to="/contact"
                className="
                  group mt-3 inline-flex items-center gap-1.5
                  font-inter text-xs font-semibold text-[#1670F5]
                  transition-colors duration-300 hover:text-[#092F58]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#5882E8] focus-visible:ring-offset-2
                "
              >
                Start a conversation
                <ArrowRight
                  aria-hidden="true"
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </header>

          <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 xl:gap-5">
            {services.map((service, index) => (
              <li key={service.id} className="min-w-0">
                <Reveal delay={(index % 2) * 80} className="h-full">
                  <ServiceCard service={service} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="
            services-stats-wrap mt-8
            motion-safe:animate-service-stats
            sm:mt-10
            xl:mt-12
            2xl:mt-14
            min-[1920px]:mt-16
          "
        >
          <ServiceStats stats={serviceStats} />
        </div>
      </div>
    </section>
  );
}
