import { z } from "zod";
import { TaskPriority, TaskStatus } from "./enum";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const createdTaskSchema = createTaskSchema.extend({
  id: z.number().int(),
});

export const taskParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
