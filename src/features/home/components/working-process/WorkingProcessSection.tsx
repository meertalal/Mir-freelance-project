import SectionHeader from "../Works/SectionHeader";
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
      className="
        relative isolate w-full overflow-hidden bg-[#F7FAFF]
        px-4 py-10
        min-[480px]:px-5
        sm:px-6 sm:py-14
        lg:px-8 lg:py-16
        xl:px-12 xl:py-20
        2xl:px-16
        min-[1920px]:px-20
        min-[2560px]:px-24
      "
    >
      <div
        className="
          mx-auto w-full
          max-w-[1280px]
          min-[1440px]:max-w-[1360px]
          min-[1600px]:max-w-[1480px]
          min-[1920px]:max-w-[1640px]
          min-[2560px]:max-w-[1800px]
        "
      >
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
