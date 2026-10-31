import { sharedTestimonials } from "../../../data/site.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function TestimonialsGrid() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F7FAFF] px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
      <div className="mx-auto w-full max-w-[1280px] min-[1440px]:max-w-[1360px]">
        <SectionHeading
          title="Trusted by Businesses Worldwide."
          description="What clients say about working together."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {sharedTestimonials.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <span className="text-4xl font-bold leading-none text-blue-200">“</span>
              <p className="mt-2 font-inter text-sm italic leading-relaxed text-slate-700">
                {item.quote}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">{item.author}</p>
                  <p className="text-xs text-slate-500">
                    {item.role}, {item.company}
                  </p>
                </div>
                <div className="text-[#F59E0B]" aria-label={`${item.rating} stars`}>
                  {"★".repeat(item.rating)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
