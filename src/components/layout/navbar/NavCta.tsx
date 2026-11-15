import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { navCtaClassName } from "./nav.styles";

type NavCtaProps = {
  label: string;
  href: string;
  fullWidth?: boolean;
  tabIndex?: number;
  onClick?: () => void;
};

export default function NavCta({
  label,
  href,
  fullWidth = false,
  tabIndex,
  onClick,
}: NavCtaProps) {
  return (
    <Link
      to={href}
      tabIndex={tabIndex}
      onClick={onClick}
      className={fullWidth ? `${navCtaClassName} mt-3 w-full` : navCtaClassName}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0c2c54]/10 transition duration-300 group-hover:bg-[#0c2c54]/15 2xl:h-6 2xl:w-6"
      >
        <ArrowRight
          size={12}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
