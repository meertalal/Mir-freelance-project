import { ArrowRight } from "lucide-react";
import WorldMapIllustration from "./WorldMapIllustration";
import { countries, trustItems } from "../data/hero.data";


export default function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-title" className="w-full min-h-screen bg-[url('/image/home-hero/global-connections-world-map.png')] bg-cover bg-center bg-no-repeat relative isolate overflow-hidden bg-[linear-gradient(115deg,#fff_0%,#fff_45%,#f5faff_100%)]">
      <div className="mx-auto grid min-h-155 w-[calc(100%-3rem)] max-w-312 grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] items-center gap-5 py-10 max-[1023px]:min-h-140 max-[1023px]:w-[calc(100%-2rem)] max-[1023px]:gap-3 max-[767px]:min-h-0 max-[767px]:grid-cols-1 max-[767px]:gap-8 max-[767px]:py-10 max-[420px]:w-[calc(100%-1.5rem)]">
        <div className="relative z-10 min-w-0">
          <p className="mb-[0.8rem] text-[10px] font-extrabold uppercase tracking-[0.07em] text-blue-600">Software Development · AI · Automation</p>
          <h1 id="hero-title" className="mb-[0.8rem] max-w-[600px] font-playfair
           text-[clamp(2rem,3.45vw,2.9rem)] font-bold leading-[1.06] tracking-[-0.045em] text-[#10234b] max-[1023px]:text-[clamp(1.8rem,4vw,2.4rem)] max-[767px]:max-w-[580px] max-[767px]:text-[clamp(2rem,7.4vw,2.8rem)] max-[420px]:text-[clamp(1.8rem,8vw,2.2rem)] max-[420px]:tracking-[-0.04em]">
            Digital Solutions<br />for Businesses in<br />Worldwide
          </h1>
          <p className="mb-4 max-w-[490px] text-xs leading-[1.65] text-slate-600 max-[767px]:text-[13px]">We help startups and businesses build modern websites, mobile apps, AI agents, chatbots, SaaS platforms and automation solutions with reliable support and on-time delivery.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#contact" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-blue-600 bg-blue-600 px-4 text-[11px] font-bold text-white no-underline shadow-[0_4px_12px_#2563eb24] transition duration-200 hover:-translate-y-0.5 hover:border-blue-700 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Get a Free Quote <ArrowRight size={15} aria-hidden="true" /></a>
            <a href="#portfolio" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-[11px] font-bold text-slate-900 no-underline transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">View Our Work</a>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 max-[420px]:grid-cols-2">
            {trustItems.map(({ title, description, Icon }) => (
              <div key={title} className="flex min-w-0 items-start gap-2">
                <Icon size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-blue-600" />
                <div className="min-w-0"><p className="text-[10px] font-bold leading-tight text-slate-900">{title}</p><p className="mt-1 text-[9px] leading-[1.4] text-slate-500">{description}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 max-[420px]:gap-[0.65rem]" aria-label="Countries served">
            {countries.map(({ name, flag }) => <span key={name} className="inline-flex items-center gap-1.5 text-[9px] text-slate-600"><span className="text-base leading-none" aria-hidden="true">{flag}</span>{name}</span>)}
          </div>
        </div>
        {/* <div className="flex min-w-0 items-center justify-center max-[767px]:w-full"><WorldMapIllustration /></div> */}
      </div>
    </section>
  );
}
