"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Todo, TodoFilter } from "@/lib/types";
import {
  apiGetTodos,
  apiCreateTodo,
  apiUpdateTodo,
  apiDeleteTodo,
} from "@/lib/api-client";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import TodoItem from "@/components/TodoItems";
import TodoForm from "@/components/TodoForm";
import TodoFilters from "@/components/TodoFilters";
import EmptyState from "@/components/todos/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Button from "@/components/ui/Button";

function greetingForHour(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function TodoList() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const [createOpen, setCreateOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    try {
      const { todos: data } = await apiGetTodos();
      setTodos(data);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to load your tasks",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    let cancelled = false;
    apiGetTodos()
      .then(({ todos: data }) => {
        if (!cancelled) setTodos(data);
      })
      .catch((err) => {
        if (!cancelled) {
          showToast(
            err instanceof Error ? err.message : "Failed to load your tasks",
            "error"
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [showToast]);

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const progress = counts.all
    ? Math.round((counts.completed / counts.all) * 100)
    : 0;

  // ─── Mutations ───
  const handleCreate = async (data: { title: string; description?: string }) => {
    try {
      const { todo } = await apiCreateTodo(data);
      setTodos((prev) => [todo, ...prev]);
      setCreateOpen(false);
      showToast("Task added", "success");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not add task",
        "error"
      );
    }
  };

  const handleUpdate = async (data: {
    title: string;
    description?: string;
  }) => {
    if (!editingTodo) return;
    try {
      const { todo } = await apiUpdateTodo(editingTodo._id, data);
      setTodos((prev) => prev.map((t) => (t._id === todo._id ? todo : t)));
      setEditingTodo(null);
      showToast("Task updated", "success");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not update task",
        "error"
      );
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    // Optimistic update
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed } : t))
    );
    try {
      await apiUpdateTodo(id, { completed });
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not update task",
        "error"
      );
      loadTodos();
    }
  };

  const handleDelete = async () => {
    if (!deletingTodo) return;
    setDeleteLoading(true);
    try {
      await apiDeleteTodo(deletingTodo._id);
      setTodos((prev) => prev.filter((t) => t._id !== deletingTodo._id));
      setDeletingTodo(null);
      showToast("Task deleted", "success");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not delete task",
        "error"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Header ─── */}
      <header className="bru-card-lg overflow-hidden">
        {/* Colored top strip */}
        <div className="flex items-center gap-3 px-6 py-3 bg-bru-yellow border-b-2 border-bru-ink -rotate-1 origin-left">
          <span className="inline-block w-3 h-3 rounded-full bg-bru-primary border-2 border-bru-ink" />
          <span className="inline-block w-3 h-3 rounded-full bg-bru-blue border-2 border-bru-ink" />
          <span className="inline-block w-3 h-3 rounded-full bg-bru-lime border-2 border-bru-ink" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-sm font-bold text-bru-muted uppercase tracking-wide">
              {formatDate(new Date())}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-bru-ink tracking-tight mt-1">
              {greetingForHour(new Date().getHours())},{" "}
              <span className="bg-bru-lime px-2 rounded border-b-2 border-bru-ink">
                {firstName}
              </span>
            </h1>

            {/* Progress */}
            <div className="mt-5 flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <div className="bru-well flex h-5 overflow-hidden rounded-md">
                  <div
                    className="h-full bg-bru-lime transition-all duration-500 border-r-2 border-bru-ink"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <p className="text-sm font-bold text-bru-muted whitespace-nowrap">
                <span className="text-bru-ink">{counts.completed}</span>
                {" / "}
                <span className="text-bru-ink">{counts.all}</span> done
              </p>
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => setCreateOpen(true)}
            className="shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Task
          </Button>
        </div>
      </header>

      {/* ─── Filters ─── */}
      <TodoFilters
        activeFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />

      {/* ─── List ─── */}
      {loading ? (
        <Skeleton count={4} />
      ) : todos.length === 0 ? (
        <div className="bru-card rounded-lg">
          <EmptyState />
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="bru-card rounded-lg px-6 py-12 text-center">
          <p className="text-bru-muted font-bold">
            No {filter} tasks right now.
          </p>
          <p className="text-sm text-bru-muted/70 font-medium mt-1">
            {filter === "active"
              ? "You're all caught up. Nice work!"
              : filter === "completed"
                ? "Finished tasks will show up here."
                : ""}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {filteredTodos.map((todo) => (
            <li key={todo._id}>
              <TodoItem
                todo={todo}
                onToggle={handleToggle}
                onEdit={setEditingTodo}
                onDelete={setDeletingTodo}
              />
            </li>
          ))}
        </ul>
      )}

      {/* ─── Create modal ─── */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add a new task"
      >
        <TodoForm
          key="create"
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
        />
      </Modal>

      {/* ─── Edit modal ─── */}
      <Modal
        open={Boolean(editingTodo)}
        onClose={() => setEditingTodo(null)}
        title="Edit task"
      >
        <TodoForm
          key={editingTodo?._id ?? "none"}
          todo={editingTodo ?? undefined}
          onSubmit={handleUpdate}
          onCancel={() => setEditingTodo(null)}
        />
      </Modal>

      {/* ─── Delete confirm ─── */}
      <ConfirmDialog
        open={Boolean(deletingTodo)}
        onClose={() => setDeletingTodo(null)}
        onConfirm={handleDelete}
        title="Delete this task?"
        description={
          deletingTodo
            ? `"${deletingTodo.title}" will be permanently removed.`
            : ""
        }
        confirmLabel="Delete"
        loading={deleteLoading}
      />
    </div>
  );
}