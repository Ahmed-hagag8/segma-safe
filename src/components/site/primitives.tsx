"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useLanguage } from "@/components/site/language-provider";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.21, 0.65, 0.35, 1] as const;

/* ───────────────  Direction-aware arrow (← in RTL, → in LTR)  ─────────────── */

export function DirArrow({
  className,
  hoverShift = "rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1",
}: {
  className?: string;
  /** shift applied on group hover, direction-aware */
  hoverShift?: string;
}) {
  const { dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return <Arrow aria-hidden="true" className={cn(className, hoverShift)} />;
}

/* ───────────────  Reveal: scroll-triggered entrance  ─────────────── */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  blur = true,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────  WordReveal: kinetic word-by-word headline  ─────────────── */

/** Splits a short heading into words that slide up out of an overflow
 *  mask, one after another. Word-level (never letter-level) so Arabic
 *  shaping inside each word is untouched. */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  /** applied to EVERY word span (color/gradient must live per-word,
   *  background-image does not inherit through the mask spans) */
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className="inline"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className={cn("inline-block will-change-transform", className)}
            variants={{
              hidden: { y: "115%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.55, ease: EASE_OUT },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </motion.span>
  );
}

/* ───────────────  ScrollProgress: brand bar filling with scroll  ─────────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-dark via-brand to-brand-bright rtl:origin-right"
    />
  );
}

/* ───────────────  TiltCard: pointer-tracked 3D tilt + glare  ─────────────── */

export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
}) {
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 65%)`;

  function onPointerMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  }

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("group/tilt relative will-change-transform", className)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}

/* ───────────────  Magnetic: element gently follows the cursor  ─────────────── */

export function Magnetic({
  children,
  className,
  pull = 0.28,
}: {
  children: ReactNode;
  className?: string;
  /** fraction of the cursor offset the element follows (0..1) */
  pull?: number;
}) {
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });

  function onPointerMove(e: MouseEvent<HTMLSpanElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * pull);
    y.set((e.clientY - (r.top + r.height / 2)) * pull);
  }

  return (
    <motion.span
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.span>
  );
}

/* ───────────────  Parallax: subtle scroll-linked drift  ─────────────── */

export function Parallax({
  children,
  className,
  distance = 34,
}: {
  children: ReactNode;
  className?: string;
  /** px traveled (down on entry, up on exit) across the viewport */
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance, -distance]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────  Stagger container / item  ─────────────── */

export function StaggerContainer({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.09, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.21, 0.65, 0.35, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────  Section heading  ─────────────── */

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  desc,
  dark = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  desc?: string;
  dark?: boolean;
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-start"
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-bold tracking-wide",
            dark
              ? "border-brand/40 bg-brand/10 text-brand-bright"
              : "border-brand/25 bg-accent text-brand-dark dark:border-brand/40 dark:text-brand-bright"
          )}
        >
          <span className="size-1.5 rounded-full bg-brand animate-pulse" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08} y={14}>
        <h2
          className={cn(
            "mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.25]",
            dark ? "text-white" : "text-foreground"
          )}
        >
          <WordReveal text={title} />{" "}
          {highlight && (
            <WordReveal
              text={highlight}
              delay={0.14}
              className="text-gradient-brand"
            />
          )}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-4 text-base sm:text-lg leading-relaxed",
              dark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ───────────────  Animated counter  ─────────────── */

export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
    return unsub;
  }, [spring, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/* ───────────────  WhatsApp glyph (official path)  ─────────────── */

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
