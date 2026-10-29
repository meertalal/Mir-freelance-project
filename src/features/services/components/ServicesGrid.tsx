import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { sharedServices } from "../../../data/site.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function ServicesGrid() {
  return (
    <section className="w-full bg-[#EAF2FF] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <SectionHeading
          title="End-to-End Digital Solutions"
          description="From idea to deployment, complete development and AI automation services."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {sharedServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                style={{ animationDelay: `${index * 70}ms` }}
                className="group flex h-full flex-col rounded-2xl border border-[#D6E4F7] bg-white p-5 shadow-[0_6px_22px_rgba(23,61,112,0.05)] transition hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(37,99,235,0.12)] motion-safe:animate-page-reveal sm:p-6"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5] transition group-hover:scale-110">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="font-georgia text-base font-bold text-[#10234B] sm:text-lg">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {service.description}
                </p>
                <Link
                  to={service.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#092F58] hover:text-[#1670F5] sm:text-sm"
                >
                  Learn More
                  <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
