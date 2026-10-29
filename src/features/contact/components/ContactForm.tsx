import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { projectTypes } from "../data/contact-page.data";
import {
  submitContactForm,
  type ContactPayload,
} from "../../../services/contact.service";

const initialForm: ContactPayload = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof ContactPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const result = await submitContactForm(form);
      setStatus("success");
      setFeedback(result.message);
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-[#1670F5] focus:ring-2 focus:ring-[#1670F5]/20";

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,48,91,0.08)] sm:p-7"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-xs font-semibold text-slate-700">
            Full Name *
          </span>
          <input
            required
            name="fullName"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className={fieldClass}
            placeholder="John Smith"
            autoComplete="name"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-700">
            Email Address *
          </span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={fieldClass}
            placeholder="john@company.com"
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-700">
            Phone Number
          </span>
          <input
            name="phone"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={fieldClass}
            placeholder="+1 000 000 0000"
            autoComplete="tel"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-700">
            Company Name
          </span>
          <input
            name="company"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            className={fieldClass}
            placeholder="Company Inc."
            autoComplete="organization"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-slate-700">
            Project Type
          </span>
          <select
            name="projectType"
            value={form.projectType}
            onChange={(e) => updateField("projectType", e.target.value)}
            className={fieldClass}
          >
            <option value="">Select a project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-slate-700">
            Tell us about your project *
          </span>
          <textarea
            required
            name="message"
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={`${fieldClass} min-h-32 resize-y`}
            placeholder="Goals, timeline, budget range, and any useful links..."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1670F5] px-5 text-sm font-bold text-white transition hover:bg-[#0f5fd4] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle className="animate-spin" size={16} />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </>
        )}
      </button>

      {feedback && (
        <p
          role="status"
          className={`mt-4 rounded-xl px-3 py-2 text-sm ${
            status === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
