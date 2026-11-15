import { CreditCard } from "lucide-react";
import PageHeroCompact from "../components/shared/PageHeroCompact";
import CtaBanner from "../components/shared/CtaBanner";
import ServicesPricing from "../features/services/components/ServicesPricing";
import ServicesIncluded from "../features/services/components/ServicesIncluded";
import ServicesCare from "../features/services/components/ServicesCare";
import ServicesFaq from "../features/services/components/ServicesFaq";

export default function PricingPage() {
  return (
    <>
      <PageHeroCompact
        eyebrow="Pricing & Packages"
        eyebrowIcon={CreditCard}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        title="Transparent Pricing for Every Stage"
        highlight="Pricing"
        subtitle="Simple packages with fixed quotes and no hidden extras."
        description="Every project starts with a free discovery call. You get a clear scope, timeline and price before any work begins."
        chips={["Fixed Quotes", "Milestone Payments", "No Hidden Extras"]}
        primaryCta={{
          label: "Get a Free Quote",
          href: "/contact",
          showArrow: true,
        }}
        secondaryCta={{ label: "View Services", href: "/services" }}
      />

      <ServicesPricing />
      <ServicesIncluded />
      <ServicesCare />
      <ServicesFaq />

      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
