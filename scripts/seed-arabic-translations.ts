/**
 * Seed Arabic translations across every CMS singleton.
 *
 * Run with:
 *   npx sanity exec scripts/seed-arabic-translations.ts --with-user-token
 *
 * Strategy:
 *   - For each tracked field, we read the current value and rewrite it to
 *     { en: existingEnglish, ar: arabicTranslation }.
 *   - If the field is already an object with both .en and .ar populated, we
 *     leave it alone (your manual translations are never overwritten).
 *   - If .ar is blank but .en is set, we fill in .ar.
 *   - If the field is still a plain string (migration not yet run), we wrap
 *     it: .en = the string, .ar = arabicTranslation.
 *
 * Idempotent — safe to re-run after editing translations.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type AnyObj = Record<string, unknown>

/** A translation entry: the English default we expect + the Arabic version. */
type Tr = { en: string; ar: string }

/**
 * Set a localized field on `doc` (mutating in place).
 *   - If existing.ar is non-empty → keep it (don't overwrite editor work)
 *   - Otherwise → write { en: existing.en || tr.en, ar: tr.ar }
 */
function applyTr(doc: AnyObj, path: string[], tr: Tr): boolean {
  let cursor: AnyObj = doc
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    if (!cursor[key] || typeof cursor[key] !== 'object') return false
    cursor = cursor[key] as AnyObj
  }
  const leafKey = path[path.length - 1]
  const current = cursor[leafKey]

  // Plain string → wrap
  if (typeof current === 'string') {
    cursor[leafKey] = { en: current, ar: tr.ar }
    return true
  }

  // Object → only fill blanks
  if (current && typeof current === 'object') {
    const obj = current as AnyObj
    const en = (typeof obj.en === 'string' && obj.en.trim()) ? obj.en as string : tr.en
    const ar = (typeof obj.ar === 'string' && obj.ar.trim()) ? obj.ar as string : tr.ar
    cursor[leafKey] = { en, ar }
    return true
  }

  // Field is absent — write both
  cursor[leafKey] = { en: tr.en, ar: tr.ar }
  return true
}

// ---------------------------------------------------------------------------
// Translation tables — every visible field that an Arabic visitor will see.
// Keys are dotted paths; arrays are referenced by index where applicable.
// ---------------------------------------------------------------------------

const NAVIGATION: Record<string, Tr> = {
  copyright:           { en: '© {year} M&M Marketing. All rights reserved.', ar: '© {year} إم آند إم للتسويق. جميع الحقوق محفوظة.' },
  contactColumnTitle:  { en: 'Contact',     ar: 'تواصل معنا' },
  ctaText:             { en: 'Get Strategy', ar: 'احصل على الاستراتيجية' },
  'promoBanner.text':  { en: "Audit Your Website's SEO Now!", ar: 'افحص تحسين محركات البحث لموقعك الآن!' },
  footerDescription:   { en: 'M&M Marketing builds AI-driven growth systems for brands across Qatar.', ar: 'تبني إم آند إم للتسويق أنظمة نمو مدفوعة بالذكاء الاصطناعي للعلامات التجارية في قطر.' },
  address:             { en: 'Doha, Qatar', ar: 'الدوحة، قطر' },
}

