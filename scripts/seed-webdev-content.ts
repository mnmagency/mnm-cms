/**
 * Web Development service — content expansion (headless CMS, Node.js,
 * WordPress vs headless) + consistency fixes.
 *
 *  • service.sections[]: headless explainer, WordPress vs headless table,
 *    tech stack cards, Node.js integrations, 6-step process (6–10 weeks)
 *  • hero description, deliverables, CTA text, meta description refreshed
 *  • "dirham" → "riyal" in Why It Matters
 *  • FAQs: no prices (scoped proposal instead), one consistent timeline,
 *    generic hosting wording, duplicates rewritten into new headless /
 *    WordPress / migration questions, 2 new FAQs (Node.js, headless cost)
 *  • /lp/web-development-qatar: price removed from the cost FAQ
 *
 * Idempotent — re-running sets the same values.
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-webdev-content.ts --with-user-token
 */
/* eslint-disable no-console */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

const SERVICE_ID = '140e8c17-bca6-4f27-8735-f16b89d9dde9'
const LP_ID = 'landingPage-web-development-qatar'
const LP_COST_FAQ_KEY = 'bM4Vn6Xhr0kQ8myfjAYOJM'

// ─── Service fields ─────────────────────────────────────────────────────────
const description = L(
  'Fast, bilingual websites built on a headless CMS (Next.js + Sanity) and Node.js — engineered to rank on Google and AI search and to turn visitors into enquiries. Built in Qatar, for Qatar.',
  'مواقع سريعة وثنائية اللغة مبنية على نظام إدارة محتوى Headless ‏(Next.js وSanity) وNode.js — مصممة لتتصدر نتائج Google والبحث بالذكاء الاصطناعي وتحوّل الزوار إلى استفسارات. نبنيها في قطر، لقطر.',
)

const deliverables: Loc[] = [
  L('Discovery + business model workshop', 'ورشة اكتشاف ونموذج عمل'),
  L('UX research, sitemap, wireframes + prototypes', 'بحث تجربة المستخدم وخريطة الموقع ونماذج أولية تفاعلية'),
  L('Custom UI design (bilingual EN + AR)', 'تصميم واجهات مخصص (ثنائي اللغة EN + AR)'),
  L('Next.js development (modern, fast, secure)', 'تطوير Next.js (حديث، سريع، آمن)'),
  L('Headless CMS (Sanity) for full content control', 'نظام إدارة محتوى Headless ‏(Sanity) للتحكم الكامل في المحتوى'),
  L('Node.js APIs + integrations (CRM, ERP, payments)', 'واجهات برمجة وتكاملات Node.js ‏(CRM وERP والدفع)'),
  L('SEO-ready schema, sitemap, hreflang', 'بيانات منظمة وخريطة موقع وhreflang جاهزة لمحركات البحث'),
  L('CRM + WhatsApp lead routing', 'توجيه العملاء المحتملين إلى CRM وWhatsApp'),
  L('Sub-2s load on Qatar 3G/4G networks', 'تحميل أقل من ثانيتين على شبكات 3G/4G في قطر'),
  L('Analytics + conversion event tracking', 'تحليلات وتتبع أحداث التحويل'),
  L('Domain, hosting, and SSL handled', 'تأمين النطاق والاستضافة وشهادة SSL'),
  L('30-day post-launch tuning + handover training', 'ضبط لمدة 30 يوماً بعد الإطلاق وتدريب على التسليم'),
]

const ctaText = L(
  'Tell us about your business and goals. We’ll come back within 24 hours with a scoped proposal, a realistic timeline, and examples from our portfolio that match what you need.',
  'أخبرنا عن عملك وأهدافك. سنرد خلال 24 ساعة بعرض محدد النطاق وجدول زمني واقعي وأمثلة من أعمالنا تناسب ما تحتاجه.',
)

const metaDescription = L(
  'Web development in Qatar on a headless CMS: fast, secure, bilingual Next.js + Sanity websites with Node.js integrations. See how headless compares to WordPress.',
  'تطوير مواقع في قطر بنظام إدارة محتوى Headless: مواقع Next.js وSanity سريعة وآمنة وثنائية اللغة مع تكاملات Node.js. قارن بين Headless وWordPress.',
)

