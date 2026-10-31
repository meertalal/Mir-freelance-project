import SectionHeader from "./SectionHeader";
import LinkButton from "../ui/LinkButton";
import { innerContainerClass, innerSectionClass } from "./section.styles";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export default function CtaBanner({
  title = "Let's Build Something Amazing Together",
  description = "From idea to global success — websites, apps, AI and automation built for real business impact.",
}: CtaBannerProps) {
  return (
    <section className={`${innerSectionClass} bg-[#F4F8FF]`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-blue-100/80 blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass} flex flex-col items-center text-center`}>
        <SectionHeader
          eyebrow="From Idea to Global Success"
          title={title}
          description={description}
        />
        <div className="-mt-2 flex flex-wrap items-center justify-center gap-3">
          <LinkButton to="/contact" showArrow>
            Get a Free Quote
          </LinkButton>
          <LinkButton to="/contact" variant="secondary">
            Schedule a Call
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
