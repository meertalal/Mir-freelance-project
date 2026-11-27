import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { LoaderCircle, UploadCloud } from "lucide-react";
import { uploadMedia, type UploadableType } from "../api/media";
import { useAdminAuth } from "../context/adminAuth";
import { siteUrl } from "../../../data/seo.data";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
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
  uploadContextId: string;
  uploadFieldId: string;
  onPendingChange: (key: string, pending: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  hint?: string;
  wide?: boolean;
};

export default function ImageUploadField({
  label,
  value,
  onChange,
  uploadableType,
  uploadContextId,
  uploadFieldId,
  onPendingChange,
  disabled = false,
  required = false,
  hint = "Upload an image or enter an existing image path.",
  wide = false,
}: ImageUploadFieldProps) {
  const { token } = useAdminAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const mountedRef = useRef(false);
  const uploadSequenceRef = useRef(0);
  const activeUploadKeyRef = useRef<string | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      uploadSequenceRef.current += 1;
      const activeKey = activeUploadKeyRef.current;
      activeUploadKeyRef.current = null;
      if (activeKey) onPendingChange(activeKey, false);
    };
  }, [onPendingChange]);

  const invalidateUpload = () => {
    uploadSequenceRef.current += 1;
    const activeKey = activeUploadKeyRef.current;
    activeUploadKeyRef.current = null;
    if (activeKey) onPendingChange(activeKey, false);
    setUploading(false);
  };

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    if (!token) {
      setError("Your admin session has expired. Sign in again to upload an image.");
      return;
    }

    invalidateUpload();
    const sequence = ++uploadSequenceRef.current;
    const pendingKey = `${uploadContextId}/${uploadFieldId}/${sequence}`;
    activeUploadKeyRef.current = pendingKey;
    setUploading(true);
    setError("");
    onPendingChange(pendingKey, true);

    const isCurrentUpload = () =>
      mountedRef.current && uploadSequenceRef.current === sequence;

    try {
      const result = await uploadMedia(token, file, uploadableType);
      if (!isCurrentUpload()) return;
      const path = `/${result.data.avatar.replace(/^\/+/, "")}`;
      onChange(path);
    } catch (cause) {
      if (isCurrentUpload()) {
        setError(cause instanceof Error ? cause.message : "Could not upload image.");
      }
    } finally {
      onPendingChange(pendingKey, false);
      if (activeUploadKeyRef.current === pendingKey) {
        activeUploadKeyRef.current = null;
        if (mountedRef.current) setUploading(false);
      }
    }
  };

  const updatePath = (nextValue: string) => {
    invalidateUpload();
    setError("");
    onChange(nextValue);
  };

  return (
    <div className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <label className={adminLabelClass}>
        {label}{required ? " *" : ""}
        <input
          required={required}
          maxLength={255}
          className={adminFieldClass}
          disabled={disabled}
          value={value}
          onChange={(event) => updatePath(event.target.value)}
          placeholder="/uploads/image.webp"
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={disabled || uploading}
          onChange={upload}
        />
        <button
          type="button"
          disabled={disabled || uploading}
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
          src={resolveImageUrl(value, siteUrl)}
          alt=""
          className="mt-3 max-h-32 max-w-full rounded-lg border border-slate-200 object-contain"
        />
      )}
    </div>
  );
}