// ─── Page sections ──────────────────────────────────────────────────────────
const sections = [
  {
    _key: 'headless-why',
    _type: 'textBlock',
    eyebrow: L('Headless, explained', 'ما معنى Headless؟'),
    title: L('Why we build on a headless CMS', 'لماذا نبني على نظام إدارة محتوى Headless'),
    content: L(
      `A traditional CMS like WordPress does two jobs at once: it stores your content and it renders your pages, using themes and plugins added over time. A headless CMS separates those jobs. Your content lives in Sanity — a clean, structured editor your team can use without a developer — and the website itself is a fast Next.js application that pulls that content in and serves pre-built pages from a global CDN.

What that means for your business:

• Speed — pages are pre-rendered and cached close to your visitors, so they load quickly even on mobile networks. Speed affects both your Google ranking and your conversion rate.
• Security — there is no public admin login, database or plugin stack on the live site for attackers to probe.
• Control — your team edits text, images, FAQs and landing pages in English and Arabic from one place, and the design never breaks.
• Future-proofing — the same content can power your website, an app, a kiosk or a WhatsApp flow, because it isn’t locked inside page templates.`,
      `يقوم نظام إدارة المحتوى التقليدي مثل WordPress بمهمتين في الوقت نفسه: يخزّن المحتوى ويعرض الصفحات عبر قوالب وإضافات تتراكم مع الوقت. أما نظام إدارة المحتوى Headless فيفصل بين المهمتين. يعيش محتواك في Sanity — محرر منظم وواضح يستخدمه فريقك دون الحاجة إلى مطوّر — بينما الموقع نفسه تطبيق Next.js سريع يسحب هذا المحتوى ويقدّم صفحات جاهزة مسبقاً عبر شبكة CDN عالمية.

ماذا يعني ذلك لعملك:

• السرعة — تُجهَّز الصفحات مسبقاً وتُخزَّن قريباً من زوارك، فتُحمَّل بسرعة حتى على شبكات الجوال. والسرعة تؤثر في ترتيبك على Google وفي معدل التحويل معاً.
• الأمان — لا توجد لوحة تحكم عامة أو قاعدة بيانات أو إضافات على الموقع المباشر يمكن للمهاجمين استهدافها.
• التحكم — يعدّل فريقك النصوص والصور والأسئلة الشائعة وصفحات الهبوط بالعربية والإنجليزية من مكان واحد، دون أن يتأثر التصميم.
• الاستعداد للمستقبل — يمكن للمحتوى نفسه أن يغذّي موقعك وتطبيقك وشاشات العرض ومحادثات WhatsApp، لأنه غير محبوس داخل قوالب الصفحات.`,
    ),
  },
  {
    _key: 'wp-vs-headless',
    _type: 'comparisonBlock',
    eyebrow: L('WordPress vs headless', 'WordPress مقابل Headless'),
    title: L('WordPress or headless: an honest comparison', 'WordPress أم Headless: مقارنة صريحة'),
    subtitle: L(
      'Both can power a good website. Here’s how they differ on the things that affect your growth.',
      'كلاهما يمكن أن يشغّل موقعاً جيداً. إليك الفرق بينهما في الأمور التي تؤثر في نمو عملك.',
    ),
    criterionLabel: L('What matters', 'المعيار'),
    optionALabel: L('Traditional WordPress', 'WordPress التقليدي'),
    optionBLabel: L('Headless (Next.js + Sanity)', 'Headless ‏(Next.js + Sanity)'),
    rows: [
      {
        _key: 'speed',
        criterion: L('Speed & Core Web Vitals', 'السرعة ومؤشرات Core Web Vitals'),
        optionA: L(
          'Depends on the theme, hosting and plugins; often needs caching plugins and ongoing tuning to stay fast.',
          'تعتمد على القالب والاستضافة والإضافات، وغالباً تحتاج إلى إضافات تخزين مؤقت وضبط مستمر للحفاظ على السرعة.',
        ),
        optionB: L(
          'Pre-rendered pages served from a CDN — consistently fast without plugin workarounds.',
          'صفحات مُجهَّزة مسبقاً تُقدَّم عبر CDN — سرعة ثابتة دون حلول ترقيعية بالإضافات.',
        ),
      },
      {
        _key: 'security',
        criterion: L('Security', 'الأمان'),
        optionA: L(
          'Plugins and themes are the most common attack route, and the admin login is public — it needs constant patching.',
          'الإضافات والقوالب هي أكثر طرق الاختراق شيوعاً، ولوحة الدخول مكشوفة للعامة — يحتاج إلى تحديثات أمنية مستمرة.',
        ),
        optionB: L(
          'No database or admin panel on the live site, so there is far less to attack.',
          'لا قاعدة بيانات ولا لوحة تحكم على الموقع المباشر، فالمساحة المعرّضة للهجوم أصغر بكثير.',
        ),
      },
      {
        _key: 'editing',
        criterion: L('Editing experience', 'تجربة التحرير'),
        optionA: L(
          'Familiar dashboard; page builders are flexible but can break layouts or slow pages down.',
          'لوحة مألوفة؛ أدوات بناء الصفحات مرنة لكنها قد تُفسد التصميم أو تُبطئ الصفحات.',
        ),
        optionB: L(
          'Structured, form-based editing — your team updates content safely without breaking the design.',
          'تحرير منظم عبر حقول واضحة — يحدّث فريقك المحتوى بأمان دون المساس بالتصميم.',
        ),
      },
      {
        _key: 'bilingual',
        criterion: L('English + Arabic', 'العربية والإنجليزية'),
        optionA: L(
          'Usually needs a translation plugin; right-to-left support varies by theme.',
          'يحتاج عادةً إلى إضافة ترجمة، ودعم الاتجاه من اليمين إلى اليسار يختلف حسب القالب.',
        ),
        optionB: L(
          'Both languages modelled from day one, with proper RTL layouts and hreflang.',
          'اللغتان مدمجتان منذ اليوم الأول، مع تخطيط RTL صحيح ووسوم hreflang.',
        ),
      },
      {
        _key: 'seo',
        criterion: L('SEO & AI search', 'SEO والبحث بالذكاء الاصطناعي'),
        optionA: L(
          'Works well with SEO plugins, but heavy themes can drag down performance and markup quality.',
          'يعمل جيداً مع إضافات SEO، لكن القوالب الثقيلة قد تُضعف الأداء وجودة الشيفرة.',
        ),
        optionB: L(
          'Clean HTML, structured data and fast pages built in — what Google and AI answer engines read best.',
          'شيفرة HTML نظيفة وبيانات منظمة وصفحات سريعة مدمجة — وهذا ما تقرؤه Google ومحركات الإجابة بالذكاء الاصطناعي بأفضل شكل.',
        ),
      },
      {
        _key: 'integrations',
        criterion: L('Integrations', 'التكاملات'),
        optionA: L(
          'Thousands of plugins — quick to add, but each one adds weight and risk.',
          'آلاف الإضافات — سهلة التركيب، لكن كل إضافة تزيد الحِمل والمخاطر.',
        ),
        optionB: L(
          'Custom Node.js APIs connect your CRM, ERP, payment gateway or WhatsApp exactly the way you work.',
          'واجهات Node.js مخصصة تربط CRM وERP وبوابة الدفع وWhatsApp بالطريقة التي يعمل بها فريقك تماماً.',
        ),
      },
      {
        _key: 'upfront',
        criterion: L('Upfront cost', 'التكلفة المبدئية'),
        optionA: L(
          'Lower — ready-made themes and plugins speed up simple builds.',
          'أقل — القوالب والإضافات الجاهزة تسرّع بناء المواقع البسيطة.',
        ),
        optionB: L(
          'Higher — every component is designed and built for your brand.',
          'أعلى — كل مكوّن يُصمَّم ويُبنى خصيصاً لعلامتك التجارية.',
        ),
      },
      {
        _key: 'running',
        criterion: L('Running cost', 'تكلفة التشغيل'),
        optionA: L(
          'Plugin licences, security fixes and performance tuning add up over time.',
          'تراخيص الإضافات والإصلاحات الأمنية وضبط الأداء تتراكم تكاليفها مع الوقت.',
        ),
        optionB: L(
          'Fewer moving parts to maintain, and hosting scales automatically with traffic.',
          'عناصر أقل تحتاج إلى صيانة، والاستضافة تتوسع تلقائياً مع حجم الزيارات.',
        ),
      },
      {
        _key: 'best-for',
        criterion: L('Best for', 'الأنسب لـ'),
        optionA: L(
          'Simple sites, blogs and tight budgets where launching fast matters most.',
          'المواقع البسيطة والمدونات والميزانيات المحدودة حين تكون سرعة الإطلاق هي الأولوية.',
        ),
        optionB: L(
          'Brands that compete on search and need bilingual content, integrations or room to grow.',
          'العلامات التي تنافس في نتائج البحث وتحتاج إلى محتوى ثنائي اللغة وتكاملات ومجال للنمو.',
        ),
      },
    ],
    footnote: L(
      'We build both. Headless is our default for growth-focused businesses, but if a well-built WordPress site is the better fit for your goals and budget, we’ll tell you — and build it properly.',
      'نحن نبني الاثنين. Headless هو خيارنا الافتراضي للشركات التي تركّز على النمو، لكن إن كان موقع WordPress مبني بإتقان هو الأنسب لأهدافك وميزانيتك، فسنخبرك بذلك — ونبنيه كما يجب.',
    ),
  },
  {
    _key: 'stack',
    _type: 'cardsBlock',
    numbered: false,
    eyebrow: L('Our stack', 'التقنيات التي نستخدمها'),
    title: L('Modern, proven technology — chosen for speed and control', 'تقنيات حديثة ومجرّبة — نختارها للسرعة والتحكم'),
    subtitle: L(
      'Every layer is there for a reason. You get a site that’s fast today and easy to grow tomorrow.',
      'لكل طبقة سبب واضح. تحصل على موقع سريع اليوم وسهل التوسع غداً.',
    ),
    cards: [
      {
        _key: 'nextjs',
        tag: L('Front end', 'الواجهة الأمامية'),
        title: L('Next.js', 'Next.js'),
        text: L(
          'The React framework behind many of the world’s fastest websites. Pages are pre-rendered for speed and SEO, with dynamic features where you need them.',
          'إطار عمل React الذي يقف خلف كثير من أسرع المواقع في العالم. تُجهَّز الصفحات مسبقاً للسرعة وتحسين محركات البحث، مع ميزات تفاعلية حيث تحتاجها.',
        ),
      },
      {
        _key: 'sanity',
        tag: L('Content', 'المحتوى'),
        title: L('Sanity CMS', 'Sanity CMS'),
        text: L(
          'A headless CMS your marketing team will actually enjoy: structured content, image management and English and Arabic side by side.',
          'نظام إدارة محتوى Headless يستمتع فريق التسويق باستخدامه فعلاً: محتوى منظم وإدارة للصور والعربية والإنجليزية جنباً إلى جنب.',
        ),
      },
      {
        _key: 'nodejs',
        tag: L('Back end', 'الخلفية'),
        title: L('Node.js', 'Node.js'),
        text: L(
          'Fast, scalable server-side JavaScript for APIs, forms, lead routing and integrations with the systems you already run.',
          'JavaScript سريعة وقابلة للتوسع على الخادم لبناء واجهات البرمجة والنماذج وتوجيه العملاء والتكامل مع أنظمتك الحالية.',
        ),
      },
      {
        _key: 'commerce',
        tag: L('E-commerce', 'التجارة الإلكترونية'),
        title: L('Headless commerce', 'تجارة إلكترونية Headless'),
        text: L(
          'For online stores we use headless commerce engines such as Medusa.js, connected to your preferred payment gateway and inventory system.',
          'للمتاجر الإلكترونية نستخدم محركات تجارة Headless مثل Medusa.js، مرتبطة ببوابة الدفع ونظام المخزون الذي تفضّله.',
        ),
      },
      {
        _key: 'tailwind',
        tag: L('Design system', 'نظام التصميم'),
        title: L('Tailwind CSS', 'Tailwind CSS'),
        text: L(
          'A design system built for your brand, not a theme — consistent on every screen size and in both reading directions.',
          'نظام تصميم مبني لعلامتك التجارية لا قالب جاهز — متّسق على جميع أحجام الشاشات وفي اتجاهي القراءة.',
        ),
      },
      {
        _key: 'cloud',
        tag: L('Infrastructure', 'البنية التحتية'),
        title: L('Cloud hosting + CDN', 'استضافة سحابية + CDN'),
        text: L(
          'Enterprise-grade cloud hosting with a global CDN, SSL, automatic scaling and uptime monitoring.',
          'استضافة سحابية بمستوى المؤسسات مع CDN عالمية وشهادة SSL وتوسع تلقائي ومراقبة مستمرة لوقت التشغيل.',
        ),
      },
    ],
  },
  {
    _key: 'nodejs-integrations',
    _type: 'textBlock',
    eyebrow: L('Node.js integrations', 'تكاملات Node.js'),
    title: L('Your website, connected to your business', 'موقعك متصل بأعمالك'),
    content: L(
      `A website shouldn’t be an island. With Node.js we build the APIs that connect your site to the systems you already use — CRM, ERP, booking or inventory platforms, payment gateways, email and WhatsApp — so leads reach the right person instantly, stock and prices stay in sync, and your team stops copying data between tools.

Because the integration layer is custom, it does exactly what your process needs: no plugin compromises, no fragile workarounds, and full control over your data and security.`,
      `لا ينبغي أن يكون موقعك جزيرة معزولة. باستخدام Node.js نبني واجهات البرمجة التي تربط موقعك بالأنظمة التي تستخدمها بالفعل — CRM وERP ومنصات الحجز أو المخزون وبوابات الدفع والبريد الإلكتروني وWhatsApp — فيصل العميل المحتمل إلى الشخص المناسب فوراً، وتبقى الأسعار والمخزون متزامنة، ويتوقف فريقك عن نسخ البيانات بين الأدوات.

ولأن طبقة التكامل مخصصة، فهي تؤدي ما تحتاجه عملياتك بالضبط: دون تنازلات الإضافات، ودون حلول هشّة، مع تحكم كامل في بياناتك وأمانها.`,
    ),
  },
  {
    _key: 'process',
    _type: 'cardsBlock',
    numbered: true,
    eyebrow: L('How we work', 'كيف نعمل'),
    title: L('From brief to launch in clear, two-week sprints', 'من الفكرة إلى الإطلاق عبر مراحل واضحة كل أسبوعين'),
    subtitle: L(
      'A typical marketing website takes 6–10 weeks; e-commerce sites and platforms take 10–16 weeks. You see real progress every two weeks.',
      'يستغرق الموقع التسويقي عادةً من 6 إلى 10 أسابيع، ومواقع التجارة الإلكترونية والمنصات من 10 إلى 16 أسبوعاً. وترى تقدماً حقيقياً كل أسبوعين.',
    ),
    cards: [
      {
        _key: 'discovery',
        tag: L('Week 1', 'الأسبوع 1'),
        title: L('Discovery', 'الاكتشاف'),
        text: L(
          'A workshop on your goals, audience, competitors and KPIs. We agree the sitemap, features and how success will be measured.',
          'ورشة عمل حول أهدافك وجمهورك ومنافسيك ومؤشرات الأداء. نتفق على خريطة الموقع والميزات وطريقة قياس النجاح.',
        ),
      },
      {
        _key: 'ux',
        tag: L('Weeks 2–3', 'الأسابيع 2–3'),
        title: L('UX & content structure', 'تجربة المستخدم وهيكلة المحتوى'),
        text: L(
          'User flows, wireframes and the content model, so the CMS matches how your team actually works.',
          'مسارات المستخدم والنماذج الأولية ونموذج المحتوى، ليتوافق نظام إدارة المحتوى مع طريقة عمل فريقك فعلاً.',
        ),
      },
      {
        _key: 'design',
        tag: L('Weeks 3–5', 'الأسابيع 3–5'),
        title: L('Bilingual design', 'تصميم ثنائي اللغة'),
        text: L(
          'Custom UI in English and Arabic with proper right-to-left layouts, reviewed on real devices.',
          'واجهات مخصصة بالعربية والإنجليزية مع تخطيط صحيح من اليمين إلى اليسار، تُراجَع على أجهزة حقيقية.',
        ),
      },
      {
        _key: 'build',
        tag: L('Weeks 4–8', 'الأسابيع 4–8'),
        title: L('Build', 'التطوير'),
        text: L(
          'Next.js front end, Sanity CMS and Node.js integrations developed in sprints, with a staging link you can click through at every stage.',
          'تطوير واجهة Next.js ونظام Sanity وتكاملات Node.js على مراحل، مع رابط تجريبي يمكنك تصفحه في كل مرحلة.',
        ),
      },
      {
        _key: 'seo-migration',
        tag: L('Weeks 7–9', 'الأسابيع 7–9'),
        title: L('Content, SEO & migration', 'المحتوى وSEO والنقل'),
        text: L(
          'Content entry, structured data, redirects from your old URLs and speed testing — so you keep the rankings you already have.',
          'إدخال المحتوى والبيانات المنظمة وتحويل الروابط القديمة واختبار السرعة — لتحافظ على ترتيبك الحالي في نتائج البحث.',
        ),
      },
      {
        _key: 'launch',
        tag: L('Weeks 9–10', 'الأسابيع 9–10'),
        title: L('Launch & tuning', 'الإطلاق والضبط'),
        text: L(
          'Go-live, CMS training for your team, and a 30-day tuning window based on how real visitors behave.',
          'الإطلاق الرسمي وتدريب فريقك على نظام إدارة المحتوى، ثم فترة ضبط لمدة 30 يوماً بناءً على سلوك الزوار الفعلي.',
        ),
      },
    ],
  },
]

