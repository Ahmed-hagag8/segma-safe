import { env } from "@/lib/env";

export interface ContactNotificationPayload {
  name: string;
  phone: string;
  company?: string | null;
  service?: string | null;
  message: string;
}

export function formatWhatsAppMessage(data: ContactNotificationPayload): string {
  const parts = [
    `*🚨 استفسار جديد — سيجما سيف (SIGMA SAFE)*`,
    ``,
    `👤 *الاسم:* ${data.name}`,
    `📱 *الهاتف:* ${data.phone}`,
  ];

  if (data.company) {
    parts.push(`🏢 *الشركة:* ${data.company}`);
  }

  if (data.service) {
    parts.push(`⚙️ *الخدمة المطلوبة:* ${data.service}`);
  }

  parts.push(``, `📝 *الرسالة:*`, data.message);

  return parts.join("\n");
}

export function getWhatsAppDirectUrl(data: ContactNotificationPayload): string {
  const targetPhone = env.WHATSAPP_NOTIFY_PHONE.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(formatWhatsAppMessage(data));
  return `https://wa.me/${targetPhone}?text=${text}`;
}

/**
 * Automatic server-side alert via Meta WhatsApp Cloud API (only if configured).
 * NOTE: Meta delivers free-form text only inside a 24h customer-service window;
 * outside it you must send an approved *template* message. Failures are logged.
 * Returns false when not configured or on failure.
 */
export async function sendWhatsAppNotification(data: ContactNotificationPayload): Promise<boolean> {
  if (!env.WHATSAPP_API_TOKEN || !env.WHATSAPP_PHONE_NUMBER_ID) return false;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: env.WHATSAPP_NOTIFY_PHONE.replace(/[^0-9]/g, ""),
          type: "text",
          text: { body: formatWhatsAppMessage(data) },
        }),
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) {
      console.error("[whatsapp] Cloud API rejected message:", res.status, await res.text());
    }
    return res.ok;
  } catch (err) {
    console.error("[whatsapp] Cloud API request failed:", err);
    return false;
  }
}
