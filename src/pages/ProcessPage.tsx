import ProcessHero from "../features/process/components/ProcessHero";
import ProcessQualityGates from "../features/process/components/ProcessQualityGates";
import HowWeWork from "../features/process/components/HowWeWork";
import WhatINeed from "../features/process/components/WhatINeed";
import EngagementOptions from "../features/process/components/EngagementOptions";
import ProcessPaymentMilestones from "../features/process/components/ProcessPaymentMilestones";
import ClientProof from "../features/process/components/ClientProof";
import ProcessChangeControl from "../features/process/components/ProcessChangeControl";
import ProcessFaq from "../features/process/components/ProcessFaq";
import ProcessAfterLaunch from "../features/process/components/ProcessAfterLaunch";
import CtaBanner from "../components/shared/CtaBanner";

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <ProcessQualityGates />
      <HowWeWork />
      <WhatINeed />
      <EngagementOptions />
      <ProcessPaymentMilestones />
      <ClientProof />
      <ProcessChangeControl />
      <ProcessFaq />
      <ProcessAfterLaunch />
      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
