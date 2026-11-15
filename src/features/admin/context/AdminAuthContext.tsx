import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { fetchMe, loginRequest, logoutRequest, type Admin } from "../api/auth";
import { readToken, writeToken } from "../api/client";
import {
  AdminAuthContext,
  type AdminAuthValue,
  type AuthStatus,
} from "./adminAuth";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => readToken());
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [status, setStatus] = useState<AuthStatus>(
    token ? "checking" : "anonymous",
  );

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    fetchMe(token)
      .then((result) => {
        if (cancelled) return;

        if (!result.admin) {
          throw new Error("Session expired.");
        }

        setAdmin(result.admin);
        setStatus("authenticated");
      })
      .catch(() => {
        if (cancelled) return;

        writeToken(null);
        setToken(null);
        setAdmin(null);
        setStatus("anonymous");
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await loginRequest(email, password);

    writeToken(result.token);
    setAdmin(result.admin);
    setToken(result.token);
    setStatus("authenticated");
  }, []);

  const signOut = useCallback(() => {
    const current = token;

    writeToken(null);
    setToken(null);
    setAdmin(null);
    setStatus("anonymous");

    if (current) {
      void logoutRequest(current).catch(() => {
        // Local session is already cleared; a stale server token expires on its own.
      });
    }
  }, [token]);

  const value = useMemo<AdminAuthValue>(
    () => ({ status, admin, token, signIn, signOut }),
    [status, admin, token, signIn, signOut],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
