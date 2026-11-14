import { Globe2, Mail, Phone } from "lucide-react";
import { contactHero, contactTrust } from "../data/contact-page.data";
import { brand } from "../../../data/site.data";
import PageEyebrow from "../../../components/shared/PageEyebrow";
import Reveal from "../../../components/shared/Reveal";
import ProjectStartForm from "../../home/components/lets-talk/ProjectStartForm";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

const contactLinkClass =
  "group flex items-center gap-3 rounded-2xl border border-[#E6EEF9] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,48,91,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#BFD6F5] hover:shadow-[0_14px_32px_rgba(15,48,91,0.10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8]";

const contactIconClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5] transition duration-300 group-hover:bg-[#092f58] group-hover:text-white";

export default function ContactHero() {
  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/image/background-image/global-network-wave-background.webp"
          alt=""
          className="h-full w-full object-cover object-center animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-white/60" />
      </div>

      <div className={`${innerContainerClass} relative`}>
        <div className="mx-auto w-full max-w-[1180px] motion-safe:animate-page-reveal rounded-[1.75rem] border border-white/80 bg-white/90 p-4 shadow-[0_30px_80px_rgba(15,48,91,0.10)] backdrop-blur-sm sm:rounded-[2rem] sm:p-6 lg:rounded-[2.5rem] lg:p-8 xl:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-10 xl:gap-14">
            <Reveal className="min-w-0">
              <PageEyebrow>{contactHero.eyebrow}</PageEyebrow>

              <h1 className="font-montserrat text-3xl font-bold leading-[1.14] tracking-tight text-[#10234b] sm:text-4xl lg:text-[2.35rem] xl:text-[2.85rem] 2xl:text-[3.35rem] min-[1920px]:text-[3.65rem]">
                {contactHero.title}
              </h1>

              <p className="mt-4 font-inter text-sm leading-relaxed text-slate-600 sm:text-base 2xl:text-lg">
                {contactHero.description}
              </p>

              <div className="mt-6 space-y-2.5 sm:mt-7">
                <a href={`mailto:${brand.email}`} className={contactLinkClass}>
                  <span className={contactIconClass}>
                    <Mail size={17} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-playfair text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Email
                    </span>
                    <span className="mt-0.5 block break-words font-inter text-sm font-semibold text-[#10234B] transition group-hover:text-[#1670F5]">
                      {brand.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${brand.phone.replace(/\s+/g, "")}`}
                  className={contactLinkClass}
                >
                  <span className={contactIconClass}>
                    <Phone size={17} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-playfair text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Phone
                    </span>
                    <span className="mt-0.5 block font-inter text-sm font-semibold text-[#10234B] transition group-hover:text-[#1670F5]">
                      {brand.phone}
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-3 rounded-2xl border border-[#E6EEF9] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,48,91,0.04)]">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
                    <Globe2 size={17} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-playfair text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Availability
                    </span>
                    <span className="mt-0.5 block font-inter text-sm font-semibold text-[#10234B]">
                      Serving clients worldwide
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="min-w-0">
              <ProjectStartForm
                title="Project Details"
                subtitle="Share a few details and I'll reply within one business day."
              />
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:mt-10 lg:gap-5 2xl:gap-6">
            {contactTrust.map(({ title, description, Icon }, index) => (
              <Reveal key={title} delay={index * 90} className="h-full">
                <div className="flex h-full flex-col items-center rounded-2xl border border-[#E6EEF9] bg-white px-5 py-6 text-center shadow-[0_8px_24px_rgba(15,48,91,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:shadow-[0_14px_32px_rgba(15,48,91,0.10)] 2xl:px-7 2xl:py-8">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1670F5] 2xl:h-12 2xl:w-12">
                    <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <p className="mt-3 font-montserrat text-sm font-bold text-[#10234B] sm:text-base 2xl:text-lg">
                    {title}
                  </p>
                  <p className="mt-1.5 font-inter text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
