import { BriefcaseBusiness, Cpu, Headset, Layers3 } from "lucide-react";
import { portfolioHero, portfolioTrust } from "../data/portfolio-page.data";
import PageHeroCentered from "../../../components/shared/PageHeroCentered";

export default function PortfolioHero() {
  return (
    <PageHeroCentered
      eyebrow={portfolioHero.eyebrow}
      title={portfolioHero.title}
      highlight={portfolioHero.highlight}
      description={portfolioHero.description}
      trustItems={portfolioTrust}
      floatingIcons={[BriefcaseBusiness, Layers3, Cpu, Headset]}
      chips={["Web Applications", "Mobile Apps", "SaaS Platforms", "AI & Automation", "E-commerce"]}
    />
  );
}
