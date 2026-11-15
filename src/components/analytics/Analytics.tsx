import { useEffect } from "react";
import {
  getCookieConsent,
  subscribeCookieConsent,
} from "../../lib/cookieConsent";

/**
 * Loads a script-tag analytics provider (Plausible, Umami, Simple Analytics,
 * Fathom, ...) only after the visitor accepts analytics cookies.
 *
 * Set VITE_ANALYTICS_SRC to the provider's script URL and, when the provider
 * uses it, VITE_ANALYTICS_DOMAIN to your domain. Without VITE_ANALYTICS_SRC
 * this component renders nothing and the site stays analytics-free.
 */
const analyticsSrc = (import.meta.env.VITE_ANALYTICS_SRC as string | undefined)
  ?.trim();
const analyticsDomain = (
  import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined
)?.trim();

function loadAnalytics() {
  if (!analyticsSrc) return;
  if (document.querySelector("script[data-consent-analytics]")) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = analyticsSrc;
  script.dataset.consentAnalytics = "true";
  if (analyticsDomain) script.setAttribute("data-domain", analyticsDomain);

  document.head.appendChild(script);
}

export default function Analytics() {
  useEffect(() => {
    if (!analyticsSrc) return;
    if (getCookieConsent() === "all") loadAnalytics();
    return subscribeCookieConsent((choice) => {
      if (choice === "all") loadAnalytics();
    });
  }, []);

  return null;
}
