/**
 * High-quality Qatari Arabic translations for every user-facing surface.
 *
 * Register notes:
 *   • Formal MSA (فصحى) with Gulf-friendly phrasing — not colloquial dialect.
 *   • Trust-forward: "الموثوقة", "الرائدة", "المتخصصة".
 *   • Result-oriented: "نتائج قابلة للقياس", "نمو حقيقي".
 *   • Localised: "قطر", "الدوحة", explicit references to the local market.
 *   • Numbers, brand names, and CTAs kept crisp — no over-translation.
 *
 * This seed OVERWRITES the .ar half of every localized field on:
 *   • homepage
 *   • aboutPage
 *   • servicesPage
 *   • contactPage
 *   • blogPage
 *   • faqsPage
 *   • caseStudiesPage
 *   • seoAuditPage
 *   • strategyForm
 *   • navigation
 *   • every service doc (SEO + hero + form + CTA copy)
 *
 * If the editor has already customised any English value, the English stays
 * untouched — only the .ar branch is set.
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-qatar-arabic-translations.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

/**
 * Merge Arabic values into an existing localized field structure without
 * touching the English text. Sanity localized fields are `{en, ar}` objects.
 */
async function patchWithArabic(
  docId: string,
  fields: Record<string, string>,
): Promise<any[]> {
  // We only need to update the .ar sub-key. Sanity supports set-if-missing
  // AT the sub-key level via a dotted patch path.
  const setObj: Record<string, string> = {}
  for (const [key, ar] of Object.entries(fields)) {
    setObj[`${key}.ar`] = ar
  }
  return [{docId, setObj}]
}

// ─────────────────────────────────────────────────────────────────────
//  Arabic strings by doc
// ─────────────────────────────────────────────────────────────────────

const homepageAr: Record<string, string> = {
  heroEyebrow: 'وكالة تسويق في قطر',
  title: 'وكالة التسويق في قطر التي تحقق نتائج حقيقية',
  subtitle:
    'M&M Marketing واحدة من أفضل وكالات التسويق في قطر — متخصصون في تحسين محركات البحث، وتطوير المواقع الإلكترونية، وإدارة وسائل التواصل الاجتماعي، والهوية التجارية، والإعلانات المدفوعة، وإنتاج الفيديو، لعلاماتٍ تجارية طموحة في الدوحة وجميع أنحاء قطر.',
  buttonText: 'احصل على استشارة مجانية',
  secondaryButtonText: 'اطّلع على دراسات الحالة',
  heroImageAlt: 'مكتب وكالة M&M Marketing في الدوحة، قطر',

  clientsBannerTitle: 'موثوقون من قِبل أبرز العلامات التجارية في قطر',

  systemEyebrow: 'كيف نعمل',
  systemTitle: 'لا نُدير حملات عشوائية. نبني أنظمة تسويقية تُنمّي الإيرادات في قطر.',

  servicesEyebrow: 'خدماتنا التسويقية في قطر',
  servicesTitle: 'خدمات تسويقية متكاملة للشركات في قطر',

  caseStudiesEyebrow: 'أعمالنا في قطر',
  caseStudiesTitle: 'شركات قطرية حقيقية. نموّ حقيقي وقابل للقياس.',
  caseStudiesLinkText: 'عرض جميع دراسات الحالة ←',
  caseStudyCardCta: 'اقرأ دراسة الحالة ←',

  aboutEyebrow: 'عن M&M Marketing',
  aboutTitle: 'شريكك الموثوق للتسويق في الدوحة',
  aboutText:
    'تعمل M&M Marketing على تنمية الشركات في قطر منذ سنوات. نحن وكالة تسويق شاملة الخدمات مقرّها الدوحة — نُقدّم كل ما يحتاجه عملك، من تحسين محركات البحث وتطوير المواقع، إلى إدارة وسائل التواصل الاجتماعي، والهوية التجارية، والإعلانات المدفوعة — تحت سقفٍ واحد، بفريقٍ يعرف السوق القطري ويتحدّث لغتك.',
  aboutButtonText: 'تعرّف علينا',

  blogPill: 'رؤى ومقالات',
  blogTitle: 'رؤى تسويقية للشركات القطرية',
  blogDescription: 'أدلة وتكتيكات ودراسات حالة من أفضل وكالة تسويق في قطر.',
  blogLinkText: 'قراءة جميع المقالات ←',

  finalCtaTitle: 'هل أنت جاهز لتنمية أعمالك في قطر؟',
  finalCtaText:
    'استشارة مجانية بلا أي التزام. أخبرنا عن مشروعك، ونعود إليك خلال 24 ساعة بخطة تسويقية مصمّمة للسوق القطري.',
  finalCtaButtonText: 'احصل على استشارة مجانية',

  workEyebrow: 'أعمالنا',
  workTitle: 'أعمال تسويقية مختارة من الدوحة',

  missionEyebrow: 'مهمتنا في قطر',
  missionTitle: 'أن نكون شريك التسويق الذي تثق به الشركات القطرية فعلاً.',
  missionText:
    'كل شركة قطرية تستحقّ شريكاً تسويقياً يفهم السوق المحلي، ويحترم العلاقة، ويقدّم نتائج قابلة للقياس. لسنا مصنعاً، ولسنا وسيطاً — نحن شريك حقيقي في نموّك.',

  footerText: 'M&M Marketing — شريكك الموثوق للتسويق في قطر.',

  proofEyebrow: 'بالأرقام',
}

