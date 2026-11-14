import { useRef } from "react";
import { timeline } from "../data/about-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import { useReveal } from "../../../hooks/useReveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

type TimelineItem = (typeof timeline)[number];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reveal = useReveal(ref, index * 90);
  const { Icon } = item;

  return (
    <li ref={ref} style={reveal.style} className={reveal.className}>
      <div className="h-full rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_10px_28px_rgba(15,48,91,0.05)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#D6E4F7] motion-reduce:transition-none">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#1670F5]" />
            <p className="font-playfair text-xs font-bold uppercase tracking-wide text-[#092F58]">
              {item.year}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#1670F5]"
          >
            <Icon size={16} strokeWidth={1.9} />
          </span>
        </div>
        <h3 className="mt-3 font-montserrat text-base font-bold text-[#10234B]">
          {item.title}
        </h3>
        <p className="mt-1.5 font-inter text-sm leading-relaxed text-slate-600">
          {item.description}
        </p>
      </div>
    </li>
  );
}

export default function AboutStory() {
  return (
    <section id="our-story" className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <SectionHeading
            eyebrow="Our Story"
            title="A Journey Built on Craft and Trust"
            description="From early freelance projects to international product work, the focus has stayed the same: clear communication, strong engineering, and outcomes that matter."
          />
        </Reveal>

        <ol className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {timeline.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-9 flex justify-center">
            <LinkButton to="/contact" showArrow>
              Learn More About Our Journey
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
