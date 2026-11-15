import { apiRequest } from "./client";

export type SiteSettingsSocial = {
  linkedin: string;
  github: string;
  x: string;
  instagram: string;
  facebook: string;
  youtube: string;
};

export type SiteSettingsSeo = {
  title: string;
  description: string;
  og_image: string;
};

export type SiteSettings = {
  email: string;
  phone: string;
  whatsapp_href: string;
  location: string;
  hours: string;
  social: SiteSettingsSocial;
  seo: SiteSettingsSeo;
  updated_at: string;
};

export type SiteSettingsInput = Omit<SiteSettings, "updated_at">;

export function fetchAdminSettings(token: string) {
  return apiRequest<{ data: SiteSettings }>("/api/admin/site-settings", {
    token,
  });
}

export function saveSettings(token: string, settings: SiteSettingsInput) {
  return apiRequest<{ message: string; data: SiteSettings }>(
    "/api/admin/site-settings",
    { method: "PUT", token, body: settings },
  );
}
