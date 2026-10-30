"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Sun/moon theme toggle. Both glyphs are always rendered and visibility is
 * driven purely by the `.dark` class on <html> (set by next-themes), so the
 * markup is identical on server and client — no hydration mismatch, no state.
 */
export function ThemeToggle({
  scrolled = true,
  className,
}: {
  /** false while the navbar is transparent over the dark hero */
  scrolled?: boolean;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="تبديل الوضع الداكن / الفاتح"
      title="الوضع الداكن / الفاتح"
      className={cn(
        "group relative inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors",
        scrolled
          ? "text-foreground ring-1 ring-black/10 hover:bg-black/5 dark:ring-white/15 dark:hover:bg-white/10"
          : "text-white ring-1 ring-white/20 hover:bg-white/10",
        className
      )}
    >
      <Sun className="size-5 rotate-0 scale-100 text-amber-400 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
