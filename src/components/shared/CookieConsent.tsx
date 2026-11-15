import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, ShieldCheck } from "lucide-react";

const COOKIE_CONSENT_KEY = "mir-talal-cookie-consent";

type CookieConsentChoice = "all" | "essential";
type Status = "hidden" | "showing" | "hiding";

function hasStoredChoice() {
  try {
    return Boolean(window.localStorage.getItem(COOKIE_CONSENT_KEY));
  } catch {
    return false;
  }
}

export default function CookieConsent() {
  const [status, setStatus] = useState<Status>("hidden");

  useEffect(() => {
    if (hasStoredChoice()) return;
    const timer = window.setTimeout(() => setStatus("showing"), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (choice: CookieConsentChoice) => {
    try {
      window.localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({ choice, date: new Date().toISOString() }),
      );
    } catch {
      // Storage can be unavailable in private mode; the banner still closes.
    }
    setStatus("hiding");
    window.setTimeout(() => setStatus("hidden"), 250);
  };

  if (status === "hidden") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-6 sm:pb-5">
      <div
        role="dialog"
        aria-live="polite"
        aria-label="Cookie preferences"
        className={`pointer-events-auto mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-[#DCE9FF] bg-white/95 p-4 shadow-[0_24px_60px_-20px_rgba(8,35,72,0.5)] backdrop-blur-md transition duration-300 motion-reduce:transition-none sm:p-5 lg:flex-row lg:items-center lg:gap-6 ${
          status === "showing"
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-montserrat text-sm font-bold text-[#092f58]">
              Cookies &amp; privacy
            </p>
            <p className="mt-1 font-inter text-sm leading-relaxed text-[#4A5B73]">
              Essential cookies keep the site working. With your permission I
              would also use analytics cookies to understand how pages are
              used. Read the{" "}
              <Link
                to="/cookies"
                className="font-semibold text-[#1670F5] underline decoration-[#BFDBFE] underline-offset-2 transition hover:text-[#0B3A6B]"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center lg:ml-auto">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#C9DCF7] px-5 font-inter text-sm font-semibold text-[#0B3A6B] transition duration-300 hover:border-[#93C5FD] hover:bg-[#F2F7FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1670F5]"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#092f58] px-6 font-inter text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgba(9,47,88,0.7)] transition duration-300 hover:bg-[#0B3A6B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1670F5]"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