const HOMEPAGE: Record<string, Tr> = {
  heroEyebrow:         { en: 'AI-Driven Growth Partner in Qatar', ar: 'شريك النمو المدفوع بالذكاء الاصطناعي في قطر' },
  title:               { en: 'Grow your business in Qatar through AI-driven marketing systems.', ar: 'نمِّ أعمالك في قطر من خلال أنظمة تسويق مدفوعة بالذكاء الاصطناعي.' },
  subtitle:            { en: 'We build websites, SEO, social, paid media and branding as one connected revenue system — not isolated campaigns.', ar: 'نبني المواقع الإلكترونية، تحسين محركات البحث، وسائل التواصل، الإعلانات المدفوعة، والهوية كنظام إيرادات متكامل — لا كحملات منفصلة.' },
  heroImageAlt:        { en: 'M&M Marketing Growth System', ar: 'نظام النمو من إم آند إم للتسويق' },
  buttonText:          { en: 'Get Your AI Growth Strategy', ar: 'احصل على استراتيجية النمو بالذكاء الاصطناعي' },
  secondaryButtonText: { en: 'View Case Studies',           ar: 'استعرض دراسات الحالة' },

  proofEyebrow:         { en: 'Revenue Proof',                        ar: 'إثبات الإيرادات' },
  clientsBannerTitle:   { en: 'Trusted by brands across Qatar',       ar: 'موثوق بها من قِبَل علامات تجارية في جميع أنحاء قطر' },
  systemEyebrow:        { en: 'The Growth System',                    ar: 'نظام النمو' },
  systemTitle:          { en: "We don't run random campaigns. We build revenue systems.", ar: 'نحن لا ندير حملات عشوائية. نبني أنظمة لتحقيق الإيرادات.' },
  servicesEyebrow:      { en: 'Our Services',                         ar: 'خدماتنا' },
  servicesTitle:        { en: 'Services built to generate revenue.',  ar: 'خدمات مصممة لتحقيق الإيرادات.' },
  caseStudiesEyebrow:   { en: 'Proven Results',                       ar: 'نتائج موثقة' },
  caseStudiesTitle:     { en: 'Real businesses. Real measurable growth.', ar: 'أعمال حقيقية. نمو حقيقي وقابل للقياس.' },
  caseStudiesLinkText:  { en: 'View all case studies →',              ar: 'عرض جميع دراسات الحالة ←' },
  caseStudyCardCta:     { en: 'View Case Study →',                    ar: 'عرض دراسة الحالة ←' },
  missionEyebrow:       { en: 'Our Mission',                          ar: 'رسالتنا' },
  missionTitle:         { en: 'Build measurable growth systems for brands in Qatar.', ar: 'بناء أنظمة نمو قابلة للقياس للعلامات التجارية في قطر.' },
  missionText:          { en: 'Strategy, execution, and measurement working as one — engineered around the revenue you want, not the vanity metrics you don\'t need.', ar: 'الاستراتيجية والتنفيذ والقياس كوحدة واحدة — مصممة حول الإيرادات التي تريدها، لا حول مقاييس الغرور التي لا تحتاجها.' },
  workEyebrow:          { en: 'Selected Work',                        ar: 'أعمال مختارة' },
  workTitle:            { en: 'Work that turns attention into measurable growth.', ar: 'أعمال تُحوِّل الاهتمام إلى نمو قابل للقياس.' },
  blogPill:             { en: 'Daily News',                           ar: 'أحدث المقالات' },
  blogTitle:            { en: 'Read from our blog',                   ar: 'اقرأ من مدونتنا' },
  blogDescription:      { en: 'Insights on websites, SEO, social media, AI-driven growth, and revenue systems.', ar: 'رؤى حول المواقع الإلكترونية، تحسين محركات البحث، وسائل التواصل الاجتماعي، النمو بالذكاء الاصطناعي، وأنظمة الإيرادات.' },
  blogLinkText:         { en: 'Read more from the blog ›',            ar: 'اقرأ المزيد من المدونة ›' },
  finalCtaTitle:        { en: 'Ready to turn marketing into revenue?', ar: 'هل أنت مستعد لتحويل التسويق إلى إيرادات؟' },
  finalCtaText:         { en: "Let's build a strategy designed around your business goals, market, and revenue targets.", ar: 'لنبنِ استراتيجية مصممة حول أهداف عملك وسوقك وإيراداتك المستهدفة.' },
  finalCtaButtonText:   { en: 'Get Your AI Growth Strategy',          ar: 'احصل على استراتيجية النمو بالذكاء الاصطناعي' },

  // SEO sub-object
  'seo.metaTitle':       { en: 'M&M Marketing | AI-Driven Growth Partner in Qatar', ar: 'إم آند إم للتسويق | شريك النمو المدفوع بالذكاء الاصطناعي في قطر' },
  'seo.metaDescription': { en: 'AI-driven marketing agency in Qatar focused on measurable business growth — websites, SEO, social, paid media, branding.', ar: 'وكالة تسويق مدفوعة بالذكاء الاصطناعي في قطر تركز على نمو الأعمال القابل للقياس — مواقع إلكترونية، تحسين محركات البحث، وسائل التواصل، الإعلانات المدفوعة، الهوية.' },
  'seo.focusKeyword':    { en: 'marketing agency Qatar', ar: 'وكالة تسويق في قطر' },
}

