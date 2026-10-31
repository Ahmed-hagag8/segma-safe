"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/components/site/language-provider";
import { DirArrow, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { SERVICE_ICONS } from "@/lib/site";
import type { LucideIcon } from "lucide-react";

const noopSubscribe = () => () => {};

type ServiceEntry = { title: string; desc: string; tags: string[] };

/* ─────────────────────────────────────────────────────────────────────────
   Services — a logo showcase.

   The site logo sits pinned at the center of the viewport. As the user
   scrolls, the 8 service cards take turns sliding in beside it: the first
   sweeps in from the RIGHT, rests next to the logo, then slides back out;
   the next arrives from the LEFT, and so on — strictly alternating,
   scroll-driven, in both AR (RTL) and EN (LTR). Reduced-motion users get a
   plain static grid instead.
   ───────────────────────────────────────────────────────────────────────── */

export function Services() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const reduced = mounted && !!prefersReduced;

  return (
    <section
      id="services"
      className="relative scroll-mt-20 bg-ink py-20 text-white lg:py-28"
    >
      {/* ambience — grid texture + blobs clipped in their own layer so
          position:sticky inside the section keeps working */}
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 start-1/4 size-[420px] rounded-full bg-brand/15 blur-[130px]" />
        <div className="absolute bottom-0 -end-32 size-[380px] rounded-full bg-brand-dark/20 blur-[120px]" />
      </div>

      <div className="container-site relative">
        <SectionHeading
          dark
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          highlight={t.services.highlight}
          desc={t.services.desc}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-bold uppercase tracking-widest text-white/50"
        >
          <ChevronDown
            className="size-4 animate-bounce text-brand-bright"
            aria-hidden="true"
          />
          {t.services.scrollHint}
        </motion.p>

        {reduced ? (
          /* reduced motion: plain static grid, no pinning */
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.items.map((service, i) => (
              <div key={service.title} className="h-full">
                <ServiceCard
                  icon={SERVICE_ICONS[i]}
                  index={i}
                  total={t.services.items.length}
                  title={service.title}
                  desc={service.desc}
                  tags={service.tags}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <PinnedShowcase items={t.services.items} />
        )}

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-brand px-7 py-3.5 text-base font-extrabold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            {t.services.cta}
            <DirArrow className="size-5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── pinned logo + sliding cards ─────────────────────────────────────── */

function PinnedShowcase({ items }: { items: ServiceEntry[] }) {
  const { t } = useLanguage();
  const n = items.length;
  const stageRef = useRef<HTMLDivElement>(null);

  /* 0 → stage top hits viewport top (pin starts), 1 → stage bottom
     reaches viewport bottom (pin releases) */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  return (
    /* each service owns a 68svh scroll segment + one viewport of run-out */
    <div
      ref={stageRef}
      style={{ height: `calc(${n} * 68svh + 100svh)` }}
      className="relative"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ── the logo, always center stage ── */}
        <div className="absolute left-1/2 top-[9svh] z-20 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div
              className="absolute -inset-10 rounded-full bg-brand/20 blur-[70px]"
              aria-hidden="true"
            />
            <div className="relative rounded-[1.6rem] bg-white p-2.5 shadow-[0_35px_80px_-25px_rgba(0,0,0,0.75)] ring-1 ring-white/25">
              <span className="relative block size-[min(170px,40vw)] overflow-hidden rounded-[1.1rem] lg:size-[min(280px,24vw)]">
                <Image
                  src="/images/logo.jpg"
                  alt={t.footer.logoAlt}
                  fill
                  sizes="(max-width: 1024px) 40vw, 280px"
                  className="object-cover"
                />
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── the cards: even indexes from the right, odd from the left ── */}
        {items.map((service, i) => (
          <SlideCard
            key={service.title}
            i={i}
            n={n}
            progress={scrollYProgress}
            title={service.title}
            desc={service.desc}
            tags={service.tags}
            icon={SERVICE_ICONS[i]}
          />
        ))}
      </div>
    </div>
  );
}

/* ── one card: slides in from its side, rests, slides back out ───────── */

function SlideCard({
  i,
  n,
  progress,
  title,
  desc,
  tags,
  icon,
}: {
  i: number;
  n: number;
  progress: MotionValue<number>;
  title: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
}) {
  const seg = 1 / n;
  const s0 = i * seg;
  const fromRight = i % 2 === 0;

  /* enter (first 40% of the segment) → rest → exit (last 40%) */
  const range = [s0, s0 + 0.4 * seg, s0 + 0.6 * seg, s0 + seg];
  const edge = fromRight ? "118vw" : "-118vw";
  const x = useTransform(progress, range, [edge, "0vw", "0vw", edge]);
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const scale = useTransform(progress, range, [0.9, 1, 1, 0.94]);
  const rotate = useTransform(
    progress,
    range,
    fromRight ? [5, 0, 0, -3] : [-5, 0, 0, 3]
  );

  return (
    <motion.div
      style={{ x, opacity, scale, rotate }}
      className="absolute inset-0 z-10"
    >
      <ServiceCard
        icon={icon}
        index={i}
        total={n}
        title={title}
        desc={desc}
        tags={tags}
        className={cn(
          /* mobile: centered under the logo */
          "absolute inset-x-0 mx-auto top-[42svh] h-[min(400px,48svh)] w-[min(320px,88vw)]",
          /* desktop: rests beside the logo on its entering side */
          "lg:top-[calc(50%-min(235px,28svh))] lg:h-[min(470px,56svh)] lg:w-[min(330px,25vw)]",
          fromRight
            ? "lg:left-[calc(50%+min(140px,12vw)+2.5rem)] lg:right-auto"
            : "lg:left-auto lg:right-[calc(50%+min(140px,12vw)+2.5rem)]"
        )}
      />
    </motion.div>
  );
}

/* ── shared card body (pinned showcase + reduced-motion grid) ────────── */

function ServiceCard({
  icon: Icon,
  index,
  total,
  title,
  desc,
  tags,
  className,
}: {
  icon: LucideIcon;
  index: number;
  total: number;
  title: string;
  desc: string;
  tags: string[];
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-charcoal/85 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/30">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <span
          dir="ltr"
          className="font-mono text-xs font-bold text-white/35"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-black leading-snug">{title}</h3>
      <span
        className="mt-3 block h-0.5 w-10 rounded-full bg-gradient-to-l from-brand to-brand-bright"
        aria-hidden="true"
      />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
        {desc}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            dir="auto"
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <span
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-l from-brand to-brand-bright"
        aria-hidden="true"
      />
    </article>
  );
}
