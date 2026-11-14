import { Plane } from "lucide-react";
import LinkButton from "../ui/LinkButton";
import PageEyebrow from "./PageEyebrow";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { countries } from "../../features/home/data/hero.data";
import { innerContainerClass, innerSectionClass } from "./section.styles";

type CtaBannerProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  supportNote?: string;
  centered?: boolean;
  showCountryPanel?: boolean;
  backgroundImage?: string;
};

function CountryPanel({ supportNote }: { supportNote: string }) {
  return (
    <div className="rounded-[2rem] border border-[#D6E4F7] bg-white/80 p-5 shadow-[0_20px_50px_rgba(22,112,245,0.12)] backdrop-blur sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-playfair text-xs font-semibold uppercase tracking-[0.14em] text-[#5882E8]">
          Global Collaboration
        </p>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1670F5]">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
          </svg>
        </span>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3">
        {countries.map((country) => (
          <li
            key={country.name}
            className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-2.5 py-2"
          >
            <img
              src={country.flag}
              alt=""
              loading="lazy"
              decoding="async"
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="truncate font-inter text-[11px] font-semibold text-slate-700 sm:text-xs">
              {country.name}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-xl bg-[#EAF2FF] px-3 py-2.5 text-center font-inter text-[11px] font-medium text-[#092f58] sm:text-xs">
        {supportNote}
      </p>
    </div>
  );
}

export default function CtaBanner({
  eyebrow = "Ready to Start?",
  title = "Let's Build Something Amazing Together",
  description = "From idea to global success: websites, apps, AI and automation built for real business impact.",
  supportNote = "Clients across multiple countries and time zones.",
  centered = false,
  showCountryPanel = true,
  backgroundImage,
}: CtaBannerProps) {
  return (
    <section className={`${innerSectionClass} bg-[#F4F8FF]`}>
      {backgroundImage ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={backgroundImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-right animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 via-55% to-white/15 lg:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-white/95 via-white/40 to-transparent lg:block" />

          <div className="absolute right-0 top-[85%] h-[11%] w-[52%] lg:left-[42%] lg:right-auto lg:top-0 lg:h-[30%] lg:w-[36%]">
            <svg
              viewBox="0 0 600 300"
              preserveAspectRatio="none"
              fill="none"
              className="absolute inset-0 h-full w-full"
            >
              <path
                d="M 60 250 C 220 205 350 145 560 75"
                stroke="#FFFFFF"
                strokeOpacity="0.7"
                strokeWidth="6"
                strokeDasharray="4 10"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 60 250 C 220 205 350 145 560 75"
                stroke="#3D6EA8"
                strokeOpacity="0.45"
                strokeWidth="2.5"
                strokeDasharray="4 10"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="absolute left-[6%] top-[83%] -translate-x-1/2 -translate-y-1/2 text-[#2C5C94] [filter:drop-shadow(0_1px_3px_rgba(255,255,255,0.9))] animate-plane-fly">
              <Plane
                strokeWidth={1.7}
                aria-hidden="true"
                className="h-7 w-7 lg:h-10 lg:w-10"
              />
            </span>
          </div>
        </div>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-blue-100/80 blur-3xl"
          />
        </>
      )}

      <div
        className={[
          "relative z-10",
          innerContainerClass,
          centered
            ? ""
            : "grid items-center gap-10 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:gap-12",
        ].join(" ")}
      >
        {centered ? (
          <Reveal>
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            <div className="flex flex-wrap items-center justify-center gap-3 max-[420px]:gap-2">
              <LinkButton to="/contact" showArrow>
                Get a Free Quote
              </LinkButton>
              <LinkButton to="/contact" variant="secondary">
                Schedule a Call
              </LinkButton>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal>
              <PageEyebrow>{eyebrow}</PageEyebrow>
              <h2 className="max-w-xl font-montserrat text-2xl font-bold leading-tight tracking-tight text-[#10234b] min-[480px]:text-3xl lg:text-4xl xl:text-[42px] min-[1920px]:text-5xl">
                {title}
              </h2>
              <p className="mt-4 max-w-lg font-inter text-xs leading-relaxed text-[#526987] min-[480px]:text-sm lg:text-base xl:text-lg">
                {description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3 max-[420px]:gap-2">
                <LinkButton to="/contact" showArrow>
                  Get a Free Quote
                </LinkButton>
                <LinkButton to="/contact" variant="secondary">
                  Schedule a Call
                </LinkButton>
              </div>
            </Reveal>

            {showCountryPanel && (
              <Reveal delay={150}>
                <div
                  aria-hidden="true"
                  className="relative mx-auto w-full max-w-md lg:max-w-none"
                >
                  <CountryPanel supportNote={supportNote} />
                </div>
              </Reveal>
            )}
          </>
        )}
      </div>

      {backgroundImage && (
        <div aria-hidden="true" className="h-16 w-full sm:h-20 lg:hidden" />
      )}
    </section>
  );
}
