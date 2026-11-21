import { Headset, HelpCircle, MessageSquare, Rocket, Wallet } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import PageHeroCompact from "../components/shared/PageHeroCompact";
import CtaBanner from "../components/shared/CtaBanner";
import JsonLd from "../components/seo/JsonLd";
import FaqCategory from "../features/faq/components/FaqCategory";
import {
  faqCategories,
  faqPageCopy,
} from "../features/faq/data/faq-page.data";
import type { FaqPageItem } from "../features/faq/data/faq-page.data";
import { siteUrl } from "../data/seo.data";
import { innerContainerClass } from "../components/shared/section.styles";
import { useFaqs } from "../features/faq/useFaqs";

const categoryIcons = { "Getting Started": Rocket, "Services & Pricing": Wallet, "Process & Communication": MessageSquare, "Support & Aftercare": Headset };

export default function FaqPage() {
  const remoteFaqs = useFaqs();
  const categories = useMemo(() => {
    if (remoteFaqs === null) return faqCategories;
    const groups = new Map<string, FaqPageItem[]>();
    for (const faq of remoteFaqs.filter((item) => item.category.toLowerCase() !== "home")) {
      const list = groups.get(faq.category) ?? [];
      list.push({ id: String(faq.id), question: faq.question, answer: faq.answer, Icon: HelpCircle });
      groups.set(faq.category, list);
    }
    return [...groups.entries()].map(([title, items], index) => ({ id: `category-${index}`, title, description: "Answers to common project questions.", Icon: categoryIcons[title as keyof typeof categoryIcons] ?? HelpCircle, items }));
  }, [remoteFaqs]);
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/faq#faq`,
    mainEntity: categories.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    ),
  };
  return (
    <>
      <JsonLd data={faqStructuredData} />
      <PageHeroCompact
        eyebrow={faqPageCopy.eyebrow}
        eyebrowIcon={HelpCircle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        title={faqPageCopy.title}
        highlight={faqPageCopy.highlight}
        subtitle={faqPageCopy.subtitle}
        description={faqPageCopy.description}
        chips={faqPageCopy.chips}
        primaryCta={{
          label: "Get a Free Quote",
          href: "/contact",
          showArrow: true,
        }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
      />

      <section
        aria-label="FAQ categories"
        className="border-y border-[#E1EAF6] bg-white"
      >
        <div
          className={`${innerContainerClass} flex flex-wrap items-center justify-center gap-2 py-4`}
        >
          <span className="font-inter text-[11px] font-bold uppercase tracking-[0.14em] text-[#526987]">
            Jump to
          </span>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={"/faq#" + category.id}
              className="inline-flex min-h-9 items-center rounded-full border border-[#DCE9FF] bg-[#F7FAFF] px-3.5 font-inter text-xs font-semibold text-[#0f2c56] transition hover:border-[#5882E8] hover:bg-white hover:text-[#1670F5]"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </section>

      {categories.map((category, index) => (
        <FaqCategory key={category.id} category={category} index={index} />
      ))}

      <CtaBanner
        centered
        eyebrow="Still Have Questions?"
        title="Ask Me Anything Before You Commit"
        description="No pressure and no sales script. Send your question and I will reply within one business day."
      />
    </>
  );
}