const aboutPageAr: Record<string, string> = {
  eyebrow: 'عن الوكالة',
  title: 'نحن من أكثر وكالات التسويق موثوقيةً في قطر',
  subtitle:
    'M&M Marketing وكالة تسويق شاملة الخدمات مقرّها الدوحة، قطر. نساعد العلامات التجارية الطموحة على النموّ من خلال استراتيجيةٍ ذكية وتنفيذٍ محكم عبر تحسين محركات البحث، وتطوير المواقع، ووسائل التواصل الاجتماعي، والهوية التجارية، والإعلانات المدفوعة، وإنتاج الفيديو.',

  positioningTitle: 'لا نُسوّق فقط. نبني أنظمة نموّ للعلامات التجارية القطرية.',
  positioning:
    'شاركت M&M Marketing على مدى سنوات مع أكثر العلامات التجارية طموحاً في قطر — من قطاعات السيارات والعقارات إلى الضيافة والتعليم والتجزئة — لبناء أنظمة تسويقية تُدرّ إيراداتٍ باستمرار. يقوم منهجنا على معرفةٍ عميقة بالسوق المحلي، وتنفيذٍ ثنائي اللغة، وخبرةٍ متخصصة في كل تخصّصٍ تسويقي يحتاجه عملك.',

  missionEyebrow: 'مهمتنا',
  missionTitle: 'أن نكون شريك التسويق الذي تستحقّه الشركات القطرية.',
  missionText:
    'كل شركة قطرية تستحقّ شريكاً تسويقياً يفهم السوق المحلي، ويقدّم نتائج قابلة للقياس، ويتعامل مع نموّها كأنه نموّه. هذا ما نفعله — ولهذا يبقى عملاؤنا معنا لسنوات.',

  methodologyEyebrow: 'منهجيتنا',
  methodologyTitle: 'خبرةٌ محلية. معايير عالمية. نتائج قابلة للقياس.',
  methodologyText:
    'نجمع بين فهمٍ عميق للسوق القطري ومنهجية تسويقية عالمية المستوى. كل مشاركةٍ تبدأ بالاستراتيجية، وتُنفَّذ بانضباطٍ صارم، وتُقاس بمعايير نتائج الأعمال الحقيقية — لا بالمقاييس الشكلية.',

  principlesEyebrow: 'مبادئنا',
  principlesTitle: 'كيف نفكّر. كيف نُنفّذ.',

  ctaTitle: 'هل أنت جاهز للعمل مع أفضل وكالة تسويق في قطر؟',
  ctaText:
    'استشارة مجانية بلا التزام. أخبرنا عن عملك ونُوضّح لك بالتحديد كيف يمكننا مساعدتك.',
  ctaButtonText: 'احصل على استشارة مجانية',
}

