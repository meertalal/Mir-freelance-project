import { useCallback, useEffect, useState } from "react";
import { DatabaseBackup, LoaderCircle, RefreshCw } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import { ApiError } from "../api/client";
import { downloadBackup, getAuditLog, type AuditEntry } from "../api/tools";
import { adminCardClass, adminHeadingClass, adminPrimaryButtonClass, adminSecondaryButtonClass, adminSubheadingClass } from "../admin.styles";

export default function AdminSystemPage() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const refresh = useCallback(() => { if (!token) return; getAuditLog(token).then((result) => setItems(result.data)).catch((e) => setError(e instanceof ApiError ? e.message : "Could not load audit log.")).finally(() => setLoading(false)); }, [token]);
  useEffect(() => { refresh(); }, [refresh]);
  const backup = async () => { if (!token) return; setBusy(true); setError(""); setNotice(""); try { await downloadBackup(token); setNotice("Backup downloaded. Store it somewhere secure."); refresh(); } catch (e) { setError(e instanceof Error ? e.message : "Could not create backup."); } finally { setBusy(false); } };
  return <div>
    <h1 className={adminHeadingClass}>Backup & activity</h1><p className={adminSubheadingClass}>Download a database snapshot and review recent admin changes.</p>
    {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}{notice && <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}
    <section className={`${adminCardClass} mt-5 flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6`}><div className="flex items-start gap-3"><span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#0B5BC4]"><DatabaseBackup size={20}/></span><div><h2 className="font-montserrat font-bold text-[#102B4E]">Create a backup</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Download a JSON snapshot of database content, settings, inquiries, feedback, and admin records. Uploaded image files are not included. The file contains private information; store it securely.</p></div></div><button type="button" disabled={busy} onClick={backup} className={adminPrimaryButtonClass}>{busy ? <LoaderCircle className="animate-spin" size={16}/> : <DatabaseBackup size={16}/>}Download backup</button></section>
    <section className={`${adminCardClass} mt-5 overflow-hidden`}><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="font-montserrat font-bold text-[#102B4E]">Audit log</h2><p className="mt-1 text-xs text-slate-500">Admin updates, deletes, and backup downloads.</p></div><button type="button" onClick={() => { setLoading(true); refresh(); }} className={adminSecondaryButtonClass}><RefreshCw size={14}/>Refresh</button></div>{loading && <p className="px-5 py-7 text-sm text-slate-500">Loading activity…</p>}{!loading && items.length === 0 && <p className="px-5 py-10 text-center text-sm text-slate-500">No activity has been recorded yet.</p>}{!loading && items.length > 0 && <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead className="bg-[#F7FAFE] text-[11px] uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-3">Admin</th><th className="px-5 py-3">Action</th><th className="px-5 py-3">Route</th><th className="px-5 py-3">Result</th><th className="px-5 py-3">Date</th></tr></thead><tbody className="divide-y divide-slate-100">{items.map((item) => <tr key={item.id} className="text-xs text-slate-600"><td className="px-5 py-3 font-semibold text-[#244563]">{item.admin_email}</td><td className="px-5 py-3 font-mono">{item.method}</td><td className="max-w-[250px] truncate px-5 py-3 font-mono" title={item.path}>{item.path}</td><td className="px-5 py-3">{item.status_code}</td><td className="whitespace-nowrap px-5 py-3">{new Date(item.created_at).toLocaleString()}</td></tr>)}</tbody></table></div>}</section>
  </div>;
}
