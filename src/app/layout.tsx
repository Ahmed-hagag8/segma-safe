import type { Metadata, Viewport } from "next";
import { Cairo, Geist_Mono, Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppToaster } from "@/components/site/app-toaster";
import { LanguageProvider } from "@/components/site/language-provider";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sigma-safe.com"),
  alternates: {
    canonical: "https://sigma-safe.com",
  },
  title: {
    default: "سيجما سيف | SIGMA SAFE — نظم الإطفاء والإنذار والمقاولات العامة | الجيزة، مصر",
    template: "%s | سيجما سيف SIGMA SAFE",
  },
  description:
    "شركة سيجما سيف للمقاولات العامة والتوريدات العمومية — تصميم وتوريد وتركيب وصيانة أنظمة الإطفاء والإنذار، مهام الأمن الصناعي والسلامة المهنية، وفق أحدث الأكواد العالمية (NFPA). وكيل معتمد — الجيزة، مصر. Certified fire alarm & suppression systems in Egypt.",
  keywords: [
    "سيجما سيف",
    "SIGMA SAFE",
    "أنظمة إطفاء",
    "أنظمة إنذار الحريق",
    "مكافحة حريق",
    "الحماية المدنية",
    "FM200",
    "رشاشات حريق",
    "وحدات ضخ",
    "مضخات حريق",
    "مقاولات عامة",
    "الجيزة",
    "مصر",
    "شركة إطفاء حريق",
    "أنظمة رغوة",
    "إنذار حريق معنون",
    "صيانة أنظمة إطفاء",
    "أمن صناعي",
    "سلامة مهنية",
    "NFPA",
    "fire alarm systems Egypt",
    "fire suppression Egypt",
    "fire fighting contractor",
  ],
  authors: [{ name: "Sigma Safe", url: "https://sigma-safe.com" }],
  creator: "SIGMA SAFE",
  publisher: "SIGMA SAFE",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/images/logo.jpg" },
    ],
    apple: "/images/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "سيجما سيف | SIGMA SAFE — نظم الإطفاء والإنذار والمقاولات العامة",
    description:
      "تصميم وتوريد وتركيب وصيانة أنظمة الإطفاء والإنذار وفق أحدث الأكواد العالمية ومعايير NFPA — وكيل معتمد بالجيزة، مصر.",
    siteName: "SIGMA SAFE — سيجما سيف",
    url: "https://sigma-safe.com",
    images: [
      {
        url: "/images/banner-hero.jpg",
        width: 1536,
        height: 864,
        alt: "سيجما سيف — SIGMA SAFE | أنظمة الإطفاء والإنذار",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "سيجما سيف | SIGMA SAFE — نظم الإطفاء والإنذار",
    description: "تصميم وتوريد وتركيب وصيانة أنظمة الإطفاء والإنذار وفق أحدث الأكواد العالمية — وكيل معتمد",
    images: ["/images/banner-hero.jpg"],
  },
  other: {
    "geo.region": "EG-GZ",
    "geo.placename": "Giza, Egypt",
    "geo.position": "30.0561;31.2089",
    "ICBM": "30.0561, 31.2089",
  },
};

export const viewport: Viewport = {
  themeColor: "#141416",
  width: "device-width",
  initialScale: 1,
};

/* Applies the stored language before first paint — a returning English
   visitor gets <html lang="en" dir="ltr"> immediately, with no Arabic
   flash while the JS bundle hydrates (same trick next-themes uses). */
const langBootstrap = `(function(){try{var l=localStorage.getItem("lang");if(l==="en"||l==="ar"){var d=document.documentElement;d.lang=l;d.dir=l==="en"?"ltr":"rtl"}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBootstrap }} />
      </head>
      <body
        className={`${cairo.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2.5 focus:text-white focus:shadow-xl focus:outline-none"
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionConfig reducedMotion="user">
            <LanguageProvider>
              {children}
              <AppToaster />
            </LanguageProvider>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
