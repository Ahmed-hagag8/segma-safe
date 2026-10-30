"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Flame, Phone, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import type { MouseEvent } from "react";
import { useLanguage } from "@/components/site/language-provider";
import { Counter, DirArrow, WhatsAppIcon } from "@/components/site/primitives";
import { PHONES, STATS } from "@/lib/site";
import { whatsappUrl } from "@/lib/i18n";

const easeOut = [0.21, 0.65, 0.35, 1] as const;

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const { t, lang } = useLanguage();

  const imgX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const cardX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const cardY = useTransform(sy, [-0.5, 0.5], [16, -16]);

  function onPointerMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      id="home"
      onPointerMove={onPointerMove}
      className="relative overflow-hidden bg-ink pt-[72px] text-white"
      aria-label={t.hero.introAria}
    >
      {/* backdrop: grid + orbs + ribbons */}
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="absolute -top-32 -start-32 size-[480px] rounded-full bg-brand/25 blur-[130px] animate-orb"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -end-40 size-[520px] rounded-full bg-brand-bright/15 blur-[140px] animate-orb [animation-delay:-6s]"
        aria-hidden="true"
      />
      {/* diagonal red ribbons echoing the logo */}
      <div
        className="absolute -top-10 end-[-80px] h-[220px] w-[420px] rotate-12 bg-gradient-to-l from-brand to-brand-dark opacity-25 blur-sm [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-60px] start-[-60px] h-[190px] w-[380px] -rotate-12 bg-gradient-to-r from-brand-dark to-transparent opacity-20 [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]"
        aria-hidden="true"
      />
      {/* floating embers */}
      <Embers />

      <div className="container-site relative grid min-h-[calc(100svh-72px)] items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        {/* ── copy ── */}
        <div className="text-center lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-bold text-brand-bright backdrop-blur-sm"
          >
            <Award className="size-4" />
            {t.hero.badge}
            <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
              <Star className="size-3.5 fill-current" />
              <Star className="size-3.5 fill-current" />
              <Star className="size-3.5 fill-current" />
            </span>
          </motion.div>

          <h1 className="mt-6 text-4xl font-black leading-[1.3] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.28]">
            <Line delay={0.12}>{t.hero.l1}</Line>
            <Line delay={0.24}>
              <span className="relative inline-block text-brand">
                {t.hero.hl}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.7, ease: easeOut }}
                  className="absolute inset-x-0 -bottom-1 h-1.5 origin-left rounded-full bg-brand/70 rtl:origin-right"
                />
              </span>{" "}
              {t.hero.l2b}
            </Line>
            <Line delay={0.36} className="text-white/90">
              {t.hero.l3}
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: easeOut }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg lg:mx-0"
          >
            {t.hero.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6, ease: easeOut }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
          >
            <a
              href="#contact"
              className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-xl bg-brand px-7 py-3.5 text-base font-extrabold text-white shadow-xl shadow-brand/40 transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand/60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {t.hero.ctaPrimary}
              <DirArrow className="size-5 transition-transform" />
            </a>
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-extrabold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand/15"
            >
              <WhatsAppIcon className="size-5 text-[#25D366]" />
              {t.hero.ctaWhatsapp}
            </a>
          </motion.div>

          {/* quick phone chip */}
          <motion.a
            href={`tel:${PHONES[0].intl}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.78, duration: 0.6 }}
            className="mt-6 inline-flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
          >
            <span className="relative flex size-8 items-center justify-center rounded-full bg-brand/15 animate-siren">
              <Phone className="size-4 text-brand-bright" />
            </span>
            {t.nav.callUs}
            <span dir="ltr" className="font-mono font-bold text-white">
              {PHONES[0].raw}
            </span>
          </motion.a>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: easeOut }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <div
                key={t.hero.stats[i]}
                className="flex flex-col items-center gap-1 bg-ink/80 px-3 py-5 backdrop-blur-sm transition-colors hover:bg-brand/20"
              >
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-mono text-2xl font-bold text-brand-bright sm:text-3xl"
                />
                <dt className="text-center text-xs font-semibold leading-4 text-white/60">
                  {t.hero.stats[i]}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: easeOut }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          {/* main frame */}
          <motion.div
            style={{ x: imgX, y: imgY }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl shadow-black/60"
          >
            <Image
              src="/images/machine-diesel.jpg"
              alt={t.misc.heroImgAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
            {/* bottom caption */}
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-ink/70 px-4 py-3 backdrop-blur-md">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                <Flame className="size-5" />
              </span>
              <div className="text-sm">
                <p className="font-extrabold">{t.hero.captionTitle}</p>
                <p className="text-white/60">{t.hero.captionSub}</p>
              </div>
            </div>
          </motion.div>

          {/* floating card 1 — civil defense */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            className="absolute -top-5 -start-3 sm:-start-8 animate-float-y"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-charcoal/90 px-4 py-3 shadow-xl shadow-black/50 backdrop-blur-md">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand/15 text-brand-bright">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold">{t.hero.float1Title}</p>
                <p className="text-sm font-extrabold text-brand-bright">
                  {t.hero.float1Sub}
                </p>
              </div>
            </div>
          </motion.div>

          {/* floating card 2 — rating */}
          <motion.div
            style={{ x: cardX, y: cardY }}
            className="absolute -bottom-6 -end-2 sm:-end-6 animate-float-y [animation-delay:-3s]"
          >
            <div className="rounded-2xl border border-white/15 bg-charcoal/90 px-5 py-4 shadow-xl shadow-black/50 backdrop-blur-md">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-1.5 text-sm font-bold">
                {t.hero.float2Title}{" "}
                <span className="text-brand-bright">{t.hero.float2Sub}</span>
              </p>
              <p className="text-xs text-white/55">{t.hero.float2Note}</p>
            </div>
          </motion.div>

          {/* pulsing red dot accent */}
          <div className="absolute top-1/2 -end-5 hidden lg:block" aria-hidden="true">
            <span className="relative flex size-4">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-4 rounded-full bg-brand" />
            </span>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label={t.hero.scrollAria}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white lg:flex"
      >
        <span className="text-xs font-bold">{t.hero.scrollCue}</span>
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border-2 border-current p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-brand-bright"
          />
        </span>
      </motion.a>
    </section>
  );
}

/* staggered headline line */
function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className={className}>
      <motion.span
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.65, ease: easeOut }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* drifting ember particles */
function Embers() {
  const embers = [
    { left: "8%", top: "22%", d: 0, s: 5 },
    { left: "16%", top: "68%", d: 2.2, s: 4 },
    { left: "30%", top: "38%", d: 1.1, s: 6 },
    { left: "46%", top: "14%", d: 3, s: 3 },
    { left: "58%", top: "74%", d: 0.6, s: 5 },
    { left: "70%", top: "26%", d: 2.6, s: 4 },
    { left: "82%", top: "55%", d: 1.8, s: 6 },
    { left: "90%", top: "34%", d: 0.3, s: 3 },
    { left: "24%", top: "86%", d: 2.9, s: 4 },
    { left: "64%", top: "8%", d: 1.5, s: 3 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {embers.map((e, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-bright/70"
          style={{ left: e.left, top: e.top, width: e.s, height: e.s }}
          animate={{
            y: [0, -26, 0],
            opacity: [0.15, 0.85, 0.15],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5.5,
            delay: e.d,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
