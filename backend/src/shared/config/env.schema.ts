import "dotenv/config";
import z from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  CORS_ORIGIN: z.string(),
  DATABASE_URL: z.string(),
  DATABASE_DIRECT_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
});

export const env = EnvSchema.parse(process.env);