const ABOUT_PAGE: Record<string, Tr> = {
  eyebrow:           { en: 'About',                       ar: 'من نحن' },
  title:             { en: 'AI-driven growth, engineered for Qatar.', ar: 'نمو مدفوع بالذكاء الاصطناعي، مصمم لقطر.' },
  subtitle:          { en: 'M&M Marketing combines strategy, execution and measurement into growth systems built around the brands we work with.', ar: 'تجمع إم آند إم للتسويق بين الاستراتيجية والتنفيذ والقياس في أنظمة نمو مبنية حول العلامات التجارية التي نعمل معها.' },
  heroImageAlt:      { en: 'About M&M Marketing',         ar: 'عن إم آند إم للتسويق' },
  positioningTitle:  { en: "We don't just market. We build growth systems.", ar: 'نحن لا نسوّق فحسب. نحن نبني أنظمة نمو.' },
  positioning:       { en: 'Every brand we work with gets a connected system — strategy, creative, websites, performance, content — designed around the revenue they want.', ar: 'كل علامة تجارية نعمل معها تحصل على نظام متكامل — استراتيجية، إبداع، مواقع إلكترونية، أداء، محتوى — مصمم حول الإيرادات التي تريدها.' },
  missionEyebrow:    { en: 'Mission',                     ar: 'الرسالة' },
  missionTitle:      { en: 'Make growth measurable.',     ar: 'جعل النمو قابلًا للقياس.' },
  missionText:       { en: 'We design every engagement so the outcome is a number, not a vibe.', ar: 'نصمم كل عمل بحيث تكون النتيجة رقمًا، لا انطباعًا.' },
  methodologyEyebrow:{ en: 'Methodology',                 ar: 'المنهجية' },
  methodologyTitle:  { en: 'Strategy first, then execution.', ar: 'الاستراتيجية أولًا، ثم التنفيذ.' },
  methodologyText:   { en: 'We start with the revenue model and reverse-engineer everything else from it.', ar: 'نبدأ من نموذج الإيرادات ونصمم كل ما عداه بناءً عليه.' },
  principlesEyebrow: { en: 'Principles',                  ar: 'المبادئ' },
  principlesTitle:   { en: 'How we think. How we execute.', ar: 'كيف نفكر. كيف ننفّذ.' },
  ctaTitle:          { en: 'Ready to build your growth system?', ar: 'هل أنت مستعد لبناء نظام نموّك؟' },
  ctaText:           { en: 'Tell us about your business and goals — we\'ll send back a tailored strategy.', ar: 'أخبرنا عن أعمالك وأهدافك — وسنرسل إليك استراتيجية مخصصة.' },
  ctaButtonText:     { en: 'Get Your AI Growth Strategy', ar: 'احصل على استراتيجية النمو بالذكاء الاصطناعي' },

  'seo.metaTitle':       { en: 'About M&M Marketing Qatar', ar: 'عن إم آند إم للتسويق في قطر' },
  'seo.metaDescription': { en: 'M&M Marketing builds growth systems combining strategy, execution, and measurable results for businesses in Qatar.', ar: 'تبني إم آند إم للتسويق أنظمة نمو تجمع بين الاستراتيجية والتنفيذ والنتائج القابلة للقياس للأعمال في قطر.' },
  'seo.focusKeyword':    { en: 'about M&M Marketing',       ar: 'عن إم آند إم للتسويق' },
}

