import { useEffect, useState, type FormEvent } from "react";
import { GripVertical, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import ImageUploadField from "../components/ImageUploadField";
import {
  createService,
  deleteService,
  listServices,
  updateService,
  type AdminService,
  type ServiceInput,
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

const emptyForm: ServiceInput = {
  slug: "",
  title: "",
  description: "",
  icon: "code2",
  image: "",
  image_alt: "",
  sort_order: 0,
  is_published: true,
};

const iconOptions = [
  "code2",
  "smartphone",
  "bot",
  "message-square",
  "database",
  "palette",
  "cloud",
  "chart",
];

function toInput(item: AdminService): ServiceInput {
  return {
    slug: item.slug,
    title: item.title,
    description: item.description,
    icon: item.icon,
    image: item.image,
    image_alt: item.image_alt,
    sort_order: item.sort_order,
    is_published: item.is_published,
  };
}

export default function AdminServicesPage() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<ServiceInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [workingId, setWorkingId] = useState<number | null>(null);
  const [dragId, setDragId] = useState<number | null>(null);
  const [orderSaving, setOrderSaving] = useState(false);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    listServices(token)
      .then((result) => {
        if (!cancelled) setItems(result.data);
      })
      .catch((cause) => {
        if (!cancelled) {
          setError(
            cause instanceof ApiError ? cause.message : "Could not load services.",
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

  const startEdit = (item: AdminService) => {
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
        const result = await createService(token, form);
        setItems((current) => [...current, result.data]);
        setNotice("Service added.");
      } else {
        const result = await updateService(token, editingId, form);
        setItems((current) =>
          current.map((item) => (item.id === editingId ? result.data : item)),
        );
        setNotice("Service saved.");
      }

      setFormOpen(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (cause) {
      setError(
        cause instanceof ApiError ? cause.message : "Could not save the service.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: AdminService) => {
    if (!token) return;
    if (!window.confirm(`Delete the service "${item.title}"?`)) return;

    setWorkingId(item.id);
    setError("");
    setNotice("");

    try {
      await deleteService(token, item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setNotice("Service deleted.");
    } catch (cause) {
      setError(
        cause instanceof ApiError ? cause.message : "Could not delete the service.",
      );
    } finally {
      setWorkingId(null);
    }
  };

  const saveOrder = async () => {
    if (!token) return;
    setOrderSaving(true);
    try { await saveContentOrder(token, "services", items.map((item) => item.id)); setNotice("Service order saved."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save service order."); }
    finally { setOrderSaving(false); }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={adminHeadingClass}>Services</h1>
          <p className={adminSubheadingClass}>
            Cards shown in the services grid and the footer.
          </p>
        </div>
        <div className="flex gap-2">{items.length > 1 && <button type="button" disabled={orderSaving} onClick={saveOrder} className={adminSecondaryButtonClass}>{orderSaving ? "Saving…" : "Save order"}</button>}<button type="button" onClick={startCreate} className={adminPrimaryButtonClass}>
          <Plus size={16} aria-hidden="true" />
          New service
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
            {editingId === null ? "New service" : "Edit service"}
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={adminLabelClass}>Title *</span>
              <input
                required
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({ ...current, title: event.target.value }))
                }
                className={adminFieldClass}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Slug</span>
              <input
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: event.target.value }))
                }
                className={adminFieldClass}
                placeholder="Generated from the title when empty"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className={adminLabelClass}>Description *</span>
              <textarea
                required
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                className={`${adminFieldClass} min-h-20 resize-y`}
              />
            </label>

            <label className="block">
              <span className={adminLabelClass}>Icon</span>
              <select
                value={form.icon}
                onChange={(event) =>
                  setForm((current) => ({ ...current, icon: event.target.value }))
                }
                className={adminFieldClass}
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </label>

            <ImageUploadField
              label="Image path"
              value={form.image}
              onChange={(image) => setForm((current) => ({ ...current, image }))}
              uploadableType="service"
            />

            <label className="block">
              <span className={adminLabelClass}>Image alt text</span>
              <input
                value={form.image_alt}
                onChange={(event) =>
                  setForm((current) => ({ ...current, image_alt: event.target.value }))
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
              {editingId === null ? "Add service" : "Save changes"}
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
            No services yet.
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
                    {item.title}
                    <span className="ml-2 font-mono text-xs font-normal text-slate-400">
                      {item.slug}
                    </span>
                  </p>
                  <p className="mt-1 line-clamp-2 max-w-xl font-inter text-xs text-slate-500">
                    {item.description}
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
