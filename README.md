# سيجما سيف — SIGMA SAFE

موقع شركة سيجما سيف للمقاولات العامة والتوريدات العمومية ونظم الإطفاء والإنذار ومكافحة الحريق.

Built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **Prisma ORM (SQLite)**.

---

## 🚀 المميزات الرئيسية (Features)

- **أداء عالي وسرعة فائقة:** مبني بأحدث تقنيات Next.js و React 19 مع تحسين متقدم للأصول والصور (AVIF / WebP) والخطوط.
- **دعم كامل للغتين (Bilingual):** عربي (افتراضي RTL) وإنجليزي (LTR) مع تبديل سلس بدون وميض وبدون فراغات في حركات التمرير.
- **أمان متقدم (Security Hardened):**
  - ترويسات أمان شاملة (CSP, HSTS, X-Frame-Options, Permissions-Policy).
  - تحديد معدل الطلبات في الذاكرة (Rate Limiting: 5 طلبات / 10 دقائق لكل IP).
  - حماية من البوتات وحقول مصيدة (Honeypot + Minimum submission duration check).
  - فحص وتنظيف شامل لمدخلات المستخدم (Data sanitization).
  - إخفاء ترويسة `X-Powered-By`.
- **ربط واتساب فوري (WhatsApp Integration):**
  - تحويل استفسارات نموذج التواصل مباشرة إلى محادثة واتساب منسقة للعميل والإدارة.
  - دعم إشعارات WhatsApp Cloud API التلقائية.
- **قاعدة بيانات مدمجة خفيفة (SQLite + Prisma):**
  - حفظ الرسائل والاستفسارات محلياً وبأمان مع فهارس زمنية لتسريع الاستعلام.
- **فحص صحة الخادم (Health Check):**
  - مسار `/api/health` لمراقبة استقرار الخادم وقاعدة البيانات بشكل دوري.

---

## 🛠️ متطلبات التشغيل (Prerequisites)

- **Node.js:** الإصدار 20.x أو 24.x
- **npm:** الإصدار 10.x فما فوق

---

## 💻 التشغيل المحلي (Local Development)

1. **استنساخ المشروع وتثبيت الحزم:**
   ```bash
   npm install
   ```

2. **إعداد متغيرات البيئة:**
   انسخ ملف `.env.example` إلى `.env`:
   ```bash
   cp .env.example .env
   ```

3. **تهيئة قاعدة البيانات:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **تشغيل خادم التطوير:**
   ```bash
   npm run dev
   ```
   افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

---

## 🌐 النشر على هوستنجر (Hostinger Deployment)

### الطريقة الأولى: باستخدام Docker على Hostinger VPS (موصى بها)

المشروع يحتوي على `Dockerfile` متعدد المراحل (Multi-stage build) ومحسن للإنتاج:

1. **بناء الحاوية وتشغيلها:**
   ```bash
   docker build -t sigma-safe .
   docker run -d \
     -p 3000:3000 \
     --name sigma-safe-app \
     --restart unless-stopped \
     -v sigma_data:/app/db \
     -e DATABASE_URL="file:../db/custom.db" \
     -e WHATSAPP_NOTIFY_PHONE="201039661221" \
     sigma-safe
   ```

2. **ربط الدومين:**
   قم بتوجيه Nginx أو Caddy على السيرفر كـ Reverse Proxy إلى `http://127.0.0.1:3000` مع تفعيل شهادة SSL (Let's Encrypt).

---

### الطريقة الثانية: تشغيل مباشر عبر PM2 / Hostinger Node.js

1. **على السيرفر، ثبت الحزم وابنِ المشروع:**
   ```bash
   npm ci
   npx prisma db push
   npm run build
   ```

2. **تشغيل التطبيق بواسطة PM2:**
   ```bash
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   ```

3. **التحقق من حالة التطبيق:**
   ```bash
   pm2 status
   curl http://localhost:3000/api/health
   ```

---

## 📂 بنية المشروع المنظفة (Project Structure)

```text
├── public/                 # الصور الثابتة والرموز وملف robots.txt
├── prisma/
│   └── schema.prisma       # مخطط قاعدة البيانات (SQLite)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/    # واجهة برمجة استقبال رسائل التواصل
│   │   │   └── health/     # فحص صحة التطبيق
│   │   ├── error.tsx       # صفحة معالجة الأخطاء
│   │   ├── not-found.tsx   # صفحة 404 المخصصة
│   │   ├── sitemap.ts      # خريطة الموقع لمحركات البحث
│   │   ├── layout.tsx      # الإطار الأساسي والخطوط
│   │   └── page.tsx        # الصفحة الرئيسية للشركة
│   ├── components/
│   │   ├── site/           # أقسام الموقع المخصصة
│   │   └── ui/             # مكونات الواجهة الأساسية (Input, Select, Textarea, Sonner)
│   └── lib/
│       ├── db.ts           # عميل Prisma الموحد
│       ├── env.ts          # التحقق من متغيرات البيئة عبر Zod
│       ├── rate-limit.ts   # محدد معدل الطلبات للحماية من الهجمات
│       ├── validation.ts   # مخططات التحقق المشتركة ومكافحة السبام
│       ├── whatsapp.ts     # خدمة تنسيق ورسائل واتساب
│       └── site.ts         # بيانات الموقع والهواتف
├── Dockerfile              # إعداد الحاوية للإنتاج
├── ecosystem.config.cjs    # إعدادات PM2 لسيرفر هوستنجر
└── next.config.ts          # إعدادات Next.js والترويسات الأمنية
```

---

## 🛡️ الصيانة والنسخ الاحتياطي (Backups)

- ملف قاعدة البيانات يوجد في مسار `db/custom.db`.
- لعمل نسخة احتياطية سريعة لقاعدة البيانات على السيرفر:
  ```bash
  sqlite3 db/custom.db ".backup 'db/backup_$(date +%F).db'"
  ```
