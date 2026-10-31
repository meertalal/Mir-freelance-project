import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

type NavBrandProps = {
  name: string;
  subtitle: string;
  href?: string;
  isScrolled: boolean;
};

export default function NavBrand({
  name,
  subtitle,
  href = "/",
  isScrolled,
}: NavBrandProps) {
  return (
    <Link
      to={href}
      aria-label={`${name} - ${subtitle}`}
      className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5 2xl:gap-3 min-[1920px]:gap-4 min-[2560px]:gap-5"
    >
      <Code2
        aria-hidden="true"
        className={[
          "shrink-0 text-[#5882E8] transition-transform duration-300 ease-out group-hover:scale-110",
          isScrolled ? "h-6 w-6" : "h-7 w-7 sm:h-8 sm:w-8",
          "2xl:h-9 2xl:w-9 min-[1920px]:h-10 min-[1920px]:w-10 min-[2560px]:h-12 min-[2560px]:w-12",
        ].join(" ")}
        strokeWidth={2.5}
      />
      <span className="flex min-w-0 flex-col">
        <span
          className={[
            "truncate font-montserrat font-bold tracking-tight text-white transition-all duration-300",
            isScrolled ? "text-sm 2xl:text-base" : "text-sm sm:text-base 2xl:text-lg",
            "min-[1920px]:text-xl min-[2560px]:text-2xl",
          ].join(" ")}
        >
          {name}
        </span>
        <span
          className={[
            "truncate font-inter font-medium text-white/75 transition-all duration-300",
            isScrolled ? "text-[9px] 2xl:text-[10px]" : "text-[9px] sm:text-[10px] 2xl:text-xs",
            "min-[1920px]:text-sm min-[2560px]:text-base",
          ].join(" ")}
        >
          {subtitle}
        </span>
      </span>
    </Link>
  );
}
