import { useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import LinkButton from "../../../components/ui/LinkButton";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import { portfolioFaqCopy, portfolioFaqs } from "../data/portfolio-page.data";

export default function PortfolioFaq() {
  const [openId, setOpenId] = useState<string | null>(
    portfolioFaqs[0]?.id ?? null,
  );

  return (
    <section
      id="portfolio-faq"
      aria-labelledby="portfolio-faq-title"
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
            titleId="portfolio-faq-title"
            eyebrow={portfolioFaqCopy.eyebrow}
            title={portfolioFaqCopy.title}
            description={portfolioFaqCopy.description}
          />
        </Reveal>

        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {portfolioFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            const Icon = faq.Icon;

            return (
              <Reveal key={faq.id} delay={index * 60}>
                <div
                  className={[
                    "overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors duration-300",
                    isOpen ? "border-[#C9DEFF]" : "border-slate-100",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5] sm:h-10 sm:w-10">
                      <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden font-montserrat text-[11px] font-bold text-[#C9DEFF] sm:block"
                    >
                      0{index + 1}
                    </span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`shrink-0 text-[#1670F5] transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 font-inter text-sm leading-relaxed text-slate-600 sm:px-5 sm:pl-[4.25rem]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-start justify-between gap-4 rounded-2xl border border-[#DCE9FF] bg-[#F7FAFF] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1670F5] shadow-sm ring-1 ring-[#DCE9FF]">
                <Mail size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                  {portfolioFaqCopy.ctaTitle}
                </p>
                <p className="mt-1 max-w-xl font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {portfolioFaqCopy.ctaText}
                </p>
              </div>
            </div>
            <LinkButton
              to={portfolioFaqCopy.cta.href}
              variant="primary"
              showArrow
              className="w-full shrink-0 sm:w-auto"
            >
              {portfolioFaqCopy.cta.label}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
