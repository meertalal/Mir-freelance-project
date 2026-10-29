import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { teamMembers } from "../data/about-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";

export default function TeamSection() {
  return (
    <section className="w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="Our Team"
            description="People who care about craft, clarity, and client outcomes."
            align="left"
            className="mb-0"
          />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1670F5] hover:text-[#0f5fd4]"
          >
            Join Our Team
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-montserrat font-bold text-[#10234B]">{member.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{member.role}</p>
                <div className="mt-3 flex justify-center gap-2">
                  {member.socials.map((social) => {
                    const Icon = social.Icon;
                    return (
                      <a
                        key={social.id}
                        href={social.href}
                        aria-label={social.id}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1670F5] hover:bg-[#1670F5] hover:text-white"
                      >
                        <Icon size={14} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
