import type { ProjectTagsProps } from "../../types/services.types";
export default function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <ul
      aria-label="Project categories"
      className="flex flex-wrap items-center gap-1.5"
    >
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-sm bg-[#edf4ff] px-2 py-1 font-inter text-[9px] font-medium leading-none text-[#2761bb] sm:text-[10px]"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}