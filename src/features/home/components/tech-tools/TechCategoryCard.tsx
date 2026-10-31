import type { techToolCategories } from "../../data/tech-tools.data";
import TechToolChip from "./TechToolChip";

type Category = (typeof techToolCategories)[number];

type TechCategoryCardProps = {
  category: Category;
};

export default function TechCategoryCard({ category }: TechCategoryCardProps) {
  const Icon = category.Icon;

  return (
    <article
      className="
        flex h-full min-w-0 flex-col rounded-2xl border border-slate-100
        bg-white p-5 shadow-[0_8px_28px_rgba(15,48,91,0.05)]
        transition duration-300 hover:-translate-y-1 hover:shadow-lg
        sm:p-6
      "
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
          <Icon size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-montserrat text-base font-bold text-[#10234B] sm:text-lg">
            {category.title}
          </h3>
          <p className="mt-1 font-inter text-xs leading-relaxed text-slate-600 sm:text-sm">
            {category.description}
          </p>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3">
        {category.tools.map((tool) => (
          <li key={tool.id} className="min-w-0">
            <TechToolChip tool={tool} />
          </li>
        ))}
      </ul>
    </article>
  );
}
