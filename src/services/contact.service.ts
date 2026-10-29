export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
};

export type ContactResult = {
  ok: boolean;
  message: string;
};

function getEndpoint() {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
  if (formspreeId) {
    return `https://formspree.io/f/${formspreeId}`;
  }

  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
    | string
    | undefined;
  if (web3formsKey) {
    return "https://api.web3forms.com/submit";
  }

  return (
    (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ||
    "/api/contact.php"
  );
}

export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResult> {
  const endpoint = getEndpoint();
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
    | string
    | undefined;

  const body: Record<string, string> = {
    ...payload,
    name: payload.fullName,
    subject: `New project inquiry from ${payload.fullName}`,
  };

  if (web3formsKey && endpoint.includes("web3forms")) {
    body.access_key = web3formsKey;
    body.from_name = "Mir Talal Website";
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  let data: { message?: string; error?: string; success?: boolean } = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || data.success === false) {
    throw new Error(
      data.error || data.message || "Unable to send your message. Please try again.",
    );
  }

  return {
    ok: true,
    message:
      data.message ||
      "Thanks! Your message has been sent. I will get back to you soon.",
  };
}
