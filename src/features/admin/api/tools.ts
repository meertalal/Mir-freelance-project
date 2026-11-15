import { apiRequest, apiUrl } from "./client";

export type FaqEntry = { id: number; category: string; question: string; answer: string; sort_order: number; is_published: boolean };
export type PageSeoEntry = { path: string; title: string; description: string; og_title: string; og_description: string; og_image: string; updated_at?: string };
export type RedirectEntry = { id: number; from_path: string; to_path: string; status_code: 301 | 302; created_at: string };
export type AuditEntry = { id: number; admin_email: string; method: string; path: string; status_code: number; created_at: string };

export const listFaqs = (token: string) => apiRequest<{ data: FaqEntry[] }>("/api/admin/faqs", { token });
export const createFaq = (token: string, input: Omit<FaqEntry, "id">) => apiRequest<{ data: FaqEntry }>("/api/admin/faqs", { method: "POST", token, body: input });
export const updateFaq = (token: string, id: number, input: Omit<FaqEntry, "id">) => apiRequest<{ data: FaqEntry }>(`/api/admin/faqs/${id}`, { method: "PATCH", token, body: input });
export const deleteFaq = (token: string, id: number) => apiRequest<{ message: string }>(`/api/admin/faqs/${id}`, { method: "DELETE", token });
export const reorderFaqs = (token: string, items: Pick<FaqEntry, "id">[]) => apiRequest<{ message: string }>("/api/admin/faqs/order", { method: "PATCH", token, body: { items } });
export const listSeoPages = (token: string) => apiRequest<{ data: PageSeoEntry[] }>("/api/admin/seo/pages", { token });
export const saveSeoPage = (token: string, input: PageSeoEntry) => apiRequest<{ data: PageSeoEntry }>("/api/admin/seo/pages", { method: "PUT", token, body: input });
export const listRedirects = (token: string) => apiRequest<{ data: RedirectEntry[] }>("/api/admin/seo/redirects", { token });
export const createRedirect = (token: string, input: Pick<RedirectEntry, "from_path" | "to_path" | "status_code">) => apiRequest<{ data: RedirectEntry }>("/api/admin/seo/redirects", { method: "POST", token, body: input });
export const deleteRedirect = (token: string, id: number) => apiRequest<{ message: string }>(`/api/admin/seo/redirects/${id}`, { method: "DELETE", token });
export const saveContentOrder = (token: string, type: "services" | "testimonials" | "portfolio", ids: number[]) => apiRequest<{ message: string }>("/api/admin/content-order", { method: "PATCH", token, body: { type, ids } });
export const getInsights = (token: string) => apiRequest<{ data: { inquiries: Record<string, number>; trend: { month: string; count: number }[]; content: Record<string, number>; recent_activity: AuditEntry[]; recent_inquiries: { id: number; full_name: string; email: string; project_type: string; status: string; created_at: string }[] } }>("/api/admin/insights", { token });
export const getAuditLog = (token: string) => apiRequest<{ data: AuditEntry[] }>("/api/admin/audit-log", { token });

export async function downloadBackup(token: string) {
  const response = await fetch(apiUrl("/api/admin/backup"), { headers: { Accept: "application/json", Authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error("Could not create the backup. Please try again.");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `mir-talal-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
