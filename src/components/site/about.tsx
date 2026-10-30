"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/site/language-provider";
import {
  DirArrow,
  Reveal,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        {/* visual collage */}
        <div className="relative mx-auto w-full max-w-[540px]">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20">
              <Image
                src="/images/machine-control.jpg"
                alt={t.about.img1Alt}
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="absolute -bottom-10 end-2 w-[46%] sm:-end-6">
            <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-background shadow-xl shadow-ink/25">
              <Image
                src="/images/machine-assembly.jpg"
                alt={t.about.img2Alt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          </Reveal>
          {/* certified stamp */}
          <Reveal delay={0.35} className="absolute -top-6 -start-2 sm:-start-8">
            <div className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-white shadow-xl shadow-ink/40 animate-float-y">
              <ShieldCheck className="size-9 text-brand-bright" />
              <div className="text-sm leading-5">
                <p className="font-black">{t.about.stampTitle}</p>
                <p className="text-white/60">{t.about.stampSub}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* copy */}
        <div>
          <SectionHeading
            align="start"
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            highlight={t.about.highlight}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-loose text-muted-foreground sm:text-lg">
              {t.about.body}
            </p>
          </Reveal>

          <StaggerContainer className="mt-8 space-y-4">
            {t.about.highlights.map((h) => (
              <StaggerItem key={h}>
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10">
                  <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-brand" />
                  <p className="pt-0.5 font-bold text-foreground">{h}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.3}>
            <a
              href="#services"
              className="group mt-9 inline-flex items-center gap-2 text-base font-extrabold text-brand transition-colors hover:text-brand-dark dark:hover:text-brand-bright"
            >
              {t.about.explore}
              <span className="flex size-8 items-center justify-center rounded-full bg-brand/10">
                <DirArrow className="size-4 transition-transform" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
