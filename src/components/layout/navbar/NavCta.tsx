import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { navCtaClassName } from "./nav.styles";

type NavCtaProps = {
  label: string;
  href: string;
  fullWidth?: boolean;
  tabIndex?: number;
};

export default function NavCta({
  label,
  href,
  fullWidth = false,
  tabIndex,
}: NavCtaProps) {
  return (
    <Link
      to={href}
      tabIndex={tabIndex}
      className={fullWidth ? `${navCtaClassName} mt-3 w-full` : navCtaClassName}
    >
      <span>{label}</span>
      <ArrowRight
        aria-hidden="true"
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-1 2xl:h-4 2xl:w-4 min-[1920px]:h-5 min-[1920px]:w-5 min-[2560px]:h-6 min-[2560px]:w-6"
      />
    </Link>
  );
}
