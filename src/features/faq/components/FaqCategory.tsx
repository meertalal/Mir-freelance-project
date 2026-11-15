import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import type { FaqCategory as FaqCategoryData } from "../data/faq-page.data";

type FaqCategoryProps = {
  category: FaqCategoryData;
  index: number;
};

export default function FaqCategory({ category, index }: FaqCategoryProps) {
  const [openId, setOpenId] = useState<string | null>(
    category.items[0]?.id ?? null,
  );
  const Icon = category.Icon;
  const titleId = "faq-" + category.id + "-title";
  const tinted = index % 2 === 1;

  return (
    <section
      id={category.id}
      aria-labelledby={titleId}
      className={[
        innerSectionClass,
        "scroll-mt-24",
        tinted ? "bg-[#F7FAFF]" : "bg-white",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />

      <div
        className={`relative z-10 ${innerContainerClass} grid items-start gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-12 xl:gap-16`}
      >
        <Reveal className="lg:sticky lg:top-28">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7]">
            <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <h2
            id={titleId}
            className="mt-4 font-montserrat text-2xl font-bold tracking-tight text-[#10234B] sm:text-3xl"
          >
            {category.title}
          </h2>
          <p className="mt-3 max-w-md font-inter text-sm leading-relaxed text-[#526987] sm:text-base">
            {category.description}
          </p>
          <p className="mt-4 inline-flex items-center rounded-full border border-[#DCE9FF] bg-white px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-wide text-[#3B6EA8]">
            {category.items.length} answers
          </p>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-3">
          {category.items.map((item, itemIndex) => {
            const isOpen = openId === item.id;
            const ItemIcon = item.Icon;
            const panelId = category.id + "-panel-" + item.id;

            return (
              <Reveal key={item.id} delay={itemIndex * 50}>
                <div
                  className={[
                    "overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors duration-300",
                    isOpen ? "border-[#C9DEFF]" : "border-slate-100",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenId((current) =>
                        current === item.id ? null : item.id,
                      )
                    }
                    className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5] sm:h-10 sm:w-10">
                      <ItemIcon size={18} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden font-montserrat text-[11px] font-bold text-[#C9DEFF] sm:block"
                    >
                      {String(itemIndex + 1).padStart(2, "0")}
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
                    id={panelId}
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 font-inter text-sm leading-relaxed text-slate-600 sm:px-5 sm:pl-[4.25rem]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
