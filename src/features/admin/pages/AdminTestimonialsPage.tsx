import { useEffect, useState, type FormEvent } from "react";
import { GripVertical, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import {
  createTestimonial,
  deleteTestimonial,
  listTestimonials,
  updateTestimonial,
  type AdminTestimonial,
  type TestimonialInput,
} from "../api/content";
import { ApiError } from "../api/client";
import { saveContentOrder } from "../api/tools";
import { moveItem } from "../utils/order";
import {
  adminCardClass,
  adminDangerButtonClass,
  adminFieldClass,
  adminHeadingClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
  adminSubheadingClass,
} from "../admin.styles";

const emptyForm: TestimonialInput = {
  author: "",
  role: "",
  company: "",
  quote: "",
  avatar: "",
  rating: 5,
  sort_order: 0,
  is_published: true,
};

function toInput(item: AdminTestimonial): TestimonialInput {
  return {
    author: item.author,
    role: item.role,
    company: item.company,
    quote: item.quote,
    avatar: item.avatar,
    rating: item.rating,
    sort_order: item.sort_order,
    is_published: item.is_published,
  };
}

export default function AdminTestimonialsPage() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<TestimonialInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [workingId, setWorkingId] = useState<number | null>(null);
  const [dragId, setDragId] = useState<number | null>(null);
  const [orderSaving, setOrderSaving] = useState(false);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    listTestimonials(token)
      .then((result) => {
        if (!cancelled) setItems(result.data);
      })
      .catch((cause) => {
        if (!cancelled) {
          setError(
            cause instanceof ApiError
              ? cause.message
              : "Could not load testimonials.",
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

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
    setError("");
    setNotice("");
  };

  const startEdit = (item: AdminTestimonial) => {
    setEditingId(item.id);
    setForm(toInput(item));
    setFormOpen(true);
    setError("");
    setNotice("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (editingId === null) {
        const result = await createTestimonial(token, form);
        setItems((current) => [...current, result.data]);
        setNotice("Testimonial added.");
      } else {
        const result = await updateTestimonial(token, editingId, form);
        setItems((current) =>
          current.map((item) => (item.id === editingId ? result.data : item)),
        );
        setNotice("Testimonial saved.");
      }

      setFormOpen(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (cause) {
      setError(
        cause instanceof ApiError ? cause.message : "Could not save the testimonial.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: AdminTestimonial) => {
    if (!token) return;
    if (!window.confirm(`Delete the testimonial from ${item.author}?`)) return;

    setWorkingId(item.id);
    setError("");
    setNotice("");

    try {
      await deleteTestimonial(token, item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setNotice("Testimonial deleted.");
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Could not delete the testimonial.",
      );
    } finally {
      setWorkingId(null);
    }
  };

  const saveOrder = async () => {
    if (!token) return;
    setOrderSaving(true);
    try { await saveContentOrder(token, "testimonials", items.map((item) => item.id)); setNotice("Testimonial order saved."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save testimonial order."); }
    finally { setOrderSaving(false); }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={adminHeadingClass}>Testimonials</h1>
          <p className={adminSubheadingClass}>
            Client quotes shown on the home, about, portfolio and contact pages.
          </p>
        </div>
        <div className="flex gap-2">{items.length > 1 && <button type="button" disabled={orderSaving} onClick={saveOrder} className={adminSecondaryButtonClass}>{orderSaving ? "Saving…" : "Save order"}</button>}<button type="button" onClick={startCreate} className={adminPrimaryButtonClass}>
          <Plus size={16} aria-hidden="true" />
          New testimonial
        </button></div>
      </div>

      {notice && (
        <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 font-inter text-sm text-emerald-700">
          {notice}
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-xl bg-rose-50 px-3 py-2 font-inter text-sm text-rose-700">
          {error}
        </p>
      )}

      {formOpen && (
        <form onSubmit={handleSubmit} className={`${adminCardClass} mt-5 p-5 sm:p-6`} noValidate>
          <h2 className="font-montserrat text-base font-bold text-[#10234B]">
            {editingId === null ? "New testimonial" : "Edit testimonial"}
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={adminLabelClass}>Client name *</span>
              <input
                required
                value={form.author}
                onChange={(event) =>
                  setForm((current) => ({ ...current, author: event.target.value }))
                }
                className={adminFieldClass}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Role</span>
              <input
                value={form.role}
                onChange={(event) =>
                  setForm((current) => ({ ...current, role: event.target.value }))
                }
                className={adminFieldClass}
                placeholder="CEO"
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Company</span>
              <input
                value={form.company}
                onChange={(event) =>
                  setForm((current) => ({ ...current, company: event.target.value }))
                }
                className={adminFieldClass}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Avatar path</span>
              <input
                value={form.avatar}
                onChange={(event) =>
                  setForm((current) => ({ ...current, avatar: event.target.value }))
                }
                className={adminFieldClass}
                placeholder="/image/clients/clientName.webp"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className={adminLabelClass}>Quote *</span>
              <textarea
                required
                value={form.quote}
                onChange={(event) =>
                  setForm((current) => ({ ...current, quote: event.target.value }))
                }
                className={`${adminFieldClass} min-h-28 resize-y`}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Rating (1-5)</span>
              <input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    rating: Number(event.target.value),
                  }))
                }
                className={adminFieldClass}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Sort order</span>
              <input
                type="number"
                min={0}
                value={form.sort_order}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    sort_order: Number(event.target.value),
                  }))
                }
                className={adminFieldClass}
              />
            </label>

            <label className="flex items-center gap-2 font-inter text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    is_published: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-slate-300"
              />
              Published on the website
            </label>
          </div>

          <div className="mt-5 flex gap-2">
            <button type="submit" disabled={saving} className={adminPrimaryButtonClass}>
              {saving && <LoaderCircle className="animate-spin" size={16} />}
              {editingId === null ? "Add testimonial" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className={adminSecondaryButtonClass}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className={`${adminCardClass} mt-5 overflow-hidden`}>
        {loading && (
          <p className="px-5 py-6 font-inter text-sm text-slate-500">Loading...</p>
        )}

        {!loading && items.length === 0 && (
          <p className="px-5 py-6 font-inter text-sm text-slate-500">
            No testimonials yet.
          </p>
        )}

        {!loading && items.length > 0 && (
          <ul className="divide-y divide-slate-100">
            {items.map((item) => (
              <li
                key={item.id}
                draggable
                onDragStart={() => setDragId(item.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => { if (dragId !== null) setItems((current) => moveItem(current, dragId, item.id)); }}
                onDragEnd={() => setDragId(null)}
                className={`flex flex-wrap items-start justify-between gap-3 px-5 py-4 ${dragId === item.id ? "opacity-40" : ""}`}
              >
                <GripVertical size={17} className="mt-1 shrink-0 cursor-grab text-slate-300" aria-label="Drag to reorder" />
                <div className="min-w-0">
                  <p className="font-inter text-sm font-semibold text-[#10234B]">
                    {item.author}
                    {item.company && (
                      <span className="ml-2 font-normal text-slate-500">
                        {item.company}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 line-clamp-2 max-w-xl font-inter text-xs text-slate-500">
                    {item.quote}
                  </p>
                  <p className="mt-1 font-inter text-xs text-slate-400">
                    Order {item.sort_order} · {item.is_published ? "Published" : "Hidden"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className={adminSecondaryButtonClass}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    disabled={workingId === item.id}
                    className={adminDangerButtonClass}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