const servicesPageAr: Record<string, string> = {
  eyebrow: 'خدمات التسويق في قطر',
  title: 'خدمات تسويقية متكاملة للشركات في قطر',
  subtitle:
    'من تحسين محركات البحث وتطوير المواقع، إلى وسائل التواصل الاجتماعي، والهوية التجارية، والإعلانات المدفوعة، وإنتاج الفيديو، والرسائل النصية الجماعية — كل ما تحتاجه شركة قطرية طموحة، تحت سقفٍ واحد.',
  intro:
    'M&M Marketing وكالة تسويق شاملة الخدمات في قطر. لا نُدير حملاتٍ منعزلة — نبني أنظمة تسويقية مترابطة حيث تعزّز كل خدمة تأثير الأخرى. اختر خدمة منفردة، أو ادمج عدّة خدمات في خطة نموّ متكاملة مصمَّمة لسوقك القطري وجمهورك وأهدافك التجارية.',
  ctaTitle: 'لست متأكداً من الخدمة المناسبة لك؟',
  ctaText:
    'احجز استشارة مجانية. سنُدقّق عملك، ونفهم أهدافك، ونوصي بالمزيج الأنسب من خدمات التسويق الذي يُنمّي إيراداتك بأسرع طريقة.',
  ctaButtonText: 'احصل على استشارة مجانية',
}

const contactPageAr: Record<string, string> = {
  eyebrow: 'اتصل بـ M&M Marketing',
  title: 'تواصل مع وكالة التسويق الموثوقة في قطر',
  subtitle:
    'M&M Marketing وكالة تسويق شاملة الخدمات في الدوحة. اتّصل بنا، راسِلنا، أو زُرنا — ونعود إليك خلال 24 ساعة بخطةٍ مبنية للسوق القطري. نخدم العلامات التجارية في جميع أنحاء قطر منذ اليوم الأول.',
  contactDetailsTitle: 'بيانات التواصل',
  formEyebrow: 'لنتحدّث',
  formTitle: 'أخبِرنا عن عملك',
  formSubtitle:
    'شاركنا أهدافك، ونعود إليك خلال 24 ساعة بخطة تسويقية مصمَّمة خصيصاً للسوق القطري. استشارة مجانية، بلا التزام.',
  formSubmitText: 'أرسِل الرسالة',
  ctaTagline: 'نموّك هو مهمّتنا.',
  ctaSubTagline: 'لنُحقّقه معاً في قطر.',
  ctaTitle: 'هل أنت جاهز لتنمية أعمالك في قطر؟',
  ctaText:
    'استشارة مجانية، بلا التزام. سيراجع أحد كبار مسوّقينا عملك، ويعود إليك خلال 24 ساعة بخطة مخصّصة.',
  ctaButtonText: 'احصل على استشارة مجانية',
  ctaButtonNote: 'بلا التزام. رد خلال 24 ساعة.',
}

const blogPageAr: Record<string, string> = {
  eyebrow: 'رؤى تسويقية',
  title: 'رؤى تسويقية للشركات القطرية',
  subtitle:
    'رؤى تسويقية عملية من وكالة التسويق الموثوقة في قطر. أدلة وتكتيكات ودراسات حالة حول تحسين محركات البحث، وتطوير المواقع، ووسائل التواصل الاجتماعي، والهوية التجارية، والإعلانات المدفوعة — مكتوبة خصّيصاً لشركات الدوحة.',
}

const faqsPageAr: Record<string, string> = {
  eyebrow: 'الأسئلة الشائعة',
  title: 'أسئلة شائعة حول التسويق في قطر',
  subtitle:
    'كل ما تودّ الشركات القطرية معرفته عن تحسين محركات البحث، وتطوير المواقع، وإدارة وسائل التواصل الاجتماعي، والهوية التجارية، والإعلانات المدفوعة — بإجاباتٍ من M&M Marketing، وكالة التسويق الموثوقة في الدوحة.',
}

