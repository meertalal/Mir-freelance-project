import { useCallback, useEffect, useState, type FormEvent } from "react";
import { GripVertical, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import ImageUploadField from "../components/ImageUploadField";
import usePendingImageUploads from "../hooks/usePendingImageUploads";
import { ApiError } from "../api/client";
import { saveContentOrder } from "../api/tools";
import { moveItem } from "../utils/order";
import {
  createBlogPost, createCaseStudy, deleteBlogPost, deleteCaseStudy,
  listBlogPosts, listCaseStudies, updateBlogPost, updateCaseStudy,
  type AdminBlogPost, type AdminCaseStudy, type BlogPostInput, type CaseStudyInput,
} from "../api/content";
import { adminCardClass, adminDangerButtonClass, adminFieldClass, adminHeadingClass, adminLabelClass, adminPrimaryButtonClass, adminSecondaryButtonClass, adminSubheadingClass } from "../admin.styles";

type Mode = "portfolio" | "blog";
type RecordItem = AdminCaseStudy | AdminBlogPost;
const contentErrorMessage = (cause: unknown, fallback: string) => {
  if (cause instanceof ApiError && cause.status === 500) {
    return `${cause.message} If this is the live InfinityFree site, verify blog_posts and case_studies exist. If missing, import docs/infinityfree-content-module-upgrade.sql in phpMyAdmin; deployments do not run database migrations.`;
  }
  return cause instanceof Error ? cause.message : fallback;
};

const blankCase: CaseStudyInput = { slug: "", title: "", excerpt: "", cover_image: "", cover_image_alt: "", body: "", project_type: "Web application", status: "draft", is_published: false, sort_order: 0, client_company: "", client_name: "", client_role: "", client_website: "", challenge: "", solution: "", results: "" };
const blankBlog: BlogPostInput = { slug: "", title: "", excerpt: "", cover_image: "", cover_image_alt: "", body: "", category: "Insights", status: "draft", is_published: false, sort_order: 0, author_name: "", author_role: "", author_avatar: "", meta_title: "", meta_description: "", meta_keywords: "" };

export default function AdminEditorialPage({ mode }: { mode: Mode }) {
  const { token } = useAdminAuth();
  const isBlog = mode === "blog";
  const [items, setItems] = useState<RecordItem[]>([]);
  const [form, setForm] = useState<CaseStudyInput | BlogPostInput>(isBlog ? blankBlog : blankCase);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formGeneration, setFormGeneration] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dragId, setDragId] = useState<number | null>(null);
  const [orderSaving, setOrderSaving] = useState(false);
  const { hasPending, onPendingChange } = usePendingImageUploads();
  const uploadContextId = `${mode}:${editingId ?? "new"}:${formGeneration}`;
  const imageUploadPending = hasPending(uploadContextId);

  const refresh = useCallback(() => {
    if (!token) return;
    (isBlog ? listBlogPosts(token) : listCaseStudies(token))
      .then((result) => setItems(result.data))
      .catch((cause) => setError(contentErrorMessage(cause, "Could not load content.")))
      .finally(() => setLoading(false));
  }, [token, isBlog]);
  useEffect(() => { refresh(); }, [refresh]);

  const beginCreate = () => { setFormGeneration((generation) => generation + 1); setEditingId(null); setForm(isBlog ? blankBlog : blankCase); setFormOpen(true); setError(""); setNotice(""); };
  const beginEdit = (item: RecordItem) => {
    setFormGeneration((generation) => generation + 1);
    setEditingId(item.id);
    if (isBlog) {
      const post = item as AdminBlogPost;
      const input = { ...post };
      delete (input as Partial<AdminBlogPost>).id;
      setForm(input);
    } else {
      const project = item as AdminCaseStudy;
      const input = { ...project };
      delete (input as Partial<AdminCaseStudy>).id;
      setForm(input);
    }
    setFormOpen(true); setError(""); setNotice("");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault(); if (!token) return;
    if (imageUploadPending) { setError("Wait for the image upload to finish before saving."); return; }
    setSaving(true); setError(""); setNotice("");
    try {
      let saved: RecordItem;
      if (isBlog) saved = (editingId === null ? await createBlogPost(token, form as BlogPostInput) : await updateBlogPost(token, editingId, form as BlogPostInput)).data;
      else saved = (editingId === null ? await createCaseStudy(token, form as CaseStudyInput) : await updateCaseStudy(token, editingId, form as CaseStudyInput)).data;
      setItems((current) => editingId === null ? [saved, ...current] : current.map((item) => item.id === editingId ? saved : item));
      setNotice(`${isBlog ? "Blog post" : "Case study"} saved.`); setFormOpen(false);
    } catch (cause) { setError(contentErrorMessage(cause, "Could not save content.")); }
    finally { setSaving(false); }
  };

  const remove = async (item: RecordItem) => {
    if (!token || !window.confirm(`Delete “${item.title}”?`)) return;
    try {
      if (isBlog) await deleteBlogPost(token, item.id); else await deleteCaseStudy(token, item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id)); setNotice("Content deleted.");
    } catch (cause) { setError(contentErrorMessage(cause, "Could not delete content.")); }
  };

  const saveOrder = async () => {
    if (!token || isBlog) return;
    setOrderSaving(true);
    try { await saveContentOrder(token, "portfolio", items.map((item) => item.id)); setNotice("Portfolio order saved."); }
    catch (cause) { setError(contentErrorMessage(cause, "Could not save project order.")); }
    finally { setOrderSaving(false); }
  };

  const updateField = (key: string, value: string) => {
    setForm((current) => ({ ...current, [key]: value }) as CaseStudyInput | BlogPostInput);
  };

  const field = (key: string, label: string, options: { area?: boolean; required?: boolean; wide?: boolean; hint?: string } = {}) => (
    <label key={key} className={`block ${options.wide ? "sm:col-span-2" : ""}`}>
      <span className={adminLabelClass}>{label}{options.required ? " *" : ""}</span>
      {options.area ? <textarea required={options.required} value={String((form as unknown as Record<string, unknown>)[key] ?? "")} onChange={(e) => updateField(key, e.target.value)} className={`${adminFieldClass} min-h-28 resize-y`} placeholder={options.hint} /> : <input required={options.required} value={String((form as unknown as Record<string, unknown>)[key] ?? "")} onChange={(e) => updateField(key, e.target.value)} className={adminFieldClass} placeholder={options.hint} />}
    </label>
  );
  const imageField = (key: "cover_image" | "author_avatar", label: string, uploadableType: "blog_post" | "case_study") => (
    <ImageUploadField
      key={`${uploadContextId}:${key}`}
      label={label}
      value={String((form as unknown as Record<string, unknown>)[key] ?? "")}
      onChange={(value) => updateField(key, value)}
      uploadableType={uploadableType}
      uploadContextId={uploadContextId}
      uploadFieldId={key}
      onPendingChange={onPendingChange}
    />
  );

  return <div>
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className={adminHeadingClass}>{isBlog ? "Blog" : "Portfolio"}</h1><p className={adminSubheadingClass}>{isBlog ? "Write, edit, and publish articles." : "Manage the projects and case studies on your portfolio."}</p></div><div className="flex gap-2">{!isBlog && items.length > 1 && <button type="button" disabled={orderSaving} onClick={saveOrder} className={adminSecondaryButtonClass}>{orderSaving ? "Saving…" : "Save order"}</button>}<button type="button" onClick={beginCreate} className={adminPrimaryButtonClass}><Plus size={16} />{isBlog ? "New post" : "New case study"}</button></div></div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}{notice && <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}
    {formOpen && <form onSubmit={submit} className={`${adminCardClass} mt-5 p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-3"><div><h2 className="font-montserrat text-lg font-bold text-[#102B4E]">{editingId === null ? "Create" : "Edit"} {isBlog ? "blog post" : "case study"}</h2><p className="mt-1 text-xs text-slate-500">Long text is stored as plain text and shown in the content detail page.</p></div><button type="button" onClick={() => setFormOpen(false)} className={adminSecondaryButtonClass}>Close</button></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {field("title", "Title", { required: true })}{field("slug", "URL slug", { hint: "Generated from title when empty" })}
        {field(isBlog ? "category" : "project_type", isBlog ? "Category" : "Project type", { required: true })}{imageField("cover_image", "Cover image path", isBlog ? "blog_post" : "case_study")}
        {field("cover_image_alt", "Cover image alt text")}{field("excerpt", "Short summary", { area: true, wide: true })}
        {field("body", "Full content", { area: true, required: true, wide: true, hint: "Write at least 20 characters." })}
        {!isBlog && <>{field("client_name", "Client name")}{field("client_company", "Client company")}{field("client_role", "Client role")}{field("client_website", "Client website URL")}{field("challenge", "Challenge", { area: true })}{field("solution", "Solution", { area: true })}{field("results", "Results", { area: true })}</>}
        {isBlog && <>{field("author_name", "Author name")}{field("author_role", "Author role")}{imageField("author_avatar", "Author avatar path", "blog_post")}{field("meta_title", "SEO title")}{field("meta_description", "SEO description", { area: true })}{field("meta_keywords", "SEO keywords")}</>}
        <label className="block"><span className={adminLabelClass}>Publication status</span><select className={adminFieldClass} value={form.status} onChange={(e) => setForm((current) => ({ ...current, status: e.target.value as "draft" | "published", is_published: e.target.value === "published" }))}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="block"><span className={adminLabelClass}>Display order</span><input type="number" min="0" className={adminFieldClass} value={form.sort_order} onChange={(e) => setForm((current) => ({ ...current, sort_order: Number(e.target.value) }))} /></label>
      </div>
      <div className="mt-5 flex gap-2"><button disabled={saving || imageUploadPending} className={adminPrimaryButtonClass} type="submit">{saving && <LoaderCircle size={16} className="animate-spin" />}Save {isBlog ? "post" : "case study"}</button><button type="button" onClick={() => setFormOpen(false)} className={adminSecondaryButtonClass}>Cancel</button></div>
    </form>}
    <div className={`${adminCardClass} mt-5 overflow-hidden`}>
      {loading && <p className="px-5 py-7 text-sm text-slate-500">Loading content…</p>}
      {!loading && !error && items.length === 0 && <div className="px-5 py-12 text-center"><p className="font-montserrat font-bold text-[#17375E]">Nothing here yet</p><p className="mt-1 text-sm text-slate-500">Create your first {isBlog ? "post" : "case study"} to get started.</p></div>}
      {!loading && items.length > 0 && <ul className="divide-y divide-slate-100">{items.map((item) => <li key={item.id} draggable={!isBlog} onDragStart={() => setDragId(item.id)} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (dragId !== null) setItems((current) => moveItem(current, dragId, item.id)); }} onDragEnd={() => setDragId(null)} className={`flex flex-wrap items-start justify-between gap-4 px-5 py-4 ${dragId === item.id ? "opacity-40" : ""}`}>{!isBlog && <GripVertical size={17} className="mt-1 shrink-0 cursor-grab text-slate-300" aria-label="Drag to reorder"/>}<div className="min-w-0 flex-1"><p className="font-semibold text-[#102B4E]">{item.title}<span className="ml-2 font-mono text-xs font-normal text-slate-400">/{item.slug}</span></p><p className="mt-1 line-clamp-2 max-w-3xl text-sm text-slate-500">{item.excerpt}</p><p className="mt-2 text-xs font-semibold text-slate-400">{item.status} · {item.is_published ? "Visible on site" : "Hidden"}</p></div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => beginEdit(item)} className={adminSecondaryButtonClass}>Edit</button><button type="button" onClick={() => remove(item)} className={adminDangerButtonClass}><Trash2 size={15} />Delete</button></div></li>)}</ul>}
    </div>
  </div>;
}
