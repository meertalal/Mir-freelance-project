import { timeline } from "../data/about-page.data";
import LinkButton from "../../../components/ui/LinkButton";
import SectionHeader from "../../../components/shared/SectionHeader";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function AboutStory() {
  return (
    <section id="our-story" className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div className={`${innerContainerClass} grid gap-10 lg:grid-cols-2 lg:items-center`}>
        <div>
          <SectionHeader
            align="left"
            eyebrow="Our Story"
            title="A Journey Built on Craft and Trust"
            description="From early freelance projects to international product work, the focus has stayed the same: clear communication, strong engineering, and outcomes that matter."
          />
          <div className="mt-7">
            <LinkButton to="/contact" showArrow>
              Learn More About Our Journey
            </LinkButton>
          </div>
        </div>

        <ol className="relative space-y-6 border-l-2 border-dashed border-[#93C5FD] pl-6">
          {timeline.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#092f58] ring-4 ring-[#EAF2FF]" />
              <p className="font-playfair text-xs font-bold uppercase tracking-wide text-[#092F58]">
                {item.year}
              </p>
              <h3 className="mt-1 font-montserrat text-base font-bold text-[#10234B]">
                {item.title}
              </h3>
              <p className="mt-1 font-inter text-sm text-slate-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
