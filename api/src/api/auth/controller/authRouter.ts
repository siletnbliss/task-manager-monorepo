import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { LoginUserResponse, LoginUserSchema } from "../models/loginDto";
import {
  createApiBody,
  createApiResponses,
} from "@/api-docs/openAPIResponseBuilders";
import authController from "./authController";

export const authRegistry = new OpenAPIRegistry();
export const authRouter = Router();

authRegistry.register("LoginDto", LoginUserSchema);

authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  description: "Generate JWT token with user credentials",
  // requestBody: createApiBody(LoginUserSchema, "User credentials"),
  request: {
    body: createApiBody(LoginUserSchema.shape.body, "User credentials"),
  },
  responses: createApiResponses([
    {
      description: "Successful login",
      statusCode: 200,
      schema: LoginUserResponse,
    },
  ]), // { ["200"]: createApiResponse(LoginUserResponse, "Verified user") },
});

authRouter.post("/login", authController.login);
