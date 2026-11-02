import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { footerQuickLinks } from "../../../data/footer.data";
import FooterHeading from "./FooterHeading";

export default function FooterQuickLinks() {
  return (
    <div className="md:border-l md:border-white/15 md:pl-7 lg:border-l lg:px-5 lg:pl-8">
      <FooterHeading className="text-center lg:text-left">
        Quick Links
      </FooterHeading>

      <ul className="max-w-[11.5rem] space-y-2.5">
        {footerQuickLinks.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link
              to={link.href}
              className="
                group flex items-center justify-between gap-4
                font-inter text-[13px] font-medium tracking-wide text-white/80
                transition duration-300 hover:text-white
                sm:text-sm
              "
            >
              <span>{link.label}</span>

              <ArrowRight
                size={13}
                aria-hidden="true"
                className="
                  shrink-0 text-white/50
                  transition duration-300
                  group-hover:translate-x-0.5
                  group-hover:text-white
                "
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
