import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  // --- Server Configuration ---
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  HOST: z.string().min(1).default("localhost"),
  PORT: z.coerce.number().int().positive().default(8080),
  CORS_ORIGIN: z.string().url().default("http://localhost:8080"),

  // --- Rate Limiting ---
  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce
    .number()
    .int()
    .positive()
    .default(1000),
  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),

  // --- Database Configuration ---
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  DB_HOST: z.string().min(1).default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(5432),

  // --- JWT Configuration ---
  ACCESS_TOKEN_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXPIRY: z.string().min(1).default("15m"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === "development",
  isProduction: parsedEnv.data.NODE_ENV === "production",
  isTest: parsedEnv.data.NODE_ENV === "test",
} as const;