const CONTACT_PAGE: Record<string, Tr> = {
  eyebrow:             { en: 'Contact M&M',                 ar: 'تواصل مع إم آند إم' },
  title:               { en: "Let's build your growth system.", ar: 'لنبنِ نظام نموّك.' },
  subtitle:            { en: 'Tell us about your business and goals. Our team will respond within 24 hours.', ar: 'أخبرنا عن أعمالك وأهدافك. سيرد عليك فريقنا خلال 24 ساعة.' },
  address:             { en: 'Doha, Qatar',                 ar: 'الدوحة، قطر' },
  contactDetailsTitle: { en: 'Contact Details',             ar: 'معلومات التواصل' },
  openLocationButton:  { en: 'Open Location',               ar: 'افتح الموقع' },
  formEyebrow:         { en: "Let's Talk",                  ar: 'لنتحدث' },
  formTitle:           { en: 'Tell us about your project',  ar: 'أخبرنا عن مشروعك' },
  formSubtitle:        { en: 'Fill out the form and our team will get back to you with a tailored strategy for your business.', ar: 'املأ النموذج وسيتواصل معك فريقنا باستراتيجية مخصصة لأعمالك.' },
  formSubmitText:      { en: 'Send Message',                ar: 'إرسال الرسالة' },
  formSuccessTitle:    { en: 'Thanks — your message is on its way.', ar: 'شكرًا — تم إرسال رسالتك.' },
  formSuccessText:     { en: 'Our team will get back to you shortly.', ar: 'سيتواصل معك فريقنا قريبًا.' },
  formErrorMessage:    { en: 'Sorry, something went wrong. Please try again or email us directly.', ar: 'عذرًا، حدث خطأ ما. حاول مرة أخرى أو راسلنا مباشرة عبر البريد الإلكتروني.' },
  formPrivacyNote:     { en: 'We respect your privacy.',    ar: 'نحن نحترم خصوصيتك.' },
  'detailLabels.workingHours': { en: 'Working Hours:', ar: 'ساعات العمل:' },
  'detailLabels.phone':        { en: 'Phone:',         ar: 'الهاتف:' },
  'detailLabels.email':        { en: 'Email:',         ar: 'البريد الإلكتروني:' },
  'detailLabels.location':     { en: 'Location:',      ar: 'الموقع:' },
  'formPlaceholders.name':     { en: 'Full Name',      ar: 'الاسم الكامل' },
  'formPlaceholders.email':    { en: 'Email Address',  ar: 'البريد الإلكتروني' },
  'formPlaceholders.phone':    { en: 'Phone Number',   ar: 'رقم الهاتف' },
  'formPlaceholders.company':  { en: 'Company Name',   ar: 'اسم الشركة' },
  'formPlaceholders.service':  { en: 'Select Service', ar: 'اختر الخدمة' },
  'formPlaceholders.message':  { en: 'Tell us about your project', ar: 'أخبرنا عن مشروعك' },
  ctaTagline:    { en: 'Your growth is our mission.', ar: 'نموّك هو مهمتنا.' },
  ctaSubTagline: { en: "Let's achieve it together.",  ar: 'لنحققه معًا.' },
  ctaTitle:      { en: 'Ready to Turn Your Marketing Into Revenue?', ar: 'هل أنت مستعد لتحويل التسويق إلى إيرادات؟' },
  ctaText:       { en: "Let's build a strategy focused on real results, not just impressions.", ar: 'لنبنِ استراتيجية تركز على النتائج الحقيقية، لا على الانطباعات فقط.' },
  ctaButtonText: { en: 'Get Your AI Growth Strategy', ar: 'احصل على استراتيجية النمو بالذكاء الاصطناعي' },
  ctaButtonNote: { en: 'No commitment. Strategy call within 24 hours.', ar: 'بدون التزام. مكالمة استراتيجية خلال 24 ساعة.' },
  'seo.metaTitle':       { en: 'Contact M&M Marketing Qatar', ar: 'تواصل مع إم آند إم للتسويق في قطر' },
  'seo.metaDescription': { en: 'Contact M&M Marketing in Qatar for websites, SEO, social media, branding, and AI-driven growth.', ar: 'تواصل مع إم آند إم للتسويق في قطر للمواقع الإلكترونية، تحسين محركات البحث، وسائل التواصل، الهوية، والنمو بالذكاء الاصطناعي.' },
  'seo.focusKeyword':    { en: 'contact marketing agency Qatar', ar: 'تواصل مع وكالة تسويق في قطر' },
}

const SERVICES_PAGE: Record<string, Tr> = {
  eyebrow:       { en: 'Marketing Services',                                   ar: 'خدمات التسويق' },
  title:         { en: 'Services built to generate revenue, not just impressions.', ar: 'خدمات مصممة لتحقيق الإيرادات، لا الانطباعات فقط.' },
  subtitle:      { en: 'Every M&M service is a revenue system — strategy, execution, and measurement working together to drive real business growth for brands in Qatar.', ar: 'كل خدمة من إم آند إم هي نظام إيرادات — استراتيجية وتنفيذ وقياس تعمل معًا لتحقيق نمو حقيقي للأعمال في قطر.' },
  intro:         { en: "We don't run isolated campaigns. We build connected growth systems where every service is engineered to compound revenue.", ar: 'نحن لا نُدير حملات منفصلة. نبني أنظمة نمو متكاملة حيث صُممت كل خدمة لتراكم الإيرادات.' },
  ctaTitle:      { en: 'Ready to build your growth system?',                   ar: 'هل أنت مستعد لبناء نظام نموّك؟' },
  ctaText:       { en: "Tell us about your business and we'll send back a tailored strategy.", ar: 'أخبرنا عن أعمالك وسنرسل إليك استراتيجية مخصصة.' },
  ctaButtonText: { en: 'Get Your AI Growth Strategy', ar: 'احصل على استراتيجية النمو بالذكاء الاصطناعي' },
  'seo.metaTitle':       { en: 'Marketing Services in Qatar | M&M Marketing', ar: 'خدمات التسويق في قطر | إم آند إم للتسويق' },
  'seo.metaDescription': { en: 'Websites, SEO, social media, branding, paid media, and AI-driven growth systems for brands in Qatar.', ar: 'مواقع إلكترونية، تحسين محركات البحث، وسائل التواصل، الهوية، الإعلانات المدفوعة، وأنظمة النمو بالذكاء الاصطناعي للعلامات التجارية في قطر.' },
  'seo.focusKeyword':    { en: 'marketing services Qatar', ar: 'خدمات تسويق في قطر' },
}

