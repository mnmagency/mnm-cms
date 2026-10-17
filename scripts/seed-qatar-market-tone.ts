/**
 * Round 2 of the Qatar reposition: fill every remaining field that could
 * be seen by a Qatar buyer with market-appropriate language.
 *
 * Qatari buyer psychology (informing every line below):
 *   • Trust > novelty. Established > disruptive.
 *   • "Since [year]" and "Trusted by leading brands in Qatar" > "AI-first".
 *   • Relationship + long-term > transaction + growth-hack.
 *   • Local + Doha + Arabic + English > global-first.
 *   • Discretion + results > loud claims.
 *
 * Fields covered:
 *   • Homepage — case studies + blog + about section tone
 *   • Case Studies index — hero + card CTA
 *   • Blog index page — hero + subtitle
 *   • FAQs page — hero
 *   • Contact page — full copy
 *   • Strategy form — testimonial + process labels
 *   • SEO Audit page — hero
 *
 * All bilingual EN + AR. Idempotent — safe to re-run.
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-qatar-market-tone.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

// ─────────────────────────────────────────────────────────────────────
//  Case Studies Page
// ─────────────────────────────────────────────────────────────────────
const caseStudiesPagePatch = {
  eyebrow: L('Our Work in Qatar', 'أعمالنا في قطر'),
  title: L(
    'Real Qatar Businesses. Real Measurable Growth.',
    'أعمال قطرية حقيقية. نمو حقيقي قابل للقياس.',
  ),
  subtitle: L(
    "Explore selected case studies from brands we've worked with in Doha and across Qatar — automotive, real estate, hospitality, education, retail, and more. Every case study includes the challenge, the strategy, and the measurable outcome.",
    'استكشف دراسات حالة مختارة من العلامات التجارية التي عملنا معها في الدوحة وجميع أنحاء قطر — السيارات والعقارات والضيافة والتعليم والتجزئة والمزيد. تشمل كل دراسة حالة التحدي والاستراتيجية والنتيجة القابلة للقياس.',
  ),
  cardCtaText: L('View Case Study →', 'عرض دراسة الحالة ←'),
  seo: {
    _type: 'seo',
    metaTitle: L(
      'Marketing Case Studies in Qatar | Real Results | M&M Marketing',
      'دراسات حالة تسويقية في قطر | نتائج حقيقية | M&M Marketing',
    ),
    metaDescription: L(
      "Marketing case studies from Qatar's leading agency. Real Doha brands, real revenue growth. See how M&M Marketing delivers measurable results through SEO, web, social, and paid ads.",
      'دراسات حالة تسويقية من الوكالة الرائدة في قطر. علامات دوحة حقيقية، نمو إيرادات حقيقي. شاهد كيف تقدم M&M Marketing نتائج قابلة للقياس من خلال SEO والويب والسوشيال والإعلانات المدفوعة.',
    ),
    focusKeyword: L('marketing case studies qatar', 'دراسات حالة تسويقية قطر'),
    canonicalUrl: 'https://mnmagency.com/case-studies',
  },
}

// ─────────────────────────────────────────────────────────────────────
//  Blog Index Page
// ─────────────────────────────────────────────────────────────────────
const blogPagePatch = {
  eyebrow: L('Marketing Insights', 'رؤى تسويقية'),
  title: L(
    'Marketing Insights for Qatar Businesses',
    'رؤى تسويقية للشركات القطرية',
  ),
  subtitle: L(
    "Practical marketing insights from Qatar's trusted marketing agency. Guides, tactics, and case studies on SEO, web development, social media, branding, and paid ads — written for Doha businesses.",
    'رؤى تسويقية عملية من وكالة التسويق الموثوقة في قطر. أدلة، تكتيكات، ودراسات حالة عن SEO وتطوير المواقع والسوشيال ميديا والعلامة التجارية والإعلانات المدفوعة — مكتوبة لشركات الدوحة.',
  ),
  seo: {
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
  },
}

// ─────────────────────────────────────────────────────────────────────
//  FAQs Page
// ─────────────────────────────────────────────────────────────────────
const faqsPagePatch = {
  eyebrow: L('FAQs', 'الأسئلة الشائعة'),
  title: L(
    'Common Questions About Marketing in Qatar',
    'أسئلة شائعة حول التسويق في قطر',
  ),
  subtitle: L(
    "Everything Qatar businesses want to know about SEO, web development, social media management, branding, and paid ads — answered by M&M Marketing, Doha's trusted marketing agency.",
    'كل ما تريد أن تعرفه الشركات القطرية عن SEO وتطوير المواقع وإدارة السوشيال ميديا والعلامة التجارية والإعلانات المدفوعة — بإجابات من M&M Marketing، وكالة التسويق الموثوقة في الدوحة.',
  ),
  seo: {
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
  },
}

// ─────────────────────────────────────────────────────────────────────
//  Contact Page — full rewrite of the surface copy
// ─────────────────────────────────────────────────────────────────────
const contactPagePatch = {
  eyebrow: L('Contact M&M Marketing', 'اتصل بـ M&M Marketing'),
  title: L(
    "Contact Qatar's Trusted Marketing Agency",
    'اتصل بوكالة التسويق الموثوقة في قطر',
  ),
  subtitle: L(
    "M&M Marketing is a full-service marketing agency in Doha. Call, email, or visit — we reply within 24 hours with a plan built for the Qatar market. Serving brands across Qatar since day one.",
    'M&M Marketing هي وكالة تسويق شاملة الخدمات في الدوحة. اتصل، راسل، أو زر — نرد خلال 24 ساعة بخطة مبنية للسوق القطري. نخدم العلامات التجارية في جميع أنحاء قطر منذ اليوم الأول.',
  ),
  contactDetailsTitle: L('Contact Details', 'بيانات الاتصال'),
  formEyebrow: L("Let's Talk", 'لنتحدث'),
  formTitle: L(
    'Tell Us About Your Business',
    'أخبرنا عن عملك',
  ),
  formSubtitle: L(
    "Share your goals and we'll come back within 24 hours with a marketing plan built specifically for the Qatar market. Free consultation, no commitment.",
    'شارك أهدافك وسنعود إليك خلال 24 ساعة بخطة تسويق مبنية خصيصاً للسوق القطري. استشارة مجانية، بدون التزام.',
  ),
  formSubmitText: L('Send Message', 'أرسل الرسالة'),
  ctaTagline: L(
    'Your growth is our mission.',
    'نموك هو مهمتنا.',
  ),
  ctaSubTagline: L(
    "Let's achieve it together in Qatar.",
    'لنحققه معاً في قطر.',
  ),
  ctaTitle: L(
    'Ready to Grow Your Business in Qatar?',
    'جاهز لتنمية عملك في قطر؟',
  ),
  ctaText: L(
    "Free consultation, no commitment. A senior marketer will review your business and come back with a tailored plan within 24 hours.",
    'استشارة مجانية، بدون التزام. سيراجع مسوّق كبير عملك ويعود إليك بخطة مخصصة خلال 24 ساعة.',
  ),
  ctaButtonText: L('Get Free Consultation', 'احصل على استشارة مجانية'),
  ctaButtonNote: L(
    'No commitment. Reply within 24 hours.',
    'بدون التزام. رد خلال 24 ساعة.',
  ),
}

// ─────────────────────────────────────────────────────────────────────
//  Strategy Form — trust + process labels (Qatar-appropriate tone)
// ─────────────────────────────────────────────────────────────────────
const strategyFormPatch = {
  trustEyebrow: L(
    'Trusted by leading brands across Qatar',
    'موثوق به من قبل العلامات التجارية الرائدة في قطر',
  ),
  processEyebrow: L('What Happens Next', 'ما الذي يحدث بعد ذلك'),
  processTitle: L(
    "Here's exactly what to expect.",
    'هذا بالضبط ما يمكن توقعه.',
  ),
  testimonialsEyebrow: L('What Qatar Businesses Say', 'ماذا تقول الشركات القطرية'),
  testimonialsTitle: L(
    "Trusted by ambitious brands across Qatar.",
    'موثوق به من قبل العلامات الطموحة في جميع أنحاء قطر.',
  ),
}

// ─────────────────────────────────────────────────────────────────────
//  SEO Audit Page
// ─────────────────────────────────────────────────────────────────────
const seoAuditPagePatch = {
  eyebrow: L('Free SEO Audit', 'تدقيق SEO مجاني'),
  title: L(
    'Free SEO Audit for Qatar Websites',
    'تدقيق SEO مجاني للمواقع القطرية',
  ),
  subtitle: L(
    "Get a full SEO report on your website in 60 seconds. Technical SEO, on-page, performance, and Qatar-market opportunities — all in one report. Free, instant, no signup required for the summary.",
    'احصل على تقرير SEO كامل عن موقعك في 60 ثانية. SEO فني، على الصفحة، أداء، وفرص السوق القطري — كل ذلك في تقرير واحد. مجاني، فوري، بدون تسجيل مطلوب للملخص.',
  ),
  widgetTitle: L(
    "Audit Your Qatar Website's SEO Now",
    'دقق SEO موقعك القطري الآن',
  ),
  seo: {
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
  },
}

// ─────────────────────────────────────────────────────────────────────
//  Homepage — remaining fields (case studies section, mission etc.)
// ─────────────────────────────────────────────────────────────────────
const homepagePatch = {
  caseStudiesEyebrow: L('Our Work in Qatar', 'أعمالنا في قطر'),
  caseStudiesTitle: L(
    'Real Qatar Businesses. Real Measurable Growth.',
    'أعمال قطرية حقيقية. نمو حقيقي قابل للقياس.',
  ),
  caseStudiesLinkText: L('View all case studies →', 'عرض كل دراسات الحالة ←'),
  caseStudyCardCta: L('Read Case Study →', 'اقرأ دراسة الحالة ←'),
  workEyebrow: L('Our Work', 'أعمالنا'),
  workTitle: L(
    'Selected Marketing Work from Doha',
    'أعمال تسويقية مختارة من الدوحة',
  ),
  missionEyebrow: L('Our Mission in Qatar', 'مهمتنا في قطر'),
  missionTitle: L(
    "To be the marketing partner Qatar businesses actually trust.",
    'أن نكون شريك التسويق الذي تثق به الشركات القطرية فعلاً.',
  ),
  missionText: L(
    'Every Qatar business deserves a marketing partner that understands the local market, respects the relationship, and delivers measurable results. Not a factory. Not a middleman. A real partner in your growth.',
    'تستحق كل شركة قطرية شريك تسويق يفهم السوق المحلي ويحترم العلاقة ويقدم نتائج قابلة للقياس. ليس مصنعاً. ليس وسيطاً. شريك حقيقي في نموك.',
  ),
  footerText: L(
    "M&M Marketing — Qatar's trusted marketing partner.",
    'M&M Marketing — شريك التسويق الموثوق في قطر.',
  ),
}

// ─────────────────────────────────────────────────────────────────────
//  Run
// ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Applying Qatar-market tone (round 2)…')

  const singletonTypes = [
    'homepage',
    'caseStudiesPage',
    'blogPage',
    'faqsPage',
    'contactPage',
    'strategyForm',
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

  patchType('homepage',        homepagePatch,        'Homepage (case studies, mission, footer text)')
  patchType('caseStudiesPage', caseStudiesPagePatch, 'Case studies page')
  patchType('blogPage',        blogPagePatch,        'Blog page')
  patchType('faqsPage',        faqsPagePatch,        'FAQs page')
  patchType('contactPage',     contactPagePatch,     'Contact page (full surface rewrite)')
  patchType('strategyForm',    strategyFormPatch,    'Strategy form (trust + process labels)')
  patchType('seoAuditPage',    seoAuditPagePatch,    'SEO audit page')

  console.log('\nCommitting…')
  const res = await tx.commit()
  console.log(`Done. ${res.results.length} operations applied ✓`)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
