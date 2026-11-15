import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../../features/admin/api/client";

type RedirectRow = { from_path: string; to_path: string; status_code: number };
export default function SeoRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const [redirects, setRedirects] = useState<RedirectRow[] | null>(null);
  const skippedPath = useRef("");
  useEffect(() => {
    let cancelled = false;
    void fetch(apiUrl("/api/seo/redirects"), { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { data?: RedirectRow[] } | null) => { if (!cancelled) setRedirects(payload?.data ?? []); })
      .catch(() => { if (!cancelled) setRedirects([]); });
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    if (!redirects) return;
    if (skippedPath.current === location.pathname) { skippedPath.current = ""; return; }
    const currentPath = location.pathname.replace(/\/+$/, "") || "/";
    const redirect = redirects.find((entry) => entry.from_path === currentPath);
    if (!redirect) return;
    skippedPath.current = redirect.to_path;
    navigate(redirect.to_path, { replace: true });
  }, [redirects, location.pathname, navigate]);
  return null;
}
