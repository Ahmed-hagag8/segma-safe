import { About } from "@/components/site/about";
import { BackToTop } from "@/components/site/back-to-top";
import { Clients } from "@/components/site/clients";
import { Contact } from "@/components/site/contact";
import { CtaBand } from "@/components/site/cta-band";
import { Footer } from "@/components/site/footer";
import { Gallery } from "@/components/site/gallery";
import { Hero } from "@/components/site/hero";
import { LangRemount } from "@/components/site/lang-remount";
import { Navbar } from "@/components/site/navbar";
import { Partners } from "@/components/site/partners";
import { Process } from "@/components/site/process";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { PHONES } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "سيجما سيف للمقاولات العامة — SIGMA SAFE",
  alternateName: "Sigma Safe General Contracting",
  description:
    "سيجما سيف للمقاولات العامة والتوريدات العمومية ونظم الإطفاء والإنذار ومهام الأمن الصناعي — Sigma Safe: fire suppression & alarm systems, general contracting and industrial security.",
  telephone: PHONES.map((p) => p.intl),
  address: {
    "@type": "PostalAddress",
    streetAddress: "العجوزة، عمارات الإعلام، عمارة 1، الدور الخامس",
    addressLocality: "الجيزة",
    addressCountry: "EG",
  },
  areaServed: "EG",
  knowsAbout: [
    "أنظمة الإطفاء",
    "أنظمة الإنذار",
    "FM200",
    "CO2",
    "Foam Systems",
    "Fire Pumps",
  ],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      {/* remounts on user-initiated AR↔EN switch so every scroll-reveal
          section re-evaluates its in-view state (no blank sections) */}
      <LangRemount>
        <main className="flex-1">
          <Hero />
          <Partners />
          <About />
          <Services />
          <WhyUs />
          <Process />
          <Gallery />
          <Clients />
          <CtaBand />
          <Contact />
        </main>
      </LangRemount>
      <Footer />
      <BackToTop />
    </div>
  );
}
