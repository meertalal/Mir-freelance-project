import { useCallback, useEffect, useState } from "react";
import { Check, Trash2, X } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import { ApiError } from "../api/client";
import { deleteFeedback, listFeedback, updateFeedbackStatus, type AdminFeedback } from "../api/feedback";
import { adminCardClass, adminDangerButtonClass, adminHeadingClass, adminSecondaryButtonClass, adminSubheadingClass } from "../admin.styles";

const statuses = ["all", "new", "reviewed", "approved", "rejected"] as const;
export default function AdminFeedbackPage() {
  const { token, admin } = useAdminAuth();
  const [items, setItems] = useState<AdminFeedback[]>([]);
  const [filter, setFilter] = useState<(typeof statuses)[number]>("new");
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const refresh = useCallback(() => {
    if (!token) return;
    listFeedback(token, filter === "all" ? undefined : filter).then((result) => { setItems(result.data); setCounts(result.meta.status_counts); })
      .catch((cause) => setError(cause instanceof ApiError ? cause.message : "Could not load feedback."))
      .finally(() => setLoading(false));
  }, [token, filter]);
  useEffect(() => { setLoading(true); refresh(); }, [refresh]);
  const moderate = async (item: AdminFeedback, status: AdminFeedback["status"]) => {
    if (!token || !admin) return;
    const notes = status === "reviewed" ? window.prompt("Add a note before marking this feedback reviewed:", item.notes) : item.notes;
    if (status === "reviewed" && !notes?.trim()) return;
    setWorking(item.id); setError(""); setNotice("");
    try {
      const result = await updateFeedbackStatus(token, item.id, status, admin.id, notes ?? "");
      setItems((current) => current.map((entry) => entry.id === item.id ? result.data : entry));
      setNotice(`Feedback ${status}.`); refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update feedback."); }
    finally { setWorking(null); }
  };
  const remove = async (item: AdminFeedback) => {
    if (!token || !window.confirm(`Delete feedback from ${item.author}?`)) return;
    try { await deleteFeedback(token, item.id); setItems((current) => current.filter((entry) => entry.id !== item.id)); setNotice("Feedback deleted."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete feedback."); }
  };
  return <div>
    <h1 className={adminHeadingClass}>Feedback moderation</h1><p className={adminSubheadingClass}>Review feedback submissions before they appear on the website.</p>
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{(["new", "reviewed", "approved", "rejected"] as const).map((status) => <div key={status} className={`${adminCardClass} p-4`}><p className="text-2xl font-bold text-[#102B4E]">{counts[status] ?? 0}</p><p className="mt-1 text-xs capitalize text-slate-500">{status}</p></div>)}</div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}{notice && <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}
    <div className="mt-5 flex flex-wrap gap-2">{statuses.map((status) => <button key={status} type="button" onClick={() => setFilter(status)} className={`rounded-full px-3.5 py-2 text-xs font-semibold capitalize transition ${filter === status ? "bg-[#0B3A6B] text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-[#F3F8FF]"}`}>{status}{status !== "all" ? ` ${counts[status] ?? 0}` : ""}</button>)}</div>
    <div className={`${adminCardClass} mt-4 overflow-hidden`}>
      {loading && <p className="px-5 py-7 text-sm text-slate-500">Loading feedback…</p>}
      {!loading && items.length === 0 && <p className="px-5 py-12 text-center text-sm text-slate-500">No feedback in this section.</p>}
      {!loading && items.length > 0 && <ul className="divide-y divide-slate-100">{items.map((item) => <li key={item.id} className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-[#102B4E]">{item.author}</p><span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-[11px] font-semibold capitalize text-[#0B5BC4]">{item.status}</span><span aria-label={`${item.rating} out of 5 stars`} className="text-xs font-semibold text-amber-600">★ {item.rating}/5</span></div><p className="mt-0.5 text-xs text-slate-500">{[item.role, item.company, item.email, item.service_title].filter(Boolean).join(" · ")} · {new Date(item.created_at).toLocaleDateString()}</p></div><span className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs text-slate-500">{item.source.replaceAll("_", " ")}</span></div><p className="mt-4 max-w-4xl whitespace-pre-wrap text-sm leading-6 text-slate-700">“{item.message}”</p>{item.notes && <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">Review note: {item.notes}</p>}<div className="mt-4 flex flex-wrap gap-2">{item.status !== "approved" && <button disabled={working === item.id} onClick={() => moderate(item, "approved")} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-600 px-3.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"><Check size={15} />Approve</button>}{item.status !== "rejected" && <button disabled={working === item.id} onClick={() => moderate(item, "rejected")} className={adminDangerButtonClass}><X size={15} />Reject</button>}{item.status === "new" && <button disabled={working === item.id} onClick={() => moderate(item, "reviewed")} className={adminSecondaryButtonClass}>Mark reviewed</button>}<button onClick={() => remove(item)} className={adminSecondaryButtonClass}><Trash2 size={15} />Delete</button></div></li>)}</ul>}
    </div>
  </div>;
}
