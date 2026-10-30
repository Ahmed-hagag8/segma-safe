"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";
import { PROCESS_STEPS } from "@/lib/site";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="مراحل العمل"
          title="من الفكرة إلى الحماية الكاملة في"
          highlight="5 مراحل"
          desc="منهجية عمل مدروسة تضمن تسليم نظام حماية جاهز ومختبر وموثق بالكامل."
        />

        <div ref={trackRef} className="relative mt-16">
          {/* progress rail (desktop) */}
          <div
            className="absolute inset-x-16 top-[52px] hidden h-1 rounded-full bg-border lg:block"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleX: lineScale }}
              className="h-full w-full origin-right rounded-full bg-gradient-to-l from-brand to-brand-bright"
            />
          </div>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <StaggerItem key={step.title} className="relative">
                <div className="group flex flex-col items-center text-center">
                  {/* node */}
                  <div className="relative">
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: -4 }}
                      className="relative z-10 flex size-[104px] items-center justify-center rounded-[2rem] border-4 border-background bg-ink text-white shadow-xl shadow-ink/25 transition-colors duration-300 group-hover:bg-brand group-hover:shadow-brand/40"
                    >
                      <step.icon className="size-10" />
                      <span className="absolute -top-2 -end-2 flex size-8 items-center justify-center rounded-full bg-brand font-mono text-sm font-bold text-white ring-4 ring-background transition-colors group-hover:bg-background group-hover:text-brand">
                        {i + 1}
                      </span>
                    </motion.span>
                  </div>

                  <h3 className="mt-5 text-lg font-black text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>

                {/* mobile connector */}
                {i < PROCESS_STEPS.length - 1 && (
                  <span
                    className="absolute start-[52px] top-[104px] h-8 w-1 rounded-full bg-gradient-to-b from-brand to-brand/20 sm:hidden"
                    aria-hidden="true"
                  />
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
