import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactFormSchema, sanitizeString } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { getWhatsAppDirectUrl, sendWhatsAppNotification } from "@/lib/whatsapp";

const MAX_PAYLOAD_BYTES = 15 * 1024; // 15 KB

/** Error codes the client maps to localized (AR/EN) messages. */
type ErrorCode = "RATE_LIMITED" | "TOO_LARGE" | "INVALID" | "SERVER";

function fail(code: ErrorCode, status: number, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, code }, { status, headers });
}

/**
 * Client IP behind a reverse proxy (Nginx / Hostinger).
 * Prefer X-Real-IP (set by our proxy, not the client). For X-Forwarded-For use the
 * LAST hop — the leftmost entries are client-supplied and trivially spoofable.
 */
function getClientIp(req: Request): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const hops = xff.split(",").map((h) => h.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return "unknown";
}

export async function POST(req: Request) {
  try {
    // 1. Rate limit: 5 submissions / 10 min per IP
    const rateLimit = checkRateLimit(getClientIp(req), { windowMs: 10 * 60 * 1000, max: 5 });
    if (!rateLimit.success) {
      return fail("RATE_LIMITED", 429, {
        "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
      });
    }

    // 2. Enforce body size on the actual bytes (Content-Length can be absent/forged)
    const declared = Number(req.headers.get("content-length") ?? 0);
    if (declared > MAX_PAYLOAD_BYTES) return fail("TOO_LARGE", 413);
    const raw = await req.text();
    if (new TextEncoder().encode(raw).length > MAX_PAYLOAD_BYTES) return fail("TOO_LARGE", 413);

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return fail("INVALID", 400);
    }
    if (!body || typeof body !== "object") return fail("INVALID", 400);

    // 3. Honeypot — bots fill hidden fields. Pretend success, store nothing.
    const honeypot = (body as Record<string, unknown>).honeypot;
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 4. Validate
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) return fail("INVALID", 400);

    // 5. Sanitize
    const data = {
      name: sanitizeString(parsed.data.name),
      phone: sanitizeString(parsed.data.phone),
      company: sanitizeString(parsed.data.company) || null,
      service: sanitizeString(parsed.data.service) || null,
      message: sanitizeString(parsed.data.message),
    };

    // 6. Persist (graceful fallback if serverless environment has no writable DB)
    let savedId: string | undefined;
    try {
      const saved = await db.contactMessage.create({ data });
      savedId = saved.id;
    } catch (dbError) {
      console.warn("[contact] DB persist skipped (e.g. read-only serverless filesystem):", dbError);
    }

    // 7. WhatsApp: optional automatic alert (non-blocking) + pre-filled chat link for the visitor
    sendWhatsAppNotification(data).catch((err) => {
      console.error("[contact] WhatsApp notification failed:", err);
    });

    return NextResponse.json(
      { ok: true, id: savedId ?? "direct-wa", whatsappUrl: getWhatsAppDirectUrl(data) },
      { status: 201 }
    );
  } catch (error) {
    console.error("[contact] Server error:", error);
    return fail("SERVER", 500);
  }
}
