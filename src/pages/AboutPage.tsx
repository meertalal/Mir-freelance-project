import AboutHero from "../features/about/components/AboutHero";
import AboutStory from "../features/about/components/AboutStory";
import MissionVisionValues from "../features/about/components/MissionVisionValues";
import GlobalPresence from "../features/about/components/GlobalPresence";
import CtaBanner from "../components/shared/CtaBanner";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <MissionVisionValues />
      <GlobalPresence />
      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
