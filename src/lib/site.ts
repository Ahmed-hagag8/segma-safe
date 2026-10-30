import {
  ShowerHead,
  BellRing,
  Cylinder,
  Waves,
  Gauge,
  Wrench,
  HardHat,
  DraftingCompass,
  ClipboardList,
  PackageCheck,
  BadgeCheck,
  Siren,
  Network,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────  Contact  ───────────────────────── */

export const PHONES = [
  { raw: "01039595147", intl: "+201039595147" },
  { raw: "01557631769", intl: "+201557631769" },
  { raw: "01039548487", intl: "+201039548487" },
  { raw: "01039661221", intl: "+201039661221" },
] as const;

export const WHATSAPP_URL =
  "https://wa.me/201039661221?text=" +
  encodeURIComponent("مرحباً سيجما سيف، أرغب في معاينة فنية لمنشأتي");

export const FACEBOOK_URL = "https://www.facebook.com/share/1Etsno3VRa/";

export const ADDRESS =
  "الجيزة — العجوزة، عمارات الإعلام، عمارة 1، الدور الخامس";

export const COMPANY_NAME_AR = "سيجما سيف";
export const COMPANY_NAME_EN = "SIGMA SAFE";
export const COMPANY_FULL_AR =
  "سيجما سيف للمقاولات العامة والتوريدات العمومية ونظم الإطفاء والإنذار ومهام الأمن الصناعي";

/* ─────────────────────────  Navigation  ───────────────────────── */

export const NAV_LINKS = [
  { href: "#home", label: "الرئيسية" },
  { href: "#about", label: "من نحن" },
  { href: "#services", label: "خدماتنا" },
  { href: "#why", label: "لماذا نحن" },
  { href: "#process", label: "مراحل العمل" },
  { href: "#gallery", label: "أعمالنا" },
  { href: "#contact", label: "تواصل معنا" },
] as const;

/* ─────────────────────────  Partners  ───────────────────────── */

export const PARTNERS = [
  "SEFICO",
  "BRISTOL",
  "TEX",
  "APOLLO",
  "DAHUA",
  "HST",
  "BAVTO",
  "HAMMER",
  "TRENTO",
  "HONEYWELL",
] as const;

/* ─────────────────────────  Stats  ───────────────────────── */

export const STATS = [
  { value: 10, suffix: "+", label: "علامات عالمية شريكة" },
  { value: 8, suffix: "", label: "أنظمة وخدمات متكاملة" },
  { value: 5, suffix: "", label: "مراحل عمل بمعايير عالمية" },
  { value: 4, suffix: "", label: "خطوط خدمة مباشرة" },
] as const;

/* ─────────────────────────  Services  ───────────────────────── */

export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
};

export const SERVICES: Service[] = [
  {
    icon: ShowerHead,
    title: "أنظمة الرشاشات الآلية",
    desc: "شبكات Sprinkler ذاتية التشغيل للكشف والإطفاء الفوري، بمعدلات تصريف محسوبة وفق أكواد NFPA.",
    tags: ["رشاشات", "NFPA 13"],
  },
  {
    icon: Gauge,
    title: "وحدات الضخ ومحطات الحريق",
    desc: "توريد وتركيب وحدات ضخ كهربائية وديزل بمواصفات UL/FM مع لوحات تحكم كاملة.",
    tags: ["Diesel", "Jockey"],
  },
  {
    icon: Siren,
    title: "أنظمة الإنذار والكشف المبكر",
    desc: "أنظمة إنذار حريق عنوانية وتقليدية مع كواشف دخان وحرارة وسخانات وأجهزة إنذار يدوية.",
    tags: ["عنواني", "كواشف"],
  },
  {
    icon: Cylinder,
    title: "أنظمة الإطفاء الغازية",
    desc: "أنظمة إطفاء بالغازات النظيفة FM-200 و CO₂ للغايات الحساسة وغرف التحكم والسيرفرات.",
    tags: ["FM200", "CO₂"],
  },
  {
    icon: Waves,
    title: "أنظمة الإطفاء بالرغوة",
    desc: "أنظمة Foam عالية الكفاءة للمخازن والمنشآت البترولية والسوائل القابلة للاشتعال.",
    tags: ["AFFF", "Bladder Tank"],
  },
  {
    icon: Network,
    title: "شبكات الحريق والهيدرانت",
    desc: "شبكات مواسير وصنابير حريق (هيدرانت) داخلية وخارجية بمقاسات معتمدة واختبارات ضغط.",
    tags: ["هيدرانت", "بوابات"],
  },
  {
    icon: Wrench,
    title: "التوريد والتركيب والصيانة",
    desc: "حلول شاملة «مفتاح في اليد»: دراسة، توريد، تركيب، اختبار، ثم عقود صيانة دورية.",
    tags: ["Turnkey", "صيانة دورية"],
  },
  {
    icon: HardHat,
    title: "الأمن الصناعي والسلامة المهنية",
    desc: "مهام الأمن الصناعي وتجهيز منشآتك بمتطلبات السلامة المهنية المعتمدة من الجهات الرقابية.",
    tags: ["OSHA", "تدريب"],
  },
];

