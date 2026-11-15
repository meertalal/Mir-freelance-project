import FeatureItem from "./FeatureItem";
import SectionHeader from "../../../../components/shared/SectionHeader";
import Reveal from "../../../../components/shared/Reveal";
import { innerContainerClass } from "../../../../components/shared/section.styles";
import { workFeatures, whyWorkCopy } from "../../data/why-work.data";

export default function WhyWorkWithMe() {
  return (
    <section
      id="why-work-with-me"
      aria-labelledby="why-work-title"
      className="
        relative isolate w-full overflow-hidden
        bg-gradient-to-b from-white via-[#F7FAFF] to-white
        px-4 py-12
        sm:px-6 sm:py-16
        lg:px-10 lg:py-20
        xl:px-12 xl:py-24
        2xl:px-16 2xl:py-28
        min-[2560px]:px-24 min-[2560px]:py-32
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"
      />

      <div className={`${innerContainerClass} relative z-10`}>
        <Reveal className="[&>header]:mb-0">
          <SectionHeader
            titleId="why-work-title"
            eyebrow={whyWorkCopy.eyebrow}
            title={whyWorkCopy.title}
            description={whyWorkCopy.description}
            className="mx-auto max-w-3xl"
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-5 2xl:gap-6">
          {workFeatures.map((feature, index) => (
            <Reveal key={feature.id} delay={index * 80} className="h-full">
              <FeatureItem feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
