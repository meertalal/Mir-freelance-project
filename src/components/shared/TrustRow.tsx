import type { LucideIcon } from "lucide-react";

export type TrustItem = {
  title: string;
  description?: string;
  Icon: LucideIcon;
};

type TrustRowProps = {
  items: TrustItem[];
  className?: string;
};

export default function TrustRow({ items, className = "" }: TrustRowProps) {
  return (
    <div
      className={[
        "grid gap-3",
        items.length >= 4
          ? "grid-cols-2 sm:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-3",
        className,
      ].join(" ")}
    >
      {items.map(({ title, description, Icon }, index) => (
        <div
          key={title}
          style={{ animationDelay: `${index * 100}ms` }}
          className="flex items-start gap-2.5 motion-safe:animate-page-reveal"
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
            <Icon size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-montserrat text-xs font-bold text-[#092f58] sm:text-sm">
              {title}
            </p>
            {description && (
              <p className="mt-0.5 font-inter text-[11px] text-slate-600 sm:text-xs">
                {description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
