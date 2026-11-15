import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import {
  contactServiceLinks,
  contactServicesCopy,
} from "../data/contact-page.data";

export default function ContactServicesLinks() {
  return (
    <section
      aria-labelledby="contact-services-title"
      className={`${innerSectionClass} bg-white`}
    >
      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <SectionHeading
            titleId="contact-services-title"
            eyebrow={contactServicesCopy.eyebrow}
            title={contactServicesCopy.title}
            description={contactServicesCopy.description}
            actionLabel={contactServicesCopy.action.label}
            actionHref={contactServicesCopy.action.href}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {contactServiceLinks.map((service, index) => {
            const Icon = service.Icon;

            return (
              <Reveal key={service.id} delay={index * 70} className="h-full">
                <Link
                  to={service.href}
                  className="group flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-5 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:bg-white hover:shadow-[0_16px_36px_rgba(15,48,91,0.09)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1670F5] shadow-sm ring-1 ring-[#DCE9FF] transition-colors duration-300 group-hover:bg-[#092F58] group-hover:text-white">
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-montserrat text-sm font-bold text-[#10234B]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 font-inter text-xs leading-relaxed text-[#526987]">
                    {service.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 font-inter text-[10px] font-bold uppercase tracking-[0.1em] text-[#1670F5]">
                    Explore
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
