"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Headset, ShieldCheck, Sparkles, Timer } from "lucide-react";
import {
  Reveal,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";
import { WHY_POINTS } from "@/lib/site";

const MINI_BADGES = [
  { icon: Headset, label: "دعم فني مستمر" },
  { icon: Sparkles, label: "حلول متكاملة" },
  { icon: ShieldCheck, label: "فريق متخصص" },
  { icon: Timer, label: "خبرة واسعة" },
];

export function WhyUs() {
  return (
    <section id="why" className="scroll-mt-20 bg-surface py-20 lg:py-28">
      <div className="container-site grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* left: heading + civil defense card */}
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="start"
            eyebrow="لماذا نحن؟"
            title="خبرتك في الأمان"
            highlight="مسؤوليتنا"
            desc="نلتزم بتقديم أنظمة متكاملة تضمن السلامة والوقاية لحماية الأرواح والممتلكات وتحقيق بيئة عمل آمنة."
          />

          <Reveal delay={0.25}>
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-2xl shadow-ink/30">
              <div
                className="absolute -end-16 -top-16 size-52 rounded-full bg-brand/30 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-5">
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand shadow-lg shadow-brand/40"
                >
                  <ShieldCheck className="size-9" />
                </motion.span>
                <div>
                  <p className="text-xl font-black">معتمدون من الحماية المدنية</p>
                  <p className="mt-1 text-sm text-white/60">
                    جميع أعمالنا تستوفي اشتراطات الجهات الرقابية المصرية
                  </p>
                </div>
              </div>
              <div className="relative mt-7 grid grid-cols-2 gap-3">
                {MINI_BADGES.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
                  >
                    <b.icon className="size-5 shrink-0 text-brand-bright" />
                    <span className="text-sm font-bold">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* right: reasons */}
        <StaggerContainer className="space-y-4">
          {WHY_POINTS.map((point, i) => (
            <StaggerItem key={point.title}>
              <motion.div
                whileHover={{ x: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group flex gap-5 rounded-3xl border border-border bg-white p-6 shadow-sm transition-all hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="relative flex size-13 shrink-0 items-center justify-center rounded-2xl bg-accent font-mono text-xl font-bold text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-black text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">
                    {point.desc}
                  </p>
                </div>
                <CheckCircle2 className="ms-auto mt-1 size-5 shrink-0 text-brand opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
