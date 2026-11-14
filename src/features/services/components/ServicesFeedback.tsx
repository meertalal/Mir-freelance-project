import { useState, type FormEvent } from "react";
import {
  LoaderCircle,
  MessageSquareQuote,
  Quote,
  Send,
  Star,
} from "lucide-react";
import {
  sharedServices,
  sharedTestimonials,
} from "../../../data/site.data";
import { servicesFeedbackCopy } from "../data/services-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";
import { submitContactForm } from "../../../services/contact.service";

const fieldClass =
  "w-full min-h-11 rounded-xl border border-slate-200 bg-[#F7FAFF] px-3.5 py-3 text-base text-slate-800 outline-none transition focus:border-[#1670F5] focus:bg-white focus:ring-2 focus:ring-[#1670F5]/20 sm:text-sm";

const initialForm = { fullName: "", email: "", service: "", message: "" };

export default function ServicesFeedback() {
  const featured = sharedTestimonials[1] ?? sharedTestimonials[0];
  const clients = sharedTestimonials;
  const [form, setForm] = useState(initialForm);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [notice, setNotice] = useState("");

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setNotice("Please complete your name, email and feedback.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus("error");
      setNotice("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setNotice("");

    try {
      const result = await submitContactForm({
        fullName: form.fullName,
        email: form.email,
        phone: "",
        company: "",
        projectType: form.service
          ? `Client Feedback: ${form.service}`
          : "Client Feedback",
        budgetRange: `${rating} out of 5`,
        message: form.message,
        country: "",
        countryPhone: "",
        subject: `New client feedback from ${form.fullName}`,
      });
      setStatus("success");
      setNotice(result.message);
      setForm(initialForm);
      setRating(5);
    } catch (error) {
      setStatus("error");
      setNotice(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section
      id="client-feedback"
      aria-labelledby="client-feedback-title"
      className={`${innerSectionClass} bg-[#EAF2FF]`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-white/60 blur-3xl motion-safe:animate-float-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#DCE9FF]/70 blur-3xl"
      />

      <div
        className={`relative z-10 ${innerContainerClass} grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16`}
      >
        <Reveal>
          <SectionHeading
            titleId="client-feedback-title"
            align="left"
            eyebrow={servicesFeedbackCopy.eyebrow}
            title={servicesFeedbackCopy.title}
            description={servicesFeedbackCopy.description}
            className="mb-6 sm:mb-8"
          />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#E6EEF9] bg-white p-6 shadow-[0_18px_50px_rgba(15,48,91,0.08)] sm:p-7">
            <Quote
              size={72}
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-3 text-[#EAF2FF]"
            />

            <div
              className="relative flex items-center gap-0.5 text-[#FBBF24]"
              aria-label={`${featured.rating} out of 5 stars`}
            >
              {Array.from({ length: featured.rating }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  size={15}
                  fill="currentColor"
                  strokeWidth={0}
                  aria-hidden="true"
                />
              ))}
            </div>

            <blockquote className="relative mt-4 font-inter text-sm leading-relaxed text-[#334155] sm:text-base">
              {featured.quote}
            </blockquote>

            <div className="relative mt-6 flex items-center gap-3 border-t border-[#E6EEF9] pt-5">
              <img
                src={featured.avatar}
                alt={featured.author}
                loading="lazy"
                decoding="async"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#DCE9FF]"
              />
              <div className="min-w-0">
                <p className="font-montserrat text-sm font-bold text-[#10234B]">
                  {featured.author}
                </p>
                <p className="font-inter text-xs text-[#526987]">
                  {featured.role}, {featured.company}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex -space-x-2.5">
              {clients.map((client) => (
                <img
                  key={client.id}
                  src={client.avatar}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                />
              ))}
            </div>
            <p className="font-inter text-xs font-medium text-[#526987] sm:text-sm">
              Feedback shared by clients after project delivery.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[1.75rem] border border-[#E6EEF9] bg-white p-5 shadow-[0_18px_50px_rgba(15,48,91,0.08)] sm:p-7 lg:p-8"
          >
            <div className="mb-6 flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
                <MessageSquareQuote size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-montserrat text-xl font-bold text-[#10234B] sm:text-2xl">
                  {servicesFeedbackCopy.formTitle}
                </h3>
                <p className="mt-1 font-inter text-sm text-slate-500">
                  {servicesFeedbackCopy.formSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-inter text-sm font-semibold text-slate-700 sm:text-xs">
                  Your Name *
                </span>
                <input
                  required
                  name="fullName"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  className={fieldClass}
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block font-inter text-sm font-semibold text-slate-700 sm:text-xs">
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

              <label className="block sm:col-span-2">
                <span className="mb-1.5 block font-inter text-sm font-semibold text-slate-700 sm:text-xs">
                  Service Provided
                </span>
                <select
                  name="service"
                  value={form.service}
                  onChange={(event) =>
                    updateField("service", event.target.value)
                  }
                  className={fieldClass}
                >
                  <option value="">Select a service</option>
                  {sharedServices.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="sm:col-span-2">
                <legend className="mb-1.5 block font-inter text-sm font-semibold text-slate-700 sm:text-xs">
                  Your Rating *
                </legend>
                <div
                  className="flex items-center gap-1.5"
                  role="radiogroup"
                  aria-label="Your rating"
                  onMouseLeave={() => setHovered(0)}
                >
                  {[1, 2, 3, 4, 5].map((value) => {
                    const active = value <= (hovered || rating);
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating === value}
                        aria-label={`${value} star${value === 1 ? "" : "s"}`}
                        onMouseEnter={() => setHovered(value)}
                        onFocus={() => setHovered(value)}
                        onBlur={() => setHovered(0)}
                        onClick={() => setRating(value)}
                        className="rounded-lg p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1670F5] focus-visible:ring-offset-2"
                      >
                        <Star
                          size={26}
                          aria-hidden="true"
                          fill={active ? "currentColor" : "none"}
                          strokeWidth={1.6}
                          className={`transition ${
                            active ? "text-[#FBBF24]" : "text-[#C9D8EA]"
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 font-inter text-sm font-semibold text-[#10234B]">
                    {rating} of 5
                  </span>
                </div>
              </fieldset>

              <label className="block sm:col-span-2">
                <span className="mb-1.5 block font-inter text-sm font-semibold text-slate-700 sm:text-xs">
                  Your Feedback *
                </span>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className={`${fieldClass} min-h-32 resize-y`}
                  placeholder="Tell me about your experience working with me..."
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="group mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#092f58] px-5 font-inter text-sm font-bold text-white transition hover:bg-[#0f3d6e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <LoaderCircle className="animate-spin" size={16} />
                  Sending...
                </>
              ) : (
                <>
                  Send Feedback
                  <Send
                    size={16}
                    className="transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>

            {notice && (
              <p
                role="status"
                className={`mt-4 rounded-xl px-3 py-2 text-sm ${
                  status === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {notice}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
