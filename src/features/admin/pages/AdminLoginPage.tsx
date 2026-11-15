import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";
import { ApiError } from "../api/client";
import {
  adminFieldClass,
  adminLabelClass,
  adminPrimaryButtonClass,
} from "../admin.styles";

export default function AdminLoginPage() {
  const { status, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo =
    (location.state as { from?: string } | null)?.from || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin sign in | Mir Talal";
  }, []);

  if (status === "authenticated") {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (cause) {
      setError(
        cause instanceof ApiError
          ? cause.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F3F7FC] px-4 py-10">
      <div className="pointer-events-none absolute -left-32 -top-36 h-[440px] w-[440px] rounded-full bg-[#2B7CFF]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-24 h-[520px] w-[520px] rounded-full bg-[#0B3A6B]/10 blur-3xl" />
      <div className="relative w-full max-w-[960px] overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_30px_90px_rgba(11,45,82,0.14)] lg:grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative hidden min-h-[570px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#092F58] via-[#0B3A6B] to-[#1766B5] p-10 text-white lg:flex">
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-8 top-40 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#2B7CFF]/20 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2B7CFF] to-[#72B3FF] font-montserrat text-sm font-black ring-1 ring-white/20">MT</span>
            <div><p className="font-montserrat text-sm font-bold">Mir Talal</p><p className="mt-0.5 text-xs text-blue-100/70">Studio workspace</p></div>
          </div>
          <div className="relative max-w-sm">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#A9D0FF]"><LockKeyhole size={21} aria-hidden="true" /></span>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A9D0FF]">Welcome back</p>
            <h2 className="mt-3 font-montserrat text-3xl font-bold leading-tight">Your work, all in one place.</h2>
            <p className="mt-4 text-sm leading-6 text-blue-50/75">Manage messages and keep your website details up to date from your private workspace.</p>
          </div>
          <p className="relative text-xs text-blue-100/50">A clear view of your studio.</p>
        </div>

        <div className="p-6 sm:p-10 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#2B7CFF] to-[#0B3A6B] font-montserrat text-sm font-bold text-white shadow-md">MT</span>
          <div><p className="font-montserrat text-sm font-bold text-[#102B4E]">Mir Talal</p><p className="font-inter text-xs text-slate-500">Studio workspace</p></div>
        </div>
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2B7CFF]">Admin workspace</p>
          <h1 className="mt-2 font-montserrat text-2xl font-bold tracking-tight text-[#102B4E] sm:text-[30px]">Sign in to continue</h1>
          <p className="mt-2 font-inter text-sm leading-6 text-slate-500">Manage messages and site details securely.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <label className="block">
            <span className={adminLabelClass}>Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={adminFieldClass}
              placeholder="admin@mirtalal.com"
            />
          </label>

          <label className="block">
            <span className={adminLabelClass}>Password</span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={adminFieldClass}
              placeholder="Your password"
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-rose-50 px-3 py-2 font-inter text-sm text-rose-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${adminPrimaryButtonClass} w-full`}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={16} />
                Signing in...
              </>
            ) : (
              <>
                <LockKeyhole size={16} aria-hidden="true" />
                Sign in
              </>
            )}
          </button>
        </form>
        <p className="mt-7 text-center font-inter text-xs text-slate-400">Private access for the Mir Talal team</p>
        </div>
      </div>
    </div>
  );
}
