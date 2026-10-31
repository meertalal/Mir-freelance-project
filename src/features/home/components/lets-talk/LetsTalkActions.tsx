import { ArrowUpRight } from "lucide-react";
import { letsTalkActions } from "../../data/lets-talk.data";

export default function LetsTalkActions() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {letsTalkActions.map(({ id, title, value, href, Icon }) => (
        <a
          key={id}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="
            group flex items-center gap-3 rounded-2xl border border-slate-200
            bg-white px-4 py-3 shadow-sm
            transition duration-300 hover:-translate-y-0.5 hover:border-[#9FC3FF]
            hover:shadow-md
          "
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
            <Icon size={18} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-montserrat text-sm font-bold text-[#10234B]">
              {title}
            </span>
            <span className="block truncate font-inter text-xs text-slate-600">
              {value}
            </span>
          </span>
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="shrink-0 text-slate-400 transition group-hover:text-[#1670F5]"
          />
        </a>
      ))}
    </div>
  );
}
