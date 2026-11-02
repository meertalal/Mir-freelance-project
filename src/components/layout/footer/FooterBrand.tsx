import { Link } from "react-router-dom";
import { footerBrand } from "../../../data/footer.data";
import SocialLinks from "./SocialLinks";

export default function FooterBrand() {
  return (
    <div className="text-center lg:pr-8 lg:text-left">
      <Link
        to="/"
        className="inline-flex items-center justify-center gap-3 font-montserrat text-[22px] font-bold tracking-tight text-white no-underline transition hover:text-[#93C5FD] sm:text-2xl lg:justify-start lg:text-[26px]"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[10px] font-black text-white shadow-[0_10px_25px_rgba(15,48,91,0.2)]">
          MT
        </span>
        {footerBrand.name}
      </Link>

      <p className="mx-auto mt-3 max-w-[220px] font-inter text-[13px] leading-[1.55] text-white/75 sm:mt-4 sm:text-sm lg:mx-0">
        {footerBrand.description}
      </p>

      <div className="flex justify-center lg:justify-start">
        <SocialLinks />
      </div>
    </div>
  );
}