const caseStudiesPageAr: Record<string, string> = {
  eyebrow: 'أعمالنا في قطر',
  title: 'شركات قطرية حقيقية. نموّ حقيقي وقابل للقياس.',
  subtitle:
    'اطّلع على دراسات حالة مختارة من علاماتٍ عملنا معها في الدوحة وجميع أنحاء قطر — قطاعات السيارات، العقارات، الضيافة، التعليم، التجزئة، والمزيد. تشمل كل دراسة حالة التحدّي، والاستراتيجية، والنتيجة القابلة للقياس.',
  cardCtaText: 'عرض دراسة الحالة ←',
}

const seoAuditPageAr: Record<string, string> = {
  eyebrow: 'تدقيق SEO مجاني',
  title: 'تدقيق SEO مجاني للمواقع القطرية',
  subtitle:
    'احصل على تقرير SEO شامل عن موقعك خلال 60 ثانية. SEO تقني، وتحسين على الصفحة، وأداء، وفرص السوق القطري — كل ذلك في تقريرٍ واحد. مجاني، فوري، بلا تسجيل مطلوب للاطّلاع على الملخّص.',
  widgetTitle: 'دقّق SEO موقعك القطري الآن',
}

const strategyFormAr: Record<string, string> = {
  eyebrow: 'استشارة تسويق مجانية',
  title: 'احصل على استشارة تسويق مجانية',
  subtitle:
    'أخبرنا عن عملك، ونعود إليك خلال 24 ساعة بخطة تسويقية مبنية خصّيصاً للسوق القطري.',
  submitText: 'احصل على استشارة مجانية',
  trustEyebrow: 'موثوقون من قِبل أبرز العلامات التجارية في قطر',
  processEyebrow: 'ما الذي يحدث لاحقاً',
  processTitle: 'إليك بالتحديد ما يمكنك توقّعه.',
  testimonialsEyebrow: 'آراء الشركات القطرية',
  testimonialsTitle: 'موثوقون من قِبل العلامات الطموحة في جميع أنحاء قطر.',
}

const navigationAr: Record<string, string> = {
  ctaText: 'استشارة مجانية',
  footerDescription:
    'وكالة تسويق شاملة الخدمات في قطر. SEO، وتطوير المواقع، وإدارة وسائل التواصل الاجتماعي، والهوية التجارية، والإعلانات المدفوعة، وإنتاج الفيديو — للعلامات المستعدّة للنموّ في الدوحة.',
  contactColumnTitle: 'تواصل معنا',
}

