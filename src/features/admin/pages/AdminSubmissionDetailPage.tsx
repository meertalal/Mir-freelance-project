import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Trash2 } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import {
  deleteSubmission,
  getSubmission,
  updateSubmissionStatus,
  type ContactSubmission,
  type SubmissionStatus,
} from "../api/submissions";
import { ApiError } from "../api/client";
import StatusBadge from "../components/StatusBadge";
import {
  adminCardClass,
  adminDangerButtonClass,
  adminHeadingClass,
  adminSecondaryButtonClass,
} from "../admin.styles";

const statuses: SubmissionStatus[] = ["new", "read", "archived"];

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <dt className="font-inter text-xs font-semibold tracking-wide text-slate-500 uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-inter text-sm break-words text-slate-800">
        {value && value !== "" ? value : "—"}
      </dd>
    </div>
  );
}

export default function AdminSubmissionDetailPage() {
  const { token, signOut } = useAdminAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!token || !id) return;

    let cancelled = false;

    getSubmission(token, Number(id))
      .then((result) => {
        if (!cancelled) setSubmission(result.data);
      })
      .catch((cause) => {
        if (!cancelled) {
          if (cause instanceof ApiError && cause.status === 401) {
            signOut();
            return;
          }

          setError(
            cause instanceof ApiError ? cause.message : "Could not load the message.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, id, signOut]);

  const changeStatus = async (status: SubmissionStatus) => {
    if (!token || !submission) return;

    setWorking(true);
    setActionError("");

    try {
      const result = await updateSubmissionStatus(token, submission.id, status);
      setSubmission(result.data);
    } catch (cause) {
      setActionError(
        cause instanceof ApiError ? cause.message : "Could not update the message.",
      );
    } finally {
      setWorking(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !submission) return;
    if (!window.confirm("Delete this message? This cannot be undone from here.")) {
      return;
    }

    setWorking(true);
    setActionError("");

    try {
      await deleteSubmission(token, submission.id);
      navigate("/admin/submissions", { replace: true });
    } catch (cause) {
      setActionError(
        cause instanceof ApiError ? cause.message : "Could not delete the message.",
      );
      setWorking(false);
    }
  };

  if (loading) {
    return <p className="font-inter text-sm text-slate-500">Loading...</p>;
  }

  if (error || !submission) {
    return (
      <div>
        <p className="font-inter text-sm text-rose-700">
          {error || "Message not found."}
        </p>
        <Link
          to="/admin/submissions"
          className={`${adminSecondaryButtonClass} mt-4`}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to messages
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/admin/submissions"
        className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-slate-500 hover:text-[#1670F5]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to messages
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={adminHeadingClass}>{submission.full_name}</h1>
          <p className="mt-1 font-inter text-sm text-slate-500">
            {submission.project_type} · received {formatDate(submission.created_at)}
          </p>
        </div>
        <StatusBadge status={submission.status} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={`mailto:${submission.email}?subject=${encodeURIComponent(
            `Re: ${submission.subject || "Your project inquiry"}`,
          )}`}
          className={adminSecondaryButtonClass}
        >
          <Mail size={16} aria-hidden="true" />
          Reply by email
        </a>

        {statuses
          .filter((value) => value !== submission.status)
          .map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => changeStatus(value)}
              disabled={working}
              className={adminSecondaryButtonClass}
            >
              Mark as {value}
            </button>
          ))}

        <button
          type="button"
          onClick={handleDelete}
          disabled={working}
          className={adminDangerButtonClass}
        >
          <Trash2 size={16} aria-hidden="true" />
          Delete
        </button>
      </div>

      {actionError && (
        <p className="mt-4 rounded-xl bg-rose-50 px-3 py-2 font-inter text-sm text-rose-700">
          {actionError}
        </p>
      )}

      <section className={`${adminCardClass} mt-5 p-5 sm:p-6`}>
        <h2 className="font-montserrat text-base font-bold text-[#10234B]">
          Message
        </h2>
        <p className="mt-3 font-inter text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
          {submission.message}
        </p>
      </section>

      <section className={`${adminCardClass} mt-5 p-5 sm:p-6`}>
        <h2 className="font-montserrat text-base font-bold text-[#10234B]">
          Details
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <DetailRow label="Email" value={submission.email} />
          <DetailRow
            label="Phone"
            value={`${submission.country_phone} ${submission.phone}`.trim()}
          />
          <DetailRow label="Company" value={submission.company} />
          <DetailRow label="Designation" value={submission.designation} />
          <DetailRow label="Project type" value={submission.project_type} />
          <DetailRow label="Budget" value={submission.budget_range} />
          <DetailRow label="Country" value={submission.country} />
          <DetailRow label="Subject" value={submission.subject} />
          <DetailRow label="IP address" value={submission.ip_address} />
          <DetailRow label="Browser" value={submission.user_agent} />
          <DetailRow label="Last updated" value={formatDate(submission.updated_at)} />
        </dl>
      </section>
    </div>
  );
}
