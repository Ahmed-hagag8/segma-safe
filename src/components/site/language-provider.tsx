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
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private mode — still switch the UI for this visit */
  }
  listeners.forEach((cb) => cb());
}

/* ── context ─────────────────────────────────────────────────────────── */

type LanguageContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: translations[lang],
      setLang: setStoredLang,
      toggleLang: () => setStoredLang(lang === "ar" ? "en" : "ar"),
    }),
    [lang]
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
