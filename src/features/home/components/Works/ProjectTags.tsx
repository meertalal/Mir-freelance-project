import type { ProjectTagsProps } from "../../types/services.types";

export default function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <ul
      aria-label="Project categories"
      className="flex flex-nowrap items-center gap-1 overflow-hidden sm:flex-wrap sm:gap-2"
    >
      {tags.map((tag) => (
        <li
          key={tag}
          className="
            whitespace-nowrap rounded bg-[#edf4ff]
            px-1 py-0.5
            font-inter text-[6px] font-medium leading-none
            text-[#2761bb]
            sm:px-2.5 sm:py-1.5 sm:text-xs sm:rounded-md
          "
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}