"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Expand,
  Flame,
  Hand,
  Pause,
  Play,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { useLanguage } from "@/components/site/language-provider";
import { EASE_OUT, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { GALLERY_IMAGES } from "@/lib/site";

const FLIP_EASE = [0.32, 0.72, 0, 1] as const;
const FLIP_DEG = 168;
const AUTOPLAY_MS = 6500;
const N = GALLERY_IMAGES.length;

/* hydration gate: false on the server, true after hydration */
const noopSubscribe = () => () => {};

/* ─────────────────────────────────────────────────────────────────────────
   "Our Work" — a sliding book.

   The album renders as an open book: one page carries the project photo,
   the other its story. Navigating physically FLIPS the photo page around
   the spine (3D rotateY with a visible paper backface), direction-aware
   for AR (RTL) and EN (LTR). Autoplay with progress, drag/swipe, keyboard
   arrows, thumbnail jump nav and a lightbox with its own navigation.
   ───────────────────────────────────────────────────────────────────────── */

export function Gallery() {
  const { t, dir } = useLanguage();
  const prefersReduced = useReducedMotion();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const reduced = mounted && !!prefersReduced;

  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(1); // last action: 1 = next, -1 = prev
  const [manualPause, setManualPause] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const draggedRef = useRef(false);

  const isRtl = dir === "rtl";
  /* end rotation of a forward flip: LTR pages turn with a negative
     rotateY (free edge lifts toward the viewer), RTL pages mirror it */
  const flipSign = isRtl ? 1 : -1;

  const paused =
    manualPause || hovering || focusWithin || open !== null || reduced;

  const go = useCallback((s: number) => {
    setStep(s);
    setIndex((i) => (i + s + N) % N);
  }, []);

  const goTo = useCallback((i: number) => {
    if (i === indexRef.current) return;
    setStep(i > indexRef.current ? 1 : -1);
    setIndex(i);
  }, []);

  /* autoplay — the progress hairline IS the timer: when its animation
     completes, the book flips to the next project. The animation is
     recreated on index/pause changes, so manual navigation and resume
     always restart the timer and the bar in perfect sync. */
  const progress = useMotionValue(0);
  useEffect(() => {
    if (reduced) return;
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: AUTOPLAY_MS / 1000,
      ease: "linear",
      onComplete: () => go(1),
    });
    if (paused) controls.pause();
    return () => controls.stop();
  }, [index, paused, reduced, go, progress]);

  /* keyboard flipping on the book itself */
  const onBookKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (open !== null) return;
    if (e.key === "ArrowRight") go(isRtl ? -1 : 1);
    else if (e.key === "ArrowLeft") go(isRtl ? 1 : -1);
  };

  /* lightbox: escape/arrows + body scroll lock */
  const lightGo = useCallback(
    (s: number) => {
      go(s);
      setOpen((o) => (o === null ? o : (o + s + N) % N));
    },
    [go]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") lightGo(isRtl ? -1 : 1);
      else if (e.key === "ArrowLeft") lightGo(isRtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, lightGo, isRtl]);

  /* 3D page-flip variants (direction-aware via AnimatePresence custom) */
  const pageVariants: Variants = {
    enter: (s: number) =>
      reduced
        ? { rotateY: 0, opacity: 0, zIndex: 1 }
        : s === 1
          ? { rotateY: 0, opacity: 1, zIndex: 1 } // revealed beneath the turning page
          : { rotateY: flipSign * FLIP_DEG, opacity: 1, zIndex: 20 }, // flips back in on top
    center: {
      rotateY: 0,
      opacity: 1,
      zIndex: 10,
      transition: { duration: 0.9, ease: FLIP_EASE },
    },
    exit: (s: number) =>
      reduced
        ? { rotateY: 0, opacity: 0, zIndex: 1, transition: { duration: 0.25 } }
        : s === 1
          ? {
              rotateY: flipSign * FLIP_DEG,
              opacity: 1,
              zIndex: 20,
              transition: { duration: 0.9, ease: FLIP_EASE },
            }
          : {
              rotateY: 0,
              opacity: 0,
              zIndex: 0,
              transition: { duration: 0.3, delay: 0.75 },
            },
  };

  /* story page slides gently with the reading direction */
  const storyX = isRtl ? -1 : 1;
  const textVariants: Variants = {
    enter: (s: number) => ({ opacity: 0, x: s * 44 * storyX }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, delay: 0.3, ease: EASE_OUT },
    },
    exit: (s: number) => ({
      opacity: 0,
      x: -s * 44 * storyX,
      transition: { duration: 0.28 },
    }),
  };

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const ForwardIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="gallery"
      className="relative scroll-mt-20 overflow-hidden bg-surface py-20 lg:py-28"
    >
      {/* ambience */}
      <div
        className="absolute -top-32 start-1/3 size-[420px] rounded-full bg-brand/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -end-32 size-[380px] rounded-full bg-brand-dark/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          highlight={t.gallery.highlight}
          desc={t.gallery.desc}
        />

        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mt-14"
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={t.gallery.ourWork}
            onKeyDown={onBookKey}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            onFocusCapture={() => setFocusWithin(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                setFocusWithin(false);
            }}
            className="relative mx-auto max-w-5xl"
          >
            {/* stacked page block peeking under the cover */}
            <div
              className="book-edges absolute inset-x-10 -bottom-2 h-2.5 rounded-b-xl opacity-60"
              aria-hidden="true"
            />
            <div
              className="book-edges absolute inset-x-16 -bottom-3.5 h-2.5 rounded-b-xl opacity-35"
              aria-hidden="true"
            />

            {/* book cover */}
            <div className="relative rounded-[2.2rem] bg-ink p-2 shadow-[0_45px_90px_-35px_rgba(20,20,22,0.6)] sm:p-3">
              <div className="grid overflow-hidden rounded-[1.7rem] bg-card lg:grid-cols-2">
                {/* ── story page ── */}
                <div className="relative order-2 flex flex-col justify-center bg-dots-light p-7 sm:p-10 lg:order-1 lg:min-h-[440px]">
                  {/* gutter shading (spine side = end edge) */}
                  <div
                    className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-ink/15 to-transparent rtl:bg-gradient-to-r"
                    aria-hidden="true"
                  />

                  <AnimatePresence initial={false} custom={step} mode="popLayout">
                    <motion.div
                      key={index}
                      custom={step}
                      variants={textVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <p
                        className="font-mono text-sm font-bold tracking-widest text-brand"
                        dir="ltr"
                      >
                        {String(index + 1).padStart(2, "0")}
                        <span className="text-muted-foreground/60">
                          {" "}
                          / {String(N).padStart(2, "0")}
                        </span>
                      </p>
                      <h3 className="mt-3 text-2xl font-black leading-snug text-foreground sm:text-3xl">
                        {t.gallery.items[index].title}
                      </h3>
                      <span
                        className="mt-4 block h-1 w-14 rounded-full bg-gradient-to-l from-brand to-brand-bright"
                        aria-hidden="true"
                      />
                      <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                        {t.gallery.items[index].desc}
                      </p>
                      <button
                        type="button"
                        onClick={() => setOpen(index)}
                        className="group mt-7 inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-extrabold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand hover:shadow-lg hover:shadow-brand/10"
                      >
                        <Expand className="size-4 transition-transform group-hover:scale-110" />
                        {t.gallery.openLightbox}
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── photo page (this one flips) ── */}
                <div className="relative order-1 aspect-[4/3] [perspective:1700px] sm:aspect-[16/10] lg:order-2 lg:aspect-auto">
                  <AnimatePresence initial={false} custom={step}>
                    <motion.div
                      key={index}
                      custom={step}
                      variants={pageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      style={{
                        transformOrigin: isRtl
                          ? "right center"
                          : "left center",
                        transformStyle: "preserve-3d",
                      }}
                      drag={reduced ? false : "x"}
                      dragDirectionLock
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.14}
                      onDragEnd={(_, info) => {
                        const th = 70;
                        if (info.offset.x <= -th) go(isRtl ? -1 : 1);
                        else if (info.offset.x >= th) go(isRtl ? 1 : -1);
                        window.setTimeout(() => {
                          draggedRef.current = false;
                        }, 80);
                      }}
                      className="absolute inset-0 overflow-hidden rounded-[1.4rem] shadow-2xl shadow-black/40 will-change-transform"
                    >
                      {/* front face — the photo */}
                      <div
                        className="group absolute inset-0 cursor-zoom-in [backface-visibility:hidden]"
                        onClick={() => {
                          if (!draggedRef.current) setOpen(index);
                        }}
                      >
                        <Image
                          src={GALLERY_IMAGES[index]}
                          alt={`${t.gallery.items[index].title} — ${t.gallery.items[index].desc}`}
                          fill
                          sizes="(max-width: 1024px) 92vw, 512px"
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
                          aria-hidden="true"
                        />
                        {/* gutter shading (spine side = start edge) */}
                        <div
                          className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-ink/25 to-transparent rtl:bg-gradient-to-l"
                          aria-hidden="true"
                        />
                        {/* expand chip */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen(index);
                          }}
                          aria-label={t.gallery.viewAria(
                            t.gallery.items[index].title
                          )}
                          className="absolute end-4 top-4 flex size-10 items-center justify-center rounded-xl bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:rotate-6 hover:bg-brand focus-visible:opacity-100 group-hover:rotate-6 group-hover:opacity-100"
                        >
                          <Expand className="size-5" />
                        </button>
                      </div>

                      {/* back face — the paper you see mid-flip */}
                      <div
                        className="book-paper absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                        aria-hidden="true"
                      >
                        <div
                          className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-ink/10 to-transparent rtl:bg-gradient-to-l"
                        />
                        <div className="flex h-full flex-col items-center justify-center gap-4 text-ink/25">
                          <span className="flex size-16 items-center justify-center rounded-2xl bg-brand/10">
                            <Flame className="size-8 text-brand/40" />
                          </span>
                          <span className="font-mono text-sm font-bold tracking-[0.35em]">
                            SIGMA SAFE
                          </span>
                          <span className="h-px w-24 bg-ink/15" />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* spine crease over the gutter */}
              <div
                className="pointer-events-none absolute inset-y-3 left-1/2 z-30 hidden w-4 -translate-x-1/2 lg:block"
                aria-hidden="true"
              >
                <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(20,20,22,0.28)_42%,rgba(20,20,22,0.45)_50%,rgba(20,20,22,0.28)_58%,transparent)]" />
              </div>
            </div>

            {/* autoplay progress hairline (doubles as the autoplay timer) */}
            {!reduced && (
              <div
                className="mx-auto mt-5 h-[3px] w-44 overflow-hidden rounded-full bg-border"
                aria-hidden="true"
              >
                <motion.div
                  style={{ scaleX: progress }}
                  className="h-full w-full origin-left bg-gradient-to-r from-brand to-brand-bright rtl:origin-right"
                />
              </div>
            )}

            {/* controls */}
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t.gallery.prevAria}
                  className="flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-accent hover:text-brand active:scale-95"
                >
                  <BackIcon className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t.gallery.nextAria}
                  className="flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-accent hover:text-brand active:scale-95"
                >
                  <ForwardIcon className="size-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <p
                  className="font-mono text-sm font-bold tabular-nums text-muted-foreground"
                  dir="ltr"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(N).padStart(2, "0")}
                </p>
                {!reduced && (
                  <button
                    type="button"
                    onClick={() => setManualPause((v) => !v)}
                    aria-label={
                      manualPause ? t.gallery.playAria : t.gallery.pauseAria
                    }
                    className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:border-brand/40 hover:text-brand"
                  >
                    {manualPause ? (
                      <Play className="size-4" aria-hidden="true" />
                    ) : (
                      <Pause className="size-4" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* screen-reader page status */}
            <p className="sr-only" aria-live="polite">
              {t.gallery.pageOf(index + 1, N)}
            </p>

            {/* thumbnails */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {t.gallery.items.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={t.gallery.viewAria(item.title)}
                  aria-current={i === index}
                  className={cn(
                    "relative size-16 overflow-hidden rounded-2xl transition-all duration-300 sm:size-[74px]",
                    i === index
                      ? "scale-[1.05] shadow-lg shadow-ink/25 ring-2 ring-brand ring-offset-2 ring-offset-surface"
                      : "opacity-55 hover:-translate-y-0.5 hover:opacity-100"
                  )}
                >
                  <Image
                    src={GALLERY_IMAGES[i]}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-semibold text-muted-foreground">
              <Hand className="size-4 text-brand" aria-hidden="true" />
              {t.gallery.flipHint}
            </p>
          </div>
        </motion.div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-5 backdrop-blur-md"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.items[open].title}
          >
            <motion.figure
              key={open}
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
                <Image
                  src={GALLERY_IMAGES[open]}
                  alt={`${t.gallery.items[open].title} — ${t.gallery.items[open].desc}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 880px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <span className="text-lg font-black text-white">
                  {t.gallery.items[open].title}
                </span>
                <span className="mt-1 block text-sm text-white/60">
                  {t.gallery.items[open].desc}
                </span>
              </figcaption>

              {/* prev / next */}
              <button
                type="button"
                onClick={() => lightGo(-1)}
                aria-label={t.gallery.prevAria}
                className="absolute start-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-brand"
              >
                <BackIcon className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => lightGo(1)}
                aria-label={t.gallery.nextAria}
                className="absolute end-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-brand"
              >
                <ForwardIcon className="size-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label={t.gallery.closeAria}
                className="absolute -top-3 end-0 flex size-11 -translate-y-full items-center justify-center rounded-xl bg-white text-ink shadow-lg transition-transform hover:scale-110"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
