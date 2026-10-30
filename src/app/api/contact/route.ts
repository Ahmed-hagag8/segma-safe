import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().regex(/^[0-9+\s-]{9,15}$/),
  company: z.string().max(160).optional(),
  service: z.string().max(160).optional(),
  message: z.string().min(10).max(4000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "بيانات غير صالحة", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const saved = await db.contactMessage.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        company: parsed.data.company || null,
        service: parsed.data.service || null,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "خطأ في الخادم — حاول لاحقاً" },
      { status: 500 }
    );
  }
}
