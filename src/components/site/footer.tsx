"use client";

import { ArrowUp, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/site/primitives";
import {
  ADDRESS,
  COMPANY_FULL_AR,
  NAV_LINKS,
  PHONES,
  SERVICES,
  WHATSAPP_URL,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      {/* top strip */}
      <div className="h-1.5 bg-gradient-to-l from-brand via-brand-bright to-brand-dark" />

      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]">
        {/* brand */}
        <div>
          <a href="#home" className="inline-flex items-center gap-3">
            <span className="relative block size-14 overflow-hidden rounded-2xl bg-white shadow-lg">
              <Image
                src="/images/logo.jpg"
                alt="شعار سيجما سيف"
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col">
              <span className="font-mono text-xl font-bold tracking-wider">
                SIGMA <span className="text-brand-bright">SAFE</span>
              </span>
              <span className="mt-0.5 text-xs font-semibold text-white/60">
                سيجما سيف للمقاولات العامة
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            {COMPANY_FULL_AR}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <SocialLink
              href={WHATSAPP_URL}
              label="واتساب"
              external
              icon={<WhatsAppIcon className="size-5" />}
            />
          </div>
        </div>

        {/* quick links */}
        <nav aria-label="روابط سريعة">
          <h3 className="mb-5 text-lg font-black">روابط سريعة</h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-brand-bright"
                >
                  <span className="h-px w-3 bg-brand transition-all group-hover:w-5" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* services */}
        <nav aria-label="خدماتنا">
          <h3 className="mb-5 text-lg font-black">خدماتنا</h3>
          <ul className="space-y-2.5">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.title}>
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-brand-bright"
                >
                  <span className="h-px w-3 bg-brand transition-all group-hover:w-5" />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* contact */}
        <div>
          <h3 className="mb-5 text-lg font-black">تواصل معنا</h3>
          <div className="space-y-4 text-sm">
            <a
              href={`tel:${PHONES[0].intl}`}
              className="flex items-start gap-3 text-white/60 transition-colors hover:text-white"
            >
              <Phone className="mt-0.5 size-4.5 shrink-0 text-brand-bright" />
              <span dir="ltr" className="font-mono tracking-wide">
                {PHONES.map((p) => p.raw).join(" • ")}
              </span>
            </a>
            <p className="flex items-start gap-3 text-white/60">
              <MapPin className="mt-0.5 size-4.5 shrink-0 text-brand-bright" />
              <span className="leading-relaxed">{ADDRESS}</span>
            </p>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/45 sm:flex-row sm:text-start">
          <p>© {year} سيجما سيف للمقاولات العامة — جميع الحقوق محفوظة</p>
          <p className="font-mono tracking-wider">
            SIGMA SAFE — Fire Fighting & Alarm Systems
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
  external,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
    >
      {icon}
    </a>
  );
}
