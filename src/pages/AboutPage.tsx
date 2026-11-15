import AboutHero from "../features/about/components/AboutHero";
import AboutStory from "../features/about/components/AboutStory";
import AboutExtras from "../features/about/components/AboutExtras";
import AboutHowIWork from "../features/about/components/AboutHowIWork";
import MissionVisionValues from "../features/about/components/MissionVisionValues";
import GlobalPresence from "../features/about/components/GlobalPresence";
import AboutTestimonials from "../features/about/components/AboutTestimonials";
import AboutBeyondCode from "../features/about/components/AboutBeyondCode";
import CtaBanner from "../components/shared/CtaBanner";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutExtras />
      <AboutHowIWork />
      <MissionVisionValues />
      <GlobalPresence />
      <AboutTestimonials />
      <AboutBeyondCode />
      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
