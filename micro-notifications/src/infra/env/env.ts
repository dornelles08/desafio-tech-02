import { z } from "zod";

export const envSchema = z.object({
  RABBITMQ_URL: z.url(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string(),
  EMAIL_SECURE: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;
