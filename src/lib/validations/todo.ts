
import { z } from "zod";

export const createTodoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title cannot exceed 200 characters"),
    description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),
});

export const updateTodoSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(1, "Title cannot be empty")
            .max(200, "Title cannot exceed 200 characters")
            .optional(),
        description: z
            .string()
            .trim()
            .max(1000, "Description cannot exceed 1000 characters")
            .optional(),
        completed: z.boolean().optional(),
    })
    .refine(
        (data) =>
            data.title !== undefined ||
            data.description !== undefined ||
            data.completed !== undefined,
        {
            message: "At least one field (title, description, or completed) must be provided",
        }
    );

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
