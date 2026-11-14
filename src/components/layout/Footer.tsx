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
import { contentRailClass } from "../shared/section.styles";

const columnTitleClass =
  "mb-3 text-left font-playfair text-xs font-bold uppercase tracking-[0.14em] text-white sm:text-sm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#092f58] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div
        className={`
          relative grid gap-x-6 gap-y-8
          px-4 pb-8 pt-6
          sm:grid-cols-2 sm:gap-x-8 sm:px-6 sm:pb-10 sm:pt-8
          lg:px-10 lg:pb-8 lg:pt-8
          xl:grid-cols-[0.85fr_0.8fr_1.05fr_1.3fr] xl:gap-x-0 xl:gap-y-0
          2xl:px-14
          ${contentRailClass}
        `}
      >
        <div className="motion-safe:animate-page-reveal border-b border-white/10 pb-6 sm:col-span-2 sm:pb-8 xl:col-span-1 xl:border-0 xl:pb-0 xl:pr-6 2xl:pr-8 min-[1920px]:pr-12">
          <Link
            to="/"
            className="
              flex min-h-11 w-full items-center justify-center gap-3
              font-montserrat text-xl font-bold tracking-tight text-white
              no-underline transition hover:text-[#93C5FD]
              sm:text-2xl
              lg:w-auto lg:justify-start
            "
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-black text-white shadow-[0_10px_25px_rgba(15,48,91,0.2)]">
              MT
            </span>
            {footerBrand.name}
          </Link>
          <p className="mx-auto mt-2 max-w-sm text-center font-inter text-sm leading-relaxed text-white/75 lg:mx-0 lg:text-left">
            {footerBrand.description}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2.5 lg:justify-start">
            {footerSocialLinks.map((social, index) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                style={{ animationDelay: `${index * 80}ms` }}
                className="
                  inline-flex size-9 items-center justify-center rounded-full
                  border border-white/20 bg-white/5 text-white/90
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

        <div className="motion-safe:animate-page-reveal xl:border-l xl:border-white/15 xl:px-6 2xl:px-8 min-[1920px]:px-12">
          <h3 className={columnTitleClass}>Quick Links</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 xl:grid-cols-1 xl:gap-x-0">
            {footerQuickLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link
                  to={link.href}
                  className="
                    group flex min-h-9 items-center gap-1.5
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

        <div className="motion-safe:animate-page-reveal xl:border-l xl:border-white/15 xl:px-6 2xl:px-8 min-[1920px]:px-12">
          <h3 className={columnTitleClass}>Contact Info</h3>
          <ul className="space-y-1 font-inter text-sm text-white/80">
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="group flex min-h-9 min-w-0 items-center gap-3 break-words transition hover:text-white"
              >
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  className="shrink-0 text-white/70 transition group-hover:text-white"
                />
                <span className="min-w-0">{brand.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="group flex min-h-9 items-center gap-3 transition hover:text-white"
              >
                <Phone
                  size={16}
                  strokeWidth={1.6}
                  className="shrink-0 text-white/70 transition group-hover:text-white"
                />
                <span>{brand.phone}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 pt-1.5">
              <MapPin
                size={16}
                strokeWidth={1.6}
                className="mt-0.5 shrink-0 text-white/70"
              />
              <span>Serving clients worldwide, remotely</span>
            </li>
          </ul>
        </div>

        <div className="motion-safe:animate-page-reveal sm:col-span-2 xl:col-span-1 xl:border-l xl:border-white/15 xl:pl-6 2xl:pl-8 min-[1920px]:pl-12">
          <h3 className={columnTitleClass}>Countries We Serve</h3>
          <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:grid-cols-10 sm:gap-x-1 xl:grid-cols-5">
            {footerCountries.map((country, index) => (
              <div
                key={country.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="motion-safe:animate-page-reveal"
              >
                <CountryMapBadge name={country.name} image={country.image} />
              </div>
            ))}
          </div>
          <p className="mt-3 font-inter text-xs leading-relaxed text-white/60">
            These are some of the main markets. Services are delivered anywhere in the world.
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[#0b2f52]">
        <p className={`px-4 py-2.5 text-center font-inter text-xs text-white/70 sm:px-6 sm:text-sm lg:px-10 ${contentRailClass}`}>
          © {year} {footerBrand.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
