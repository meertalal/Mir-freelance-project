import ServicesHero from "../features/services/components/ServicesHero";
import ServicesGrid from "../features/services/components/ServicesGrid";
import ServicesProcess from "../features/services/components/ServicesProcess";
import ServicesTechStack from "../features/services/components/ServicesTechStack";
import ServicesWhyChoose from "../features/services/components/ServicesWhyChoose";
import ServicesFeedback from "../features/services/components/ServicesFeedback";
import CtaBanner from "../components/shared/CtaBanner";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesTechStack />
      <ServicesWhyChoose />
      <ServicesFeedback />
      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
