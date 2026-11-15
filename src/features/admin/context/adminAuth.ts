import { createContext, useContext } from "react";
import type { Admin } from "../api/auth";

export type AuthStatus = "checking" | "authenticated" | "anonymous";

export type AdminAuthValue = {
  status: AuthStatus;
  admin: Admin | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function useAdminAuth(): AdminAuthValue {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider.");
  }

  return context;
}
