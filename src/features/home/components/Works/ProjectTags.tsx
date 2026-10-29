
import type { ProjectTagsProps } from "../../types/services.types";

export default function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <ul
      aria-label="Project categories"
      className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2 xl:gap-2.5"
    >
      {tags.map((tag) => (
        <li
          key={tag}
          className="
            max-w-full rounded-md bg-[#edf4ff]
            px-2 py-1 font-inter text-[10px]
            font-medium leading-tight text-[#2761bb]
            sm:text-[11px]
            lg:px-2.5 lg:py-1.5 lg:text-xs
            2xl:px-3 2xl:text-sm
          "
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
