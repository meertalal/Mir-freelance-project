import PortfolioHero from "../features/portfolio/components/PortfolioHero";
import PortfolioIndustries from "../features/portfolio/components/PortfolioIndustries";
import PortfolioGrid from "../features/portfolio/components/PortfolioGrid";
import TestimonialsGrid from "../features/portfolio/components/TestimonialsGrid";
import PortfolioFaq from "../features/portfolio/components/PortfolioFaq";
import CtaBanner from "../components/shared/CtaBanner";

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioIndustries />
      <PortfolioGrid />
      <TestimonialsGrid />
      <PortfolioFaq />
      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
