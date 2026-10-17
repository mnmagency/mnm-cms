/**
 * Reposition the site from "AI-driven growth" (too futuristic for the
 * Qatar market) to "Marketing Agency in Qatar" (services-led, keyword
 * optimised for local search).
 *
 * Rewrites:
 *   • Homepage hero + system + CTAs + final CTA
 *   • About page positioning
 *   • Services index intro + CTA
 *   • Navigation header CTA text
 *   • Footer description
 *   • Strategy form title + subtitle + submit
 *
 * SEO overhaul for every page (metaTitle, metaDescription, focusKeyword,
 * canonicalUrl):
 *   • /                          "Marketing agency in Qatar"
 *   • /about                     "Marketing agencies in Qatar"
 *   • /services                  "Marketing services in Qatar"
 *   • /services/seo              "SEO agency in Qatar"
 *   • /services/web-development  "Web development in Qatar" + "Web design in Qatar"
 *   • /services/social-media     "Social media marketing Qatar"
 *   • /services/branding         "Branding agency Qatar"
 *   • /services/paid-ads         "Paid ads agency Qatar"
 *   • /services/bulk-sms         "Bulk SMS Qatar"
 *   • /services/videography      "Video production Qatar"
 *   • /services/ai-llmo-geo      "AI SEO Qatar"
 *   • /contact                   "Marketing agency Doha"
 *   • /get-strategy              "Free marketing consultation Qatar"
 *
 * Idempotent — every operation uses .set() or .patch().set() so re-running
 * safely overwrites the same fields without duplicating docs.
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-qatar-marketing-repositioning.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

// ─────────────────────────────────────────────────────────────────────
//  HOMEPAGE — hero, system, services headers, final CTA, SEO
// ─────────────────────────────────────────────────────────────────────
const homepagePatch = {
  // Hero
  heroEyebrow: L(
    'Marketing Agency in Qatar',
    'وكالة تسويق في قطر',
  ),
  title: L(
    'Marketing Agency in Qatar That Actually Drives Results',
    'وكالة التسويق في قطر التي تحقق نتائج فعلية',
  ),
  subtitle: L(
    "M&M Marketing is one of the best marketing agencies in Qatar — specialising in SEO, Web Development, Social Media Management, Branding, Paid Ads, and Videography for brands ready to grow in Doha and across Qatar.",
    'M&M Marketing هي واحدة من أفضل وكالات التسويق في قطر — متخصصة في SEO وتطوير المواقع وإدارة السوشيال ميديا والعلامة التجارية والإعلانات المدفوعة والفيديو للعلامات المستعدة للنمو في الدوحة وجميع أنحاء قطر.',
  ),
  buttonText: L('Get Free Consultation', 'احصل على استشارة مجانية'),
  secondaryButtonText: L('View Case Studies', 'شاهد دراسات الحالة'),
  heroImageAlt: L(
    'M&M Marketing agency Qatar office in Doha',
    'مكتب وكالة M&M Marketing في الدوحة، قطر',
  ),

  // Growth System section
  systemEyebrow: L('How we work', 'كيف نعمل'),
  systemTitle: L(
    "We don't run random campaigns. We build marketing systems that grow revenue in Qatar.",
    'لا نقوم بحملات عشوائية. نبني أنظمة تسويق تنمي الإيرادات في قطر.',
  ),

  // Services section
  servicesEyebrow: L('Our Marketing Services in Qatar', 'خدمات التسويق لدينا في قطر'),
  servicesTitle: L(
    'Complete Marketing Services for Qatar Businesses',
    'خدمات تسويق كاملة للشركات القطرية',
  ),

  // Case Studies section
  caseStudiesEyebrow: L('Featured Work', 'أعمال مميزة'),
  caseStudiesTitle: L(
    'Real Qatar Businesses. Real Measurable Growth.',
    'أعمال قطرية حقيقية. نمو قابل للقياس.',
  ),

  // About Journey
  aboutEyebrow: L('About M&M Marketing', 'عن M&M Marketing'),
  aboutTitle: L(
    'Your Trusted Marketing Agency in Doha',
    'وكالتك التسويقية الموثوقة في الدوحة',
  ),
  aboutText: L(
    "M&M Marketing has been helping Qatar businesses grow for years. We're a full-service marketing agency in Doha offering everything from SEO and web development to social media management, branding, and paid advertising — all under one roof, with a team that speaks your language and knows your market.",
    'M&M Marketing تساعد الشركات القطرية على النمو منذ سنوات. نحن وكالة تسويق شاملة الخدمات في الدوحة تقدم كل شيء من SEO وتطوير المواقع إلى إدارة السوشيال ميديا والعلامة التجارية والإعلانات المدفوعة — كل ذلك تحت سقف واحد، بفريق يتحدث لغتك ويعرف سوقك.',
  ),
  aboutButtonText: L('Learn About Us', 'تعرف علينا'),

  // Blog section
  blogPill: L('Insights & Guides', 'رؤى وأدلة'),
  blogTitle: L(
    'Marketing Insights for Qatar Businesses',
    'رؤى تسويقية للشركات القطرية',
  ),
  blogDescription: L(
    "Guides, tactics, and case studies from Qatar's best marketing agency.",
    'أدلة، تكتيكات، ودراسات حالة من أفضل وكالة تسويق في قطر.',
  ),

  // Final CTA
  finalCtaTitle: L(
    'Ready to Grow Your Business in Qatar?',
    'جاهز لتنمية عملك في قطر؟',
  ),
  finalCtaText: L(
    "Let's talk. Free consultation, no commitment. Tell us about your business and we'll come back within 24 hours with a marketing plan built for the Qatar market.",
    'لنتحدث. استشارة مجانية، بدون التزام. أخبرنا عن عملك وسنعود إليك خلال 24 ساعة بخطة تسويق مبنية للسوق القطري.',
  ),
  finalCtaButtonText: L('Get Free Consultation', 'احصل على استشارة مجانية'),

  // Clients banner
  clientsBannerTitle: L(
    'Trusted by leading brands across Qatar',
    'موثوق به من قبل العلامات التجارية الرائدة في قطر',
  ),

  // Proof strip
  proofEyebrow: L('By the numbers', 'بالأرقام'),

  // SEO
  seo: {
    _type: 'seo',
    metaTitle: L(
      'Marketing Agency in Qatar | SEO, Web Development & Social Media | M&M',
      'وكالة تسويق في قطر | SEO وتطوير مواقع وسوشيال ميديا | M&M',
    ),
    metaDescription: L(
      'M&M Marketing is a leading marketing agency in Qatar. SEO, web development, social media management, branding, and paid ads for brands in Doha and across Qatar. Free consultation.',
      'M&M Marketing هي وكالة تسويق رائدة في قطر. SEO وتطوير مواقع وإدارة سوشيال ميديا وعلامة تجارية وإعلانات مدفوعة للعلامات في الدوحة وجميع أنحاء قطر. استشارة مجانية.',
    ),
    focusKeyword: L('marketing agency in qatar', 'وكالة تسويق في قطر'),
    canonicalUrl: 'https://mnmagency.com',
  },
}

// ─────────────────────────────────────────────────────────────────────
//  ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────
const aboutPagePatch = {
  eyebrow: L('About', 'حول'),
  title: L(
    "We're One of Qatar's Most Trusted Marketing Agencies",
    'نحن واحدة من أكثر وكالات التسويق موثوقية في قطر',
  ),
  subtitle: L(
    'M&M Marketing is a full-service marketing agency in Doha, Qatar. We help ambitious brands grow through smart strategy and flawless execution across SEO, web development, social media, branding, paid ads, and video.',
    'M&M Marketing هي وكالة تسويق شاملة الخدمات في الدوحة، قطر. نساعد العلامات التجارية الطموحة على النمو من خلال استراتيجية ذكية وتنفيذ لا تشوبه شائبة عبر SEO وتطوير المواقع والسوشيال ميديا والعلامة التجارية والإعلانات المدفوعة والفيديو.',
  ),

  positioningTitle: L(
    "We don't just market. We build growth systems for Qatar brands.",
    'لا نسوق فقط. نبني أنظمة نمو للعلامات القطرية.',
  ),
  positioning: L(
    "For years, M&M Marketing has partnered with Qatar's most ambitious brands — from automotive and real estate to hospitality, education, and retail — to build marketing systems that consistently generate revenue. Our approach combines local market knowledge, bilingual execution, and best-in-class expertise across every marketing discipline your business needs.",
    'لسنوات، عملت M&M Marketing كشريكة مع أكثر العلامات التجارية طموحاً في قطر — من السيارات والعقارات إلى الضيافة والتعليم والتجزئة — لبناء أنظمة تسويق تولد إيرادات باستمرار. يجمع نهجنا بين المعرفة المحلية بالسوق والتنفيذ ثنائي اللغة والخبرة من الدرجة الأولى عبر كل تخصص تسويقي يحتاجه عملك.',
  ),

  missionEyebrow: L('Our Mission', 'مهمتنا'),
  missionTitle: L(
    'To be the marketing partner Qatar businesses deserve.',
    'أن نكون شريك التسويق الذي تستحقه الشركات القطرية.',
  ),
  missionText: L(
    'Every Qatar business deserves a marketing partner that understands the local market, delivers measurable results, and treats their growth like our own. That\'s what we do — and that\'s why our clients stay with us for years.',
    'تستحق كل شركة قطرية شريك تسويق يفهم السوق المحلي ويحقق نتائج قابلة للقياس ويعامل نموها كنمونا. هذا ما نفعله — وهذا سبب بقاء عملائنا معنا لسنوات.',
  ),

  methodologyEyebrow: L('How We Work', 'كيف نعمل'),
  methodologyTitle: L(
    'Local expertise. Global standards. Measurable results.',
    'خبرة محلية. معايير عالمية. نتائج قابلة للقياس.',
  ),
  methodologyText: L(
    'We combine deep understanding of the Qatar market with world-class marketing methodology. Every engagement starts with strategy, executes with discipline, and gets measured against business outcomes — not vanity metrics.',
    'نجمع بين الفهم العميق للسوق القطري ومنهجية التسويق ذات المستوى العالمي. تبدأ كل مشاركة بالاستراتيجية، وتنفذ بانضباط، وتقاس مقابل نتائج الأعمال — وليس المقاييس الشكلية.',
  ),

  principlesEyebrow: L('Our Principles', 'مبادئنا'),
  principlesTitle: L(
    'How we think. How we execute.',
    'كيف نفكر. كيف ننفذ.',
  ),

  ctaTitle: L(
    'Ready to work with the best marketing agency in Qatar?',
    'جاهز للعمل مع أفضل وكالة تسويق في قطر؟',
  ),
  ctaText: L(
    "Let's talk. Free consultation, no commitment. Tell us about your business and we'll show you exactly how we can help.",
    'لنتحدث. استشارة مجانية، بدون التزام. أخبرنا عن عملك وسنريك بالضبط كيف يمكننا المساعدة.',
  ),
  ctaButtonText: L('Get Free Consultation', 'احصل على استشارة مجانية'),

  seo: {
    _type: 'seo',
    metaTitle: L(
      'About M&M Marketing | Best Marketing Agency in Qatar | Doha',
      'عن M&M Marketing | أفضل وكالة تسويق في قطر | الدوحة',
    ),
    metaDescription: L(
      'M&M Marketing is one of the best marketing agencies in Qatar. Full-service marketing agency in Doha delivering SEO, web development, social media, and branding for Qatar businesses.',
      'M&M Marketing هي واحدة من أفضل وكالات التسويق في قطر. وكالة تسويق شاملة الخدمات في الدوحة تقدم SEO وتطوير مواقع وسوشيال ميديا وعلامة تجارية للشركات القطرية.',
    ),
    focusKeyword: L('best marketing agency qatar', 'أفضل وكالة تسويق قطر'),
    canonicalUrl: 'https://mnmagency.com/about',
  },
}

// ─────────────────────────────────────────────────────────────────────
//  SERVICES INDEX
// ─────────────────────────────────────────────────────────────────────
const servicesPagePatch = {
  eyebrow: L('Marketing Services in Qatar', 'خدمات التسويق في قطر'),
  title: L(
    'Complete Marketing Services for Qatar Businesses',
    'خدمات تسويق كاملة للشركات القطرية',
  ),
  subtitle: L(
    'From SEO and web development to social media, branding, paid ads, videography, and bulk SMS — everything a growing Qatar business needs, under one roof.',
    'من SEO وتطوير المواقع إلى السوشيال ميديا والعلامة التجارية والإعلانات المدفوعة والفيديو والرسائل النصية الجماعية — كل ما تحتاجه شركة قطرية نامية، تحت سقف واحد.',
  ),
  intro: L(
    "M&M Marketing is a full-service marketing agency in Qatar. We don't run isolated campaigns — we build connected marketing systems where every service compounds the impact of the others. Pick a single service, or combine several into a complete growth plan tailored to your Qatar market, audience, and business objectives.",
    'M&M Marketing هي وكالة تسويق شاملة الخدمات في قطر. نحن لا نقوم بحملات معزولة — نبني أنظمة تسويق مترابطة حيث تعزز كل خدمة تأثير الأخرى. اختر خدمة واحدة، أو ادمج عدة خدمات في خطة نمو كاملة مصممة لسوقك القطري وجمهورك وأهدافك التجارية.',
  ),
  ctaTitle: L(
    'Not sure which service you need?',
    'غير متأكد من الخدمة التي تحتاجها؟',
  ),
  ctaText: L(
    "Book a free consultation. We'll audit your business, understand your goals, and recommend the exact combination of marketing services that will grow revenue fastest.",
    'احجز استشارة مجانية. سنقوم بتدقيق عملك وفهم أهدافك والتوصية بالمزيج الدقيق من خدمات التسويق الذي سينمي الإيرادات بأسرع ما يمكن.',
  ),
  ctaButtonText: L('Get Free Consultation', 'احصل على استشارة مجانية'),
  ctaButtonLink: '/get-strategy',
  seo: {
    _type: 'seo',
    metaTitle: L(
      'Marketing Services in Qatar | SEO, Web, Social, Branding | M&M',
      'خدمات تسويق في قطر | SEO وويب وسوشيال وعلامة تجارية | M&M',
    ),
    metaDescription: L(
      'Complete marketing services in Qatar — SEO, web development, web design, social media, branding, paid ads, videography, and bulk SMS. Full-service marketing agency in Doha.',
      'خدمات تسويق كاملة في قطر — SEO وتطوير مواقع وتصميم مواقع وسوشيال ميديا وعلامة تجارية وإعلانات مدفوعة وفيديو ورسائل نصية. وكالة تسويق شاملة الخدمات في الدوحة.',
    ),
    focusKeyword: L('marketing services in qatar', 'خدمات تسويق في قطر'),
    canonicalUrl: 'https://mnmagency.com/services',
  },
}

// ─────────────────────────────────────────────────────────────────────
//  CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────
const contactPagePatch = {
  seo: {
    _type: 'seo',
    metaTitle: L(
      'Contact M&M Marketing | Marketing Agency in Doha, Qatar',
      'اتصل بـ M&M Marketing | وكالة تسويق في الدوحة، قطر',
    ),
    metaDescription: L(
      "Contact M&M Marketing, one of Qatar's leading marketing agencies. Free consultation. Call, email or visit our office in Doha. We reply within 24 hours.",
      'اتصل بـ M&M Marketing، إحدى وكالات التسويق الرائدة في قطر. استشارة مجانية. اتصل أو راسلنا أو زر مكتبنا في الدوحة. نرد خلال 24 ساعة.',
    ),
    focusKeyword: L('marketing agency doha contact', 'اتصال وكالة تسويق الدوحة'),
    canonicalUrl: 'https://mnmagency.com/contact',
  },
}

// ─────────────────────────────────────────────────────────────────────
//  GET STRATEGY PAGE (uses strategyForm singleton for content)
// ─────────────────────────────────────────────────────────────────────
const strategyFormPatch = {
  eyebrow: L('Free Marketing Consultation', 'استشارة تسويق مجانية'),
  title: L(
    'Get Your Free Marketing Consultation',
    'احصل على استشارة تسويق مجانية',
  ),
  subtitle: L(
    "Tell us about your business and we'll come back within 24 hours with a marketing plan built specifically for the Qatar market.",
    'أخبرنا عن عملك وسنعود إليك خلال 24 ساعة بخطة تسويق مبنية خصيصاً للسوق القطري.',
  ),
  submitText: L('Get Free Consultation', 'احصل على استشارة مجانية'),
  seo: {
    _type: 'seo',
    metaTitle: L(
      'Free Marketing Consultation in Qatar | M&M Marketing',
      'استشارة تسويق مجانية في قطر | M&M Marketing',
    ),
    metaDescription: L(
      "Book a free marketing consultation with Qatar's leading marketing agency. Tell us about your business and get a tailored marketing plan within 24 hours.",
      'احجز استشارة تسويق مجانية مع وكالة التسويق الرائدة في قطر. أخبرنا عن عملك واحصل على خطة تسويق مخصصة خلال 24 ساعة.',
    ),
    focusKeyword: L('free marketing consultation qatar', 'استشارة تسويق مجانية قطر'),
    canonicalUrl: 'https://mnmagency.com/get-strategy',
  },
}

// ─────────────────────────────────────────────────────────────────────
//  NAVIGATION SINGLETON — header CTA + footer description
// ─────────────────────────────────────────────────────────────────────
const navigationPatch = {
  ctaText: L('Free Consultation', 'استشارة مجانية'),
  ctaLink: '/get-strategy',
  footerDescription: L(
    'Full-service marketing agency in Qatar. SEO, web development, social media management, branding, paid ads, and videography for brands ready to grow in Doha.',
    'وكالة تسويق شاملة الخدمات في قطر. SEO وتطوير مواقع وإدارة سوشيال ميديا وعلامة تجارية وإعلانات مدفوعة وفيديو للعلامات المستعدة للنمو في الدوحة.',
  ),
}

// ─────────────────────────────────────────────────────────────────────
//  SERVICES — SEO metadata per service page
// ─────────────────────────────────────────────────────────────────────
const serviceSeoBySlug: Record<
  string,
  {
    seoMetaTitle: Loc
    seoMetaDescription: Loc
    seoFocusKeyword: Loc
    canonicalUrl: string
    heroCtaButtonText?: Loc
    finalCtaButtonText?: Loc
  }
> = {
  seo: {
    seoMetaTitle: L(
      'SEO Agency in Qatar | Rank #1 on Google | M&M Marketing',
      'وكالة SEO في قطر | تصدر Google | M&M Marketing',
    ),
    seoMetaDescription: L(
      "Qatar's leading SEO agency. Rank #1 on Google for keywords that matter — including AI search (ChatGPT, Gemini). Free SEO audit. No long contracts. Doha-based team.",
      'وكالة SEO الرائدة في قطر. تصدر Google للكلمات المهمة — بما في ذلك بحث الذكاء الاصطناعي (ChatGPT و Gemini). تدقيق SEO مجاني. بدون عقود طويلة. فريق في الدوحة.',
    ),
    seoFocusKeyword: L('seo agency in qatar', 'وكالة SEO في قطر'),
    canonicalUrl: 'https://mnmagency.com/services/seo',
    heroCtaButtonText: L('Get Free SEO Audit', 'احصل على تدقيق SEO مجاني'),
    finalCtaButtonText: L('Get My Free SEO Audit', 'احصل على تدقيق SEO مجاني'),
  },
  'web-development': {
    seoMetaTitle: L(
      'Web Development in Qatar | Web Design Doha | M&M Marketing',
      'تطوير المواقع في قطر | تصميم مواقع الدوحة | M&M Marketing',
    ),
    seoMetaDescription: L(
      "Web development and web design in Qatar. High-converting bilingual (English + Arabic) websites for Qatar businesses. Fast, SEO-ready, mobile-first. Doha's trusted web agency.",
      'تطوير مواقع وتصميم مواقع في قطر. مواقع ثنائية اللغة (إنجليزي + عربي) عالية التحويل للشركات القطرية. سريعة، جاهزة لـ SEO، تعتمد على الجوال. وكالة المواقع الموثوقة في الدوحة.',
    ),
    seoFocusKeyword: L('web development in qatar', 'تطوير المواقع في قطر'),
    canonicalUrl: 'https://mnmagency.com/services/web-development',
    heroCtaButtonText: L('Plan My Website', 'خطط لموقعي'),
    finalCtaButtonText: L('Plan My Website', 'خطط لموقعي'),
  },
  'social-media': {
    seoMetaTitle: L(
      'Social Media Marketing Qatar | Instagram & TikTok Management',
      'تسويق سوشيال ميديا في قطر | إدارة Instagram و TikTok',
    ),
    seoMetaDescription: L(
      "Social media marketing agency in Qatar. Instagram, TikTok, Facebook, LinkedIn, and Snapchat management for Qatar brands. In-house content, bilingual EN/AR, real growth.",
      'وكالة تسويق سوشيال ميديا في قطر. إدارة Instagram و TikTok و Facebook و LinkedIn و Snapchat للعلامات القطرية. محتوى داخلي، ثنائي اللغة، نمو حقيقي.',
    ),
    seoFocusKeyword: L('social media marketing qatar', 'تسويق سوشيال ميديا قطر'),
    canonicalUrl: 'https://mnmagency.com/services/social-media',
    heroCtaButtonText: L('Audit My Social Media', 'دقق سوشيال ميديا الخاصة بي'),
    finalCtaButtonText: L('Audit My Social Media', 'دقق سوشيال ميديا الخاصة بي'),
  },
  branding: {
    seoMetaTitle: L(
      'Branding Agency in Qatar | Brand Identity Design Doha',
      'وكالة علامة تجارية في قطر | تصميم هوية العلامة في الدوحة',
    ),
    seoMetaDescription: L(
      'Branding agency in Qatar. Strategic brand identity, naming, logo design, and complete brand systems for ambitious Qatar businesses ready to stand out.',
      'وكالة علامة تجارية في قطر. هوية علامة تجارية استراتيجية وتسمية وتصميم شعار وأنظمة علامة تجارية كاملة للشركات القطرية الطموحة المستعدة للتميز.',
    ),
    seoFocusKeyword: L('branding agency qatar', 'وكالة علامة تجارية قطر'),
    canonicalUrl: 'https://mnmagency.com/services/branding',
    heroCtaButtonText: L('Start My Brand', 'ابدأ علامتي التجارية'),
    finalCtaButtonText: L('Start My Brand Strategy', 'ابدأ استراتيجية علامتي التجارية'),
  },
  'paid-ads': {
    seoMetaTitle: L(
      'Paid Ads Agency in Qatar | Google, Meta, TikTok Ads | M&M',
      'وكالة إعلانات مدفوعة في قطر | Google و Meta و TikTok | M&M',
    ),
    seoMetaDescription: L(
      "Paid advertising agency in Qatar. Google Ads, Meta Ads, TikTok Ads, and LinkedIn Ads managed by Doha's performance marketing team. Real ROAS. Weekly optimization.",
      'وكالة إعلانات مدفوعة في قطر. إعلانات Google و Meta و TikTok و LinkedIn تديرها فريق تسويق الأداء في الدوحة. ROAS حقيقي. تحسين أسبوعي.',
    ),
    seoFocusKeyword: L('paid ads agency qatar', 'وكالة إعلانات مدفوعة قطر'),
    canonicalUrl: 'https://mnmagency.com/services/paid-ads',
    heroCtaButtonText: L('Get My Media Plan', 'احصل على خطة الإعلام'),
    finalCtaButtonText: L('Get My Paid Media Plan', 'احصل على خطة الإعلانات المدفوعة'),
  },
  'bulk-sms': {
    seoMetaTitle: L(
      'Bulk SMS in Qatar | SMS Marketing Campaigns Doha | M&M',
      'رسائل نصية جماعية في قطر | حملات SMS في الدوحة | M&M',
    ),
    seoMetaDescription: L(
      'Bulk SMS marketing in Qatar. Sender-ID branded, CRA-compliant, bilingual campaigns delivered in seconds. 98% open rate. Trusted by Doha businesses.',
      'تسويق الرسائل النصية الجماعية في قطر. حملات ذات معرف مرسل، متوافقة مع CRA، ثنائية اللغة، يتم تسليمها في ثوانٍ. معدل فتح 98%. موثوقة من قبل شركات الدوحة.',
    ),
    seoFocusKeyword: L('bulk sms qatar', 'رسائل نصية جماعية قطر'),
    canonicalUrl: 'https://mnmagency.com/services/bulk-sms',
    heroCtaButtonText: L('Plan My SMS Campaign', 'خطط لحملة SMS الخاصة بي'),
    finalCtaButtonText: L('Plan My SMS Campaign', 'خطط لحملة SMS الخاصة بي'),
  },
  videography: {
    seoMetaTitle: L(
      'Videography in Qatar | Video Production Doha | M&M Marketing',
      'إنتاج فيديو في قطر | إنتاج الفيديو في الدوحة | M&M Marketing',
    ),
    seoMetaDescription: L(
      "Cinematic video production in Qatar. Brand films, product campaigns, event coverage, and social video shot by Doha's in-house production team. Full end-to-end.",
      'إنتاج فيديو سينمائي في قطر. أفلام علامات تجارية وحملات منتجات وتغطية فعاليات وفيديو سوشيال يصورها فريق الإنتاج الداخلي في الدوحة. من البداية إلى النهاية.',
    ),
    seoFocusKeyword: L('videography qatar', 'إنتاج فيديو قطر'),
    canonicalUrl: 'https://mnmagency.com/services/videography',
    heroCtaButtonText: L('Plan My Video', 'خطط لفيديو المشروع'),
    finalCtaButtonText: L('Plan My Video Project', 'خطط لمشروع الفيديو الخاص بي'),
  },
  'ai-llmo-geo': {
    seoMetaTitle: L(
      'AI SEO in Qatar | LLMO & GEO Optimization | M&M Marketing',
      'AI SEO في قطر | تحسين LLMO و GEO | M&M Marketing',
    ),
    seoMetaDescription: L(
      "Get your brand cited in ChatGPT, Gemini, Perplexity, and Google AI Overviews. Qatar's first LLMO/GEO agency. Free AI visibility audit.",
      'احصل على ذكر علامتك التجارية في ChatGPT و Gemini و Perplexity ونظرة Google الإجمالية. أول وكالة LLMO/GEO في قطر. تدقيق مجاني للظهور في الذكاء الاصطناعي.',
    ),
    seoFocusKeyword: L('ai seo qatar llmo geo', 'AI SEO قطر LLMO GEO'),
    canonicalUrl: 'https://mnmagency.com/services/ai-llmo-geo',
    heroCtaButtonText: L('Audit My AI Visibility', 'دقق ظهوري في الذكاء الاصطناعي'),
    finalCtaButtonText: L('Audit My AI Visibility', 'دقق ظهوري في الذكاء الاصطناعي'),
  },
}

// ─────────────────────────────────────────────────────────────────────
//  SITE SETTINGS — analytics, pixels, verification tokens
//  Pre-populated with the existing GTM container so nothing breaks
//  during the migration to Sanity-driven tracking. All other fields
//  left empty — paste the IDs into Studio when you're ready.
// ─────────────────────────────────────────────────────────────────────
const siteSettingsDoc = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  // Keep the existing production GTM so pageviews keep flowing.
  gtmContainerId: 'GTM-5DFBSS7Q',
  // Every other field is left blank; paste in Sanity Studio when ready.
}

// ─────────────────────────────────────────────────────────────────────
//  Run
// ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Repositioning site + SEO overhaul + tracking scaffold…')

  // Look up every singleton by _type first — some docs use their type name
  // as their _id, others have auto-generated ids. Fetching by _type handles
  // both cases without erroring.
  const singletonTypes = [
    'homepage',
    'aboutPage',
    'servicesPage',
    'contactPage',
    'strategyForm',
    'navigation',
  ]
  const docs: Array<{_id: string; _type: string}> = await client.fetch(
    `*[_type in $types]{ _id, _type }`,
    {types: singletonTypes},
  )
  const idsByType = new Map<string, string[]>()
  for (const d of docs) {
    if (!idsByType.has(d._type)) idsByType.set(d._type, [])
    idsByType.get(d._type)!.push(d._id)
  }

  const tx = client.transaction()

  const patchType = (type: string, data: Record<string, unknown>, label: string) => {
    const ids = idsByType.get(type) || []
    if (ids.length === 0) {
      console.warn(`  ! No ${type} doc — skipping ${label}`)
      return
    }
    for (const id of ids) {
      console.log(`  • ${label} (id: ${id})`)
      tx.patch(id, (p) => p.set(data as any))
    }
  }

  // 0) Site settings singleton (createIfNotExists so we don't clobber IDs
  //    the editor has already pasted).
  console.log('  • Site settings (analytics + pixels)')
  tx.createIfNotExists(siteSettingsDoc as any)

  patchType('homepage',      homepagePatch,      'Homepage')
  patchType('aboutPage',     aboutPagePatch,     'About page')
  patchType('servicesPage',  servicesPagePatch,  'Services index')
  patchType('contactPage',   contactPagePatch,   'Contact page SEO')
  patchType('strategyForm',  strategyFormPatch,  'Strategy form')
  patchType('navigation',    navigationPatch,    'Navigation')

  // 7) Per-service SEO metadata + CTA button text overrides
  console.log('  • Service SEO metadata')
  const serviceSlugs = Object.keys(serviceSeoBySlug)
  const serviceDocs: Array<{_id: string; slug: {current: string}}> = await client.fetch(
    `*[_type == "service" && slug.current in $slugs]{ _id, slug }`,
    {slugs: serviceSlugs},
  )
  const idBySlug = new Map(serviceDocs.map((d) => [d.slug.current, d._id]))

  for (const [slug, cfg] of Object.entries(serviceSeoBySlug)) {
    const id = idBySlug.get(slug)
    if (!id) {
      console.warn(`    ! Service not found in Sanity: ${slug} — skipping.`)
      continue
    }
    console.log(`    - ${slug}`)
    tx.patch(id, (p) =>
      p.set({
        seo: {
          _type: 'seo',
          metaTitle: cfg.seoMetaTitle,
          metaDescription: cfg.seoMetaDescription,
          focusKeyword: cfg.seoFocusKeyword,
          canonicalUrl: cfg.canonicalUrl,
        },
        ...(cfg.heroCtaButtonText ? {heroCtaButtonText: cfg.heroCtaButtonText} : {}),
        ...(cfg.finalCtaButtonText ? {finalCtaButtonText: cfg.finalCtaButtonText} : {}),
      }),
    )
  }

  console.log('\nCommitting…')
  const res = await tx.commit()
  console.log(`Done. ${res.results.length} operations applied ✓`)
  console.log('\nReload any page to see the repositioned copy.')
  console.log('Google will pick up the new titles + descriptions within days-weeks.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