/* ─────────────────────────  Why us  ───────────────────────── */

export const WHY_POINTS = [
  {
    title: "فريق هندسي وفني ذو خبرة عالية",
    desc: "مهندسون وفنيون متخصصون في تصميم وتنفيذ أنظمة الحريق بأعلى معايير الجودة.",
  },
  {
    title: "أحدث المعدات والمواد المعتمدة",
    desc: "نستخدم منتجات عالمية موثوقة من وكلاء معتمدين مع ضمانات حقيقية.",
  },
  {
    title: "تنفيذ دقيق وفق الأكواد العالمية",
    desc: "التزام كامل بمتطلبات NFPA وكود الحماية المدنية المصرية في كل مرحلة.",
  },
  {
    title: "التزام تام بالمواعيد",
    desc: "جداول زمنية واضحة وضبط للتنفيذ نحترم فيها وقت منشأتك وسلامة عاملها.",
  },
  {
    title: "خدمة ما بعد التنفيذ",
    desc: "عقود صيانة دورية وفحص سنوي ودعم فني مستمر لضمان جاهزية النظام دائماً.",
  },
] as const;

export const TRUST_BADGES = [
  { label: "احترافية", icon: BadgeCheck },
  { label: "جودة", icon: BadgeCheck },
  { label: "أمان", icon: BadgeCheck },
  { label: "سرعة تنفيذ", icon: BadgeCheck },
  { label: "التزام", icon: BadgeCheck },
] as const;

/* ─────────────────────────  Process  ───────────────────────── */

export const PROCESS_STEPS: { icon: LucideIcon; title: string; desc: string }[] =
  [
    {
      icon: ClipboardList,
      title: "المعاينة ودراسة الموقع",
      desc: "زيارة فنية مجانية لتحديد المخاطر واحتياجات المنشأة بدقة.",
    },
    {
      icon: DraftingCompass,
      title: "التصميم الهندسي",
      desc: "مخططات تنفيذية وحسابات هيدروليكية معتمدة وفق الأكواد العالمية.",
    },
    {
      icon: PackageCheck,
      title: "التوريد بأعلى جودة",
      desc: "توفير المعدات من وكلاء معتمدين مع شهادات ضمان ومطابقة.",
    },
    {
      icon: Wrench,
      title: "التركيب والاختبار",
      desc: "تنفيذ احترافي يسبقه اختبار ضغط وفحص شامل لكل عنصر بالنظام.",
    },
    {
      icon: BadgeCheck,
      title: "التسليم والصيانة الدورية",
      desc: "تدريب الفريق الداخلي وتسليم الملفات الفنية ثم صيانة دورية مجدولة.",
    },
  ];

/* ─────────────────────────  Gallery  ───────────────────────── */

export const GALLERY = [
  {
    src: "/images/machine-diesel.jpg",
    title: "وحدة ضخ ديزل كاملة",
    desc: "مجموعة ضخ بمحرك ديزل جاهزة للتسليم والتشغيل",
  },
  {
    src: "/images/machine-control.jpg",
    title: "لوحات تحكم وحدات الضخ",
    desc: "لوحات تحكم DIESEL PUMP بأنظمة تشغيل أوتوماتيكية",
  },
  {
    src: "/images/machine-piping.jpg",
    title: "شبكات المواسير والمنظمات",
    desc: "تمديدات حريق وصمامات ومانومترات بمعايير UL/FM",
  },
  {
    src: "/images/machine-unit.jpg",
    title: "وحدة ضخ DIESEL UNIT",
    desc: "تجميع واختبار وحدات الضخ داخل الورشة",
  },
  {
    src: "/images/machine-pumps.jpg",
    title: "مضخات طرد مركزي",
    desc: "مجموعة مضخات حريق رئيسية وJockey بقدرات متعددة",
  },
  {
    src: "/images/machine-assembly.jpg",
    title: "تركيب واختبار اللوحات",
    desc: "أعمال تجميع وبرمجة لوحات التحكم قبل التوريد",
  },
] as const;

/* ─────────────────────────  Clients  ───────────────────────── */

export const CLIENTS = [
  { name: "شركة تويوتا مصر", en: "TOYOTA EGYPT", sector: "سيارات وتوزيع" },
  { name: "غبور أوتو", en: "GHABOUR AUTO", sector: "سيارات وتصنيع" },
  { name: "البدوي ميدكال سنتر", en: "EL BADAWY MEDICAL", sector: "قطاع طبي" },
  { name: "مستشفى ممفيس", en: "MEMPHIS HOSPITAL", sector: "قطاع صحي" },
] as const;

/* ─────────────────────────  Contact form options  ───────────────────────── */

export const SERVICE_OPTIONS = [
  "أنظمة الرشاشات الآلية",
  "وحدات الضخ ومحطات الحريق",
  "أنظمة الإنذار والكشف المبكر",
  "أنظمة الإطفاء الغازية FM200 / CO₂",
  "أنظمة الإطفاء بالرغوة",
  "شبكات الحريق والهيدرانت",
  "صيانة دورية / عقد سنوي",
  "استشارة فنية عامة",
] as const;
