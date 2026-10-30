"use client";

import { Building2, Car, Hospital } from "lucide-react";
import {
  Reveal,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";
import { CLIENTS } from "@/lib/site";

const ICONS = [Car, Car, Building2, Hospital];

export function Clients() {
  return (
    <section
      aria-label="عملاؤنا"
      className="border-t border-border bg-white py-20 lg:py-24"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="سابق أعمالنا"
          title="ثقة كبرى"
          highlight="الشركات والمؤسسات"
          desc="نفخر بتقديم خدماتنا لمنشآت قيادية في قطاعات السيارات والصناعة والرعاية الصحية."
        />

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((client, i) => {
            const Icon = ICONS[i];
            return (
              <StaggerItem key={client.en}>
                <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand/35 hover:shadow-xl hover:shadow-brand/10">
                  {/* top sweep */}
                  <span
                    className="absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-l from-brand to-brand-bright transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-surface text-ink/70 transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-8" />
                  </span>
                  <p className="mt-5 font-mono text-sm font-bold tracking-widest text-muted-foreground">
                    {client.en}
                  </p>
                  <p className="mt-1.5 text-lg font-black text-ink">
                    {client.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-brand">
                    {client.sector}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm font-semibold text-muted-foreground">
            …ومئات المنشآت السكنية والتجارية والصناعية في جميع محافظات مصر
          </p>
        </Reveal>
      </div>
    </section>
  );
}
