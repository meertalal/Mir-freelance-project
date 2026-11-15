import { useState, type FormEvent } from "react";
import { KeyRound, LoaderCircle, LogOut } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import { changePasswordRequest } from "../api/auth";
import { ApiError } from "../api/client";
import {
  adminCardClass,
  adminFieldClass,
  adminHeadingClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
  adminSubheadingClass,
} from "../admin.styles";

export default function AdminAccountPage() {
  const { admin, token, signOut } = useAdminAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) return;

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const result = await changePasswordRequest(
        token,
        currentPassword,
        newPassword,
      );
      setSuccess(result.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (cause) {
      setError(
        cause instanceof ApiError ? cause.message : "Could not change the password.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className={adminHeadingClass}>Account</h1>
      <p className={adminSubheadingClass}>
        Your admin login and password.
      </p>

      <section className={`${adminCardClass} mt-6 p-5 sm:p-6`}>
        <h2 className="font-montserrat text-base font-bold text-[#10234B]">
          Signed in as
        </h2>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-inter text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Name
            </dt>
            <dd className="mt-1 font-inter text-sm text-slate-800">
              {admin?.name || "—"}
            </dd>
          </div>
          <div>
            <dt className="font-inter text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Email
            </dt>
            <dd className="mt-1 font-inter text-sm text-slate-800">
              {admin?.email || "—"}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={signOut}
          className={`${adminSecondaryButtonClass} mt-4`}
        >
          <LogOut size={16} aria-hidden="true" />
          Sign out
        </button>
      </section>

      <section className={`${adminCardClass} mt-5 p-5 sm:p-6`}>
        <h2 className="font-montserrat text-base font-bold text-[#10234B]">
          Change password
        </h2>
        <p className="mt-1 font-inter text-sm text-slate-500">
          Changing the password signs you out on every other device.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
          <label className="block">
            <span className={adminLabelClass}>Current password *</span>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className={adminFieldClass}
            />
          </label>

          <label className="block">
            <span className={adminLabelClass}>New password *</span>
            <input
              required
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={adminFieldClass}
            />
          </label>

          <label className="block">
            <span className={adminLabelClass}>Confirm new password *</span>
            <input
              required
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={adminFieldClass}
            />
          </label>

          {error && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 font-inter text-sm text-rose-700">
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="rounded-xl bg-emerald-50 px-3 py-2 font-inter text-sm text-emerald-700"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className={adminPrimaryButtonClass}
          >
            {saving ? (
              <>
                <LoaderCircle className="animate-spin" size={16} />
                Updating...
              </>
            ) : (
              <>
                <KeyRound size={16} aria-hidden="true" />
                Update password
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
