import { presenceFlags, trustedBy } from "../data/about-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function GlobalPresence() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
      <div className="mx-auto w-full max-w-[1280px] min-[1440px]:max-w-[1360px]">
        <SectionHeading
          title="Global Presence"
          description="Working with clients across continents with a remote-first delivery model."
        />

        <div className="relative overflow-hidden rounded-3xl border border-[#D6E4F7] bg-[#F7FAFF] p-6 sm:p-10">
          <img
            src="/image/home-hero/global-connections-world-map.webp"
            alt="World map showing global client presence"
            className="mx-auto max-h-[320px] w-full object-contain opacity-80"
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {presenceFlags.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-3 py-1.5 shadow-sm"
              >
                <img src={item.flag} alt="" className="h-5 w-5 rounded-full object-cover" />
                <span className="text-xs font-semibold text-slate-700">{item.name}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Trusted By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {trustedBy.map((brandName) => (
              <span
                key={brandName}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold tracking-wide text-slate-500 grayscale sm:text-sm"
              >
                {brandName}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
