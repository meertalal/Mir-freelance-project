import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactActions, offices } from "../data/contact-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function OfficesSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white px-4 py-10 min-[480px]:px-5 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-12 xl:py-20">
      <div className="mx-auto w-full max-w-[1280px] min-[1440px]:max-w-[1360px]">
        <SectionHeading
          title="Connect With Us Worldwide"
          description="Remote-first collaboration with reliable coverage across key regions."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <article
              key={office.id}
              className="rounded-2xl border border-slate-100 bg-[#F7FAFF] p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <img
                  src={office.flag}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-200"
                />
                <h3 className="font-montserrat text-sm font-bold text-[#10234B]">
                  {office.title}
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 sm:text-sm">
                <li className="flex gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#1670F5]" />
                  {office.address}
                </li>
                <li className="flex gap-2">
                  <Phone size={14} className="mt-0.5 shrink-0 text-[#1670F5]" />
                  <a href={`tel:${office.phone.replace(/\s/g, "")}`}>{office.phone}</a>
                </li>
                <li className="flex gap-2">
                  <Mail size={14} className="mt-0.5 shrink-0 text-[#1670F5]" />
                  <a href={`mailto:${office.email}`}>{office.email}</a>
                </li>
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {contactActions.map((action) => {
            const Icon = action.Icon;
            const className =
              "flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-[#092f58] transition hover:border-[#1670F5] hover:text-[#1670F5] sm:text-sm";

            if (action.href.startsWith("mailto:") || action.href.startsWith("#")) {
              return (
                <a key={action.id} href={action.href} className={className}>
                  <Icon size={16} />
                  {action.title}
                </a>
              );
            }

            return (
              <Link key={action.id} to={action.href} className={className}>
                <Icon size={16} />
                {action.title}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
