import ProcessHero from "../features/process/components/ProcessHero";
import ProcessDetailCards from "../features/process/components/ProcessDetailCards";
import ProcessStrip from "../components/shared/ProcessStrip";
import TechStack from "../components/shared/TechStack";
import WhyChooseSection from "../components/shared/WhyChooseSection";
import FeaturedProjects from "../components/shared/FeaturedProjects";
import CtaBanner from "../components/shared/CtaBanner";
import { processWhyFeatures } from "../features/process/data/process-page.data";

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <ProcessStrip
        title="Our 5-Step Development Process"
        description="A proven workflow designed for clarity, speed, and quality."
      />
      <ProcessDetailCards />
      <TechStack title="Modern Tools for Modern Solutions" />
      <WhyChooseSection
        eyebrow="Why Choose Our Process"
        title="Built for Clarity and Results"
        features={processWhyFeatures}
        testimonialIds={["james-wilson", "michael-thompson", "sarah-johnson"]}
      />
      <FeaturedProjects />
      <CtaBanner />
    </>
  );
}
