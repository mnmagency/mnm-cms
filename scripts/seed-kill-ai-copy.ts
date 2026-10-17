/**
 * KILL SWITCH — purge every "AI Growth" reference from Sanity and force
 * all CTA buttons to market-safe Qatar language.
 *
 * The Qatari market responds to "Get Your Quote" and "Free Consultation"
 * — action-oriented, low-risk, familiar phrasing. It does NOT respond
 * to "AI Growth Strategy" — too abstract, too futuristic, not what buyers
 * are searching for.
 *
 * This seed does 3 things:
 *
 *   1. Overwrites CTA button text on EVERY doc that has one, replacing
 *      any "Get Your AI Growth Strategy" with "Get Your Quote" (EN) /
 *      "احصل على عرض السعر" (AR).
 *
 *   2. Renames the /services/ai-llmo-geo service so it's a technical
 *      offering ("AI Search Visibility") rather than a growth positioning.
 *      Same underlying service, less scary framing for the market.
 *
 *   3. Overwrites the navigation header CTA and homepage buttons.
 *
 * Safe to run repeatedly.
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-kill-ai-copy.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

// ─────────────────────────────────────────────────────────────────────
//  CTA text — the ONE phrase every button will now use
// ─────────────────────────────────────────────────────────────────────
const primaryCta = L('Get Your Quote', 'احصل على عرض السعر')
const freeConsultCta = L('Get Free Consultation', 'احصل على استشارة مجانية')
const primaryHeaderCta = L('Free Quote', 'عرض سعر مجاني')

// ─────────────────────────────────────────────────────────────────────
//  Docs to patch — each one gets its CTA fields overwritten.
// ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Killing every "AI Growth" CTA…')

  // Some singletons in Sanity live under their type name (e.g. "homepage")
  // and some under auto-generated ids. Look each one up by _type so we
  // patch the real doc regardless of naming pattern.
  console.log('Resolving singleton IDs by _type…')
  const singletonTypes = [
    'homepage',
    'aboutPage',
    'servicesPage',
    'contactPage',
    'strategyForm',
    'navigation',
    'blogPage',
    'faqsPage',
    'caseStudiesPage',
    'seoAuditPage',
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
  for (const t of singletonTypes) {
    const found = idsByType.get(t) || []
    console.log(`  • ${t}: ${found.length ? found.join(', ') : '(none found)'}`)
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

  // ─── SEO metadata that's Qatar-market-safe. This is what shows in the
  //     browser tab, Google, and social share cards. Overwriting these
  //     kills every leftover "AI-Driven Growth" phrase across all surfaces.
  const homepageSeo = {
    _type: 'seo',
    metaTitle: L(
      'Marketing Agency in Qatar | SEO, Web Development & Social Media | M&M',
      'وكالة تسويق في قطر | SEO وتطوير مواقع وسوشيال ميديا | M&M',
    ),
    metaDescription: L(
      'M&M Marketing is a leading marketing agency in Qatar. SEO, web development, social media management, branding, and paid ads for brands in Doha and across Qatar. Free consultation.',
      'M&M Marketing وكالة تسويق رائدة في قطر. SEO وتطوير مواقع وإدارة سوشيال ميديا وعلامة تجارية وإعلانات مدفوعة للعلامات في الدوحة وجميع أنحاء قطر. استشارة مجانية.',
    ),
    focusKeyword: L('marketing agency in qatar', 'وكالة تسويق في قطر'),
    canonicalUrl: 'https://mnmagency.com',
  }

  const aboutSeo = {
    _type: 'seo',
    metaTitle: L(
      'About M&M Marketing | Best Marketing Agency in Qatar | Doha',
      'عن M&M Marketing | أفضل وكالة تسويق في قطر | الدوحة',
    ),
    metaDescription: L(
      'M&M Marketing is one of the best marketing agencies in Qatar. Full-service marketing agency in Doha delivering SEO, web development, social media, and branding for Qatar businesses.',
      'M&M Marketing واحدة من أفضل وكالات التسويق في قطر. وكالة تسويق شاملة الخدمات في الدوحة تقدم SEO وتطوير مواقع وسوشيال ميديا وعلامة تجارية للشركات القطرية.',
    ),
    focusKeyword: L('best marketing agency qatar', 'أفضل وكالة تسويق قطر'),
    canonicalUrl: 'https://mnmagency.com/about',
  }

  const servicesSeo = {
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
  }

  const contactSeo = {
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
  }

  const blogSeo = {
    _type: 'seo',
    metaTitle: L(
      'Marketing Blog Qatar | SEO, Web, Social, Branding | M&M Marketing',
      'مدونة التسويق في قطر | SEO وويب وسوشيال وعلامة تجارية | M&M Marketing',
    ),
    metaDescription: L(
      "Marketing insights for Qatar businesses. Practical guides on SEO, web development, social media, branding, and paid ads from Doha's leading marketing agency.",
      'رؤى تسويقية للشركات القطرية. أدلة عملية عن SEO وتطوير المواقع والسوشيال ميديا والعلامة التجارية والإعلانات المدفوعة من وكالة التسويق الرائدة في الدوحة.',
    ),
    focusKeyword: L('marketing blog qatar', 'مدونة تسويق قطر'),
    canonicalUrl: 'https://mnmagency.com/blog',
  }

  const faqsSeo = {
    _type: 'seo',
    metaTitle: L(
      'Marketing FAQs Qatar | SEO, Web, Social Questions | M&M',
      'الأسئلة الشائعة عن التسويق في قطر | أسئلة SEO وويب وسوشيال | M&M',
    ),
    metaDescription: L(
      "Common questions about marketing in Qatar — SEO, web development, social media, branding costs, timelines, and results. Answered by Doha's leading marketing agency.",
      'أسئلة شائعة حول التسويق في قطر — SEO وتطوير المواقع والسوشيال ميديا وتكاليف العلامة التجارية والجداول الزمنية والنتائج. بإجابات من وكالة التسويق الرائدة في الدوحة.',
    ),
    focusKeyword: L('marketing faqs qatar', 'أسئلة التسويق في قطر'),
    canonicalUrl: 'https://mnmagency.com/faqs',
  }

  const caseStudiesSeo = {
    _type: 'seo',
    metaTitle: L(
      'Marketing Case Studies in Qatar | Real Results | M&M Marketing',
      'دراسات حالة تسويقية في قطر | نتائج حقيقية | M&M Marketing',
    ),
    metaDescription: L(
      "Marketing case studies from Qatar's leading agency. Real Doha brands, real revenue growth. See how M&M Marketing delivers measurable results.",
      'دراسات حالة تسويقية من الوكالة الرائدة في قطر. علامات دوحة حقيقية، نمو إيرادات حقيقي. شاهد كيف تقدم M&M Marketing نتائج قابلة للقياس.',
    ),
    focusKeyword: L('marketing case studies qatar', 'دراسات حالة تسويقية قطر'),
    canonicalUrl: 'https://mnmagency.com/case-studies',
  }

  const seoAuditSeo = {
    _type: 'seo',
    metaTitle: L(
      'Free SEO Audit for Qatar Websites | Instant Report | M&M',
      'تدقيق SEO مجاني للمواقع القطرية | تقرير فوري | M&M',
    ),
    metaDescription: L(
      "Free instant SEO audit for Qatar websites. Get a full report on technical SEO, performance, and Qatar-market opportunities in 60 seconds. From Doha's leading SEO agency.",
      'تدقيق SEO مجاني فوري للمواقع القطرية. احصل على تقرير كامل عن SEO الفني والأداء وفرص السوق القطري في 60 ثانية. من وكالة SEO الرائدة في الدوحة.',
    ),
    focusKeyword: L('free seo audit qatar', 'تدقيق SEO مجاني قطر'),
    canonicalUrl: 'https://mnmagency.com/seo-audit',
  }

  const strategyFormSeo = {
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
  }

  // 1) HOMEPAGE — hero eyebrow + title + subtitle + buttons + SEO meta.
  //    This is the source of "AI-Driven Growth Partner in Qatar" — both in
  //    the visible hero AND in the SEO meta title/description shown in
  //    browser tabs, Google, and social shares. Overwriting kills the
  //    phrase everywhere for good.
  patchType(
    'homepage',
    {
      heroEyebrow: L('Marketing Agency in Qatar', 'وكالة تسويق في قطر'),
      title: L(
        'Marketing Agency in Qatar That Actually Drives Results',
        'وكالة التسويق في قطر التي تحقق نتائج حقيقية',
      ),
      subtitle: L(
        "M&M Marketing is one of the best marketing agencies in Qatar — specialising in SEO, web development, social media management, branding, paid ads, and videography for brands ready to grow in Doha and across Qatar.",
        'M&M Marketing واحدة من أفضل وكالات التسويق في قطر — متخصصون في تحسين محركات البحث، وتطوير المواقع الإلكترونية، وإدارة وسائل التواصل الاجتماعي، والهوية التجارية، والإعلانات المدفوعة، وإنتاج الفيديو، لعلاماتٍ تجارية طموحة في الدوحة وجميع أنحاء قطر.',
      ),
      buttonText: primaryCta,
      secondaryButtonText: L('View Case Studies', 'اطّلع على دراسات الحالة'),
      aboutButtonText: L('About Us', 'من نحن'),
      finalCtaButtonText: primaryCta,
      finalCtaTitle: L(
        'Ready to Grow Your Business in Qatar?',
        'هل أنت جاهز لتنمية أعمالك في قطر؟',
      ),
      finalCtaText: L(
        "Free consultation, no commitment. Tell us about your business and we'll come back within 24 hours with a marketing plan built for the Qatar market.",
        'استشارة مجانية بلا أي التزام. أخبرنا عن مشروعك، ونعود إليك خلال 24 ساعة بخطة تسويقية مصمّمة للسوق القطري.',
      ),
      seo: homepageSeo,
    },
    'Homepage (content + SEO meta — kills every "AI-Driven Growth")',
  )

  // 2) ABOUT PAGE — CTA + SEO
  patchType('aboutPage', {ctaButtonText: primaryCta, seo: aboutSeo}, 'About page')

  // 3) SERVICES INDEX — CTA + SEO
  patchType('servicesPage', {ctaButtonText: primaryCta, seo: servicesSeo}, 'Services index')

  // 4) CONTACT PAGE — CTA + SEO
  patchType(
    'contactPage',
    {
      ctaButtonText: primaryCta,
      formSubmitText: L('Send Message', 'إرسال الرسالة'),
      seo: contactSeo,
    },
    'Contact page',
  )

  // 5) STRATEGY FORM — submit button + title + SEO
  patchType(
    'strategyForm',
    {
      submitText: primaryCta,
      title: L('Get Your Free Quote', 'احصل على عرض السعر مجاناً'),
      eyebrow: L('Free Quote — 24 Hours', 'عرض سعر مجاني — 24 ساعة'),
      seo: strategyFormSeo,
    },
    'Strategy form',
  )

  // 6) NAVIGATION — header button + SEO-optimised footer description.
  //    Front-loads "Marketing agency in Qatar" (top target keyword) then
  //    lists every service, then reinforces the Doha location for local
  //    search. Kills the old "AI-Driven Growth Partner" footer copy.
  patchType(
    'navigation',
    {
      ctaText: primaryHeaderCta,
      footerDescription: L(
        'Marketing agency in Qatar. SEO, web development, social media management, videography, branding, and paid ads for brands ready to grow in Doha and across Qatar.',
        'وكالة تسويق في قطر. SEO، تطوير المواقع، إدارة السوشيال ميديا، إنتاج الفيديو، الهوية التجارية، والإعلانات المدفوعة للعلامات التجارية المستعدة للنمو في الدوحة وجميع أنحاء قطر.',
      ),
    },
    'Navigation (header CTA + footer description)',
  )

  // 7) BLOG / FAQs / CASE STUDIES / SEO AUDIT — SEO meta only.
  //    These docs may or may not exist; patchType handles missing gracefully.
  patchType('blogPage',        {seo: blogSeo},        'Blog page SEO')
  patchType('faqsPage',        {seo: faqsSeo},        'FAQs page SEO')
  patchType('caseStudiesPage', {seo: caseStudiesSeo}, 'Case Studies page SEO')
  patchType('seoAuditPage',    {seo: seoAuditSeo},    'SEO Audit page SEO')

  // 7) EVERY SERVICE — hero CTA + final CTA + form title
  console.log('  • Every service page')
  const serviceDocs: Array<{_id: string; slug: {current: string}}> = await client.fetch(
    `*[_type == "service" && defined(slug.current)]{ _id, slug }`,
  )

  type ServiceOverride = {
    heroCtaButtonText?: Loc
    finalCtaButtonText?: Loc
    formTitle?: Loc
    seo?: {
      _type: 'seo'
      metaTitle: Loc
      metaDescription: Loc
      focusKeyword: Loc
      canonicalUrl: string
    }
  }

  const perServiceOverrides: Record<string, ServiceOverride> = {
    seo: {
      heroCtaButtonText: L('Get Free SEO Audit', 'احصل على تدقيق SEO مجاني'),
      finalCtaButtonText: L('Get Free SEO Audit', 'احصل على تدقيق SEO مجاني'),
      formTitle: L('Get Your Free SEO Audit', 'احصل على تدقيق SEO مجاني'),
      seo: {
        _type: 'seo',
        metaTitle: L(
          'SEO Agency in Qatar | Rank #1 on Google | M&M Marketing',
          'وكالة SEO في قطر | تصدر Google | M&M Marketing',
        ),
        metaDescription: L(
          "Qatar's leading SEO agency. Rank #1 on Google for keywords that matter — including AI search (ChatGPT, Gemini). Free SEO audit. No long contracts. Doha-based team.",
          'وكالة SEO الرائدة في قطر. تصدر Google للكلمات المهمة — بما في ذلك بحث الذكاء الاصطناعي (ChatGPT و Gemini). تدقيق SEO مجاني. بدون عقود طويلة. فريق في الدوحة.',
        ),
        focusKeyword: L('seo agency in qatar', 'وكالة SEO في قطر'),
        canonicalUrl: 'https://mnmagency.com/services/seo',
      },
    },
    'web-development': {
      heroCtaButtonText: L('Get Your Website Quote', 'احصل على عرض سعر الموقع'),
      finalCtaButtonText: L('Get Your Website Quote', 'احصل على عرض سعر الموقع'),
      formTitle: L('Get Your Website Quote', 'احصل على عرض سعر الموقع'),
      seo: {
        _type: 'seo',
        metaTitle: L(
          'Web Development in Qatar | Web Design Doha | M&M Marketing',
          'تطوير المواقع في قطر | تصميم مواقع الدوحة | M&M Marketing',
        ),
        metaDescription: L(
          "Web development and web design in Qatar. High-converting bilingual (English + Arabic) websites for Qatar businesses. Fast, SEO-ready, mobile-first. Doha's trusted web agency.",
          'تطوير مواقع وتصميم مواقع في قطر. مواقع ثنائية اللغة (إنجليزي + عربي) عالية التحويل للشركات القطرية. سريعة، جاهزة لـ SEO، تعتمد على الجوال. وكالة المواقع الموثوقة في الدوحة.',
        ),
        focusKeyword: L('web development in qatar', 'تطوير المواقع في قطر'),
        canonicalUrl: 'https://mnmagency.com/services/web-development',
      },
    },
    'social-media': {
      heroCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
      finalCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
      formTitle: L('Get Your Social Media Quote', 'احصل على عرض سعر السوشيال ميديا'),
      seo: {
        _type: 'seo',
        metaTitle: L(
          'Social Media Marketing Qatar | Instagram & TikTok Management',
          'تسويق سوشيال ميديا في قطر | إدارة Instagram و TikTok',
        ),
        metaDescription: L(
          "Social media marketing agency in Qatar. Instagram, TikTok, Facebook, LinkedIn, and Snapchat management for Qatar brands. In-house content, bilingual EN/AR, real growth.",
          'وكالة تسويق سوشيال ميديا في قطر. إدارة Instagram و TikTok و Facebook و LinkedIn و Snapchat للعلامات القطرية. محتوى داخلي، ثنائي اللغة، نمو حقيقي.',
        ),
        focusKeyword: L('social media marketing qatar', 'تسويق سوشيال ميديا قطر'),
        canonicalUrl: 'https://mnmagency.com/services/social-media',
      },
    },
    branding: {
      heroCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
      finalCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
      formTitle: L('Get Your Branding Quote', 'احصل على عرض سعر الهوية التجارية'),
      seo: {
        _type: 'seo',
        metaTitle: L(
          'Branding Agency in Qatar | Brand Identity Design Doha',
          'وكالة علامة تجارية في قطر | تصميم هوية العلامة في الدوحة',
        ),
        metaDescription: L(
          'Branding agency in Qatar. Strategic brand identity, naming, logo design, and complete brand systems for ambitious Qatar businesses ready to stand out.',
          'وكالة علامة تجارية في قطر. هوية علامة تجارية استراتيجية وتسمية وتصميم شعار وأنظمة علامة تجارية كاملة للشركات القطرية الطموحة المستعدة للتميز.',
        ),
        focusKeyword: L('branding agency qatar', 'وكالة علامة تجارية قطر'),
        canonicalUrl: 'https://mnmagency.com/services/branding',
      },
    },
    'paid-ads': {
      heroCtaButtonText: L('Get Your Media Plan', 'احصل على خطة الإعلانات'),
      finalCtaButtonText: L('Get Your Media Plan', 'احصل على خطة الإعلانات'),
      formTitle: L('Get Your Paid Media Plan', 'احصل على خطة الإعلانات المدفوعة'),
      seo: {
        _type: 'seo',
        metaTitle: L(
          'Paid Ads Agency in Qatar | Google, Meta, TikTok Ads | M&M',
          'وكالة إعلانات مدفوعة في قطر | Google و Meta و TikTok | M&M',
        ),
        metaDescription: L(
          "Paid advertising agency in Qatar. Google Ads, Meta Ads, TikTok Ads, and LinkedIn Ads managed by Doha's performance marketing team. Real ROAS. Weekly optimization.",
          'وكالة إعلانات مدفوعة في قطر. إعلانات Google و Meta و TikTok و LinkedIn تديرها فريق تسويق الأداء في الدوحة. ROAS حقيقي. تحسين أسبوعي.',
        ),
        focusKeyword: L('paid ads agency qatar', 'وكالة إعلانات مدفوعة قطر'),
        canonicalUrl: 'https://mnmagency.com/services/paid-ads',
      },
    },
    'bulk-sms': {
      heroCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
      finalCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
      formTitle: L('Plan Your SMS Campaign', 'خطّط لحملة الرسائل النصية'),
      seo: {
        _type: 'seo',
        metaTitle: L(
          'Bulk SMS in Qatar | SMS Marketing Campaigns Doha | M&M',
          'رسائل نصية جماعية في قطر | حملات SMS في الدوحة | M&M',
        ),
        metaDescription: L(
          'Bulk SMS marketing in Qatar. Sender-ID branded, CRA-compliant, bilingual campaigns delivered in seconds. 98% open rate. Trusted by Doha businesses.',
          'تسويق الرسائل النصية الجماعية في قطر. حملات ذات معرف مرسل، متوافقة مع CRA، ثنائية اللغة، يتم تسليمها في ثوانٍ. معدل فتح 98%. موثوقة من قبل شركات الدوحة.',
        ),
        focusKeyword: L('bulk sms qatar', 'رسائل نصية جماعية قطر'),
        canonicalUrl: 'https://mnmagency.com/services/bulk-sms',
      },
    },
    videography: {
      heroCtaButtonText: L('Get Your Video Quote', 'احصل على عرض سعر الفيديو'),
      finalCtaButtonText: L('Get Your Video Quote', 'احصل على عرض سعر الفيديو'),
      formTitle: L('Plan Your Video Project', 'خطّط لمشروع الفيديو'),
      seo: {
        _type: 'seo',
        metaTitle: L(
          'Videography in Qatar | Video Production Doha | M&M Marketing',
          'إنتاج فيديو في قطر | إنتاج الفيديو في الدوحة | M&M Marketing',
        ),
        metaDescription: L(
          "Cinematic video production in Qatar. Brand films, product campaigns, event coverage, and social video shot by Doha's in-house production team. Full end-to-end.",
          'إنتاج فيديو سينمائي في قطر. أفلام علامات تجارية وحملات منتجات وتغطية فعاليات وفيديو سوشيال يصورها فريق الإنتاج الداخلي في الدوحة. من البداية إلى النهاية.',
        ),
        focusKeyword: L('videography qatar', 'إنتاج فيديو قطر'),
        canonicalUrl: 'https://mnmagency.com/services/videography',
      },
    },
    // ─── AI service repositioned as "AI Search Visibility" — technical,
    //     not growth-y. Meta title stays Qatar-focused.
    'ai-llmo-geo': {
      heroCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
      finalCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
      formTitle: L('Get Your AI Search Audit', 'احصل على تدقيق البحث بالذكاء الاصطناعي'),
      seo: {
        _type: 'seo',
        metaTitle: L(
          'AI Search Visibility in Qatar | LLMO & GEO | M&M Marketing',
          'ظهور البحث بالذكاء الاصطناعي في قطر | LLMO و GEO | M&M',
        ),
        metaDescription: L(
          "Get your brand cited when Qatar buyers ask ChatGPT, Gemini, Perplexity, or Google's AI search. Technical SEO for the new search layer — free visibility report.",
          'اجعل علامتك التجارية تُذكر عندما يسأل المشترون القطريون ChatGPT وGemini وPerplexity وبحث Google بالذكاء الاصطناعي. SEO تقني لطبقة البحث الجديدة — تقرير ظهور مجاني.',
        ),
        focusKeyword: L('ai search visibility qatar', 'ظهور البحث بالذكاء الاصطناعي قطر'),
        canonicalUrl: 'https://mnmagency.com/services/ai-llmo-geo',
      },
    },
  }

  for (const doc of serviceDocs) {
    const overrides = perServiceOverrides[doc.slug.current] || {
      heroCtaButtonText: primaryCta,
      finalCtaButtonText: primaryCta,
    }
    console.log(`    - ${doc.slug.current}`)
    tx.patch(doc._id, (p) => p.set(overrides as any))
  }

  // 8) AI-LLMO-GEO service — reframe the visible title from "AI Visibility
  //    (LLMO & GEO)" to "AI Search Visibility" and update the description
  //    so the Qatar market sees a specific technical service, not a
  //    growth positioning.
  const aiDoc = serviceDocs.find((s) => s.slug.current === 'ai-llmo-geo')
  if (aiDoc) {
    console.log('  • Reframing ai-llmo-geo positioning')
    tx.patch(aiDoc._id, (p) =>
      p.set({
        title: L('AI Search Visibility', 'الظهور في محركات الذكاء الاصطناعي'),
        description: L(
          "Get your brand cited when Qatar buyers ask ChatGPT, Gemini, Perplexity, or Google's AI search. Technical SEO for the new search layer — free visibility report available.",
          'اجعل علامتك التجارية تُذكر عندما يسأل المشترون في قطر ChatGPT وGemini وPerplexity وبحث Google بالذكاء الاصطناعي. SEO تقني لطبقة البحث الجديدة — تقرير ظهور مجاني متاح.',
        ),
      } as any),
    )
  }

  // 9) LANDING PAGES (/lp/*) — kill AI CTAs on the campaign pages too
  console.log('  • Landing pages (/lp/*)')
  const lpDocs: Array<{_id: string; slug: {current: string}}> = await client.fetch(
    `*[_type == "landingPage" && defined(slug.current)]{ _id, slug }`,
  )
  for (const lp of lpDocs) {
    tx.patch(lp._id, (p) =>
      p.set({
        'hero.ctaText': primaryCta,
        'finalCta.buttonText': primaryCta,
        'form.submitText': primaryCta,
      } as any),
    )
    console.log(`    - ${lp.slug.current}`)
  }

  console.log('\nCommitting…')
  const res = await tx.commit()
  console.log(`Done. ${res.results.length} operations applied ✓`)
  console.log('\n⚠  Reload the site. Every "Get Your AI Growth Strategy" is now "Get Your Quote".')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
