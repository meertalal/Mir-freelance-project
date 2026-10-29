import AboutHero from "../features/about/components/AboutHero";
import AboutStory from "../features/about/components/AboutStory";
import MissionVisionValues from "../features/about/components/MissionVisionValues";
import TeamSection from "../features/about/components/TeamSection";
import GlobalPresence from "../features/about/components/GlobalPresence";
import CtaBanner from "../components/shared/CtaBanner";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <MissionVisionValues />
      <TeamSection />
      <GlobalPresence />
      <CtaBanner />
    </>
  );
}
