"use client";

import { useState } from "react";
import { createTodoSchema, updateTodoSchema } from "@/lib/validations/todo";
import type { Todo } from "@/lib/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface TodoFormProps {
  /** If provided, we're editing. Otherwise creating. */
  todo?: Todo;
  onSubmit: (data: { title: string; description?: string }) => Promise<void>;
  onCancel: () => void;
}

export default function TodoForm({ todo, onSubmit, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(todo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const data = {
      title: title.trim(),
      description: description.trim() || undefined,
    };

    // Validate with the appropriate schema
    const schema = isEditing ? updateTodoSchema : createTodoSchema;
    const result = schema.safeParse(
      isEditing ? { ...data, completed: todo?.completed } : data
    );

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = (issue.path[0] as string) || "_form";
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(data);
    } catch {
      // Toast is handled by the parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Title"
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        autoFocus
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="todo-desc" className="text-sm font-bold text-bru-ink">
          Description{" "}
          <span className="text-bru-muted font-medium">(optional)</span>
        </label>
        <textarea
          id="todo-desc"
          rows={3}
          placeholder="Add some details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`
            w-full px-4 py-3 rounded-lg resize-none
            bg-bru-well border-2 border-bru-ink
            text-bru-ink placeholder:text-bru-muted/60
            shadow-[var(--shadow-bru-inset)]
            transition-all duration-150
            focus:outline-none focus:bg-bru-surface focus:shadow-[var(--shadow-bru-sm)]
            ${errors.description ? "border-bru-red bg-red-50" : ""}
          `}
        />
        {errors.description && (
          <p className="text-sm text-bru-red font-bold pl-1">
            {errors.description}
          </p>
        )}
      </div>

      {errors._form && (
        <p className="text-sm text-bru-red font-bold">{errors._form}</p>
      )}

      <div className="flex gap-3 justify-end mt-2">
        <Button variant="secondary" size="sm" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" loading={loading}>
          {isEditing ? "Save Changes" : "Add Task"}
        </Button>
      </div>
    </form>
  );
}