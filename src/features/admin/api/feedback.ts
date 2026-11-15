import { apiRequest } from "./client";

export type AdminFeedback = {
  id: number; author: string; role: string; company: string; message: string; avatar: string;
  email: string; rating: number; service_id: number | null; service_title: string; source: string; status: "new" | "reviewed" | "approved" | "rejected";
  notes: string; created_at: string;
};

export function listFeedback(token: string, status?: string) {
  const query = new URLSearchParams({ limit: "100" });
  if (status) query.set("status", status);
  return apiRequest<{ data: AdminFeedback[]; meta: { status_counts: Record<string, number> } }>(`/api/admin/feedback?${query}`, { token });
}
export function updateFeedbackStatus(token: string, id: number, status: AdminFeedback["status"], reviewerId: number, notes = "") {
  return apiRequest<{ data: AdminFeedback }>(`/api/admin/feedback/${id}/status`, {
    method: "PATCH", token, body: { status, reviewed_by: reviewerId, notes },
  });
}
export function deleteFeedback(token: string, id: number) {
  return apiRequest<{ message: string }>(`/api/admin/feedback/${id}`, { method: "DELETE", token });
}