const BLOG_PAGE: Record<string, Tr> = {
  eyebrow:  { en: 'Insights',                                              ar: 'رؤى' },
  title:    { en: 'Growth, marketing, and digital strategy insights.',     ar: 'رؤى حول النمو والتسويق والاستراتيجية الرقمية.' },
  subtitle: { en: 'Practical thinking from M&M Marketing on websites, SEO, social media, AI-driven growth, and revenue systems.', ar: 'تفكير عملي من إم آند إم للتسويق حول المواقع الإلكترونية، تحسين محركات البحث، وسائل التواصل، النمو بالذكاء الاصطناعي، وأنظمة الإيرادات.' },
  'seo.metaTitle':       { en: 'Marketing Insights & Growth Blog | M&M Marketing Qatar', ar: 'رؤى التسويق ومدونة النمو | إم آند إم للتسويق في قطر' },
  'seo.metaDescription': { en: 'Insights on websites, SEO, social media, branding, paid media, and AI-driven growth for brands in Qatar.', ar: 'رؤى حول المواقع الإلكترونية، تحسين محركات البحث، وسائل التواصل، الهوية، الإعلانات المدفوعة، والنمو بالذكاء الاصطناعي للعلامات التجارية في قطر.' },
  'seo.focusKeyword':    { en: 'marketing blog Qatar', ar: 'مدونة تسويق في قطر' },
}

const FAQS_PAGE: Record<string, Tr> = {
  eyebrow:  { en: 'FAQs',                              ar: 'الأسئلة الشائعة' },
  title:    { en: 'Frequently Asked Questions',        ar: 'الأسئلة الأكثر شيوعًا' },
  subtitle: { en: 'Answers to the most common questions about M&M Marketing services, growth systems, and how we work with brands in Qatar.', ar: 'إجابات على الأسئلة الأكثر شيوعًا حول خدمات إم آند إم للتسويق وأنظمة النمو وكيفية عملنا مع العلامات التجارية في قطر.' },
  'categoryLabels.general':            { en: 'General',             ar: 'عام' },
  'categoryLabels.websiteDevelopment': { en: 'Website Development', ar: 'تطوير المواقع الإلكترونية' },
  'categoryLabels.seo':                { en: 'SEO',                 ar: 'تحسين محركات البحث' },
  'categoryLabels.socialMedia':        { en: 'Social Media',        ar: 'وسائل التواصل الاجتماعي' },
  'categoryLabels.branding':           { en: 'Branding',            ar: 'الهوية' },
  'categoryLabels.bulkSms':            { en: 'Bulk SMS',            ar: 'الرسائل النصية بالجملة' },
  'categoryLabels.paidAds':            { en: 'Paid Ads',            ar: 'الإعلانات المدفوعة' },
  'categoryLabels.aiLlmoGeo':          { en: 'AI / LLMO / GEO',     ar: 'الذكاء الاصطناعي / LLMO / GEO' },
  'seo.metaTitle':       { en: 'FAQs | M&M Marketing Qatar', ar: 'الأسئلة الشائعة | إم آند إم للتسويق في قطر' },
  'seo.metaDescription': { en: 'Frequently asked questions about M&M Marketing services in Qatar.', ar: 'الأسئلة الأكثر شيوعًا حول خدمات إم آند إم للتسويق في قطر.' },
  'seo.focusKeyword':    { en: 'marketing agency FAQ Qatar', ar: 'الأسئلة الشائعة وكالة تسويق قطر' },
}

