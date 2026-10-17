/**
 * Enrich every service doc with selling-focused content.
 *
 * For each of the 8 services we (re)write the conversion-critical fields:
 *   description       — hero subtitle, punchy + benefit-led
 *   content           — full "what we build" essay (methodology, what we do)
 *   whyItMatters      — pain → consequence → solution arc
 *   deliverables      — 10–12 specific items the editor can show as a grid
 *   ctaTitle / ctaText / finalCtaButtonText — final-band copy
 *
 * Also creates 4 selling-focused FAQs per service (32 total), each
 * referenced to the right service so they appear on the service page.
 *
 * Idempotent:
 *   - services patched with .set() (overwrites the listed fields)
 *   - FAQs created with createOrReplace (safe to re-run, won't duplicate)
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-service-selling-content.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

type Faq = {
  question: Loc
  answer: Loc
}

type ServiceContent = {
  slug: string
  docId: string // existing doc id (matches our seed patterns)
  category: string // FAQ category enum value
  description: Loc
  content: Loc
  whyItMatters: Loc
  deliverables: Loc[]
  ctaTitle: Loc
  ctaText: Loc
  finalCtaButtonText: Loc
  faqs: Faq[]
}

// ─────────────────────────────────────────────────────────────────────
//  SEO
// ─────────────────────────────────────────────────────────────────────
const seo: ServiceContent = {
  slug: 'seo',
  docId: 'service-seo',
  category: 'seo',
  description: L(
    'High-intent SEO retainers built to put Qatar businesses on page one of Google — and inside ChatGPT, Gemini, and Perplexity answers — and keep them there. Free audit. No long contracts.',
    'باقات SEO عالية النية مصممة لوضع الشركات القطرية في الصفحة الأولى من Google — وداخل إجابات ChatGPT و Gemini و Perplexity — والحفاظ على ذلك. تدقيق مجاني. بدون عقود طويلة.',
  ),
  content: L(
    "We don't chase vanity rankings. Every M&M SEO engagement starts with a revenue model: which keywords drive your highest-margin customers, what each ranking position is worth to your business, and what the realistic 6–12 month traffic and lead trajectory looks like.\n\nFrom there it's a full system: technical audit, schema markup and entity optimization, content velocity plan, Local SEO for Doha and the Qatar governorates, GEO and LLMO for AI search visibility, link velocity, and conversion rate optimization on the pages that actually drive revenue.\n\nYou get weekly check-ins, a live ranking dashboard, and lead-attribution tracking so every brief explains exactly which pieces of work are paying you back.",
    'لا نطارد التصنيفات الشكلية. كل مشاركة SEO مع M&M تبدأ بنموذج إيرادات: ما هي الكلمات المفتاحية التي تجذب عملاءك الأعلى ربحاً، وماذا يساوي كل مركز تصنيف لعملك، وكيف يبدو مسار حركة المرور والعملاء المحتملين الواقعي خلال 6–12 شهراً.\n\nمن هناك يكون نظاماً كاملاً: تدقيق فني، تحسين schema markup والكيانات، خطة محتوى، SEO محلي للدوحة والمحافظات القطرية، GEO و LLMO للظهور في بحث الذكاء الاصطناعي، بناء الروابط، وتحسين معدل التحويل على الصفحات التي تحقق إيرادات فعلاً.\n\nتحصل على اجتماعات أسبوعية، لوحة تصنيفات مباشرة، وتتبع للعملاء المحتملين حتى يفسر كل تقرير بالضبط أي قطعة عمل تردّ عليك.',
  ),
  whyItMatters: L(
    "70% of buying decisions in Qatar now start with a search — Google, ChatGPT, or Perplexity. If your competitors rank for the keywords your customers use and you don't, you're paying them tax on every customer you lose. Worse, when you do show up, weak meta titles, slow pages, and missing schema mean your click-through rate is half what it should be.\n\nSEO isn't optional anymore. It's the cheapest sales channel you have, and the only one that compounds while you sleep. Brands in Qatar that invested in SEO three years ago are now paying half what their competitors pay per lead — and they've locked in market position that no amount of ad spend can break.",
    'تبدأ 70% من قرارات الشراء في قطر الآن ببحث — Google أو ChatGPT أو Perplexity. إذا كان منافسوك يتصدرون الكلمات المفتاحية التي يستخدمها عملاؤك وأنت لا تفعل، فأنت تدفع لهم ضريبة على كل عميل تخسره. والأسوأ، حتى عندما تظهر، فإن العناوين الضعيفة، الصفحات البطيئة، وعدم وجود schema يعني أن معدل النقر الخاص بك نصف ما ينبغي.\n\nلم يعد SEO اختيارياً. إنه أرخص قناة مبيعات لديك، والوحيدة التي تتراكم بينما تنام. العلامات التجارية في قطر التي استثمرت في SEO قبل ثلاث سنوات تدفع الآن نصف ما يدفعه منافسوها لكل عميل محتمل — وقد حجزوا مركزاً سوقياً لا يمكن لأي مبلغ إعلاني كسره.',
  ),
  deliverables: [
    L('SEO audit + opportunity analysis', 'تدقيق SEO وتحليل الفرص'),
    L('Technical SEO (Core Web Vitals, crawl, indexing)', 'SEO فني (Core Web Vitals، الزحف، الفهرسة)'),
    L('Keyword research grounded in commercial intent', 'بحث الكلمات المفتاحية بناءً على النية التجارية'),
    L('On-page optimization for services + landing pages', 'تحسين الصفحات الداخلية للخدمات وصفحات الهبوط'),
    L('Local SEO for Doha + Qatar governorates', 'SEO محلي للدوحة والمحافظات القطرية'),
    L('SEO content strategy + briefs', 'استراتيجية محتوى SEO + ملخصات'),
    L('Blog and article planning + execution', 'تخطيط وتنفيذ المدونة والمقالات'),
    L('Internal linking architecture', 'بنية الروابط الداخلية'),
    L('Schema markup and structured data', 'Schema markup والبيانات المنظمة'),
    L('GEO / LLMO content structure for AI search', 'بنية محتوى GEO / LLMO لبحث الذكاء الاصطناعي'),
    L('Authority link acquisition', 'اكتساب روابط ذات صلاحية'),
    L('Live ranking dashboard + monthly reports', 'لوحة تصنيف مباشرة + تقارير شهرية'),
  ],
  ctaTitle: L('Ready to own page one?', 'جاهز للسيطرة على الصفحة الأولى؟'),
  ctaText: L(
    "Free 30-minute SEO audit. We'll show you exactly which keywords your competitors rank for, what your current gap is, and what the 6-month trajectory looks like.",
    'تدقيق SEO مجاني لمدة 30 دقيقة. سنريك بالضبط الكلمات المفتاحية التي يتصدرها منافسوك، ما هي فجوتك الحالية، وكيف يبدو مسار 6 أشهر.',
  ),
  finalCtaButtonText: L('Get My Free SEO Audit', 'احصل على تدقيق SEO مجاني'),
  faqs: [
    {
      question: L(
        'How long does SEO take to show results in Qatar?',
        'كم من الوقت يستغرق SEO لإظهار النتائج في قطر؟',
      ),
      answer: L(
        "For most service businesses in Qatar, we see meaningful ranking movement in 8–12 weeks, qualified lead lift in 4–6 months, and full ROI typically by month 9. The exact curve depends on competitor strength, content velocity, and how aggressively you want to invest. We'll project this for your specific niche during the free audit.",
        'بالنسبة لمعظم شركات الخدمات في قطر، نرى حركة تصنيف ذات معنى في 8–12 أسبوعاً، زيادة في العملاء المحتملين المؤهلين في 4–6 أشهر، وعائد كامل على الاستثمار عادةً بحلول الشهر التاسع. يعتمد المنحنى الدقيق على قوة المنافسين، سرعة المحتوى، ومدى رغبتك في الاستثمار بقوة. سنتوقع هذا لمجالك المحدد أثناء التدقيق المجاني.',
      ),
    },
    {
      question: L(
        'What makes M&M Marketing different from other SEO agencies in Qatar?',
        'ما الذي يجعل M&M Marketing مختلفاً عن وكالات SEO الأخرى في قطر؟',
      ),
      answer: L(
        "Three things: (1) we tie every action to revenue impact, not just rankings; (2) we already optimize for AI search (ChatGPT, Gemini, Perplexity) which most Qatar agencies still ignore; (3) we don't lock you into year-long contracts — month-to-month with full transparency. We're confident enough in the results that we don't need handcuffs.",
        'ثلاثة أشياء: (1) نربط كل إجراء بتأثير الإيرادات، وليس فقط التصنيفات؛ (2) نحسّن بالفعل لبحث الذكاء الاصطناعي (ChatGPT و Gemini و Perplexity) الذي تتجاهله معظم الوكالات القطرية؛ (3) لا نقيدك في عقود سنوية — شهر بشهر مع شفافية كاملة. نحن واثقون من النتائج بما يكفي لعدم الحاجة إلى أصفاد.',
      ),
    },
    {
      question: L(
        'Do you handle bilingual SEO (English + Arabic)?',
        'هل تتعاملون مع SEO ثنائي اللغة (الإنجليزية والعربية)؟',
      ),
      answer: L(
        'Yes — every M&M website and content engagement is built bilingual from the schema up: hreflang tags, separate URL structures, Arabic content written by native speakers (not translated), and Arabic-specific keyword research. Most Qatar agencies bolt Arabic on as an afterthought. We treat it as a first-class ranking channel.',
        'نعم — كل موقع ويب وكل مشاركة محتوى مع M&M مبنية ثنائية اللغة من schema للأعلى: علامات hreflang، هياكل عناوين URL منفصلة، محتوى عربي مكتوب بواسطة متحدثين أصليين (وليس مترجم)، وبحث كلمات مفتاحية خاص بالعربية. تضيف معظم وكالات قطر العربية كفكرة لاحقة. نحن نتعامل معها كقناة تصنيف من الدرجة الأولى.',
      ),
    },
    {
      question: L(
        'What is the minimum SEO investment?',
        'ما هو الحد الأدنى للاستثمار في SEO؟',
      ),
      answer: L(
        "Our smallest retainer in Qatar starts at QAR 5,000/month for local businesses targeting a tight geographic radius. Mid-market and competitive industries (real estate, automotive, education, hospitality) typically need QAR 10,000–25,000/month to compete meaningfully. We'll quote a specific number after the free audit based on your competitor landscape.",
        'يبدأ أصغر مشروع شهري لدينا في قطر بـ 5,000 ر.ق/شهرياً للشركات المحلية التي تستهدف نطاقاً جغرافياً ضيقاً. عادةً ما تحتاج الصناعات متوسطة الحجم والتنافسية (العقارات، السيارات، التعليم، الضيافة) إلى 10,000–25,000 ر.ق/شهرياً للتنافس بشكل ذي معنى. سنقدم سعراً محدداً بعد التدقيق المجاني بناءً على المشهد التنافسي لديك.',
      ),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────
//  Web Development
// ─────────────────────────────────────────────────────────────────────
const webDev: ServiceContent = {
  slug: 'web-development',
  docId: 'service-web-development',
  category: 'website-development',
  description: L(
    'High-converting websites engineered as revenue systems for Qatar businesses. Built bilingual, fast, and ready to rank on Google + AI search from day one.',
    'مواقع ويب عالية التحويل مصممة كأنظمة إيرادات للشركات القطرية. مبنية ثنائية اللغة، سريعة، وجاهزة للتصنيف على Google وبحث الذكاء الاصطناعي من اليوم الأول.',
  ),
  content: L(
    "We don't build digital brochures. Every M&M website is engineered around a single question: how does this site become the most expensive salesperson on your team — except it works 24/7 and never asks for a raise?\n\nThat means: conversion-focused architecture, sub-2-second load times on 3G in Doha, bilingual EN/AR from the schema up, structured data so Google and AI search engines understand your business, integrated lead routing into your CRM or WhatsApp, and analytics that show you which pages and which traffic sources actually pay back.\n\nWe build on modern stacks (Next.js, headless CMS) so the site stays fast as you scale, and we don't disappear after launch — every M&M website ships with a 30-day post-launch tuning window where we measure how real visitors behave and adjust based on what actually converts.",
    'لا نبني واجهات رقمية. كل موقع ويب من M&M مهندس حول سؤال واحد: كيف يصبح هذا الموقع أغلى موظف مبيعات في فريقك — لكنه يعمل 24/7 ولا يطلب زيادة؟\n\nهذا يعني: بنية تركز على التحويل، أوقات تحميل أقل من ثانيتين على 3G في الدوحة، ثنائية اللغة EN/AR من schema للأعلى، بيانات منظمة حتى يفهم Google ومحركات بحث الذكاء الاصطناعي عملك، توجيه عملاء محتملين متكامل مع CRM أو WhatsApp، وتحليلات تظهر لك أي الصفحات وأي مصادر الزيارات تردّ فعلياً.\n\nنبني على أحدث التقنيات (Next.js، headless CMS) حتى يبقى الموقع سريعاً مع التوسع، ولا نختفي بعد الإطلاق — كل موقع من M&M يأتي بنافذة ضبط 30 يوماً بعد الإطلاق حيث نقيس كيف يتصرف الزوار الحقيقيون ونتكيف بناءً على ما يحقق التحويل فعلاً.',
  ),
  whyItMatters: L(
    "Your website is your storefront in 2026 — except every visitor compares you to the slickest brand they've ever seen, not just the agency down the road in Doha. A slow, generic, hard-to-use site doesn't just lose ranking — it loses trust, lowers ad ROAS, and trains buyers to choose your competitor.\n\nWorse: most Qatar businesses still treat their website as a one-time project. They launch, then forget. Meanwhile their conversion rate quietly drops, ranking erodes, and every dirham of ad spend gets less effective. A modern website is a living asset — and the businesses treating it that way are quietly winning Qatar's biggest categories.",
    'موقعك الإلكتروني هو واجهة متجرك في 2026 — لكن كل زائر يقارنك بأرقى علامة تجارية رآها على الإطلاق، وليس فقط الوكالة في الشارع التالي في الدوحة. الموقع البطيء، العام، وصعب الاستخدام لا يخسر التصنيف فقط — بل يخسر الثقة، ويخفض عائد الإنفاق الإعلاني، ويدرب المشترين على اختيار منافسك.\n\nوالأسوأ: لا تزال معظم الشركات القطرية تعامل موقعها الإلكتروني كمشروع لمرة واحدة. تطلق، ثم تنسى. في هذه الأثناء ينخفض معدل التحويل بهدوء، يتآكل التصنيف، وكل ريال إعلاني يصبح أقل فعالية. الموقع الحديث أصل حي — والشركات التي تتعامل معه بهذه الطريقة تكسب فئات قطر الأكبر بهدوء.',
  ),
  deliverables: [
    L('Discovery + business model workshop', 'ورشة اكتشاف ونموذج عمل'),
    L('UX research + sitemap + user flows', 'بحث UX + خريطة الموقع + تدفقات المستخدم'),
    L('Wireframes + interactive prototypes', 'Wireframes + نماذج تفاعلية'),
    L('Custom UI design (bilingual EN + AR)', 'تصميم UI مخصص (ثنائي اللغة EN + AR)'),
    L('Next.js development (modern, fast, secure)', 'تطوير Next.js (حديث، سريع، آمن)'),
    L('Headless CMS (Sanity) for full content control', 'CMS بدون رأس (Sanity) للتحكم الكامل في المحتوى'),
    L('SEO-ready schema, sitemap, hreflang', 'schema جاهز لـ SEO، sitemap، hreflang'),
    L('CRM + WhatsApp lead routing', 'توجيه العملاء المحتملين إلى CRM و WhatsApp'),
    L('Sub-2s load on Qatar 3G/4G networks', 'تحميل أقل من ثانيتين على شبكات 3G/4G قطر'),
    L('Analytics + conversion event tracking', 'تحليلات وتتبع أحداث التحويل'),
    L('Domain, hosting, and SSL handled', 'تأمين النطاق والاستضافة و SSL'),
    L('30-day post-launch tuning + handover training', 'تدريب ما بعد الإطلاق وضبط لمدة 30 يوماً'),
  ],
  ctaTitle: L('Ready for a website that actually sells?', 'جاهز لموقع إلكتروني يبيع فعلاً؟'),
  ctaText: L(
    "Tell us about your business and goals. We'll come back within 24 hours with a scoped proposal, timeline, and a sample of three similar sites we've shipped in Qatar.",
    'أخبرنا عن عملك وأهدافك. سنرد خلال 24 ساعة بعرض محدد النطاق، جدول زمني، ونماذج من ثلاثة مواقع مماثلة شحناها في قطر.',
  ),
  finalCtaButtonText: L('Plan My Website', 'خطط لموقعي الإلكتروني'),
  faqs: [
    {
      question: L(
        'How long does it take to build a website with M&M?',
        'كم من الوقت يستغرق بناء موقع ويب مع M&M؟',
      ),
      answer: L(
        'Typical timeline: 6–10 weeks for a marketing site (12–18 pages), 10–16 weeks for an e-commerce or platform site. We work in 2-week sprints so you see something tangible every two weeks — never a black box. If you have a hard deadline (event, product launch), we can run accelerated tracks.',
        'الجدول الزمني النموذجي: 6–10 أسابيع لموقع تسويقي (12–18 صفحة)، 10–16 أسبوعاً لموقع تجارة إلكترونية أو منصة. نعمل بسرعات أسبوعين حتى ترى شيئاً ملموساً كل أسبوعين — لا صندوق أسود أبداً. إذا كان لديك موعد نهائي صعب (فعالية، إطلاق منتج)، يمكننا تشغيل مسارات مسرعة.',
      ),
    },
    {
      question: L(
        'Do you handle hosting and ongoing maintenance?',
        'هل تتعاملون مع الاستضافة والصيانة المستمرة؟',
      ),
      answer: L(
        "Yes — we host on enterprise-grade infrastructure (Vercel + global CDN) and offer monthly maintenance plans that cover security patches, dependency updates, content edits, performance monitoring, and a 4-hour-response uptime SLA. Most clients bundle this with their SEO retainer so there's one team owning the site's growth.",
        'نعم — نستضيف على بنية تحتية على مستوى المؤسسة (Vercel + CDN عالمي) ونقدم خطط صيانة شهرية تغطي تصحيحات الأمان، تحديثات التبعيات، تعديلات المحتوى، مراقبة الأداء، و SLA لوقت التشغيل بأربع ساعات. يجمع معظم العملاء هذا مع باقة SEO حتى يكون هناك فريق واحد يمتلك نمو الموقع.',
      ),
    },
    {
      question: L(
        'Will my website work in both English and Arabic?',
        'هل سيعمل موقعي الإلكتروني باللغتين الإنجليزية والعربية؟',
      ),
      answer: L(
        'Every M&M website is built bilingual from day one — proper RTL layouts for Arabic (not just text mirroring), separate hreflang-tagged URL structures, native-quality Arabic copy (we write, not translate), and a single CMS where you control both languages from one place. Switching languages is one click for the visitor.',
        'كل موقع من M&M مبني ثنائي اللغة من اليوم الأول — تخطيطات RTL مناسبة للعربية (وليس فقط عكس النص)، هياكل URL منفصلة بعلامات hreflang، نسخة عربية بجودة محلية (نكتب، لا نترجم)، و CMS واحد حيث تتحكم في كلتا اللغتين من مكان واحد. تبديل اللغات هو نقرة واحدة للزائر.',
      ),
    },
    {
      question: L(
        "What if I already have a website — can you fix or rebuild it?",
        'ماذا لو كان لدي موقع ويب بالفعل — هل يمكنكم إصلاحه أو إعادة بنائه؟',
      ),
      answer: L(
        "Absolutely. We start with a free audit (technical, conversion, SEO, mobile) and recommend either targeted fixes (if the foundation is solid) or a full rebuild (if you're losing customers to load times, broken flows, or weak design). Either way, you keep your domain, your content, and your existing rankings — we migrate them carefully so you don't lose SEO equity.",
        'بالتأكيد. نبدأ بتدقيق مجاني (فني، تحويل، SEO، جوال) ونوصي إما بإصلاحات مستهدفة (إذا كان الأساس متيناً) أو إعادة بناء كاملة (إذا كنت تخسر العملاء بسبب أوقات التحميل، التدفقات المعطوبة، أو التصميم الضعيف). في كلتا الحالتين، تحتفظ بنطاقك ومحتواك وتصنيفاتك الحالية — نهاجرها بعناية حتى لا تخسر أصول SEO.',
      ),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────
//  Social Media
// ─────────────────────────────────────────────────────────────────────
const social: ServiceContent = {
  slug: 'social-media',
  docId: 'service-social-media',
  category: 'social-media',
  description: L(
    'Content systems that build attention, engagement, and brand authority across Instagram, TikTok, LinkedIn, and X — turning followers into customers, not just numbers.',
    'أنظمة محتوى تبني الانتباه والتفاعل وسلطة العلامة التجارية عبر Instagram و TikTok و LinkedIn و X — تحول المتابعين إلى عملاء، وليس مجرد أرقام.',
  ),
  content: L(
    "Most Qatar brands treat social media like a hobby: post when there's time, copy what competitors do, hope someone engages. That's why most accounts plateau at 5,000 followers and never generate a single qualified lead.\n\nM&M builds social as a system: monthly content calendars built around your business goals, weekly shooting days with our in-house video team, on-brand creative across reels, carousels, statics, and stories, community management replying in your tone of voice, paid amplification on the posts that already work, and a monthly performance report tied to leads and sales (not just likes).\n\nWe cover Instagram, TikTok, LinkedIn, X (Twitter), Facebook, and YouTube Shorts — whichever platforms your customers actually use. Arabic and English handled natively, with creators who speak the dialect your audience speaks.",
    'تتعامل معظم العلامات التجارية القطرية مع وسائل التواصل الاجتماعي كهواية: تنشر عندما يكون هناك وقت، تنسخ ما يفعله المنافسون، وتأمل أن يتفاعل شخص ما. لهذا السبب تستقر معظم الحسابات عند 5,000 متابع ولا تولد عميلاً محتملاً مؤهلاً واحداً.\n\nيبني M&M السوشيال كنظام: تقاويم محتوى شهرية مبنية حول أهداف عملك، أيام تصوير أسبوعية مع فريق الفيديو الداخلي، إبداع متوافق مع العلامة التجارية عبر reels و carousels و statics و stories، إدارة مجتمع ترد بنبرة صوتك، تضخيم مدفوع للمنشورات التي تعمل بالفعل، وتقرير أداء شهري مرتبط بالعملاء المحتملين والمبيعات (وليس فقط الإعجابات).\n\nنغطي Instagram و TikTok و LinkedIn و X (Twitter) و Facebook و YouTube Shorts — أي منصات يستخدمها عملاؤك فعلياً. العربية والإنجليزية يتم التعامل معهما محلياً، مع منشئين يتحدثون اللهجة التي يتحدث بها جمهورك.',
  ),
  whyItMatters: L(
    "Social media is where Qatar buyers research, compare, and decide — long before they ever fill out a form. If your feed is dead, your story is generic, or your last post was three weeks ago, every visitor's silent reaction is the same: 'this brand isn't active.' That perception kills conversion across every other channel — paid ads, SEO traffic, even direct referrals.\n\nThe brands winning Qatar right now post consistently, look professional, reply within minutes, and run the whole system as a function — not as the marketing intern's side task. You don't need to go viral. You need to look alive, credible, and worth choosing — every single day.",
    'وسائل التواصل الاجتماعي هي حيث يبحث المشترون القطريون ويقارنون ويقررون — قبل وقت طويل من ملء أي نموذج. إذا كان موجزك ميتاً، قصتك عامة، أو آخر منشور لك قبل ثلاثة أسابيع، فإن رد فعل كل زائر الصامت هو نفسه: "هذه العلامة التجارية غير نشطة." هذا التصور يقتل التحويل عبر كل قناة أخرى — الإعلانات المدفوعة، حركة SEO، حتى الإحالات المباشرة.\n\nالعلامات التجارية التي تكسب قطر الآن تنشر باستمرار، تبدو احترافية، ترد في دقائق، وتدير النظام بأكمله كوظيفة — وليس كمهمة جانبية لمتدرب التسويق. لست بحاجة إلى الانتشار. تحتاج إلى أن تبدو حياً، موثوقاً، وجديراً بالاختيار — كل يوم.',
  ),
  deliverables: [
    L('Monthly content calendar mapped to business goals', 'تقويم محتوى شهري متوافق مع أهداف العمل'),
    L('Weekly in-house shoots (photo + video)', 'تصوير داخلي أسبوعي (صور وفيديو)'),
    L('Reels, TikToks, and YouTube Shorts production', 'إنتاج Reels و TikToks و YouTube Shorts'),
    L('Carousels, statics, and stories creative', 'إبداع carousels و statics و stories'),
    L('Bilingual copywriting (EN + AR)', 'كتابة نسخ ثنائية اللغة (EN + AR)'),
    L('Community management + DM replies', 'إدارة المجتمع والرد على الرسائل'),
    L('Influencer + UGC partnerships when relevant', 'شراكات المؤثرين و UGC عند الحاجة'),
    L('Paid amplification on top-performing posts', 'تضخيم مدفوع لأفضل المنشورات أداءً'),
    L('Hashtag + trend research per platform', 'بحث الهاشتاجات والاتجاهات لكل منصة'),
    L('Competitor monitoring + content gap analysis', 'مراقبة المنافسين وتحليل فجوات المحتوى'),
    L('Monthly performance report tied to leads', 'تقرير أداء شهري مرتبط بالعملاء المحتملين'),
    L('Quarterly content strategy review + replan', 'مراجعة استراتيجية محتوى ربع سنوية وإعادة تخطيط'),
  ],
  ctaTitle: L('Ready to look alive online?', 'جاهز لتبدو حياً عبر الإنترنت؟'),
  ctaText: L(
    "Book a free social audit. We'll show you exactly what's working, what's not, and what your fastest path to qualified leads from social looks like.",
    'احجز تدقيقاً مجانياً للسوشيال. سنريك بالضبط ما يعمل، ما لا يعمل، وكيف يبدو أسرع طريقك للعملاء المحتملين المؤهلين من السوشيال.',
  ),
  finalCtaButtonText: L('Audit My Social Media', 'دقق وسائل التواصل الخاصة بي'),
  faqs: [
    {
      question: L(
        'Which social platforms do you actively manage?',
        'ما هي منصات السوشيال التي تديرونها بفاعلية؟',
      ),
      answer: L(
        'Instagram, TikTok, Facebook, X (Twitter), LinkedIn, YouTube, YouTube Shorts, and Snapchat. We start by auditing where your customers actually spend time — not where you think they do — and concentrate effort on the 2–3 platforms that drive the highest qualified-lead rate for your category in Qatar.',
        'Instagram و TikTok و Facebook و X (Twitter) و LinkedIn و YouTube و YouTube Shorts و Snapchat. نبدأ بتدقيق المكان الذي يقضي فيه عملاؤك الوقت فعلياً — وليس حيث تعتقد — ونركز الجهد على المنصتين أو الثلاث منصات التي تحقق أعلى معدل عملاء محتملين مؤهلين لفئتك في قطر.',
      ),
    },
    {
      question: L(
        'Do you create the content or just schedule it?',
        'هل تنشئون المحتوى أم تجدولونه فقط؟',
      ),
      answer: L(
        "We do everything end-to-end. Our in-house creative team handles concept, shoot, edit, copy, design, and posting. We don't outsource to freelancers. That's why our content actually looks like it belongs to your brand — and why it converts. Your only job is approving the monthly calendar (or letting us run autonomously if you trust us by month three).",
        'نقوم بكل شيء من البداية إلى النهاية. يدير فريق الإبداع الداخلي لدينا المفهوم، التصوير، المونتاج، النسخة، التصميم، والنشر. لا نتعاقد مع مستقلين. لهذا السبب يبدو محتوانا فعلياً كأنه ينتمي إلى علامتك التجارية — ولهذا يحقق التحويل. مهمتك الوحيدة هي الموافقة على التقويم الشهري (أو السماح لنا بالعمل باستقلالية إذا وثقت بنا بحلول الشهر الثالث).',
      ),
    },
    {
      question: L(
        'How many posts per month do I get?',
        'كم عدد المنشورات في الشهر التي أحصل عليها؟',
      ),
      answer: L(
        "Depends on the package and your category. Most Qatar clients sit at 20–40 pieces of content per month across all formats (reels, carousels, stories, statics). What matters more than volume is consistency, platform fit, and whether the content actually converts — we'd rather ship 20 great posts than 40 mediocre ones.",
        'يعتمد على الباقة وفئتك. يجلس معظم عملاء قطر عند 20–40 قطعة محتوى في الشهر عبر جميع التنسيقات (reels و carousels و stories و statics). ما يهم أكثر من الحجم هو الاتساق، ملاءمة المنصة، وما إذا كان المحتوى يحقق التحويل فعلياً — نفضل شحن 20 منشوراً رائعاً على 40 متوسطاً.',
      ),
    },
    {
      question: L(
        'Do you handle paid ads on social as part of this?',
        'هل تتعاملون مع الإعلانات المدفوعة على السوشيال كجزء من هذا؟',
      ),
      answer: L(
        "Light paid amplification (boosting your best-performing organic content) is included. For full paid acquisition campaigns — Meta Ads, TikTok Ads, LinkedIn Ads with audience research, creative production, and ROAS optimization — you'd add our Paid Ads service. Most clients bundle them so the organic and paid teams share a single content engine.",
        'تضمين تضخيم مدفوع خفيف (تعزيز أفضل محتواك العضوي أداءً). لحملات اكتساب مدفوعة كاملة — إعلانات Meta و TikTok و LinkedIn مع أبحاث الجمهور، إنتاج الإبداع، وتحسين عائد الإنفاق الإعلاني — ستضيف خدمة الإعلانات المدفوعة لدينا. يجمعها معظم العملاء حتى تشترك الفرق العضوية والمدفوعة في محرك محتوى واحد.',
      ),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────
//  Bulk SMS
// ─────────────────────────────────────────────────────────────────────
const bulkSms: ServiceContent = {
  slug: 'bulk-sms',
  docId: 'service-bulk-sms',
  category: 'bulk-sms',
  description: L(
    "Direct-broadcast SMS campaigns that reach your audience in seconds. 98% open rate, sender-ID branded, fully compliant with Qatar's CRA regulations.",
    'حملات SMS مباشرة تصل إلى جمهورك في ثوانٍ. معدل فتح 98%، معرف مرسل مخصص، متوافقة بالكامل مع لوائح CRA قطر.',
  ),
  content: L(
    "Email goes to spam. Push notifications get ignored. WhatsApp template approvals take weeks. SMS is the one channel left where your message is read within 3 minutes — by 98 out of every 100 people you send it to.\n\nM&M runs SMS as a real channel, not a blast tool: targeted lists (segmented by purchase history, geography, language), sender-ID branding so your name shows instead of a shortcode, A/B-tested copy in EN and AR, throttled delivery so you don't trigger spam filters, link tracking so you know which recipients clicked, and full CRA compliance so you don't get blacklisted.\n\nWe handle the full lifecycle: number cleansing, opt-in management, campaign scheduling, real-time delivery reports, and follow-up automations when someone clicks. SMS is best for time-sensitive offers, appointment reminders, product launches, and reactivating cold leads — and we'll tell you upfront when SMS isn't the right channel.",
    'البريد الإلكتروني يذهب إلى الرسائل المزعجة. تتجاهل إشعارات الدفع. تستغرق موافقات قوالب WhatsApp أسابيع. SMS هي القناة الوحيدة المتبقية حيث تتم قراءة رسالتك خلال 3 دقائق — من قبل 98 من كل 100 شخص ترسل إليهم.\n\nتدير M&M SMS كقناة حقيقية، وليس أداة بث: قوائم مستهدفة (مقسمة حسب سجل الشراء، الجغرافيا، اللغة)، علامة معرف مرسل حتى يظهر اسمك بدلاً من كود مختصر، نسخة مختبرة A/B بالإنجليزية والعربية، توصيل بطيء حتى لا تفعّل فلاتر الرسائل المزعجة، تتبع الروابط حتى تعرف أي المستلمين نقروا، وامتثال كامل لـ CRA حتى لا يتم وضعك في القائمة السوداء.\n\nنتعامل مع دورة الحياة الكاملة: تنظيف الأرقام، إدارة opt-in، جدولة الحملات، تقارير التسليم في الوقت الفعلي، وأتمتة المتابعة عندما ينقر شخص ما. SMS هي الأفضل للعروض الحساسة للوقت، تذكيرات المواعيد، إطلاق المنتجات، وإعادة تنشيط العملاء المحتملين الباردين — وسنخبرك مقدماً عندما لا تكون SMS هي القناة المناسبة.',
  ),
  whyItMatters: L(
    "Open rates: email 18%, push 4%, SMS 98%. Read-within-3-minutes: email 12%, push 7%, SMS 90%. That's not opinion — those are global benchmarks confirmed by every Qatar telco we've worked with.\n\nIf you're sitting on a customer database in Qatar and not using SMS, you're leaving a channel with the highest ROI per dirham of any digital touchpoint untouched. But you have to do it right: blast random numbers, no sender ID, generic copy in English only — you'll burn your domain, lose your sender ID, and never get it back. M&M makes sure that doesn't happen.",
    'معدلات الفتح: البريد الإلكتروني 18%، الدفع 4%، SMS 98%. القراءة خلال 3 دقائق: البريد الإلكتروني 12%، الدفع 7%، SMS 90%. هذا ليس رأياً — هذه معايير عالمية أكدتها كل شركة اتصالات قطرية عملنا معها.\n\nإذا كنت تجلس على قاعدة بيانات عملاء في قطر ولا تستخدم SMS، فأنت تترك قناة ذات أعلى عائد على الاستثمار لكل ريال من أي نقطة لمس رقمية دون مساس. لكن عليك القيام بذلك بشكل صحيح: إرسال أرقام عشوائية، بدون معرف مرسل، نسخة عامة بالإنجليزية فقط — ستحرق نطاقك، تفقد معرف المرسل، ولن تستعيده أبداً. تتأكد M&M من أن ذلك لا يحدث.',
  ),
  deliverables: [
    L('Sender-ID branding (CRA-compliant registration)', 'علامة معرف المرسل (تسجيل متوافق مع CRA)'),
    L('Database cleansing + opt-in validation', 'تنظيف قاعدة البيانات والتحقق من opt-in'),
    L('Audience segmentation by behavior + geography', 'تقسيم الجمهور حسب السلوك والجغرافيا'),
    L('Bilingual SMS copywriting (EN + AR)', 'كتابة نسخ SMS ثنائية اللغة (EN + AR)'),
    L('A/B testing of copy and send times', 'اختبار A/B للنسخة وأوقات الإرسال'),
    L('Throttled delivery to protect deliverability', 'توصيل بطيء لحماية إمكانية التسليم'),
    L('Link shortening + click tracking', 'تقصير الروابط وتتبع النقرات'),
    L('Real-time delivery + bounce reports', 'تقارير التسليم والارتداد في الوقت الفعلي'),
    L('CRA / regulatory compliance audits', 'تدقيقات الامتثال التنظيمي و CRA'),
    L('Trigger-based automations (cart, appointment, renewal)', 'أتمتة قائمة على المشغلات (سلة، موعد، تجديد)'),
    L('Integration with your CRM (HubSpot, Salesforce, Zoho)', 'تكامل مع CRM (HubSpot و Salesforce و Zoho)'),
    L('Campaign performance + ROI reporting', 'تقارير أداء الحملة وعائد الاستثمار'),
  ],
  ctaTitle: L('Ready to actually reach your customers?', 'جاهز للوصول إلى عملائك فعلياً؟'),
  ctaText: L(
    "Tell us your audience size and offer. We'll send back a campaign plan, sender-ID setup, and an estimate of expected open + click rates within 24 hours.",
    'أخبرنا بحجم جمهورك وعرضك. سنرسل خطة حملة، إعداد معرف مرسل، وتقدير لمعدلات الفتح والنقر المتوقعة خلال 24 ساعة.',
  ),
  finalCtaButtonText: L('Plan My SMS Campaign', 'خطط لحملة SMS الخاصة بي'),
  faqs: [
    {
      question: L(
        'Is bulk SMS legal in Qatar?',
        'هل SMS الجماعية قانونية في قطر؟',
      ),
      answer: L(
        "Yes, but only with proper sender-ID registration through the Communications Regulatory Authority (CRA) and explicit opt-in from recipients. M&M handles the full registration process and ensures every campaign meets CRA standards. Sending without authorization will get your sender ID blacklisted — and you typically don't get it back.",
        'نعم، لكن فقط مع تسجيل معرف مرسل مناسب من خلال هيئة تنظيم الاتصالات (CRA) و opt-in صريح من المستلمين. تتعامل M&M مع عملية التسجيل الكاملة وتضمن أن كل حملة تلبي معايير CRA. سيؤدي الإرسال بدون تفويض إلى وضع معرف المرسل في القائمة السوداء — وعادةً لا تستعيده.',
      ),
    },
    {
      question: L(
        'How much does it cost per SMS in Qatar?',
        'كم تكلفة كل SMS في قطر؟',
      ),
      answer: L(
        "Per-SMS cost in Qatar ranges from QAR 0.10–0.20 depending on volume, sender-ID tier, and route quality. M&M negotiates bulk rates with all three Qatar telcos (Ooredoo, Vodafone, and reserve carriers) so you pay closer to the floor than the ceiling. We're fully transparent — you see the per-message cost on every invoice.",
        'تتراوح تكلفة SMS في قطر من 0.10–0.20 ر.ق حسب الحجم، فئة معرف المرسل، وجودة المسار. تتفاوض M&M على أسعار الجملة مع جميع شركات الاتصالات القطرية الثلاث (Ooredoo و Vodafone والناقلين الاحتياطيين) حتى تدفع أقرب إلى الأرض من السقف. نحن شفافون تماماً — ترى تكلفة الرسالة على كل فاتورة.',
      ),
    },
    {
      question: L(
        'Can I send SMS to customers who never opted in?',
        'هل يمكنني إرسال SMS إلى العملاء الذين لم يوافقوا أبداً؟',
      ),
      answer: L(
        "No. Sending to non-consented numbers violates CRA regulations and Qatar's data protection laws, and will get you blacklisted. If you have an existing customer database where opt-in status is unclear, M&M runs a re-permission campaign (offering a discount or value to confirm opt-in) before any commercial send. This protects your sender ID long-term.",
        'لا. إرسال إلى أرقام غير موافقة ينتهك لوائح CRA وقوانين حماية البيانات في قطر، وسيؤدي إلى وضعك في القائمة السوداء. إذا كان لديك قاعدة بيانات عملاء حالية حيث حالة opt-in غير واضحة، تدير M&M حملة إعادة إذن (تقدم خصماً أو قيمة لتأكيد opt-in) قبل أي إرسال تجاري. هذا يحمي معرف المرسل الخاص بك على المدى الطويل.',
      ),
    },
    {
      question: L(
        'What use cases work best for SMS?',
        'ما هي حالات الاستخدام الأفضل لـ SMS؟',
      ),
      answer: L(
        "Time-sensitive offers (flash sales, limited-time discounts), appointment + booking reminders, transactional confirmations, product launches to existing customers, and reactivating cold leads. SMS doesn't work well for awareness or long copy — for those, you want social or paid ads. We'll tell you upfront when SMS is the right tool and when it's not.",
        'العروض الحساسة للوقت (مبيعات سريعة، خصومات لفترة محدودة)، تذكيرات المواعيد والحجوزات، تأكيدات المعاملات، إطلاق المنتجات للعملاء الحاليين، وإعادة تنشيط العملاء المحتملين الباردين. لا تعمل SMS بشكل جيد للوعي أو النسخ الطويلة — لذلك، تريد السوشيال أو الإعلانات المدفوعة. سنخبرك مقدماً عندما تكون SMS هي الأداة المناسبة وعندما لا تكون.',
      ),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────
//  Branding
// ─────────────────────────────────────────────────────────────────────
const branding: ServiceContent = {
  slug: 'branding',
  docId: 'service-branding',
  category: 'branding',
  description: L(
    "Distinct, memorable brand identities for Qatar businesses ready to stand out, command premium pricing, and earn trust at every touchpoint. Strategy + identity + guidelines, built to last 10 years not 10 months.",
    'هويات علامة تجارية مميزة لا تُنسى للشركات القطرية المستعدة للتميز، فرض تسعير متميز، وكسب الثقة في كل نقطة لمس. استراتيجية + هوية + إرشادات، مبنية لتدوم 10 سنوات وليس 10 أشهر.',
  ),
  content: L(
    "A logo isn't a brand. A brand is everything your customer feels in the first 3 seconds — your name, your story, your voice, your visuals, the way your receptionist answers the phone, the smell of your office, the speed of your reply.\n\nM&M builds brands as integrated systems. We start with strategy: positioning workshops, competitor mapping, customer interviews, and a single sentence that crystallizes why you exist. From there: naming (if needed), verbal identity (tone, vocabulary, messaging pillars), visual identity (logo, colors, typography, iconography, photography direction, motion principles), and applications across every touchpoint your customer will experience — website, social, packaging, business cards, presentations, even WhatsApp business profile.\n\nEverything is documented in a brand guide your team, designers, printers, and ad partners can follow without guesswork — so the brand stays consistent as you scale, hire new people, and partner with new agencies.",
    'الشعار ليس علامة تجارية. العلامة التجارية هي كل ما يشعر به عميلك في الثواني الثلاث الأولى — اسمك، قصتك، صوتك، مرئياتك، الطريقة التي ترد بها موظفة الاستقبال على الهاتف، رائحة مكتبك، سرعة ردك.\n\nيبني M&M العلامات التجارية كأنظمة متكاملة. نبدأ بالاستراتيجية: ورش التموضع، رسم خرائط المنافسين، مقابلات العملاء، وجملة واحدة تبلور سبب وجودك. من هناك: التسمية (إذا لزم الأمر)، الهوية اللفظية (النبرة، المفردات، ركائز الرسائل)، الهوية البصرية (الشعار، الألوان، الطباعة، الأيقونات، توجيه التصوير، مبادئ الحركة)، والتطبيقات عبر كل نقطة لمس سيختبرها عميلك — الموقع، السوشيال، التغليف، بطاقات العمل، العروض التقديمية، حتى ملف WhatsApp business.\n\nكل شيء موثق في دليل علامة تجارية يمكن لفريقك والمصممين والطابعين وشركاء الإعلان اتباعه دون تخمين — حتى تبقى العلامة التجارية متسقة مع التوسع، توظيف أشخاص جدد، والشراكة مع وكالات جديدة.',
  ),
  whyItMatters: L(
    "In a market as crowded as Qatar, a forgettable brand is an expensive brand. Strong branding cuts customer acquisition cost (people trust you faster, click your ads more, refer you more often), raises pricing power (premium identity = premium price), and turns first-time buyers into repeat ones (brand = memory = loyalty).\n\nThe inverse is also true: a weak or inconsistent brand means every ad campaign starts from zero, every salesperson has to over-explain who you are, and every customer wonders if they made the right choice. The agencies still treating brand as 'just the logo' are quietly losing share to brands that invested in real positioning. That window closes for your category every year.",
    'في سوق مزدحم مثل قطر، العلامة التجارية غير المميزة مكلفة. العلامة التجارية القوية تخفض تكلفة اكتساب العملاء (يثق بك الناس أسرع، ينقرون إعلاناتك أكثر، يحيلونك أكثر)، ترفع قوة التسعير (هوية متميزة = سعر متميز)، وتحول المشترين لأول مرة إلى عملاء دائمين (علامة تجارية = ذاكرة = ولاء).\n\nالعكس صحيح أيضاً: العلامة التجارية الضعيفة أو غير المتسقة تعني أن كل حملة إعلانية تبدأ من الصفر، كل موظف مبيعات يجب أن يشرح بإفراط من أنت، وكل عميل يتساءل عما إذا كان قد اتخذ الاختيار الصحيح. الوكالات التي لا تزال تعامل العلامة التجارية كـ "مجرد شعار" تخسر بهدوء حصتها للعلامات التجارية التي استثمرت في تموضع حقيقي. تلك النافذة تغلق لفئتك كل عام.',
  ),
  deliverables: [
    L('Brand strategy workshop + positioning', 'ورشة استراتيجية العلامة التجارية والتموضع'),
    L('Competitor + market landscape mapping', 'رسم خرائط المنافسين والمشهد السوقي'),
    L('Naming + tagline development', 'التسمية وتطوير الشعار النصي'),
    L('Verbal identity (voice, tone, vocabulary)', 'الهوية اللفظية (الصوت، النبرة، المفردات)'),
    L('Logo design + lockup system', 'تصميم الشعار ونظام التطبيقات'),
    L('Color palette + typography system', 'لوحة الألوان ونظام الطباعة'),
    L('Art direction + photography style guide', 'التوجيه الفني ودليل أسلوب التصوير'),
    L('Iconography + illustration system', 'نظام الأيقونات والرسوم التوضيحية'),
    L('Full brand guidelines document (PDF + web)', 'دليل العلامة التجارية الكامل (PDF + ويب)'),
    L('Stationery + business cards + email signatures', 'القرطاسية وبطاقات العمل وتوقيعات البريد الإلكتروني'),
    L('Social media brand kit + templates', 'حقيبة العلامة التجارية للسوشيال والقوالب'),
    L('Brand application across packaging, signage, uniforms', 'تطبيق العلامة التجارية عبر التغليف واللافتات والزي الرسمي'),
  ],
  ctaTitle: L('Ready to be the brand worth choosing?', 'جاهز لتكون العلامة التجارية التي تستحق الاختيار؟'),
  ctaText: L(
    "Tell us where your brand is today. We'll send back a brand audit, a positioning roadmap, and a sample of three Qatar brands we've built — within 24 hours.",
    'أخبرنا بحالة علامتك التجارية اليوم. سنرسل تدقيق علامة تجارية، خارطة طريق للتموضع، ونماذج من ثلاث علامات قطرية بنيناها — خلال 24 ساعة.',
  ),
  finalCtaButtonText: L('Start My Brand Strategy', 'ابدأ استراتيجية علامتي التجارية'),
  faqs: [
    {
      question: L(
        'How long does a full brand identity project take?',
        'كم من الوقت يستغرق مشروع هوية علامة تجارية كامل؟',
      ),
      answer: L(
        '8–14 weeks for a full identity project (strategy + naming + visual + guidelines + applications). 4–6 weeks for a brand refresh (keeping core elements, updating visual system). 2–3 weeks for logo-only work if you already have positioning. We work in transparent milestones so you see progress every two weeks.',
        '8–14 أسبوعاً لمشروع هوية كامل (استراتيجية + تسمية + بصري + إرشادات + تطبيقات). 4–6 أسابيع لتحديث علامة تجارية (الاحتفاظ بالعناصر الأساسية، تحديث النظام البصري). 2–3 أسابيع لعمل الشعار فقط إذا كان لديك تموضع بالفعل. نعمل بمعالم شفافة حتى ترى التقدم كل أسبوعين.',
      ),
    },
    {
      question: L(
        'Do you do naming and Arabic brand identity?',
        'هل تقومون بالتسمية والهوية العربية للعلامة التجارية؟',
      ),
      answer: L(
        "Yes — both naming (English, Arabic, or bilingual) and full Arabic visual identity (Arabic logotype design, Arabic typography selection, Arabic-first art direction). For Qatar brands, we strongly recommend bilingual treatment from day one rather than translating later. Arabic identity isn't a translation — it's a different design language.",
        'نعم — كل من التسمية (الإنجليزية، العربية، أو ثنائية اللغة) والهوية البصرية العربية الكاملة (تصميم شعار عربي، اختيار طباعة عربية، توجيه فني عربي أولاً). للعلامات التجارية القطرية، نوصي بشدة بالمعالجة ثنائية اللغة من اليوم الأول بدلاً من الترجمة لاحقاً. الهوية العربية ليست ترجمة — إنها لغة تصميم مختلفة.',
      ),
    },
    {
      question: L(
        'What happens if I already have a logo I want to keep?',
        'ماذا يحدث إذا كان لدي شعار بالفعل أريد الاحتفاظ به؟',
      ),
      answer: L(
        "We can absolutely work with that. In a brand-system engagement (no logo change), we build everything around it: positioning, voice, color refinement, typography, art direction, guidelines, applications. We'll honestly flag if the logo itself is holding the brand back — but it's your call whether to address that or not.",
        'يمكننا العمل مع ذلك بالتأكيد. في مشاركة نظام علامة تجارية (لا يوجد تغيير شعار)، نبني كل شيء حوله: التموضع، الصوت، تحسين الألوان، الطباعة، التوجيه الفني، الإرشادات، التطبيقات. سنشير بصدق إذا كان الشعار نفسه يعيق العلامة التجارية — لكنك تقرر ما إذا كنت تعالج ذلك أم لا.',
      ),
    },
    {
      question: L(
        'Do you trademark the brand for us?',
        'هل تسجلون العلامة التجارية لنا؟',
      ),
      answer: L(
        "We don't file trademarks directly (we're not a law firm), but we partner with two Qatar IP firms and will handle the introduction, brief, and the design files they need. Trademark filing in Qatar typically takes 6–12 months and we recommend starting it the moment the visual identity is approved.",
        'لا نقدم العلامات التجارية مباشرة (لسنا شركة محاماة)، لكننا نشترك مع شركتي ملكية فكرية قطريتين وسنتعامل مع التقديم والملخص وملفات التصميم التي يحتاجونها. عادةً ما يستغرق تسجيل العلامة التجارية في قطر 6–12 شهراً ونوصي ببدئه في اللحظة التي تتم فيها الموافقة على الهوية البصرية.',
      ),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────
//  Paid Ads
// ─────────────────────────────────────────────────────────────────────
const paidAds: ServiceContent = {
  slug: 'paid-ads',
  docId: 'service-paid-ads',
  category: 'paid-ads',
  description: L(
    "Performance-driven paid media on Google, Meta, TikTok, LinkedIn, and Snapchat — engineered to convert spend into measurable revenue with full attribution, weekly optimization, and zero black boxes.",
    'إعلانات مدفوعة قائمة على الأداء على Google و Meta و TikTok و LinkedIn و Snapchat — مهندسة لتحويل الإنفاق إلى إيرادات قابلة للقياس مع إسناد كامل، تحسين أسبوعي، وعدم وجود صناديق سوداء.',
  ),
  content: L(
    "Most ad accounts in Qatar burn budget on traffic that never converts. Why? Generic audience targeting, weak creative recycled from a Canva template, broken landing pages, and conversion tracking that's been broken since iOS 14.5 — agencies just don't tell you.\n\nM&M rebuilds paid media around the metrics that actually move your business: cost per qualified lead (not cost per click), return on ad spend (not impressions), and customer lifetime value (not last-click ROAS).\n\nThe stack: audience research grounded in your CRM data, creative production by our in-house team (statics, videos, UGC), platform-native ad copy in EN and AR, full-funnel tracking via GA4 + server-side events + Meta Conversions API, weekly optimization based on cost per qualified lead, and a monthly report that explains exactly which campaigns earned their keep and which got killed.",
    'تستهلك معظم حسابات الإعلانات في قطر الميزانية على حركة مرور لا تتحول. لماذا؟ استهداف عام للجمهور، إبداع ضعيف معاد تدويره من قالب Canva، صفحات هبوط معطلة، وتتبع تحويل معطل منذ iOS 14.5 — لا تخبرك الوكالات.\n\nتعيد M&M بناء الإعلانات المدفوعة حول المقاييس التي تحرك عملك فعلاً: تكلفة لكل عميل محتمل مؤهل (وليس تكلفة لكل نقرة)، عائد على الإنفاق الإعلاني (وليس الانطباعات)، وقيمة عمر العميل (وليس عائد النقرة الأخيرة).\n\nالحزمة: أبحاث الجمهور المستندة إلى بيانات CRM، إنتاج الإبداع من قبل فريقنا الداخلي (ثابت، فيديو، UGC)، نسخة إعلانية أصلية للمنصة بالإنجليزية والعربية، تتبع كامل القمع عبر GA4 + أحداث جانب الخادم + Meta Conversions API، تحسين أسبوعي بناءً على تكلفة لكل عميل محتمل مؤهل، وتقرير شهري يفسر بالضبط أي الحملات حصلت على ميزانيتها وأيها تم قتلها.',
  ),
  whyItMatters: L(
    "Paid ads are the only marketing channel where bad work costs you money in real time. A weak SEO month costs you opportunity. A weak paid month costs you your media budget — and then some, because every campaign you didn't optimize gave your competitors cheaper inventory.\n\nIn Qatar specifically: ad costs on Meta and TikTok have risen 40%+ in the last 18 months. The brands still running paid ads the way they did in 2023 are paying double per lead and don't know why. The winners are the ones using server-side tracking, custom audiences from CRM, creative testing weekly, and proper attribution. That's the bar now — anything less is light setting money on fire.",
    'الإعلانات المدفوعة هي القناة التسويقية الوحيدة حيث يكلفك العمل السيء المال في الوقت الفعلي. شهر SEO ضعيف يكلفك الفرصة. شهر مدفوع ضعيف يكلفك ميزانيتك الإعلامية — وأكثر، لأن كل حملة لم تحسّنها أعطت منافسيك مخزوناً أرخص.\n\nفي قطر تحديداً: ارتفعت تكاليف الإعلانات على Meta و TikTok بأكثر من 40% في الأشهر الـ 18 الماضية. العلامات التجارية التي لا تزال تدير الإعلانات المدفوعة بالطريقة التي فعلتها في 2023 تدفع ضعفاً لكل عميل محتمل ولا تعرف السبب. الفائزون هم الذين يستخدمون التتبع من جانب الخادم، الجماهير المخصصة من CRM، اختبار الإبداع أسبوعياً، والإسناد المناسب. هذا هو المعيار الآن — أي شيء أقل هو إشعال المال.',
  ),
  deliverables: [
    L('Audience research + ICP definition', 'أبحاث الجمهور وتعريف الملف المثالي'),
    L('Google Ads (Search, Performance Max, Shopping, YouTube)', 'إعلانات Google (Search، Performance Max، التسوق، YouTube)'),
    L('Meta Ads (Facebook + Instagram + Reels)', 'إعلانات Meta (Facebook + Instagram + Reels)'),
    L('TikTok Ads (Spark Ads, in-feed, Brand Takeover)', 'إعلانات TikTok (Spark Ads، in-feed، Brand Takeover)'),
    L('LinkedIn Ads (Sponsored, InMail, Lead Gen)', 'إعلانات LinkedIn (Sponsored، InMail، Lead Gen)'),
    L('Snapchat + X (Twitter) Ads when relevant', 'إعلانات Snapchat و X (Twitter) عند الحاجة'),
    L('Creative production (static, video, UGC, motion)', 'إنتاج الإبداع (ثابت، فيديو، UGC، motion)'),
    L('Landing page audit + conversion improvements', 'تدقيق صفحات الهبوط وتحسينات التحويل'),
    L('Server-side tracking + Conversions API', 'تتبع جانب الخادم و Conversions API'),
    L('Custom audiences from your CRM data', 'جماهير مخصصة من بيانات CRM الخاصة بك'),
    L('Weekly optimization + creative refresh', 'تحسين أسبوعي وتجديد الإبداع'),
    L('Monthly ROAS + CAC reporting tied to revenue', 'تقارير ROAS و CAC شهرية مرتبطة بالإيرادات'),
  ],
  ctaTitle: L('Ready for paid ads that actually pay?', 'جاهز لإعلانات مدفوعة تردّ فعلاً؟'),
  ctaText: L(
    "Free 30-minute paid-media audit. Share your goals and current ad spend — we'll come back within 24 hours with a media plan, expected ROAS range, and the first three creative concepts to test.",
    'تدقيق مجاني لمدة 30 دقيقة للإعلانات المدفوعة. شارك أهدافك وميزانية إعلانك الحالية — سنرد خلال 24 ساعة بخطة إعلامية، نطاق ROAS متوقع، وأول ثلاثة مفاهيم إبداعية للاختبار.',
  ),
  finalCtaButtonText: L('Get My Paid Media Plan', 'احصل على خطة الإعلانات المدفوعة'),
  faqs: [
    {
      question: L(
        'What is the minimum monthly ad spend I need?',
        'ما هو الحد الأدنى للإنفاق الإعلاني الشهري الذي أحتاجه؟',
      ),
      answer: L(
        "We've launched profitable campaigns on QAR 3,000/month for niche local businesses. Realistically, QAR 8,000–15,000/month is where Meta + Google start working together meaningfully. Competitive categories (real estate, automotive, education, B2B services) usually need QAR 20,000+/month to outbid the established players. We won't take a client where the budget can't generate ROI — we'll tell you straight.",
        'لقد أطلقنا حملات مربحة على 3,000 ر.ق/شهرياً للشركات المحلية المتخصصة. واقعياً، 8,000–15,000 ر.ق/شهرياً هو حيث تبدأ Meta و Google في العمل معاً بشكل ذي معنى. عادةً ما تحتاج الفئات التنافسية (العقارات، السيارات، التعليم، خدمات B2B) إلى 20,000+ ر.ق/شهرياً للتغلب على اللاعبين المعتمدين. لن نأخذ عميلاً حيث لا يمكن للميزانية توليد عائد على الاستثمار — سنخبرك بصراحة.',
      ),
    },
    {
      question: L(
        'How do you measure ROI on paid ads?',
        'كيف تقيسون عائد الاستثمار على الإعلانات المدفوعة؟',
      ),
      answer: L(
        "We track three layers: (1) Platform metrics (CPM, CPC, CTR) — useful for diagnosing creative; (2) Funnel metrics (cost per lead, cost per qualified lead, cost per opportunity) — the day-to-day decision metrics; (3) Revenue metrics (CAC vs LTV, ROAS, payback period) — tied to your CRM data. You'll see all three in the monthly report. No vanity metrics.",
        'نتتبع ثلاث طبقات: (1) مقاييس المنصة (CPM و CPC و CTR) — مفيدة لتشخيص الإبداع؛ (2) مقاييس القمع (تكلفة لكل عميل محتمل، تكلفة لكل عميل محتمل مؤهل، تكلفة لكل فرصة) — مقاييس القرار اليومية؛ (3) مقاييس الإيرادات (CAC مقابل LTV و ROAS و فترة الاسترداد) — مرتبطة ببيانات CRM. سترى الثلاثة في التقرير الشهري. لا مقاييس شكلية.',
      ),
    },
    {
      question: L(
        'Do you produce the ad creative or do I need to?',
        'هل تنتجون الإبداع الإعلاني أم أحتاج إلى ذلك؟',
      ),
      answer: L(
        "We produce everything in-house — statics, motion graphics, video shoots, UGC-style content, Arabic adaptations. That's actually our biggest competitive edge: most Qatar agencies outsource creative to freelancers, which means slow turnaround and inconsistent quality. We can ship a new creative concept within 48 hours and run weekly creative tests because the team is in our office.",
        'ننتج كل شيء داخلياً — ثابت، motion graphics، تصوير فيديو، محتوى بأسلوب UGC، تكييفات عربية. هذا في الواقع أكبر ميزة تنافسية لدينا: تعطي معظم الوكالات القطرية الإبداع للمستقلين، مما يعني تسليم بطيء وجودة غير متسقة. يمكننا شحن مفهوم إبداعي جديد خلال 48 ساعة وإجراء اختبارات إبداعية أسبوعية لأن الفريق في مكتبنا.',
      ),
    },
    {
      question: L(
        "What if my ROAS isn't where I want it?",
        'ماذا لو لم يكن عائد الإنفاق الإعلاني حيث أريد؟',
      ),
      answer: L(
        "First we diagnose — is it creative, audience, landing page, offer, or attribution? Each has different fixes. We never recommend just spending more to mask underperformance. If after 90 days we can't get you within 80% of your ROAS target, we'll have an honest conversation about whether paid is the right channel for your stage and category — and recommend something else if it isn't.",
        'أولاً نشخص — هل هو الإبداع، الجمهور، صفحة الهبوط، العرض، أم الإسناد؟ لكل واحد إصلاحات مختلفة. لا نوصي أبداً بمجرد الإنفاق أكثر لإخفاء ضعف الأداء. إذا لم نتمكن بعد 90 يوماً من الوصول بك إلى 80% من هدف ROAS، سنجري محادثة صادقة حول ما إذا كانت المدفوعة هي القناة المناسبة لمرحلتك وفئتك — ونوصي بشيء آخر إذا لم تكن كذلك.',
      ),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────
//  AI LLMO/GEO
// ─────────────────────────────────────────────────────────────────────
const aiLlmo: ServiceContent = {
  slug: 'ai-llmo-geo',
  docId: 'service-ai-llmo-geo',
  category: 'ai-llmo-geo',
  description: L(
    "Get your brand cited inside ChatGPT, Gemini, Perplexity, and Google's AI Overviews — the new search layer your Qatar competitors aren't optimizing for yet. First-mover advantage closes within 18 months.",
    'احصل على ذكر علامتك التجارية داخل ChatGPT و Gemini و Perplexity ونظرة Google الإجمالية بالذكاء الاصطناعي — طبقة البحث الجديدة التي لم يحسّن لها منافسوك القطريون بعد. تغلق ميزة المتحرك الأول خلال 18 شهراً.',
  ),
  content: L(
    "Search is being rebuilt in front of our eyes. By the end of 2026, an estimated 35% of buying-intent queries in Qatar will start inside an AI assistant — not on Google. When someone asks ChatGPT 'best marketing agency in Doha' or asks Gemini 'reliable digital agency Qatar,' the answer they get is whatever the AI was trained on plus what it can verify in real time. If your brand isn't surfaced — you're invisible to that buyer.\n\nLLMO (Large Language Model Optimization) and GEO (Generative Engine Optimization) is the new SEO. M&M builds your brand's footprint specifically for how AI engines decide what to mention: structured data, knowledge-graph signals, entity-first content, citations in high-authority sources, and weekly monitoring of how each major LLM describes your brand.\n\nWe track your visibility across ChatGPT, Gemini, Perplexity, Google AI Overviews (SGE), Claude, and AI Overviews on mobile — and benchmark against your top 3 competitors so you can see exactly which battles you're winning and losing.",
    'يتم إعادة بناء البحث أمام أعيننا. بحلول نهاية 2026، يقدر أن 35% من استفسارات نية الشراء في قطر ستبدأ داخل مساعد ذكاء اصطناعي — وليس على Google. عندما يسأل شخص ما ChatGPT "أفضل وكالة تسويق في الدوحة" أو يسأل Gemini "وكالة رقمية موثوقة قطر"، الإجابة التي يحصلون عليها هي ما تم تدريب الذكاء الاصطناعي عليه بالإضافة إلى ما يمكنه التحقق منه في الوقت الفعلي. إذا لم تظهر علامتك التجارية — فأنت غير مرئي لهذا المشتري.\n\nLLMO (تحسين نماذج اللغة الكبيرة) و GEO (تحسين المحركات التوليدية) هو SEO الجديد. تبني M&M بصمة علامتك التجارية خصيصاً لكيفية تحديد محركات الذكاء الاصطناعي ما تذكره: البيانات المنظمة، إشارات الرسم البياني المعرفي، المحتوى المرتكز على الكيانات، الاستشهادات في مصادر ذات صلاحية عالية، والمراقبة الأسبوعية لكيفية وصف كل LLM رئيسي لعلامتك التجارية.\n\nنتتبع ظهورك عبر ChatGPT و Gemini و Perplexity ونظرة Google الإجمالية بالذكاء الاصطناعي (SGE) و Claude و AI Overviews على الجوال — ونقارن مع أفضل 3 منافسين لك حتى ترى بالضبط أي المعارك تكسبها وأيها تخسرها.',
  ),
  whyItMatters: L(
    "Here's the brutal math: in 2024, AI-driven traffic represented under 1% of all referrals. In Q1 2026, it crossed 8% globally and is rising 15% month-over-month. Whoever is mentioned by ChatGPT or Gemini today gets the compounding tailwind for the next decade. Whoever isn't, has to fight for it later — at much higher cost.\n\nMost Qatar agencies don't even know what LLMO is yet. That window — the gap between 'this matters' and 'every competitor is doing it' — is what we build advantage in. The brands that show up in AI search by end of 2026 will own their categories in 2028. There is no second-mover advantage here.",
    'إليك الرياضيات الوحشية: في 2024، مثلت حركة المرور المدفوعة بالذكاء الاصطناعي أقل من 1% من جميع الإحالات. في الربع الأول من 2026، تجاوزت 8% عالمياً وترتفع 15% من شهر إلى شهر. من يتم ذكره بواسطة ChatGPT أو Gemini اليوم يحصل على الدفعة المتراكمة للعقد المقبل. من ليس كذلك، عليه أن يقاتل من أجلها لاحقاً — بتكلفة أعلى بكثير.\n\nمعظم الوكالات القطرية لا تعرف ما هو LLMO بعد. تلك النافذة — الفجوة بين "هذا مهم" و "كل منافس يفعل ذلك" — هي حيث نبني الميزة. العلامات التجارية التي تظهر في بحث الذكاء الاصطناعي بحلول نهاية 2026 ستمتلك فئاتها في 2028. لا توجد ميزة متحرك ثاني هنا.',
  ),
  deliverables: [
    L('AI visibility audit across ChatGPT, Gemini, Perplexity, Claude', 'تدقيق الظهور في الذكاء الاصطناعي عبر ChatGPT و Gemini و Perplexity و Claude'),
    L('Knowledge-graph + entity optimization', 'تحسين الرسم البياني المعرفي والكيانات'),
    L('Schema.org structured data implementation', 'تطبيق البيانات المنظمة Schema.org'),
    L('Wikipedia + Wikidata profile creation/optimization', 'إنشاء/تحسين ملفات Wikipedia و Wikidata'),
    L('Authoritative citation building (PR, listings, mentions)', 'بناء الاستشهادات الموثوقة (PR، القوائم، الذكر)'),
    L('LLM-optimized content rewrites of key service pages', 'إعادة كتابة محتوى الصفحات الرئيسية محسنة لـ LLM'),
    L('FAQ + entity-first content production', 'إنتاج محتوى FAQ والكيانات أولاً'),
    L('Google AI Overviews (SGE) optimization', 'تحسين Google AI Overviews (SGE)'),
    L('Weekly AI-mention tracking dashboard', 'لوحة تتبع أسبوعية لذكر الذكاء الاصطناعي'),
    L('Competitor AI-visibility benchmarking', 'قياس مرجعي للظهور التنافسي في الذكاء الاصطناعي'),
    L('Reputation monitoring across AI engines', 'مراقبة السمعة عبر محركات الذكاء الاصطناعي'),
    L('Quarterly LLMO strategy review + roadmap', 'مراجعة استراتيجية LLMO ربع سنوية وخارطة الطريق'),
  ],
  ctaTitle: L('Want to be the brand AI recommends?', 'هل تريد أن تكون العلامة التجارية التي يوصي بها الذكاء الاصطناعي؟'),
  ctaText: L(
    "Free AI visibility audit. We'll run your brand against ChatGPT, Gemini, Perplexity, and Google AI Overviews and send back a report showing exactly where you're cited (and where your competitors are) within 24 hours.",
    'تدقيق مجاني للظهور في الذكاء الاصطناعي. سنقوم بتشغيل علامتك التجارية مقابل ChatGPT و Gemini و Perplexity ونظرة Google الإجمالية بالذكاء الاصطناعي ونرسل تقريراً يظهر بالضبط حيث يتم ذكرك (وأين يتم ذكر منافسيك) خلال 24 ساعة.',
  ),
  finalCtaButtonText: L('Audit My AI Visibility', 'دقق ظهوري في الذكاء الاصطناعي'),
  faqs: [
    {
      question: L(
        "Is LLMO really different from SEO?",
        'هل LLMO مختلف فعلاً عن SEO؟',
      ),
      answer: L(
        "Yes — different inputs, different ranking signals, different optimization tactics. Traditional SEO optimizes for Google's crawler and link graph. LLMO optimizes for how an AI model selects and synthesizes information at query time. Some overlap (schema, authority, content quality), but a lot of LLMO is brand-new: entity profiles, Wikipedia/Wikidata signals, retrieval-augmented generation (RAG) sources, and the way different LLMs weight different citation classes.",
        'نعم — مدخلات مختلفة، إشارات تصنيف مختلفة، تكتيكات تحسين مختلفة. يحسن SEO التقليدي لزاحف Google ورسم الروابط. يحسن LLMO لكيفية اختيار نموذج الذكاء الاصطناعي وتركيب المعلومات في وقت الاستفسار. بعض التداخل (schema، السلطة، جودة المحتوى)، لكن الكثير من LLMO جديد تماماً: ملفات الكيانات، إشارات Wikipedia/Wikidata، مصادر retrieval-augmented generation (RAG)، والطريقة التي تزن بها LLMs المختلفة فئات الاستشهاد المختلفة.',
      ),
    },
    {
      question: L(
        "How do I know if my brand is mentioned by ChatGPT?",
        'كيف أعرف ما إذا كان ChatGPT يذكر علامتي التجارية؟',
      ),
      answer: L(
        "We run a structured query set across all major LLMs for your category — questions a Qatar buyer would actually ask — and capture every response. That gives you a baseline visibility map: where you're cited, where competitors are cited, where neither is, and which queries the LLMs refuse to answer. We re-run this weekly so you can see movement over time.",
        'نقوم بتشغيل مجموعة استفسارات منظمة عبر جميع LLMs الرئيسية لفئتك — أسئلة سيطرحها المشتري القطري فعلياً — ونلتقط كل رد. هذا يعطيك خريطة ظهور أساسية: حيث يتم ذكرك، حيث يتم ذكر المنافسين، حيث لا يتم ذكر أي منهما، وأي استفسارات ترفض LLMs الإجابة عليها. نعيد تشغيل هذا أسبوعياً حتى ترى الحركة عبر الوقت.',
      ),
    },
    {
      question: L(
        "How long until I see results from LLMO?",
        'كم من الوقت حتى أرى نتائج من LLMO؟',
      ),
      answer: L(
        "Faster than traditional SEO for two reasons: (1) LLMs ingest new authoritative signals quickly — sometimes weeks not months; (2) the field is so uncrowded that getting cited is achievable for most credible Qatar brands in the first 90 days. Full category leadership in AI search takes 6–12 months. The brands starting now will be unbeatable in their categories by 2027.",
        'أسرع من SEO التقليدي لسببين: (1) تستوعب LLMs الإشارات الموثوقة الجديدة بسرعة — أحياناً أسابيع وليس أشهر؛ (2) المجال غير مزدحم لدرجة أن الحصول على ذكر قابل للتحقيق لمعظم العلامات التجارية القطرية الموثوقة في الـ 90 يوماً الأولى. تأخذ قيادة فئة كاملة في بحث الذكاء الاصطناعي 6–12 شهراً. ستكون العلامات التجارية التي تبدأ الآن لا تقهر في فئاتها بحلول 2027.',
      ),
    },
    {
      question: L(
        "Is this snake oil? How is it measurable?",
        'هل هذا زيت ثعبان؟ كيف يمكن قياسه؟',
      ),
      answer: L(
        "Fair question — there are plenty of LLMO snake-oil sellers. M&M's approach is measurable end-to-end: weekly mention-tracking against a fixed query set (so you can see actual progress), citation logging in third-party SEO tools (Ahrefs, SEMrush now track AI Overviews citations), and revenue attribution where AI-referred traffic shows up in your analytics. If we can't prove movement in 90 days, we'll tell you.",
        'سؤال عادل — هناك الكثير من بائعي زيت الثعبان LLMO. نهج M&M قابل للقياس من البداية إلى النهاية: تتبع الذكر الأسبوعي مقابل مجموعة استفسارات ثابتة (حتى ترى التقدم الفعلي)، تسجيل الاستشهادات في أدوات SEO من جهات خارجية (Ahrefs و SEMrush تتبع الآن استشهادات AI Overviews)، وإسناد الإيرادات حيث تظهر حركة المرور المحالة من الذكاء الاصطناعي في تحليلاتك. إذا لم نتمكن من إثبات الحركة في 90 يوماً، سنخبرك.',
      ),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────
//  Videography
// ─────────────────────────────────────────────────────────────────────
const videography: ServiceContent = {
  slug: 'videography',
  docId: 'service-videography',
  category: 'general',
  description: L(
    "Cinematic brand films, product campaigns, event coverage, and social-first video — directed, shot, edited, and delivered by our in-house team in Qatar. Concept to final cut, no outsourcing.",
    'أفلام علامة تجارية سينمائية وحملات منتجات وتغطية فعاليات وفيديوهات للسوشيال — بإخراج وتصوير ومونتاج وتسليم من فريقنا الداخلي في قطر. من الفكرة إلى المونتاج النهائي، بدون تعهيد.',
  ),
  content: L(
    "Video is the only creative format with rising ROI across every paid platform in 2026 — but only when it's directed, shot, and edited with intent. Generic stock-style footage gets scrolled past in 0.5 seconds. Cinematic, on-brand video holds attention long enough to actually sell.\n\nM&M operates a full in-house production team: director, cinematographer, sound engineer, lighting team, editor, colorist, and motion designer — all under one roof. That means we can ship a finished product video in 7 days, an event opener in 48 hours, and a full brand campaign in 3 weeks. No coordination with three different freelancers and no quality drops.\n\nWe handle the entire lifecycle: concept development, scriptwriting, storyboarding, casting (talent, models, voiceover artists), location scouting in Qatar, shoot day execution, post-production (edit, color, sound design, VFX, motion graphics), and platform-native delivery in every aspect ratio (16:9 for YouTube, 9:16 for Reels/TikTok/Shorts, 1:1 for feeds, 4:5 for stories). Subtitles in EN and AR are included.",
    'الفيديو هو الشكل الإبداعي الوحيد الذي يحقق عائداً متزايداً على كل منصة مدفوعة في 2026 — ولكن فقط عندما يتم إخراجه وتصويره ومونتاجه بنية. تتم تمرير اللقطات العامة بأسلوب المخزون في نصف ثانية. الفيديو السينمائي المتوافق مع العلامة التجارية يحافظ على الانتباه لفترة كافية للبيع فعلاً.\n\nتدير M&M فريق إنتاج داخلي كامل: مخرج، مصور سينمائي، مهندس صوت، فريق إضاءة، محرر، مصحح ألوان، ومصمم motion — كلها تحت سقف واحد. هذا يعني أنه يمكننا شحن فيديو منتج نهائي في 7 أيام، افتتاحية فعالية في 48 ساعة، وحملة علامة تجارية كاملة في 3 أسابيع. لا تنسيق مع ثلاثة مستقلين مختلفين ولا انخفاض في الجودة.\n\nنتعامل مع دورة الحياة بأكملها: تطوير المفهوم، كتابة السيناريو، اللوحة القصصية، التمثيل (الموهبة، العارضين، فناني التعليق الصوتي)، البحث عن المواقع في قطر، تنفيذ يوم التصوير، ما بعد الإنتاج (المونتاج، الألوان، التصميم الصوتي، VFX، motion graphics)، والتسليم المخصص لكل منصة في كل نسبة عرض (16:9 لـ YouTube، 9:16 لـ Reels/TikTok/Shorts، 1:1 للموجزات، 4:5 للقصص). يتم تضمين الترجمات بالإنجليزية والعربية.',
  ),
  whyItMatters: L(
    "Static creative is hitting diminishing returns across every paid platform. Meta, TikTok, YouTube, even LinkedIn — the algorithms reward video, and audiences only stop scrolling for video that feels intentional. Cheap UGC-only strategies are saturating fast. Generic stock-style cuts get scrolled past in under a second.\n\nThe brands winning attention in Qatar right now are investing in real production: cinematic lighting, considered audio, on-brand color, deliberate pacing, characters and stories you remember. It's not about budget — it's about intent. And the agencies still relying on iPhone-shot UGC and Canva motion templates are quietly losing brand equity every month.",
    'يصل الإبداع الثابت إلى عوائد متناقصة عبر كل منصة مدفوعة. Meta و TikTok و YouTube، حتى LinkedIn — الخوارزميات تكافئ الفيديو، والجماهير لا تتوقف عن التمرير إلا للفيديو الذي يبدو مقصوداً. تشبع استراتيجيات UGC الرخيصة فقط بسرعة. تتم تمرير اللقطات العامة بأسلوب المخزون في أقل من ثانية.\n\nالعلامات التجارية التي تكسب الانتباه في قطر الآن تستثمر في إنتاج حقيقي: إضاءة سينمائية، صوت مدروس، ألوان متوافقة مع العلامة التجارية، إيقاع متعمد، شخصيات وقصص تتذكرها. ليس الأمر يتعلق بالميزانية — إنه يتعلق بالنية. والوكالات التي لا تزال تعتمد على UGC المصور بـ iPhone وقوالب motion Canva تخسر بهدوء أصول العلامة التجارية كل شهر.',
  ),
  deliverables: [
    L('Concept development + scriptwriting', 'تطوير المفهوم وكتابة السيناريو'),
    L('Storyboard + shot list', 'اللوحة القصصية وقائمة اللقطات'),
    L('Casting (talent, models, voiceover artists)', 'التمثيل (الموهبة، العارضين، فناني التعليق الصوتي)'),
    L('Location scouting in Qatar', 'البحث عن المواقع في قطر'),
    L('Full crew shoot (director, DP, sound, lighting)', 'تصوير بطاقم كامل (مخرج، DP، صوت، إضاءة)'),
    L('Studio + product + on-location shoots', 'تصوير في الاستوديو والمنتجات والمواقع'),
    L('Event coverage + brand-event openers', 'تغطية الفعاليات وافتتاحيات فعاليات العلامة التجارية'),
    L('Edit, color grade, sound design', 'المونتاج، تصحيح الألوان، التصميم الصوتي'),
    L('Motion graphics, lower-thirds, animations', 'motion graphics، الشاشات السفلية، الرسوم المتحركة'),
    L('Subtitles in English + Arabic', 'الترجمة بالإنجليزية والعربية'),
    L('Platform-native delivery (16:9, 9:16, 1:1, 4:5)', 'تسليم مخصص لكل منصة (16:9 و 9:16 و 1:1 و 4:5)'),
    L('Master file archive + future-edit licensing', 'أرشيف ملف رئيسي وترخيص للمونتاج المستقبلي'),
  ],
  ctaTitle: L('Ready to shoot something that performs?', 'جاهز لتصوير شيء يحقق نتائج؟'),
  ctaText: L(
    "Tell us about your project — brand film, product campaign, event coverage, or social series. We'll send back a creative direction, scoped budget, and timeline within 24 hours.",
    'أخبرنا عن مشروعك — فيلم علامة تجارية، حملة منتج، تغطية فعالية، أو سلسلة سوشيال. سنرد بتوجيه إبداعي، ميزانية محددة النطاق، وجدول زمني خلال 24 ساعة.',
  ),
  finalCtaButtonText: L('Plan My Video Project', 'خطط لمشروع الفيديو الخاص بي'),
  faqs: [
    {
      question: L(
        'How much does a brand video cost in Qatar?',
        'كم تكلفة فيديو علامة تجارية في قطر؟',
      ),
      answer: L(
        "Depends entirely on scope. Single 30-second product video: QAR 8,000–15,000. A 90-second cinematic brand film: QAR 25,000–50,000. Multi-day brand campaign with multiple cuts + assets: QAR 60,000–150,000. Event coverage starts at QAR 4,000/day. We'll always quote upfront with line-item transparency — pre-production, shoot day, post — so you know exactly where the budget goes.",
        'يعتمد كلياً على النطاق. فيديو منتج واحد لمدة 30 ثانية: 8,000–15,000 ر.ق. فيلم علامة تجارية سينمائي لمدة 90 ثانية: 25,000–50,000 ر.ق. حملة علامة تجارية متعددة الأيام مع لقطات وأصول متعددة: 60,000–150,000 ر.ق. تبدأ تغطية الفعاليات من 4,000 ر.ق/يوم. سنقدم سعراً مقدماً دائماً بشفافية كاملة — ما قبل الإنتاج، يوم التصوير، ما بعد — حتى تعرف بالضبط أين تذهب الميزانية.',
      ),
    },
    {
      question: L(
        'How fast can you turn around a finished video?',
        'كم بسرعة يمكنكم تسليم فيديو نهائي؟',
      ),
      answer: L(
        "Event coverage with a one-cut deliverable: 48 hours. A product video from concept to final cut: 7–10 days. A full brand film with story, cast, multiple locations: 3–5 weeks. Rush jobs are possible for an added fee. We don't compromise quality to hit speed — we'll tell you upfront if your timeline is unrealistic and what's achievable instead.",
        'تغطية الفعاليات مع تسليم لقطة واحدة: 48 ساعة. فيديو منتج من الفكرة إلى المونتاج النهائي: 7–10 أيام. فيلم علامة تجارية كامل مع قصة، طاقم تمثيل، مواقع متعددة: 3–5 أسابيع. الأعمال العاجلة ممكنة برسوم إضافية. لا نساوم على الجودة لتحقيق السرعة — سنخبرك مقدماً إذا كان جدولك الزمني غير واقعي وما يمكن تحقيقه بدلاً من ذلك.',
      ),
    },
    {
      question: L(
        "Do you own the cameras and gear, or is it rented?",
        'هل تمتلكون الكاميرات والمعدات، أم مستأجرة؟',
      ),
      answer: L(
        "We own our core kit (cameras, primary lenses, lighting, audio, gimbals, drone) so 80% of shoots run on owned gear. For specialty shoots (cinema-grade lenses, larger lighting, specialty equipment) we rent from trusted Qatar partners. Either way it's transparent on the quote — you won't be surprised by a rental line you didn't expect.",
        'نمتلك مجموعتنا الأساسية (الكاميرات، العدسات الأساسية، الإضاءة، الصوت، gimbals، drone) حتى 80% من التصوير يعمل على معدات مملوكة. للتصوير المتخصص (عدسات سينمائية، إضاءة أكبر، معدات متخصصة) نستأجر من شركاء قطر الموثوقين. في كلتا الحالتين، إنه شفاف في العرض — لن تتفاجأ بسطر إيجار لم تتوقعه.',
      ),
    },
    {
      question: L(
        "Can you shoot in multiple languages or with Arabic voiceover?",
        'هل يمكنكم التصوير بلغات متعددة أو بتعليق صوتي عربي؟',
      ),
      answer: L(
        "Yes — bilingual is our default. We have a network of Arabic and English voiceover talent in Qatar (Gulf, Levantine, MSA), bilingual on-screen talent, and our directors and editors all work natively in both languages. Most of our brand films ship with EN and AR versions edited day-one so you don't pay twice.",
        'نعم — ثنائية اللغة هي افتراضنا. لدينا شبكة من مواهب التعليق الصوتي العربية والإنجليزية في قطر (الخليج، الشام، الفصحى)، مواهب ثنائية اللغة على الشاشة، ومخرجونا ومحررونا يعملون جميعاً بشكل أصلي بكلتا اللغتين. تشحن معظم أفلامنا التجارية بإصدارات EN و AR محررة في اليوم الأول حتى لا تدفع مرتين.',
      ),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────
//  Run
// ─────────────────────────────────────────────────────────────────────
const services: ServiceContent[] = [seo, webDev, social, bulkSms, branding, paidAds, aiLlmo, videography]

async function main() {
  console.log(`Enriching content for ${services.length} services + creating ${services.reduce((n, s) => n + s.faqs.length, 0)} FAQs…`)

  // ─── Resolve actual doc IDs by slug ───────────────────────────────
  // Older services (seo, web-development, social-media, bulk-sms) were
  // created with auto-generated IDs. Newer ones (branding, paid-ads,
  // ai-llmo-geo, videography) use our `service-{slug}` pattern. We can
  // be agnostic by querying for the real _id keyed on slug.current.
  const slugs = services.map((s) => s.slug)
  const docs: Array<{_id: string; slug: {current: string}}> = await client.fetch(
    `*[_type == "service" && slug.current in $slugs]{ _id, slug }`,
    {slugs},
  )

  const idBySlug = new Map<string, string>()
  for (const d of docs) {
    if (d?.slug?.current && d._id) idBySlug.set(d.slug.current, d._id)
  }

  // Report which services were found vs missing.
  const missing = services.filter((s) => !idBySlug.has(s.slug)).map((s) => s.slug)
  if (missing.length > 0) {
    console.warn(`  ! Could not find services for slugs: ${missing.join(', ')}`)
    console.warn('    Run seed-missing-services.ts and seed-videography-service.ts first if needed.')
  }

  const tx = client.transaction()

  // 1) Patch each existing service with the new selling-focused content
  for (const svc of services) {
    const realId = idBySlug.get(svc.slug)
    if (!realId) continue // skip missing — warned above
    console.log(`  • Patching service: ${svc.slug} (id: ${realId})`)
    tx.patch(realId, (p) =>
      p.set({
        description: svc.description,
        content: svc.content,
        whyItMatters: svc.whyItMatters,
        deliverables: svc.deliverables,
        ctaTitle: svc.ctaTitle,
        ctaText: svc.ctaText,
        finalCtaButtonText: svc.finalCtaButtonText,
      }),
    )
  }

  // 2) Create the FAQ docs, referenced to the matching service
  for (const svc of services) {
    const realId = idBySlug.get(svc.slug)
    if (!realId) continue
    for (const [i, faq] of svc.faqs.entries()) {
      const faqId = `faq-${svc.slug}-${i + 1}`
      console.log(`  • FAQ: ${faqId}`)
      tx.createOrReplace({
        _id: faqId,
        _type: 'faq',
        question: faq.question,
        answer: faq.answer,
        category: svc.category,
        relatedService: {_type: 'reference', _ref: realId},
        showOnFaqPage: true,
        order: i + 1,
      } as any)
    }
  }

  console.log('Committing…')
  const res = await tx.commit()
  console.log(`Done. ${res.results.length} operations applied ✓`)
  console.log('\nReload any /services/[slug] page to see the new content.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
