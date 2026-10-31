import { ArrowRight, HelpCircle, MessageCircle } from "lucide-react";
import { homeFaqCopy } from "../../data/faq.data";

export default function FaqPromoCard() {
  return (
    <aside
      className="
        relative overflow-hidden rounded-[1.75rem] border border-[#D6E4F7]
        bg-gradient-to-br from-[#EAF2FF] via-[#F5F9FF] to-[#DCEBFF]
        px-6 py-10 text-center
        sm:px-8 sm:py-12
        lg:flex lg:min-h-full lg:flex-col lg:items-center lg:justify-center
      "
    >
      <div className="relative mb-6 flex h-28 items-center justify-center sm:h-32">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-16 w-16 -translate-x-[70%] rounded-full bg-[#1670F5] shadow-lg"
        />
        <HelpCircle
          aria-hidden="true"
          className="relative z-10 h-10 w-10 text-white"
          strokeWidth={2.4}
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-8 flex h-14 w-14 translate-x-[20%] items-center justify-center rounded-full bg-white shadow-md"
        >
          <MessageCircle className="h-6 w-6 text-[#1670F5]" />
        </span>
      </div>

      <h3 className="font-montserrat text-xl font-bold text-[#10234B] sm:text-2xl">
        {homeFaqCopy.promoTitle}
      </h3>
      <p className="mx-auto mt-3 max-w-xs font-inter text-sm leading-relaxed text-slate-600">
        {homeFaqCopy.promoDescription}
      </p>
      <a
        href={homeFaqCopy.ctaHref}
        className="
          group mt-6 inline-flex min-h-11 items-center justify-center gap-2
          rounded-xl bg-[#092f58] px-5 font-inter text-sm font-bold text-white
          transition hover:-translate-y-0.5 hover:bg-[#0f3d6e]
        "
      >
        {homeFaqCopy.ctaLabel}
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition group-hover:translate-x-1"
        />
      </a>
    </aside>
  );
}
