"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Facebook,
  Loader2,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Reveal,
  SectionHeading,
  WhatsAppIcon,
} from "@/components/site/primitives";
import {
  ADDRESS,
  FACEBOOK_URL,
  PHONES,
  SERVICE_OPTIONS,
  WHATSAPP_URL,
} from "@/lib/site";

const schema = z.object({
  name: z.string().min(2, "من فضلك أدخل الاسم بالكامل"),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{9,15}$/, "رقم الهاتف غير صحيح"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "من فضلك اكتب تفاصيل أكثر عن احتياجك (10 أحرف على الأقل)"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [service, setService] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service }),
      });
      if (!res.ok) throw new Error("failed");
      toast.success("تم إرسال طلبك بنجاح!", {
        description: "سيتواصل معك فريقنا الفني في أقرب وقت — شكراً لثقتك في سيجما سيف.",
      });
      reset();
      setService("");
    } catch {
      toast.error("تعذر إرسال الطلب", {
        description: "من فضلك حاول مرة أخرى أو اتصل بنا مباشرة على أرقامنا.",
      });
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-surface py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="تواصل معنا"
          title="فريقنا جاهز"
          highlight="لخدمتك الآن"
          desc="أرسل طلبك وسيتواصل معك مهندسونا، أو اتصل مباشرة على خطوط الخدمة الأربعة."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* info column */}
          <div className="space-y-4">
            <Reveal>
              <InfoCard
                icon={<Phone className="size-6" />}
                title="خطوط الخدمة المباشرة"
              >
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {PHONES.map((p) => (
                    <a
                      key={p.raw}
                      href={`tel:${p.intl}`}
                      className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 font-mono text-[15px] font-bold text-ink transition-colors hover:bg-accent hover:text-brand"
                    >
                      <Phone className="size-4 text-brand transition-transform group-hover:rotate-12" />
                      <span dir="ltr">{p.raw}</span>
                    </a>
                  ))}
                </div>
              </InfoCard>
            </Reveal>

            <Reveal delay={0.1}>
              <InfoCard
                icon={<WhatsAppIcon className="size-6 text-[#1da851]" />}
                title="واتساب — رد فوري"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1da851]/10 px-4 py-2.5 text-sm font-extrabold text-[#147a3d] transition-all hover:-translate-y-0.5 hover:bg-[#1da851] hover:text-white"
                >
                  <WhatsAppIcon className="size-5" />
                  اضغط لبدء المحادثة
                </a>
              </InfoCard>
            </Reveal>

            <Reveal delay={0.2}>
              <InfoCard icon={<MapPin className="size-6" />} title="المقر الرئيسي">
                <p className="leading-relaxed text-muted-foreground">{ADDRESS}</p>
              </InfoCard>
            </Reveal>

            <Reveal delay={0.3}>
              <InfoCard icon={<Clock className="size-6" />} title="مواعيد العمل">
                <p className="text-muted-foreground">
                  السبت — الخميس: 9 صباحاً حتى 6 مساءً
                  <span className="mx-2 font-bold text-brand">•</span>
                  طوارئ على مدار الساعة عبر واتساب
                </p>
              </InfoCard>
            </Reveal>

            <Reveal delay={0.4}>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1877F2]/40 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#1877F2]/10 text-[#1877F2] transition-colors group-hover:bg-[#1877F2] group-hover:text-white">
                  <Facebook className="size-6" />
                </span>
                <div>
                  <p className="font-extrabold text-ink">تابعنا على فيسبوك</p>
                  <p className="text-sm text-muted-foreground">
                    سيجما سيف للمقاولات العامة — آخر أعمالنا وعروضنا
                  </p>
                </div>
              </a>
            </Reveal>
          </div>

          {/* form column */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative h-full overflow-hidden rounded-[2rem] border border-border bg-white p-7 shadow-xl shadow-ink/10 sm:p-9"
            >
              <span
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-brand via-brand-bright to-brand-dark"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-black text-ink">
                اطلب <span className="text-brand">معاينة مجانية</span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                املأ البيانات وسيتواصل معك مهندس مختص لتحديد موعد الزيارة.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="الاسم بالكامل *" error={errors.name?.message}>
                  <Input
                    {...register("name")}
                    placeholder="مثال: م. أحمد محمد"
                    className="h-12 rounded-xl bg-surface"
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label="رقم الهاتف *" error={errors.phone?.message}>
                  <Input
                    {...register("phone")}
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    placeholder="01xxxxxxxxx"
                    className="h-12 rounded-xl bg-surface text-left font-mono"
                    aria-invalid={!!errors.phone}
                  />
                </Field>
                <Field label="اسم المنشأة / الشركة" error={errors.company?.message}>
                  <Input
                    {...register("company")}
                    placeholder="اختياري"
                    className="h-12 rounded-xl bg-surface"
                  />
                </Field>
                <Field label="نوع الخدمة المطلوبة">
                  <input type="hidden" {...register("service")} />
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-12 w-full rounded-xl bg-surface text-[15px]">
                      <SelectValue placeholder="اختر الخدمة المناسبة" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="تفاصيل الطلب *" error={errors.message?.message}>
                    <Textarea
                      {...register("message")}
                      rows={4}
                      placeholder="اكتب لنا عن منشأتك ونوع النظام المطلوب (مساحة تقريبية، عدد الأدوار…)"
                      className="resize-none rounded-xl bg-surface"
                      aria-invalid={!!errors.message}
                    />
                  </Field>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="group relative mt-7 inline-flex h-13 w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-brand text-lg font-extrabold text-white shadow-xl shadow-brand/30 transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    جارٍ الإرسال…
                  </>
                ) : (
                  <>
                    <Send className="size-5 -scale-x-100" />
                    أرسل الطلب الآن
                  </>
                )}
              </motion.button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <CheckCircle2 className="size-4 text-brand" />
                بياناتك محفوظة بسرية تامة ولن تُستخدم إلا للتواصل معك
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-3xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-brand">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-extrabold text-ink">{title}</p>
        <div className="mt-2 text-[15px]">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-bold text-brand">{error}</span>}
    </label>
  );
}
