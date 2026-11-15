import {
  CalendarCheck2,
  CheckCircle2,
  FileText,
  Mail,
  MessageCircle,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { brand } from "../data/site.data";
import LinkButton from "../components/ui/LinkButton";
import Reveal from "../components/shared/Reveal";
import { innerContainerClass } from "../components/shared/section.styles";

const nextSteps = [
  {
    id: "review",
    title: "I Review Your Brief",
    description:
      "I read through your goals, requirements and timeline within one business day.",
    Icon: FileText,
  },
  {
    id: "call",
    title: "We Schedule a Call",
    description:
      "A short call to answer questions, clarify scope and make sure we are aligned.",
    Icon: CalendarCheck2,
  },
  {
    id: "proposal",
    title: "You Get a Clear Proposal",
    description:
      "A fixed quote with deliverables, milestones and a start date you can plan around.",
    Icon: Rocket,
  },
] as const;

export default function ThankYouPage() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F8FF_55%,#F7FAFF_100%)] px-4 py-16 min-[480px]:px-5 sm:px-6 sm:py-20 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-26rem] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#DCEBFF_0%,rgba(220,235,255,0.5)_45%,transparent_70%)]" />
        <div className="absolute left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full border border-[#E1EAF6]/90 sm:h-[38rem] sm:w-[38rem]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E3ECF8_1px,transparent_1px),linear-gradient(to_bottom,#E3ECF8_1px,transparent_1px)] [background-size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_62%)]" />
      </div>

      <div className={innerContainerClass + " relative"}>
        <div className="mx-auto max-w-3xl text-center motion-safe:animate-page-reveal">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF] text-[#1670F5] shadow-[0_16px_40px_rgba(22,112,245,0.18)] ring-1 ring-[#D6E4F7]">
            <CheckCircle2 size={32} strokeWidth={1.9} aria-hidden="true" />
          </span>

          <p className="mt-6 font-playfair text-[11px] font-bold uppercase tracking-[0.18em] text-[#5882E8] sm:text-xs">
            Message Received
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl font-montserrat text-3xl font-bold leading-[1.1] tracking-tight text-[#10234b] sm:text-4xl lg:text-5xl">
            Thank You — Your Message Is On Its Way
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
            Thanks for sharing your project details. I will review everything
            and get back to you within one business day with next steps.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <LinkButton to="/" showArrow className="w-full sm:w-auto">
              Back to Home
            </LinkButton>
            <LinkButton to="/portfolio" variant="secondary" className="w-full sm:w-auto">
              Explore My Work
            </LinkButton>
          </div>
        </div>

        <Reveal delay={120} className="mx-auto mt-12 max-w-5xl">
          <ol className="grid gap-4 sm:grid-cols-3">
            {nextSteps.map(({ id, title, description, Icon }, index) => (
              <li
                key={id}
                className="rounded-2xl border border-[#E1EAF6] bg-white p-5 text-left shadow-[0_10px_30px_rgba(15,48,91,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="font-montserrat text-xs font-bold text-[#C6D6EA]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 font-montserrat text-sm font-bold text-[#10234B]">
                  {title}
                </p>
                <p className="mt-2 font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={200} className="mx-auto mt-10 max-w-3xl">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#DCE9FF] bg-white px-5 py-5 text-center shadow-[0_10px_28px_rgba(15,48,91,0.05)] sm:flex-row sm:text-left">
            <div>
              <p className="font-montserrat text-sm font-bold text-[#10234B]">
                Need to add something?
              </p>
              <p className="mt-1 font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">
                Reach me directly by email or WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href={`mailto:${brand.email}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-inter text-xs font-semibold text-[#092f58] transition hover:border-[#5882E8] hover:text-[#1670F5]"
              >
                <Mail size={15} aria-hidden="true" />
                Email Me
              </a>
              <a
                href={brand.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-inter text-xs font-semibold text-[#092f58] transition hover:border-[#5882E8] hover:text-[#1670F5]"
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </a>
              <Link
                to="/faq"
                className="inline-flex min-h-10 items-center rounded-xl px-3 font-inter text-xs font-semibold text-[#1670F5] transition hover:text-[#092f58]"
              >
                Read the FAQ
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
