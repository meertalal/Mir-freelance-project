import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import {
  budgetRanges,
  letsTalkCopy,
  letsTalkProjectTypes,
} from "../../data/lets-talk.data";
import {
  submitContactForm,
  type ContactPayload,
} from "../../../../services/contact.service";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-[#F7FAFF] px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-[#1670F5] focus:bg-white focus:ring-2 focus:ring-[#1670F5]/20";

const initialForm: ContactPayload = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budgetRange: "",
  message: "",
};

export default function ProjectStartForm() {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
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

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="
        rounded-[1.75rem] border border-white/80 bg-white
        p-5 shadow-[0_18px_50px_rgba(15,48,91,0.08)]
        sm:p-7 lg:p-8
      "
    >
      <div className="mb-6 flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
          <Mail size={20} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-montserrat text-xl font-bold text-[#10234B] sm:text-2xl">
            {letsTalkCopy.formTitle}
          </h3>
          <p className="mt-1 font-inter text-sm text-slate-500">
            {letsTalkCopy.formSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-inter text-xs font-semibold text-slate-700">
            Your Name *
          </span>
          <input
            required
            name="fullName"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className={fieldClass}
            placeholder="Enter your name"
            autoComplete="name"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-inter text-xs font-semibold text-slate-700">
            Email Address *
          </span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={fieldClass}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-inter text-xs font-semibold text-slate-700">
            Project Type *
          </span>
          <select
            required
            name="projectType"
            value={form.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            className={fieldClass}
          >
            <option value="">Select a service</option>
            {letsTalkProjectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block font-inter text-xs font-semibold text-slate-700">
            Budget Range
          </span>
          <select
            name="budgetRange"
            value={form.budgetRange}
            onChange={(event) => updateField("budgetRange", event.target.value)}
            className={fieldClass}
          >
            <option value="">Select a budget</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block font-inter text-xs font-semibold text-slate-700">
            Project Details *
          </span>
          <textarea
            required
            name="message"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={`${fieldClass} min-h-32 resize-y`}
            placeholder="Tell me about your project, goals, and any specific requirements..."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="
          group mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2
          rounded-xl bg-[#092f58] px-5 font-inter text-sm font-bold text-white
          transition hover:bg-[#0f3d6e] disabled:cursor-not-allowed disabled:opacity-70
        "
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
