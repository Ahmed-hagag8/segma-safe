"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLanguage } from "@/components/site/language-provider";
import {
  DirArrow,
  EASE_OUT,
  Magnetic,
  SectionHeading,
  TiltCard,
} from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { SERVICE_ICONS } from "@/lib/site";
import type { LucideIcon } from "lucide-react";

const noopSubscribe = () => () => {};

/* real hover pointer (desktop) — touch devices tilt nothing */
const hoverQuery =
  typeof window !== "undefined"
    ? window.matchMedia("(hover: hover) and (pointer: fine)")
    : null;

function subscribeHover(onChange: () => void) {
  hoverQuery?.addEventListener("change", onChange);
  return () => hoverQuery?.removeEventListener("change", onChange);
}

type ServiceEntry = { title: string; desc: string; tags: string[] };

/* ─────────────────────────────────────────────────────────────────────────
   Services — "The Ignition Sequence".

   The section behaves like a fire-alarm circuit coming online:
   • a canvas of live embers drifts up behind the grid,
   • a fuse line under the heading burns along with the user's scroll,
   • every service card IGNITES as it enters the viewport — a fire-scan
     sweeps across it, the icon pops with a spark burst and the card
     flashes its ring once,
   • cards carry a pointer 3D tilt with glare, and on hover a rotating
     ember "circuit ring" traces their border.

   Everything is direction-neutral (identical in AR RTL and EN LTR);
   reduced-motion users get a plain static grid.
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
  const items = t.services.items;

  /* tilt + glare only where a real hover pointer exists */
  const canHover = useSyncExternalStore(
    subscribeHover,
    () => hoverQuery?.matches ?? false,
    () => false
  );

  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-20 text-white lg:py-28"
    >
      {/* ambience — blueprint grid, drifting embers and heat blobs */}
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <EmberCanvas />
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

        {/* the fuse: burns along with the scroll while the section is in view */}
        <FuseLine reduced={reduced} />

        {reduced ? (
          /* reduced motion: plain static grid */
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((service, i) => (
              <div key={service.title} className="h-full">
                <ServiceCard
                  icon={SERVICE_ICONS[i]}
                  index={i}
                  total={items.length}
                  title={service.title}
                  desc={service.desc}
                  tags={service.tags}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((service, i) => (
              <IgnitionCard
                key={service.title}
                i={i}
                total={items.length}
                icon={SERVICE_ICONS[i]}
                service={service}
                tilt={canHover}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Magnetic pull={0.16}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-brand px-7 py-3.5 text-base font-extrabold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              {t.services.cta}
              <DirArrow className="size-5 transition-transform" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ── live embers rising behind the grid (paused offscreen) ───────────── */

function EmberCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement as HTMLElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.innerWidth < 640 ? 30 : 58;

    type Ember = {
      x: number;
      y: number;
      r: number;
      vy: number;
      amp: number;
      freq: number;
      phase: number;
      hue: number;
      a: number;
      fl: number;
    };

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let last = 0;
    let embers: Ember[] = [];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (anywhere: boolean): Ember => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 14,
      r: 0.8 + Math.random() * 2.1,
      vy: 14 + Math.random() * 30, // px/s upward
      amp: 6 + Math.random() * 18, // horizontal sway
      freq: 0.4 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      hue: 12 + Math.random() * 30, // red → orange
      a: 0.35 + Math.random() * 0.45,
      fl: 2 + Math.random() * 3, // flicker speed
    });

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const time = now / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of embers) {
        p.y -= p.vy * dt;
        if (p.y < -16) Object.assign(p, spawn(false));
        const x = p.x + Math.sin(time * p.freq + p.phase) * p.amp;
        const alpha = p.a * (0.62 + 0.38 * Math.sin(time * p.fl + p.phase * 1.7));
        // soft halo
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${alpha * 0.16})`;
        ctx.arc(x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        // bright core
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 96%, 62%, ${alpha})`;
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    embers = Array.from({ length: count }, () => spawn(true));

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_86%,transparent)]"
    />
  );
}

/* ── burning fuse: fills with scroll, ember at the tip ───────────────── */

