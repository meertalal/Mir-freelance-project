import { useRef } from "react";
import { Globe2 } from "lucide-react";
import { presenceFlags } from "../data/about-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import { useReveal } from "../../../hooks/useReveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

type Flag = (typeof presenceFlags)[number];

function FlagPill({ item, index }: { item: Flag; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reveal = useReveal(ref, index * 55);

  return (
    <li ref={ref} style={reveal.style} className={reveal.className}>
      <span className="inline-flex w-full items-center gap-2 rounded-full border border-[#D6E4F7] bg-white px-3 py-2 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#5882E8] motion-reduce:transition-none">
        <img
          src={item.flag}
          alt=""
          loading="lazy"
          className="h-5 w-5 shrink-0 rounded-full object-cover"
        />
        <span className="truncate font-inter text-xs font-semibold text-slate-700">
          {item.name}
        </span>
      </span>
    </li>
  );
}

export default function GlobalPresence() {
  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/image/background-image/global-purple-map-callouts.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[72%_center] animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-[#F7FAFF]" />
      </div>

      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <div className="mb-3 flex justify-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/85 text-[#1670F5] shadow-sm ring-1 ring-[#D6E4F7]">
              <Globe2 size={20} strokeWidth={1.8} aria-hidden="true" />
            </span>
          </div>
          <SectionHeading
            title="Global Presence"
            description="Working with clients across continents with a remote-first delivery model."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/80 bg-white/75 p-4 shadow-[0_12px_36px_rgba(15,48,91,0.06)] backdrop-blur-sm sm:p-6 min-[1920px]:max-w-5xl">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {presenceFlags.map((item, index) => (
                <FlagPill key={item.name} item={item} index={index} />
              ))}
            </ul>
            <p className="mt-4 text-center font-inter text-xs leading-relaxed text-slate-500 sm:text-sm">
              These are some of the main markets. Wherever you are in the world,
              services are available remotely.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
