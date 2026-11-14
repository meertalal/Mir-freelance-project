import { useRef } from "react";
import { purposePillars } from "../data/about-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import { useReveal } from "../../../hooks/useReveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

type Pillar = (typeof purposePillars)[number];

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const { Icon, title, description } = pillar;
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, index * 110);

  return (
    <div
      ref={ref}
      style={reveal.style}
      className={[
        reveal.className,
        "group relative flex flex-col items-center px-2 pt-6 text-center md:px-5 lg:px-8 xl:px-10",
        index > 0
          ? "mt-4 border-t border-[#E6EEF9] pt-10 md:mt-0 md:border-t-0 md:pt-6"
          : "",
      ].join(" ")}
    >
      {index > 0 && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 hidden h-3/4 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#D6E4F7] to-transparent md:block"
        />
      )}
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#1670F5] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none">
        <Icon size={28} strokeWidth={1.7} aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-montserrat text-lg font-bold text-[#10234B]">{title}</h3>
      <p className="mt-2.5 max-w-xs font-inter text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default function MissionVisionValues() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <SectionHeading
            eyebrow="Our Purpose"
            title="Building a Better Digital Future"
            description="We create digital products that connect people, solve real problems, and help businesses grow with confidence."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {purposePillars.map((pillar, index) => (
            <PillarCard key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
