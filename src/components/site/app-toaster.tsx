"use client";

import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useLanguage } from "@/components/site/language-provider";

/** Toast host that follows the active language (direction + font). */
export function AppToaster() {
  const { dir, lang } = useLanguage();

  return (
    <SonnerToaster
      position="bottom-center"
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily:
            lang === "en" ? "var(--font-inter)" : "var(--font-cairo)",
          direction: dir,
        },
      }}
    />
  );
}