function FuseLine({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  /* 0 → fuse enters the viewport, 1 → fuse reaches the vertical middle */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const burn = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });
  const tip = useTransform(burn, (v) => `${v * 100}%`);

  if (reduced) return null; // purely decorative

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative mx-auto mt-10 h-[3px] w-full max-w-2xl"
    >
      <div className="absolute inset-0 rounded-full bg-white/10" />
      <motion.div
        style={{ scaleX: burn }}
        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand-dark via-brand to-brand-bright rtl:origin-right"
      />
      <motion.span
        style={{ insetInlineStart: tip }}
        className="absolute top-1/2 z-10 -ms-1.5 size-3 -translate-y-1/2 rounded-full bg-brand-bright shadow-[0_0_18px_6px_rgba(244,63,63,0.5)]"
      />
    </div>
  );
}

/* ── one card: entrance ignition + tilt + hover circuit ring ─────────── */

function IgnitionCard({
  i,
  total,
  icon,
  service,
  tilt,
}: {
  i: number;
  total: number;
  icon: LucideIcon;
  service: ServiceEntry;
  tilt: boolean;
}) {
  const col = i % 4;
  const delay = col * 0.09;

  const card = (
    <ServiceCard
      icon={icon}
      index={i}
      total={total}
      title={service.title}
      desc={service.desc}
      tags={service.tags}
      igniteDelay={delay}
      className="h-full"
    />
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {
          opacity: 0,
          y: 44,
          scale: 0.95,
          filter: "blur(10px)",
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: EASE_OUT, delay },
        },
      }}
      className="h-full"
    >
      {tilt ? (
        <TiltCard max={7} className="h-full rounded-3xl">
          {card}
        </TiltCard>
      ) : (
        <div className="h-full rounded-3xl">{card}</div>
      )}
    </motion.div>
  );
}

/* ── shared card body (igniting build + reduced-motion static grid) ──── */

function ServiceCard({
  icon: Icon,
  index,
  total,
  title,
  desc,
  tags,
  igniteDelay,
  className,
}: {
  icon: LucideIcon;
  index: number;
  total: number;
  title: string;
  desc: string;
  tags: string[];
  /** stagger delay (s) synced with the card's entrance — omit for the static grid */
  igniteDelay?: number;
  className?: string;
}) {
  const fx = igniteDelay !== undefined;
  const d = igniteDelay ?? 0;

  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-charcoal/85 shadow-2xl shadow-black/40 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-brand/45 hover:shadow-[0_20px_60px_-15px_rgba(212,16,23,0.35)]",
        className
      )}
    >
      {/* ── one-shot ignition FX (animated build only) ── */}
      {fx && (
        <>
          {/* ring flash the moment the card "catches fire" */}
          <motion.span
            variants={{
              hidden: { opacity: 0.85 },
              show: {
                opacity: 0,
                transition: { duration: 1.3, delay: d + 0.15, ease: "easeOut" },
              },
            }}
            className="pointer-events-none absolute -inset-px z-30 rounded-3xl ring-2 ring-brand-bright/70"
            aria-hidden="true"
          />
          {/* fire-scan sweep washing across the card */}
          <span
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl"
            aria-hidden="true"
          >
            <motion.span
              variants={{
                hidden: { x: "-130%", opacity: 0 },
                show: {
                  x: "430%",
                  opacity: [0, 0.85, 0.8, 0],
                  transition: {
                    x: { duration: 1.15, delay: d + 0.22, ease: "easeInOut" },
                    opacity: { duration: 1.15, delay: d + 0.22 },
                  },
                },
              }}
              className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-brand-bright/30 to-transparent"
            />
          </span>
        </>
      )}

      {/* rotating ember circuit ring (hover) + inner mask */}
      <span
        className="ignite-ring pointer-events-none absolute -inset-px z-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-px z-0 rounded-[calc(1.5rem-1px)] bg-charcoal/95"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="relative">
            {/* spark burst */}
            {fx && (
              <motion.span
                variants={{
                  hidden: { scale: 0.5, opacity: 0.9 },
                  show: {
                    scale: 2.1,
                    opacity: 0,
                    transition: {
                      duration: 0.9,
                      delay: d + 0.3,
                      ease: "easeOut",
                    },
                  },
                }}
                className="absolute inset-0 rounded-2xl ring-2 ring-brand-bright/80"
                aria-hidden="true"
              />
            )}
            <motion.span
              variants={{
                hidden: { scale: 0.35, rotate: -16 },
                show: {
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: d + 0.1,
                  },
                },
              }}
              className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/30 transition-shadow duration-500 group-hover/card:shadow-[0_0_28px_4px_rgba(244,63,63,0.45)]"
            >
              <Icon className="size-7" aria-hidden="true" />
            </motion.span>
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
      </div>

      <span
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-l from-brand to-brand-bright"
        aria-hidden="true"
      />
    </article>
  );
}
