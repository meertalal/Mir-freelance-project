import { apiRequest, apiUrl } from "./client";

export type AdminMediaFile = {
  id: number; avatar: string; companyLogo: string; mimeType: string; sizeBytes: number;
  uploadableType: string; uploadableId: number | null; created_at: string;
};

export function listMedia(token: string) {
  return apiRequest<{ data: AdminMediaFile[] }>("/api/admin/uploads?limit=100", { token });
}
export async function uploadMedia(token: string, file: File): Promise<{ data: AdminMediaFile }> {
  const body = new FormData();
  body.append("companyLogo[]", file);
  body.append("originalFilename", file.name);
  body.append("mediaType", file.type);
  let response: Response;
  try {
    response = await fetch(apiUrl("/api/uploads/blog_post"), {
      method: "POST", headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, body,
    });
  } catch {
    throw new Error("Cannot reach the API. Check that it is running and VITE_API_URL is correct.");
  }
  const payload = await response.json().catch(() => undefined) as { data?: AdminMediaFile; error?: { message?: string; details?: { errors?: Record<string, string> } } } | undefined;
  if (!response.ok || !payload?.data) {
    throw new Error(Object.values(payload?.error?.details?.errors ?? {})[0] ?? payload?.error?.message ?? `Upload failed (${response.status}).`);
  }
  return { data: payload.data };
}
export function deleteMedia(token: string, id: number) {
  return apiRequest<{ message: string }>(`/api/admin/uploads/${id}`, { method: "DELETE", token });
}
