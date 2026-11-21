import { useSyncExternalStore } from "react";
import { apiUrl } from "../admin/api/client";

export type PublicFeedback = {
  id: number;
  author: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
  rating: number;
  service_title: string;
};

let feedback: PublicFeedback[] = [];
let snapshot = feedback;
let started = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) {
    started = true;
    void fetch(apiUrl("/api/feedback/approved?limit=12"), { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { data?: PublicFeedback[] } | null) => {
        if (Array.isArray(payload?.data)) {
          feedback = payload.data;
          snapshot = feedback;
        }
      })
      .catch(() => undefined)
      .finally(() => listeners.forEach((notify) => notify()));
  }
  return () => listeners.delete(listener);
}

export function useApprovedFeedback() {
  return useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
}
