import { z } from "zod";

/** Limits shared by the client form and the API so they can never drift apart. */
export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  companyMax: 160,
  serviceMax: 160,
  messageMin: 10,
  messageMax: 4000,
} as const;

export const PHONE_REGEX = /^[0-9+\s-]{9,20}$/;

/** Trims and strips control characters / null bytes (keeps \t and \n). */
export const sanitizeString = (str?: string | null): string => {
  if (!str) return "";
  return str.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
};

/** Server-side schema (messages are generic — the client shows its own localized ones). */
export const contactFormSchema = z.object({
  name: z.string().trim().min(CONTACT_LIMITS.nameMin).max(CONTACT_LIMITS.nameMax),
  phone: z.string().trim().regex(PHONE_REGEX),
  company: z.string().trim().max(CONTACT_LIMITS.companyMax).optional(),
  service: z.string().trim().max(CONTACT_LIMITS.serviceMax).optional(),
  message: z.string().trim().min(CONTACT_LIMITS.messageMin).max(CONTACT_LIMITS.messageMax),
  honeypot: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
