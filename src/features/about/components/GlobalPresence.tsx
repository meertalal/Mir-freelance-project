import { presenceFlags } from "../data/about-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function GlobalPresence() {
  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/image/background-image/global-purple-map-callouts.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/65 to-[#F7FAFF]" />
      </div>

      <div className={`${innerContainerClass} relative`}>
        <SectionHeading
          title="Global Presence"
          description="Working with clients across continents with a remote-first delivery model."
        />

        <div className="mx-auto max-w-4xl rounded-3xl border border-white/80 bg-white/75 p-4 shadow-[0_12px_36px_rgba(15,48,91,0.06)] backdrop-blur-sm sm:p-6">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {presenceFlags.map((item) => (
              <li
                key={item.name}
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E4F7] bg-white px-3 py-2 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#5882E8]"
              >
                <img
                  src={item.flag}
                  alt=""
                  loading="lazy"
                  className="h-5 w-5 shrink-0 rounded-full object-cover"
                />
                <span className="truncate font-inter text-xs font-semibold text-slate-700">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
