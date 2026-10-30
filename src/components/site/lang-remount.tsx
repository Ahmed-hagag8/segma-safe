"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/site/language-provider";

/**
 * Remounts its children whenever the user switches language (AR↔EN) —
 * NOT on the initial hydration load.
 *
 * Why: every section uses framer-motion `whileInView` with `once: true`.
 * A language switch flips the layout direction and changes text lengths,
 * which shifts section positions — leaving some in-view sections stuck at
 * `opacity: 0` (already-consumed or stale reveal state) until a manual
 * refresh. Remounting re-runs every IntersectionObserver, so sections
 * currently in view animate in immediately and below-fold ones reveal on
 * scroll as usual.
 *
 * `display: contents` keeps the wrapper layout-neutral (no box generated,
 * flex/grid parents and position:fixed children behave as before).
 */
export function LangRemount({ children }: { children: ReactNode }) {
  const { switchCount } = useLanguage();
  return (
    <div key={switchCount} className="contents">
      {children}
    </div>
  );
}
