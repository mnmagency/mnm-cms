/**
 * Seed campaign landing pages.
 *
 * Creates 4 `landingPage` documents:
 *   - seo-qatar              → /lp/seo-qatar
 *   - web-development-qatar  → /lp/web-development-qatar
 *   - social-media-qatar     → /lp/social-media-qatar
 *   - bulk-sms-qatar         → /lp/bulk-sms-qatar
 *
 * Run:
 *   npx sanity exec scripts/seed-landing-pages.ts --with-user-token
 *
 * Each landing page uses `createOrReplace` so the seed is idempotent —
 * running it again overwrites with the latest content. Once you start
 * editing in Studio, DO NOT re-run this script (or you'll lose edits).
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

type L = {en: string; ar: string}
const bi = (en: string, ar: string): L => ({en, ar})

type LandingPageSeed = {
  slug: string
  serviceTag: string
  seo: {metaTitle: L; metaDescription: L; focusKeyword: L}
  hero: {eyebrow: L; title: L; subtitle: L; ctaText: L; trustNote?: L}
  pains: {eyebrow: L; title: L; subtitle?: L; items: Array<{title: L; description: L}>}
  includes: {eyebrow: L; title: L; subtitle?: L; items: Array<{title: L; description: L}>}
  process: {eyebrow: L; title: L; steps: Array<{title: L; description: L}>}
  proof?: {eyebrow: L; title: L; testimonials?: Array<{quote: L; author: string; role: L}>}
  pricing?: {
    show: boolean
    eyebrow?: L
    title?: L
    subtitle?: L
    tiers?: Array<{
      name: L
      price: string
      period: L
      description?: L
      features: L[]
      ctaText: L
      popular?: boolean
    }>
  }
  faqs: {eyebrow: L; title: L; subtitle?: L; items: Array<{question: L; answer: L}>}
  form: {eyebrow: L; title: L; subtitle: L; submitText: L}
  finalCta: {eyebrow?: L; title: L; subtitle: L; buttonText: L}
}

// ──────────────────────────────────────────────────────────────────────
// LP 1 — SEO Retainers Qatar
// ──────────────────────────────────────────────────────────────────────

const SEO_LP: LandingPageSeed = {
  slug: 'seo-qatar',
  serviceTag: 'SEO Retainer Qatar',
  seo: {
    metaTitle: bi(
      'SEO Services in Qatar | Rank #1 on Google | M&M Marketing',
      'خدمات SEO في قطر | تصدّر نتائج جوجل | إم آند إم',
    ),
    metaDescription: bi(
      'Best SEO services in Qatar. We build retainers that get businesses to page one of Google and keep them there. Free audit. No long contracts.',
      'أفضل خدمات SEO في قطر. نبني خططًا تنقل الشركات إلى الصفحة الأولى من جوجل وتحافظ عليها هناك. تدقيق مجاني. بدون عقود طويلة.',
    ),
    focusKeyword: bi('seo qatar', 'SEO قطر'),
  },
  hero: {
    eyebrow: bi('SEO services in Qatar', 'خدمات SEO في قطر'),
    title: bi(
      'Rank #1 on Google in Qatar. Pay for results, not promises.',
      'تصدّر جوجل في قطر. ادفع مقابل النتائج، لا الوعود.',
    ),
    subtitle: bi(
      'We build SEO retainers that get Qatar businesses to page one — and keep them there. Free audit. No long contracts.',
      'نبني خطط SEO تنقل الشركات في قطر إلى الصفحة الأولى — وتبقيها هناك. تدقيق مجاني. بدون عقود طويلة.',
    ),
    ctaText: bi('Get My Free SEO Audit', 'احصل على تدقيق SEO مجاني'),
    trustNote: bi(
      '30-minute call · No commitment · Free audit included',
      'مكالمة 30 دقيقة · بدون التزام · تدقيق مجاني',
    ),
  },
  pains: {
    eyebrow: bi('Sound familiar?', 'هل يبدو هذا مألوفًا؟'),
    title: bi('Why most Qatar SEO efforts fail', 'لماذا تفشل معظم جهود SEO في قطر'),
    items: [
      {
        title: bi("You're invisible on Google", 'أنت غير مرئي على جوجل'),
        description: bi(
          "Your business doesn't appear when customers search 'X in Doha' or 'X near me' in Qatar.",
          'لا يظهر عملك عندما يبحث العملاء عن "X في الدوحة" أو "X بالقرب مني" في قطر.',
        ),
      },
      {
        title: bi('Cheap freelancers built broken backlinks', 'مستقلون رخيصون بنوا روابط خلفية معطلة'),
        description: bi(
          'Spammy backlinks and template content tanked your rankings instead of building authority.',
          'روابط خلفية ضعيفة ومحتوى نمطي أضعف ترتيبك بدلاً من بناء سلطة موقعك.',
        ),
      },
      {
        title: bi('Agencies promise rankings, deliver reports', 'وكالات تعد بالترتيب وتقدم تقارير فقط'),
        description: bi(
          'You pay monthly retainers but never see your business actually move up on Google.',
          'تدفع رسومًا شهرية ولا ترى عملك يتقدم فعليًا على جوجل.',
        ),
      },
      {
        title: bi('Arabic SEO is an afterthought', 'تجاهل تحسين البحث العربي'),
        description: bi(
          "Competitors capture Arabic searches you're not even targeting — and they're outranking you on both languages.",
          'منافسون يستحوذون على عمليات بحث عربية لا تستهدفها أصلاً — ويتفوقون عليك بكلتا اللغتين.',
        ),
      },
    ],
  },
  includes: {
    eyebrow: bi('What you get', 'ما الذي ستحصل عليه'),
    title: bi('Everything you need to dominate Qatar search', 'كل ما تحتاجه للسيطرة على البحث في قطر'),
    items: [
      {
        title: bi('Technical SEO audit & fixes', 'تدقيق وإصلاح تقني لـ SEO'),
        description: bi(
          'We fix every crawl, indexing, speed and Core Web Vitals issue blocking your rankings.',
          'نصلح كل مشكلات الزحف والفهرسة والسرعة ومقاييس Core Web Vitals التي تعيق ترتيبك.',
        ),
      },
      {
        title: bi('Qatar-targeted keyword strategy', 'استراتيجية كلمات مفتاحية مستهدفة لقطر'),
        description: bi(
          'A keyword map covering Doha, Lusail, Al Wakrah and high-intent buyer terms in both English and Arabic.',
          'خريطة كلمات مفتاحية تشمل الدوحة ولوسيل والوكرة ومصطلحات الشراء عالية النية بالإنجليزية والعربية.',
        ),
      },
      {
        title: bi('On-page optimization', 'تحسين الصفحات'),
        description: bi(
          'Titles, descriptions, schema, internal linking — done right, page by page.',
          'العناوين والأوصاف والـ schema والروابط الداخلية — منفذة بشكل صحيح صفحة بصفحة.',
        ),
      },
      {
        title: bi('SEO content production', 'إنتاج محتوى SEO'),
        description: bi(
          'We write 4–8 SEO-optimized articles per month targeting your keyword map.',
          'ننشر 4–8 مقالات محسّنة شهريًا تستهدف خريطة كلماتك المفتاحية.',
        ),
      },
      {
        title: bi('Local SEO & Google Business Profile', 'SEO محلي وملف نشاطك على جوجل'),
        description: bi(
          'Optimize your GBP, citations and local pack rankings in Qatar.',
          'نحسّن ملفك على جوجل والاقتباسات والترتيب في النتائج المحلية في قطر.',
        ),
      },
      {
        title: bi('Authority backlinks', 'روابط خلفية موثوقة'),
        description: bi(
          'Earn links from credible Qatar and GCC publications — not spam directories.',
          'احصل على روابط من منشورات قطرية وخليجية موثوقة — لا أدلة عشوائية.',
        ),
      },
      {
        title: bi('Monthly transparent reporting', 'تقارير شهرية شفافة'),
        description: bi(
          'See rankings, traffic, conversions — not vanity metrics.',
          'تابع الترتيب والزيارات والتحويلات — لا مؤشرات شكلية.',
        ),
      },
      {
        title: bi('Dedicated senior strategist', 'استراتيجي مخصّص'),
        description: bi(
          'One senior strategist owns your account. No account-manager telephone game.',
          'استراتيجي واحد كبير يدير حسابك بالكامل. لا وسطاء في خط التواصل.',
        ),
      },
    ],
  },
  process: {
    eyebrow: bi('How it works', 'كيف نعمل'),
    title: bi('From audit to page one in 90 days', 'من التدقيق إلى الصفحة الأولى خلال 90 يومًا'),
    steps: [
      {
        title: bi('Free audit', 'تدقيق مجاني'),
        description: bi(
          'We analyze your site, competitors and target keywords. You get a detailed report and an honest answer.',
          'نحلّل موقعك ومنافسيك وكلماتك المستهدفة. تحصل على تقرير مفصّل وإجابة صريحة.',
        ),
      },
      {
        title: bi('Strategy & roadmap', 'استراتيجية وخارطة طريق'),
        description: bi(
          'Within 7 days you receive a 90-day roadmap — keywords, content, technical fixes, link plan, KPIs.',
          'خلال 7 أيام تستلم خارطة طريق لـ 90 يومًا — كلمات ومحتوى وإصلاحات تقنية وخطة روابط ومؤشرات.',
        ),
      },
      {
        title: bi('Execution', 'تنفيذ'),
        description: bi(
          'Our team executes. You approve content and watch the dashboard.',
          'فريقنا ينفّذ. أنت تعتمد المحتوى وتراقب لوحة المعلومات.',
        ),
      },
      {
        title: bi('Optimize & scale', 'تحسين وتوسيع'),
        description: bi(
          'Monthly reviews, quarterly strategy updates, continuous testing of what works.',
          'مراجعات شهرية وتحديثات ربع سنوية للاستراتيجية واختبار مستمر لما ينجح.',
        ),
      },
    ],
  },
  pricing: {
    show: true,
    eyebrow: bi('Investment', 'الاستثمار'),
    title: bi('Plans that fit your stage', 'خطط تناسب مرحلتك'),
    subtitle: bi(
      'Transparent retainers. No long-term contracts. Cancel anytime.',
      'خطط شفافة. بدون عقود طويلة. ألغِ في أي وقت.',
    ),
    tiers: [
      {
        name: bi('Starter', 'بداية'),
        price: '5,000 QAR',
        period: bi('/month', '/شهر'),
        description: bi('Local businesses targeting Doha + 1–2 cities', 'شركات محلية تستهدف الدوحة و1–2 من المدن'),
        features: [
          bi('10 target keywords', '10 كلمات مفتاحية مستهدفة'),
          bi('2 articles per month', 'مقالان شهريًا'),
          bi('Google Business Profile optimization', 'تحسين ملف جوجل التجاري'),
          bi('Monthly transparent reporting', 'تقارير شهرية شفافة'),
        ],
        ctaText: bi('Get Started', 'ابدأ الآن'),
      },
      {
        name: bi('Growth', 'نمو'),
        price: '10,000 QAR',
        period: bi('/month', '/شهر'),
        description: bi('Established businesses scaling SEO', 'شركات راسخة توسع استثمارها في SEO'),
        features: [
          bi('30 target keywords', '30 كلمة مفتاحية مستهدفة'),
          bi('4 articles per month', '4 مقالات شهريًا'),
          bi('Link building campaign', 'حملة بناء روابط'),
          bi('Full technical audit & fixes', 'تدقيق تقني كامل وإصلاحات'),
          bi('Dedicated senior strategist', 'استراتيجي كبير مخصّص'),
        ],
        ctaText: bi('Get Started', 'ابدأ الآن'),
        popular: true,
      },
      {
        name: bi('Enterprise', 'مؤسسات'),
        price: '20,000 QAR+',
        period: bi('/month', '/شهر'),
        description: bi('Multi-location or competitive verticals', 'فروع متعددة أو قطاعات تنافسية'),
        features: [
          bi('60+ keywords', '60+ كلمة مفتاحية'),
          bi('8 articles per month', '8 مقالات شهريًا'),
          bi('Premium backlink program', 'برنامج روابط متميز'),
          bi('Conversion rate optimization', 'تحسين معدل التحويل'),
          bi('Weekly strategy calls', 'مكالمات استراتيجية أسبوعية'),
        ],
        ctaText: bi('Talk to Sales', 'تحدّث معنا'),
      },
    ],
  },
  faqs: {
    eyebrow: bi('Questions', 'أسئلة'),
    title: bi('Frequently asked', 'الأسئلة الشائعة'),
    items: [
      {
        question: bi('How long until I see results?', 'متى أرى النتائج؟'),
        answer: bi(
          'Most clients see ranking movement within 30–60 days and meaningful traffic growth by month 3. SEO is a compounding investment — month 6+ is where it really pays off.',
          'يلاحظ معظم العملاء تحرّك الترتيب خلال 30–60 يومًا ونموًا ملحوظًا في الزيارات بحلول الشهر الثالث. SEO استثمار تراكمي — العائد الكبير يبدأ من الشهر السادس فأكثر.',
        ),
      },
      {
        question: bi('Do you work with my industry?', 'هل تعملون مع قطاعي؟'),
        answer: bi(
          "Yes. We've ranked Qatar businesses in automotive, schools, retail, hospitality, real estate and B2B services. SEO fundamentals are universal — strategy adapts to your market.",
          'نعم. رفعنا ترتيب شركات قطرية في السيارات والمدارس والتجزئة والضيافة والعقارات وخدمات B2B. أساسيات SEO عامة — والاستراتيجية تتكيّف مع سوقك.',
        ),
      },
      {
        question: bi('What if my competitors are spending more?', 'ماذا لو كان منافسوني ينفقون أكثر؟'),
        answer: bi(
          'Smart strategy beats big budgets. We pick winnable battles and compound your authority over time. Many clients outrank competitors spending 3x more.',
          'الاستراتيجية الذكية تتغلّب على الميزانية الكبيرة. نختار المعارك القابلة للفوز ونبني سلطتك تراكميًا. كثير من عملائنا يتقدّمون على منافسين ينفقون 3 أضعاف.',
        ),
      },
      {
        question: bi('Can I cancel anytime?', 'هل يمكنني الإلغاء في أي وقت؟'),
        answer: bi(
          'Yes. No long contracts. We earn your retainer every month.',
          'نعم. بدون عقود طويلة. نستحق رسومك كل شهر.',
        ),
      },
      {
        question: bi('Do you do Arabic SEO too?', 'هل تقدّمون SEO عربي أيضًا؟'),
        answer: bi(
          'Yes — fully bilingual EN/AR keyword strategy, content production and on-page optimization. Many Qatar businesses leave 40–60% of their potential traffic on the table by ignoring Arabic.',
          'نعم — استراتيجية كلمات ومحتوى وتحسين صفحات بكلتا اللغتين. كثير من الشركات القطرية تخسر 40–60% من زياراتها المحتملة بإهمال العربية.',
        ),
      },
    ],
  },
  form: {
    eyebrow: bi('Free SEO audit', 'تدقيق SEO مجاني'),
    title: bi('Tell us about your business', 'أخبرنا عن عملك'),
    subtitle: bi(
      "We'll get back to you within 24 hours with your free audit and a 90-day roadmap.",
      'سنرد عليك خلال 24 ساعة بتدقيقك المجاني وخارطة طريق لـ 90 يومًا.',
    ),
    submitText: bi('Get My Free Audit', 'احصل على تدقيقي المجاني'),
  },
  finalCta: {
    eyebrow: bi('Ready?', 'جاهز؟'),
    title: bi(
      'Stop leaving Qatar customers to your competitors.',
      'لا تترك عملاء قطر لمنافسيك.',
    ),
    subtitle: bi(
      'Get your free SEO audit and a 90-day roadmap. No commitment.',
      'احصل على تدقيق SEO مجاني وخارطة طريق لـ 90 يومًا. بدون التزام.',
    ),
    buttonText: bi('Get My Free Audit', 'احصل على تدقيقي المجاني'),
  },
}

// ──────────────────────────────────────────────────────────────────────
// LP 2 — Web Development Qatar
// ──────────────────────────────────────────────────────────────────────

const WEB_LP: LandingPageSeed = {
  slug: 'web-development-qatar',
  serviceTag: 'Web Development Qatar',
  seo: {
    metaTitle: bi(
      'Web Development in Qatar | High-Converting Websites | M&M',
      'تطوير المواقع في قطر | مواقع تحقّق التحويلات | إم آند إم',
    ),
    metaDescription: bi(
      'Top web development agency in Qatar. We design and build fast, SEO-friendly websites that turn visitors into customers. Delivered in 30 days.',
      'أفضل وكالة تطوير مواقع في قطر. نصمم ونبني مواقع سريعة وصديقة لمحركات البحث تحوّل الزوار إلى عملاء. التسليم خلال 30 يومًا.',
    ),
    focusKeyword: bi('web development qatar', 'تطوير مواقع قطر'),
  },
  hero: {
    eyebrow: bi('Web development in Qatar', 'تطوير المواقع في قطر'),
    title: bi(
      'Websites that turn Qatar visitors into customers.',
      'مواقع تحوّل زوار قطر إلى عملاء.',
    ),
    subtitle: bi(
      'We design and build fast, SEO-friendly, conversion-focused websites for Qatar businesses — delivered in 30 days.',
      'نصمم ونبني مواقع سريعة وصديقة لمحركات البحث ومركّزة على التحويل — التسليم خلال 30 يومًا.',
    ),
    ctaText: bi('Book Free Consultation', 'احجز استشارة مجانية'),
    trustNote: bi('Free consultation · Live in 30 days · Fully managed', 'استشارة مجانية · جاهز في 30 يومًا · إدارة كاملة'),
  },
  pains: {
    eyebrow: bi('Sound familiar?', 'هل يبدو هذا مألوفًا؟'),
    title: bi('Why most Qatar websites fail', 'لماذا تفشل معظم المواقع في قطر'),
    items: [
      {
        title: bi('Your site looks dated', 'موقعك يبدو قديمًا'),
        description: bi(
          "Visitors land, glance at your site, and bounce. The design doesn't match the quality of your business.",
          'يدخل الزوار، يلقون نظرة سريعة، ويغادرون. التصميم لا يعكس جودة عملك.',
        ),
      },
      {
        title: bi("It's painfully slow", 'الموقع بطيء جدًا'),
        description: bi(
          "Pages take 5+ seconds to load. Mobile is worse. Google penalizes you and visitors leave.",
          'الصفحات تستغرق 5 ثوانٍ أو أكثر للتحميل. وعلى الجوال أسوأ. جوجل يعاقبك والزوار يغادرون.',
        ),
      },
      {
        title: bi("It doesn't convert", 'الموقع لا يحوّل'),
        description: bi(
          "Plenty of traffic but no leads. Your contact form is buried and your CTAs are weak.",
          'زيارات كثيرة لكن لا عملاء محتملين. نموذج التواصل مخفي وعبارات الحث ضعيفة.',
        ),
      },
      {
        title: bi('Your developer ghosted you', 'مطورك اختفى'),
        description: bi(
          'You paid for a website. Now nobody answers when something breaks or you need a small update.',
          'دفعت مقابل موقع. والآن لا أحد يرد عندما يحدث خلل أو تحتاج تعديلًا بسيطًا.',
        ),
      },
    ],
  },
  includes: {
    eyebrow: bi('What you get', 'ما الذي ستحصل عليه'),
    title: bi('Everything to launch and grow', 'كل ما تحتاجه للإطلاق والنمو'),
    items: [
      {
        title: bi('Conversion-focused design', 'تصميم مركّز على التحويل'),
        description: bi(
          'Every page built around clear CTAs, trust signals and a fast path to contact.',
          'كل صفحة مبنية حول دعوات واضحة للعمل وعناصر ثقة ومسار سريع للتواصل.',
        ),
      },
      {
        title: bi('Bilingual EN/AR ready', 'جاهز بالعربية والإنجليزية'),
        description: bi(
          'Full RTL Arabic support out of the box. One CMS for both languages.',
          'دعم كامل للعربية RTL من البداية. لوحة تحكم واحدة للغتين.',
        ),
      },
      {
        title: bi('SEO foundation built-in', 'أساسات SEO مدمجة'),
        description: bi(
          'Schema markup, sitemap, fast Core Web Vitals — ready to rank from day one.',
          'بيانات Schema وخرائط الموقع وأداء Core Web Vitals — جاهز للترتيب من اليوم الأول.',
        ),
      },
      {
        title: bi('CMS you can actually use', 'لوحة تحكم سهلة الاستخدام'),
        description: bi(
          'Edit every page, image and product yourself — no developer needed for content changes.',
          'حرّر كل صفحة وصورة ومنتج بنفسك — بدون حاجة لمطوّر لتعديلات المحتوى.',
        ),
      },
      {
        title: bi('Hosting + maintenance', 'استضافة وصيانة'),
        description: bi(
          'We host, monitor and maintain your site. Backups, security, uptime — all handled.',
          'نستضيف ونراقب ونصون موقعك. نسخ احتياطية، أمان، وقت تشغيل — كله مغطى.',
        ),
      },
      {
        title: bi('Analytics + dashboards', 'تحليلات ولوحات معلومات'),
        description: bi(
          'Google Analytics, Search Console, conversion tracking — see what works.',
          'Google Analytics وSearch Console وتتبع التحويلات — اعرف ما الذي ينجح.',
        ),
      },
    ],
  },
  process: {
    eyebrow: bi('How it works', 'كيف نعمل'),
    title: bi('From kick-off to launch in 30 days', 'من الانطلاق إلى الإطلاق خلال 30 يومًا'),
    steps: [
      {
        title: bi('Strategy call', 'مكالمة استراتيجية'),
        description: bi(
          'We learn your business, goals, audience and competitors. You leave with a clear scope.',
          'نتعرّف على عملك وأهدافك وجمهورك ومنافسيك. تخرج بنطاق عمل واضح.',
        ),
      },
      {
        title: bi('Design & content', 'تصميم ومحتوى'),
        description: bi(
          'Week 1–2: design mockups, copywriting, image sourcing. You review and approve.',
          'الأسبوع 1–2: نماذج تصميم وكتابة محتوى واختيار صور. تراجع وتعتمد.',
        ),
      },
      {
        title: bi('Build', 'بناء'),
        description: bi(
          'Week 3: we build the site, integrate CMS, set up SEO foundations.',
          'الأسبوع 3: نبني الموقع ونربط لوحة التحكم ونضع أساسات SEO.',
        ),
      },
      {
        title: bi('Launch', 'إطلاق'),
        description: bi(
          'Week 4: testing, polish, launch. Then we monitor and optimize.',
          'الأسبوع 4: اختبار وتحسين وإطلاق. ثم نراقب ونحسّن.',
        ),
      },
    ],
  },
  faqs: {
    eyebrow: bi('Questions', 'أسئلة'),
    title: bi('Frequently asked', 'الأسئلة الشائعة'),
    items: [
      {
        question: bi('How much does a website cost?', 'كم تكلفة الموقع؟'),
        answer: bi(
          'Starts at 12,000 QAR for a 6–8 page conversion-focused site. E-commerce and complex builds scale up from there. Final price depends on scope — we quote after the strategy call.',
          'تبدأ من 12,000 ريال لموقع من 6–8 صفحات مركّز على التحويل. التجارة الإلكترونية والمشاريع المعقدة أعلى. السعر النهائي يعتمد على النطاق — نقدّم العرض بعد مكالمة الاستراتيجية.',
        ),
      },
      {
        question: bi('Can you really deliver in 30 days?', 'هل يمكنكم التسليم حقًا خلال 30 يومًا؟'),
        answer: bi(
          'Yes — for standard scopes with timely approvals from your side. We work in weekly sprints with clear deliverables.',
          'نعم — للنطاقات القياسية مع اعتماد سريع منك. نعمل في sprints أسبوعية مع تسليمات واضحة.',
        ),
      },
      {
        question: bi('Do I own the website?', 'هل أملك الموقع؟'),
        answer: bi(
          'Yes. You own the domain, the code, the content, the CMS. We just build it for you. No lock-in.',
          'نعم. تملك النطاق والكود والمحتوى ولوحة التحكم. نحن فقط نبني لك. بدون قيود.',
        ),
      },
      {
        question: bi('Will it work on mobile?', 'هل يعمل على الجوال؟'),
        answer: bi(
          'Every site is mobile-first. We design for phones first, then scale up to tablet and desktop.',
          'كل موقع نبدأه من الجوال. نصمم للهواتف أولًا ثم نوسّع للأجهزة اللوحية والحواسيب.',
        ),
      },
      {
        question: bi('What happens after launch?', 'ماذا بعد الإطلاق؟'),
        answer: bi(
          "We offer optional maintenance retainers — hosting, backups, security, content updates, performance monitoring. Or hand it over to your team.",
          'نقدّم خطط صيانة اختيارية — استضافة ونسخ احتياطية وأمان وتحديثات محتوى ومراقبة أداء. أو سلّمه لفريقك.',
        ),
      },
    ],
  },
  form: {
    eyebrow: bi('Free consultation', 'استشارة مجانية'),
    title: bi('Tell us about your project', 'أخبرنا عن مشروعك'),
    subtitle: bi(
      "We'll respond within 24 hours with availability and an honest assessment of fit.",
      'سنرد خلال 24 ساعة بتوافرنا وتقييم صريح لمدى التناسب.',
    ),
    submitText: bi('Book Free Consultation', 'احجز استشارة مجانية'),
  },
  finalCta: {
    eyebrow: bi('Ready?', 'جاهز؟'),
    title: bi('Get a website that earns its keep.', 'احصل على موقع يستحق استثمارك.'),
    subtitle: bi(
      'Book a free 30-minute strategy call. We will tell you what your site needs — no sales pitch.',
      'احجز مكالمة استراتيجية مجانية لمدة 30 دقيقة. سنخبرك بما يحتاجه موقعك — بدون عروض بيع.',
    ),
    buttonText: bi('Book My Call', 'احجز مكالمتي'),
  },
}

// ──────────────────────────────────────────────────────────────────────
// LP 3 — Social Media Management Qatar
// ──────────────────────────────────────────────────────────────────────

const SOCIAL_LP: LandingPageSeed = {
  slug: 'social-media-qatar',
  serviceTag: 'Social Media Management Qatar',
  seo: {
    metaTitle: bi(
      'Social Media Management in Qatar | Grow Your Brand | M&M',
      'إدارة السوشيال ميديا في قطر | نمّ علامتك التجارية',
    ),
    metaDescription: bi(
      'Social media management in Qatar. We grow Qatar brands on Instagram, TikTok, X and Snap with content that engages and converts. Free strategy call.',
      'إدارة السوشيال ميديا في قطر. ننمّي علامات قطر على إنستغرام وتيك توك وإكس وسناب بمحتوى يتفاعل ويحوّل. مكالمة استراتيجية مجانية.',
    ),
    focusKeyword: bi('social media management qatar', 'إدارة سوشيال ميديا قطر'),
  },
  hero: {
    eyebrow: bi('Social media in Qatar', 'سوشيال ميديا في قطر'),
    title: bi(
      'Social that grows your brand. Not just your follower count.',
      'سوشيال يبني علامتك. ليس فقط أعداد المتابعين.',
    ),
    subtitle: bi(
      "We manage social media for Qatar brands on Instagram, TikTok, X and Snap — strategy, content, community and reporting that drives real business.",
      'ندير حسابات السوشيال لعلامات قطرية على إنستغرام وتيك توك وإكس وسناب — استراتيجية ومحتوى وتفاعل وتقارير تحرّك أعمالك فعليًا.',
    ),
    ctaText: bi('Get Free Social Audit', 'احصل على تدقيق سوشيال مجاني'),
    trustNote: bi('Free audit · No commitment · Bilingual content', 'تدقيق مجاني · بدون التزام · محتوى بلغتين'),
  },
  pains: {
    eyebrow: bi('Sound familiar?', 'هل يبدو هذا مألوفًا؟'),
    title: bi("Why Qatar brands struggle on social", 'لماذا تواجه العلامات في قطر صعوبة على السوشيال'),
    items: [
      {
        title: bi('Posts get no engagement', 'منشورات بلا تفاعل'),
        description: bi(
          'You post regularly but likes, comments and shares barely move. The algorithm has stopped showing you.',
          'تنشر بانتظام لكن الإعجابات والتعليقات والمشاركات بالكاد تتحرّك. الخوارزمية توقفت عن عرضك.',
        ),
      },
      {
        title: bi('Followers but no customers', 'متابعون لكن بلا عملاء'),
        description: bi(
          "Big follower numbers, zero business impact. Vanity metrics that don't translate to revenue.",
          'أعداد متابعين كبيرة، تأثير تجاري صفر. مقاييس شكلية لا تتحول إلى إيرادات.',
        ),
      },
      {
        title: bi("Content that doesn't fit Qatar", 'محتوى لا يناسب قطر'),
        description: bi(
          "Generic global templates that don't speak to Qatar audience, culture or buying behavior.",
          'قوالب عالمية عامة لا تخاطب الجمهور القطري ولا الثقافة ولا سلوك الشراء.',
        ),
      },
      {
        title: bi('Inconsistent posting', 'نشر غير منتظم'),
        description: bi(
          'You start strong then go silent for weeks. The algorithm punishes inconsistency.',
          'تبدأ بقوة ثم تختفي لأسابيع. الخوارزمية تعاقب عدم الانتظام.',
        ),
      },
    ],
  },
  includes: {
    eyebrow: bi('What you get', 'ما الذي ستحصل عليه'),
    title: bi('Full-stack social media management', 'إدارة سوشيال ميديا متكاملة'),
    items: [
      {
        title: bi('Content strategy', 'استراتيجية محتوى'),
        description: bi(
          'Monthly content calendar tailored to your brand, audience and Qatar trends.',
          'تقويم محتوى شهري مصمّم لعلامتك وجمهورك واتجاهات قطر.',
        ),
      },
      {
        title: bi('Content production', 'إنتاج محتوى'),
        description: bi(
          'Photography, videography, reels, stories, copy — all produced in-house.',
          'تصوير ومونتاج وReels وقصص ونصوص — كل ذلك ينتج داخليًا.',
        ),
      },
      {
        title: bi('Community management', 'إدارة المجتمع'),
        description: bi(
          'DMs, comments, mentions answered in your brand voice in EN and AR — within 2 hours.',
          'رسائل خاصة وتعليقات وإشارات بصوت علامتك بالعربية والإنجليزية — خلال ساعتين.',
        ),
      },
      {
        title: bi('Bilingual content (EN + AR)', 'محتوى بلغتين'),
        description: bi(
          'Captions, hashtags and stories in both languages — written by native speakers.',
          'تعليقات وهاشتاغات وقصص بكلتا اللغتين — يكتبها متحدثون أصليون.',
        ),
      },
      {
        title: bi('Paid social campaigns', 'حملات إعلانية على السوشيال'),
        description: bi(
          'Optional ad management on Meta, TikTok and Snap. Pay only for ad spend on top of retainer.',
          'إدارة إعلانية اختيارية على ميتا وتيك توك وسناب. ادفع فقط مقابل ميزانية الإعلانات فوق رسوم الإدارة.',
        ),
      },
      {
        title: bi('Monthly reporting', 'تقارير شهرية'),
        description: bi(
          'Reach, engagement, conversions, top content — not just follower count.',
          'الوصول والتفاعل والتحويلات وأفضل المحتوى — ليس فقط عدد المتابعين.',
        ),
      },
    ],
  },
  process: {
    eyebrow: bi('How it works', 'كيف نعمل'),
    title: bi('From audit to engaged community', 'من التدقيق إلى مجتمع متفاعل'),
    steps: [
      {
        title: bi('Free audit', 'تدقيق مجاني'),
        description: bi(
          'We analyze your current accounts, competitors and Qatar market signals.',
          'نحلّل حساباتك الحالية ومنافسيك وإشارات السوق القطري.',
        ),
      },
      {
        title: bi('Strategy & calendar', 'استراتيجية وتقويم'),
        description: bi(
          'Within 7 days you receive a content strategy and 30-day calendar for approval.',
          'خلال 7 أيام تستلم استراتيجية محتوى وتقويم 30 يومًا للاعتماد.',
        ),
      },
      {
        title: bi('Produce & post', 'إنتاج ونشر'),
        description: bi(
          'We produce content, you approve, we post on the calendar and engage with your community.',
          'ننتج المحتوى، تعتمده، ننشره وفق التقويم ونتفاعل مع مجتمعك.',
        ),
      },
      {
        title: bi('Optimize monthly', 'تحسين شهري'),
        description: bi(
          'We review what worked, double down on it, drop what flopped.',
          'نراجع ما نجح، نضاعفه، ونتخلّى عن ما فشل.',
        ),
      },
    ],
  },
  faqs: {
    eyebrow: bi('Questions', 'أسئلة'),
    title: bi('Frequently asked', 'الأسئلة الشائعة'),
    items: [
      {
        question: bi('Which platforms do you cover?', 'ما المنصات التي تدعمونها؟'),
        answer: bi(
          'Instagram, TikTok, X (Twitter), Snapchat, LinkedIn, YouTube. We pick the right mix for your audience — not all of them at once.',
          'إنستغرام، تيك توك، إكس (تويتر)، سناب شات، لينكدإن، يوتيوب. نختار المزيج المناسب لجمهورك — وليس جميعها دفعة واحدة.',
        ),
      },
      {
        question: bi('Do you create video content?', 'هل تنتجون محتوى فيديو؟'),
        answer: bi(
          'Yes — reels, TikToks, shorts and longer-form video. We also coordinate location shoots when needed.',
          'نعم — Reels وتيك توك وShorts وفيديوهات أطول. ونرتّب التصوير في الموقع عند الحاجة.',
        ),
      },
      {
        question: bi('How many posts per month?', 'كم منشور شهريًا؟'),
        answer: bi(
          'Depends on the package. Starter: 12 posts. Growth: 24 posts + 8 reels. Premium: daily content + ads.',
          'يعتمد على الباقة. بداية: 12 منشورًا. نمو: 24 منشورًا + 8 Reels. متميز: محتوى يومي + إعلانات.',
        ),
      },
      {
        question: bi('Can I review content before it goes live?', 'هل أراجع المحتوى قبل النشر؟'),
        answer: bi(
          "Yes. All content goes through a shared approval flow. Nothing posts without your sign-off.",
          'نعم. كل محتوى يمرّ بتدفّق اعتماد مشترك. لا شيء يُنشر بدون موافقتك.',
        ),
      },
      {
        question: bi('What about ad budget?', 'ماذا عن ميزانية الإعلانات؟'),
        answer: bi(
          'Ad spend is separate from our management fee — you decide your budget and pay platforms directly. We manage and optimize.',
          'ميزانية الإعلانات منفصلة عن رسوم الإدارة — تحدّد ميزانيتك وتدفع للمنصات مباشرة. نحن ندير ونحسّن.',
        ),
      },
    ],
  },
  form: {
    eyebrow: bi('Free social audit', 'تدقيق سوشيال مجاني'),
    title: bi('Tell us about your brand', 'أخبرنا عن علامتك'),
    subtitle: bi(
      "We'll respond within 24 hours with your free audit and a tailored content plan.",
      'سنرد خلال 24 ساعة بتدقيقك المجاني وخطة محتوى مصمّمة لك.',
    ),
    submitText: bi('Get Free Audit', 'احصل على تدقيق مجاني'),
  },
  finalCta: {
    eyebrow: bi('Ready?', 'جاهز؟'),
    title: bi('Stop posting into the void.', 'توقّف عن النشر في الفراغ.'),
    subtitle: bi(
      'Get a free social audit and a content plan that actually moves the needle.',
      'احصل على تدقيق سوشيال مجاني وخطة محتوى تُحدث فرقًا حقيقيًا.',
    ),
    buttonText: bi('Get Free Audit', 'احصل على تدقيق مجاني'),
  },
}

// ──────────────────────────────────────────────────────────────────────
// LP 4 — Bulk SMS Qatar
// ──────────────────────────────────────────────────────────────────────

const SMS_LP: LandingPageSeed = {
  slug: 'bulk-sms-qatar',
  serviceTag: 'Bulk SMS Qatar',
  seo: {
    metaTitle: bi(
      'Bulk SMS in Qatar | High-Conversion SMS Campaigns | M&M',
      'الرسائل النصية الجماعية في قطر | حملات SMS عالية التحويل',
    ),
    metaDescription: bi(
      'Bulk SMS marketing in Qatar. Reach thousands of qualified leads instantly with high-converting SMS campaigns. Pay-per-send. No setup fees.',
      'تسويق الرسائل النصية الجماعية في قطر. وصِل إلى آلاف العملاء المحتملين فورًا بحملات عالية التحويل. ادفع لكل إرسال. بدون رسوم إعداد.',
    ),
    focusKeyword: bi('bulk sms qatar', 'رسائل نصية جماعية قطر'),
  },
  hero: {
    eyebrow: bi('Bulk SMS in Qatar', 'رسائل نصية جماعية في قطر'),
    title: bi(
      "98% open rates. Delivered to phones in Qatar in seconds.",
      'معدل فتح 98%. تصل إلى الهواتف في قطر خلال ثوانٍ.',
    ),
    subtitle: bi(
      'Skip the inbox spam filter. Reach Qatar customers instantly with high-converting SMS — promotions, reminders, alerts, lead-gen.',
      'تجاوز فلاتر البريد العشوائي. صِل إلى عملاء قطر فورًا برسائل SMS عالية التحويل — عروض، تذكيرات، تنبيهات، توليد عملاء.',
    ),
    ctaText: bi('Get SMS Pricing', 'اطلب أسعار SMS'),
    trustNote: bi('Pay-per-send · No setup fees · Sender ID approved', 'ادفع لكل إرسال · بدون رسوم إعداد · معرف المرسل معتمد'),
  },
  pains: {
    eyebrow: bi('Sound familiar?', 'هل يبدو هذا مألوفًا؟'),
    title: bi('Why other channels stop working', 'لماذا تتوقف القنوات الأخرى عن العمل'),
    items: [
      {
        title: bi('Email open rates are dying', 'معدلات فتح الإيميل تتراجع'),
        description: bi(
          'Average email open rate is below 20%. Your customers never even see your promotions.',
          'متوسط فتح الإيميل أقل من 20%. عملاؤك لا يرون عروضك أصلًا.',
        ),
      },
      {
        title: bi('Social reach is shrinking', 'الوصول على السوشيال يتقلّص'),
        description: bi(
          'Organic reach on Meta and TikTok keeps dropping. You need ad budget just to be seen.',
          'الوصول العضوي على ميتا وتيك توك يتراجع باستمرار. تحتاج ميزانية إعلانية لمجرد الظهور.',
        ),
      },
      {
        title: bi('Call centers cost a fortune', 'مراكز الاتصال باهظة التكلفة'),
        description: bi(
          'Hiring callers, paying salaries, training, scripts — the cost-per-lead is unsustainable.',
          'توظيف ودفع رواتب وتدريب وسكريبتات — تكلفة العميل الواحد غير مستدامة.',
        ),
      },
      {
        title: bi("You can't reach customers fast", 'لا يمكنك الوصول للعملاء بسرعة'),
        description: bi(
          'Flash sales, urgent alerts, time-sensitive offers — by the time customers check email, the moment has passed.',
          'تخفيضات سريعة، تنبيهات عاجلة، عروض محدودة الوقت — حين يرى العملاء الإيميل، تكون اللحظة قد فاتت.',
        ),
      },
    ],
  },
  includes: {
    eyebrow: bi('What you get', 'ما الذي ستحصل عليه'),
    title: bi('Everything to run SMS campaigns at scale', 'كل ما تحتاجه لتشغيل حملات SMS بحجم كبير'),
    items: [
      {
        title: bi('Direct Qatar carrier delivery', 'توصيل مباشر عبر شركات الاتصالات في قطر'),
        description: bi(
          'Direct routes to Ooredoo and Vodafone Qatar — fastest delivery, best rates.',
          'مسارات مباشرة إلى Ooredoo وVodafone قطر — أسرع توصيل وأفضل أسعار.',
        ),
      },
      {
        title: bi('Branded Sender ID', 'معرف المرسل المؤسسي'),
        description: bi(
          "We register your business name as the sender so customers see 'YourBrand' — not a random number.",
          'نسجّل اسم نشاطك كمعرّف مرسل ليرى العملاء "علامتك" — لا رقمًا عشوائيًا.',
        ),
      },
      {
        title: bi('Bilingual messaging (EN + AR)', 'رسائل بلغتين'),
        description: bi(
          'Full Arabic Unicode support. Send in Arabic, English or mixed.',
          'دعم كامل للعربية بيونيكود. أرسل بالعربية أو الإنجليزية أو مختلطة.',
        ),
      },
      {
        title: bi('Campaign management', 'إدارة الحملات'),
        description: bi(
          'We schedule, send, track delivery, retry failures, and report on every campaign.',
          'نجدول وننفّذ ونتتبّع التوصيل ونعيد محاولة الفاشلة ونقدّم تقارير عن كل حملة.',
        ),
      },
      {
        title: bi('Copy & A/B testing', 'كتابة واختبار A/B'),
        description: bi(
          'We write high-converting copy and test variants — short, urgent, action-oriented.',
          'نكتب نصوصًا عالية التحويل ونختبر النسخ — قصيرة وعاجلة ومركّزة على الفعل.',
        ),
      },
      {
        title: bi('Compliance handled', 'الامتثال مغطّى'),
        description: bi(
          'Opt-out management, CRA-compliant content, do-not-disturb hours — all configured.',
          'إدارة إلغاء الاشتراك ومحتوى متوافق مع CRA وأوقات عدم الإزعاج — جميعها معدّة.',
        ),
      },
    ],
  },
  process: {
    eyebrow: bi('How it works', 'كيف نعمل'),
    title: bi('From kick-off to first send in 3 days', 'من البدء إلى أول إرسال خلال 3 أيام'),
    steps: [
      {
        title: bi('Strategy & list', 'استراتيجية وقائمة'),
        description: bi(
          'We design your campaign, segment your audience and prepare the recipient list.',
          'نصمّم حملتك ونقسّم جمهورك ونعدّ قائمة المستلمين.',
        ),
      },
      {
        title: bi('Setup & approval', 'إعداد واعتماد'),
        description: bi(
          'Sender ID registration, message copy approval, test sends.',
          'تسجيل معرّف المرسل واعتماد نص الرسالة وإرسالات اختبار.',
        ),
      },
      {
        title: bi('Send', 'إرسال'),
        description: bi(
          'Campaign goes live. Real-time delivery tracking.',
          'الحملة تنطلق. تتبّع التوصيل لحظيًا.',
        ),
      },
      {
        title: bi('Report & repeat', 'تقرير وتكرار'),
        description: bi(
          'Delivery, click-through and conversion reporting within 24 hours of send.',
          'تقرير التوصيل والنقرات والتحويلات خلال 24 ساعة من الإرسال.',
        ),
      },
    ],
  },
  faqs: {
    eyebrow: bi('Questions', 'أسئلة'),
    title: bi('Frequently asked', 'الأسئلة الشائعة'),
    items: [
      {
        question: bi('How much does each SMS cost?', 'كم تكلفة الرسالة الواحدة؟'),
        answer: bi(
          'Pricing depends on volume — starts at 0.15 QAR per message and drops to 0.08 QAR at scale. We send a custom quote after our first call.',
          'السعر يعتمد على الكمية — يبدأ من 0.15 ريال للرسالة وينخفض إلى 0.08 ريال للحجم الكبير. نرسل عرضًا مخصّصًا بعد المكالمة الأولى.',
        ),
      },
      {
        question: bi('Do I provide the phone numbers?', 'هل أوفّر أرقام الهواتف؟'),
        answer: bi(
          'You provide your customer/lead list. We can also source compliant Qatar lead lists by demographic if needed.',
          'أنت تقدّم قائمة عملائك. يمكننا أيضًا توفير قوائم متوافقة في قطر مصنّفة ديموغرافيًا عند الحاجة.',
        ),
      },
      {
        question: bi('Will my brand name appear as sender?', 'هل سيظهر اسم علامتي كمرسل؟'),
        answer: bi(
          'Yes — we register your Sender ID with Qatar carriers (typically 1–3 days). Approved IDs show your brand instead of a number.',
          'نعم — نسجّل معرّف المرسل لدى شركات الاتصال (عادة 1–3 أيام). المعرفات المعتمدة تُظهر اسم علامتك بدلًا من رقم.',
        ),
      },
      {
        question: bi('Can I track who clicked links?', 'هل يمكنني تتبّع من نقر على الروابط؟'),
        answer: bi(
          'Yes — we use short links with click tracking. You see exactly which recipients opened links and what they did next.',
          'نعم — نستخدم روابط قصيرة مع تتبّع النقرات. ترى بالضبط من فتح الروابط وما فعلوا بعد ذلك.',
        ),
      },
      {
        question: bi('Is this compliant in Qatar?', 'هل هذا متوافق مع قوانين قطر؟'),
        answer: bi(
          'Yes — we follow CRA (Communications Regulatory Authority) guidelines: opt-in, opt-out, sender ID, do-not-disturb hours. We handle compliance.',
          'نعم — نتّبع إرشادات هيئة تنظيم الاتصالات: الاشتراك والإلغاء ومعرّف المرسل وأوقات عدم الإزعاج. نحن نتولّى الامتثال.',
        ),
      },
    ],
  },
  form: {
    eyebrow: bi('Free SMS quote', 'عرض SMS مجاني'),
    title: bi('Tell us about your campaign', 'أخبرنا عن حملتك'),
    subtitle: bi(
      "We'll send a custom quote and sender ID setup plan within 24 hours.",
      'سنرسل عرضًا مخصّصًا وخطة إعداد معرّف المرسل خلال 24 ساعة.',
    ),
    submitText: bi('Get SMS Pricing', 'اطلب أسعار SMS'),
  },
  finalCta: {
    eyebrow: bi('Ready?', 'جاهز؟'),
    title: bi('Reach every Qatar customer in seconds.', 'صِل إلى كل عميل في قطر خلال ثوانٍ.'),
    subtitle: bi(
      'Get a custom SMS quote and start your first campaign this week.',
      'احصل على عرض SMS مخصّص وابدأ حملتك الأولى هذا الأسبوع.',
    ),
    buttonText: bi('Get SMS Pricing', 'اطلب أسعار SMS'),
  },
}

// ──────────────────────────────────────────────────────────────────────
// Common form section copy fallback (used when LP doesn't override)
// ──────────────────────────────────────────────────────────────────────

const LANDING_PAGES = [SEO_LP, WEB_LP, SOCIAL_LP, SMS_LP]

// ──────────────────────────────────────────────────────────────────────
// Build Sanity document shape
// ──────────────────────────────────────────────────────────────────────

function toDoc(lp: LandingPageSeed) {
  return {
    _id: `landingPage-${lp.slug}`,
    _type: 'landingPage',
    slug: {_type: 'slug', current: lp.slug},
    serviceTag: lp.serviceTag,
    seo: lp.seo,
    hero: lp.hero,
    pains: lp.pains,
    includes: lp.includes,
    process: lp.process,
    proof: lp.proof,
    pricing: lp.pricing,
    faqs: lp.faqs,
    form: lp.form,
    finalCta: lp.finalCta,
  }
}

async function run() {
  console.log('\n── Seeding landing pages ──\n')
  for (const lp of LANDING_PAGES) {
    const doc = toDoc(lp)
    try {
      await client.createOrReplace(doc)
      console.log(`  ✓ /lp/${lp.slug}  (service tag: ${lp.serviceTag})`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ✗ /lp/${lp.slug} —`, msg)
    }
  }
  console.log('\n✓ Seed complete.\n')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
