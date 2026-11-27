const API_ORIGIN = (
  (import.meta.env.VITE_API_URL as string | undefined) || ""
).replace(/\/+$/, "");

export function resolveImageUrl(path: string, siteOrigin: string): string {
  if (!path) return "";
  if (/^(?:https?:)?\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const isUploadPath =
    normalizedPath === "/uploads" || normalizedPath.startsWith("/uploads/");
  const origin = isUploadPath ? API_ORIGIN || siteOrigin : siteOrigin;

  return `${origin.replace(/\/+$/, "")}${normalizedPath}`;
}
