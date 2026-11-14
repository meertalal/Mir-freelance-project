import ContactHero from "../features/contact/components/ContactHero";
import OfficesSection from "../features/contact/components/OfficesSection";
import ContactWhy from "../features/contact/components/ContactWhy";
import FaqSection from "../features/contact/components/FaqSection";
import CtaBanner from "../components/shared/CtaBanner";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <OfficesSection />
      <ContactWhy />
      <FaqSection />
      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
