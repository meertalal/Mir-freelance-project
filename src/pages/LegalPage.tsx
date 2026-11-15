import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Cookie,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { legalDocs, type LegalDoc } from "../data/legal.data";
import LinkButton from "../components/ui/LinkButton";
import PageHeroCompact from "../components/shared/PageHeroCompact";
import Reveal from "../components/shared/Reveal";
import { innerContainerClass } from "../components/shared/section.styles";

const legalBodyClass =
  "relative isolate w-full overflow-hidden bg-[#F7FAFF] px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20 min-[1920px]:px-16 min-[1920px]:py-24";

const icons = {
  privacy: ShieldCheck,
  terms: FileText,
  cookies: Cookie,
} as const;

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

    const update = () => {
      let current = nodes[0].id;

      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= 180) current = node.id;
      }

      setActiveId(current);
    };

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return activeId;
}

export default function LegalPage({ doc }: { doc: LegalDoc["slug"] }) {
  const legal = legalDocs[doc];
  const Icon = icons[doc];
  const sectionIds = useMemo(
    () => legal.sections.map((section) => section.id),
    [legal],
  );
  const activeId = useActiveSection(sectionIds);
  const relatedDocs = Object.values(legalDocs).filter(
    (item) => item.slug !== legal.slug,
  );

  const tableOfContents = (
    <ol className="space-y-0.5">
      {legal.sections.map((section, index) => {
        const isActive = section.id === activeId;

        return (
          <li key={section.id}>
            <a
              href={"#" + section.id}
              aria-current={isActive ? "true" : undefined}
              className={[
                "group flex items-start gap-2.5 rounded-xl px-2.5 py-2 font-inter text-xs leading-snug transition duration-200",
                isActive
                  ? "bg-[#F2F7FF] font-semibold text-[#092F58]"
                  : "text-[#526987] hover:bg-[#F7FAFF] hover:text-[#092F58]",
              ].join(" ")}
            >
              <span
                className={[
                  "mt-px inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-montserrat text-[9px] font-bold tabular-nums transition-colors duration-200",
                  isActive
                    ? "bg-[#1670F5] text-white"
                    : "bg-[#EAF2FF] text-[#1670F5] group-hover:bg-[#DCE9FF]",
                ].join(" ")}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">{section.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <PageHeroCompact
        eyebrow={legal.eyebrow}
        eyebrowIcon={Icon}
        backgroundImage="/image/background-image/global-network-wave-background.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: legal.title },
        ]}
        title={legal.title}
        description={legal.description}
        meta={
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} aria-hidden="true" className="text-[#1670F5]" />
            Last updated: {legal.updated}
          </span>
        }
      />

      <section className={legalBodyClass}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#EAF2FF] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#E3EDFB]/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#DCE9FF_1px,transparent_1px)] bg-[size:30px_30px] opacity-25"
        />

        <div className={`relative z-10 ${innerContainerClass}`}>
          <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-14">
            <aside className="min-w-0 lg:sticky lg:top-28">
              <Reveal>
                <div className="rounded-2xl border border-[#E1EAF6] bg-white p-5 shadow-[0_12px_32px_rgba(15,48,91,0.06)]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#0F3D6E_0%,#092F58_100%)] text-white shadow-[0_10px_22px_-10px_rgba(9,47,88,0.75)]">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-playfair text-[10px] font-bold uppercase tracking-[0.16em] text-[#8298B5]">
                        Legal Document
                      </p>
                      <p className="mt-0.5 truncate font-montserrat text-sm font-bold text-[#10234B]">
                        {legal.title}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-4 space-y-2 rounded-xl border border-[#EDF3FB] bg-[#F7FAFF] p-3 font-inter text-xs text-[#526987]">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="inline-flex items-center gap-1.5">
                        <CalendarDays size={13} aria-hidden="true" className="text-[#1670F5]" />
                        Last updated
                      </dt>
                      <dd className="font-semibold text-[#10234B]">{legal.updated}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="inline-flex items-center gap-1.5">
                        <FileText size={13} aria-hidden="true" className="text-[#1670F5]" />
                        Sections
                      </dt>
                      <dd className="font-semibold text-[#10234B]">{legal.sections.length}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <nav
                  aria-label="Document sections"
                  className="mt-4 hidden rounded-2xl border border-[#E1EAF6] bg-white p-3.5 shadow-[0_12px_32px_rgba(15,48,91,0.05)] lg:block"
                >
                  <p className="px-2.5 pb-2 font-playfair text-[10px] font-bold uppercase tracking-[0.16em] text-[#8298B5]">
                    On this page
                  </p>
                  {tableOfContents}
                </nav>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-4 hidden rounded-2xl bg-[linear-gradient(160deg,#0F3D6E_0%,#092F58_58%,#071F3D_100%)] p-5 text-white shadow-[0_18px_44px_-18px_rgba(9,47,88,0.6)] lg:block">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#8FB8FF] ring-1 ring-inset ring-white/15">
                    <Mail size={18} aria-hidden="true" />
                  </span>
                  <p className="mt-3 font-montserrat text-sm font-bold">
                    Need a clarification?
                  </p>
                  <p className="mt-1.5 font-inter text-xs leading-relaxed text-white/70">
                    If anything here is unclear, email me and I will explain it in
                    plain language.
                  </p>
                  <a
                    href="mailto:mirtalal.baloch@yahoo.com"
                    className="group mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white px-3.5 font-inter text-[11px] font-bold text-[#092F58] transition hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB8FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#092F58]"
                  >
                    Email me
                    <ArrowRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </Reveal>
            </aside>

            <div className="min-w-0">
              <Reveal className="lg:hidden">
                <details className="group overflow-hidden rounded-2xl border border-[#E1EAF6] bg-white shadow-[0_12px_32px_rgba(15,48,91,0.05)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-montserrat text-sm font-bold text-[#10234B] [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex items-center gap-2">
                      <FileText size={16} aria-hidden="true" className="text-[#1670F5]" />
                      On this page
                    </span>
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className="text-[#526987] transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <div className="border-t border-[#EDF3FB] p-3">{tableOfContents}</div>
                </details>
              </Reveal>

              <Reveal delay={60}>
                <article className="overflow-hidden rounded-[1.6rem] border border-[#E1EAF6] bg-white shadow-[0_18px_48px_rgba(15,48,91,0.08)]">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#EDF3FB] bg-[linear-gradient(120deg,#F7FAFF_0%,#EEF5FF_60%,#E9F2FF_100%)] px-5 py-4 font-inter text-xs text-[#526987] sm:px-8 lg:px-10">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} aria-hidden="true" className="text-[#1670F5]" />
                      Last updated
                      <span className="font-semibold text-[#10234B]">{legal.updated}</span>
                    </span>
                    <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-[#B8CFEC] sm:block" />
                    <span className="inline-flex items-center gap-1.5">
                      <FileText size={14} aria-hidden="true" className="text-[#1670F5]" />
                      <span className="font-semibold text-[#10234B]">{legal.sections.length}</span>
                      sections
                    </span>
                  </div>

                  <div className="px-5 py-1 sm:px-8 lg:px-10">
                    {legal.sections.map((section, index) => (
                      <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-28 border-b border-[#EDF3FB] py-7 last:border-0"
                      >
                        <div className="flex items-start gap-3.5">
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF] font-montserrat text-[11px] font-bold tabular-nums text-[#1670F5] ring-1 ring-[#D6E4F7]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h2 className="font-montserrat text-lg font-bold text-[#10234B] sm:text-xl">
                              {section.title}
                            </h2>
                            {section.paragraphs.map((paragraph) => (
                              <p
                                key={paragraph}
                                className="mt-3 font-inter text-sm leading-relaxed text-[#526987] sm:text-[15px] sm:leading-7"
                              >
                                {paragraph}
                              </p>
                            ))}
                            {section.bullets && (
                              <ul className="mt-4 space-y-2.5 rounded-2xl border border-[#EDF3FB] bg-[#F7FAFF] p-4 sm:p-5">
                                {section.bullets.map((bullet) => (
                                  <li
                                    key={bullet}
                                    className="flex items-start gap-2.5 font-inter text-sm leading-relaxed text-[#42546D]"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E0EDFF] text-[#1670F5]"
                                    >
                                      <Check size={10} strokeWidth={3} />
                                    </span>
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </section>
                    ))}
                  </div>

                  <div className="border-t border-[#EDF3FB] bg-[#F7FAFF] p-5 sm:p-6 lg:px-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1670F5] ring-1 ring-[#DCE9FF]">
                          <Mail size={18} aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                            Questions about this policy?
                          </p>
                          <p className="mt-1 font-inter text-sm leading-relaxed text-[#526987]">
                            Email me and I will clarify anything you need.
                          </p>
                        </div>
                      </div>
                      <LinkButton
                        to="mailto:mirtalal.baloch@yahoo.com"
                        variant="secondary"
                        className="shrink-0"
                      >
                        Email Mir Talal
                      </LinkButton>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-6">
                  <p className="font-playfair text-[10px] font-bold uppercase tracking-[0.16em] text-[#8298B5]">
                    Related documents
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {relatedDocs.map((item) => {
                      const RelatedIcon = icons[item.slug];

                      return (
                        <Link
                          key={item.slug}
                          to={"/" + item.slug}
                          className="group flex items-center gap-3 rounded-2xl border border-[#E1EAF6] bg-white p-4 shadow-[0_10px_26px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#B8D2F4] hover:shadow-[0_16px_36px_rgba(15,48,91,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1670F5] focus-visible:ring-offset-2"
                        >
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5] ring-1 ring-[#D6E4F7] transition-colors duration-300 group-hover:bg-[#092F58] group-hover:text-white">
                            <RelatedIcon size={17} aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-montserrat text-sm font-bold text-[#10234B] transition-colors duration-300 group-hover:text-[#1456C0]">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block font-inter text-[11px] text-[#8298B5]">
                              Read policy
                            </span>
                          </span>
                          <ArrowRight
                            size={15}
                            aria-hidden="true"
                            className="shrink-0 text-[#8298B5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#1670F5]"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
