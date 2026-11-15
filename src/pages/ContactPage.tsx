import ContactHero from "../features/contact/components/ContactHero";
import ContactNextSteps from "../features/contact/components/ContactNextSteps";
import OfficesSection from "../features/contact/components/OfficesSection";
import BookingSection from "../features/contact/components/BookingSection";
import ContactTestimonials from "../features/contact/components/ContactTestimonials";
import ContactWhy from "../features/contact/components/ContactWhy";
import FaqSection from "../features/contact/components/FaqSection";
import ContactServicesLinks from "../features/contact/components/ContactServicesLinks";
import CtaBanner from "../components/shared/CtaBanner";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactNextSteps />
      <BookingSection />
      <ContactTestimonials />
      <OfficesSection />
      <ContactWhy />
      <FaqSection />
      <ContactServicesLinks />
      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
