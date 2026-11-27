import { useCallback, useState } from "react";

export default function usePendingImageUploads() {
  const [pendingUploads, setPendingUploads] = useState<Set<string>>(
    () => new Set(),
  );

  const onPendingChange = useCallback((key: string, pending: boolean) => {
    setPendingUploads((current) => {
      if (current.has(key) === pending) return current;

      const next = new Set(current);
      if (pending) next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);

  const hasPending = useCallback(
    (contextId: string) => {
      const prefix = `${contextId}/`;
      return [...pendingUploads].some((key) => key.startsWith(prefix));
    },
    [pendingUploads],
  );

  return { hasPending, onPendingChange };
}
