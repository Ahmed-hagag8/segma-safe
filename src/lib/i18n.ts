/* ─────────────────────────────────────────────────────────────────────────
   SIGMA SAFE — bilingual dictionary (AR / EN)
   Single source of truth for every translatable string on the landing page.
   ───────────────────────────────────────────────────────────────────────── */

export type Lang = "ar" | "en";

const ar = {
  meta: {
    brandShort: "سيجما سيف",
    brandTagline: "سيجما سيف للمقاولات العامة",
    companyFull:
      "سيجما سيف للمقاولات العامة والتوريدات العمومية ونظم الإطفاء والإنذار ومهام الأمن الصناعي",
    address: "الجيزة — العجوزة، عمارات الإعلام، عمارة 1، الدور الخامس",
    langToggle: "English",
    langToggleAria: "التبديل إلى الإنجليزية",
  },

  nav: {
    links: [
      { href: "#home", label: "الرئيسية" },
      { href: "#about", label: "من نحن" },
      { href: "#services", label: "خدماتنا" },
      { href: "#why", label: "لماذا نحن" },
      { href: "#process", label: "مراحل العمل" },
      { href: "#gallery", label: "أعمالنا" },
      { href: "#contact", label: "تواصل معنا" },
    ],
    freeSurvey: "معاينة مجانية",
    freeSurveyLong: "احصل على معاينة مجانية",
    callUs: "اتصل بنا الآن:",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    mainNav: "التنقل الرئيسي",
    mobileNav: "قائمة الجوال",
    homeAria: "سيجما سيف — الرئيسية",
  },

  hero: {
    badge: "وكيل معتمد لأشهر الماركات العالمية",
    l1: "نحمي منشأتك بأنظمة",
    hl: "الإطفاء والإنذار",
    l2b: "الأكثر موثوقية",
    l3: "وفق أحدث الأكواد العالمية",
    desc: "سيجما سيف — تصميم وتوريد وتركيب وصيانة أنظمة الإطفاء والإنذار ومهام الأمن الصناعي، بمعاينة فنية مجانية والتزام تام بمعايير الجودة والسلامة.",
    ctaPrimary: "احصل على معاينة مجانية",
    ctaWhatsapp: "واتساب فوري",
    captionTitle: "وحدات ضخ حريق كاملة",
    captionSub: "توريد • تركيب • اختبار • صيانة",
    float1Title: "معتمدون من",
    float1Sub: "الحماية المدنية",
    float2Title: "جودة",
    float2Sub: "بلا حدود",
    float2Note: "وفق أكواد NFPA العالمية",
    scrollCue: "اكتشف المزيد",
    scrollAria: "مرر للأسفل",
    introAria: "المقدمة",
    stats: [
      "علامات عالمية شريكة",
      "أنظمة وخدمات متكاملة",
      "مراحل عمل بمعايير عالمية",
      "قنوات تواصل مباشرة",
    ],
  },

  partners: {
    note: "وكيل معتمد لماركات عالمية رائدة في تقنيات الحريق والأمان",
    aria: "شركاؤنا والوكالات",
  },

  about: {
    eyebrow: "من نحن",
    title: "شركة رائدة في عالم",
    highlight: "الحماية من الحريق",
    body: "سيجما سيف للمقاولات العامة هي إحدى الشركات الرائدة في مجال تصميم وتنفيذ وصيانة أنظمة الإطفاء والإنذار، وتقديم حلول ضمان السلامة الصناعية. نلتزم بتقديم أعلى معايير الجودة والسلامة وفقاً لأحدث الأكواد العالمية، لنمنح عملاءنا بيئة عمل آمنة وموثوقة.",
    highlights: [
      "تصميم وتنفيذ وصيانة أنظمة الإطفاء والإنذار",
      "التزام بأحدث الأكواد ومعايير الجودة العالمية",
      "توريدات عمومية ومهام أمن صناعي وسلامة مهنية",
    ],
    explore: "استكشف جميع خدماتنا",
    stampTitle: "سلامة معتمدة",
    stampSub: "معايير عالمية",
    img1Alt: "لوحات تحكم وحدات ضخ الحريق من أعمال سيجما سيف",
    img2Alt: "تجميع واختبار لوحات التحكم",
  },

  services: {
    eyebrow: "خدماتنا",
    title: "أنظمة حماية متكاملة",
    highlight: "من أشهر الماركات العالمية",
    desc: "حلول شاملة «مفتاح في اليد» — من الدراسة والتصميم حتى التركيب والصيانة الدورية، بمعدات معتمدة من كبرى الشركات العالمية.",
    cta: "اطلب استشارة فنية مجانية",
    items: [
      {
        title: "أنظمة الرشاشات الآلية",
        desc: "شبكات Sprinkler ذاتية التشغيل للكشف والإطفاء الفوري، بمعدلات تصريف محسوبة وفق أكواد NFPA.",
        tags: ["رشاشات", "NFPA 13"],
      },
      {
        title: "وحدات الضخ ومحطات الحريق",
        desc: "توريد وتركيب وحدات ضخ كهربائية وديزل بمواصفات UL/FM مع لوحات تحكم كاملة.",
        tags: ["ديزل", "جاكي"],
      },
      {
        title: "أنظمة الإنذار والكشف المبكر",
        desc: "أنظمة إنذار حريق عنوانية وتقليدية مع كواشف دخان وحرارة وسخانات وأجهزة إنذار يدوية.",
        tags: ["عنواني", "كواشف"],
      },
      {
        title: "أنظمة الإطفاء الغازية",
        desc: "أنظمة إطفاء بالغازات النظيفة FM-200 و CO₂ للغايات الحساسة وغرف التحكم والسيرفرات.",
        tags: ["FM200", "CO₂"],
      },
      {
        title: "أنظمة الإطفاء بالرغوة",
        desc: "أنظمة Foam عالية الكفاءة للمخازن والمنشآت البترولية والسوائل القابلة للاشتعال.",
        tags: ["AFFF", "خزان الرغوة"],
      },
      {
        title: "شبكات الحريق والهيدرانت",
        desc: "شبكات مواسير وصنابير حريق (هيدرانت) داخلية وخارجية بمقاسات معتمدة واختبارات ضغط.",
        tags: ["هيدرانت", "بوابات"],
      },
      {
        title: "التوريد والتركيب والصيانة",
        desc: "حلول شاملة «مفتاح في اليد»: دراسة، توريد، تركيب، اختبار، ثم عقود صيانة دورية.",
        tags: ["مفتاح في اليد", "صيانة دورية"],
      },
      {
        title: "الأمن الصناعي والسلامة المهنية",
        desc: "مهام الأمن الصناعي وتجهيز منشآتك بمتطلبات السلامة المهنية المعتمدة من الجهات الرقابية.",
        tags: ["OSHA", "تدريب"],
      },
    ],
  },

  why: {
    eyebrow: "لماذا نحن؟",
    title: "خبرتك في الأمان",
    highlight: "مسؤوليتنا",
    desc: "نلتزم بتقديم أنظمة متكاملة تضمن السلامة والوقاية لحماية الأرواح والممتلكات وتحقيق بيئة عمل آمنة.",
    cardTitle: "معتمدون من الحماية المدنية",
    cardSub: "جميع أعمالنا تستوفي اشتراطات الجهات الرقابية المصرية",
    miniBadges: ["دعم فني مستمر", "حلول متكاملة", "فريق متخصص", "خبرة واسعة"],
    points: [
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
    ],
  },

  process: {
    eyebrow: "مراحل العمل",
    title: "من الفكرة إلى الحماية الكاملة في",
    highlight: "5 مراحل",
    desc: "منهجية عمل مدروسة تضمن تسليم نظام حماية جاهز ومختبر وموثق بالكامل.",
    steps: [
      {
        title: "المعاينة ودراسة الموقع",
        desc: "زيارة فنية مجانية لتحديد المخاطر واحتياجات المنشأة بدقة.",
      },
      {
        title: "التصميم الهندسي",
        desc: "مخططات تنفيذية وحسابات هيدروليكية معتمدة وفق الأكواد العالمية.",
      },
      {
        title: "التوريد بأعلى جودة",
        desc: "توفير المعدات من وكلاء معتمدين مع شهادات ضمان ومطابقة.",
      },
      {
        title: "التركيب والاختبار",
        desc: "تنفيذ احترافي يسبقه اختبار ضغط وفحص شامل لكل عنصر بالنظام.",
      },
      {
        title: "التسليم والصيانة الدورية",
        desc: "تدريب الفريق الداخلي وتسليم الملفات الفنية ثم صيانة دورية مجدولة.",
      },
    ],
  },

  gallery: {
    eyebrow: "أعمالنا",
    title: "من تنفيذنا بأيدينا",
    highlight: "…جودة تشوفها",
    desc: "نماذج حقيقية من وحدات الضخ ولوحات التحكم وشبكات الحريق التي جهزناها وركبناها.",
    viewAria: (title: string) => `عرض ${title} بحجم أكبر`,
    closeAria: "إغلاق العرض",
    items: [
      {
        title: "وحدة ضخ ديزل كاملة",
        desc: "مجموعة ضخ بمحرك ديزل جاهزة للتسليم والتشغيل",
      },
      {
        title: "لوحات تحكم وحدات الضخ",
        desc: "لوحات تحكم DIESEL PUMP بأنظمة تشغيل أوتوماتيكية",
      },
      {
        title: "شبكات المواسير والمنظمات",
        desc: "تمديدات حريق وصمامات ومانومترات بمعايير UL/FM",
      },
      {
        title: "وحدة ضخ DIESEL UNIT",
        desc: "تجميع واختبار وحدات الضخ داخل الورشة",
      },
      {
        title: "مضخات طرد مركزي",
        desc: "مجموعة مضخات حريق رئيسية وJockey بقدرات متعددة",
      },
      {
        title: "تركيب واختبار اللوحات",
        desc: "أعمال تجميع وبرمجة لوحات التحكم قبل التوريد",
      },
    ],
  },

  clients: {
    eyebrow: "سابق أعمالنا",
    title: "ثقة كبرى",
    highlight: "الشركات والمؤسسات",
    desc: "نفخر بتقديم خدماتنا لمنشآت قيادية في قطاعات السيارات والصناعة والرعاية الصحية.",
    note: "…ومئات المنشآت السكنية والتجارية والصناعية في جميع محافظات مصر",
    aria: "عملاؤنا",
    items: [
      { latin: "TOYOTA EGYPT", name: "شركة تويوتا مصر", sector: "سيارات وتوزيع" },
      { latin: "GHABOUR AUTO", name: "غبور أوتو", sector: "سيارات وتصنيع" },
      { latin: "EL BADAWY MEDICAL", name: "البدوي ميدكال سنتر", sector: "قطاع طبي" },
      { latin: "MEMPHIS HOSPITAL", name: "مستشفى ممفيس", sector: "قطاع صحي" },
    ],
  },

  cta: {
    title: "جاهز تحمي منشأتك قبل وقوع الخطر؟",
    sub: "احصل على معاينة فنية مجانية وعرض سعر مخصص خلال 48 ساعة",
    whatsapp: "راسلنا واتساب",
    aria: "تواصل سريع",
  },

  contact: {
    eyebrow: "تواصل معنا",
    title: "فريقنا جاهز",
    highlight: "لخدمتك الآن",
    desc: "أرسل طلبك وسيتواصل معك مهندسونا، أو اتصل بنا مباشرة.",
    linesTitle: "خط الخدمة المباشر",
    waTitle: "واتساب — رد فوري",
    waCta: "اضغط لبدء المحادثة",
    addressTitle: "المقر الرئيسي",
    hoursTitle: "مواعيد العمل",
    hoursBody: "السبت — الخميس: 9 صباحاً حتى 6 مساءً",
    hoursEmergency: "طوارئ على مدار الساعة عبر واتساب",
    formTitle: "اطلب",
    formHighlight: "معاينة مجانية",
    formSub: "املأ البيانات وسيتواصل معك مهندس مختص لتحديد موعد الزيارة.",
    nameLabel: "الاسم بالكامل *",
    namePh: "مثال: م. أحمد محمد",
    phoneLabel: "رقم الهاتف *",
    companyLabel: "اسم المنشأة / الشركة",
    companyPh: "اختياري",
    serviceLabel: "نوع الخدمة المطلوبة",
    servicePh: "اختر الخدمة المناسبة",
    messageLabel: "تفاصيل الطلب *",
    messagePh: "اكتب لنا عن منشأتك ونوع النظام المطلوب (مساحة تقريبية، عدد الأدوار…)",
    submit: "أرسل الطلب الآن",
    submitting: "جارٍ الإرسال…",
    privacy: "بياناتك محفوظة بسرية تامة ولن تُستخدم إلا للتواصل معك",
    errName: "من فضلك أدخل الاسم بالكامل",
    errPhone: "رقم الهاتف غير صحيح",
    errMessage: "من فضلك اكتب تفاصيل أكثر عن احتياجك (10 أحرف على الأقل)",
    toastOk: "تم إرسال طلبك بنجاح!",
    toastOkDesc: "سيتواصل معك فريقنا الفني في أقرب وقت — شكراً لثقتك في سيجما سيف.",
    toastErr: "تعذر إرسال الطلب",
    toastErrDesc: "من فضلك حاول مرة أخرى أو اتصل بنا مباشرة على رقمنا.",
    serviceOptions: [
      "أنظمة الرشاشات الآلية",
      "وحدات الضخ ومحطات الحريق",
      "أنظمة الإنذار والكشف المبكر",
      "أنظمة الإطفاء الغازية FM200 / CO₂",
      "أنظمة الإطفاء بالرغوة",
      "شبكات الحريق والهيدرانت",
      "صيانة دورية / عقد سنوي",
      "استشارة فنية عامة",
    ],
  },

  footer: {
    quickLinks: "روابط سريعة",
    servicesTitle: "خدماتنا",
    contactTitle: "تواصل معنا",
    rights: "جميع الحقوق محفوظة",
    logoAlt: "شعار سيجما سيف",
    whatsapp: "واتساب",
    bottomEn: "SIGMA SAFE — Fire Fighting & Alarm Systems",
  },

  misc: {
    backToTop: "العودة للأعلى",
    themeToggle: "تبديل الوضع الداكن / الفاتح",
    heroImgAlt: "وحدة ضخ حريق ديزل من تنفيذ سيجما سيف",
    heroMachineAlt: "وحدة ضخ حريق ديزل من تنفيذ سيجما سيف",
  },
};

