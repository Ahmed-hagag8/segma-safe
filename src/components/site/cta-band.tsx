"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLanguage } from "@/components/site/language-provider";
import { Reveal, WhatsAppIcon } from "@/components/site/primitives";
import { PHONES } from "@/lib/site";
import { whatsappUrl } from "@/lib/i18n";

export function CtaBand() {
  const { t, lang } = useLanguage();

  return (
    <section aria-label={t.cta.aria} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-brand-dark via-brand to-brand-dark" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 18px)",
        }}
        aria-hidden="true"
      />
      {/* floating glows */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 start-[12%] size-64 rounded-full bg-white/15 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -bottom-24 end-[8%] size-72 rounded-full bg-ink/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative flex flex-col items-center gap-8 py-16 text-center text-white lg:flex-row lg:justify-between lg:py-20 lg:text-start">
        <Reveal>
          <h2 className="text-3xl font-black leading-snug sm:text-4xl">
            {t.cta.title}
            <span className="mt-2 block text-lg font-bold text-white/80 sm:text-xl">
              {t.cta.sub}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-4 text-base font-extrabold text-brand-dark shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <WhatsAppIcon className="size-6 text-[#1da851]" />
              {t.cta.whatsapp}
            </a>
            <a
              href={`tel:${PHONES[1].intl}`}
              className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-white/70 px-7 py-[14px] text-base font-extrabold text-white transition-all hover:-translate-y-1 hover:border-white hover:bg-white/10"
            >
              <Phone className="size-5 transition-transform group-hover:rotate-12" />
              <span dir="ltr" className="font-mono">{PHONES[1].raw}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
