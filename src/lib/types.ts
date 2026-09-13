// ──────────────────────────────────────────────
// Shared TypeScript types for the TaskFlow frontend
// ──────────────────────────────────────────────

/** User object returned by /api/auth/me and /api/auth/login */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

/** Todo object returned by the /api/todos endpoints */
export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

/** Standard error shape from the backend */
export interface ApiError {
  error: string;
}

/** Filter values for the todo list */
export type TodoFilter = "all" | "active" | "completed";
