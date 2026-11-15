import { apiRequest } from "./client";

export type Admin = {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
};

export type LoginResult = {
  token: string;
  expires_at: string;
  admin: Admin;
};

export function loginRequest(email: string, password: string) {
  return apiRequest<LoginResult>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function fetchMe(token: string) {
  return apiRequest<{ admin: Admin | null }>("/api/auth/me", { token });
}

export function logoutRequest(token: string) {
  return apiRequest<{ message: string }>("/api/auth/logout", {
    method: "POST",
    token,
  });
}

export function changePasswordRequest(
  token: string,
  currentPassword: string,
  newPassword: string,
) {
  return apiRequest<{ message: string }>("/api/admin/account/password", {
    method: "PATCH",
    token,
    body: {
      current_password: currentPassword,
      new_password: newPassword,
    },
  });
}
