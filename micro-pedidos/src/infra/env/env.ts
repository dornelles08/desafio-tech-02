import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  RABBITMQ_URL: z.url(),
  PORT: z.coerce.number().optional().default(3333),
  ENV: z.string().default("DEV")
});

export type Env = z.infer<typeof envSchema>;
