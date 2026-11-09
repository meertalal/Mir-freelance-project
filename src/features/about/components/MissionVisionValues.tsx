import { Check } from "lucide-react";
import { missionVisionValues } from "../data/about-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

export default function MissionVisionValues() {
  return (
    <section className={`${innerSectionClass} bg-white`}>
      <div className={innerContainerClass}>
        <SectionHeading
          eyebrow="Our Purpose"
          title="Mission, Vision & Values"
          description="What guides every project and partnership."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {missionVisionValues.map((item) => {
            const Icon = item.Icon;
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_28px_rgba(15,48,91,0.05)] transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#1670F5]">
                  <Icon size={22} />
                </span>
                <h3 className="font-montserrat text-lg font-bold text-[#10234B]">{item.title}</h3>
                <p className="mt-2 font-inter text-sm text-slate-600">{item.description}</p>
                {item.checklist && (
                  <ul className="mt-4 space-y-2">
                    {item.checklist.map((value) => (
                      <li key={value} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check size={14} className="mt-0.5 text-[#1670F5]" />
                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
