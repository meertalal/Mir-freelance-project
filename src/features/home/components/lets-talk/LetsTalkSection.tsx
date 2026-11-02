import SectionHeader from "../Works/SectionHeader";
import { innerSectionClass } from "../../../../components/shared/section.styles";
import { letsTalkCopy } from "../../data/lets-talk.data";
import LetsTalkSteps from "./LetsTalkSteps";
import LetsTalkActions from "./LetsTalkActions";
import ProjectStartForm from "./ProjectStartForm";

export default function LetsTalkSection() {
  return (
    <section
      id="contact"
      aria-labelledby="lets-talk-title"
      className={`
        ${innerSectionClass}
        bg-[#F4F8FF]
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      `}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-blue-100/80 blur-3xl"
      />

      <div
        className="
          relative z-10 mx-auto grid w-full
          max-w-[1280px] grid-cols-1 items-start gap-10
          lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12
          min-[1440px]:max-w-[1360px]
          min-[1600px]:max-w-[1480px]
          min-[1920px]:max-w-[1640px] min-[1920px]:gap-16
          min-[2560px]:max-w-[1800px]
        "
      >
        <div className="min-w-0">
          <SectionHeader
            align="center"
            alignLg="left"
            titleId="lets-talk-title"
            eyebrow={letsTalkCopy.eyebrow}
            title={letsTalkCopy.title}
            description={letsTalkCopy.description}
          />
          <LetsTalkSteps />
          <LetsTalkActions />
        </div>

        <ProjectStartForm />
      </div>
    </section>
  );
}