// ─── FAQs ───────────────────────────────────────────────────────────────────
const NO_PRICE_ANSWER = L(
  'Every website we build is scoped to your goals, so there’s no one-size price list. Cost depends on the number of pages and languages, custom features, integrations (CRM, ERP, payments) and whether you need e-commerce. Share your brief and we’ll send a clear, itemised proposal within 24 hours — no surprises later.',
  'نحدد نطاق كل موقع وفق أهدافك، لذلك لا توجد قائمة أسعار موحّدة. تعتمد التكلفة على عدد الصفحات واللغات والميزات المخصصة والتكاملات (CRM وERP والدفع) وما إذا كنت تحتاج إلى متجر إلكتروني. شاركنا تفاصيل مشروعك وسنرسل لك عرضاً واضحاً ومفصّلاً خلال 24 ساعة — دون مفاجآت لاحقاً.',
)

/** Existing FAQ docs → new question/answer (duplicates rewritten into new topics). */
const FAQ_UPDATES: Record<string, {question: Loc; answer: Loc}> = {
  // price → no price
  '945ce896-f1b0-480b-8267-d6cb543d2944': {
    question: L('How much does a website cost in Qatar?', 'كم تبلغ تكلفة الموقع الإلكتروني في قطر؟'),
    answer: NO_PRICE_ANSWER,
  },
  // duplicate "how long" (4–8 weeks, conflicted with 6–10) → WordPress vs headless
  'e9ef9166-8962-4ce7-b917-d716a097831e': {
    question: L('Should I choose WordPress or a headless CMS?', 'هل أختار WordPress أم نظام إدارة محتوى Headless؟'),
    answer: L(
      'If you need a simple site or blog quickly and on a tight budget, a well-built WordPress site can be the right choice. If you compete on search, need English and Arabic, rely on integrations or expect to grow, a headless build (Next.js + Sanity) is faster, more secure and usually cheaper to maintain over time. We build both and will recommend the one that fits your goals.',
      'إذا كنت تحتاج إلى موقع بسيط أو مدونة بسرعة وبميزانية محدودة، فقد يكون موقع WordPress مبني بإتقان هو الخيار المناسب. أما إذا كنت تنافس في نتائج البحث وتحتاج إلى العربية والإنجليزية وتعتمد على التكاملات أو تتوقع النمو، فإن البناء بتقنية Headless ‏(Next.js + Sanity) أسرع وأكثر أماناً وأقل تكلفة في الصيانة على المدى البعيد عادةً. نحن نبني الاثنين وسنوصي بما يناسب أهدافك.',
    ),
  },
  // duplicate "redesign" → WordPress migration
  '734e8d0a-88bb-452f-bf6a-35ad5d82ef59': {
    question: L(
      'Can you move my WordPress site to headless without losing rankings?',
      'هل يمكنكم نقل موقعي من WordPress إلى Headless دون خسارة ترتيبي في البحث؟',
    ),
    answer: L(
      'Yes. We move your content into Sanity, keep or improve your URL structure, set up 301 redirects for every changed URL, carry over your meta data and structured data, and benchmark speed and rankings before and after launch. Pages usually load faster after the move because they are pre-rendered.',
      'نعم. ننقل محتواك إلى Sanity، ونحافظ على بنية الروابط أو نحسّنها، ونضبط تحويلات 301 لكل رابط تغيّر، وننقل بيانات الوصف والبيانات المنظمة، ونقيس السرعة والترتيب قبل الإطلاق وبعده. وعادةً تصبح الصفحات أسرع بعد النقل لأنها تُجهَّز مسبقاً.',
    ),
  },
  // "Do you provide CMS websites?" → what is headless + editing
  '79901098-0133-45bf-bbeb-af0e55fd3a34': {
    question: L(
      'What is a headless CMS, and can my team edit the site without a developer?',
      'ما هو نظام إدارة المحتوى Headless، وهل يستطيع فريقي تعديل الموقع دون مطوّر؟',
    ),
    answer: L(
      'A headless CMS stores your content separately from the website’s design and code. We use Sanity: your team logs in, edits text, images, FAQs, landing pages and SEO fields in English and Arabic, and publishes — no developer needed. The design stays intact because content goes into structured fields, not a free-form page builder.',
      'يخزّن نظام إدارة المحتوى Headless المحتوى بشكل منفصل عن تصميم الموقع وشيفرته. نحن نستخدم Sanity: يسجّل فريقك الدخول ويعدّل النصوص والصور والأسئلة الشائعة وصفحات الهبوط وحقول SEO بالعربية والإنجليزية، ثم ينشر — دون الحاجة إلى مطوّر. ويبقى التصميم سليماً لأن المحتوى يُدخَل في حقول منظمة لا في أداة بناء صفحات حرة.',
    ),
  },
  // technologies — sharpened
  '52b07e3d-3272-41bb-b9d0-3e0431e999ad': {
    question: L('What technologies do you use for web development?', 'ما التقنيات التي تستخدمونها في تطوير المواقع؟'),
    answer: L(
      'We build with Next.js (React) on the front end, Sanity as the headless CMS, and Node.js for APIs and integrations, styled with Tailwind CSS and deployed on cloud hosting with a global CDN. For e-commerce we use headless commerce engines such as Medusa.js. Where a simpler build makes more sense, we also build on WordPress.',
      'نبني الواجهة الأمامية باستخدام Next.js ‏(React)، ونستخدم Sanity نظاماً لإدارة المحتوى بتقنية Headless، وNode.js لواجهات البرمجة والتكاملات، مع Tailwind CSS للتصميم واستضافة سحابية مع CDN عالمية. وللتجارة الإلكترونية نستخدم محركات Headless مثل Medusa.js. وحين يكون البناء الأبسط أنسب، نبني أيضاً على WordPress.',
    ),
  },
  // hosting — generic, no vendor
  'faq-web-development-2': {
    question: L('Do you handle hosting and ongoing maintenance?', 'هل تتولّون الاستضافة والصيانة المستمرة؟'),
    answer: L(
      'Yes — we host on enterprise-grade cloud infrastructure with a global CDN and SSL, and offer monthly maintenance plans covering security patches, dependency updates, content edits, performance monitoring and a 4-hour-response uptime SLA. Most clients bundle this with their SEO retainer so one team owns the site’s growth.',
      'نعم — نستضيف المواقع على بنية تحتية سحابية بمستوى المؤسسات مع CDN عالمية وشهادة SSL، ونقدّم خطط صيانة شهرية تشمل التحديثات الأمنية وتحديث المكوّنات وتعديلات المحتوى ومراقبة الأداء، مع التزام بالاستجابة خلال 4 ساعات لأي انقطاع. ويجمع معظم العملاء ذلك مع باقة SEO ليتولى فريق واحد نمو الموقع.',
    ),
  },
}

