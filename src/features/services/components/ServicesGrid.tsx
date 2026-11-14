import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { sharedServices } from "../../../data/site.data";
import { servicesGridCopy } from "../data/services-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function ServicesGrid() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className={`${innerSectionClass} bg-[#EAF2FF]`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-white/60 blur-3xl motion-safe:animate-float-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#DCE9FF]/70 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
          <SectionHeading
            titleId="services-title"
            eyebrow={servicesGridCopy.eyebrow}
            title={servicesGridCopy.title}
            description={servicesGridCopy.description}
          />
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sharedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <li key={service.id} className="min-w-0">
                <Reveal delay={(index % 3) * 80} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#E2EDFA] bg-white shadow-[0_8px_24px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-[#BFD6F5] hover:shadow-[0_22px_48px_rgba(15,48,91,0.12)]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAF2FF]">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={600}
                        className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#092f58]/20 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30"
                      />
                    </div>

                    <div className="relative flex flex-1 flex-col items-center px-5 pb-6 pt-10 text-center sm:px-6">
                      <span className="absolute -top-6 left-1/2 inline-flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-[#1670F5] shadow-[0_8px_20px_rgba(15,48,91,0.14)] transition-colors duration-300 group-hover:bg-[#EAF2FF]">
                        <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                      </span>

                      <h3 className="font-montserrat text-lg font-bold leading-snug text-[#10234B]">
                        {service.title}
                      </h3>
                      <p className="mt-2 flex-1 font-inter text-sm leading-relaxed text-[#526987]">
                        {service.description}
                      </p>

                      <Link
                        to={service.href}
                        aria-label={`View ${service.title}`}
                        className="group/link mt-5 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2 font-inter text-sm font-semibold text-[#1670F5] transition-colors duration-300 hover:text-[#092f58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1670F5] focus-visible:ring-offset-2"
                      >
                        View Service
                        <ArrowRight
                          size={15}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
