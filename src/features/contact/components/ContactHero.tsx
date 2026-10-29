import { contactHero, contactTrust } from "../data/contact-page.data";
import TrustRow from "../../../components/shared/TrustRow";
import ContactForm from "./ContactForm";

export default function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#F7FAFF] to-[#EAF2FF] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
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

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 2xl:max-w-[1600px]">
        <div className="motion-safe:animate-page-reveal">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5] sm:text-xs">
            {contactHero.eyebrow}
          </p>
          <h1 className="max-w-xl font-georgia text-3xl font-bold leading-[1.15] text-[#10234B] sm:text-4xl lg:text-5xl">
            {contactHero.title}
          </h1>
          <p className="mt-4 max-w-lg font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
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
            <div className="absolute -left-2 bottom-8 max-w-[180px] rounded-xl bg-[#1670F5] px-3 py-2 text-[11px] font-semibold text-white shadow-md">
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
