import type { ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  showArrow?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  showArrow = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700",
    secondary:
      "border border-slate-300 bg-white text-slate-900 hover:border-blue-300 hover:text-blue-600",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight size={16} aria-hidden="true" />}
    </button>
  );
}
