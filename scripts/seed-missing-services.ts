/**
 * Create the three service docs that don't yet exist in Sanity:
 *   • branding
 *   • paid-ads
 *   • ai-llmo-geo
 *
 * Each is created with the full set of fields the new /services/[slug]
 * template reads — hero copy, why-it-matters, deliverables checklist,
 * what-we-build content, projects, FAQs eyebrow/title, form section copy,
 * and final CTA — so the page renders complete on first publish.
 *
 * Idempotent: uses createIfNotExists, so re-running won't clobber edits.
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-missing-services.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

type ServiceSeed = {
  slug: string
  docId: string
  title: Loc
  description: Loc
  heroEyebrow: Loc
  heroCtaButtonText: Loc
  whyItMatters: Loc
  whyItMattersEyebrow: Loc
  whyItMattersTitle: Loc
  whatWeBuildEyebrow: Loc
  whatWeBuildTitle: Loc
  content: Loc
  deliverablesEyebrow: Loc
  deliverablesTitle: Loc
  deliverables: Loc[]
  projectsEyebrow: Loc
  projectsTitle: Loc
  faqsEyebrow: Loc
  faqsTitle: Loc
  formEyebrow: Loc
  formTitle: Loc
  formSubtitle: Loc
  formSubmitText: Loc
  ctaTitle: Loc
  ctaText: Loc
  finalCtaButtonText: Loc
  seoMetaTitle: Loc
  seoMetaDescription: Loc
  seoFocusKeyword: Loc
  canonicalUrl: string
}

// ─── Shared defaults (reused across the three services) ────────────────
const sharedHeroEyebrow      = L('M&M Service',                   'خدمة من M&M')
const sharedHeroCta          = L('Get Your Quote',                 'احصل على عرض السعر')
const sharedWhyEyebrow       = L('Why It Matters',                'لماذا هذا مهم')
const sharedWhatWeBuildEye   = L('What We Build',                 'ما الذي نبنيه')
const sharedDeliverablesEye  = L("What's Included",               'ما ستحصل عليه')
const sharedProjectsEyebrow  = L('Case Studies',                  'دراسات الحالة')
const sharedProjectsTitle    = L('Real Results in Qatar',         'نتائج حقيقية في قطر')
const sharedFaqsEyebrow      = L('FAQs',                          'الأسئلة الشائعة')
const sharedFaqsTitle        = L('Frequently Asked Questions',    'أسئلة يطرحها العملاء')
const sharedFormEyebrow      = L("Let's Talk",                    'تحدث إلى الخبراء')
const sharedFormSubmit       = L('Get Started',                   'أرسل')
const sharedFinalCtaButton   = L('Get Your Quote',                 'احصل على عرض السعر')

// ─── Per-service content ───────────────────────────────────────────────
const services: ServiceSeed[] = [
  {
    slug: 'branding',
    docId: 'service-branding',
    title: L('Branding', 'العلامة التجارية'),
    description: L(
      'Distinct, memorable brand identities built to make Qatar businesses stand out and command trust at every touchpoint.',
      'هويات علامة تجارية مميزة لا تُنسى مصممة لتمييز الأعمال في قطر وتعزيز الثقة في كل نقطة لمس.',
    ),
    heroEyebrow: sharedHeroEyebrow,
    heroCtaButtonText: sharedHeroCta,
    whyItMatters: L(
      'In a market as competitive as Qatar, a forgettable brand is an expensive brand. Strong branding cuts customer acquisition cost, raises pricing power, and turns first-time buyers into repeat ones. Without a clear identity, every ad dollar works harder than it should.',
      'في سوق قطر التنافسي، العلامة التجارية غير المميزة مكلفة. العلامة التجارية القوية تخفض تكلفة اكتساب العملاء، وترفع قوة التسعير، وتحول المشترين لأول مرة إلى عملاء دائمين. بدون هوية واضحة، كل دولار إعلاني يبذل جهداً أكبر من اللازم.',
    ),
    whyItMattersEyebrow: sharedWhyEyebrow,
    whyItMattersTitle: L(
      'Branding is the cheapest growth lever you have.',
      'العلامة التجارية هي أرخص رافعة نمو لديك.',
    ),
    whatWeBuildEyebrow: sharedWhatWeBuildEye,
    whatWeBuildTitle: L(
      'A brand system, not a logo file.',
      'نظام علامة تجارية، وليس مجرد ملف شعار.',
    ),
    content: L(
      'We build complete brand systems: positioning, voice, naming, logo, color, typography, photography direction, and applications across digital and print. Everything documented in a brand guide your team can apply consistently — and that designers, ad partners and printers can follow without guesswork.',
      'نبني أنظمة علامة تجارية كاملة: التموضع، نبرة الصوت، التسمية، الشعار، الألوان، الطباعة، توجيه التصوير، والتطبيقات الرقمية والمطبوعة. كل ذلك موثق في دليل علامة تجارية يمكن لفريقك تطبيقه باستمرار — يتبعه المصممون وشركاء الإعلانات والطابعون دون تخمين.',
    ),
    deliverablesEyebrow: sharedDeliverablesEye,
    deliverablesTitle: L(
      'Everything needed to launch and scale your brand with confidence.',
      'كل ما يلزم لإطلاق علامتك التجارية وتوسيعها بثقة.',
    ),
    deliverables: [
      L('Brand strategy & positioning', 'استراتيجية العلامة التجارية والتموضع'),
      L('Naming & verbal identity', 'التسمية والهوية اللفظية'),
      L('Logo design & visual identity', 'تصميم الشعار والهوية البصرية'),
      L('Color, typography & art direction', 'الألوان، الطباعة، والتوجيه الفني'),
      L('Brand guidelines document', 'مستند إرشادات العلامة التجارية'),
      L('Business cards & stationery', 'بطاقات العمل والقرطاسية'),
      L('Social media brand kit', 'حقيبة العلامة التجارية لوسائل التواصل'),
      L('Website branding application', 'تطبيق العلامة التجارية على الموقع'),
    ],
    projectsEyebrow: sharedProjectsEyebrow,
    projectsTitle: sharedProjectsTitle,
    faqsEyebrow: sharedFaqsEyebrow,
    faqsTitle: sharedFaqsTitle,
    formEyebrow: sharedFormEyebrow,
    formTitle: L('Start Your Brand Strategy', 'ابدأ استراتيجية علامتك التجارية'),
    formSubtitle: L(
      'Tell us where your brand is today — we respond within 24 hours with a positioning roadmap.',
      'أخبرنا بحالة علامتك التجارية اليوم — ونرد خلال 24 ساعة بخارطة طريق للتموضع.',
    ),
    formSubmitText: sharedFormSubmit,
    ctaTitle: L('Ready to build a brand worth choosing?', 'جاهز لبناء علامة تجارية تستحق الاختيار؟'),
    ctaText: L(
      "Let's build a brand identity that earns trust, commands premium pricing, and compounds over time.",
      'لنبني هوية علامة تجارية تكسب الثقة وتفرض تسعيراً متميزاً وتتراكم مع الوقت.',
    ),
    finalCtaButtonText: sharedFinalCtaButton,
    seoMetaTitle: L(
      'Branding & Brand Identity Services in Qatar | M&M Marketing',
      'خدمات بناء العلامة التجارية في قطر | M&M Marketing',
    ),
    seoMetaDescription: L(
      'Strategic brand identity, naming, logo design, and brand systems for Qatar businesses ready to stand out and command trust.',
      'هوية علامة تجارية استراتيجية، تسمية، تصميم شعار، وأنظمة علامة تجارية لشركات قطر المستعدة للتميز وكسب الثقة.',
    ),
    seoFocusKeyword: L('branding agency Qatar', 'وكالة بناء العلامة التجارية في قطر'),
    canonicalUrl: 'https://mnmagency.com/services/branding',
  },

  {
    slug: 'paid-ads',
    docId: 'service-paid-ads',
    title: L('Paid Ads', 'الإعلانات المدفوعة'),
    description: L(
      'Performance-driven paid media on Google, Meta, TikTok and LinkedIn — engineered to convert spend into measurable revenue, not just impressions.',
      'إعلانات مدفوعة قائمة على الأداء عبر Google و Meta و TikTok و LinkedIn — مهندسة لتحويل الإنفاق إلى إيرادات قابلة للقياس، وليس مجرد ظهور.',
    ),
    heroEyebrow: sharedHeroEyebrow,
    heroCtaButtonText: sharedHeroCta,
    whyItMatters: L(
      'Most ad accounts in Qatar burn budget on traffic that never converts. Why? Generic targeting, weak creative, broken landing pages, no conversion tracking. We rebuild paid media around the metrics that actually move your business: CAC, ROAS, and qualified-lead volume.',
      'معظم حسابات الإعلانات في قطر تستهلك الميزانية على زيارات لا تتحول. لماذا؟ استهداف عام، إبداع ضعيف، صفحات هبوط معطلة، عدم تتبع التحويلات. نعيد بناء الإعلانات المدفوعة حول المقاييس التي تحرك عملك فعلاً: تكلفة اكتساب العميل، عائد الإنفاق الإعلاني، وحجم العملاء المحتملين المؤهلين.',
    ),
    whyItMattersEyebrow: sharedWhyEyebrow,
    whyItMattersTitle: L(
      'Paid ads should earn revenue, not just clicks.',
      'الإعلانات المدفوعة يجب أن تكسب إيرادات، وليس مجرد نقرات.',
    ),
    whatWeBuildEyebrow: sharedWhatWeBuildEye,
    whatWeBuildTitle: L(
      'A revenue engine, not a media buy.',
      'محرك إيرادات، وليس مجرد شراء وسائط.',
    ),
    content: L(
      'We design end-to-end paid acquisition systems: audience research, creative production, landing-page optimization, full-funnel tracking via GA4 + server-side events, and weekly optimization based on cost per qualified lead. Spend less to learn what works, then scale only what converts.',
      'نصمم أنظمة اكتساب مدفوعة شاملة: أبحاث الجمهور، إنتاج الإبداع، تحسين صفحات الهبوط، التتبع الكامل عبر GA4 وأحداث الخادم، والتحسين الأسبوعي بناءً على تكلفة العميل المؤهل. ننفق أقل لاكتشاف ما ينجح، ثم نوسع فقط ما يحقق التحويل.',
    ),
    deliverablesEyebrow: sharedDeliverablesEye,
    deliverablesTitle: L(
      'A paid-media stack engineered for measurable ROAS.',
      'حزمة إعلانات مدفوعة مهندسة لعائد إنفاق قابل للقياس.',
    ),
    deliverables: [
      L('Audience research & ICP definition', 'أبحاث الجمهور وتعريف الملف المثالي'),
      L('Google Ads (Search, Shopping, YouTube)', 'إعلانات Google (البحث، التسوق، YouTube)'),
      L('Meta Ads (Facebook + Instagram)', 'إعلانات Meta (Facebook و Instagram)'),
      L('TikTok & LinkedIn campaigns', 'حملات TikTok و LinkedIn'),
      L('Creative production (static + video)', 'إنتاج الإبداع (ثابت + فيديو)'),
      L('Conversion tracking & attribution', 'تتبع التحويلات والإسناد'),
      L('Weekly optimization & reporting', 'تحسين وتقارير أسبوعية'),
      L('Landing page conversion audit', 'تدقيق تحويل صفحات الهبوط'),
    ],
    projectsEyebrow: sharedProjectsEyebrow,
    projectsTitle: sharedProjectsTitle,
    faqsEyebrow: sharedFaqsEyebrow,
    faqsTitle: sharedFaqsTitle,
    formEyebrow: sharedFormEyebrow,
    formTitle: L('Get Your Paid Media Plan', 'احصل على خطة الإعلانات المدفوعة'),
    formSubtitle: L(
      "Share your goals and current ad spend — we'll send a media plan within 24 hours.",
      'شارك أهدافك وميزانيتك الإعلانية الحالية — وسنرسل خطة إعلامية خلال 24 ساعة.',
    ),
    formSubmitText: sharedFormSubmit,
    ctaTitle: L('Ready to turn ad spend into revenue?', 'جاهز لتحويل الإنفاق الإعلاني إلى إيرادات؟'),
    ctaText: L(
      "Let's build a paid-media system that actually compounds — not one that just spends.",
      'لنبني نظام إعلانات مدفوعة يتراكم فعلاً — وليس فقط ينفق.',
    ),
    finalCtaButtonText: sharedFinalCtaButton,
    seoMetaTitle: L(
      'Paid Ads & Performance Marketing in Qatar | Google, Meta, TikTok',
      'الإعلانات المدفوعة وتسويق الأداء في قطر | Google و Meta و TikTok',
    ),
    seoMetaDescription: L(
      'High-ROAS paid ad management across Google, Meta, TikTok, and LinkedIn for Qatar businesses ready to scale acquisition.',
      'إدارة إعلانات مدفوعة بعائد إنفاق مرتفع عبر Google و Meta و TikTok و LinkedIn لشركات قطر المستعدة لتوسيع نطاق الاكتساب.',
    ),
    seoFocusKeyword: L('paid ads agency Qatar', 'وكالة الإعلانات المدفوعة في قطر'),
    canonicalUrl: 'https://mnmagency.com/services/paid-ads',
  },

  {
    slug: 'ai-llmo-geo',
    docId: 'service-ai-llmo-geo',
    title: L('AI Visibility (LLMO & GEO)', 'الظهور في الذكاء الاصطناعي (LLMO & GEO)'),
    description: L(
      "Get your brand surfaced inside ChatGPT, Gemini, Perplexity, and Google's AI Overviews — the new search layer your competitors aren't optimizing for yet.",
      'احصل على ظهور علامتك التجارية داخل ChatGPT و Gemini و Perplexity ونظرة Google الإجمالية بالذكاء الاصطناعي — طبقة البحث الجديدة التي لم يحسّن لها منافسوك بعد.',
    ),
    heroEyebrow: sharedHeroEyebrow,
    heroCtaButtonText: sharedHeroCta,
    whyItMatters: L(
      "More buyers in Qatar are starting their research inside AI assistants. If those assistants don't mention your brand when someone asks 'best marketing agency in Qatar,' you're invisible to a fast-growing slice of the market. LLMO (Large Language Model Optimization) and GEO (Generative Engine Optimization) fix that.",
      'يبدأ المزيد من المشترين في قطر بحثهم داخل مساعدي الذكاء الاصطناعي. إذا لم يذكر هؤلاء المساعدون علامتك التجارية عندما يسأل شخص ما "أفضل وكالة تسويق في قطر"، فأنت غير مرئي لشريحة سريعة النمو من السوق. تحسين LLM و GEO يحل ذلك.',
    ),
    whyItMattersEyebrow: sharedWhyEyebrow,
    whyItMattersTitle: L(
      'AI is the next search engine — and most brands are invisible to it.',
      'الذكاء الاصطناعي هو محرك البحث القادم — ومعظم العلامات التجارية غير مرئية له.',
    ),
    whatWeBuildEyebrow: sharedWhatWeBuildEye,
    whatWeBuildTitle: L(
      'A presence engineered to be cited by AI, not just Google.',
      'حضور مهندس ليُذكر من قبل الذكاء الاصطناعي، وليس فقط Google.',
    ),
    content: L(
      "We rebuild your digital footprint so AI assistants surface your brand: structured data, knowledge-graph signals, entity-first content, citations in high-authority sources, and continuous monitoring of how LLMs describe you. We then track your AI visibility weekly across ChatGPT, Gemini, Perplexity, and Google's SGE.",
      'نعيد بناء بصمتك الرقمية حتى يبرز مساعدو الذكاء الاصطناعي علامتك التجارية: البيانات المنظمة، إشارات الرسم البياني المعرفي، المحتوى المرتكز على الكيانات، الاستشهادات في مصادر ذات صلاحية عالية، والمراقبة المستمرة لكيفية وصف نماذج اللغة الكبيرة لك. ثم نتتبع ظهورك في الذكاء الاصطناعي أسبوعياً عبر ChatGPT و Gemini و Perplexity وتجربة بحث Google التوليدية.',
    ),
    deliverablesEyebrow: sharedDeliverablesEye,
    deliverablesTitle: L(
      'A full AI-visibility stack — built for the next decade of search.',
      'حزمة كاملة للظهور في الذكاء الاصطناعي — مبنية للعقد القادم من البحث.',
    ),
    deliverables: [
      L('AI visibility audit across ChatGPT, Gemini, Perplexity', 'تدقيق الظهور في الذكاء الاصطناعي عبر ChatGPT و Gemini و Perplexity'),
      L('Knowledge-graph & entity optimization', 'تحسين الرسم البياني المعرفي والكيانات'),
      L('Schema.org & structured data implementation', 'تطبيق Schema.org والبيانات المنظمة'),
      L('Authoritative citation building', 'بناء الاستشهادات الموثوقة'),
      L('Wikipedia & Wikidata entity profiles', 'ملفات الكيانات على Wikipedia و Wikidata'),
      L('LLM-optimized content rewrites', 'إعادة كتابة المحتوى المحسّن لنماذج اللغة'),
      L('Weekly AI-mention tracking dashboard', 'لوحة تتبع أسبوعية لذكر الذكاء الاصطناعي'),
      L('Competitive AI-visibility benchmarking', 'قياس مرجعي للظهور التنافسي في الذكاء الاصطناعي'),
    ],
    projectsEyebrow: sharedProjectsEyebrow,
    projectsTitle: sharedProjectsTitle,
    faqsEyebrow: sharedFaqsEyebrow,
    faqsTitle: sharedFaqsTitle,
    formEyebrow: sharedFormEyebrow,
    formTitle: L('Book Your AI Visibility Audit', 'احجز تدقيق الظهور في الذكاء الاصطناعي'),
    formSubtitle: L(
      "Tell us about your brand — we'll send back a free LLM/GEO visibility report within 24 hours.",
      'أخبرنا عن علامتك التجارية — وسنرسل تقريراً مجانياً عن ظهورك في LLM/GEO خلال 24 ساعة.',
    ),
    formSubmitText: sharedFormSubmit,
    ctaTitle: L('Want to be the brand AI recommends?', 'هل تريد أن تكون العلامة التجارية التي يوصي بها الذكاء الاصطناعي؟'),
    ctaText: L(
      "Let's make sure when someone asks an AI assistant about your category, your name comes up first.",
      'لنتأكد أنه عندما يسأل شخص ما مساعد ذكاء اصطناعي عن فئتك، يظهر اسمك أولاً.',
    ),
    finalCtaButtonText: sharedFinalCtaButton,
    seoMetaTitle: L(
      'AI Visibility & LLMO Services in Qatar | M&M Marketing',
      'خدمات الظهور في الذكاء الاصطناعي و LLMO في قطر | M&M Marketing',
    ),
    seoMetaDescription: L(
      'Get your brand cited inside ChatGPT, Gemini, Perplexity, and Google AI Overviews. LLM & GEO optimization for Qatar businesses.',
      'احصل على ذكر علامتك التجارية داخل ChatGPT و Gemini و Perplexity ونظرة Google الإجمالية بالذكاء الاصطناعي. تحسين LLM و GEO لشركات قطر.',
    ),
    seoFocusKeyword: L('AI SEO Qatar LLMO GEO', 'تحسين الذكاء الاصطناعي قطر LLMO GEO'),
    canonicalUrl: 'https://mnmagency.com/services/ai-llmo-geo',
  },
]

async function main() {
  console.log(`Seeding ${services.length} missing services…`)
  const tx = client.transaction()

  for (const svc of services) {
    console.log(`  • ${svc.slug}`)
    const doc: any = {
      _id: svc.docId,
      _type: 'service',
      title: svc.title,
      slug: {_type: 'slug', current: svc.slug},
      description: svc.description,
      content: svc.content,
      whyItMatters: svc.whyItMatters,
      deliverables: svc.deliverables,
      ctaTitle: svc.ctaTitle,
      ctaText: svc.ctaText,
      heroEyebrow: svc.heroEyebrow,
      heroCtaButtonText: svc.heroCtaButtonText,
      heroCtaButtonLink: '/get-strategy',
      whatWeBuildEyebrow: svc.whatWeBuildEyebrow,
      whatWeBuildTitle: svc.whatWeBuildTitle,
      whyItMattersEyebrow: svc.whyItMattersEyebrow,
      whyItMattersTitle: svc.whyItMattersTitle,
      deliverablesEyebrow: svc.deliverablesEyebrow,
      deliverablesTitle: svc.deliverablesTitle,
      projectsEyebrow: svc.projectsEyebrow,
      projectsTitle: svc.projectsTitle,
      faqsEyebrow: svc.faqsEyebrow,
      faqsTitle: svc.faqsTitle,
      formEyebrow: svc.formEyebrow,
      formTitle: svc.formTitle,
      formSubtitle: svc.formSubtitle,
      formSubmitText: svc.formSubmitText,
      finalCtaButtonText: svc.finalCtaButtonText,
      finalCtaButtonLink: '/get-strategy',
      seo: {
        _type: 'seo',
        metaTitle: svc.seoMetaTitle,
        metaDescription: svc.seoMetaDescription,
        focusKeyword: svc.seoFocusKeyword,
        canonicalUrl: svc.canonicalUrl,
      },
    }

    // createIfNotExists keeps any editor changes if the user already started
    // a doc with this _id.
    tx.createIfNotExists(doc)
  }

  console.log('Committing…')
  const res = await tx.commit()
  console.log(`Done. ${res.results.length} service doc(s) processed ✓`)
  console.log('\nNew services now live:')
  console.log('  /services/branding')
  console.log('  /services/paid-ads')
  console.log('  /services/ai-llmo-geo')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
