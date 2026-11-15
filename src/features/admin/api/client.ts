const API_URL = (
  (import.meta.env.VITE_API_URL as string | undefined) || ""
).replace(/\/+$/, "");

export const TOKEN_STORAGE_KEY = "mir-talal-admin-token";

export class ApiError extends Error {
  readonly status: number;
  readonly details?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    details?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
};

type ErrorPayload = {
  error?: {
    message?: string;
    details?: {
      errors?: Record<string, string>;
    };
  };
};

export function apiUrl(path: string) {
  return `${API_URL}${path}`;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  let response: Response;

  try {
    response = await fetch(apiUrl(path), {
      method: options.method ?? "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new ApiError(
      "Cannot reach the API. Make sure it is running and VITE_API_URL is correct.",
      0,
    );
  }

  const text = await response.text();
  let payload: unknown;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = undefined;
    }
  }

  if (!response.ok) {
    const error = (payload as ErrorPayload | undefined)?.error;
    const details = error?.details?.errors;
    const firstFieldError = details ? Object.values(details)[0] : "";

    throw new ApiError(
      firstFieldError || error?.message || `Request failed (${response.status}).`,
      response.status,
      details,
    );
  }

  return payload as T;
}

export function readToken(): string | null {
  try {
    return window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeToken(token: string | null): void {
  try {
    if (token) {
      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Storage can be unavailable (private mode); the session stays in memory.
  }
}
