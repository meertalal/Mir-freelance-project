import { useSyncExternalStore } from "react";
import { brand } from "../../data/site.data";

export type SiteSettingsView = {
  email: string;
  phone: string;
  whatsappHref: string;
  location: string;
  hours: string;
  social: { linkedin: string; x: string; github: string; instagram: string; facebook: string; youtube: string };
  seo: { title: string; description: string; ogImage: string };
};

type SettingsResponse = {
  data?: {
    email?: string;
    phone?: string;
    whatsapp_href?: string;
    location?: string;
    hours?: string;
    social?: { linkedin?: string; x?: string; github?: string; instagram?: string; facebook?: string; youtube?: string };
    seo?: { title?: string; description?: string; og_image?: string };
  };
};

const API_URL = (
  (import.meta.env.VITE_API_URL as string | undefined) || ""
).replace(/\/+$/, "");

const fallback: SiteSettingsView = {
  email: brand.email,
  phone: brand.phone,
  whatsappHref: brand.whatsappHref,
  location: brand.location,
  hours: brand.hours,
  social: { linkedin: "", x: "", github: "", instagram: "", facebook: "", youtube: "" },
  seo: { title: "", description: "", ogImage: "" },
};

let current: SiteSettingsView = fallback;
let started = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

async function load() {
  try {
    const response = await fetch(`${API_URL}/api/site-settings`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return;

    const payload = (await response.json()) as SettingsResponse;
    const data = payload.data;

    if (!data) return;

    const next: SiteSettingsView = {
      email: data.email?.trim() || fallback.email,
      phone: data.phone?.trim() || fallback.phone,
      whatsappHref: data.whatsapp_href?.trim() || fallback.whatsappHref,
      location: data.location?.trim() || fallback.location,
      hours: data.hours?.trim() || fallback.hours,
      social: {
        linkedin: data.social?.linkedin?.trim() || "",
        x: data.social?.x?.trim() || "",
        github: data.social?.github?.trim() || "",
        instagram: data.social?.instagram?.trim() || "",
        facebook: data.social?.facebook?.trim() || "",
        youtube: data.social?.youtube?.trim() || "",
      },
      seo: {
        title: data.seo?.title?.trim() || "",
        description: data.seo?.description?.trim() || "",
        ogImage: data.seo?.og_image?.trim() || "",
      },
    };

    const changed = (Object.keys(next) as (keyof SiteSettingsView)[]).some(
      (key) => next[key] !== current[key],
    );

    current = next;

    if (changed) emit();
  } catch {
    // Keep the static defaults when the API is unreachable.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!started) {
    started = true;
    void load();
  }

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return current;
}

function getServerSnapshot() {
  return fallback;
}

export function useSiteSettings(): SiteSettingsView {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
