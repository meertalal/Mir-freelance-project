import { Check, Clock3, Sparkles } from "lucide-react";
import LinkButton from "../../../components/ui/LinkButton";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import {
  servicesPricing,
  servicesPricingCopy,
  servicesPricingCustom,
} from "../data/services-page.data";

export default function ServicesPricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className={innerSectionClass + " bg-white"}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl motion-safe:animate-float-soft" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl" />
      <div className={innerContainerClass + " relative z-10"}>
        <Reveal>
          <SectionHeading
            titleId="pricing-title"
            eyebrow={servicesPricingCopy.eyebrow}
            title={servicesPricingCopy.title}
            description={servicesPricingCopy.description}
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6 2xl:mt-12">
          {servicesPricing.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 100} className="h-full">
              <article
                className={[
                  "relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border p-6 sm:p-7",
                  plan.highlighted
                    ? "border-[#0d3a68] bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] text-white shadow-[0_24px_60px_rgba(9,47,88,0.28)]"
                    : "border-[#E6EEF9] bg-white shadow-[0_10px_30px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:shadow-[0_18px_40px_rgba(15,48,91,0.1)]",
                ].join(" ")}
              >
                {plan.highlighted && (
                  <>
                    <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full border border-white/10" />
                    <span className="absolute right-5 top-5 inline-flex items-center rounded-full bg-[#1670F5] px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                      Most Popular
                    </span>
                  </>
                )}
                <p className={["font-montserrat text-lg font-bold", plan.highlighted ? "text-white" : "text-[#10234b]"].join(" ")}>
                  {plan.name}
                </p>
                <p className={["mt-1 font-inter text-xs leading-relaxed", plan.highlighted ? "text-white/70" : "text-slate-500"].join(" ")}>
                  {plan.tagline}
                </p>
                <div className="mt-5 flex items-end gap-2">
                  <span className={["font-montserrat text-4xl font-bold tracking-tight", plan.highlighted ? "text-white" : "text-[#10234b]"].join(" ")}>
                    {plan.price}
                  </span>
                  <span className={["pb-1.5 font-inter text-[11px]", plan.highlighted ? "text-white/60" : "text-slate-400"].join(" ")}>
                    {plan.priceNote}
                  </span>
                </div>
                <p className={["mt-3 inline-flex w-max items-center gap-1.5 rounded-full px-2.5 py-1 font-inter text-[11px] font-semibold", plan.highlighted ? "bg-white/10 text-[#BFDBFE]" : "bg-[#F1F6FE] text-[#3B6EA8]"].join(" ")}>
                  <Clock3 size={13} aria-hidden="true" />
                  Delivery: {plan.timeline}
                </p>
                <ul className={["mt-6 space-y-3 border-t pt-6", plan.highlighted ? "border-white/10" : "border-[#EDF3FB]"].join(" ")}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className={["mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full", plan.highlighted ? "bg-white/10 text-[#93C5FD]" : "bg-[#EAF2FF] text-[#1670F5]"].join(" ")}>
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className={["font-inter text-xs leading-relaxed sm:text-sm", plan.highlighted ? "text-white/85" : "text-slate-600"].join(" ")}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <LinkButton to={plan.cta.href} variant={plan.highlighted ? "ghost" : "primary"} showArrow className="w-full">
                    {plan.cta.label}
                  </LinkButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#DCE9FF] bg-[#F7FAFF] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1670F5] shadow-sm ring-1 ring-[#DCE9FF]">
                <Sparkles size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-montserrat text-sm font-bold text-[#10234b] sm:text-base">
                  {servicesPricingCustom.title}
                </p>
                <p className="mt-1 max-w-2xl font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {servicesPricingCustom.description}
                </p>
              </div>
            </div>
            <LinkButton to={servicesPricingCustom.cta.href} variant="secondary" className="w-full shrink-0 sm:w-auto">
              {servicesPricingCustom.cta.label}
            </LinkButton>
          </div>
        </Reveal>
        <p className="mx-auto mt-5 max-w-2xl text-center font-inter text-[11px] leading-relaxed text-slate-500">
          {servicesPricingCopy.note}
        </p>
      </div>
    </section>
  );
}
