"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/site/language-provider";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export function Faq() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  function toggle(idx: number) {
    setOpenIdx((curr) => (curr === idx ? null : idx));
  }

  return (
    <section id="faq" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="container-site max-w-4xl">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          highlight={t.faq.highlight}
          desc={t.faq.desc}
        />

        <div className="mt-14 space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIdx === idx;
            const headingId = `faq-h-${idx}`;
            const panelId = `faq-p-${idx}`;

            return (
              <Reveal key={item.q} delay={idx * 0.08}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                    isOpen
                      ? "border-brand/50 shadow-xl shadow-brand/10 ring-1 ring-brand/20"
                      : "border-border hover:border-brand/35 hover:shadow-md"
                  )}
                >
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-start"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                          isOpen
                            ? "bg-brand text-white"
                            : "bg-surface text-brand"
                        )}
                        aria-hidden="true"
                      >
                        <HelpCircle className="size-5" />
                      </span>
                      <span className="text-base font-black text-foreground sm:text-lg">
                        {item.q}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-foreground/70 transition-transform duration-300",
                        isOpen && "rotate-180 bg-brand/10 text-brand"
                      )}
                      aria-hidden="true"
                    >
                      <ChevronDown className="size-4.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={headingId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="border-t border-border/60 px-5 sm:px-6 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

