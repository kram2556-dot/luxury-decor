# L’ÉLITE Atelier / نُخبة للتصميم والتنفيذ المعماري

واجهة Whitelabel فاخرة للاستشارات المعمارية، التصميم الداخلي، والتنفيذ المتكامل. صُممت بواجهة RTL عربية افتراضية مع تبديل فوري إلى الإنجليزية.

## ما تم تضمينه

- Hero سينمائي مع دعوات مباشرة للاستشارة.
- حاسبة تكلفة فورية حسب المساحة ومستوى التشطيب، مع handoff جاهز إلى WhatsApp.
- معرض مشاريع قابل للتصفية: سكني، تجاري، إداري.
- Materials Lookbook للخامات: الرخام، النحاس، الخشب، والإضاءة الذكية.
- رحلة مشروع من 5 مراحل: الرؤية، التخطيط، التفاصيل، التنفيذ، التسليم.
- لوحة إدارة Whitelabel في وضع عرض الواجهة، تشمل اسم العلامة، رقم WhatsApp والوصف المختصر.
- Native Image Studio: Dropzone للسحب والإفلات على سطح المكتب، وfile picker مع `accept="image/*"` و`capture="environment"` على الهاتف، مع ضغط Canvas إلى WebP قبل الحفظ في الحالة المحلية.
- قسم About Studio & Heritage تحريري مع قصة التأسيس، الفلسفة، توقيع المديرة الإبداعية، وأربعة مؤشرات إنجاز قابلة للتحرير.
- تبويب **About & Heritage** داخل لوحة الإدارة، إلى جانب تبويبي العلامة وPortfolio & materials.
- `functions/api/[[route]].ts` كنقطة API جاهزة لـ Cloudflare Pages Functions، مع نموذج PBKDF2 وHttpOnly session cookie وD1.
- تصميم متجاوب Mobile-first مع احترام `prefers-reduced-motion` ضمن بنية CSS قابلة للتوسع.

## التشغيل محليًا

```bash
npm install
npm run dev
```

ثم افتح رابط Vite المحلي. لبناء نسخة الإنتاج:

```bash
npm run build
npm run preview
```

## النشر على Cloudflare Pages عبر GitHub

1. ارفع هذا المجلد إلى مستودع GitHub جديد.
2. من Cloudflare Dashboard اختر **Workers & Pages → Create application → Pages → Connect to Git**.
3. اختر مستودع GitHub.
4. استخدم الإعدادات التالية حرفيًا:

| الإعداد | القيمة |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | `22` أو أحدث |

5. اضغط **Save and Deploy**. ملفات `functions/` ستُكتشف تلقائيًا كـ Pages Functions.

## تفعيل المصادقة وD1 في الإنتاج

الواجهة تعمل كـ Demo UI بدون أسرار داخل المتصفح. لتفعيل لوحة الإدارة الفعلية:

1. أنشئ D1 Database من Cloudflare باسم مثلًا `elite-atelier-db`.
2. اربط قاعدة البيانات بصفحة Pages تحت **Settings → Functions → D1 database bindings** باسم binding هو `DB`.
3. أضف Secret باسم `SESSION_SECRET` من **Settings → Environment variables → Secrets**. لا تضعه في GitHub.
4. أنشئ جدول المستخدمين:

```sql
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'owner'
);
```

5. نفّذ عملية seed أولية محمية لإنشاء أول مستخدم. لا تشحن بيانات اعتماد افتراضية أو PIN ثابت.
6. اربط واجهة الدخول في `src/main.jsx` مع `/api/auth/login` عند الانتقال من Demo إلى Production، ثم نفّذ middleware للتحقق من `elite_session` قبل أي mutation endpoint.

> كلمات المرور في Function تُشتق باستخدام PBKDF2 مع SHA-256 و120,000 iteration وsalt فريد لكل مستخدم، والجلسة محفوظة في HttpOnly Secure SameSite cookie.

## Whitelabel في أقل من دقيقتين

لإعادة العلامة التجارية بسرعة، عدّل القيم التالية من لوحة الإدارة بعد تفعيل D1: اسم العلامة، الوصف، رقم WhatsApp، روابط التواصل، المشاريع، ومستويات التسعير. ألوان التصميم الأساسية موجودة في أعلى `src/styles.css` تحت متغيرات CSS: `--obs`, `--char`, `--gold`, `--ivory`.

### Native Image Studio

من لوحة الإدارة افتح تبويب **Portfolio & materials** أو **Brand**. كل صورة تُرفع عبر Dropzone بدل إدخال رابط يدوي. على الكمبيوتر يمكن سحب الصورة إلى المنطقة أو النقر عليها، وعلى الهاتف يفتح `accept="image/*"` معرض الصور/الكاميرا. يتم قراءة الصورة، تصغيرها إلى حد أقصى 1800px، ثم تحويلها إلى WebP بجودة 82% باستخدام Canvas API. النسخة الناتجة تكون Base64/WebP جاهزة لاستبدال الصورة مباشرة؛ ويمكن لاحقًا توصيل دالة `compressImage` بمسار R2/D1 عند الحاجة إلى تخزين دائم.

### About & Heritage

القسم الجديد يظهر بين Materials وMethodology ويتضمن سنة التأسيس، عدد المشاريع، سنوات الخبرة المجمعة، ونسبة التسليم في الموعد. جميع الحقول: قصة التأسيس، الفلسفة، المؤشرات، وبيانات lead architect قابلة للتحرير من تبويب **About & Heritage**.

## ملاحظة عن الصور

الصور الحالية تستخدم روابط Unsplash البعيدة كي يبقى الأرشيف خفيفًا وسهل النشر. يمكن استبدالها لاحقًا بروابط Cloudflare Images/R2 أو صور العميل دون تغيير منطق الواجهة.

## بنية الملفات

```text
l-elite-atelier/
├── index.html
├── package.json
├── README.md
├── functions/
│   └── api/[[route]].ts
├── src/
│   ├── main.jsx
│   └── styles.css
└── dist/              # ينتج بعد npm run build
```
