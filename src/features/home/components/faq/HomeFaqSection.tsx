import { useState } from "react";
import SectionHeader from "../../../../components/shared/SectionHeader";
import Reveal from "../../../../components/shared/Reveal";
import { innerContainerClass, innerSectionClass } from "../../../../components/shared/section.styles";
import { homeFaqCopy, homeFaqs } from "../../data/faq.data";
import FaqAccordionItem from "./FaqAccordionItem";
import FaqPromoCard from "./FaqPromoCard";
import { useFaqs } from "../../../faq/useFaqs";
import { HelpCircle } from "lucide-react";

export default function HomeFaqSection() {
  const remoteFaqs = useFaqs();
  const items = remoteFaqs === null
    ? homeFaqs
    : remoteFaqs.filter((item) => item.category.toLowerCase() === "home").map((item) => ({ id: String(item.id), question: item.question, answer: item.answer, Icon: HelpCircle }));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openId = selectedId ?? items[0]?.id ?? "";

  return (
    <section
      id="faq"
      aria-labelledby="home-faq-title"
      className={`
        ${innerSectionClass}
        bg-[#F7FAFF]
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      `}
    >
      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal className="[&>header]:mb-0">
          <SectionHeader
            titleId="home-faq-title"
            eyebrow={homeFaqCopy.eyebrow}
            title={homeFaqCopy.title}
            description={homeFaqCopy.description}
          />
        </Reveal>

        <Reveal delay={100}>
        <div className="mt-7 grid grid-cols-1 items-stretch gap-6 sm:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-10">
          <FaqPromoCard />

          <div className="flex min-w-0 flex-col gap-3">
            {items.map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() =>
                  setSelectedId((current) => (current === item.id ? "" : item.id))
                }
              />
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
