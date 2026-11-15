import { ArrowUpRight, Download, FileText, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { techStack } from "../../../data/site.data";
import Reveal from "../../../components/shared/Reveal";
import SectionHeading from "../../../components/shared/SectionHeading";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function AboutExtras() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[#F7FAFF] to-white" />

      <div className={`${innerContainerClass} relative`}>
        <Reveal>
          <SectionHeading
            eyebrow="Resume & Toolkit"
            title="Credentials You Can Check"
            description="A quick look at the tools behind the work, plus a one-page CV you can download or share with your team."
          />
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
          <Reveal delay={80}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#092f58] p-6 text-white shadow-[0_18px_48px_rgba(9,47,88,0.22)] sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#1670F5]/25 blur-2xl" />

              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                <FileText size={20} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-playfair text-2xl font-bold tracking-tight">Resume / CV</h3>
              <p className="mt-2 max-w-sm font-inter text-sm leading-relaxed text-white/75">
                One page, no fluff. Roles, core services, selected projects and technical skills,
                ready to forward to a hiring or procurement team.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="/mir-talal-cv.pdf"
                  download="Mir-Talal-CV.pdf"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 font-inter text-sm font-semibold text-[#092f58] transition hover:bg-[#EAF2FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Download size={16} aria-hidden="true" />
                  Download CV
                </a>
                <Link
                  to="/contact"
                  className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/25 px-5 font-inter text-sm font-semibold text-white/90 transition hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get in Touch
                  <ArrowUpRight size={15} aria-hidden="true" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <p className="mt-auto pt-5 font-inter text-xs text-white/55">PDF - 1 page - Updated November 2026</p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex h-full flex-col rounded-3xl border border-[#E6EEF9] bg-[#F7FAFF] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white text-[#1670F5] shadow-sm ring-1 ring-[#D6E4F7]">
                  <Wrench size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-[#0B2545] sm:text-2xl">Tools & Platforms</h3>
                  <p className="font-inter text-xs text-slate-500 sm:text-sm">The stack used to design, build, ship and maintain client products.</p>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {techStack.map((tool) => (
                  <li
                    key={tool.id}
                    className="inline-flex items-center gap-2 rounded-full border border-[#DCE9FF] bg-white px-3 py-1.5 font-inter text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#5882E8] sm:text-[13px]"
                  >
                    <span className="size-2 rounded-full" style={{ backgroundColor: tool.color }} aria-hidden="true" />
                    {tool.name}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-5 font-inter text-xs leading-relaxed text-slate-500 sm:text-sm">
                Always learning - currently exploring the latest in AI automation, agent workflows and product tooling.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
