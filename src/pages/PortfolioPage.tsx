import PortfolioHero from "../features/portfolio/components/PortfolioHero";
import PortfolioGrid from "../features/portfolio/components/PortfolioGrid";
import ImpactStats from "../features/portfolio/components/ImpactStats";
import ProcessStrip from "../components/shared/ProcessStrip";
import TestimonialsGrid from "../features/portfolio/components/TestimonialsGrid";
import CtaBanner from "../components/shared/CtaBanner";

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <ImpactStats />
      <ProcessStrip
        title="How Projects Move From Idea to Launch"
        description="The same clear process behind every featured case study."
      />
      <TestimonialsGrid />
      <CtaBanner />
    </>
  );
}