const CASE_STUDIES_PAGE: Record<string, Tr> = {
  eyebrow:     { en: 'Case Studies',                                            ar: 'دراسات الحالة' },
  title:       { en: 'Real work. Real strategy. Real measurable growth.',       ar: 'أعمال حقيقية. استراتيجية حقيقية. نمو حقيقي وقابل للقياس.' },
  subtitle:    { en: 'Explore selected case studies showing how M&M Marketing helps brands in Qatar turn digital strategy into business growth.', ar: 'استكشف دراسات الحالة المختارة التي توضح كيف تساعد إم آند إم للتسويق العلامات التجارية في قطر على تحويل الاستراتيجية الرقمية إلى نمو في الأعمال.' },
  cardCtaText: { en: 'View Case Study →',                                       ar: 'عرض دراسة الحالة ←' },
  'seo.metaTitle':       { en: 'Marketing Case Studies | M&M Marketing Qatar', ar: 'دراسات حالة التسويق | إم آند إم للتسويق في قطر' },
  'seo.metaDescription': { en: 'Measurable growth results across websites, SEO, social media, branding, paid media, and AI-driven systems in Qatar.', ar: 'نتائج نمو قابلة للقياس عبر المواقع الإلكترونية، تحسين محركات البحث، وسائل التواصل، الهوية، الإعلانات المدفوعة، والأنظمة المدفوعة بالذكاء الاصطناعي في قطر.' },
  'seo.focusKeyword':    { en: 'marketing case studies Qatar', ar: 'دراسات حالة تسويق قطر' },
}

const SEO_AUDIT_PAGE: Record<string, Tr> = {
  eyebrow:      { en: 'Free SEO Audit',                                                 ar: 'تدقيق مجاني للسيو' },
  title:        { en: 'Free SEO Audit',                                                 ar: 'تدقيق مجاني لتحسين محركات البحث' },
  subtitle:     { en: 'Enter your website URL to receive a full SEO report covering technical SEO, on-page optimisation, performance, and growth opportunities.', ar: 'أدخل رابط موقعك لتلقي تقرير شامل لتحسين محركات البحث يغطي السيو التقني، التحسين الداخلي، الأداء، وفرص النمو.' },
  widgetTitle:  { en: "Audit Your Website's SEO Now!", ar: 'افحص تحسين محركات البحث لموقعك الآن!' },
  successMessage: { en: 'The report will be sent to your email shortly. Thank you!',   ar: 'سيتم إرسال التقرير إلى بريدك الإلكتروني قريبًا. شكرًا لك!' },
  'placeholders.url':       { en: 'Website URL',  ar: 'رابط الموقع' },
  'placeholders.firstName': { en: 'First Name',   ar: 'الاسم الأول' },
  'placeholders.email':     { en: 'Email',        ar: 'البريد الإلكتروني' },
  'placeholders.phone':     { en: 'Phone Number', ar: 'رقم الهاتف' },
  'placeholders.submit':    { en: 'Check',        ar: 'افحص' },
  'seo.metaTitle':       { en: 'Free SEO Audit | M&M Marketing Qatar', ar: 'تدقيق سيو مجاني | إم آند إم للتسويق في قطر' },
  'seo.metaDescription': { en: 'Get a free SEO audit covering technical SEO, on-page issues, performance, and growth opportunities for your business in Qatar.', ar: 'احصل على تدقيق مجاني لتحسين محركات البحث يغطي السيو التقني، مشكلات الصفحات، الأداء، وفرص النمو لأعمالك في قطر.' },
  'seo.focusKeyword':    { en: 'free SEO audit Qatar', ar: 'تدقيق سيو مجاني في قطر' },
}

