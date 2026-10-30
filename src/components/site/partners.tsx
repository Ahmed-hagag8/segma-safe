"use client";

import { PARTNERS } from "@/lib/site";
import { useLanguage } from "@/components/site/language-provider";

export function Partners() {
  const row = [...PARTNERS, ...PARTNERS];
  const { t } = useLanguage();

  return (
    <section
      aria-label={t.partners.aria}
      className="relative border-y border-border bg-surface py-8"
    >
      <div className="container-site">
        <p className="mb-6 text-center text-sm font-bold tracking-wide text-muted-foreground">
          {t.partners.note}
        </p>
      </div>
      {/* marquee — ltr wrapper keeps the translate math simple */}
      <div
        dir="ltr"
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee items-center gap-4 pe-4 hover:[animation-play-state:paused]">
          {row.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              aria-hidden={i >= PARTNERS.length}
              className="group flex h-16 min-w-[170px] items-center justify-center gap-2 rounded-2xl border border-border bg-card px-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand/20"
            >
              <span className="font-mono text-xl font-bold tracking-wider text-foreground/85 transition-colors group-hover:text-brand">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
