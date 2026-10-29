import ServicesHero from "../features/services/components/ServicesHero";
import ServicesGrid from "../features/services/components/ServicesGrid";
import ProcessStrip from "../components/shared/ProcessStrip";
import TechStack from "../components/shared/TechStack";
import WhyChooseSection from "../components/shared/WhyChooseSection";
import FeaturedProjects from "../components/shared/FeaturedProjects";
import CtaBanner from "../components/shared/CtaBanner";
import { servicesWhyFeatures } from "../features/services/data/services-page.data";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ProcessStrip />
      <TechStack />
      <WhyChooseSection features={servicesWhyFeatures} />
      <FeaturedProjects />
      <CtaBanner />
    </>
  );
}
