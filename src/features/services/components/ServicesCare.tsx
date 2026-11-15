import { Check } from "lucide-react";
import LinkButton from "../../../components/ui/LinkButton";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import { servicesCareCopy, servicesCarePlans } from "../data/services-page.data";

export default function ServicesCare() {
  return (
    <section
      id="care"
      aria-labelledby="care-title"
      className={`${innerSectionClass} scroll-mt-20 bg-[#F7FAFF] sm:scroll-mt-24`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
          <SectionHeading
            titleId="care-title"
            eyebrow={servicesCareCopy.eyebrow}
            title={servicesCareCopy.title}
            description={servicesCareCopy.description}
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-[#D6E4F7] bg-white shadow-[0_24px_60px_-24px_rgba(15,48,91,0.18)]">
            <div className="grid divide-y divide-[#EDF3FB] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {servicesCarePlans.map((plan) => {
                const Icon = plan.Icon;

                return (
                  <article
                    key={plan.id}
                    className={`relative flex flex-col p-6 sm:p-7 ${
                      plan.featured ? "bg-[#F7FAFF]" : ""
                    }`}
                  >
                    {plan.featured && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-8 top-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#1670F5] to-transparent"
                      />
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${
                          plan.featured
                            ? "bg-gradient-to-br from-[#092f58] to-[#0f3d6e] text-white ring-[#0B3A6B]"
                            : "bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-[#D6E4F7]"
                        }`}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      {plan.featured && (
                        <span className="rounded-full bg-[#1670F5] px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-sm">
                          Recommended
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 font-montserrat text-lg font-bold text-[#10234B]">
                      {plan.name}
                    </h3>
                    <p className="mt-1 font-inter text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {plan.tagline}
                    </p>

                    <p className="mt-4 inline-flex w-max items-center rounded-full bg-[#EAF2FF] px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-wide text-[#3B6EA8]">
                      Month-to-month
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-[#EDF3FB] pt-5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1670F5]">
                            <Check size={12} strokeWidth={3} aria-hidden="true" />
                          </span>
                          <span className="font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <LinkButton
                        to={plan.cta.href}
                        variant={plan.featured ? "primary" : "secondary"}
                        showArrow
                        className="w-full"
                      >
                        {plan.cta.label}
                      </LinkButton>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-5 max-w-2xl text-center font-inter text-[11px] leading-relaxed text-slate-500">
          {servicesCareCopy.note}
        </p>
      </div>
    </section>
  );
}