const STRATEGY_FORM: Record<string, Tr> = {
  eyebrow:        { en: 'Tell us about your business',         ar: 'أخبرنا عن أعمالك' },
  title:          { en: 'Get Your AI Growth Strategy',         ar: 'احصل على استراتيجية النمو بالذكاء الاصطناعي' },
  subtitle:       { en: 'Share a few details about your business, market, and goals. Our team will respond with a tailored growth strategy within 24 hours.', ar: 'شارك بعض التفاصيل عن أعمالك وسوقك وأهدافك. سيرد عليك فريقنا باستراتيجية نمو مخصصة خلال 24 ساعة.' },
  submitText:     { en: 'Get Strategy',                        ar: 'احصل على الاستراتيجية' },
  successMessage: { en: "Thanks — your strategy request is in. Our team will reach out within 24 hours.", ar: 'شكرًا — تم استلام طلب الاستراتيجية. سيتواصل معك فريقنا خلال 24 ساعة.' },
  errorMessage:   { en: 'Sorry, something went wrong. Please try again or email us directly.', ar: 'عذرًا، حدث خطأ ما. حاول مرة أخرى أو راسلنا مباشرة عبر البريد الإلكتروني.' },
  trustEyebrow:        { en: 'Trusted by brands across Qatar', ar: 'موثوق بها من علامات تجارية في جميع أنحاء قطر' },
  processEyebrow:      { en: 'What Happens Next',              ar: 'ما الذي يحدث بعد ذلك' },
  processTitle:        { en: "Here's exactly what to expect.", ar: 'هذا بالضبط ما يمكنك توقعه.' },
  testimonialsEyebrow: { en: 'What Clients Say',               ar: 'ماذا يقول عملاؤنا' },
  testimonialsTitle:   { en: 'Real businesses. Real measurable growth.', ar: 'أعمال حقيقية. نمو حقيقي وقابل للقياس.' },
  'placeholders.name':    { en: 'Your Name',                   ar: 'اسمك' },
  'placeholders.email':   { en: 'Email Address',               ar: 'البريد الإلكتروني' },
  'placeholders.country': { en: 'Country',                     ar: 'الدولة' },
  'placeholders.phone':   { en: 'Phone Number',                ar: 'رقم الهاتف' },
  'placeholders.company': { en: 'Company Name',                ar: 'اسم الشركة' },
  'placeholders.budget':  { en: 'Monthly Marketing Budget',    ar: 'الميزانية الشهرية للتسويق' },
  'placeholders.message': { en: 'What do you want to achieve?', ar: 'ما الذي تريد تحقيقه؟' },
  'placeholders.service': { en: 'Select Service',              ar: 'اختر الخدمة' },
  'seo.metaTitle':       { en: 'Get Your AI Growth Strategy | M&M Marketing Qatar', ar: 'احصل على استراتيجية النمو بالذكاء الاصطناعي | إم آند إم للتسويق في قطر' },
  'seo.metaDescription': { en: 'Get a tailored AI-driven marketing growth strategy from M&M Marketing in Qatar.', ar: 'احصل على استراتيجية نمو تسويقي مخصصة مدفوعة بالذكاء الاصطناعي من إم آند إم للتسويق في قطر.' },
  'seo.focusKeyword':    { en: 'marketing strategy Qatar', ar: 'استراتيجية تسويق في قطر' },
}

// ---------------------------------------------------------------------------
// Apply each table to its singleton.
// ---------------------------------------------------------------------------

async function patchSingleton(type: string, table: Record<string, Tr>) {
  const doc: AnyObj | null = await client.fetch(`*[_type == $type][0]`, {type})
  if (!doc?._id) {
    console.log(`(${type}) no doc to patch`)
    return
  }

  let changed = 0
  for (const [path, tr] of Object.entries(table)) {
    if (applyTr(doc, path.split('.'), tr)) changed++
  }

  if (changed === 0) {
    console.log(`(${type}) nothing to change`)
    return
  }

  // Build a set patch for just the top-level fields we touched
  const setPatch: AnyObj = {}
  const topKeys = new Set(Object.keys(table).map((p) => p.split('.')[0]))
  for (const key of topKeys) {
    if (key in doc) setPatch[key] = doc[key]
  }
  await client.patch(doc._id as string).set(setPatch).commit()
  console.log(`(${type}) patched ${changed} field(s)`)
}

async function main() {
  await patchSingleton('navigation',      NAVIGATION)
  await patchSingleton('homepage',        HOMEPAGE)
  await patchSingleton('aboutPage',       ABOUT_PAGE)
  await patchSingleton('contactPage',     CONTACT_PAGE)
  await patchSingleton('servicesPage',    SERVICES_PAGE)
  await patchSingleton('blogPage',        BLOG_PAGE)
  await patchSingleton('faqsPage',        FAQS_PAGE)
  await patchSingleton('caseStudiesPage', CASE_STUDIES_PAGE)
  await patchSingleton('seoAuditPage',    SEO_AUDIT_PAGE)
  await patchSingleton('strategyForm',    STRATEGY_FORM)
  console.log('\nDone. Refresh the frontend, click the globe icon.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
