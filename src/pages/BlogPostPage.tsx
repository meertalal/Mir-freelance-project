import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import { useBlogPosts } from "../features/content/useEditorialContent";
import PageHeroCompact from "../components/shared/PageHeroCompact";
import Reveal from "../components/shared/Reveal";
import CtaBanner from "../components/shared/CtaBanner";
import LinkButton from "../components/ui/LinkButton";
import JsonLd from "../components/seo/JsonLd";
import NotFoundPage from "./NotFoundPage";
import usePageSeo from "../hooks/usePageSeo";
import { breadcrumbSchema, siteName, siteUrl } from "../data/seo.data";
import { innerContainerClass, innerSectionClass } from "../components/shared/section.styles";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data: blogPosts, loaded } = useBlogPosts();
  const post = blogPosts.find((item) => item.slug === slug);

  usePageSeo(
    useMemo(
      () =>
        post
          ? {
              title: post.title + " | Mir Talal Blog",
              description: post.excerpt,
              path: "/blog/" + post.slug,
              image: post.coverImage || `/image/og/blog-${post.slug}.png`,
            }
          : null,
      [post],
    ),
  );

  if (!post) {
    if (!loaded) return <div className="px-4 py-24 text-center font-inter text-sm text-[#526987]">Loading article…</div>;
    return <NotFoundPage />;
  }

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const Icon = post.Icon;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${siteUrl}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.dateTime,
        dateModified: post.dateTime,
        articleSection: post.category,
        url: `${siteUrl}/blog/${post.slug}`,
        image: post.coverImage ? new URL(post.coverImage, siteUrl).toString() : `${siteUrl}/image/og/blog-${post.slug}.png`,
        isAccessibleForFree: true,
        author: {
          "@type": "Person",
          name: post.authorName || "Mir Talal",
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
          "@id": `${siteUrl}/blog/${post.slug}`,
        },
      },
      breadcrumbSchema([
        { label: "Blog", path: "/blog" },
        { label: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
            <PageHeroCompact
        eyebrow={post.category}
        eyebrowIcon={Icon}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
        ]}
        backgroundImage={post.coverImage || "/image/background-image/global-network-wave-background.webp"}
        title={post.title}
        description={post.excerpt}
        meta={
          <>
            <span className="inline-flex items-center gap-2">
              <img
                src={post.authorAvatar || "/image/profile.webp"}
                alt={post.authorName || "Mir Talal"}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
              />
              <span className="font-semibold text-[#10234B]">{post.authorName || "Mir Talal"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden="true" />
              <time dateTime={post.dateTime}>{post.date}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} aria-hidden="true" />
              {post.readTime}
            </span>
          </>
        }
      />

      <section className={innerSectionClass + " bg-white"}>
        <div className={"relative z-10 mx-auto w-full max-w-3xl"}>
          <Reveal>
              <p className="font-inter text-base leading-relaxed text-[#334155] sm:text-lg sm:leading-8">{post.intro}</p>
          </Reveal>

          <div className="mt-8 space-y-8">
            {post.sections.map((section, index) => (
              <Reveal key={section.heading} delay={Math.min(index * 60, 180)}>
              <section>
                <h2 className="font-montserrat text-xl font-bold text-[#10234B] sm:text-2xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 font-inter text-sm leading-relaxed text-[#526987] sm:text-[15px] sm:leading-7">{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-2.5 rounded-2xl border border-[#EDF3FB] bg-[#F7FAFF] p-4 sm:p-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 font-inter text-sm leading-relaxed text-slate-700">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1670F5]" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
          <div className="mt-10 rounded-[1.5rem] border border-[#DCE9FF] bg-[#F7FAFF] p-5 sm:p-7">
            <h2 className="font-montserrat text-lg font-bold text-[#10234B]">Key Takeaways</h2>
            <ul className="mt-3 space-y-2.5">
              {post.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-2.5 font-inter text-sm leading-relaxed text-slate-700">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1670F5]" />
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
          </Reveal>

          <Reveal delay={140}>
          <div className="mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-[#E6EEF9] bg-white p-5 shadow-[0_12px_32px_rgba(15,48,91,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-3">
            <img src={post.authorAvatar || "/image/profile.webp"} alt={post.authorName || "Mir Talal"} width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full object-cover ring-2 ring-[#DCE9FF]" />
              <div>
                <p className="font-montserrat text-sm font-bold text-[#10234B]">{post.authorName || "Mir Talal"}</p>
                <p className="font-inter text-xs leading-relaxed text-[#526987]">{post.authorRole || "Freelance web & AI developer helping businesses build products that last."}</p>
              </div>
            </div>
            <LinkButton to="/about" variant="secondary" className="shrink-0">
              About Me
            </LinkButton>
          </div>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF3FB] pt-6">
            <Link to="/blog" className="group inline-flex min-h-11 items-center gap-2 font-inter text-xs font-bold uppercase tracking-wide text-[#0B2C55] transition hover:text-[#1670F5] sm:text-sm">
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              All Articles
            </Link>
            <Link to="/contact" className="group inline-flex min-h-11 items-center gap-2 font-inter text-xs font-bold uppercase tracking-wide text-[#1670F5] transition hover:text-[#092F58] sm:text-sm">
              Discuss a Project
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className={innerSectionClass + " bg-[#F7FAFF]"}>
        <div className={"relative z-10 " + innerContainerClass}>
          <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-playfair text-[11px] font-bold uppercase tracking-[0.16em] text-[#5882E8]">Keep Reading</p>
              <h2 className="mt-2 font-montserrat text-2xl font-bold text-[#10234B] sm:text-3xl">More Articles</h2>
            </div>
            <Link to="/blog" className="group inline-flex min-h-11 items-center gap-2 font-inter text-xs font-bold uppercase tracking-wide text-[#0B2C55] transition hover:text-[#1670F5] sm:text-sm">
              View All
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((item, index) => {
              const RelatedIcon = item.Icon;
              return (
                <Reveal key={item.slug} delay={index * 80} className="h-full">
                <Link
                  to={"/blog/" + item.slug}
                  className="group grid overflow-hidden rounded-[1.4rem] border border-[#E1EAF6] bg-white shadow-[0_10px_30px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#B8D2F4] hover:shadow-[0_20px_44px_rgba(15,48,91,0.12)] sm:grid-cols-[0.45fr_1fr]"
                >
                  <div className={"relative flex min-h-[130px] items-center justify-center overflow-hidden bg-gradient-to-br " + item.coverClass}>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:22px_22px] opacity-60" />
                    <RelatedIcon size={40} strokeWidth={1.3} className="relative text-white/25" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col justify-center p-4 sm:p-5">
                    <div className="flex items-center gap-2 font-inter text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8298B5]">
                      <span>{item.category}</span>
                      <span aria-hidden="true">•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="mt-2 font-montserrat text-sm font-bold leading-snug text-[#10234B] transition group-hover:text-[#1456C0] sm:text-base">{item.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-wide text-[#1670F5]">
                      Read
                      <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
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
