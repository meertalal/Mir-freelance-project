import {
  servicesWhyCopy,
  servicesWhyFeatures,
} from "../data/services-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function ServicesWhyChoose() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-10 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl motion-safe:animate-float-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={servicesWhyCopy.eyebrow}
            title={servicesWhyCopy.title}
            description={servicesWhyCopy.description}
            className="mx-auto max-w-3xl"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5 2xl:gap-6">
          {servicesWhyFeatures.map(
            ({ id, title, description, Icon }, featureIndex) => (
              <Reveal key={id} delay={featureIndex * 80} className="h-full">
                <div className="group relative flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:bg-white hover:shadow-[0_16px_36px_rgba(15,48,91,0.10)] sm:p-6">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-7 top-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#1670F5]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7] transition duration-300 group-hover:from-[#092f58] group-hover:to-[#0f3d6e] group-hover:text-white 2xl:h-12 2xl:w-12">
                      <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-montserrat text-[11px] font-bold tracking-wider text-[#C9DEFF]"
                    >
                      0{featureIndex + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-montserrat text-sm font-bold text-[#10234B] 2xl:text-base">
                    {title}
                  </h3>
                  <p className="mt-1.5 font-inter text-xs leading-relaxed text-slate-600 sm:text-[13px] 2xl:text-sm">
                    {description}
                  </p>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
