import { timeline } from "../data/about-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import SectionHeading from "../../../components/shared/SectionHeading";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function AboutStory() {
  return (
    <section id="our-story" className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/image/background-image/global-connections-world-map.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/85 to-[#F7FAFF]" />
      </div>

      <div className={`${innerContainerClass} relative`}>
        <SectionHeading
          eyebrow="Our Story"
          title="A Journey Built on Craft and Trust"
          description="From early freelance projects to international product work, the focus has stayed the same: clear communication, strong engineering, and outcomes that matter."
        />

        <ol className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {timeline.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_10px_28px_rgba(15,48,91,0.05)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#D6E4F7]"
            >
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#1670F5]" />
                <p className="font-playfair text-xs font-bold uppercase tracking-wide text-[#092F58]">
                  {item.year}
                </p>
              </div>
              <h3 className="mt-3 font-montserrat text-base font-bold text-[#10234B]">
                {item.title}
              </h3>
              <p className="mt-1.5 font-inter text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex justify-center">
          <LinkButton to="/contact" showArrow>
            Learn More About Our Journey
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
