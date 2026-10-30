"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LangToggle } from "@/components/site/lang-toggle";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { useLanguage } from "@/components/site/language-provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 40)), [scrollY]);

  /* lock body scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(20,20,22,0.08)] border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container-fluid flex h-[72px] items-center justify-between gap-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0" aria-label={t.nav.homeAria}>
          <span className="relative block size-12 overflow-hidden rounded-xl bg-white ring-1 ring-black/10 shadow-sm">
            <Image
              src="/images/logo.jpg"
              alt={t.footer.logoAlt}
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span
            className={cn(
              "font-mono text-lg font-bold tracking-wider transition-colors",
              scrolled ? "text-foreground" : "text-white"
            )}
          >
            SIGMA <span className="text-brand">SAFE</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label={t.nav.mainNav}>
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "group relative rounded-lg px-3.5 py-2 text-[15px] font-bold transition-colors",
                scrolled
                  ? "text-foreground/80 hover:text-brand"
                  : "text-white/85 hover:text-white"
              )}
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <LangToggle scrolled={scrolled} />
          <ThemeToggle scrolled={scrolled} />
          <a
            href="#contact"
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-brand px-5 text-sm font-extrabold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-brand/50 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {t.nav.freeSurvey}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          className={cn(
            "lg:hidden inline-flex size-11 items-center justify-center rounded-xl transition-colors",
            scrolled
              ? "text-foreground hover:bg-muted"
              : "text-white hover:bg-white/10"
          )}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/97 backdrop-blur-xl"
            aria-label={t.nav.mobileNav}
          >
            <div className="container-fluid flex max-h-[calc(100dvh-72px)] flex-col gap-1 py-4 overflow-y-auto">
              {t.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="rounded-xl px-4 py-3.5 text-base font-bold text-foreground hover:bg-accent hover:text-brand-dark dark:hover:text-brand-bright transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <LangToggle scrolled />
                  <ThemeToggle scrolled />
                </div>
                <motion.a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-brand px-3 text-sm font-extrabold text-white shadow-lg shadow-brand/30"
                >
                  {t.nav.freeSurveyLong}
                </motion.a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
