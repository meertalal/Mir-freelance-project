import { ChevronDown } from "lucide-react";
import type { HomeFaqItem } from "../../data/faq.data";

type FaqAccordionItemProps = {
  item: HomeFaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  const Icon = item.Icon;

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors duration-300",
        isOpen ? "border-[#C9DEFF] bg-[#F7FAFF]" : "border-slate-100",
      ].join(" ")}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5] sm:h-10 sm:w-10">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
          {item.question}
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
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
