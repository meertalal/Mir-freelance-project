import { useState } from "react";
import SectionHeader from "../Works/SectionHeader";
import { homeFaqCopy, homeFaqs } from "../../data/faq.data";
import FaqAccordionItem from "./FaqAccordionItem";
import FaqPromoCard from "./FaqPromoCard";

export default function HomeFaqSection() {
  const [openId, setOpenId] = useState<string>(homeFaqs[0]?.id ?? "");

  return (
    <section
      id="faq"
      aria-labelledby="home-faq-title"
      className="
        relative isolate w-full overflow-hidden bg-[#F7FAFF]
        px-4 py-10
        min-[480px]:px-5
        sm:px-6 sm:py-14
        lg:px-8 lg:py-16
        xl:px-12 xl:py-20
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      "
    >
      <div
        className="
          mx-auto w-full
          max-w-[1280px]
          min-[1440px]:max-w-[1360px]
          min-[1600px]:max-w-[1480px]
          min-[1920px]:max-w-[1640px]
          min-[2560px]:max-w-[1800px]
        "
      >
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
