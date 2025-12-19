import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export type LoginUserDto = {
  username: string;
  password: string;
};

export type RegisterUserDto = LoginUserDto;

export const LoginUserSchema = z.object({
  body: z.object({ username: z.string(), password: z.string() }),
});

export const LoginUserResponse = z.object({
  access_token: z.string(),
});

export const RegisterUserResponse = z.object({
  id: z.number(),
  username: z.string(),
});
