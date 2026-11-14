import { Globe2, Mail, Phone, Quote } from "lucide-react";
import { contactWhy, contactWhyCopy } from "../data/contact-page.data";
import { brand } from "../../../data/site.data";
import SectionHeader from "../../../components/shared/SectionHeader";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

const channelClass =
  "group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition duration-300 hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD]";

const channelIconClass =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#93C5FD] transition group-hover:bg-white/15";

export default function ContactWhy() {
  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />

      <div
        className={`relative z-10 ${innerContainerClass} grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-10 xl:gap-14`}
      >
        <div className="flex min-w-0 flex-col">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow={contactWhyCopy.eyebrow}
              title={contactWhyCopy.title}
              description={contactWhyCopy.description}
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {contactWhy.map(({ id, title, description, Icon }, index) => (
              <Reveal key={id} delay={index * 80} className="h-full">
              <div
                className="relative flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-white p-4 shadow-[0_8px_24px_rgba(15,48,91,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:shadow-[0_14px_32px_rgba(15,48,91,0.10)] sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 font-montserrat text-[11px] font-bold text-[#C9DEFF]"
                >
                  0{index + 1}
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] ring-1 ring-[#D6E4F7]">
                  <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                  {title}
                </h3>
                <p className="mt-1.5 font-inter text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {description}
                </p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="min-w-0">
        <div className="relative flex min-w-0 flex-col justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] p-6 shadow-[0_24px_60px_rgba(9,47,88,0.28)] sm:p-8 lg:p-9 xl:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#1670F5]/20 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#93C5FD]">
              <Quote size={16} strokeWidth={2} aria-hidden="true" />
            </span>
            <p className="mt-4 font-playfair text-xl font-semibold leading-snug text-white sm:text-2xl">
              Let&apos;s turn your ideas into real solutions.
            </p>
            <p className="mt-2 font-inter text-xs leading-relaxed text-white/65 sm:text-sm">
              Pick the channel that works for you and I&apos;ll get back to you with clear next steps.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-6">
              <a href={`mailto:${brand.email}`} className={channelClass}>
                <span className={channelIconClass}>
                  <Mail size={16} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-playfair text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A9C6EC]">
                    Email
                  </span>
                  <span className="mt-0.5 block truncate font-inter text-xs font-semibold text-white sm:text-sm">
                    {brand.email}
                  </span>
                </span>
              </a>

              <a href={`tel:${brand.phone.replace(/\s+/g, "")}`} className={channelClass}>
                <span className={channelIconClass}>
                  <Phone size={16} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-playfair text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A9C6EC]">
                    Phone
                  </span>
                  <span className="mt-0.5 block font-inter text-xs font-semibold text-white sm:text-sm">
                    {brand.phone}
                  </span>
                </span>
              </a>

              <div className={channelClass}>
                <span className={channelIconClass}>
                  <Globe2 size={16} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-playfair text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A9C6EC]">
                    Availability
                  </span>
                  <span className="mt-0.5 block font-inter text-xs font-semibold text-white sm:text-sm">
                    Serving clients worldwide
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
