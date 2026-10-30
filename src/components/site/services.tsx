"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import {
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/site/primitives";
import { SERVICES } from "@/lib/site";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-20 text-white lg:py-28"
    >
      {/* ambience */}
      <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
      <div
        className="absolute -top-40 start-1/4 size-[420px] rounded-full bg-brand/15 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -end-32 size-[380px] rounded-full bg-brand-dark/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <SectionHeading
          dark
          eyebrow="خدماتنا"
          title="أنظمة حماية متكاملة"
          highlight="من أشهر الماركات العالمية"
          desc="حلول شاملة «مفتاح في اليد» — من الدراسة والتصميم حتى التركيب والصيانة الدورية، بمعدات معتمدة من كبرى الشركات العالمية."
        />

        <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title} className="h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-charcoal/80 p-6 backdrop-blur-sm transition-colors hover:border-brand/50"
              >
                {/* hover glow */}
                <div
                  className="pointer-events-none absolute -top-24 start-1/2 size-48 -translate-x-1/2 rounded-full bg-brand/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <span className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <service.icon className="size-7" />
                </span>

                <h3 className="relative mt-5 text-lg font-black leading-7">
                  {service.title}
                </h3>
                <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-white/60">
                  {service.desc}
                </p>

                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      dir="auto"
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-white/70 transition-colors group-hover:border-brand/40 group-hover:text-brand-bright"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* bottom accent line */}
                <span
                  className="absolute inset-x-0 bottom-0 h-1 origin-right scale-x-0 bg-gradient-to-l from-brand to-brand-bright transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-brand px-7 py-3.5 text-base font-extrabold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            اطلب استشارة فنية مجانية
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
