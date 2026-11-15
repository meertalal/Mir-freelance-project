import { Layers3 } from "lucide-react";
import {
  servicesHero,
  servicesHeroTrust,
} from "../data/services-page.data";
import PageHeroCentered from "../../../components/shared/PageHeroCentered";

export default function ServicesHero() {
  return (
    <PageHeroCentered
      eyebrow={servicesHero.badge}
      title={`${servicesHero.titleBefore}${servicesHero.titleAccent}${servicesHero.titleAfter}`}
      highlight={servicesHero.titleAccent}
      description={servicesHero.description}
      trustItems={servicesHeroTrust}
      eyebrowIcon={Layers3}
      availability={servicesHero.availability}
      primaryCta={servicesHero.primaryCta}
      secondaryCta={servicesHero.secondaryCta}
    />
  );
}