const NEW_FAQS = [
  {
    _id: 'faq-web-development-5',
    order: 5,
    question: L('Is Node.js a good choice for a business website?', 'هل Node.js خيار جيد لموقع شركة؟'),
    answer: L(
      'Yes. Node.js powers the back ends of many large websites and apps because it’s fast, handles many visitors at once efficiently, and uses the same language (JavaScript) as the front end. For you that means quicker development, reliable integrations and a site that scales with demand.',
      'نعم. يشغّل Node.js الأنظمة الخلفية لكثير من المواقع والتطبيقات الكبرى لأنه سريع ويتعامل بكفاءة مع عدد كبير من الزوار في الوقت نفسه، ويستخدم اللغة نفسها (JavaScript) المستخدمة في الواجهة الأمامية. وهذا يعني لك تطويراً أسرع وتكاملات موثوقة وموقعاً يتوسع مع الطلب.',
    ),
  },
  {
    _id: 'faq-web-development-6',
    order: 6,
    question: L('Is a headless website more expensive than WordPress?', 'هل الموقع بتقنية Headless أغلى من WordPress؟'),
    answer: L(
      'The upfront build usually costs more than a template-based WordPress site, because everything is designed and built for you. Over two to three years it often costs the same or less: fewer plugin licences, fewer security fixes, less performance tuning, and a site your team can update without paying a developer.',
      'تكون تكلفة البناء المبدئية عادةً أعلى من موقع WordPress قائم على قالب جاهز، لأن كل شيء يُصمَّم ويُبنى خصيصاً لك. لكن على مدى سنتين إلى ثلاث سنوات غالباً ما تتساوى التكلفة أو تقل: تراخيص إضافات أقل، وإصلاحات أمنية أقل، وضبط أداء أقل، وموقع يحدّثه فريقك دون دفع أجور مطوّر.',
    ),
  },
]

