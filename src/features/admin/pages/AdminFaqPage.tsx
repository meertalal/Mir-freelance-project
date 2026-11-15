import { useCallback, useEffect, useState, type FormEvent } from "react";
import { GripVertical, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { homeFaqs } from "../../home/data/faq.data";
import { faqCategories } from "../../faq/data/faq-page.data";
import { ApiError } from "../api/client";
import { createFaq, deleteFaq, listFaqs, reorderFaqs, updateFaq, type FaqEntry } from "../api/tools";
import { useAdminAuth } from "../context/adminAuth";
import { adminCardClass, adminDangerButtonClass, adminFieldClass, adminHeadingClass, adminLabelClass, adminPrimaryButtonClass, adminSecondaryButtonClass, adminSubheadingClass } from "../admin.styles";

const blank: Omit<FaqEntry, "id"> = { category: "General", question: "", answer: "", sort_order: 0, is_published: true };
export default function AdminFaqPage() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<FaqEntry[]>([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dragId, setDragId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const refresh = useCallback(() => { if (!token) return; listFaqs(token).then((r) => setItems(r.data)).catch((e) => setError(e instanceof ApiError ? e.message : "Could not load FAQs.")).finally(() => setLoading(false)); }, [token]);
  useEffect(() => { refresh(); }, [refresh]);
  const startEdit = (item: FaqEntry) => { setEditing(item.id); setForm({ category: item.category, question: item.question, answer: item.answer, sort_order: item.sort_order, is_published: item.is_published }); setFormOpen(true); setError(""); setNotice(""); };
  const save = async (event: FormEvent) => { event.preventDefault(); if (!token) return; setSaving(true); setError(""); try { const result = editing === null ? await createFaq(token, form) : await updateFaq(token, editing, form); setItems((current) => editing === null ? [...current, result.data] : current.map((item) => item.id === editing ? result.data : item)); setNotice("FAQ saved."); setFormOpen(false); setForm(blank); setEditing(null); } catch (e) { setError(e instanceof Error ? e.message : "Could not save FAQ."); } finally { setSaving(false); } };
  const remove = async (item: FaqEntry) => { if (!token || !window.confirm("Delete this FAQ?")) return; try { await deleteFaq(token, item.id); setItems((current) => current.filter((entry) => entry.id !== item.id)); setNotice("FAQ deleted."); } catch (e) { setError(e instanceof Error ? e.message : "Could not delete FAQ."); } };
  const importCurrent = async () => {
    if (!token) return;
    const rows: Omit<FaqEntry, "id">[] = [
      ...homeFaqs.map((item, i) => ({ ...blank, category: "Home", question: item.question, answer: item.answer, sort_order: (i + 1) * 10 })),
      ...faqCategories.flatMap((category) => category.items.map((item, i) => ({ ...blank, category: category.title, question: item.question, answer: item.answer, sort_order: (i + 1) * 10 }))),
    ];
    const unique = [...new Map(rows.map((row) => [`${row.category.toLowerCase()}|${row.question.toLowerCase()}`, row])).values()];
    setSaving(true); setError("");
    try { const created: FaqEntry[] = []; for (const row of unique) created.push((await createFaq(token, row)).data); setItems(created); setNotice(`Imported ${created.length} existing questions.`); }
    catch (e) { setError(e instanceof Error ? `${e.message} Import may be partial; review the list before retrying.` : "Could not import FAQs."); refresh(); }
    finally { setSaving(false); }
  };
  const reorder = (targetId: number) => { if (dragId === null || dragId === targetId) return; setItems((current) => { const next = [...current]; const from = next.findIndex((item) => item.id === dragId); const to = next.findIndex((item) => item.id === targetId); const [moved] = next.splice(from, 1); next.splice(to, 0, moved); return next.map((item, i) => ({ ...item, sort_order: (i + 1) * 10 })); }); };
  const saveOrder = async () => { if (!token) return; try { await reorderFaqs(token, items.map(({ id }) => ({ id }))); setNotice("FAQ order saved."); } catch (e) { setError(e instanceof Error ? e.message : "Could not save order."); } };

  return <div>
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className={adminHeadingClass}>FAQ editor</h1><p className={adminSubheadingClass}>Manage questions on the home page and FAQ page.</p></div><div className="flex gap-2">{items.length > 1 && <button type="button" onClick={saveOrder} className={adminSecondaryButtonClass}>Save order</button>}<button type="button" onClick={() => { setEditing(null); setForm(blank); setFormOpen(true); }} className={adminPrimaryButtonClass}><Plus size={16}/>Add FAQ</button></div></div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}{notice && <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}
    {formOpen && <form onSubmit={save} className={`${adminCardClass} mt-5 p-5 sm:p-6`}><div className="grid gap-4 sm:grid-cols-2"><label><span className={adminLabelClass}>Category *</span><input required maxLength={120} className={adminFieldClass} value={form.category} onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))} placeholder="Home, Pricing, Support…"/></label><label><span className={adminLabelClass}>Question *</span><input required maxLength={500} className={adminFieldClass} value={form.question} onChange={(e) => setForm((c) => ({ ...c, question: e.target.value }))}/></label><label className="sm:col-span-2"><span className={adminLabelClass}>Answer *</span><textarea required className={`${adminFieldClass} min-h-28 resize-y`} value={form.answer} onChange={(e) => setForm((c) => ({ ...c, answer: e.target.value }))}/></label><label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm((c) => ({ ...c, is_published: e.target.checked }))}/>Published on the website</label></div><div className="mt-4 flex gap-2"><button disabled={saving} className={adminPrimaryButtonClass}>{saving && <LoaderCircle size={16} className="animate-spin"/>}Save FAQ</button><button type="button" onClick={() => setFormOpen(false)} className={adminSecondaryButtonClass}>Cancel</button></div></form>}
    <div className={`${adminCardClass} mt-5 overflow-hidden`}>
      {loading && <p className="px-5 py-7 text-sm text-slate-500">Loading FAQs…</p>}
      {!loading && items.length === 0 && <div className="px-5 py-10 text-center"><p className="font-semibold text-[#17375E]">No FAQ records yet</p><p className="mt-1 text-sm text-slate-500">Import the existing site questions as a starting point.</p><button disabled={saving} type="button" onClick={importCurrent} className={`${adminPrimaryButtonClass} mt-4`}>{saving && <LoaderCircle size={16} className="animate-spin"/>}Import existing FAQs</button></div>}
      {!loading && items.length > 0 && <ul className="divide-y divide-slate-100">{items.map((item) => <li key={item.id} draggable onDragStart={() => setDragId(item.id)} onDragOver={(e) => e.preventDefault()} onDrop={() => reorder(item.id)} onDragEnd={() => setDragId(null)} className={`flex items-start gap-3 px-4 py-4 sm:px-5 ${dragId === item.id ? "opacity-40" : ""}`}><GripVertical size={18} className="mt-1 shrink-0 cursor-grab text-slate-300"/><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-[11px] font-semibold text-[#0B5BC4]">{item.category}</span>{!item.is_published && <span className="text-xs text-amber-600">Draft</span>}</div><p className="mt-2 font-semibold text-[#17375E]">{item.question}</p><p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.answer}</p></div><div className="flex gap-2"><button onClick={() => startEdit(item)} className={adminSecondaryButtonClass}>Edit</button><button onClick={() => remove(item)} className={adminDangerButtonClass}><Trash2 size={14}/></button></div></li>)}</ul>}
    </div>
  </div>;
}
