import { Suspense, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Activity,
  BookOpenText,
  FileSearch,
  HelpCircle,
  FolderKanban,
  Globe2,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Quote,
  Settings2,
  MessageSquareQuote,
  UserRound,
} from "lucide-react";
import { useAdminAuth } from "../context/adminAuth";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/submissions", label: "Messages", icon: Inbox, end: false },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote, end: false },
  { to: "/admin/services", label: "Services", icon: Layers, end: false },
  { to: "/admin/portfolio", label: "Portfolio", icon: FolderKanban, end: false },
  { to: "/admin/blog", label: "Blog", icon: BookOpenText, end: false },
  { to: "/admin/feedback", label: "Feedback", icon: MessageSquareQuote, end: false },
  { to: "/admin/faqs", label: "FAQ editor", icon: HelpCircle, end: false },
  { to: "/admin/countries", label: "Country markets", icon: Globe2, end: false },
  { to: "/admin/seo", label: "SEO controls", icon: FileSearch, end: false },
  { to: "/admin/system", label: "Backup & activity", icon: Activity, end: false },
  { to: "/admin/settings", label: "Site settings", icon: Settings2, end: false },
  { to: "/admin/account", label: "Account", icon: UserRound, end: false },
];

function AdminFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center rounded-2xl border border-slate-200 bg-white">
      <p className="font-inter text-sm text-slate-500">Loading your workspace…</p>
    </div>
  );
}

export default function AdminLayout() {
  const { admin, signOut } = useAdminAuth();
  const location = useLocation();
  const activeItem = [...navItems].reverse().find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to),
  ) ?? navItems[0];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Admin | Mir Talal";

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    robots.dataset.adminRobots = "true";
    document.head.appendChild(robots);

    return () => {
      document.title = previousTitle;
      document.querySelectorAll('meta[data-admin-robots="true"]').forEach((element) => element.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F7FC] text-[#17375E]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col overflow-y-auto overscroll-contain bg-[#092F58] text-white [scrollbar-color:rgba(147,197,253,0.35)_transparent] [scrollbar-width:thin] lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <Link to="/admin" className="group flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2B7CFF] to-[#72B3FF] font-montserrat text-sm font-black shadow-lg shadow-black/15 ring-1 ring-white/20">MT</span>
            <span className="min-w-0">
              <span className="block font-montserrat text-sm font-bold tracking-wide">Mir Talal</span>
              <span className="mt-0.5 block text-xs text-blue-100/65">Studio workspace</span>
            </span>
          </Link>
        </div>

        <div className="px-4 pt-7">
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/45">Workspace</p>
          <nav aria-label="Admin navigation" className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => [
                    "group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-white text-[#0B3A6B] shadow-[0_8px_20px_rgba(0,0,0,0.13)]"
                      : "text-blue-50/75 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-semibold text-white">Your website</p>
            <p className="mt-1 text-xs leading-5 text-blue-100/60">See the public experience whenever you need.</p>
            <Link to="/" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#9BC8FF] transition hover:text-white">
              Open website <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <p className="px-2 pt-4 text-[10px] text-blue-100/35">© {new Date().getFullYear()} Mir Talal</p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 shadow-[0_4px_20px_rgba(11,45,82,0.035)] backdrop-blur-xl">
          <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
            <div className="min-w-0">
              <Link to="/admin" className="font-montserrat text-xs font-semibold text-slate-400 transition hover:text-[#2B7CFF] lg:hidden">MIR TALAL</Link>
              <h1 className="truncate font-montserrat text-base font-bold text-[#102B4E] sm:text-lg">{activeItem.label}</h1>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2.5 border-r border-slate-200 pr-4 sm:flex">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF] font-montserrat text-xs font-bold text-[#0B5BC4]">
                  {(admin?.name ?? admin?.email ?? "A").slice(0, 1).toUpperCase()}
                </span>
                <span className="max-w-[190px] truncate font-inter text-xs font-semibold text-[#244563]">{admin?.name ?? admin?.email}</span>
              </div>
              <Link to="/" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 font-inter text-xs font-semibold text-[#244563] transition hover:border-[#B8D3F6] hover:bg-[#F3F8FF] sm:px-3.5 sm:text-sm">
                <span className="hidden sm:inline">View site</span><ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <button type="button" onClick={signOut} aria-label="Sign out" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 sm:w-auto sm:px-3.5">
                <LogOut size={16} aria-hidden="true" /><span className="ml-2 hidden font-inter text-sm font-semibold sm:inline">Sign out</span>
              </button>
            </div>
          </div>
          <nav aria-label="Admin navigation" className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              return <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${isActive ? "bg-[#EAF2FF] text-[#0B5BC4]" : "text-slate-500 hover:bg-slate-50 hover:text-[#102B4E]"}`}><Icon size={15} aria-hidden="true" />{item.label}</NavLink>;
            })}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
          <Suspense fallback={<AdminFallback />}><Outlet /></Suspense>
        </main>
      </div>
    </div>
  );
}
