import type { TechToolCategory } from "../../data/tech-tools.data";
import TechToolChip from "./TechToolChip";

type TechCategoryCardProps = {
  category: TechToolCategory;
};

export default function TechCategoryCard({ category }: TechCategoryCardProps) {
  const Icon = category.Icon;

  return (
    <article
      className="
        group relative flex aspect-square min-w-0 flex-col overflow-hidden rounded-none
        border border-white/[0.12]
        bg-[linear-gradient(158deg,#133F72_0%,#0C315B_52%,#0A2A4F_100%)]
        p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        transition-[transform,border-color] duration-300
        hover:-translate-y-0.5 hover:border-[#5B9DF0]/45 after:pointer-events-none after:absolute after:-right-12 after:-top-12 after:h-32 after:w-32 after:bg-[radial-gradient(circle,rgba(76,141,224,0.18),transparent_70%)]
        xl:p-5
      "
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 bg-[radial-gradient(circle,rgba(76,141,224,0.18),transparent_70%)]"
      />

      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-[linear-gradient(150deg,#2E86FF_0%,#0B4FB3_100%)] text-white shadow-[0_8px_18px_-8px_rgba(22,112,245,0.9)] ring-1 ring-inset ring-white/20">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-montserrat text-sm font-bold text-white sm:text-base">
            {category.title}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-[3.25em] font-inter text-[11px] leading-relaxed text-[#9DB7D6] sm:max-lg:hidden sm:text-xs">
            {category.description}
          </p>
        </div>
      </div>

      <ul className="mt-4 flex min-h-0 flex-1 flex-col border-t border-white/10">
        {category.tools.map((tool, index) => (
          <li
            key={tool.id}
            className={`flex min-h-0 flex-1 items-center transition-colors duration-200 hover:bg-white/[0.045] ${index > 0 ? "border-t border-white/[0.07]" : ""}`}
          >
            <TechToolChip tool={tool} />
          </li>
        ))}
      </ul>
    </article>
  );
}
