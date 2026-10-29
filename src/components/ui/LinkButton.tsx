import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type LinkButtonProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "border border-[#1670F5] bg-[#1670F5] text-white shadow-[0_8px_20px_rgba(22,112,245,0.22)] hover:bg-[#0f5fd4] hover:border-[#0f5fd4]",
  secondary:
    "border border-slate-200 bg-white text-[#092f58] hover:border-[#1670F5] hover:bg-[#f0f5ff]",
  ghost:
    "border border-white/70 bg-white/10 text-white hover:bg-white hover:text-[#092f58]",
};

export default function LinkButton({
  to,
  children,
  variant = "primary",
  showArrow = false,
  className = "",
  external = false,
}: LinkButtonProps) {
  const classes = [
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5",
    "font-inter text-xs font-bold uppercase tracking-wide no-underline",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-300",
    "hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4",
    "focus-visible:outline-[#1670F5] sm:min-h-12 sm:px-6 sm:text-sm",
    variants[variant],
    className,
  ].join(" ");

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (external || to.startsWith("http") || to.startsWith("mailto:")) {
    return (
      <a href={to} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
