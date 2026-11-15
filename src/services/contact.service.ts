export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  designation?: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  country?: string;
  countryPhone?: string;
  subject?: string;
};

export type ContactResult = {
  ok: boolean;
  message: string;
};

type ApiErrorPayload = {
  error?: {
    message?: string;
    details?: {
      errors?: Record<string, string>;
    };
  };
};

const API_URL = (
  (import.meta.env.VITE_API_URL as string | undefined) || ""
).replace(/\/+$/, "");

/**
 * In development Vite proxies `/api` to the Slim API (see vite.config.ts).
 * In production set VITE_API_URL to the API origin, e.g. https://api.mirtalal.com
 */
function getEndpoint() {
  return `${API_URL}/api/contact`;
}

export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResult> {
  const response = await fetch(getEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: ({ message?: string } & ApiErrorPayload) | undefined;
  try {
    data = await response.json();
  } catch {
    data = undefined;
  }

  if (!response.ok) {
    const fieldErrors = data?.error?.details?.errors;
    const firstFieldError = fieldErrors ? Object.values(fieldErrors)[0] : "";

    throw new Error(
      firstFieldError ||
        data?.error?.message ||
        "Unable to send your message. Please try again.",
    );
  }

  return {
    ok: true,
    message:
      data?.message ||
      "Thanks! Your message has been sent. I will get back to you soon.",
  };
}
