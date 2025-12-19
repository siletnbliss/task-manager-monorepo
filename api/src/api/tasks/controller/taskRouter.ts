import {
  createApiBody,
  createApiResponse,
} from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import {
  createdTaskSchema,
  createTaskSchema,
  taskParamsSchema,
  updateTaskSchema,
} from "../models/taskDto";
import { validateRequest } from "@/common/utils/httpHandlers";
import z from "zod";
import taskController from "./taskController";

export const taskRegistry = new OpenAPIRegistry();
export const taskRouter: Router = Router();

taskRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

// post task

taskRegistry.registerPath({
  method: "post",
  path: "/tasks",
  tags: ["Tasks"],
  description: "Create new Task",
  security: [{ bearerAuth: [] }],
  request: {
    body: createApiBody(createTaskSchema, "Task data"),
  },
  responses: createApiResponse(
    createdTaskSchema,
    "Task created successfully",
    201
  ),
});

taskRouter.post(
  "/",
  validateRequest(z.object({ body: createTaskSchema })),
  taskController.create
);

// get tasks

taskRegistry.registerPath({
  method: "get",
  path: "/tasks",
  tags: ["Tasks"],
  security: [{ bearerAuth: [] }],
  description: "Get all tasks for the current user",
  responses: createApiResponse(
    z.array(createdTaskSchema),
    "List of tasks",
    200
  ),
});

taskRouter.get("/", taskController.getAll);

// update task

taskRegistry.registerPath({
  method: "put",
  path: "/tasks/{id}",
  tags: ["Tasks"],
  security: [{ bearerAuth: [] }],
  description: "Update a task",
  request: {
    params: taskParamsSchema,
    body: createApiBody(updateTaskSchema, "Update data"),
  },
  responses: createApiResponse(
    createdTaskSchema,
    "Task updated successfully",
    200
  ),
});

taskRouter.put(
  "/:id",
  validateRequest(
    z.object({
      params: taskParamsSchema,
      body: updateTaskSchema,
    })
  ),
  taskController.update
);

// delete task

taskRegistry.registerPath({
  method: "delete",
  path: "/tasks/{id}",
  tags: ["Tasks"],
  security: [{ bearerAuth: [] }],
  description: "Delete a task",
  request: {
    params: taskParamsSchema,
  },
  responses: createApiResponse(z.null(), "Task deleted successfully", 200),
});

taskRouter.delete(
  "/:id",
  validateRequest(z.object({ params: taskParamsSchema })),
  taskController.delete
);
