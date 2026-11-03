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
 * Automatic WhatsApp alert to the company via CallMeBot gateway.
 */
export async function sendCallMeBotNotification(data: ContactNotificationPayload): Promise<boolean> {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return false;

  const phone = (process.env.CALLMEBOT_PHONE || env.WHATSAPP_NOTIFY_PHONE).replace(/[^0-9]/g, "");
  const text = encodeURIComponent(formatWhatsAppMessage(data));

  try {
    const res = await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apiKey}`,
      { signal: AbortSignal.timeout(10000) }
    );
    if (!res.ok) {
      console.error("[callmebot] Rejected with status:", res.status);
    }
    return res.ok;
  } catch (err) {
    console.error("[callmebot] Notification failed:", err);
    return false;
  }
}

/**
 * Sends an automated WhatsApp alert to the company via CallMeBot (primary)
 * or Meta WhatsApp Cloud API (secondary, if configured).
 */
export async function sendWhatsAppNotification(data: ContactNotificationPayload): Promise<boolean> {
  // 1. Prioritize CallMeBot if API key is provided
  if (process.env.CALLMEBOT_API_KEY) {
    return sendCallMeBotNotification(data);
  }

  // 2. Fallback to Meta Cloud API if configured
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
