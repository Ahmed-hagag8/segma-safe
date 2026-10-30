"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translations, type Dict, type Lang } from "@/lib/i18n";

/* ── tiny external store backed by localStorage ─────────────────────────
   useSyncExternalStore keeps SSR/CSR output identical (server snapshot is
   always "ar", matching the server-rendered <html lang="ar" dir="rtl">)
   and re-renders after hydration if the stored preference differs —
   no hydration mismatch, no setState-in-effect. */

const STORAGE_KEY = "lang";
const listeners = new Set<() => void>();

/* counts user-initiated language switches (incremented only in
   setStoredLang, which is never called during hydration) */
let switchCount = 0;

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
}

function getServerSnapshot(): Lang {
  return "ar";
}

function setStoredLang(lang: Lang) {
  let prev: Lang = "ar";
  try {
    prev = localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ar";
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private mode — still switch the UI for this visit */
  }
  if (prev !== lang) switchCount += 1;
  listeners.forEach((cb) => cb());
}

function getSwitchCount(): number {
  return switchCount;
}

function getServerSwitchCount(): number {
  return 0;
}

/* ── context ─────────────────────────────────────────────────────────── */

type LanguageContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  /** increments on every USER-initiated language switch (not the initial
      hydration flip) — used to remount scroll-reveal sections */
  switchCount: number;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const switchCount = useSyncExternalStore(
    subscribe,
    getSwitchCount,
    getServerSwitchCount
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: translations[lang],
      switchCount,
      setLang: setStoredLang,
      toggleLang: () => setStoredLang(lang === "ar" ? "en" : "ar"),
    }),
    [lang, switchCount]
  );

  /* keep <html lang dir> in sync (no state updates here — lint safe) */
  useEffect(() => {
    const root = document.documentElement;
    root.lang = value.lang;
    root.dir = value.dir;
  }, [value.lang, value.dir]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
