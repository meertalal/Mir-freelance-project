import { impactStats } from "../data/portfolio-page.data";

export default function ImpactStats() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 2xl:max-w-[1600px]">
        {impactStats.map(({ id, value, label, Icon }) => (
          <div
            key={id}
            className="rounded-2xl border border-[#D6E4F7] bg-[#F7FAFF] p-5 text-center transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1670F5] text-white">
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
