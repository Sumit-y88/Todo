"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Client-side auth guard hook.
 * Redirects unauthenticated users to /login?callbackUrl=<current path>.
 * Use as a safety net alongside the server-side middleware in proxy.ts.
 */
export function useRequireAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      const callbackUrl = encodeURIComponent(pathname);
      router.replace(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [user, loading, router, pathname]);

  return { user, loading };
}
