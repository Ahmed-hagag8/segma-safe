"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import {
  Reveal,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";

const HIGHLIGHTS = [
  "تصميم وتنفيذ وصيانة أنظمة الإطفاء والإنذار",
  "التزام بأحدث الأكواد ومعايير الجودة العالمية",
  "توريدات عمومية ومهام أمن صناعي وسلامة مهنية",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        {/* visual collage */}
        <div className="relative mx-auto w-full max-w-[540px]">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/20">
              <Image
                src="/images/machine-control.jpg"
                alt="لوحات تحكم وحدات ضخ الحريق من أعمال سيجما سيف"
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
                alt="تجميع واختبار لوحات التحكم"
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
                <p className="font-black">سلامة معتمدة</p>
                <p className="text-white/60">معايير عالمية</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* copy */}
        <div>
          <SectionHeading
            align="start"
            eyebrow="من نحن"
            title="شركة رائدة في عالم"
            highlight="الحماية من الحريق"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-loose text-muted-foreground sm:text-lg">
              سيجما سيف للمقاولات العامة هي إحدى الشركات الرائدة في مجال تصميم
              وتنفيذ وصيانة أنظمة الإطفاء والإنذار، وتقديم حلول ضمان السلامة
              الصناعية. نلتزم بتقديم أعلى معايير الجودة والسلامة وفقاً لأحدث
              الأكواد العالمية، لنمنح عملاءنا بيئة عمل آمنة وموثوقة.
            </p>
          </Reveal>

          <StaggerContainer className="mt-8 space-y-4">
            {HIGHLIGHTS.map((h) => (
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
              className="group mt-9 inline-flex items-center gap-2 text-base font-extrabold text-brand transition-colors hover:text-brand-dark"
            >
              استكشف جميع خدماتنا
              <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 transition-transform group-hover:-translate-x-1">
                ←
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
