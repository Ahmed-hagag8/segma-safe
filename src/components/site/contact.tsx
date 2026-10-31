"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useMemo, useState } from "react";
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
import { useLanguage } from "@/components/site/language-provider";
import {
  Reveal,
  SectionHeading,
  WhatsAppIcon,
} from "@/components/site/primitives";
import { PHONES } from "@/lib/site";
import { whatsappUrl } from "@/lib/i18n";

export function Contact() {
  const [serviceIdx, setServiceIdx] = useState<string>("");
  const { t, lang } = useLanguage();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t.contact.errName),
        phone: z
          .string()
          .regex(/^[0-9+\s-]{9,15}$/, t.contact.errPhone),
        company: z.string().optional(),
        service: z.string().optional(),
        message: z.string().min(10, t.contact.errMessage),
      }),
    [t]
  );

  type FormData = z.infer<typeof schema>;

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
        body: JSON.stringify({
          ...data,
          service:
            serviceIdx === ""
              ? ""
              : t.contact.serviceOptions[Number(serviceIdx)],
        }),
      });
      if (!res.ok) throw new Error("failed");
      toast.success(t.contact.toastOk, {
        description: t.contact.toastOkDesc,
      });
      reset();
      setServiceIdx("");
    } catch {
      toast.error(t.contact.toastErr, {
        description: t.contact.toastErrDesc,
      });
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-surface py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          highlight={t.contact.highlight}
          desc={t.contact.desc}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* info column */}
          <div className="space-y-4">
            <Reveal>
              <InfoCard
                icon={<Phone className="size-6" />}
                title={t.contact.linesTitle}
              >
                <div className="grid grid-cols-1 gap-1.5">
                  {PHONES.map((p) => (
                    <a
                      key={p.raw}
                      href={`tel:${p.intl}`}
                      className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 font-mono text-[15px] font-bold text-foreground transition-colors hover:bg-accent hover:text-brand"
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
                title={t.contact.waTitle}
              >
                <a
                  href={whatsappUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1da851]/10 px-4 py-2.5 text-sm font-extrabold text-[#147a3d] transition-all hover:-translate-y-0.5 hover:bg-[#1da851] hover:text-white dark:text-[#4ade80]"
                >
                  <WhatsAppIcon className="size-5" />
                  {t.contact.waCta}
                </a>
              </InfoCard>
            </Reveal>

            <Reveal delay={0.2}>
              <InfoCard icon={<MapPin className="size-6" />} title={t.contact.addressTitle}>
                <p className="leading-relaxed text-muted-foreground">{t.meta.address}</p>
              </InfoCard>
            </Reveal>

            <Reveal delay={0.3}>
              <InfoCard icon={<Clock className="size-6" />} title={t.contact.hoursTitle}>
                <p className="text-muted-foreground">
                  {t.contact.hoursBody}
                  <span className="mx-2 font-bold text-brand">•</span>
                  {t.contact.hoursEmergency}
                </p>
              </InfoCard>
            </Reveal>
          </div>

          {/* form column */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative h-full overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-xl shadow-ink/10 sm:p-9"
            >
              <span
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-brand via-brand-bright to-brand-dark"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-black text-foreground">
                {t.contact.formTitle}{" "}
                <span className="text-brand">{t.contact.formHighlight}</span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.contact.formSub}
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label={t.contact.nameLabel} error={errors.name?.message}>
                  <Input
                    {...register("name")}
                    placeholder={t.contact.namePh}
                    className="h-12 rounded-xl bg-surface"
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label={t.contact.phoneLabel} error={errors.phone?.message}>
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
                <Field label={t.contact.companyLabel} error={errors.company?.message}>
                  <Input
                    {...register("company")}
                    placeholder={t.contact.companyPh}
                    className="h-12 rounded-xl bg-surface"
                  />
                </Field>
                <Field label={t.contact.serviceLabel}>
                  <Select
                    value={serviceIdx}
                    onValueChange={setServiceIdx}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  >
                    <SelectTrigger className="h-12 w-full rounded-xl bg-surface text-[15px]">
                      <SelectValue placeholder={t.contact.servicePh} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.contact.serviceOptions.map((opt, i) => (
                        <SelectItem key={opt} value={String(i)}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label={t.contact.messageLabel} error={errors.message?.message}>
                    <Textarea
                      {...register("message")}
                      rows={4}
                      placeholder={t.contact.messagePh}
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
                    {t.contact.submitting}
                  </>
                ) : (
                  <>
                    <Send className="size-5 rtl:-scale-x-100" />
                    {t.contact.submit}
                  </>
                )}
              </motion.button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <CheckCircle2 className="size-4 text-brand" />
                {t.contact.privacy}
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
    <div className="flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-brand">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-extrabold text-foreground">{title}</p>
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
      <span className="mb-1.5 block text-sm font-bold text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-bold text-brand">{error}</span>}
    </label>
  );
}
