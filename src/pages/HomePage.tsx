import Hero from "../features/home/components/home/hero";
import Service from "../features/home/components/service/ServicesSection";
import Works from "../features/home/components/Works/FeaturedWork";
import TechToolsSection from "../features/home/components/tech-tools/TechToolsSection";
import WorkingProcessSection from "../features/home/components/working-process/WorkingProcessSection";
import WhyWithUs from "../features/home/components/why-work-with-me/WhyWorkWithMe";
import HomeFaqSection from "../features/home/components/faq/HomeFaqSection";
import LetsTalkSection from "../features/home/components/lets-talk/LetsTalkSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Service />
      <Works />
      <TechToolsSection />
      <WorkingProcessSection />
      <WhyWithUs />
      <HomeFaqSection />
      <LetsTalkSection />
    </>
  );
}
