import SectionHeader from "../Works/SectionHeader";
import { innerContainerClass, innerSectionClass } from "../../../../components/shared/section.styles";
import {
  workingProcessCopy,
  workingProcessSteps,
} from "../../data/working-process.data";
import ProcessStepCard from "./ProcessStepCard";
import ProcessHighlights from "./ProcessHighlights";

export default function WorkingProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="working-process-title"
      className={`
        ${innerSectionClass}
        bg-[#F7FAFF]
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      `}
    >
      <div className={`relative z-10 ${innerContainerClass}`}>
        <SectionHeader
          titleId="working-process-title"
          eyebrow={workingProcessCopy.eyebrow}
          title={workingProcessCopy.title}
          description={workingProcessCopy.description}
        />

        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-10">
          {workingProcessSteps.map((step, index) => (
            <ProcessStepCard
              key={step.id}
              step={step}
              showConnector={index < workingProcessSteps.length - 1}
            />
          ))}
        </ol>

        <ProcessHighlights />
      </div>
    </section>
  );
}
