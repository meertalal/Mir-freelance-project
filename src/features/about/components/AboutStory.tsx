import { timeline } from "../data/about-page.data";
import LinkButton from "../../../components/ui/LinkButton";

export default function AboutStory() {
  return (
    <section id="our-story" className="w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center 2xl:max-w-[1600px]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5] sm:text-xs">
            Our Story
          </p>
          <h2 className="mt-2 font-georgia text-3xl font-bold text-[#10234B] sm:text-4xl">
            A Journey Built on Craft and Trust
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
            From early freelance projects to international product work, the focus has stayed
            the same: clear communication, strong engineering, and outcomes that matter.
          </p>
          <div className="mt-7">
            <LinkButton to="/contact" showArrow>
              Learn More About Our Journey
            </LinkButton>
          </div>
        </div>

        <ol className="relative space-y-6 border-l-2 border-dashed border-[#93C5FD] pl-6">
          {timeline.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1670F5] ring-4 ring-[#EAF2FF]" />
              <p className="text-xs font-bold uppercase tracking-wide text-[#1670F5]">
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
