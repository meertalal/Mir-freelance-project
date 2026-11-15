import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Quote,
  Star,
  Target,
  TriangleAlert,
} from "lucide-react";
import { sharedProjects, sharedTestimonials } from "../data/site.data";
import { useTestimonials } from "../features/content/useContent";
import { caseStudies, getCaseStudy } from "../features/portfolio/data/case-studies.data";
import PageHeroCentered from "../components/shared/PageHeroCentered";
import Reveal from "../components/shared/Reveal";
import LinkButton from "../components/ui/LinkButton";
import CtaBanner from "../components/shared/CtaBanner";
import JsonLd from "../components/seo/JsonLd";
import NotFoundPage from "./NotFoundPage";
import usePageSeo from "../hooks/usePageSeo";
import { breadcrumbSchema, siteName, siteUrl } from "../data/seo.data";
import {
  innerContainerClass,
  innerSectionClass,
} from "../components/shared/section.styles";

const eyebrowClass =
  "font-playfair text-[11px] font-bold uppercase tracking-[0.16em] text-[#5882E8]";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  const project = sharedProjects.find((item) => item.id === study?.id);
  const liveTestimonials = useTestimonials();
  const staticTestimonial = sharedTestimonials.find(
    (item) => item.id === study?.testimonialId,
  );
  const testimonial = staticTestimonial
    ? (liveTestimonials.find((item) => item.author === staticTestimonial.author) ??
      staticTestimonial)
    : undefined;

  const nextStudy = useMemo(() => {
    if (!study) return undefined;
    const currentIndex = caseStudies.findIndex((item) => item.id === study.id);
    return caseStudies[(currentIndex + 1) % caseStudies.length];
  }, [study]);
  const nextProject = sharedProjects.find((item) => item.id === nextStudy?.id);

  usePageSeo(
    useMemo(
      () =>
        project && study
          ? {
              title: project.title + " Case Study | Mir Talal",
              description: project.description ?? study.overview,
              path: "/portfolio/" + study.id,
              image: `/image/og/case-${study.id}.png`,
            }
          : null,
      [project, study],
    ),
  );

  if (!study || !project) {
    return <NotFoundPage />;
  }

  const titleWords = project.title.split(" ");
  const titleHighlight = titleWords[titleWords.length - 1];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/portfolio/${study.id}#article`,
        headline: `${project.title} Case Study`,
        description: study.overview,
        url: `${siteUrl}/portfolio/${study.id}`,
        image: `${siteUrl}/image/og/case-${study.id}.png`,
        articleSection: `${study.industry} Case Study`,
        about: study.services,
        keywords: [...study.services, study.industry, ...study.stack].join(
          ", ",
        ),
        author: {
          "@type": "Person",
          name: "Mir Talal",
          url: `${siteUrl}/about`,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: siteName,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/favicon.svg`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/portfolio/${study.id}`,
        },
      },
      breadcrumbSchema([
        { label: "Portfolio", path: "/portfolio" },
        { label: project.title, path: `/portfolio/${study.id}` },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <PageHeroCentered
        eyebrow="Case Study"
        eyebrowIcon={Star}
        title={project.title}
        highlight={titleHighlight}
        description={study.overview}
        trustItems={[
          { title: study.industry, description: "Industry", Icon: Building2 },
          { title: study.duration, description: "Timeline", Icon: Clock3 },
          { title: study.year, description: "Year", Icon: CalendarDays },
          { title: project.country, description: "Client", Icon: MapPin },
        ]}
        chips={project.tags}
        primaryCta={{ label: "Start a Similar Project", href: "/contact", showArrow: true }}
        secondaryCta={{ label: "All Projects", href: "/portfolio" }}
        media={{
          src: project.image,
          alt: project.imageAlt,
          badge: "Featured Case Study",
          badgeIcon: Star,
          aspect: "aspect-[16/10]",
        }}
      />

      <section className={innerSectionClass + " bg-white"}>
        <div className={innerContainerClass + " grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"}>
          <Reveal>
            <p className={eyebrowClass}>Project Overview</p>
            <h2 className="mt-2 font-montserrat text-2xl font-bold text-[#10234B] sm:text-3xl">
              What We Built
            </h2>
            <p className="mt-4 font-inter text-sm leading-relaxed text-[#526987] sm:text-base">
              {study.overview}
            </p>
            <p className="mt-4 font-inter text-sm leading-relaxed text-[#526987] sm:text-base">
              The engagement covered {study.services.join(", ").toLowerCase()} and was delivered in {study.duration}, with clear milestones and regular demos throughout.
            </p>

            <h3 className="mt-8 font-montserrat text-lg font-bold text-[#10234B]">What Was Delivered</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {study.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-[#E6EEF9] bg-[#F7FAFF] px-4 py-3 font-inter text-xs leading-relaxed text-slate-700 sm:text-sm">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1670F5]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <aside className="rounded-[1.5rem] border border-[#DCE9FF] bg-[#F7FAFF] p-6 shadow-[0_16px_40px_rgba(15,48,91,0.06)] sm:p-7">
              <p className={eyebrowClass}>At a Glance</p>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="font-inter text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8298B5]">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {study.services.map((service) => (
                      <span key={service} className="rounded-full bg-white px-2.5 py-1 font-inter text-[11px] font-semibold text-[#3B6EA8] ring-1 ring-[#DCE9FF]">
                        {service}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-inter text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8298B5]">Tech Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {study.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-[#E1EAF6] bg-white px-2.5 py-1 font-inter text-[11px] font-semibold text-[#526987]">
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-inter text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8298B5]">Timeline</dt>
                  <dd className="mt-1 font-montserrat text-sm font-bold text-[#10234B]">{study.duration} · {study.year}</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-[#DCE9FF] pt-5">
                <LinkButton to="/contact" showArrow className="w-full">
                  Discuss Your Project
                </LinkButton>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className={innerSectionClass + " bg-[#F7FAFF]"}>
        <div className={innerContainerClass}>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className={eyebrowClass}>The Engagement</p>
              <h2 className="mt-2 font-montserrat text-2xl font-bold text-[#10234B] sm:text-3xl lg:text-4xl">
                Challenge and Solution
              </h2>
              <p className="mt-3 font-inter text-sm leading-relaxed text-[#526987] sm:text-base">
                A focused look at the problem, the approach, and what changed for the client.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-2 lg:gap-6">
            <Reveal>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-[#F3D9D3] bg-white p-6 shadow-[0_12px_32px_rgba(15,48,91,0.05)] sm:p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDF0ED] text-[#C2410C]">
                  <TriangleAlert size={21} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-montserrat text-lg font-bold text-[#10234B] sm:text-xl">The Challenge</h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-[#526987]">
                  {study.challenge}
                </p>
                <ul className="mt-5 space-y-3 border-t border-[#F3E5E1] pt-5">
                  {study.challengePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 font-inter text-xs leading-relaxed text-slate-700 sm:text-sm">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97757]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={100}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-[#CFE3D8] bg-white p-6 shadow-[0_12px_32px_rgba(15,48,91,0.05)] sm:p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECF8F1] text-[#138A5B]">
                  <Target size={21} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-montserrat text-lg font-bold text-[#10234B] sm:text-xl">The Solution</h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-[#526987]">
                  {study.solution}
                </p>
                <ul className="mt-5 space-y-3 border-t border-[#DCEFE4] pt-5">
                  {study.solutionPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 font-inter text-xs leading-relaxed text-slate-700 sm:text-sm">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#138A5B]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={innerSectionClass + " bg-white"}>
        <div className={innerContainerClass}>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] p-6 shadow-[0_24px_60px_rgba(9,47,88,0.28)] sm:p-9 lg:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#1670F5]/20 blur-2xl" />
              <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10">
                <div>
                  <p className="font-playfair text-[11px] font-bold uppercase tracking-[0.16em] text-[#93C5FD]">The Impact</p>
                  <h2 className="mt-2 font-montserrat text-2xl font-bold text-white sm:text-3xl">Results That Matter</h2>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/70">
                    Measured outcomes after launch, not just delivered features.
                  </p>
                </div>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {study.results.map((result) => (
                    <div key={result.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur-sm sm:text-left">
                      <dd className="font-montserrat text-3xl font-bold text-white sm:text-4xl">{result.value}</dd>
                      <dt className="mt-1 font-inter text-[11px] font-medium uppercase tracking-[0.08em] text-[#A9C6EC] sm:text-xs">{result.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {testimonial && (
        <section className={innerSectionClass + " bg-white"}>
          <div className={innerContainerClass}>
            <Reveal>
              <figure className="mx-auto max-w-3xl rounded-[1.75rem] border border-[#E6EEF9] bg-[#F7FAFF] p-7 text-center shadow-[0_16px_44px_rgba(15,48,91,0.06)] sm:p-10">
                <Quote size={40} className="mx-auto text-[#BFD6F5]" aria-hidden="true" />
                <div className="mt-3 flex items-center justify-center gap-0.5 text-[#FBBF24]" aria-label={testimonial.rating + " out of 5 stars"}>
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} size={16} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 font-inter text-base leading-relaxed text-[#334155] sm:text-lg">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-center gap-3 border-t border-[#E6EEF9] pt-5">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    loading="lazy"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  />
                  <div className="text-left">
                    <p className="font-montserrat text-sm font-bold text-[#10234B]">{testimonial.author}</p>
                    <p className="font-inter text-xs text-[#526987]">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {nextProject && nextStudy && (
        <section className={innerSectionClass + " bg-[#F7FAFF]"}>
          <div className={innerContainerClass}>
            <Reveal>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={eyebrowClass}>Keep Exploring</p>
                  <h2 className="mt-2 font-montserrat text-2xl font-bold text-[#10234B] sm:text-3xl">Next Case Study</h2>
                </div>
                <Link to="/portfolio" className="group inline-flex min-h-11 items-center gap-2 font-inter text-xs font-bold uppercase tracking-wide text-[#0B2C55] transition hover:text-[#1670F5] sm:text-sm">
                  All Projects
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>

              <Link
                to={"/portfolio/" + nextProject.id}
                className="group mt-5 grid overflow-hidden rounded-[1.5rem] border border-[#E1EAF6] bg-white shadow-[0_10px_30px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#B8D2F4] hover:shadow-[0_22px_50px_rgba(15,48,91,0.13)] sm:grid-cols-[0.6fr_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EAF2FF] sm:aspect-auto sm:h-full sm:min-h-[200px]">
                  <img src={nextProject.image} alt={nextProject.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-7">
                  <div className="flex flex-wrap gap-1.5">
                    {nextProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#E1EAF6] bg-[#F7FAFF] px-2.5 py-1 font-inter text-[10px] font-semibold text-[#526987]">{tag}</span>
                    ))}
                  </div>
                  <h3 className="mt-3 font-montserrat text-lg font-bold text-[#10234B] transition group-hover:text-[#1456C0] sm:text-xl">{nextProject.title}</h3>
                  <p className="mt-2 line-clamp-2 font-inter text-sm leading-relaxed text-[#5B7291]">{nextProject.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-wide text-[#1670F5]">
                    View Case Study
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBanner showCountryPanel={false} />
    </>
  );
}
