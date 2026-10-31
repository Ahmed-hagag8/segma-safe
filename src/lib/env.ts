import { z } from "zod";

/** Company WhatsApp line — same number used by the site's WhatsApp buttons (see lib/i18n.ts). */
export const DEFAULT_WHATSAPP_PHONE = "201039661221";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  WHATSAPP_NOTIFY_PHONE: z.string().regex(/^\+?\d{10,15}$/).default(DEFAULT_WHATSAPP_PHONE),
  WHATSAPP_API_TOKEN: z.string().min(1).optional(),
  WHATSAPP_PHONE_NUMBER_ID: z.string().min(1).optional(),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (parsed.success) return parsed.data;

  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  if (process.env.NODE_ENV === "production") {
    throw new Error("Invalid environment configuration — check your .env file");
  }
  // Development fallback so the site still boots locally
  return {
    DATABASE_URL: process.env.DATABASE_URL || "file:../db/custom.db",
    NODE_ENV: "development",
    WHATSAPP_NOTIFY_PHONE: DEFAULT_WHATSAPP_PHONE,
  };
}

export const env = loadEnv();
