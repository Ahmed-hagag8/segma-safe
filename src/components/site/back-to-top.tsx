"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (v) => setShow(v > 600)), [scrollY]);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#home"
          aria-label="العودة للأعلى"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ y: -4 }}
          className="fixed bottom-6 start-6 z-40 flex size-12 items-center justify-center rounded-2xl bg-brand text-white shadow-xl shadow-brand/40 transition-colors hover:bg-brand-dark"
        >
          <ArrowUp className="size-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
