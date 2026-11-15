import { useSyncExternalStore } from "react";
import { apiUrl } from "../admin/api/client";
import type { FaqEntry } from "../admin/api/tools";

let current: FaqEntry[] | null = null;
let started = false;
const listeners = new Set<() => void>();
function emit() { listeners.forEach((listener) => listener()); }
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) {
    started = true;
    void fetch(apiUrl("/api/faqs"), { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { data?: FaqEntry[] } | null) => { if (Array.isArray(payload?.data)) current = payload.data; emit(); })
      .catch(() => emit());
  }
  return () => { listeners.delete(listener); };
}
function snapshot() { return current; }
export function useFaqs() { return useSyncExternalStore(subscribe, snapshot, snapshot); }
