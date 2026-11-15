import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { blogHero, blogPosts, blogTopics } from "../features/blog/data/blog.data";
import { innerContainerClass, innerSectionClass } from "../components/shared/section.styles";
import PageHeroCompact from "../components/shared/PageHeroCompact";
import Reveal from "../components/shared/Reveal";
import CtaBanner from "../components/shared/CtaBanner";

const allTopicsLabel = "All Topics";

export default function BlogPage() {
  const [activeTopic, setActiveTopic] = useState<string>(allTopicsLabel);
  const isAll = activeTopic === allTopicsLabel;
  const articles = isAll
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeTopic);
  const [featured, ...rest] = articles;
  const FeaturedIcon = featured?.Icon;
  const topicOptions = [allTopicsLabel, ...blogTopics];

  return (
    <>
      <PageHeroCompact
        eyebrow={blogHero.eyebrow}
        eyebrowIcon={BookOpen}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
        backgroundImage="/image/background-image/global-network-wave-background.webp"
        title={blogHero.title}
        highlight="Build Notes"
        description={blogHero.description}
        chips={blogTopics}
        primaryCta={{ label: "Explore Articles", href: "#articles", showArrow: true }}
        secondaryCta={{ label: "Start a Project", href: "/contact" }}
      />

      <section id="articles" className={innerSectionClass + " scroll-mt-24 bg-white"}>
        <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl" />

        <div className={"relative z-10 " + innerContainerClass}>
          <Reveal>
          <div className="flex flex-col gap-6 border-b border-[#EDF3FB] pb-6 sm:pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <p className="flex items-center gap-2 font-playfair text-[11px] font-bold uppercase tracking-[0.14em] text-[#092F58] sm:text-xs">
                <span aria-hidden="true" className="h-px w-6 shrink-0 bg-[#092F58] sm:w-8" />
                Latest Articles
              </p>
              <h2 className="mt-3 font-montserrat text-2xl font-bold tracking-tight text-[#10234B] sm:text-3xl lg:text-[34px]">
                Notes from the build desk
              </h2>
              <p className="mt-2 font-inter text-sm leading-relaxed text-[#526987] sm:text-[15px]">
                Practical guides on AI automation, web development and shipping products that last.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end" role="group" aria-label="Filter articles by topic">
              {topicOptions.map((topic) => {
                const isActive = topic === activeTopic;
                const count = topic === allTopicsLabel
                  ? blogPosts.length
                  : blogPosts.filter((post) => post.category === topic).length;

                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setActiveTopic(topic)}
                    aria-pressed={isActive}
                    className={
                      "inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 font-inter text-xs font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1670F5] focus-visible:ring-offset-2 sm:text-[13px] " +
                      (isActive
                        ? "border-[#092F58] bg-[#092F58] text-white shadow-[0_8px_20px_rgba(9,47,88,0.18)]"
                        : "border-[#E1EAF6] bg-white text-[#526987] hover:border-[#B8D2F4] hover:text-[#0B2C55]")
                    }
                  >
                    {topic}
                    <span
                      className={
                        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold " +
                        (isActive ? "bg-white/15 text-white" : "bg-[#EAF2FF] text-[#1670F5]")
                      }
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          </Reveal>

          <Reveal delay={100}>
          {featured ? (
            <Link
              to={"/blog/" + featured.slug}
              className="group mt-6 grid overflow-hidden rounded-[1.75rem] border border-[#E1EAF6] bg-white shadow-[0_16px_44px_rgba(15,48,91,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#B8D2F4] hover:shadow-[0_26px_60px_rgba(15,48,91,0.14)] sm:mt-8 lg:grid-cols-[1fr_1.05fr]"
            >
              <div className={"relative flex min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br p-8 lg:min-h-[320px] " + featured.coverClass}>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:26px_26px] opacity-60" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/15" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                {FeaturedIcon && (
                  <FeaturedIcon size={86} strokeWidth={1.2} className="relative text-white/25 transition duration-500 group-hover:scale-105" aria-hidden="true" />
                )}
                <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                  {isAll ? "Featured Article" : featured.category}
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2.5 font-inter text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8298B5]">
                  <span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-[#1456C0]">{featured.category}</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="mt-3 font-montserrat text-xl font-bold leading-snug text-[#10234B] transition group-hover:text-[#1456C0] sm:text-2xl lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 font-inter text-sm leading-relaxed text-[#526987] sm:text-base">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#EDF3FB] pt-4">
                  <time dateTime={featured.dateTime} className="font-inter text-xs font-medium text-[#8298B5]">
                    {featured.date}
                  </time>
                  <span className="inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-wide text-[#1670F5]">
                    Read Article
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="mt-6 rounded-2xl border border-[#E1EAF6] bg-[#F7FAFF] px-6 py-14 text-center sm:mt-8">
              <p className="font-montserrat text-base font-bold text-[#10234B]">Nothing here yet</p>
              <p className="mt-1 font-inter text-sm text-[#526987]">
                No articles in this topic. Try another topic or start a project and I will write about it.
              </p>
            </div>
          )}
          </Reveal>

          {rest.length > 0 && (
            <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:gap-6">
              {rest.map((post, index) => {
                const Icon = post.Icon;
                return (
                  <Reveal key={post.slug} delay={index * 80} className="h-full">
                  <Link
                    to={"/blog/" + post.slug}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#E1EAF6] bg-white shadow-[0_10px_30px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#B8D2F4] hover:shadow-[0_20px_44px_rgba(15,48,91,0.12)]"
                  >
                    <div className={"relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br " + post.coverClass}>
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />
                      <Icon size={56} strokeWidth={1.3} className="relative text-white/25 transition duration-500 group-hover:scale-105" aria-hidden="true" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/15 px-2.5 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-center gap-2 font-inter text-[11px] font-medium text-[#8298B5]">
                        <time dateTime={post.dateTime}>{post.date}</time>
                        <span aria-hidden="true">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-2 font-montserrat text-base font-bold leading-snug text-[#10234B] transition group-hover:text-[#1456C0] sm:text-lg">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 font-inter text-xs leading-relaxed text-[#5B7291] sm:text-sm">
                        {post.excerpt}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-inter text-xs font-bold uppercase tracking-wide text-[#1670F5]">
                        Read Article
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                  </Reveal>
                );
              })}
            </div>
          )}

          <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#DCE9FF] bg-[#F7FAFF] p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">New build notes every few weeks</p>
              <p className="mt-1 font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">No fluff — just what is working in production right now.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#092F58] px-5 font-inter text-xs font-semibold text-white transition hover:bg-[#0F3D6E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1670F5] focus-visible:ring-offset-2 sm:text-sm"
            >
              Suggest a topic
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        showCountryPanel={false}
        backgroundImage="/image/background-image/around-the-world-landmarks-by-the-water.webp"
      />
    </>
  );
}
