import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock3, Gauge, ShieldCheck } from "lucide-react";
import { sharedServices } from "../data/site.data";
import { getServiceDetail } from "../features/services/data/service-details.data";
import PageHeroCentered from "../components/shared/PageHeroCentered";
import ProcessStrip from "../components/shared/ProcessStrip";
import CtaBanner from "../components/shared/CtaBanner";
import LinkButton from "../components/ui/LinkButton";
import Reveal from "../components/shared/Reveal";
import NotFoundPage from "./NotFoundPage";
import usePageSeo from "../hooks/usePageSeo";
import { innerContainerClass, innerSectionClass } from "../components/shared/section.styles";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const detail = getServiceDetail(slug);
  const service = sharedServices.find((item) => item.id === detail?.id);

  usePageSeo(
    useMemo(
      () =>
        service && detail
          ? {
              title: service.title + " Services | Mir Talal",
              description: service.description + " " + detail.tagline + ".",
              path: "/services/" + service.id,
              image: service.image,
            }
          : null,
      [service, detail],
    ),
  );

  if (!service || !detail) {
    return <NotFoundPage />;
  }

  const Icon = service.icon;
  const related = sharedServices.filter((item) => item.id !== service.id).slice(0, 3);
  const outcomeIcons = [Gauge, ShieldCheck, Clock3];
  const titleWords = service.title.split(" ");
  const titleHighlight = titleWords[titleWords.length - 1];
  const heroTrust = detail.outcomes.map((outcome, index) => ({
    title: outcome.value,
    description: outcome.label,
    Icon: outcomeIcons[index % outcomeIcons.length],
  }));

  return (
    <>
      <PageHeroCentered
        eyebrow="Service"
        eyebrowIcon={Icon}
        title={service.title}
        highlight={titleHighlight}
        subtitle={detail.tagline}
        description={detail.intro}
        trustItems={heroTrust}
        chips={detail.tech}
        primaryCta={{ label: "Get a Free Quote", href: "/contact", showArrow: true }}
        secondaryCta={{ label: "View Pricing", href: "/services#pricing" }}
        media={{
          src: service.image,
          alt: service.imageAlt,
          badge: "Done-for-you delivery",
          aspect: "aspect-[16/11]",
        }}
      />

      <section className={innerSectionClass + " bg-white"}>
        <div className={"relative z-10 " + innerContainerClass + " grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"}>
          <Reveal>
            <p className="font-playfair text-[11px] font-bold uppercase tracking-[0.16em] text-[#5882E8]">What&apos;s Included</p>
            <h2 className="mt-2 font-montserrat text-2xl font-bold text-[#10234B] sm:text-3xl">Everything You Need to Launch</h2>
            <p className="mt-3 max-w-xl font-inter text-sm leading-relaxed text-[#526987] sm:text-base">
              A clear scope with no hidden extras. Each item below is part of the standard delivery for this service.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {detail.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-[#E6EEF9] bg-[#F7FAFF] px-4 py-3 font-inter text-xs leading-relaxed text-slate-700 sm:text-sm">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1670F5]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] p-6 text-white shadow-[0_20px_50px_rgba(9,47,88,0.24)] sm:p-7">
                <p className="font-playfair text-[11px] font-bold uppercase tracking-[0.16em] text-[#93C5FD]">What You Can Expect</p>
                <dl className="mt-4 space-y-4">
                  {detail.outcomes.map((outcome) => (
                    <div key={outcome.label} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <dd className="font-montserrat text-2xl font-bold">{outcome.value}</dd>
                      <dt className="text-right font-inter text-xs text-[#A9C6EC]">{outcome.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-[1.5rem] border border-[#DCE9FF] bg-[#F7FAFF] p-6 sm:p-7">
                <h3 className="font-montserrat text-base font-bold text-[#10234B]">Who It&apos;s For</h3>
                <ul className="mt-3 space-y-2.5">
                  {detail.idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-inter text-xs leading-relaxed text-slate-700 sm:text-sm">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1670F5]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-[#DCE9FF] pt-4">
                  <LinkButton to="/contact" variant="secondary" className="w-full">
                    Ask a Question
                  </LinkButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ProcessStrip
        eyebrow="How We Deliver"
        title="A Clear Path From Brief to Launch"
        description="The same reliable process behind every engagement, adapted to the scope of this service."
      />

      <section className={innerSectionClass + " bg-white"}>
        <div className={"relative z-10 " + innerContainerClass}>
          <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-playfair text-[11px] font-bold uppercase tracking-[0.16em] text-[#5882E8]">More Services</p>
              <h2 className="mt-2 font-montserrat text-2xl font-bold text-[#10234B] sm:text-3xl">Explore Related Services</h2>
            </div>
            <Link to="/services" className="group inline-flex min-h-11 items-center gap-2 font-inter text-xs font-bold uppercase tracking-wide text-[#0B2C55] transition hover:text-[#1670F5] sm:text-sm">
              All Services
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((item, index) => {
              const RelatedIcon = item.icon;
              return (
                <Reveal key={item.id} delay={index * 80} className="h-full">
                <Link
                  to={"/services/" + item.id}
                  className="group flex h-full flex-col rounded-[1.4rem] border border-[#E1EAF6] bg-white p-5 shadow-[0_10px_30px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#B8D2F4] hover:shadow-[0_20px_44px_rgba(15,48,91,0.12)] sm:p-6"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5] transition duration-300 group-hover:bg-[#092f58] group-hover:text-white">
                    <RelatedIcon size={20} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-montserrat text-sm font-bold leading-snug text-[#10234B] transition group-hover:text-[#1456C0] sm:text-base">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 font-inter text-xs leading-relaxed text-[#5B7291] sm:text-sm">{item.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-inter text-[11px] font-bold uppercase tracking-wide text-[#1670F5]">
                    View Service
                    <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner showCountryPanel={false} />
    </>
  );
}
