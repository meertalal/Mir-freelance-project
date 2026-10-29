import { sharedTestimonials } from "../../../data/site.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function TestimonialsGrid() {
  return (
    <section className="w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
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
