import { apiRequest } from "./client";

export type AdminService = {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  image_alt: string;
  href: string;
  sort_order: number;
  is_published: boolean;
  updated_at: string;
};

export type ServiceInput = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  image_alt: string;
  sort_order: number;
  is_published: boolean;
};

export type AdminTestimonial = {
  id: number;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  sort_order: number;
  is_published: boolean;
  updated_at: string;
};

export type TestimonialInput = {
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  sort_order: number;
  is_published: boolean;
};

export type AdminCaseStudy = {
  id: number; slug: string; title: string; excerpt: string; cover_image: string;
  cover_image_alt: string; body: string; project_type: string; status: "draft" | "published";
  is_published: boolean; sort_order: number; client_company: string; client_name: string;
  client_role: string; client_website: string; challenge: string; solution: string; results: string;
};
export type CaseStudyInput = Omit<AdminCaseStudy, "id">;
export type AdminBlogPost = {
  id: number; slug: string; title: string; excerpt: string; cover_image: string; cover_image_alt: string;
  body: string; category: string; status: "draft" | "published"; is_published: boolean; sort_order: number;
  author_name: string; author_role: string; author_avatar: string; meta_title: string;
  meta_description: string; meta_keywords: string;
};
export type BlogPostInput = Omit<AdminBlogPost, "id">;

export function listServices(token: string) {
  return apiRequest<{ data: AdminService[] }>("/api/admin/services", { token });
}

export function createService(token: string, input: ServiceInput) {
  return apiRequest<{ data: AdminService }>("/api/admin/services", {
    method: "POST",
    token,
    body: input,
  });
}

export function updateService(token: string, id: number, input: ServiceInput) {
  return apiRequest<{ data: AdminService }>(`/api/admin/services/${id}`, {
    method: "PATCH",
    token,
    body: input,
  });
}

export function deleteService(token: string, id: number) {
  return apiRequest<{ message: string }>(`/api/admin/services/${id}`, {
    method: "DELETE",
    token,
  });
}

export function listTestimonials(token: string) {
  return apiRequest<{ data: AdminTestimonial[] }>("/api/admin/testimonials", {
    token,
  });
}

export function createTestimonial(token: string, input: TestimonialInput) {
  return apiRequest<{ data: AdminTestimonial }>("/api/admin/testimonials", {
    method: "POST",
    token,
    body: input,
  });
}

export function updateTestimonial(
  token: string,
  id: number,
  input: TestimonialInput,
) {
  return apiRequest<{ data: AdminTestimonial }>(`/api/admin/testimonials/${id}`, {
    method: "PATCH",
    token,
    body: input,
  });
}

export function deleteTestimonial(token: string, id: number) {
  return apiRequest<{ message: string }>(`/api/admin/testimonials/${id}`, {
    method: "DELETE",
    token,
  });
}

export function listCaseStudies(token: string) {
  return apiRequest<{ data: AdminCaseStudy[] }>('/api/admin/case-studies', { token });
}
export function createCaseStudy(token: string, input: CaseStudyInput) {
  return apiRequest<{ data: AdminCaseStudy }>('/api/admin/case-studies', { method: 'POST', token, body: input });
}
export function updateCaseStudy(token: string, id: number, input: CaseStudyInput) {
  return apiRequest<{ data: AdminCaseStudy }>(`/api/admin/case-studies/${id}`, { method: 'PATCH', token, body: input });
}
export function deleteCaseStudy(token: string, id: number) {
  return apiRequest<{ message: string }>(`/api/admin/case-studies/${id}`, { method: 'DELETE', token });
}
export function listBlogPosts(token: string) {
  return apiRequest<{ data: AdminBlogPost[]; meta?: { categories?: string[] } }>('/api/admin/blog', { token });
}
export function createBlogPost(token: string, input: BlogPostInput) {
  return apiRequest<{ data: AdminBlogPost }>('/api/admin/blog', { method: 'POST', token, body: input });
}
export function updateBlogPost(token: string, id: number, input: BlogPostInput) {
  return apiRequest<{ data: AdminBlogPost }>(`/api/admin/blog/${id}`, { method: 'PATCH', token, body: input });
}
export function deleteBlogPost(token: string, id: number) {
  return apiRequest<{ message: string }>(`/api/admin/blog/${id}`, { method: 'DELETE', token });
}
