import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Inbox, MailOpen, Archive } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import {
  listSubmissions,
  type SubmissionListResult,
} from "../api/submissions";
import { ApiError } from "../api/client";
import StatusBadge from "../components/StatusBadge";
import { getInsights } from "../api/tools";
import {
  adminCardClass,
  adminHeadingClass,
  adminSubheadingClass,
} from "../admin.styles";

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminDashboardPage() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<SubmissionListResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<Awaited<ReturnType<typeof getInsights>>["data"] | null>(null);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    Promise.all([listSubmissions(token, { page: 1, perPage: 5 }), getInsights(token)])
      .then(([result, insightResult]) => {
        if (!cancelled) setData(result);
        if (!cancelled) setInsights(insightResult.data);
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
  }, [token]);

  const counts = data?.meta.counts ?? { new: 0, read: 0, archived: 0 };
  const cards = [
    {
      label: "New messages",
      value: counts.new,
      icon: Inbox,
      accent: "bg-[#EAF2FF] text-[#0B5BC4]",
      href: "/admin/submissions?status=new",
    },
    {
      label: "Read",
      value: counts.read,
      icon: MailOpen,
      accent: "bg-emerald-50 text-emerald-700",
      href: "/admin/submissions?status=read",
    },
    {
      label: "Archived",
      value: counts.archived,
      icon: Archive,
      accent: "bg-slate-100 text-slate-600",
      href: "/admin/submissions?status=archived",
    },
  ];

  return (
    <div>
      <h1 className={adminHeadingClass}>Overview</h1>
      <p className={adminSubheadingClass}>
        A quick look at what arrived through the contact form.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.label}
              to={card.href}
              className={`${adminCardClass} block p-5 transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.accent}`}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <p className="mt-3 font-montserrat text-2xl font-bold text-[#10234B]">
                {card.value}
              </p>
              <p className="font-inter text-sm text-slate-500">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <section className={`${adminCardClass} p-5 sm:p-6`}>
          <div className="flex items-start justify-between gap-3"><div><h2 className="font-montserrat text-base font-bold text-[#10234B]">Inquiry trends</h2><p className="mt-1 text-xs text-slate-500">Contact form submissions over the last six months.</p></div><span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-[11px] font-semibold text-[#0B5BC4]">6 months</span></div>
          <div className="mt-6 grid h-44 grid-cols-6 items-end gap-3 sm:gap-5">
            {(insights?.trend ?? []).map((entry) => {
              const max = Math.max(1, ...(insights?.trend.map((row) => row.count) ?? [1]));
              const height = Math.max(8, Math.round((entry.count / max) * 100));
              return <div key={entry.month} className="flex h-full flex-col items-center justify-end gap-2"><span className="text-[11px] font-semibold text-[#244563]">{entry.count}</span><div className="flex h-[110px] w-full items-end"><div className="w-full rounded-t-lg bg-gradient-to-t from-[#0B3A6B] to-[#2B7CFF] transition-all" style={{ height: `${height}%` }} /></div><span className="text-center text-[10px] text-slate-400">{entry.month.split(" ")[0]}</span></div>;
            })}
          </div>
        </section>
        <section className={`${adminCardClass} p-5 sm:p-6`}><h2 className="font-montserrat text-base font-bold text-[#10234B]">Content at a glance</h2><p className="mt-1 text-xs text-slate-500">Records currently stored in the CMS.</p><div className="mt-4 grid grid-cols-2 gap-2">{Object.entries(insights?.content ?? {}).map(([key, value]) => <div key={key} className="rounded-xl bg-[#F7FAFE] px-3 py-3"><p className="font-montserrat text-xl font-bold text-[#102B4E]">{value}</p><p className="mt-0.5 text-[11px] capitalize text-slate-500">{key.replaceAll("_", " ")}</p></div>)}</div></section>
      </div>

      <div className={`${adminCardClass} mt-6 overflow-hidden`}>
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <h2 className="font-montserrat text-base font-bold text-[#10234B]">
            Latest messages
          </h2>
          <Link
            to="/admin/submissions"
            className="inline-flex items-center gap-1 font-inter text-sm font-semibold text-[#1670F5] hover:underline"
          >
            View all
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {loading && (
          <p className="px-5 py-6 font-inter text-sm text-slate-500">Loading...</p>
        )}

        {!loading && error && (
          <p className="px-5 py-6 font-inter text-sm text-rose-700">{error}</p>
        )}

        {!loading && !error && data && data.data.length === 0 && (
          <p className="px-5 py-6 font-inter text-sm text-slate-500">
            No messages yet. New inquiries will show up here.
          </p>
        )}

        {!loading && !error && data && data.data.length > 0 && (
          <ul className="divide-y divide-slate-100">
            {data.data.map((submission) => (
              <li key={submission.id}>
                <Link
                  to={`/admin/submissions/${submission.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate font-inter text-sm font-semibold text-[#10234B]">
                      {submission.full_name}
                      <span className="ml-2 font-normal text-slate-500">
                        {submission.project_type}
                      </span>
                    </p>
                    <p className="mt-0.5 truncate font-inter text-xs text-slate-500">
                      {submission.email} · {formatDate(submission.created_at)}
                    </p>
                  </div>
                  <StatusBadge status={submission.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <section className={`${adminCardClass} mt-5 overflow-hidden`}><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-montserrat text-base font-bold text-[#10234B]">Recent admin activity</h2><p className="mt-1 text-xs text-slate-500">Changes made in this admin workspace.</p></div>{insights?.recent_activity.length ? <ul className="divide-y divide-slate-100">{insights.recent_activity.slice(0, 6).map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3"><div><p className="text-xs font-semibold text-[#244563]">{item.admin_email}<span className="ml-2 font-mono font-normal text-slate-400">{item.method}</span></p><p className="mt-0.5 text-xs text-slate-500">{item.path}</p></div><span className="text-[11px] text-slate-400">{formatDate(item.created_at)}</span></li>)}</ul> : <p className="px-5 py-6 text-sm text-slate-500">No recorded changes yet.</p>}</section>
    </div>
  );
}