// ─── run ────────────────────────────────────────────────────────────────────
async function run() {
  const svc = await client.fetch<{_id: string; why?: Loc} | null>(`*[_id == $id][0]{ _id, "why": whyItMatters }`, {
    id: SERVICE_ID,
  })
  if (!svc) throw new Error('web-development service not found')

  const patch: Record<string, unknown> = {
    description,
    deliverables: deliverables.map((d, i) => ({_key: `d${i}`, _type: 'localeString', ...d})),
    ctaText,
    'seo.metaDescription': metaDescription,
    sections,
  }
  if (svc.why?.en?.includes('dirham')) {
    patch['whyItMatters.en'] = svc.why.en.replace(/dirham/g, 'riyal')
  }
  await client.patch(SERVICE_ID).set(patch).commit()
  console.log(`✓ service: description, deliverables, CTA, meta, ${sections.length} sections${patch['whyItMatters.en'] ? ', dirham → riyal' : ''}`)

  for (const [id, f] of Object.entries(FAQ_UPDATES)) {
    const exists = await client.fetch<string | null>(`*[_id == $id][0]._id`, {id})
    if (!exists) {
      console.warn(`! FAQ ${id} not found — skipped`)
      continue
    }
    await client.patch(id).set(f).commit()
    console.log(`✓ FAQ updated: ${f.question.en}`)
  }

  for (const f of NEW_FAQS) {
    await client.createOrReplace({
      _type: 'faq',
      ...f,
      category: 'website-development',
      showOnFaqPage: true,
      relatedService: {_type: 'reference', _ref: SERVICE_ID},
    })
    console.log(`✓ FAQ added: ${f.question.en}`)
  }

  const lp = await client.fetch<string | null>(
    `*[_id == $id && count(faqs.items[_key == $key]) > 0][0]._id`,
    {id: LP_ID, key: LP_COST_FAQ_KEY},
  )
  if (lp) {
    await client
      .patch(LP_ID)
      .set({[`faqs.items[_key=="${LP_COST_FAQ_KEY}"].answer`]: NO_PRICE_ANSWER})
      .commit()
    console.log('✓ /lp/web-development-qatar: price removed from cost FAQ')
  } else {
    console.warn('! landing page cost FAQ not found — skipped')
  }

  console.log('\nDone. Live on mnmagency.com within ~60 seconds (after the site code is pushed).')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
