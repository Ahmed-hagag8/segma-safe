import type { Metadata, Viewport } from "next";
import { Cairo, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppToaster } from "@/components/site/app-toaster";
import { LanguageProvider } from "@/components/site/language-provider";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sigma-safe.eg"),
  title: {
    default: "سيجما سيف | SIGMA SAFE — نظم الإطفاء والإنذار والمقاولات العامة",
    template: "%s | سيجما سيف SIGMA SAFE",
  },
  description:
    "شركة سيجما سيف للمقاولات العامة والتوريدات العمومية — تصميم وتوريد وتركيب وصيانة أنظمة الإطفاء والإنذار، مهام الأمن الصناعي والسلامة المهنية، وفق أحدث الأكواد العالمية. وكيل معتمد — الجيزة، مصر.",
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
    "مقاولات عامة",
    "الجيزة",
    "مصر",
  ],
  authors: [{ name: "Sigma Safe" }],
  icons: { icon: "/images/logo.jpg" },
  openGraph: {
    title: "سيجما سيف | SIGMA SAFE — نظم الإطفاء والإنذار",
    description:
      "تصميم وتوريد وتركيب وصيانة أنظمة الإطفاء والإنذار وفق أحدث الأكواد العالمية — وكيل معتمد.",
    siteName: "SIGMA SAFE — سيجما سيف",
    images: [{ url: "/images/banner-hero.jpg", width: 1536, height: 864 }],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "سيجما سيف | SIGMA SAFE",
    description: "نظم الإطفاء والإنذار والمقاولات العامة — وكيل معتمد",
  },
};

export const viewport: Viewport = {
  themeColor: "#141416",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <AppToaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