// ─────────────────────────────────────────────────────────────────────
//  Per-service Arabic — hero eyebrow + CTA buttons + form section
// ─────────────────────────────────────────────────────────────────────
const serviceAr: Record<string, Record<string, string>> = {
  seo: {
    heroEyebrow: 'خدمة من M&M',
    heroCtaButtonText: 'احصل على تدقيق SEO مجاني',
    finalCtaButtonText: 'احصل على تدقيق SEO مجاني',
    formTitle: 'احجز مكالمة SEO المجانية',
    formSubtitle:
      'أخبرنا بنطاق موقعك وكلماتك المستهدفة، ونعود إليك خلال 24 ساعة بخطة SEO مصمّمة لعملك.',
    ctaTitle: 'هل أنت جاهز لتصدُّر الصفحة الأولى؟',
    ctaText:
      'تدقيق SEO مجاني لمدة 30 دقيقة. سنُوضّح لك بالتحديد الكلمات التي يتصدّرها منافسوك، وحجم الفجوة، ومسار الـ 6 أشهر القادمة.',
  },
  'web-development': {
    heroEyebrow: 'خدمة من M&M',
    heroCtaButtonText: 'خطّط لموقعي',
    finalCtaButtonText: 'خطّط لموقعي',
    formTitle: 'خطّط لموقعك الجديد',
    formSubtitle:
      'شاركنا أهدافك وجدولك الزمني، ويرد فريقنا خلال 24 ساعة بعرضٍ محدَّد النطاق.',
    ctaTitle: 'هل أنت جاهز لموقع يبيع فعلاً؟',
    ctaText:
      'أخبرنا عن عملك وأهدافك، ونعود إليك خلال 24 ساعة بعرضٍ مفصَّل، وجدولٍ زمني، ونماذج من ثلاثة مواقع مماثلة أطلقناها في قطر.',
  },
  'social-media': {
    heroEyebrow: 'خدمة من M&M',
    heroCtaButtonText: 'دقِّق حساباتي',
    finalCtaButtonText: 'دقِّق حسابات التواصل الاجتماعي',
    formTitle: 'احجز تدقيقاً مجانياً لوسائل التواصل الاجتماعي',
    formSubtitle:
      'أخبرنا عن علامتك التجارية وجمهورك، ونعيد إليك خطة محتوى ونموّ خلال 24 ساعة.',
    ctaTitle: 'هل أنت جاهز لتظهر بشكلٍ حيوي على الإنترنت؟',
    ctaText:
      'احجز تدقيقاً مجانياً لحساباتك. نُوضّح لك بالتحديد ما يعمل، وما لا يعمل، وأسرع طريق للحصول على عملاء محتملين مؤهَّلين من وسائل التواصل الاجتماعي.',
  },
  branding: {
    heroEyebrow: 'خدمة من M&M',
    heroCtaButtonText: 'ابدأ هويّتي التجارية',
    finalCtaButtonText: 'ابدأ استراتيجية هويّتي',
    formTitle: 'ابدأ استراتيجية علامتك التجارية',
    formSubtitle:
      'أخبرنا بحالة علامتك التجارية اليوم، ونرد خلال 24 ساعة بخارطة طريقٍ للتموضع.',
    ctaTitle: 'هل أنت جاهز لتكون العلامة التي تستحقّ الاختيار؟',
    ctaText:
      'أخبرنا بحالة علامتك التجارية اليوم، ونرسل لك تدقيقاً شاملاً، وخارطة طريق للتموضع، ونماذج من ثلاث علامات قطرية بنيناها — خلال 24 ساعة.',
  },
  'paid-ads': {
    heroEyebrow: 'خدمة من M&M',
    heroCtaButtonText: 'احصل على خطة الإعلانات',
    finalCtaButtonText: 'احصل على خطة الإعلانات المدفوعة',
    formTitle: 'احصل على خطة الإعلانات المدفوعة',
    formSubtitle:
      'شاركنا أهدافك وميزانيتك الإعلانية الحالية، ونرسل لك خطة إعلامية خلال 24 ساعة.',
    ctaTitle: 'هل أنت جاهز لإعلانات تُدرّ إيراداتٍ فعلية؟',
    ctaText:
      'تدقيق مجاني للإعلانات المدفوعة لمدة 30 دقيقة. شاركنا أهدافك وميزانيتك، ونعود إليك خلال 24 ساعة بخطة إعلامية ونطاق ROAS متوقَّع وأوّل ثلاثة مفاهيم إبداعية للاختبار.',
  },
  'bulk-sms': {
    heroEyebrow: 'خدمة من M&M',
    heroCtaButtonText: 'خطّط لحملتي',
    finalCtaButtonText: 'خطّط لحملة الرسائل النصية',
    formTitle: 'خطّط لحملة الرسائل النصية الخاصة بك',
    formSubtitle:
      'أخبرنا بحجم جمهورك وعرضك، ونرسل خطة حملة، وإعداد معرِّف مرسِل، وتقديراً لمعدّلات الفتح والنقر المتوقّعة خلال 24 ساعة.',
    ctaTitle: 'هل أنت جاهز للوصول إلى عملائك فعلياً؟',
    ctaText:
      'أخبرنا بحجم جمهورك وعرضك، ونرسل خطة حملةٍ متكاملة، مع تقديرٍ لمعدّلات الفتح والنقر خلال 24 ساعة.',
  },
  videography: {
    heroEyebrow: 'خدمة من M&M',
    heroCtaButtonText: 'خطّط لمشروع الفيديو',
    finalCtaButtonText: 'خطّط لمشروع الفيديو',
    formTitle: 'خطّط لمشروع الفيديو الخاص بك',
    formSubtitle:
      'أخبرنا عن مشروعك — فيلم علامة تجارية، حملة منتج، تغطية فعالية، أو سلسلة اجتماعية — ونعود إليك بتوجيهٍ إبداعي، وميزانية محدَّدة النطاق، وجدولٍ زمني خلال 24 ساعة.',
    ctaTitle: 'جاهز لتصوير محتوى يُحقّق نتائج؟',
    ctaText:
      'لنُخطّط لمشروع فيديو يجذب الانتباه، ويحافظ عليه، ويحوّله إلى نموّ تجاري قابل للقياس.',
  },
  'ai-llmo-geo': {
    heroEyebrow: 'خدمة من M&M',
    heroCtaButtonText: 'دقِّق ظهوري في الذكاء الاصطناعي',
    finalCtaButtonText: 'دقِّق ظهوري في الذكاء الاصطناعي',
    formTitle: 'احجز تدقيق الظهور في الذكاء الاصطناعي',
    formSubtitle:
      'أخبرنا عن علامتك التجارية، ونرسل لك تقريراً مجانياً عن ظهورك في LLM/GEO خلال 24 ساعة.',
    ctaTitle: 'هل تريد أن تكون العلامة التي يوصي بها الذكاء الاصطناعي؟',
    ctaText:
      'لنتأكّد أنّه عندما يسأل شخصٌ ما مساعدَ ذكاءٍ اصطناعي عن فئة عملك، يظهر اسمك أوّلاً.',
  },
}

