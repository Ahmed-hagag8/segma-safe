import { z } from "zod";

/** Company WhatsApp line — same number used by the site's WhatsApp buttons (see lib/i18n.ts). */
export const DEFAULT_WHATSAPP_PHONE = "201039661221";

const envSchema = z.object({
  DATABASE_URL: z.string().default("file:/tmp/custom.db"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  WHATSAPP_NOTIFY_PHONE: z.string().regex(/^\+?\d{10,15}$/).default(DEFAULT_WHATSAPP_PHONE),
  WHATSAPP_API_TOKEN: z.string().min(1).optional(),
  WHATSAPP_PHONE_NUMBER_ID: z.string().min(1).optional(),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (parsed.success) return parsed.data;

  console.warn("⚠️ Using safe fallback environment values:", parsed.error.flatten().fieldErrors);
  return {
    DATABASE_URL: process.env.DATABASE_URL || "file:/tmp/custom.db",
    NODE_ENV: (process.env.NODE_ENV as "production" | "development") || "production",
    WHATSAPP_NOTIFY_PHONE: process.env.WHATSAPP_NOTIFY_PHONE || DEFAULT_WHATSAPP_PHONE,
    WHATSAPP_API_TOKEN: process.env.WHATSAPP_API_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
  };
}

export const env = loadEnv();
