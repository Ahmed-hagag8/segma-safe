"use client";

import { Building2, Car, Hospital } from "lucide-react";
import { useLanguage } from "@/components/site/language-provider";
import {
  Reveal,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";

const ICONS = [Car, Car, Building2, Hospital];

export function Clients() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t.clients.aria}
      className="border-t border-border bg-background py-20 lg:py-24"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow={t.clients.eyebrow}
          title={t.clients.title}
          highlight={t.clients.highlight}
          desc={t.clients.desc}
        />

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.clients.items.map((client, i) => {
            const Icon = ICONS[i];
            return (
              <StaggerItem key={client.name}>
                <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand/35 hover:shadow-xl hover:shadow-brand/10">
                  {/* top sweep */}
                  <span
                    className="absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-l from-brand to-brand-bright transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-surface text-foreground/70 transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-8" />
                  </span>
                  <p className="mt-5 font-mono text-sm font-bold tracking-widest text-muted-foreground">
                    {client.latin}
                  </p>
                  <p className="mt-1.5 text-lg font-black text-foreground">
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
            {t.clients.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
