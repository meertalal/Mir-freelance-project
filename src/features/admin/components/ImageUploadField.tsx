import { useRef, useState, type ChangeEvent } from "react";
import { LoaderCircle, UploadCloud } from "lucide-react";
import { apiUrl } from "../api/client";
import { uploadMedia, type UploadableType } from "../api/media";
import { useAdminAuth } from "../context/adminAuth";
import {
  adminFieldClass,
  adminLabelClass,
  adminSecondaryButtonClass,
} from "../admin.styles";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  uploadableType: UploadableType;
  required?: boolean;
  hint?: string;
  wide?: boolean;
};

function imageUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return apiUrl(path.startsWith("/") ? path : `/${path}`);
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  uploadableType,
  required = false,
  hint = "Upload an image or enter an existing image path.",
  wide = false,
}: ImageUploadFieldProps) {
  const { token } = useAdminAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    if (!token) {
      setError("Your admin session has expired. Sign in again to upload an image.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const result = await uploadMedia(token, file, uploadableType);
      onChange(`/${result.data.avatar.replace(/^\/+/, "")}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <label className={adminLabelClass}>
        {label}{required ? " *" : ""}
        <input
          required={required}
          maxLength={255}
          className={adminFieldClass}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/uploads/image.webp"
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={upload}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className={adminSecondaryButtonClass}
        >
          {uploading ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <UploadCloud size={16} />
          )}
          {uploading ? "Uploading…" : "Upload image"}
        </button>
        <span className="text-xs text-slate-500">{hint}</span>
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-rose-700">{error}</p>}
      {value && (
        <img
          src={imageUrl(value)}
          alt=""
          className="mt-3 max-h-32 max-w-full rounded-lg border border-slate-200 object-contain"
        />
      )}
    </div>
  );
}
