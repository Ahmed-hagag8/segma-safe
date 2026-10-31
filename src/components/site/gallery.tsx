"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, Expand, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useLanguage } from "@/components/site/language-provider";
import { EASE_OUT, SectionHeading } from "@/components/site/primitives";
import { GALLERY_IMAGES } from "@/lib/site";

const N = GALLERY_IMAGES.length;
const COVERED_VEIL = 0.5; // how dark a card gets once the next one covers it

/* hydration gate: false on the server, true after hydration */
const noopSubscribe = () => () => {};

/* ─────────────────────────────────────────────────────────────────────────
   "Our Work" — a scroll-driven card deck.

   The section pins and, as the user scrolls, each project card SLIDES up
   over the previous one (sticky stacking) while the covered card gently
   recedes (scale) and dims (veil). Scrolling is the only control: one
   swipe of the wheel/trackpad moves you from card to card. Fully
   direction-neutral (vertical motion), so AR (RTL) and EN (LTR) behave
   identically. Reduced-motion users get a plain stacked list. Clicking a
   photo opens the lightbox.
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

  const deckRef = useRef<HTMLDivElement>(null);
  /* 0 → deck top at viewport top, 1 → deck bottom at viewport bottom */
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  const [open, setOpen] = useState<number | null>(null);
  const isRtl = dir === "rtl";

  /* lightbox navigation + escape/arrows + body scroll lock */
  const lightGo = useCallback((s: number) => {
    setOpen((o) => (o === null ? o : (o + s + N) % N));
  }, []);

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

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const ForwardIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="gallery"
      className="relative scroll-mt-20 bg-surface py-20 lg:py-28"
    >
      {/* ambience — clipped in its own layer so it can't break position:sticky */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 start-1/3 size-[420px] rounded-full bg-brand/10 blur-[130px]" />
        <div className="absolute bottom-0 -end-32 size-[380px] rounded-full bg-brand-dark/10 blur-[120px]" />
      </div>

      <div className="container-site relative">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          highlight={t.gallery.highlight}
          desc={t.gallery.desc}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
          className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground"
        >
          <ChevronDown
            className="size-4 animate-bounce text-brand"
            aria-hidden="true"
          />
          {t.gallery.scrollHint}
        </motion.p>

        {/* the deck: each wrapper is a full-viewport sticky frame — the
            next card slides up over the pinned previous one on scroll */}
        <div
          ref={deckRef}
          role="region"
          aria-label={t.gallery.ourWork}
          className="relative"
        >
          {t.gallery.items.map((item, i) => (
            <DeckCard
              key={item.title}
              i={i}
              progress={scrollYProgress}
              reduced={reduced}
              title={item.title}
              desc={item.desc}
              viewLabel={t.gallery.openLightbox}
              onOpen={() => setOpen(i)}
            />
          ))}
          {/* linger room: the finished deck rests briefly before the
              section scrolls away */}
          <div className="h-[35svh]" aria-hidden="true" />
        </div>
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

/* ── one card of the deck ────────────────────────────────────────────── */

function DeckCard({
  i,
  progress,
  reduced,
  title,
  desc,
  viewLabel,
  onOpen,
}: {
  i: number;
  progress: MotionValue<number>;
  reduced: boolean;
  title: string;
  desc: string;
  viewLabel: string;
  onOpen: () => void;
}) {
  /* the card recedes the whole time later cards pile on, then holds */
  const targetScale = 1 - (N - 1 - i) * 0.04;
  const scale = useTransform(progress, [i / N, 1], [1, targetScale]);
  /* it dims exactly while the next card slides over it, then holds */
  const veil = useTransform(
    progress,
    [i / N, Math.min((i + 1) / N, 1)],
    [0, i === N - 1 ? 0 : COVERED_VEIL]
  );

  const body = (
    <>
      {/* ── photo half ── */}
      <div
        className="group relative h-full cursor-zoom-in overflow-hidden"
        onClick={onOpen}
      >
        <Image
          src={GALLERY_IMAGES[i]}
          alt={`${title} — ${desc}`}
          fill
          sizes="(max-width: 1024px) 92vw, 45vw"
          priority={i === 0}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/10"
          aria-hidden="true"
        />

        {/* number chip */}
        <span
          dir="ltr"
          className="absolute start-4 top-4 rounded-lg bg-ink/55 px-2.5 py-1 font-mono text-xs font-bold text-white backdrop-blur-md"
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        {/* expand chip */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          aria-label={title}
          className="absolute end-4 top-4 flex size-10 items-center justify-center rounded-xl bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:rotate-6 hover:bg-brand focus-visible:opacity-100 group-hover:rotate-6 group-hover:opacity-100"
        >
          <Expand className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* ── story half ── */}
      <div className="bg-dots-light relative flex flex-col justify-center gap-3 overflow-hidden p-5 sm:p-8 lg:gap-4 lg:p-10">
        <p
          dir="ltr"
          className="font-mono text-sm font-bold tracking-widest text-brand"
        >
          {String(i + 1).padStart(2, "0")}
          <span className="text-muted-foreground/60">
            {" "}
            / {String(N).padStart(2, "0")}
          </span>
        </p>
        <h3 className="text-xl font-black leading-snug text-foreground sm:text-2xl lg:text-3xl">
          {title}
        </h3>
        <span
          className="block h-1 w-14 rounded-full bg-gradient-to-l from-brand to-brand-bright"
          aria-hidden="true"
        />
        <p className="line-clamp-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:line-clamp-none sm:text-base">
          {desc}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="group/btn mt-1 inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-extrabold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand hover:shadow-lg hover:shadow-brand/10 lg:mt-3"
        >
          <Expand className="size-4 transition-transform group-hover/btn:scale-110" />
          {viewLabel}
        </button>
      </div>
    </>
  );

  /* reduced motion: plain stacked list, no pinning, no transforms */
  if (reduced) {
    return (
      <article className="mx-auto my-6 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl sm:grid-cols-2">
        {body}
      </article>
    );
  }

  return (
    <div className="sticky top-0 flex h-svh items-center justify-center px-4 sm:px-6">
      <motion.article
        style={{ scale, willChange: "transform" }}
        aria-label={title}
        className="relative grid h-[78svh] w-full max-w-5xl grid-rows-[42%_58%] overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_45px_90px_-35px_rgba(20,20,22,0.6)] will-change-transform lg:h-[70svh] lg:grid-cols-2 lg:grid-rows-1"
      >
        {body}
        <motion.div
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 z-10 bg-ink"
          aria-hidden="true"
        />
      </motion.article>
    </div>
  );
}
