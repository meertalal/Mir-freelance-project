import { useState } from "react";
import SectionHeader from "../Works/SectionHeader";
import { innerContainerClass, innerSectionClass } from "../../../../components/shared/section.styles";
import { homeFaqCopy, homeFaqs } from "../../data/faq.data";
import FaqAccordionItem from "./FaqAccordionItem";
import FaqPromoCard from "./FaqPromoCard";

export default function HomeFaqSection() {
  const [openId, setOpenId] = useState<string>(homeFaqs[0]?.id ?? "");

  return (
    <section
      id="faq"
      aria-labelledby="home-faq-title"
      className={`
        ${innerSectionClass}
        bg-[#F7FAFF]
        2xl:px-16
        min-[2560px]:px-24
      `}
    >
      <div className={`relative z-10 ${innerContainerClass}`}>
        <SectionHeader
          titleId="home-faq-title"
          eyebrow={homeFaqCopy.eyebrow}
          title={homeFaqCopy.title}
          description={homeFaqCopy.description}
        />

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-10">
          <FaqPromoCard />

          <div className="flex min-w-0 flex-col gap-3">
            {homeFaqs.map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() =>
                  setOpenId((current) => (current === item.id ? "" : item.id))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
