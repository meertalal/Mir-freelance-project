import { letsTalkSteps } from "../../data/lets-talk.data";

export default function LetsTalkSteps() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6">
      {letsTalkSteps.map(({ id, title, description, Icon }) => (
        <div key={id} className="flex min-w-0 items-start gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
            <Icon size={20} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
              {title}
            </h3>
            <p className="mt-1 font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
