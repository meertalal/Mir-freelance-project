import { contactHero, contactTrust } from "../data/contact-page.data";
import TrustRow from "../../../components/shared/TrustRow";
import PageEyebrow from "../../../components/shared/PageEyebrow";
import ContactForm from "./ContactForm";
import {
  innerSectionClass,
  pageHeroCopyClass,
  pageHeroDescClass,
  pageHeroGridClass,
  pageHeroTitleClass,
} from "../../../components/shared/section.styles";

export default function ContactHero() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
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

      <div className={pageHeroGridClass}>
        <div className={pageHeroCopyClass}>
          <PageEyebrow>{contactHero.eyebrow}</PageEyebrow>
          <h1 className={pageHeroTitleClass}>
            {contactHero.title}
          </h1>
          <p className={pageHeroDescClass}>
            {contactHero.description}
          </p>
          <TrustRow items={contactTrust} className="mt-7" />

          <div className="relative mt-10 w-full max-w-sm pb-4">
            <div className="overflow-hidden rounded-full border-4 border-white shadow-xl">
              <img
                loading="lazy"
                decoding="async"
                width={384}
                height={256}
                src={contactHero.image}
                alt="Let's talk about your project"
                className="aspect-[3/2] w-full object-cover object-top sm:h-64 sm:aspect-auto"
              />
            </div>
            <div className="absolute -right-2 top-6 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#10234B] shadow-md motion-safe:animate-float-soft">
              Let's Talk
            </div>
            <div className="absolute left-2 bottom-8 max-w-[180px] rounded-xl bg-[#092f58] px-3 py-2 text-[11px] font-semibold text-white shadow-md sm:-left-2">
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
