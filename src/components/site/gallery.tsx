"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";
import { GALLERY } from "@/lib/site";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="relative scroll-mt-20 overflow-hidden bg-surface py-20 lg:py-28"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="أعمالنا"
          title="من تنفيذنا بأيدينا"
          highlight="…جودة تشوفها"
          desc="نماذج حقيقية من وحدات الضخ ولوحات التحكم وشبكات الحريق التي جهزناها وركبناها."
        />

        <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <StaggerItem key={item.src} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <motion.button
                type="button"
                onClick={() => setActive(i)}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative block w-full overflow-hidden rounded-3xl text-start shadow-md shadow-ink/10 focus-visible:outline-2 focus-visible:outline-brand"
                aria-label={`عرض ${item.title} بحجم أكبر`}
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                  transition={{ duration: 0.55, ease: [0.21, 0.65, 0.35, 1] }}
                  className="relative aspect-[4/3] w-full"
                >
                  <Image
                    src={item.src}
                    alt={`${item.title} — ${item.desc}`}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/25 to-transparent p-5 opacity-90 transition-opacity group-hover:opacity-100">
                  <span className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    <span className="text-lg font-black text-white">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-white/65">
                      {item.desc}
                    </span>
                  </span>
                </div>

                {/* zoom chip */}
                <span className="absolute end-4 top-4 flex size-10 items-center justify-center rounded-xl bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:rotate-6">
                  <Expand className="size-5" />
                </span>

                {/* red corner accent */}
                <span
                  className="absolute start-0 top-0 h-10 w-1.5 bg-gradient-to-b from-brand to-transparent"
                  aria-hidden="true"
                />
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-5 backdrop-blur-md"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY[active].title}
          >
            <motion.figure
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
                <Image
                  src={GALLERY[active].src}
                  alt={`${GALLERY[active].title} — ${GALLERY[active].desc}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 880px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <span className="text-lg font-black text-white">
                  {GALLERY[active].title}
                </span>
                <span className="mt-1 block text-sm text-white/60">
                  {GALLERY[active].desc}
                </span>
              </figcaption>

              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="إغلاق العرض"
                className="absolute -top-3 end-0 flex size-11 -translate-y-full items-center justify-center rounded-xl bg-white text-ink shadow-lg transition-transform hover:scale-110"
              >
                <X className="size-6" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
