import { apiRequest } from "./client";

export type SubmissionStatus = "new" | "read" | "archived";

export type ContactSubmission = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  project_type: string;
  budget_range: string;
  message: string;
  country: string;
  country_phone: string;
  subject: string;
  status: SubmissionStatus;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type SubmissionListMeta = {
  total: number;
  page: number;
  per_page: number;
  pages: number;
  counts: Record<SubmissionStatus, number>;
};

export type SubmissionListResult = {
  data: ContactSubmission[];
  meta: SubmissionListMeta;
};

type ListParams = {
  page?: number;
  perPage?: number;
  status?: SubmissionStatus | null;
  search?: string | null;
};

export function listSubmissions(token: string, params: ListParams = {}) {
  const search = new URLSearchParams();
  search.set("page", String(params.page ?? 1));
  search.set("per_page", String(params.perPage ?? 20));

  if (params.status) {
    search.set("status", params.status);
  }

  if (params.search && params.search.trim() !== "") {
    search.set("q", params.search.trim());
  }

  return apiRequest<SubmissionListResult>(
    `/api/admin/contact-submissions?${search.toString()}`,
    { token },
  );
}

export function getSubmission(token: string, id: number) {
  return apiRequest<{ data: ContactSubmission }>(
    `/api/admin/contact-submissions/${id}`,
    { token },
  );
}

export function updateSubmissionStatus(
  token: string,
  id: number,
  status: SubmissionStatus,
) {
  return apiRequest<{ data: ContactSubmission }>(
    `/api/admin/contact-submissions/${id}`,
    { method: "PATCH", token, body: { status } },
  );
}

export function deleteSubmission(token: string, id: number) {
  return apiRequest<{ message: string }>(
    `/api/admin/contact-submissions/${id}`,
    { method: "DELETE", token },
  );
}
