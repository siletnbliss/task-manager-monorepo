import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import {
  LoginUserResponse,
  LoginUserSchema,
  RegisterUserResponse,
} from "../models/loginDto";
import {
  createApiBody,
  createApiResponses,
} from "@/api-docs/openAPIResponseBuilders";
import authController from "./authController";
import { validateRequest } from "@/common/utils/httpHandlers";
import z from "zod";
export const authRegistry = new OpenAPIRegistry();
export const authRouter = Router();

authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  description: "Generate JWT token with user credentials",
  request: {
    body: createApiBody(LoginUserSchema.shape.body, "User credentials"),
  },
  responses: createApiResponses([
    {
      description: "Successful login",
      statusCode: 200,
      schema: LoginUserResponse,
    },
    { description: "Invalid credentials", statusCode: 401, schema: z.null() },
  ]),
});

authRouter.post(
  "/login",
  validateRequest(LoginUserSchema),
  authController.login
);

authRegistry.registerPath({
  method: "post",
  path: "/auth/register",
  tags: ["Auth"],
  description: "Register new user",
  request: {
    body: createApiBody(LoginUserSchema.shape.body, "User credentials"),
  },
  responses: createApiResponses([
    {
      description: "Successful register",
      statusCode: 200,
      schema: RegisterUserResponse,
    },
    { description: "Username in use", statusCode: 403, schema: z.null() },
  ]),
});

authRouter.post(
  "/register",
  validateRequest(LoginUserSchema),
  authController.register
);
