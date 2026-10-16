import type { LucideIcon } from "lucide-react";

type FloatingInfoCardProps = {
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  className: string;
};

export default function FloatingInfoCard({
  title,
  subtitle,
  Icon,
  className,
}: FloatingInfoCardProps) {
  return (
    <div className={`floating-info-card ${className}`}>
      <span className="floating-info-icon">
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[10px] font-bold text-slate-900">
          {title}
        </span>
        <span className="mt-0.5 block whitespace-nowrap text-[9px] text-slate-500">
          {subtitle}
        </span>
      </span>
    </div>
  );
}
