import { NavLink } from "react-router-dom";
import type { NavigationLink } from "../../../types/navigation";
import { navLinkClassName } from "./nav.styles";

type NavLinksProps = {
  links: NavigationLink[];
  mobile?: boolean;
};

export default function NavLinks({ links, mobile = false }: NavLinksProps) {
  return (
    <>
      {links.map(({ label, href }) => (
        <NavLink
          key={href}
          to={href}
          end={href === "/"}
          className={({ isActive }) => navLinkClassName(isActive, mobile)}
        >
          {label}
        </NavLink>
      ))}
    </>
  );
}