export type Dict = typeof ar;

const en: Dict = {
  meta: {
    brandShort: "Sigma Safe",
    brandTagline: "Sigma Safe General Contracting",
    companyFull:
      "Sigma Safe for General Contracting, Public Supplies, Fire Suppression & Alarm Systems, and Industrial Security Missions",
    address: "Giza — El Agouza, Media Buildings, Building 1, 5th Floor",
    langToggle: "عربي",
    langToggleAria: "Switch to Arabic",
  },

  nav: {
    links: [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About Us" },
      { href: "#services", label: "Our Services" },
      { href: "#why", label: "Why Us" },
      { href: "#process", label: "Work Process" },
      { href: "#gallery", label: "Our Work" },
      { href: "#contact", label: "Contact Us" },
    ],
    freeSurvey: "Free Survey",
    freeSurveyLong: "Get a Free Survey",
    callUs: "Call us now:",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile menu",
    homeAria: "Sigma Safe — Home",
  },

  hero: {
    badge: "Authorized agent for leading global brands",
    l1: "We protect your facility with",
    hl: "fire suppression & alarm",
    l2b: "systems you can trust",
    l3: "To the latest international codes",
    desc: "Sigma Safe — design, supply, installation and maintenance of fire suppression and alarm systems and industrial security missions, with a free technical survey and full commitment to quality and safety standards.",
    ctaPrimary: "Get a Free Survey",
    ctaWhatsapp: "Instant WhatsApp",
    captionTitle: "Complete Fire Pump Units",
    captionSub: "Supply • Install • Test • Maintain",
    float1Title: "Certified by",
    float1Sub: "Civil Defense",
    float2Title: "Limitless",
    float2Sub: "Quality",
    float2Note: "Per NFPA international codes",
    scrollCue: "Discover more",
    scrollAria: "Scroll down",
    introAria: "Introduction",
    stats: [
      "Global partner brands",
      "Integrated systems & services",
      "Work stages to global standards",
      "Direct contact channels",
    ],
  },

  partners: {
    note: "Authorized agent for leading global brands in fire & safety technology",
    aria: "Our partners & agencies",
  },

  about: {
    eyebrow: "About Us",
    title: "A leader in the world of",
    highlight: "Fire Protection",
    body: "Sigma Safe General Contracting is one of the leading companies in designing, executing and maintaining fire suppression and alarm systems, delivering industrial safety solutions. We are committed to the highest standards of quality and safety in accordance with the latest international codes, giving our clients a safe and reliable working environment.",
    highlights: [
      "Design, execution and maintenance of fire suppression & alarm systems",
      "Compliance with the latest international codes and quality standards",
      "General supplies, industrial security and occupational safety missions",
    ],
    explore: "Explore all our services",
    stampTitle: "Certified Safety",
    stampSub: "Global standards",
    img1Alt: "Fire pump control panels executed by Sigma Safe",
    img2Alt: "Assembly and testing of control panels",
  },

  services: {
    eyebrow: "Our Services",
    title: "Integrated protection systems",
    highlight: "from the world's leading brands",
    desc: "Comprehensive turnkey solutions — from study and design through installation and periodic maintenance, with certified equipment from major global companies.",
    cta: "Request a free technical consultation",
    items: [
      {
        title: "Automatic Sprinkler Systems",
        desc: "Self-activating sprinkler networks for instant detection and suppression, with discharge rates calculated to NFPA codes.",
        tags: ["Sprinklers", "NFPA 13"],
      },
      {
        title: "Fire Pumps & Pump Stations",
        desc: "Supply and installation of electric and diesel pump sets to UL/FM specifications with complete control panels.",
        tags: ["Diesel", "Jockey"],
      },
      {
        title: "Alarm & Early Detection Systems",
        desc: "Addressable and conventional fire alarm systems with smoke and heat detectors, sounders and manual call points.",
        tags: ["Addressable", "Detectors"],
      },
      {
        title: "Clean Agent Suppression",
        desc: "FM-200 and CO₂ clean-agent suppression systems for sensitive areas, control rooms and server rooms.",
        tags: ["FM200", "CO₂"],
      },
      {
        title: "Foam Suppression Systems",
        desc: "High-efficiency foam systems for warehouses, petrochemical facilities and flammable liquid storage.",
        tags: ["AFFF", "Bladder Tank"],
      },
      {
        title: "Fire Networks & Hydrants",
        desc: "Internal and external piping networks and hydrant valves in approved sizes with pressure testing.",
        tags: ["Hydrants", "Gate Valves"],
      },
      {
        title: "Supply, Installation & Maintenance",
        desc: "Full turnkey solutions: study, supply, installation, testing, then periodic maintenance contracts.",
        tags: ["Turnkey", "Periodic Maintenance"],
      },
      {
        title: "Industrial Safety & Occupational HSE",
        desc: "Industrial security missions and equipping your facility with regulator-approved occupational safety requirements.",
        tags: ["OSHA", "Training"],
      },
    ],
  },

  why: {
    eyebrow: "Why Us?",
    title: "Your safety is",
    highlight: "our responsibility",
    desc: "We are committed to delivering integrated systems that ensure safety and prevention, protecting lives and property and achieving a secure working environment.",
    cardTitle: "Certified by the Civil Defense",
    cardSub: "All our work meets the requirements of the Egyptian regulatory authorities",
    miniBadges: [
      "Continuous technical support",
      "Integrated solutions",
      "Specialized team",
      "Extensive experience",
    ],
    points: [
      {
        title: "Highly experienced engineering team",
        desc: "Engineers and technicians specialized in designing and executing fire systems to the highest quality standards.",
      },
      {
        title: "State-of-the-art certified equipment",
        desc: "We use trusted global products from authorized agents with genuine warranties.",
      },
      {
        title: "Precise execution to global codes",
        desc: "Full compliance with NFPA requirements and the Egyptian civil defense code at every stage.",
      },
      {
        title: "On-time delivery, always",
        desc: "Clear schedules and disciplined execution that respect your facility's time and the safety of its people.",
      },
      {
        title: "Post-execution service",
        desc: "Periodic maintenance contracts, annual inspection and continuous technical support to keep your system ready.",
      },
    ],
  },

  process: {
    eyebrow: "Work Process",
    title: "From idea to full protection in",
    highlight: "5 stages",
    desc: "A well-studied methodology that ensures delivering a protection system that is ready, tested and fully documented.",
    steps: [
      {
        title: "Site Survey & Study",
        desc: "A free technical visit to precisely identify risks and your facility's needs.",
      },
      {
        title: "Engineering Design",
        desc: "Executable drawings and hydraulic calculations approved to international codes.",
      },
      {
        title: "Premium Supply",
        desc: "Equipment sourced from authorized agents with warranty and conformity certificates.",
      },
      {
        title: "Installation & Testing",
        desc: "Professional execution preceded by pressure testing and a full inspection of every element.",
      },
      {
        title: "Handover & Maintenance",
        desc: "Training the in-house team, delivering technical files, then scheduled periodic maintenance.",
      },
    ],
  },

  gallery: {
    eyebrow: "Our Work",
    title: "Crafted by our own hands",
    highlight: "…quality you can see",
    desc: "Real examples of the pump units, control panels and fire networks we have supplied and installed.",
    viewAria: (title: string) => `View ${title} larger`,
    closeAria: "Close preview",
    items: [
      {
        title: "Complete Diesel Pump Unit",
        desc: "Diesel-engine pump set ready for delivery and operation",
      },
      {
        title: "Pump Control Panels",
        desc: "DIESEL PUMP control panels with automatic starting systems",
      },
      {
        title: "Piping Networks & Valves",
        desc: "Fire piping, valves and manometers to UL/FM standards",
      },
      {
        title: "DIESEL UNIT Pump Set",
        desc: "Assembly and testing of pump units inside the workshop",
      },
      {
        title: "Centrifugal Pumps",
        desc: "Main fire pumps and jockey sets in multiple capacities",
      },
      {
        title: "Panel Assembly & Testing",
        desc: "Assembly and programming of control panels before delivery",
      },
    ],
  },

  clients: {
    eyebrow: "Track Record",
    title: "The trust of leading",
    highlight: "companies & institutions",
    desc: "We are proud to serve leading facilities across the automotive, industrial and healthcare sectors.",
    note: "…and hundreds of residential, commercial and industrial facilities across all Egyptian governorates",
    aria: "Our clients",
    items: [
      { latin: "TOYOTA EGYPT", name: "Toyota Egypt", sector: "Automotive & distribution" },
      { latin: "GHABOUR AUTO", name: "Ghabour Auto", sector: "Automotive & manufacturing" },
      { latin: "EL BADAWY MEDICAL", name: "El Badawy Medical Center", sector: "Medical sector" },
      { latin: "MEMPHIS HOSPITAL", name: "Memphis Hospital", sector: "Healthcare" },
    ],
  },

  cta: {
    title: "Ready to protect your facility before danger strikes?",
    sub: "Get a free technical survey and a tailored quotation within 48 hours",
    whatsapp: "Message us on WhatsApp",
    aria: "Quick contact",
  },

  contact: {
    eyebrow: "Contact Us",
    title: "Our team is ready",
    highlight: "to serve you now",
    desc: "Send your request and our engineers will contact you, or call us directly.",
    linesTitle: "Direct Service Line",
    waTitle: "WhatsApp — Instant Reply",
    waCta: "Start chatting",
    addressTitle: "Head Office",
    hoursTitle: "Working Hours",
    hoursBody: "Saturday — Thursday: 9 AM to 6 PM",
    hoursEmergency: "24/7 emergencies via WhatsApp",
    formTitle: "Request a",
    formHighlight: "Free Survey",
    formSub: "Fill in your details and a specialized engineer will contact you to schedule the visit.",
    nameLabel: "Full Name *",
    namePh: "e.g. Eng. Ahmed Mohamed",
    phoneLabel: "Phone Number *",
    companyLabel: "Facility / Company",
    companyPh: "Optional",
    serviceLabel: "Service Type",
    servicePh: "Select a suitable service",
    messageLabel: "Request Details *",
    messagePh: "Tell us about your facility and the required system (approximate area, number of floors…)",
    submit: "Send Request Now",
    submitting: "Sending…",
    privacy: "Your data is kept strictly confidential and used only to contact you",
    errName: "Please enter your full name",
    errPhone: "Invalid phone number",
    errMessage: "Please write more details about your needs (at least 10 characters)",
    toastOk: "Your request was sent successfully!",
    toastOkDesc: "Our technical team will contact you shortly — thank you for trusting Sigma Safe.",
    toastErr: "Failed to send the request",
    toastErrDesc: "Please try again or call us directly.",
    serviceOptions: [
      "Automatic Sprinkler Systems",
      "Fire Pumps & Pump Stations",
      "Alarm & Early Detection Systems",
      "Clean Agent Suppression FM200 / CO₂",
      "Foam Suppression Systems",
      "Fire Networks & Hydrants",
      "Periodic Maintenance / Annual Contract",
      "General Technical Consultation",
    ],
  },

  footer: {
    quickLinks: "Quick Links",
    servicesTitle: "Our Services",
    contactTitle: "Contact Us",
    rights: "All rights reserved",
    logoAlt: "Sigma Safe logo",
    whatsapp: "WhatsApp",
    bottomEn: "SIGMA SAFE — Fire Fighting & Alarm Systems",
  },

  misc: {
    backToTop: "Back to top",
    themeToggle: "Toggle dark / light mode",
    heroImgAlt: "Diesel fire pump unit executed by Sigma Safe",
    heroMachineAlt: "Diesel fire pump unit executed by Sigma Safe",
  },
};

export const translations: Record<Lang, Dict> = { ar, en };

/** WhatsApp deep link with a language-appropriate pre-filled message. */
export function whatsappUrl(lang: Lang): string {
  const text =
    lang === "ar"
      ? "مرحباً سيجما سيف، أرغب في معاينة فنية لمنشأتي"
      : "Hello Sigma Safe, I would like a technical survey for my facility";
  return "https://wa.me/201039661221?text=" + encodeURIComponent(text);
}
