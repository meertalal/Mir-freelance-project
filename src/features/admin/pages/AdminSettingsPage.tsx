import { useEffect, useState, type FormEvent } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import ImageUploadField from "../components/ImageUploadField";
import usePendingImageUploads from "../hooks/usePendingImageUploads";
import {
  fetchAdminSettings,
  saveSettings,
  type SiteSettings,
  type SiteSettingsInput,
} from "../api/settings";
import { ApiError } from "../api/client";
import {
  adminCardClass,
  adminFieldClass,
  adminHeadingClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSubheadingClass,
} from "../admin.styles";

const emptySettings: SiteSettingsInput = {
  email: "",
  phone: "",
  whatsapp_href: "",
  location: "",
  hours: "",
  social: {
    linkedin: "",
    github: "",
    x: "",
    instagram: "",
    facebook: "",
    youtube: "",
  },
  seo: { title: "", description: "", og_image: "" },
};

function toInput(settings: SiteSettings): SiteSettingsInput {
  return {
    email: settings.email,
    phone: settings.phone,
    whatsapp_href: settings.whatsapp_href,
    location: settings.location,
    hours: settings.hours,
    social: settings.social,
    seo: settings.seo,
  };
}

const socialFields: { key: keyof SiteSettingsInput["social"]; label: string }[] = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "github", label: "GitHub" },
  { key: "x", label: "X (Twitter)" },
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "youtube", label: "YouTube" },
];

export default function AdminSettingsPage() {
  const { token, signOut } = useAdminAuth();
  const [settings, setSettings] = useState<SiteSettingsInput>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const { hasPending, onPendingChange } = usePendingImageUploads();
  const uploadContextId = "site-settings";
  const imageUploadPending = hasPending(uploadContextId);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    fetchAdminSettings(token)
      .then((result) => {
        if (cancelled) return;

        setSettings(toInput(result.data));
      })
      .catch((cause) => {
        if (cancelled) return;

        if (cause instanceof ApiError && cause.status === 401) {
          signOut();
          return;
        }

        setError(
          cause instanceof ApiError ? cause.message : "Could not load settings.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, signOut]);

  const updateField = (
    field: "email" | "phone" | "whatsapp_href" | "location" | "hours",
    value: string,
  ) => setSettings((current) => ({ ...current, [field]: value }));

  const updateSocial = (key: keyof SiteSettingsInput["social"], value: string) =>
    setSettings((current) => ({
      ...current,
      social: { ...current.social, [key]: value },
    }));

  const updateSeo = (key: keyof SiteSettingsInput["seo"], value: string) =>
    setSettings((current) => ({
      ...current,
      seo: { ...current.seo, [key]: value },
    }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    if (imageUploadPending) {
      setError("Wait for the image upload to finish before saving.");
      return;
    }

    setSaving(true);
    setError("");
    setSaved("");

    try {
      const result = await saveSettings(token, settings);
      setSettings(toInput(result.data));
      setSaved("Settings saved. The website will show the new details.");
    } catch (cause) {
      setError(
        cause instanceof ApiError ? cause.message : "Could not save settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="font-inter text-sm text-slate-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className={adminHeadingClass}>Site settings</h1>
      <p className={adminSubheadingClass}>
        Contact details and social links shown across the website.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <section className={`${adminCardClass} p-5 sm:p-6`}>
          <h2 className="font-montserrat text-base font-bold text-[#10234B]">
            Contact details
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={adminLabelClass}>Email *</span>
              <input
                required
                type="email"
                value={settings.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={adminFieldClass}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Phone *</span>
              <input
                required
                type="tel"
                value={settings.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className={adminFieldClass}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>WhatsApp link</span>
              <input
                type="url"
                value={settings.whatsapp_href}
                onChange={(event) =>
                  updateField("whatsapp_href", event.target.value)
                }
                className={adminFieldClass}
                placeholder="https://wa.me/14389054165"
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Location</span>
              <input
                value={settings.location}
                onChange={(event) => updateField("location", event.target.value)}
                className={adminFieldClass}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className={adminLabelClass}>Working hours</span>
              <input
                value={settings.hours}
                onChange={(event) => updateField("hours", event.target.value)}
                className={adminFieldClass}
              />
            </label>
          </div>
        </section>

        <section className={`${adminCardClass} p-5 sm:p-6`}>
          <h2 className="font-montserrat text-base font-bold text-[#10234B]">
            Social links
          </h2>
          <p className="mt-1 font-inter text-sm text-slate-500">
            Leave a field empty to hide that link.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {socialFields.map((field) => (
              <label key={field.key} className="block">
                <span className={adminLabelClass}>{field.label}</span>
                <input
                  type="url"
                  value={settings.social[field.key]}
                  onChange={(event) => updateSocial(field.key, event.target.value)}
                  className={adminFieldClass}
                  placeholder="https://"
                />
              </label>
            ))}
          </div>
        </section>

        <section className={`${adminCardClass} p-5 sm:p-6`}>
          <h2 className="font-montserrat text-base font-bold text-[#10234B]">
            SEO defaults
          </h2>
          <p className="mt-1 font-inter text-sm text-slate-500">
            Used where a page does not define its own title or description.
          </p>

          <div className="mt-4 grid gap-4">
            <label className="block">
              <span className={adminLabelClass}>Default title</span>
              <input
                value={settings.seo.title}
                onChange={(event) => updateSeo("title", event.target.value)}
                className={adminFieldClass}
                maxLength={200}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Default description</span>
              <textarea
                value={settings.seo.description}
                onChange={(event) => updateSeo("description", event.target.value)}
                className={`${adminFieldClass} min-h-24 resize-y`}
                maxLength={320}
              />
            </label>

            <ImageUploadField
              key={uploadContextId}
              label="Default social image path"
              value={settings.seo.og_image}
              onChange={(og_image) => updateSeo("og_image", og_image)}
              uploadableType="site_asset"
              uploadContextId={uploadContextId}
              uploadFieldId="og_image"
              onPendingChange={onPendingChange}
            />
          </div>
        </section>

        {error && (
          <p className="rounded-xl bg-rose-50 px-3 py-2 font-inter text-sm text-rose-700">
            {error}
          </p>
        )}

        {saved && (
          <p
            role="status"
            className="rounded-xl bg-emerald-50 px-3 py-2 font-inter text-sm text-emerald-700"
          >
            {saved}
          </p>
        )}

        <button
          type="submit"
          disabled={saving || imageUploadPending}
          className={adminPrimaryButtonClass}
        >
          {saving ? (
            <>
              <LoaderCircle className="animate-spin" size={16} />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} aria-hidden="true" />
              Save changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
