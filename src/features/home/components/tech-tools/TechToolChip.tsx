import type { TechTool } from "../../data/tech-tools.data";

type TechToolChipProps = {
  tool: TechTool;
};

export default function TechToolChip({ tool }: TechToolChipProps) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      {tool.image ? (
        <img
          src={tool.image}
          alt=""
          decoding="async"
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 object-contain"
        />
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
          style={{ backgroundColor: tool.bg, color: tool.color }}
        >
          {tool.name.slice(0, 1)}
        </span>
      )}
      <span className="truncate font-inter text-[11px] font-semibold text-[#334155] sm:text-xs">
        {tool.name}
      </span>
    </span>
  );
}
