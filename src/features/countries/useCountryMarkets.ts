import { useSyncExternalStore } from "react";
import { apiUrl } from "../admin/api/client";
import { countries } from "../home/data/hero.data";
import { remoteRegions } from "../contact/data/contact-page.data";
import type { CountryMarket } from "../admin/api/countries";

const fallback: CountryMarket[] = countries.map((country, index) => ({
  id: index + 1,
  name: country.name,
  region: remoteRegions.find((region) => (region.flags as readonly string[]).includes(country.flag))?.title ?? "Other",
  flag_image: country.flag,
  sort_order: (index + 1) * 10,
  show_in_hero: true,
  show_in_coverage: true,
}));
let current = fallback;
let started = false;
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) {
    started = true;
    void fetch(apiUrl("/api/countries/markets"), { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { data?: CountryMarket[] } | null) => { if (Array.isArray(payload?.data)) current = payload.data; listeners.forEach((notify) => notify()); })
      .catch(() => listeners.forEach((notify) => notify()));
  }
  return () => { listeners.delete(listener); };
}
function snapshot() { return current; }
export function useCountryMarkets() { return useSyncExternalStore(subscribe, snapshot, snapshot); }
