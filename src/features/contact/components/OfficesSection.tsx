import { Link } from "react-router-dom";
import { ArrowUpRight, Clock3, Globe2, MessageSquare } from "lucide-react";
import { contactActions, remoteRegions } from "../data/contact-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import { brand } from "../../../data/site.data";
import { innerContainerClass } from "../../../components/shared/section.styles";

const actionClass =
  "group flex min-h-14 items-center gap-3 rounded-xl border border-[#E6EEF9] bg-white px-3.5 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-[#BFD6F5] hover:shadow-[0_10px_24px_rgba(15,48,91,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8] sm:px-4";

const factRowClass =
  "flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5";

const factIconClass =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#93C5FD]";

export default function OfficesSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Global Coverage"
            title="Remote-First, Working Worldwide"
            description="Clients are based across these regions, and services are available anywhere in the world. Wherever you are, projects are delivered remotely with clear communication and dependable delivery."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="relative overflow-hidden rounded-2xl border border-[#0f3d6e] bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] p-5 shadow-[0_18px_40px_rgba(9,47,88,0.22)] sm:p-6 lg:p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#1670F5]/15 blur-3xl"
          />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex items-start gap-3.5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#93C5FD]">
                <Globe2 size={20} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-playfair text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A9C6EC]">
                  Remote-First Studio
                </p>
                <h3 className="mt-1 font-montserrat text-base font-bold text-white sm:text-lg">
                  No offices, no borders
                </h3>
                <p className="mt-1 max-w-md font-inter text-xs leading-relaxed text-white/65 sm:text-sm">
                  These regions are just a starting point. Anywhere in the
                  world, if you need a digital solution, it is available
                  remotely.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:w-[340px] lg:shrink-0">
              <div className={factRowClass}>
                <span className={factIconClass}>
                  <Globe2 size={15} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-playfair text-[9px] font-semibold uppercase tracking-[0.14em] text-[#A9C6EC]">
                    Coverage
                  </p>
                  <p className="mt-0.5 font-inter text-xs font-semibold text-white">
                    Serving clients worldwide
                  </p>
                </div>
              </div>

              <div className={factRowClass}>
                <span className={factIconClass}>
                  <Clock3 size={15} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-playfair text-[9px] font-semibold uppercase tracking-[0.14em] text-[#A9C6EC]">
                    Working Hours
                  </p>
                  <p className="mt-0.5 font-inter text-xs font-semibold text-white">
                    {brand.hours}
                  </p>
                </div>
              </div>

              <div className={factRowClass}>
                <span className={factIconClass}>
                  <MessageSquare size={15} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-playfair text-[9px] font-semibold uppercase tracking-[0.14em] text-[#A9C6EC]">
                    Response Time
                  </p>
                  <p className="mt-0.5 font-inter text-xs font-semibold text-white">
                    Replies within one business day
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-5 lg:grid-cols-4 lg:gap-5">
          {remoteRegions.map((region, index) => (
            <Reveal key={region.id} delay={index * 80} className="h-full">
            <article
              className="flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-white p-5 shadow-[0_8px_24px_rgba(15,48,91,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:shadow-[0_14px_32px_rgba(15,48,91,0.10)]"
            >
              <div className="flex items-center gap-1.5">
                {region.flags.map((flag) => (
                  <img
                    key={flag}
                    src={flag}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                ))}
              </div>
              <h3 className="mt-4 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                {region.title}
              </h3>
              <p className="mt-1 font-inter text-xs leading-relaxed text-slate-500 sm:text-sm">
                {region.countries}
              </p>
              <p className="mt-auto inline-flex items-center gap-1.5 border-t border-[#E6EEF9] pt-3 font-inter text-[11px] font-semibold text-[#1670F5] sm:text-xs">
                <Globe2 size={13} aria-hidden="true" />
                Remote collaboration
              </p>
            </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {contactActions.map((action) => {
            const Icon = action.Icon;
            const content = (
              <>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#1670F5] transition duration-300 group-hover:bg-[#092f58] group-hover:text-white">
                  <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="min-w-0 truncate font-inter text-xs font-semibold text-[#092f58] sm:text-sm">
                  {action.title}
                </span>
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="ml-auto hidden shrink-0 text-[#B9CBE5] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1670F5] sm:block"
                />
              </>
            );

            if (action.href.startsWith("mailto:") || action.href.startsWith("#")) {
              return (
                <a key={action.id} href={action.href} className={actionClass}>
                  {content}
                </a>
              );
            }

            return (
              <Link key={action.id} to={action.href} className={actionClass}>
                {content}
              </Link>
            );
          })}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
