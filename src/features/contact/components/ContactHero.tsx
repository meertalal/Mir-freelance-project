import { contactHero, contactTrust } from "../data/contact-page.data";
import TrustRow from "../../../components/shared/TrustRow";
import PageEyebrow from "../../../components/shared/PageEyebrow";
import ContactForm from "./ContactForm";
import {
  innerContainerClass,
  innerSectionClass,
  pageHeroDescClass,
  pageHeroTitleClass,
} from "../../../components/shared/section.styles";

export default function ContactHero() {
  return (
    <section className={`${innerSectionClass} bg-gradient-to-br from-white via-[#F7FAFF] to-[#EAF2FF]`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url('/image/home-hero/global-connections-world-map.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className={`relative z-10 ${innerContainerClass} grid items-start gap-10 lg:grid-cols-2`}>
        <div className="motion-safe:animate-page-reveal">
          <PageEyebrow>{contactHero.eyebrow}</PageEyebrow>
          <h1 className={pageHeroTitleClass}>
            {contactHero.title}
          </h1>
          <p className={pageHeroDescClass}>
            {contactHero.description}
          </p>
          <TrustRow items={contactTrust} className="mt-7" />

          <div className="relative mt-10 max-w-sm">
            <div className="overflow-hidden rounded-full border-4 border-white shadow-xl">
              <img
                src={contactHero.image}
                alt="Let's talk about your project"
                className="h-56 w-full object-cover sm:h-64"
              />
            </div>
            <div className="absolute -right-2 top-6 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#10234B] shadow-md motion-safe:animate-float-soft">
              Let's Talk
            </div>
            <div className="absolute -left-2 bottom-8 max-w-[180px] rounded-xl bg-[#092f58] px-3 py-2 text-[11px] font-semibold text-white shadow-md">
              Turn Ideas Into Digital Success
            </div>
          </div>
        </div>

        <div className="motion-safe:animate-page-reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
