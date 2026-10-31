"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/site/language-provider";
import { cn } from "@/lib/utils";

/**
 * Language switcher pill: shows "English" while in Arabic and "عربي"
 * while in English. Always renders the same markup on server and client
 * (the default language is Arabic on both sides).
 */
export function LangToggle({
  scrolled = true,
  className,
}: {
  /** false while the navbar is transparent over the dark hero */
  scrolled?: boolean;
  className?: string;
}) {
  const { t, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.meta.langToggleAria}
      title={t.meta.langToggleAria}
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-3 text-sm font-extrabold transition-colors",
        scrolled
          ? "text-foreground ring-1 ring-black/10 hover:bg-black/5 dark:ring-white/15 dark:hover:bg-white/10"
          : "text-white ring-1 ring-white/20 hover:bg-white/10",
        className
      )}
    >
      <Languages className="size-4.5 text-brand" />
      <span>{t.meta.langToggle}</span>
    </button>
  );
}
