import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import CountrySearchSelect from "./CountrySearchSelect";
import {
  budgetRanges,
  countries,
  letsTalkCopy,
  letsTalkProjectTypes,
} from "../../data/lets-talk.data";
import {
  submitContactForm,
  type ContactPayload,
} from "../../../../services/contact.service";

const fieldClass =
  "w-full min-h-12 rounded-xl border border-[#DCE6F2] bg-[#F8FAFD] px-4 py-3 text-base text-[#172B4D] outline-none transition duration-200 placeholder:text-[#91A0B5] hover:border-[#B9CBE0] focus:border-[#1670F5] focus:bg-white focus:ring-4 focus:ring-[#1670F5]/10 sm:text-sm";
const labelClass =
  "mb-2 block font-inter text-xs font-bold tracking-[0.025em] text-[#344968]";

const initialForm: ContactPayload = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budgetRange: "",
  message: "",
  country: "",
  countryPhone: "",
};

type ProjectStartFormProps = {
  title?: string;
  subtitle?: string;
};

export default function ProjectStartForm({
  title = letsTalkCopy.formTitle,
  subtitle = letsTalkCopy.formSubtitle,
}: ProjectStartFormProps) {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [phoneCountry, setPhoneCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const updateField = (field: keyof ContactPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (form.phone.trim() !== "" && (phoneDigits.length < 7 || phoneDigits.length > 15)) {
      setStatus("error");
      setFeedback("Please enter a valid phone number.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      await submitContactForm(form);
      setForm(initialForm);
      setPhoneCountry("");
      navigate("/thank-you");
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
        rounded-[1.75rem] border border-[#DCE8F7] bg-gradient-to-br from-white via-white to-[#F7FAFF]
        p-5 shadow-[0_24px_70px_rgba(15,48,91,0.11)]
        sm:p-7 lg:p-8
      "
    >
      <div className="mb-6 flex items-start gap-3 border-b border-[#E8EEF7] pb-5 sm:mb-7">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EAF2FF] to-[#D9E9FF] text-[#1263D6] shadow-sm ring-1 ring-[#CFE0F5]">
          <Mail size={20} aria-hidden="true" />
        </span>
        <div>
          <p className="mb-1 font-inter text-[10px] font-bold uppercase tracking-[0.16em] text-[#1670F5]">
            Project inquiry
          </p>
          <h3 className="font-montserrat text-xl font-bold leading-tight text-[#10234B] sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1.5 font-inter text-sm leading-relaxed text-[#71819A]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-5">
        <label className="block min-w-0">
          <span className={labelClass}>Your Name <span className="text-[#1670F5]">*</span></span>
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

        <label className="block min-w-0">
          <span className={labelClass}>Email Address <span className="text-[#1670F5]">*</span></span>
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

        <label className="block min-w-0">
          <span className={labelClass}>Company</span>
          <input
            name="company"
            value={form.company ?? ""}
            onChange={(event) => updateField("company", event.target.value)}
            className={fieldClass}
            placeholder="Enter your company or organization"
            autoComplete="organization"
          />
        </label>

        <label className="block min-w-0">
          <span className={labelClass}>Designation</span>
          <input
            name="designation"
            value={form.designation ?? ""}
            onChange={(event) => updateField("designation", event.target.value)}
            className={fieldClass}
            placeholder="Enter your job title"
            autoComplete="organization-title"
          />
        </label>

        <label className="block min-w-0">
          <span className={labelClass}>Subject</span>
          <input
            name="subject"
            value={form.subject ?? ""}
            onChange={(event) => updateField("subject", event.target.value)}
            className={fieldClass}
            placeholder="Enter a subject"
          />
        </label>

        <label className="block min-w-0">
          <span className={labelClass}>Project Type <span className="text-[#1670F5]">*</span></span>
          <select
            required
            name="projectType"
            value={form.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            className={`${fieldClass} cursor-pointer`}
          >
            <option value="">Select a service</option>
            {letsTalkProjectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block min-w-0">
          <span className={labelClass}>Budget Range</span>
          <select
            name="budgetRange"
            value={form.budgetRange}
            onChange={(event) => updateField("budgetRange", event.target.value)}
            className={`${fieldClass} cursor-pointer`}
          >
            <option value="">Select a budget</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>

        <div className="min-w-0">
          <label
            htmlFor="start-form-country"
            className={labelClass}
          >
            Country
          </label>
          <CountrySearchSelect
            id="start-form-country"
            value={form.country ?? ""}
            onChange={(countryName) => {
              updateField("country", countryName);
              setPhoneCountry(countryName);
              const match = countries.find((country) => country.name === countryName);
              updateField("countryPhone", match?.phoneCode ?? "");
            }}
            countries={countries}
          />
        </div>

        <fieldset className="min-w-0 sm:col-span-2">
          <legend className={labelClass}>Phone Number</legend>
          <div className="flex min-w-0 flex-col gap-2 min-[480px]:flex-row">
            <div className="min-w-0 min-[480px]:w-[40%]">
              <CountrySearchSelect
                id="start-form-phone-country"
                value={phoneCountry}
                onChange={(countryName) => {
                  setPhoneCountry(countryName);
                  const match = countries.find(
                    (country) => country.name === countryName,
                  );
                  updateField("country", countryName);
                  updateField("countryPhone", match?.phoneCode ?? "");
                }}
                countries={countries}
                placeholder="Select your country code"
                showDialCode
                panelClassName="min-[480px]:min-w-[17.5rem]"
              />
            </div>
            <input
              type="tel"
              inputMode="tel"
              name="phone"
              aria-label="Phone number"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={`${fieldClass} min-w-0 min-[480px]:flex-1`}
              placeholder="Phone number"
              autoComplete="tel"
            />
          </div>
        </fieldset>

        <label className="block min-w-0 sm:col-span-2">
          <span className={labelClass}>Project Details <span className="text-[#1670F5]">*</span></span>
          <textarea
            required
            name="message"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={`${fieldClass} min-h-36 resize-y leading-relaxed`}
            placeholder="Tell me about your project, goals, and any specific requirements..."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="
          group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2
          rounded-xl bg-gradient-to-r from-[#092f58] to-[#1456A0] px-5 font-inter text-sm font-bold text-white
          shadow-[0_10px_22px_rgba(9,47,88,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(9,47,88,0.24)] disabled:cursor-not-allowed disabled:opacity-70
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
