import { ClipboardList, Code2, Rocket, Route, Search } from "lucide-react";
import { processHero, processTrust } from "../data/process-page.data";
import { processSteps } from "../../../data/site.data";
import PageHeroCentered from "../../../components/shared/PageHeroCentered";

export default function ProcessHero() {
  return (
    <PageHeroCentered
      eyebrow={processHero.eyebrow}
      title={processHero.title}
      highlight={processHero.highlight}
      description={processHero.description}
      trustItems={processTrust}
      eyebrowIcon={Route}
      floatingIcons={[Search, ClipboardList, Code2, Rocket]}
      steps={processSteps.map(({ id, title }) => (id === "support" ? "Support" : title))}
    />
  );
}
