import type { techToolCategories } from "../../data/tech-tools.data";

type Tool = (typeof techToolCategories)[number]["tools"][number];

type TechToolChipProps = {
  tool: Tool;
};

export default function TechToolChip({ tool }: TechToolChipProps) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <span
        aria-hidden="true"
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
        style={{ backgroundColor: tool.bg, color: tool.color }}
      >
        {tool.name.slice(0, 1)}
      </span>
      <span className="truncate font-inter text-[11px] font-semibold text-[#334155] sm:text-xs">
        {tool.name}
      </span>
    </span>
  );
}
