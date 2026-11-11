import { impactStats } from "../data/portfolio-page.data";
import { innerContainerClass } from "../../../components/shared/section.styles";

export default function ImpactStats() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20 min-[1920px]:px-16 min-[1920px]:py-24">
      <div className={`${innerContainerClass} grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-6`}>
        {impactStats.map(({ id, value, label, Icon }) => (
          <div
            key={id}
            className="rounded-2xl border border-[#D6E4F7] bg-[#F7FAFF] p-4 text-center transition hover:-translate-y-1 hover:shadow-md sm:p-5"
          >
            <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
              <Icon size={20} />
            </span>
            <p className="font-montserrat text-2xl font-bold text-[#10234B] sm:text-3xl">
              {value}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
