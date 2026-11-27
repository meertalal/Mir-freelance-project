import { apiUrl } from "./client";

export type UploadableType =
  | "service"
  | "testimonial"
  | "case_study"
  | "blog_post"
  | "feedback_form"
  | "site_asset";

type UploadResponse = {
  data?: { avatar?: string };
  error?: {
    message?: string;
    details?: { errors?: Record<string, string> };
  };
};

export async function uploadMedia(
  token: string,
  file: File,
  uploadableType: UploadableType,
): Promise<{ data: { avatar: string } }> {
  const body = new FormData();
  body.append("companyLogo[]", file);
  body.append("originalFilename", file.name);
  body.append("mediaType", file.type);
  let response: Response;
  try {
    response = await fetch(apiUrl(`/api/uploads/${uploadableType}`), {
      method: "POST", headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, body,
    });
  } catch {
    throw new Error("Cannot reach the API. Check that it is running and VITE_API_URL is correct.");
  }
  const payload = await response.json().catch(() => undefined) as UploadResponse | undefined;
  if (!response.ok || typeof payload?.data?.avatar !== "string") {
    throw new Error(Object.values(payload?.error?.details?.errors ?? {})[0] ?? payload?.error?.message ?? `Upload failed (${response.status}).`);
  }
  return { data: { avatar: payload.data.avatar } };
}
