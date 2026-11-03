import { About } from "@/components/site/about";
import { BackToTop } from "@/components/site/back-to-top";
import { Clients } from "@/components/site/clients";
import { Contact } from "@/components/site/contact";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Gallery } from "@/components/site/gallery";
import { Hero } from "@/components/site/hero";
import { LangRemount } from "@/components/site/lang-remount";
import { Navbar } from "@/components/site/navbar";
import { Partners } from "@/components/site/partners";
import { Process } from "@/components/site/process";
import { ScrollProgress } from "@/components/site/primitives";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { GALLERY_IMAGES, PHONES } from "@/lib/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://sigma-safe.com/#organization",
  name: "سيجما سيف للمقاولات العامة — SIGMA SAFE",
  alternateName: "Sigma Safe General Contracting",
  description:
    "سيجما سيف للمقاولات العامة والتوريدات العمومية ونظم الإطفاء والإنذار ومهام الأمن الصناعي — Sigma Safe: fire suppression & alarm systems, general contracting and industrial security.",
  url: "https://sigma-safe.com",
  logo: "https://sigma-safe.com/images/logo.jpg",
  image: "https://sigma-safe.com/images/banner-hero.jpg",
  telephone: PHONES.map((p) => p.intl),
  address: {
    "@type": "PostalAddress",
    streetAddress: "العجوزة، عمارات الإعلام، عمارة 1، الدور الخامس",
    addressLocality: "الجيزة",
    addressRegion: "الجيزة",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.0561,
    longitude: 31.2089,
  },
  areaServed: {
    "@type": "Country",
    name: "Egypt",
  },
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "87",
    bestRating: "5",
    worstRating: "1",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+201039661221",
      contactType: "sales",
      areaServed: "EG",
      availableLanguage: ["Arabic", "English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+201039595147",
      contactType: "customer service",
      areaServed: "EG",
      availableLanguage: ["Arabic", "English"],
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://wa.me/201039661221",
  ],
  knowsAbout: [
    "أنظمة الإطفاء",
    "أنظمة الإنذار",
    "FM200",
    "CO2",
    "Foam Systems",
    "Fire Pumps",
    "مكافحة الحريق",
    "الحماية المدنية",
    "NFPA",
    "رشاشات الحريق",
    "الأمن الصناعي",
    "السلامة المهنية",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://sigma-safe.com/#website",
  name: "سيجما سيف — SIGMA SAFE",
  url: "https://sigma-safe.com",
  inLanguage: ["ar", "en"],
  publisher: {
    "@id": "https://sigma-safe.com/#organization",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "خدمات سيجما سيف لأنظمة الإطفاء والإنذار والمقاولات",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "أنظمة الرشاشات التلقائية (Fire Sprinklers)",
      description: "تصميم وتوريد وتركيب شبكات الرشاشات المائية وفق أحدث أكواد NFPA 13 والحماية المدنية.",
      provider: { "@id": "https://sigma-safe.com/#organization" },
      areaServed: "EG",
    },
    {
      "@type": "Service",
      position: 2,
      name: "محطات ومضخات الحريق (Fire Pumps)",
      description: "توريد وتركيب واختبار مضخات الحريق ديزل وكهرباء وجوكي بمطابقة تامة لأكواد NFPA 20.",
      provider: { "@id": "https://sigma-safe.com/#organization" },
      areaServed: "EG",
    },
    {
      "@type": "Service",
      position: 3,
      name: "أنظمة الإنذار والكشف المبكر (Fire Alarm)",
      description: "لوحات تحكم ذكية معنونة وتقليدية، كواشف دخان وحرارة، وسرائن إنذار بمطابقة NFPA 72.",
      provider: { "@id": "https://sigma-safe.com/#organization" },
      areaServed: "EG",
    },
    {
      "@type": "Service",
      position: 4,
      name: "أنظمة الغازات النظيفة (FM200 / CO2)",
      description: "إخماد آمن لغرف الخوادم والكهرباء والبيانات بدون إتلاف الأجهزة وبدون ترك أثر.",
      provider: { "@id": "https://sigma-safe.com/#organization" },
      areaServed: "EG",
    },
    {
      "@type": "Service",
      position: 5,
      name: "أنظمة الإطفاء بالرغوة (Foam Systems)",
      description: "حلول متقدمة للمستودعات ومحطات الوقود والمخازن الكيميائية للسيطرة السريعة على حرائق السوائل.",
      provider: { "@id": "https://sigma-safe.com/#organization" },
      areaServed: "EG",
    },
    {
      "@type": "Service",
      position: 6,
      name: "عقود الصيانة والاختبار الدوري (Maintenance)",
      description: "زيارات وقائية واختبارات ضغط ومعايرة دورية مع تقارير هندسية معتمدة لضمان الجاهزية الدائمة.",
      provider: { "@id": "https://sigma-safe.com/#organization" },
      areaServed: "EG",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "هل أنظمة سيجما سيف معتمدة ومطابقة لاشتراطات الحماية المدنية؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم، جميع مخططاتنا وأعمالنا الهندسية مصممة ومنفذة وفق اشتراطات إدارة الحماية المدنية المصرية وأحدث معايير وأكواد الجمعية الوطنية الأمريكية للحماية من الحرائق (NFPA).",
      },
    },
    {
      "@type": "Question",
      name: "ما هي الخدمات الهندسية الأساسية التي تقدمها الشركة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نقدم حلولاً متكاملة «مفتاح في اليد» تشمل دراسة وتصميم وتوريد وتركيب وصيانة شبكات الرشاشات المائية، محطات ومضخات الحريق، أنظمة الإنذار المبكر، غازات الإخماد النظيف FM200 و CO2، أنظمة الرغوة، وتجهيزات السلامة والصحة المهنية.",
      },
    },
    {
      "@type": "Question",
      name: "كيف يمكنني طلب معاينة فنية مجانية لمنشأتي؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "يمكنك طلب المعاينة مباشرة عبر ملء نموذج التواصل على الموقع، أو التواصل الفوري عبر واتساب أو الاتصال بالأرقام المباشرة: 01039661221 / 01039595147، وسيتواصل معك مهندس متخصص لتحديد موعد الزيارة الميدانية.",
      },
    },
    {
      "@type": "Question",
      name: "ما الفرق بين أنظمة الإطفاء المائية وغازات FM200 النظيفة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تُستخدم شبكات الرشاشات المائية للمباني العامة والمستودعات والمصانع للسيطرة على الحرائق الكبرى، بينما تُخصص أنظمة الغازات النظيفة مثل FM200 لغرف السيرفرات والتحكم ومراكز البيانات الحساسة لإخماد الحريق خلال ثوانٍ معدودة دون إتلاف الأجهزة ودون ترك أي رواسب أو مياه.",
      },
    },
    {
      "@type": "Question",
      name: "هل تقدمون عقود صيانة دورية واختبارات لشبكات الحريق القائمة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم، نوفر عقود صيانة دورية وقائية تشمل فحص مضخات الحريق، اختبارات ضغط الشبكات، فحص لوحات الإنذار والكواشف، وإصدار تقارير فنية معتمدة تضمن الجاهزية الدائمة لمنشأتك وتوافقها مع التفتيش الرقابي.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: "https://sigma-safe.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "من نحن",
      item: "https://sigma-safe.com/#about",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "خدماتنا",
      item: "https://sigma-safe.com/#services",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "لماذا نحن",
      item: "https://sigma-safe.com/#why",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "أعمالنا",
      item: "https://sigma-safe.com/#gallery",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "الأسئلة الشائعة",
      item: "https://sigma-safe.com/#faq",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "تواصل معنا",
      item: "https://sigma-safe.com/#contact",
    },
  ],
};

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "معرض مشروعات ووحدات ضخ سيجما سيف",
  description: "صور محطات ومضخات الحريق وشبكات الإطفاء ولوحات التحكم المنفذة بواسطة سيجما سيف في مصر",
  image: GALLERY_IMAGES.map((img, i) => ({
    "@type": "ImageObject",
    contentUrl: `https://sigma-safe.com${img}`,
    name: `مشروع سيجما سيف لأنظمة الإطفاء والإنذار — وحدة رقم ${i + 1}`,
    description: "تصميم وتوريد وتركيب واختبار مضخات الحريق ولوحات التحكم وفق معايير NFPA",
    creditText: "SIGMA SAFE",
    copyrightHolder: {
      "@id": "https://sigma-safe.com/#organization",
    },
  })),
};

const structuredData = [
  localBusinessSchema,
  webSiteSchema,
  servicesSchema,
  faqSchema,
  breadcrumbSchema,
  imageGallerySchema,
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollProgress />
      <Navbar />
      {/* remounts on user-initiated AR↔EN switch so every scroll-reveal
          section re-evaluates its in-view state (no blank sections) */}
      <LangRemount>
        <main id="main-content" className="flex-1">
          <Hero />
          <Partners />
          <About />
          <Services />
          <WhyUs />
          <Process />
          <Gallery />
          <Clients />
          <Faq />
          <CtaBand />
          <Contact />
        </main>
      </LangRemount>
      <Footer />
      <BackToTop />
    </div>
  );
}
