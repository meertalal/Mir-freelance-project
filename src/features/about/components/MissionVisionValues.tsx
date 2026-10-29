import { Check } from "lucide-react";
import { missionVisionValues } from "../data/about-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function MissionVisionValues() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <SectionHeading
          title="Mission, Vision & Values"
          description="What guides every project and partnership."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {missionVisionValues.map((item) => {
            const Icon = item.Icon;
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_28px_rgba(15,48,91,0.05)] transition hover:-translate-y-1 hover:shadow-lg"
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
