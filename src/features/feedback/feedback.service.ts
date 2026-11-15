import { apiRequest } from "../admin/api/client";

export type FeedbackSubmission = {
  author: string;
  email: string;
  company: string;
  role: string;
  message: string;
  rating: number;
  service_id: number | null;
  service_title: string;
  source: "services";
};

export function submitFeedback(input: FeedbackSubmission) {
  return apiRequest<{ message: string }>("/api/feedback", {
    method: "POST",
    body: input,
  });
}
