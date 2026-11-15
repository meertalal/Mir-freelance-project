import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import {
  listSubmissions,
  type SubmissionListResult,
  type SubmissionStatus,
} from "../api/submissions";
import { ApiError } from "../api/client";
import StatusBadge from "../components/StatusBadge";
import {
  adminCardClass,
  adminFieldClass,
  adminHeadingClass,
  adminSecondaryButtonClass,
  adminSubheadingClass,
} from "../admin.styles";

const statuses: SubmissionStatus[] = ["new", "read", "archived"];

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminSubmissionsPage() {
  const { token } = useAdminAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStatus = searchParams.get("status");
  const status = statuses.includes(rawStatus as SubmissionStatus)
    ? (rawStatus as SubmissionStatus)
    : null;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const search = searchParams.get("q") ?? "";
  const [searchInput, setSearchInput] = useState(search);

  const [data, setData] = useState<SubmissionListResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    listSubmissions(token, { page, perPage: 20, status, search })
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((cause) => {
        if (!cancelled) {
          setError(
            cause instanceof ApiError ? cause.message : "Could not load messages.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, page, status, search]);

  useEffect(() => {
    const trimmed = searchInput.trim();

    if (trimmed === search) return;

    const timer = window.setTimeout(() => {
      setSearchParams(
        (previous) => {
          const params = new URLSearchParams(previous);

          if (trimmed !== "") {
            params.set("q", trimmed);
          } else {
            params.delete("q");
          }

          params.delete("page");

          return params;
        },
        { replace: true },
      );
    }, 350);

    return () => window.clearTimeout(timer);
  }, [searchInput, search, setSearchParams]);

  const setStatus = (next: SubmissionStatus | null) => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams(searchParams);
    if (next) params.set("status", next);
    else params.delete("status");
    params.delete("page");
    setSearchParams(params);
  };

  const goToPage = (next: number) => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams(searchParams);
    if (next <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(next));
    }
    setSearchParams(params);
  };

  const counts = data?.meta.counts;
  const total = data?.meta.total ?? 0;
  const pages = data?.meta.pages ?? 0;

  return (
    <div>
      <h1 className={adminHeadingClass}>Messages</h1>
      <p className={adminSubheadingClass}>
        Every inquiry sent through the website contact form.
      </p>

      <div className="relative mt-5 max-w-md">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search name, email, company or message"
          aria-label="Search messages"
          className={`${adminFieldClass} pr-10 pl-10`}
        />
        {searchInput !== "" && (
          <button
            type="button"
            onClick={() => setSearchInput("")}
            aria-label="Clear search"
            className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatus(null)}
          className={`rounded-full px-3.5 py-2 font-inter text-sm font-semibold transition ${
            status === null
              ? "bg-[#092F58] text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
          }`}
        >
          All
          {counts && (
            <span className="ml-1.5 opacity-70">
              {counts.new + counts.read + counts.archived}
            </span>
          )}
        </button>

        {statuses.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setStatus(value)}
            className={`rounded-full px-3.5 py-2 font-inter text-sm font-semibold capitalize transition ${
              status === value
                ? "bg-[#092F58] text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {value}
            {counts && <span className="ml-1.5 opacity-70">{counts[value]}</span>}
          </button>
        ))}
      </div>

      <div className={`${adminCardClass} mt-5 overflow-hidden`}>
        {loading && (
          <p className="px-5 py-6 font-inter text-sm text-slate-500">Loading...</p>
        )}

        {!loading && error && (
          <p className="px-5 py-6 font-inter text-sm text-rose-700">{error}</p>
        )}

        {!loading && !error && data && data.data.length === 0 && (
          <p className="px-5 py-6 font-inter text-sm text-slate-500">
            No messages in this view.
          </p>
        )}

        {!loading && !error && data && data.data.length > 0 && (
          <ul className="divide-y divide-slate-100">
            {data.data.map((submission) => (
              <li key={submission.id}>
                <Link
                  to={`/admin/submissions/${submission.id}`}
                  className="grid gap-2 px-5 py-4 transition hover:bg-slate-50 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto_auto] sm:items-center sm:gap-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-inter text-sm font-semibold text-[#10234B]">
                      {submission.full_name}
                    </p>
                    <p className="truncate font-inter text-xs text-slate-500">
                      {submission.email}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-inter text-sm text-slate-700">
                      {submission.project_type}
                    </p>
                    <p className="font-inter text-xs text-slate-500">
                      {submission.budget_range || "No budget given"}
                    </p>
                  </div>

                  <p className="truncate font-inter text-xs text-slate-500">
                    {submission.country || "Country not given"}
                  </p>

                  <p className="font-inter text-xs text-slate-500">
                    {formatDate(submission.created_at)}
                  </p>

                  <StatusBadge status={submission.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!loading && !error && pages > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-inter text-sm text-slate-500">
            Page {page} of {pages} · {total} message{total === 1 ? "" : "s"}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className={adminSecondaryButtonClass}
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page >= pages}
              className={adminSecondaryButtonClass}
            >
              Next
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
