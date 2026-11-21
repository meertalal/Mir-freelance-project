import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUp,
  Clock3,
  Download,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useSiteSettings } from "../../features/site-settings/useSiteSettings";
import { useServices } from "../../features/content/useContent";
import { useCountryMarkets } from "../../features/countries/useCountryMarkets";
import {
  footerBrand,
  footerQuickLinks,
  footerSocialLinks,
} from "../../data/footer.data";
import SocialIcon from "./footer/SocialIcon";
import CountryMapBadge from "./footer/CountryMapBadge";
import { contentRailClass } from "../shared/section.styles";

const columnTitleClass =
  "flex items-center gap-2 font-playfair text-[11px] font-bold uppercase tracking-[0.16em] text-[#93C5FD]";

const footerLinkClass =
  "group flex min-h-8 items-center gap-2 font-inter text-sm leading-snug text-white/65 transition duration-300 hover:text-white";

const contactItemClass =
  "group flex min-w-0 items-start gap-3 font-inter text-sm leading-snug text-white/70 transition duration-300 hover:text-white";

const contactIconClass =
  "mt-0.5 h-4 w-4 shrink-0 text-[#7FB0FF] transition duration-300 group-hover:text-white";

const legalLinkClass =
  "font-inter text-xs text-white/55 transition hover:text-white sm:text-sm";

export default function Footer() {
  const contact = useSiteSettings();
  const year = new Date().getFullYear();
  const footerServices = useServices().slice(0, 6);
  const footerCountries = useCountryMarkets().filter((country) => country.show_in_coverage);
  const socialLinks = footerSocialLinks.map((social) => ({
    ...social,
    href: contact.social[social.id as keyof typeof contact.social] || social.href,
  }));

  return (
    <>
      <footer
        id="site-footer"
        className="relative isolate overflow-hidden border-t border-white/10 bg-[#092f58] text-white"
      >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#1670F5]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-24 h-80 w-80 rounded-full bg-[#5882E8]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(180deg, black, transparent 62%)",
          WebkitMaskImage: "linear-gradient(180deg, black, transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div
        className={`relative z-10 ${contentRailClass} px-4 pt-10 sm:px-6 sm:pt-12 lg:px-10`}
      >
        <div className="grid gap-x-8 gap-y-10 pb-9 sm:grid-cols-2 sm:pb-11 lg:grid-cols-[1.3fr_0.66fr_1.06fr_1.16fr] lg:gap-x-8 xl:gap-x-12">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-3 font-montserrat text-xl font-bold tracking-tight text-white transition hover:text-[#BFDBFE] sm:text-2xl"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2B7CFF] to-[#0B3A6B] text-xs font-black text-white shadow-[0_12px_30px_rgba(8,35,72,0.45)] ring-1 ring-white/15">
                MT
              </span>
              {footerBrand.name}
            </Link>

            <p className="mt-4 max-w-xs font-inter text-sm leading-relaxed text-white/65">
              {footerBrand.description}
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 font-inter text-xs font-bold uppercase tracking-[0.12em] text-[#0c2c54] shadow-[0_16px_32px_rgba(2,18,38,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#EAF2FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start a Project
              <ArrowRight size={14} aria-hidden="true" />
            </Link>

            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD]"
                >
                  <SocialIcon id={social.id} />
                </a>
              ))}
            </div>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 font-inter text-[11px] font-semibold text-emerald-200">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </p>
          </div>

          <div className="min-w-0">
            <h3 className={columnTitleClass}>
              <span
                className="h-1 w-1 rounded-full bg-[#93C5FD]"
                aria-hidden="true"
              />
              Explore
            </h3>
            <ul className="mt-4">
              {footerQuickLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link to={link.href} className={footerLinkClass}>
                    <span
                      className="h-1 w-1 shrink-0 rounded-full bg-white/25 transition duration-300 group-hover:bg-[#93C5FD]"
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className={columnTitleClass}>
              <span
                className="h-1 w-1 rounded-full bg-[#93C5FD]"
                aria-hidden="true"
              />
              Services
            </h3>
            <ul className="mt-4">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link to={service.href} className={footerLinkClass}>
                    <span
                      className="h-1 w-1 shrink-0 rounded-full bg-white/25 transition duration-300 group-hover:bg-[#93C5FD]"
                      aria-hidden="true"
                    />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="mt-3 inline-flex items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-[0.12em] text-[#93C5FD] transition hover:text-white"
            >
              All Services
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <h3 className={columnTitleClass}>
              <span
                className="h-1 w-1 rounded-full bg-[#93C5FD]"
                aria-hidden="true"
              />
              Contact
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <li>
                <a href={`mailto:${contact.email}`} className={contactItemClass}>
                  <Mail
                    size={16}
                    strokeWidth={1.7}
                    className={contactIconClass}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 break-words">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`WhatsApp: ${contact.phone}`}
                  className={contactItemClass}
                >
                  <MessageCircle
                    size={16}
                    strokeWidth={1.7}
                    className={contactIconClass}
                    aria-hidden="true"
                  />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li className={contactItemClass}>
                <Clock3
                  size={16}
                  strokeWidth={1.7}
                  className={contactIconClass}
                  aria-hidden="true"
                />
                <span>{contact.hours}</span>
              </li>
              <li className={contactItemClass}>
                <MapPin
                  size={16}
                  strokeWidth={1.7}
                  className={contactIconClass}
                  aria-hidden="true"
                />
                <span>{contact.location}</span>
              </li>
            </ul>

            <a
              href="/mir-talal-cv.pdf"
              download
              className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 font-inter text-xs font-semibold text-white/80 transition duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <Download size={14} aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 sm:py-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className={columnTitleClass}>
                <span
                  className="h-1 w-1 rounded-full bg-[#93C5FD]"
                  aria-hidden="true"
                />
                Countries We Serve
              </h3>
              <p className="mt-1.5 max-w-md font-inter text-xs leading-relaxed text-white/50">
                Some of the main markets I work with. Services are delivered
                anywhere in the world.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-[0.12em] text-[#93C5FD] transition hover:text-white"
            >
              Work with me anywhere
              <ArrowRight
                size={13}
                aria-hidden="true"
                className="transition duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {footerCountries.map((country) => (
              <li key={country.id}>
              <CountryMapBadge name={country.name} image={country.flag_image} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-[#071f38]/60">
        <div
          className={`${contentRailClass} flex flex-col items-center gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:justify-between lg:px-10`}
        >
          <p className="font-inter text-xs text-white/50 sm:text-sm">
            © {year} {footerBrand.name}. All rights reserved.
          </p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
          >
            <Link to="/privacy" className={legalLinkClass}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={legalLinkClass}>
              Terms of Service
            </Link>
            <Link to="/cookies" className={legalLinkClass}>
              Cookie Policy
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-white/60 transition duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            Back to top
            <ArrowUp size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
      </footer>
      <div
        aria-hidden="true"
        className="relative isolate h-[clamp(1.4rem,8.05vw,7rem)] overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#092f58] to-[#061a30] px-4 sm:px-6 lg:px-10 before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_50%_120%,rgba(59,130,246,0.24),transparent_62%)] before:content-['']"
      >
        <p className="relative mx-auto w-full select-none whitespace-nowrap bg-gradient-to-b from-white via-[#dbeafe] to-[#60a5fa] bg-clip-text text-center font-montserrat text-[clamp(2rem,11.5vw,10rem)] font-black leading-none tracking-[-0.075em] text-transparent drop-shadow-[0_10px_28px_rgba(37,99,235,0.3)] [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]">
          Mir Talal Baloch
        </p>
      </div>
    </>
  );
}
