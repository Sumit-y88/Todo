"use client";

import type { TodoFilter } from "@/lib/types";

interface TodoFiltersProps {
  activeFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  counts: { all: number; active: number; completed: number };
}

const filters: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const activeStyles: Record<TodoFilter, string> = {
  all: "bg-bru-primary text-white",
  active: "bg-bru-blue text-white",
  completed: "bg-bru-lime text-bru-ink",
};

export default function TodoFilters({
  activeFilter,
  onFilterChange,
  counts,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map(({ value, label }) => {
        const isActive = activeFilter === value;
        const count = counts[value];
        return (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`
              flex items-center gap-2 px-4 py-2
              border-2 border-bru-ink rounded-lg
              text-sm font-bold transition-all duration-150 bru-press
              ${
                isActive
                  ? `${activeStyles[value]} shadow-[var(--shadow-bru)]`
                  : "bg-bru-surface text-bru-ink shadow-[var(--shadow-bru-sm)] hover:bg-bru-yellow"
              }
            `}
          >
            {label}
            <span
              className={`inline-flex items-center justify-center min-w-5 h-5 px-1 rounded border-2 border-bru-ink text-xs font-extrabold ${
                isActive ? "bg-bru-ink text-white" : "bg-bru-well"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}