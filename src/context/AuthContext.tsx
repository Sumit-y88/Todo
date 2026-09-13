"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import { apiGetMe, apiLogin, apiLogout } from "@/lib/api-client";
import { useToast } from "@/context/ToastContext";

// ──────────────────────────────────────────────
// Context shape
// ──────────────────────────────────────────────
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { showToast } = useToast();

  // Hydrate user on mount
  useEffect(() => {
    let cancelled = false;
    apiGetMe()
      .then(({ user: u }) => {
        if (!cancelled) setUser(u);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { user: u } = await apiGetMe();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = useCallback(
    async (email: string, password: string): Promise<User> => {
      const { user: u } = await apiLogin({ email, password });
      setUser(u);
      return u;
    },
    []
  );

  // Logout
  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // Even if the API call fails, clear client state
    }
    setUser(null);
    showToast("Logged out successfully", "success");
    router.push("/login");
  }, [router, showToast]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
