import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/contact-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <SectionHeading
          title="Frequently Asked Questions"
          description="Quick answers before we jump on a call."
          actionLabel="View All FAQs"
          actionHref="/contact"
          align="left"
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-100 bg-[#F7FAFF]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
                >
                  <span className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#1670F5] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 font-inter text-sm leading-relaxed text-slate-600 sm:px-5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
