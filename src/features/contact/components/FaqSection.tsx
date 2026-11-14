import { useState } from "react";
import { ChevronDown, Mail, MessageCircle } from "lucide-react";
import { faqs } from "../data/contact-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import { innerContainerClass } from "../../../components/shared/section.styles";
import { brand } from "../../../data/site.data";

function ContactPrompt() {
  return (
    <div className="rounded-2xl border border-[#D6E4F7] bg-white p-5 shadow-[0_12px_36px_rgba(15,48,91,0.06)] sm:p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7]">
          <MessageCircle size={20} strokeWidth={1.9} aria-hidden="true" />
        </span>
        <div>
          <p className="font-montserrat text-sm font-bold text-[#10234B]">
            Still have questions?
          </p>
          <p className="mt-1 font-inter text-xs leading-relaxed text-slate-500 sm:text-sm">
            Send a message and I&apos;ll get back to you within one business day.
          </p>
        </div>
      </div>
      <a
        href={`mailto:${brand.email}`}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#092f58] px-5 font-inter text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0f3d6e]"
      >
        <Mail size={16} aria-hidden="true" />
        Email Me
      </a>
    </div>
  );
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F7FAFF] px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                eyebrow="FAQ"
                title="Frequently Asked Questions"
                description="Quick answers before we jump on a call. If something is still unclear, reach out directly."
                align="left"
              />
            </Reveal>

            <Reveal delay={120} className="hidden lg:block">
              <ContactPrompt />
            </Reveal>
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            {faqs.map((faq, index) => {
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
                      className={`shrink-0 text-[#1670F5] transition duration-300 ${
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

          <Reveal className="lg:hidden">
            <ContactPrompt />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
