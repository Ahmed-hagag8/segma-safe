"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Headset, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { useLanguage } from "@/components/site/language-provider";
import {
  Reveal,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";

const MINI_BADGE_ICONS = [Headset, Sparkles, ShieldCheck, Timer];

export function WhyUs() {
  const { t } = useLanguage();

  return (
    <section id="why" className="scroll-mt-20 bg-surface py-20 lg:py-28">
      <div className="container-site grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* left: heading + civil defense card */}
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="start"
            eyebrow={t.why.eyebrow}
            title={t.why.title}
            highlight={t.why.highlight}
            desc={t.why.desc}
          />

          <Reveal delay={0.25}>
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-2xl shadow-ink/30 dark:border dark:border-white/15">
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
                  <p className="text-xl font-black">{t.why.cardTitle}</p>
                  <p className="mt-1 text-sm text-white/60">
                    {t.why.cardSub}
                  </p>
                </div>
              </div>
              <div className="relative mt-7 grid grid-cols-2 gap-3">
                {t.why.miniBadges.map((label, i) => {
                  const Icon = MINI_BADGE_ICONS[i];
                  return (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
                    >
                      <Icon className="size-5 shrink-0 text-brand-bright" />
                      <span className="text-sm font-bold">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* right: reasons */}
        <StaggerContainer className="space-y-4">
          {t.why.points.map((point, i) => (
            <StaggerItem key={point.title}>
              <motion.div
                whileHover={{ x: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group flex gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="relative flex size-13 shrink-0 items-center justify-center rounded-2xl bg-accent font-mono text-xl font-bold text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-black text-foreground">
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
