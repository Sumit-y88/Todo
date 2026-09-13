"use client";

import { useState } from "react";
import type { Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [justChecked, setJustChecked] = useState(false);

  const handleToggle = () => {
    if (!todo.completed) {
      setJustChecked(true);
      setTimeout(() => setJustChecked(false), 600);
    }
    onToggle(todo._id, !todo.completed);
  };

  return (
    <div className="group bru-card hover:shadow-[var(--shadow-bru-lg)] hover:-translate-x-px hover:-translate-y-px rounded-lg p-4 sm:p-5 transition-all duration-150 flex items-start gap-4">
      {/* Toggle */}
      <button
        onClick={handleToggle}
        className={`
          relative mt-0.5 w-9 h-9 rounded-full shrink-0
          flex items-center justify-center
          border-2 border-bru-ink transition-colors duration-150 bru-press
          ${
            todo.completed
              ? "bg-bru-lime text-bru-ink shadow-[var(--shadow-bru-sm)]"
              : "bg-bru-surface text-bru-muted hover:bg-bru-yellow"
          }
          ${justChecked ? "animate-check-ring" : ""}
        `}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={justChecked ? "animate-check-pop" : ""}
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <h3
          className={`
            font-bold text-base leading-snug break-words
            transition-all duration-150
            ${todo.completed ? "line-through text-bru-muted" : "text-bru-ink"}
          `}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p
            className={`
              text-sm mt-1 leading-relaxed font-medium break-words
              ${
                todo.completed ? "line-through text-bru-muted/70" : "text-bru-muted"
              }
            `}
          >
            {todo.description}
          </p>
        )}
        <p className="text-xs font-semibold text-bru-muted/60 mt-2">
          {todo.completed ? "Done " : "Added "}
          {timeAgo(todo.createdAt)}
        </p>
      </div>

      {/* Actions — revealed on hover */}
      <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          onClick={() => onEdit(todo)}
          className="bru-chip w-10 h-10 rounded-lg flex items-center justify-center text-bru-ink hover:bg-bru-yellow"
          aria-label="Edit task"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo)}
          className="bru-chip w-10 h-10 rounded-lg flex items-center justify-center text-bru-ink hover:bg-bru-red hover:text-white"
          aria-label="Delete task"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}