/**
 * Seed the in-page strategy-form copy + final-CTA copy for every `service` doc.
 *
 * Adds formEyebrow / formTitle / formSubtitle / formSubmitText and fills any
 * eyebrow/title/CTA fields that are still blank so the new /services/[slug]
 * design has zero hardcoded English/Arabic strings — every visible label
 * comes from Sanity.
 *
 * Run with:
 *   npx sanity exec scripts/seed-service-form-copy.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
type ServiceDefaults = {
  // Hero
  heroEyebrow: Loc
  heroCtaButtonText: Loc
  // Why It Matters
  whyItMattersEyebrow: Loc
  whyItMattersTitle: Loc
  // Deliverables
  deliverablesEyebrow: Loc
  deliverablesTitle: Loc
  // What we build
  whatWeBuildEyebrow: Loc
  whatWeBuildTitle: Loc
  // Projects
  projectsEyebrow: Loc
  projectsTitle: Loc
  // FAQs
  faqsEyebrow: Loc
  faqsTitle: Loc
  // In-page strategy form
  formEyebrow: Loc
  formTitle: Loc
  formSubtitle: Loc
  formSubmitText: Loc
  // Final CTA
  ctaTitle: Loc
  ctaText: Loc
  finalCtaButtonText: Loc
}

// Shared defaults — used as the *baseline* for every service. Each service can
// override any field below in `perServiceOverrides`.
const sharedDefaults: ServiceDefaults = {
  heroEyebrow: {en: 'M&M Service', ar: 'خدمة من M&M'},
  heroCtaButtonText: {en: 'Get Your Quote', ar: 'احصل على عرض السعر'},

  whyItMattersEyebrow: {en: 'Why It Matters', ar: 'لماذا هذا مهم'},
  whyItMattersTitle: {
    en: 'Your digital presence directly affects growth.',
    ar: 'حضورك الرقمي يؤثر مباشرة على النمو.',
  },

  deliverablesEyebrow: {en: "What's Included", ar: 'ما ستحصل عليه'},
  deliverablesTitle: {
    en: 'Everything you need to turn strategy into measurable execution.',
    ar: 'كل ما يلزم لتحويل الاستراتيجية إلى تنفيذ قابل للقياس.',
  },

  whatWeBuildEyebrow: {en: 'What We Build', ar: 'ما الذي نبنيه'},
  whatWeBuildTitle: {
    en: 'Built as a revenue system, not a digital brochure.',
    ar: 'نظام إيرادات، وليس مجرد واجهة رقمية.',
  },

  projectsEyebrow: {en: 'Case Studies', ar: 'دراسات الحالة'},
  projectsTitle: {en: 'Real Results in Qatar', ar: 'نتائج حقيقية في قطر'},

  faqsEyebrow: {en: 'FAQs', ar: 'الأسئلة الشائعة'},
  faqsTitle: {en: 'Frequently Asked Questions', ar: 'أسئلة يطرحها العملاء'},

  formEyebrow: {en: "Let's Talk", ar: 'تحدث إلى الخبراء'},
  formTitle: {en: 'Book Your Free Consultation', ar: 'احجز استشارتك المجانية'},
  formSubtitle: {
    en: 'Fill out the form and our team will reach out within 24 hours with a strategy tailored to your business.',
    ar: 'املأ النموذج وسيتواصل معك فريقنا باستراتيجية مخصصة لعملك خلال 24 ساعة.',
  },
  formSubmitText: {en: 'Get Started', ar: 'أرسل'},

  ctaTitle: {en: 'Ready to grow?', ar: 'جاهز للنمو؟'},
  ctaText: {
    en: "Let's build a strategy focused on real results, not just impressions.",
    ar: 'لنبني استراتيجية تركز على نتائج حقيقية، وليس مجرد ظهور.',
  },
  finalCtaButtonText: {en: 'Get Your Quote', ar: 'احصل على عرض السعر'},
}

// Slug-specific overrides — keep these narrow and conversion-focused.
const perServiceOverrides: Record<string, Partial<ServiceDefaults>> = {
  seo: {
    formTitle: {en: 'Get Your Free SEO Strategy Call', ar: 'احجز استشارة SEO مجانية'},
    formSubtitle: {
      en: "Tell us your domain and target keywords — we'll come back with a tailored SEO plan within 24 hours.",
      ar: 'أخبرنا بنطاق موقعك وكلماتك المستهدفة — وسنرجع إليك بخطة SEO مخصصة خلال 24 ساعة.',
    },
  },
  'website-development': {
    formTitle: {en: 'Plan Your New Website', ar: 'خطط لموقعك الجديد'},
    formSubtitle: {
      en: 'Share your goals and timeline — our team responds within 24 hours with a scoped proposal.',
      ar: 'شارك أهدافك والجدول الزمني — يرد عليك فريقنا خلال 24 ساعة بعرض محدد النطاق.',
    },
  },
  'social-media': {
    formTitle: {en: 'Book Your Social Media Audit', ar: 'احجز تدقيقاً لوسائل التواصل الاجتماعي'},
    formSubtitle: {
      en: "Tell us about your brand and audience — we'll send back a content & growth plan within 24 hours.",
      ar: 'أخبرنا عن علامتك التجارية وجمهورك — وسنرسل خطة محتوى ونمو خلال 24 ساعة.',
    },
  },
  branding: {
    formTitle: {en: 'Start Your Brand Strategy', ar: 'ابدأ استراتيجية علامتك التجارية'},
    formSubtitle: {
      en: 'Tell us where your brand is today — we respond within 24 hours with a positioning roadmap.',
      ar: 'أخبرنا بحالة علامتك التجارية اليوم — ونرد خلال 24 ساعة بخارطة طريق للتموضع.',
    },
  },
  'paid-ads': {
    formTitle: {en: 'Get Your Paid Media Plan', ar: 'احصل على خطة وسائل الإعلانات المدفوعة'},
    formSubtitle: {
      en: "Share your goals and current ad spend — we'll send a media plan within 24 hours.",
      ar: 'شارك أهدافك وميزانيتك الإعلانية الحالية — وسنرسل خطة إعلامية خلال 24 ساعة.',
    },
  },
  'bulk-sms': {
    formTitle: {en: 'Plan Your SMS Campaign', ar: 'خطط لحملة SMS الخاصة بك'},
    formSubtitle: {
      en: 'Tell us about your audience and offer — our team replies within 24 hours with a campaign plan.',
      ar: 'أخبرنا عن جمهورك وعرضك — يرد فريقنا خلال 24 ساعة بخطة حملة.',
    },
  },
  'ai-llmo-geo': {
    formTitle: {en: 'Book Your AI Visibility Audit', ar: 'احجز تدقيقاً لظهورك في الذكاء الاصطناعي'},
    formSubtitle: {
      en: "Tell us about your brand — we'll send back a free LLM/GEO visibility report within 24 hours.",
      ar: 'أخبرنا عن علامتك التجارية — وسنرسل تقريراً مجانياً عن ظهورك في LLM/GEO خلال 24 ساعة.',
    },
  },
}

// Localized fields use {en, ar} — patch as `localeString` objects.
const toLocale = (v: Loc) => ({en: v.en, ar: v.ar})

async function main() {
  console.log('Fetching all service docs…')
  const services: Array<{_id: string; slug?: {current?: string}}> = await client.fetch(
    `*[_type == "service" && defined(slug.current)]{ _id, slug }`,
  )

  console.log(`Found ${services.length} service(s).`)
  if (services.length === 0) {
    console.log('Nothing to seed — no services in Sanity.')
    return
  }

  const tx = client.transaction()

  for (const svc of services) {
    const slug = svc.slug?.current || ''
    const overrides = perServiceOverrides[slug] || {}
    const merged: ServiceDefaults = {...sharedDefaults, ...overrides}

    // Only set fields if they're currently empty — non-destructive merge via
    // setIfMissing keeps any existing editor-supplied values intact.
    const patch: Record<string, any> = {
      heroEyebrow: toLocale(merged.heroEyebrow),
      heroCtaButtonText: toLocale(merged.heroCtaButtonText),
      whyItMattersEyebrow: toLocale(merged.whyItMattersEyebrow),
      whyItMattersTitle: toLocale(merged.whyItMattersTitle),
      deliverablesEyebrow: toLocale(merged.deliverablesEyebrow),
      deliverablesTitle: toLocale(merged.deliverablesTitle),
      whatWeBuildEyebrow: toLocale(merged.whatWeBuildEyebrow),
      whatWeBuildTitle: toLocale(merged.whatWeBuildTitle),
      projectsEyebrow: toLocale(merged.projectsEyebrow),
      projectsTitle: toLocale(merged.projectsTitle),
      faqsEyebrow: toLocale(merged.faqsEyebrow),
      faqsTitle: toLocale(merged.faqsTitle),
      formEyebrow: toLocale(merged.formEyebrow),
      formTitle: toLocale(merged.formTitle),
      formSubtitle: toLocale(merged.formSubtitle),
      formSubmitText: toLocale(merged.formSubmitText),
      ctaTitle: toLocale(merged.ctaTitle),
      ctaText: toLocale(merged.ctaText),
      finalCtaButtonText: toLocale(merged.finalCtaButtonText),
    }

    console.log(`  • Patching ${slug || svc._id}…`)
    tx.patch(svc._id, (p) => p.setIfMissing(patch))
  }

  console.log('Committing…')
  const res = await tx.commit()
  console.log(`Done. ${res.results.length} service doc(s) patched ✓`)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
