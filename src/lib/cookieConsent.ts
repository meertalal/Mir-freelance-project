export type CookieConsentChoice = "all" | "essential";

const STORAGE_KEY = "mir-talal-cookie-consent";
const CHANGE_EVENT = "mir-talal:cookie-consent-change";

function isChoice(value: unknown): value is CookieConsentChoice {
  return value === "all" || value === "essential";
}

export function getCookieConsent(): CookieConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    const choice =
      typeof parsed === "object" && parsed !== null
        ? (parsed as { choice?: unknown }).choice
        : null;
    return isChoice(choice) ? choice : null;
  } catch {
    return null;
  }
}

export function setCookieConsent(choice: CookieConsentChoice) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choice, date: new Date().toISOString() }),
    );
  } catch {
    // Storage can be unavailable in private mode; the choice still applies
    // for the current page session through the change event below.
  }
  window.dispatchEvent(
    new CustomEvent<CookieConsentChoice>(CHANGE_EVENT, { detail: choice }),
  );
}

export function subscribeCookieConsent(
  listener: (choice: CookieConsentChoice) => void,
) {
  const handleChange = (event: Event) => {
    listener((event as CustomEvent<CookieConsentChoice>).detail);
  };

  window.addEventListener(CHANGE_EVENT, handleChange);
  return () => window.removeEventListener(CHANGE_EVENT, handleChange);
}
