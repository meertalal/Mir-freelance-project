import ServicesHero from "../features/services/components/ServicesHero";
import ServicesGrid from "../features/services/components/ServicesGrid";
import ServicesPricing from "../features/services/components/ServicesPricing";
import ServicesIncluded from "../features/services/components/ServicesIncluded";
import ServicesProcess from "../features/services/components/ServicesProcess";
import ServicesTechStack from "../features/services/components/ServicesTechStack";
import ServicesWhyChoose from "../features/services/components/ServicesWhyChoose";
import ServicesCare from "../features/services/components/ServicesCare";
import ServicesFeedback from "../features/services/components/ServicesFeedback";
import ServicesFaq from "../features/services/components/ServicesFaq";
import CtaBanner from "../components/shared/CtaBanner";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesPricing />
      <ServicesIncluded />
      <ServicesProcess />
      <ServicesTechStack />
      <ServicesWhyChoose />
      <ServicesCare />
      <ServicesFeedback />
      <ServicesFaq />
      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
