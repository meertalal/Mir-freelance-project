import ServicesHero from "../features/services/components/ServicesHero";
import ServicesGrid from "../features/services/components/ServicesGrid";
import ProcessStrip from "../components/shared/ProcessStrip";
import TechStack from "../components/shared/TechStack";
import WhyChooseSection from "../components/shared/WhyChooseSection";
import FeaturedProjects from "../components/shared/FeaturedProjects";
import CtaBanner from "../components/shared/CtaBanner";
import {
  servicesCtaCopy,
  servicesProcessCopy,
  servicesProjectsCopy,
  servicesTechCopy,
  servicesWhyCopy,
  servicesWhyFeatures,
} from "../features/services/data/services-page.data";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ProcessStrip
        eyebrow={servicesProcessCopy.eyebrow}
        title={servicesProcessCopy.title}
        description={servicesProcessCopy.description}
      />
      <TechStack
        eyebrow={servicesTechCopy.eyebrow}
        title={servicesTechCopy.title}
        description={servicesTechCopy.description}
      />
      <WhyChooseSection
        eyebrow={servicesWhyCopy.eyebrow}
        title={servicesWhyCopy.title}
        description={servicesWhyCopy.description}
        features={servicesWhyFeatures}
      />
      <FeaturedProjects
        eyebrow={servicesProjectsCopy.eyebrow}
        title={servicesProjectsCopy.title}
        description={servicesProjectsCopy.description}
      />
      <CtaBanner
        eyebrow={servicesCtaCopy.eyebrow}
        title={servicesCtaCopy.title}
        description={servicesCtaCopy.description}
        supportNote={servicesCtaCopy.supportNote}
      />
    </>
  );
}
