import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useSiteSettings } from "../../site-settings/useSiteSettings";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

const callSteps = [
  "We clarify your goals, users and must-have features.",
  "You get honest feedback on scope, timeline and budget.",
  "I send a clear proposal with milestones and next steps.",
] as const;

export default function BookingSection() {
  const contact = useSiteSettings();

  const bookingHref =
    "mailto:" +
    contact.email +
    "?subject=Discovery%20Call%20Request&body=Hi%20Mir%2C%20I%20would%20like%20to%20book%20a%20discovery%20call.%0A%0AProject%3A%0ATimeline%3A%0ABudget%3A";

  const quickContacts = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: contact.phone,
      href: contact.whatsappHref,
      Icon: MessageCircle,
      external: true,
    },
    {
      id: "email",
      label: "Email",
      value: contact.email,
      href: "mailto:" + contact.email,
      Icon: Mail,
      external: false,
    },
  ];

  return (
    <section
      id="book-a-call"
      aria-labelledby="book-a-call-title"
      className={innerSectionClass + " scroll-mt-24 bg-white"}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#EAF2FF] blur-3xl motion-safe:animate-float-soft" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#E3EDFB]/70 blur-3xl" />

      <div className={"relative z-10 " + innerContainerClass + " grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"}>
        <Reveal>
          <SectionHeading
            titleId="book-a-call-title"
            align="left"
            eyebrow="Book a Call"
            title="Schedule a Discovery Call"
            description="A free 30-minute conversation to understand your project before any commitment."
            className="mb-6 sm:mb-7"
          />

          <ul className="grid gap-3 sm:grid-cols-2">
            {quickContacts.map(({ id, label, value, href, Icon, external }) => (
              <li key={id}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#BFD6F5] hover:bg-white hover:shadow-[0_16px_36px_rgba(15,48,91,0.10)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1670F5] ring-1 ring-[#DCE9FF] transition group-hover:bg-[#092f58] group-hover:text-white">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="mt-3 font-montserrat text-xs font-bold text-[#10234B]">{label}</span>
                  <span className="mt-1 truncate font-inter text-[11px] text-[#526987]">{value}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 font-inter text-[10px] font-bold uppercase tracking-[0.08em] text-[#1670F5]">
                    Open
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F7FAFF] px-3.5 py-2 font-inter text-[11px] font-medium text-[#526987] ring-1 ring-[#E6EEF9]">
            <Clock3 size={13} className="text-[#1670F5]" aria-hidden="true" />
            {contact.hours} · usually replies within one business day
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0f3d6e] via-[#092f58] to-[#072444] p-6 shadow-[0_24px_60px_rgba(9,47,88,0.3)] sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-[#1670F5]/20 blur-2xl" />

            <div className="relative">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#93C5FD] ring-1 ring-white/15">
                <CalendarCheck2 size={21} aria-hidden="true" />
              </span>
              <p className="mt-4 font-playfair text-[11px] font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">Free 30-minute call</p>
              <h3 className="mt-1.5 font-montserrat text-xl font-bold text-white sm:text-2xl">What happens on the call</h3>

              <ol className="mt-5 space-y-3">
                {callSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1670F5] font-montserrat text-[11px] font-bold text-white">{index + 1}</span>
                    <span className="font-inter text-xs leading-relaxed text-white/85 sm:text-sm">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-5 flex flex-wrap items-center gap-2 font-inter text-[11px] text-[#A9C6EC]">
                <CheckCircle2 size={14} className="text-[#93C5FD]" aria-hidden="true" />
                No obligation. Bring questions, references or a rough idea.
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row">
                <a
                  href={bookingHref}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 font-inter text-xs font-bold uppercase tracking-wide text-[#092f58] transition hover:bg-[#EAF2FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Request a Call Slot
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 font-inter text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
