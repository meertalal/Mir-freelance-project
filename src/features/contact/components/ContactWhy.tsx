import { contactWhy } from "../data/contact-page.data";

export default function ContactWhy() {
  return (
    <section className="w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12 2xl:max-w-[1600px]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5] sm:text-xs">
            Why Businesses Choose Us
          </p>
          <h2 className="mt-2 font-georgia text-3xl font-bold text-[#10234B] sm:text-4xl">
            A Partner Focused on Outcomes
          </h2>
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
