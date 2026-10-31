import { contactWhy } from "../data/contact-page.data";
import SectionHeader from "../../../components/shared/SectionHeader";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function ContactWhy() {
  return (
    <section className={`${innerSectionClass} bg-[#F7FAFF]`}>
      <div className={`${innerContainerClass} grid items-center gap-8 lg:grid-cols-2 lg:gap-12`}>
        <div>
          <SectionHeader
            align="left"
            eyebrow="Why Businesses Choose Us"
            title="A Partner Focused on Outcomes"
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactWhy.map(({ id, title, description, Icon }) => (
              <div
                key={id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
                  <Icon size={18} />
                </span>
                <h3 className="font-montserrat text-sm font-bold text-[#10234B]">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-[#092f58] p-2 shadow-xl">
          <img
            src="/image/profile.webp"
            alt="Modern workspace"
            className="h-[320px] w-full rounded-[1.35rem] object-cover opacity-90 sm:h-[400px]"
          />
          <blockquote className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 text-sm font-semibold text-[#10234B] shadow-lg backdrop-blur">
            “Let’s turn your ideas into powerful digital solutions.”
          </blockquote>
        </div>
      </div>
    </section>
  );
}
