import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { brand } from "../../data/site.data";
import {
  footerBrand,
  footerCountries,
  footerQuickLinks,
  footerSocialLinks,
} from "../../data/footer.data";
import SocialIcon from "./footer/SocialIcon";
import CountryMapBadge from "./footer/CountryMapBadge";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#071B33] text-white">
      <div
        className="
          mx-auto grid max-w-7xl gap-10
          px-4 py-12
          sm:px-6 sm:py-14
          md:grid-cols-2 md:gap-8
          lg:grid-cols-4 lg:gap-0 lg:px-10 lg:py-16
          2xl:max-w-[1600px] 2xl:px-14
          min-[2560px]:max-w-[1800px]
        "
      >
        {/* Brand + socials */}
        <div className="motion-safe:animate-page-reveal lg:pr-8">
          <Link
            to="/"
            className="inline-block font-montserrat text-xl font-bold tracking-tight text-white no-underline transition hover:text-[#93C5FD] sm:text-2xl"
          >
            {footerBrand.name}
          </Link>
          <p className="mt-4 max-w-xs font-inter text-sm leading-relaxed text-white/75 sm:text-[15px]">
            {footerBrand.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {footerSocialLinks.map((social, index) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                style={{ animationDelay: `${index * 80}ms` }}
                className="
                  inline-flex h-10 w-10 items-center justify-center rounded-full
                  border border-white/35 text-white/90
                  transition duration-300
                  hover:-translate-y-1 hover:border-white hover:bg-white/10 hover:text-white
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                  motion-safe:animate-page-reveal
                "
              >
                <SocialIcon id={social.id} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="motion-safe:animate-page-reveal md:border-l md:border-white/15 md:pl-8 lg:px-8">
          <h3 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white sm:text-sm">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {footerQuickLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link
                  to={link.href}
                  className="
                    group flex items-center justify-between gap-3
                    font-inter text-sm text-white/80
                    transition duration-300 hover:text-white
                  "
                >
                  <span>{link.label}</span>
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="shrink-0 text-white/55 transition duration-300 group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="motion-safe:animate-page-reveal lg:border-l lg:border-white/15 lg:px-8">
          <h3 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white sm:text-sm">
            Contact Info
          </h3>
          <ul className="space-y-4 font-inter text-sm text-white/80">
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="group inline-flex items-start gap-3 transition hover:text-white"
              >
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-white/70 transition group-hover:text-white"
                />
                <span>{brand.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="group inline-flex items-start gap-3 transition hover:text-white"
              >
                <Phone
                  size={16}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-white/70 transition group-hover:text-white"
                />
                <span>{brand.phone}</span>
              </a>
            </li>
            <li className="inline-flex items-start gap-3">
              <MapPin
                size={16}
                strokeWidth={1.6}
                className="mt-0.5 shrink-0 text-white/70"
              />
              <span>Available in USA, Canada & more</span>
            </li>
          </ul>
        </div>

        {/* Countries we serve */}
        <div className="motion-safe:animate-page-reveal md:border-l-0 lg:border-l lg:border-white/15 lg:pl-8">
          <h3 className="mb-5 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white sm:text-sm">
            Countries We Serve
          </h3>
          <div className="grid grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5">
            {footerCountries.map((country, index) => (
              <div
                key={country.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="motion-safe:animate-page-reveal"
              >
                <CountryMapBadge
                  name={country.name}
                  flag={country.flag}
                  path={country.path}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center font-inter text-xs text-white/70 sm:px-6 sm:text-sm lg:px-10 2xl:max-w-[1600px]">
          © {year} {footerBrand.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
