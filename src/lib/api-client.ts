// ──────────────────────────────────────────────
// Central API client — typed fetch wrappers for every endpoint
// with global 401 interceptor (refresh once, then redirect)
// ──────────────────────────────────────────────

import type { User, Todo } from "@/lib/types";

// ─── Base fetch wrapper ───
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const isAuthEndpoint =
    url === "/api/auth/login" ||
    url === "/api/auth/register" ||
    url === "/api/auth/refresh";

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (res.status === 401) {
    // Do not attempt token refresh for login, register, or refresh calls
    if (!isAuthEndpoint) {
      const refreshed = await attemptRefresh();
      if (refreshed) {
        // Retry original request once
        const retry = await fetch(url, {
          ...options,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });
        if (retry.ok) {
          return retry.json() as Promise<T>;
        }
      }
    }

    // For /api/auth/me, an unauthenticated response is expected when logged out;
    // do not force-reload the browser window or redirect to login.
    if (url === "/api/auth/me") {
      throw new Error("Unauthenticated");
    }

    // For protected API endpoints, redirect to login only if not already on auth pages
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const isAuthPage =
        currentPath === "/login" ||
        currentPath.startsWith("/login/") ||
        currentPath === "/register" ||
        currentPath.startsWith("/register/");

      if (!isAuthPage && !isAuthEndpoint) {
        const callbackUrl = encodeURIComponent(currentPath + window.location.search);
        window.location.replace(`/login?callbackUrl=${callbackUrl}`);
      }
    }

    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error || "Session expired"
    );
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error || `Request failed (${res.status})`
    );
  }

  return res.json() as Promise<T>;
}

async function attemptRefresh(): Promise<boolean> {
  // Deduplicate concurrent refresh calls
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      return res.ok;
    } catch {
      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ──────────────────────────────────────────────
// Auth endpoints
// ──────────────────────────────────────────────

export async function apiRegister(body: {
  name: string;
  email: string;
  password: string;
}): Promise<{ message: string }> {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiLogin(body: {
  email: string;
  password: string;
}): Promise<{ message: string; user: User }> {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiLogout(): Promise<{ message: string }> {
  return apiFetch("/api/auth/logout", { method: "POST" });
}

export async function apiGetMe(): Promise<{ user: User }> {
  return apiFetch("/api/auth/me");
}

export async function apiRefreshToken(): Promise<{
  message: string;
  user: User;
}> {
  return apiFetch("/api/auth/refresh", { method: "POST" });
}

// ──────────────────────────────────────────────
// Todo endpoints
// ──────────────────────────────────────────────

export async function apiGetTodos(): Promise<{ todos: Todo[] }> {
  return apiFetch("/api/todos");
}

export async function apiCreateTodo(body: {
  title: string;
  description?: string;
}): Promise<{ todo: Todo }> {
  return apiFetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiGetTodo(id: string): Promise<{ todo: Todo }> {
  return apiFetch(`/api/todos/${id}`);
}

export async function apiUpdateTodo(
  id: string,
  body: { title?: string; description?: string; completed?: boolean }
): Promise<{ todo: Todo }> {
  return apiFetch(`/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function apiDeleteTodo(
  id: string
): Promise<{ message: string }> {
  return apiFetch(`/api/todos/${id}`, { method: "DELETE" });
}
