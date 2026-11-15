import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { Copy, ImagePlus, LoaderCircle, Trash2, UploadCloud } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import { ApiError, apiUrl } from "../api/client";
import { deleteMedia, listMedia, uploadMedia, type AdminMediaFile } from "../api/media";
import { adminCardClass, adminDangerButtonClass, adminHeadingClass, adminSubheadingClass } from "../admin.styles";

function filePath(file: AdminMediaFile) { return `/${file.avatar.replace(/^\/+/, "")}`; }
export default function AdminMediaPage() {
  const { token } = useAdminAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<AdminMediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = useCallback(() => { if (!token) return; listMedia(token).then((r) => setItems(r.data)).catch((e) => setError(e instanceof ApiError ? e.message : "Could not load media.")).finally(() => setLoading(false)); }, [token]);
  useEffect(() => { load(); }, [load]);
  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file || !token) return;
    setError(""); setNotice(""); setUploading(true);
    try { const result = await uploadMedia(token, file); setItems((current) => [result.data, ...current]); setNotice("Image uploaded. Copy its path to use it in your content."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed."); }
    finally { setUploading(false); event.target.value = ""; }
  };
  const remove = async (file: AdminMediaFile) => {
    if (!token || !window.confirm(`Permanently delete ${file.companyLogo}?`)) return;
    try { await deleteMedia(token, file.id); setItems((current) => current.filter((item) => item.id !== file.id)); setNotice("Image deleted."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete image."); }
  };
  const copy = async (file: AdminMediaFile) => { try { await navigator.clipboard.writeText(filePath(file)); setNotice("Image path copied."); } catch { setError("Clipboard access is unavailable. Copy the path shown on the image card."); } };
  return <div>
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className={adminHeadingClass}>Media library</h1><p className={adminSubheadingClass}>Upload and reuse images across your site content.</p></div><button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#2B7CFF] to-[#0B3A6B] px-4 text-sm font-bold text-white shadow-md disabled:opacity-60">{uploading ? <LoaderCircle size={16} className="animate-spin" /> : <UploadCloud size={16} />}{uploading ? "Uploading…" : "Upload image"}</button><input ref={inputRef} className="hidden" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={upload} /></div>
    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-[#EAF2FF] p-4 text-sm text-[#244563]"><ImagePlus className="mt-0.5 shrink-0 text-[#1670F5]" size={18} /><p>PNG, JPG, WebP, or GIF · Maximum 5 MB. Copy an image path into a service, portfolio project, or blog post.</p></div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}{notice && <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}
    {loading && <div className={`${adminCardClass} mt-5 px-5 py-8 text-sm text-slate-500`}>Loading media…</div>}
    {!loading && items.length === 0 && <div className={`${adminCardClass} mt-5 flex flex-col items-center px-5 py-14 text-center`}><ImagePlus size={30} className="text-[#2B7CFF]"/><p className="mt-3 font-montserrat font-bold text-[#17375E]">Your library is ready</p><p className="mt-1 text-sm text-slate-500">Upload an image to use it in your site content.</p></div>}
    {!loading && items.length > 0 && <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((file) => <article key={file.id} className={`${adminCardClass} overflow-hidden`}><div className="aspect-[16/10] bg-slate-100"><img src={apiUrl(filePath(file))} alt={file.companyLogo} className="h-full w-full object-cover" loading="lazy" /></div><div className="p-4"><p className="truncate text-sm font-semibold text-[#17375E]" title={file.companyLogo}>{file.companyLogo}</p><p className="mt-1 text-xs text-slate-500">{(file.sizeBytes / 1024).toFixed(0)} KB · {file.mimeType}</p><code className="mt-3 block truncate rounded-lg bg-slate-50 px-2.5 py-2 text-xs text-slate-600">{filePath(file)}</code><div className="mt-3 flex gap-2"><button type="button" onClick={() => copy(file)} className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-xs font-semibold text-[#244563] hover:bg-[#F3F8FF]"><Copy size={14}/>Copy path</button><button type="button" aria-label="Delete image" onClick={() => remove(file)} className={adminDangerButtonClass}><Trash2 size={14}/></button></div></div></article>)}</div>}
  </div>;
}