// ─────────────────────────────────────────────────────────────────────
//  Run
// ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Applying Qatari-Arabic translations across every doc…')

  // Look up every singleton by _type — handles both "homepage"-id and
  // auto-generated-id docs.
  const singletons: Array<[string, Record<string, string>]> = [
    ['homepage', homepageAr],
    ['aboutPage', aboutPageAr],
    ['servicesPage', servicesPageAr],
    ['contactPage', contactPageAr],
    ['blogPage', blogPageAr],
    ['faqsPage', faqsPageAr],
    ['caseStudiesPage', caseStudiesPageAr],
    ['seoAuditPage', seoAuditPageAr],
    ['strategyForm', strategyFormAr],
  ]
  const singletonTypes = singletons.map(([t]) => t)
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

  for (const [type, fields] of singletons) {
    const ids = idsByType.get(type) || []
    if (ids.length === 0) {
      console.warn(`  ! No ${type} doc — skipping`)
      continue
    }
    for (const id of ids) {
      console.log(`  • ${type} (${id})`)
      const [op] = await patchWithArabic(id, fields)
      tx.patch(id, (p) => p.set(op.setObj as any))
    }
  }

  // Navigation may not use the singleton id "navigation" — patch by _type
  const navDocs: Array<{_id: string}> = await client.fetch(`*[_type == "navigation"]{ _id }`)
  for (const doc of navDocs) {
    console.log(`  • navigation (${doc._id})`)
    const [op] = await patchWithArabic(doc._id, navigationAr)
    tx.patch(op.docId, (p) => p.set(op.setObj as any))
  }

  // Per-service Arabic
  const serviceDocs: Array<{_id: string; slug: {current: string}}> = await client.fetch(
    `*[_type == "service" && slug.current in $slugs]{ _id, slug }`,
    {slugs: Object.keys(serviceAr)},
  )
  for (const doc of serviceDocs) {
    const fields = serviceAr[doc.slug.current]
    if (!fields) continue
    console.log(`  • service: ${doc.slug.current}`)
    const [op] = await patchWithArabic(doc._id, fields)
    tx.patch(op.docId, (p) => p.set(op.setObj as any))
  }

  console.log('\nCommitting…')
  const res = await tx.commit()
  console.log(`Done. ${res.results.length} operations applied ✓`)
  console.log('\nReload /ar to see the new Arabic copy.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
