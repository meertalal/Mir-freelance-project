import { Link } from "react-router-dom";

type NavBrandProps = {
  name: string;
  subtitle: string;
  href?: string;
};

export default function NavBrand({ name, subtitle, href = "/" }: NavBrandProps) {
  return (
    <Link
      to={href}
      aria-label={`${name} - ${subtitle}`}
      className="group flex min-h-10 min-w-0 shrink items-center gap-2.5 sm:gap-3 2xl:gap-3.5"
    >
      <span
        aria-hidden="true"
        className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2B7CFF] to-[#0B3A6B] text-[10px] font-black tracking-tight text-white shadow-[0_8px_22px_rgba(6,32,65,0.45)] ring-1 ring-inset ring-white/20 transition duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:text-[11px] 2xl:h-11 2xl:w-11 2xl:text-xs min-[1920px]:h-12 min-[1920px]:w-12 min-[1920px]:text-sm"
      >
        <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-white/20 blur-md" />
        MT
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-montserrat text-sm font-bold tracking-tight text-white transition-colors duration-300 2xl:text-base min-[1920px]:text-lg">
          {name}
        </span>
        <span className="truncate font-inter text-[9px] font-medium uppercase tracking-[0.12em] text-[#9DB8D8] transition-colors duration-300 group-hover:text-[#BFDBFE] sm:text-[10px] 2xl:text-[11px]">
          {subtitle}
        </span>
      </span>
    </Link>
  );
}
