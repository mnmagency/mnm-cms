/**
 * Web Development Qatar landing page (/lp/web-development-qatar), rebuilt to
 * the AI-visible landing page structure:
 *
 *   entity-based H1 + authority subhead + CTA  →  real portfolio showcase
 *   →  client logos  →  problem as a question  →  solution as the answer
 *   →  outcomes  →  cited value figures  →  projects  →  process
 *   →  ways to work (no prices)  →  free review offer + exit intent
 *   →  FAQ  →  form + human support  →  final CTA  +  mobile sticky CTA
 *
 * House rules: humanised copy, no long dashes, no prices, CMS kept generic
 * ("headless CMS"), Qatar / Doha keywords, 6 to 10 weeks timeline.
 *
 * Images: seed-assets/lp/*.webp (uploaded as WebP).
 * Hero video: downloaded from Higgsfield and uploaded as an MP4 file asset.
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-lp-webdev.ts --with-user-token
 *
 * Safe to re-run: images are only uploaded once (matched by filename).
 */
/* eslint-disable no-console */

import {createReadStream, existsSync} from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

const LP_ID = 'landingPage-web-development-qatar'
const ASSET_DIR = path.join(process.cwd(), 'seed-assets', 'lp')
const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39RVZ1ogTSmENu6VlNxSUkpnWMM/hf_20261018_065035_b71cb7c2-2c85-4d98-a1c1-035e7a0f3d9f.mp4'
const PROJECT_IDS = ['webProject-denza-qatar', 'webProject-yangwang-qatar', 'webProject-hec-mannai', 'webProject-icc-qatar']

// ─── helpers ───────────────────────────────────────────────────────────
let k = 0
const key = () => `lp${(++k).toString(36)}${Date.now().toString(36).slice(-4)}`
const withKeys = <T extends object>(arr: T[]) => arr.map((x) => ({_key: key(), ...x}))
const locs = (arr: Loc[]) => arr.map((x) => ({_key: key(), _type: 'localeString', ...x}))

async function imageAsset(file: string) {
  const filename = `lp-webdev-${file}`
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $f][0]._id`,
    {f: filename},
  )
  if (existing) return existing
  const p = path.join(ASSET_DIR, file)
  if (!existsSync(p)) throw new Error(`Missing ${p}`)
  const a = await client.assets.upload('image', createReadStream(p), {filename, contentType: 'image/webp'})
  console.log(`  ↑ uploaded ${filename}`)
  return a._id
}

async function videoAsset() {
  const filename = 'lp-webdev-hero-doha.mp4'
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.fileAsset" && originalFilename == $f][0]._id`,
    {f: filename},
  )
  if (existing) return existing
  try {
    const res = await fetch(HERO_VIDEO_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const a = await client.assets.upload('file', buf, {filename, contentType: 'video/mp4'})
    console.log(`  ↑ uploaded ${filename} (${Math.round(buf.length / 1024)} KB)`)
    return a._id
  } catch (e) {
    console.warn(`  ! hero video skipped (${(e as Error).message}); the background image is used instead`)
    return null
  }
}

const img = (id: string, alt?: Loc) => ({_type: 'image', asset: {_type: 'reference', _ref: id}, ...(alt ? {alt} : {})})

// ─── copy ──────────────────────────────────────────────────────────────
async function run() {
  console.log('Uploading assets…')
  const [heroBg, problemImg, solutionImg, offerImg, video] = await Promise.all([
    imageAsset('hero-bg.webp'),
    imageAsset('problem.webp'),
    imageAsset('solution.webp'),
    imageAsset('offer.webp'),
    videoAsset(),
  ])

  const existingProjects = await client.fetch<string[]>(`*[_id in $ids]._id`, {ids: PROJECT_IDS})
  const projects = PROJECT_IDS.filter((id) => existingProjects.includes(id))

  const doc = {
    seo: {
      _type: 'seo',
      metaTitle: L('Web Development Company in Qatar | Website Design Doha | M&M', 'شركة تطوير مواقع في قطر | تصميم مواقع في الدوحة | M&M'),
      metaDescription: L(
        'Web design and development in Qatar. Fast English and Arabic websites on a headless CMS or WordPress, built in Doha to rank on Google and AI search. Proposal in 24 hours.',
        'تصميم وتطوير مواقع في قطر. مواقع سريعة بالعربية والإنجليزية على نظام إدارة محتوى Headless أو WordPress، نبنيها في الدوحة لتظهر في Google والبحث بالذكاء الاصطناعي. عرض خلال 24 ساعة.',
      ),
      focusKeyword: L('web development qatar', 'تطوير مواقع قطر'),
    },

    hero: {
      eyebrow: L('Web development in Qatar', 'تطوير المواقع في قطر'),
      title: L(
        'Fast, bilingual websites that bring Qatar businesses real enquiries',
        'مواقع سريعة وثنائية اللغة تجلب للشركات في قطر استفسارات حقيقية',
      ),
      subtitle: L(
        'We are a web design and development team in Doha. We build English and Arabic websites on a headless CMS or WordPress that load in under two seconds, show up on Google and AI search, and make it easy for customers to get in touch.',
        'نحن فريق تصميم وتطوير مواقع في الدوحة. نبني مواقع بالعربية والإنجليزية على نظام إدارة محتوى Headless أو WordPress، تُحمَّل في أقل من ثانيتين، وتظهر في Google والبحث بالذكاء الاصطناعي، وتسهّل على العملاء التواصل معك.',
      ),
      ctaText: L('Get a proposal in 24 hours', 'احصل على عرض خلال 24 ساعة'),
      secondaryText: L('See our work', 'شاهد أعمالنا'),
      trustNote: L('Free consultation · No obligation · Reply within 24 hours', 'استشارة مجانية · دون أي التزام · رد خلال 24 ساعة'),
      showcase: true,
      backgroundImage: img(heroBg, L('Doha West Bay skyline at blue hour', 'أفق الخليج الغربي في الدوحة عند الغسق')),
      ...(video ? {backgroundVideo: {_type: 'file', asset: {_type: 'reference', _ref: video}}} : {}),
      stats: withKeys([
        {value: L('15 years', '15 عاماً'), label: L('building for brands in Qatar', 'في العمل مع العلامات التجارية في قطر')},
        {value: L('EN + AR', 'عربي + إنجليزي'), label: L('designed together from day one', 'نصممهما معاً من اليوم الأول')},
        {value: L('6 to 10 weeks', '6 إلى 10 أسابيع'), label: L('for a typical company website', 'لموقع شركة نموذجي')},
      ]),
    },

    authority: {
      title: L('Trusted by brands across Qatar', 'علامات تجارية في قطر تثق بنا'),
      useHomepageLogos: true,
      badges: locs([
        L('Team based in Doha', 'فريقنا في الدوحة'),
        L('English and Arabic in-house', 'العربية والإنجليزية داخل الفريق'),
        L('Headless CMS, Node.js and WordPress', 'Headless CMS وNode.js وWordPress'),
        L('You own the code and content', 'تملك الكود والمحتوى'),
      ]),
    },

    problem: {
      eyebrow: L('The problem', 'المشكلة'),
      question: L("Why isn't my website bringing in enquiries?", 'لماذا لا يجلب موقعي استفسارات؟'),
      answer: L(
        'Usually because it is slow on mobile, awkward in Arabic, hard to find on Google and AI search, or unclear about what to do next. Almost everyone in Qatar is online, so customers compare you with competitors in seconds. If your site feels dated or takes more than a few seconds to load, they simply tap the next result.',
        'غالباً لأنه بطيء على الجوال، أو غير مريح بالعربية، أو يصعب العثور عليه في Google والبحث بالذكاء الاصطناعي، أو لا يوضح للزائر ما الخطوة التالية. الجميع تقريباً في قطر متصل بالإنترنت، والعملاء يقارنونك بمنافسيك خلال ثوانٍ. وإن بدا موقعك قديماً أو تأخر تحميله أكثر من بضع ثوانٍ، ينتقلون ببساطة إلى النتيجة التالية.',
      ),
      points: locs([
        L('Pages take five seconds or more to load on a phone', 'الصفحات تستغرق خمس ثوانٍ أو أكثر على الجوال'),
        L('The Arabic version feels like an afterthought', 'النسخة العربية تبدو وكأنها أُضيفت لاحقاً'),
        L('You rarely appear when people search for what you sell', 'نادراً ما تظهر حين يبحث الناس عمّا تبيعه'),
        L('Nobody answers when you need a small change', 'لا أحد يرد حين تحتاج تعديلاً بسيطاً'),
      ]),
      image: img(problemImg, L('Business owner in Doha waiting for a slow website to load on his phone', 'صاحب عمل في الدوحة ينتظر تحميل موقع بطيء على هاتفه')),
    },

    solution: {
      eyebrow: L('The answer', 'الحل'),
      question: L('What does a website that actually works look like?', 'كيف يبدو الموقع الذي يعمل فعلاً؟'),
      answer: L(
        'It loads in under two seconds, reads naturally in English and Arabic, and answers the questions your customers ask Google and AI assistants. Every page leads somewhere clear: a call, a WhatsApp message, a booking or a quote request. And your team can update it without calling a developer.',
        'يُحمَّل في أقل من ثانيتين، ويُقرأ بسلاسة بالعربية والإنجليزية، ويجيب عن الأسئلة التي يطرحها عملاؤك على Google ومساعدي الذكاء الاصطناعي. كل صفحة تقود إلى خطوة واضحة: اتصال أو رسالة واتساب أو حجز أو طلب عرض سعر. ويستطيع فريقك تحديثه دون الحاجة إلى مطوّر.',
      ),
      points: locs([
        L('Built on a headless CMS and Next.js, or WordPress when it fits', 'مبني على نظام إدارة محتوى Headless وNext.js، أو WordPress حين يكون الأنسب'),
        L('Structured data so Google and AI search understand your business', 'بيانات منظمة تساعد Google والبحث بالذكاء الاصطناعي على فهم عملك'),
        L('Enquiries go straight to your CRM, inbox or WhatsApp', 'الاستفسارات تصل مباشرة إلى CRM أو بريدك أو واتساب'),
        L('Designed, built and supported by one team in Doha', 'يصممه ويبنيه ويدعمه فريق واحد في الدوحة'),
      ]),
      image: img(solutionImg, L('M&M web design team in Doha reviewing a bilingual website design', 'فريق تصميم المواقع في M&M بالدوحة يراجع تصميم موقع ثنائي اللغة')),
    },

    includes: {
      eyebrow: L('What you get', 'ما تحصل عليه'),
      title: L('Not just features. What they do for your business.', 'ليست مجرد ميزات، بل ما تقدمه لعملك.'),
      subtitle: L(
        'Every website we build in Qatar comes with the things that turn visitors into customers.',
        'كل موقع نبنيه في قطر يأتي مع ما يحوّل الزوار إلى عملاء.',
      ),
      items: withKeys([
        {title: L('More enquiries from the same traffic', 'استفسارات أكثر من الزيارات نفسها'), description: L('Clear calls to action, short forms and WhatsApp on every page, so interested visitors actually get in touch.', 'دعوات واضحة لاتخاذ إجراء ونماذج قصيرة وواتساب في كل صفحة، ليتواصل معك الزائر المهتم فعلاً.')},
        {title: L('Found on Google and AI search', 'تظهر في Google والبحث بالذكاء الاصطناعي'), description: L('Local SEO for Qatar, structured data and content written the way people ask questions.', 'SEO محلي لقطر وبيانات منظمة ومحتوى مكتوب بالطريقة التي يطرح بها الناس أسئلتهم.')},
        {title: L('Customers in both languages', 'عملاء باللغتين'), description: L('English and Arabic designed together, with proper right-to-left layouts and copy that reads naturally.', 'العربية والإنجليزية بتصميم واحد منذ البداية، مع اتجاه صحيح من اليمين إلى اليسار ونص يُقرأ بطبيعية.')},
        {title: L('Fast on every phone', 'سريع على كل هاتف'), description: L('Pages that load in under two seconds on mobile networks in Qatar, so people stay instead of leaving.', 'صفحات تُحمَّل في أقل من ثانيتين على شبكات الجوال في قطر، فيبقى الزائر بدلاً من المغادرة.')},
        {title: L('Your team stays in control', 'فريقك يبقى متحكماً'), description: L('Edit pages, products, offers and news yourself. No waiting on a developer for small changes.', 'عدّل الصفحات والمنتجات والعروض والأخبار بنفسك، دون انتظار مطوّر للتعديلات البسيطة.')},
        {title: L('Decisions based on data', 'قرارات مبنية على البيانات'), description: L('Analytics and conversion tracking that show which pages and channels bring in business.', 'تحليلات وتتبع للتحويلات يوضح أي الصفحات والقنوات تجلب لك الأعمال.')},
      ]),
    },

    value: {
      eyebrow: L('Why it pays back', 'لماذا يستحق الاستثمار'),
      title: L('Your website is your hardest working salesperson', 'موقعك هو أكثر موظفي المبيعات اجتهاداً'),
      subtitle: L(
        'It works every hour of every day. In a market where nearly everyone is online, small improvements in speed and clarity turn into real enquiries.',
        'يعمل في كل ساعة من كل يوم. وفي سوق يكاد الجميع فيه متصلاً بالإنترنت، تتحول التحسينات البسيطة في السرعة والوضوح إلى استفسارات حقيقية.',
      ),
      items: withKeys([
        {
          value: L('99%', '99%'),
          label: L('of people in Qatar use the internet. Your customers are already looking for you online.', 'من سكان قطر يستخدمون الإنترنت. عملاؤك يبحثون عنك عبر الإنترنت بالفعل.'),
          source: L('DataReportal, Digital 2026: Qatar', 'DataReportal، تقرير Digital 2026: قطر'),
          sourceUrl: 'https://datareportal.com/reports/digital-2026-qatar',
        },
        {
          value: L('53%', '53%'),
          label: L('of mobile visitors leave a page that takes longer than three seconds to load.', 'من زوار الجوال يغادرون الصفحة إذا تأخر تحميلها أكثر من ثلاث ثوانٍ.'),
          source: L('Google / SOASTA research', 'أبحاث Google / SOASTA'),
          sourceUrl: 'https://blog.amp.dev/2017/02/28/new-industry-benchmarks-for-mobile-page-speed/',
        },
        {
          value: L('94%', '94%'),
          label: L('of Qatar’s population is on social media. Your ads and posts send those people to your website.', 'من سكان قطر على وسائل التواصل الاجتماعي. إعلاناتك ومنشوراتك ترسلهم إلى موقعك.'),
          source: L('DataReportal, Digital 2026: Qatar', 'DataReportal، تقرير Digital 2026: قطر'),
          sourceUrl: 'https://datareportal.com/reports/digital-2026-qatar',
        },
      ]),
    },

    featuredWebProjects: projects.map((id) => ({_key: id.replace('webProject-', ''), _type: 'reference', _ref: id})),
    projectsSection: {
      eyebrow: L('Our work', 'أعمالنا'),
      title: L('Websites we have built in Qatar and the region', 'مواقع بنيناها في قطر والمنطقة'),
      subtitle: L(
        'From car configurators to institutional platforms, built on a headless CMS, Node.js, WordPress and Laravel.',
        'من أدوات تكوين السيارات إلى المنصات المؤسسية، مبنية على Headless CMS وNode.js وWordPress وLaravel.',
      ),
      linkText: L('See the project →', 'شاهد المشروع ←'),
      allText: L('View full portfolio', 'عرض كل الأعمال'),
    },

    process: {
      eyebrow: L('How it works', 'كيف نعمل'),
      title: L('From first call to launch in 6 to 10 weeks', 'من أول مكالمة إلى الإطلاق خلال 6 إلى 10 أسابيع'),
      steps: withKeys([
        {title: L('Discovery call', 'مكالمة تعارف'), description: L('We learn your goals, customers and competitors, and agree what success looks like.', 'نتعرّف على أهدافك وعملائك ومنافسيك، ونتفق على معنى النجاح.')},
        {title: L('Plan and proposal', 'الخطة والعرض'), description: L('You get a sitemap, timeline and itemised proposal within 24 hours of the call.', 'تحصل على خريطة الموقع والجدول الزمني وعرض مفصّل خلال 24 ساعة من المكالمة.')},
        {title: L('Design in English and Arabic', 'التصميم بالعربية والإنجليزية'), description: L('Both languages designed together. You review real pages, not just mood boards.', 'نصمم اللغتين معاً، وتراجع صفحات حقيقية لا مجرد لوحات إلهام.')},
        {title: L('Build and connect', 'البناء والربط'), description: L('We build the site and connect your CRM, forms, WhatsApp, payments or ERP.', 'نبني الموقع ونربطه بـ CRM والنماذج وواتساب والدفع أو نظام ERP.')},
        {title: L('Test and launch', 'الاختبار والإطلاق'), description: L('Speed, SEO, devices and both languages are checked before we go live.', 'نفحص السرعة وSEO والأجهزة واللغتين قبل الإطلاق.')},
        {title: L('30 days of tuning', '30 يوماً من الضبط'), description: L('We watch how real visitors use the site and improve what needs improving.', 'نراقب كيف يستخدم الزوار الحقيقيون الموقع ونحسّن ما يحتاج إلى تحسين.')},
      ]),
    },

    pricing: {
      show: true,
      eyebrow: L('Ways to work with us', 'طرق العمل معنا'),
      title: L('Pick the kind of website you need', 'اختر نوع الموقع الذي تحتاجه'),
      subtitle: L(
        'Every project is scoped to your goals, so you only pay for what you need.',
        'نحدد نطاق كل مشروع حسب أهدافك، لتدفع فقط مقابل ما تحتاجه.',
      ),
      footnote: L(
        'Send us your brief and you will have a clear, itemised proposal within 24 hours. No surprises later.',
        'أرسل لنا تفاصيل مشروعك وستحصل على عرض واضح ومفصّل خلال 24 ساعة، دون مفاجآت لاحقاً.',
      ),
      tiers: withKeys([
        {
          name: L('Company website', 'موقع شركة'),
          description: L('For businesses that want to look credible and win more enquiries.', 'للشركات التي تريد حضوراً موثوقاً واستفسارات أكثر.'),
          features: locs([
            L('English and Arabic', 'العربية والإنجليزية'),
            L('Up to 15 pages, editable by your team', 'حتى 15 صفحة يعدّلها فريقك'),
            L('Local SEO and structured data', 'SEO محلي وبيانات منظمة'),
            L('Forms, WhatsApp and analytics', 'نماذج وواتساب وتحليلات'),
          ]),
          ctaText: L('Get a proposal', 'احصل على عرض'),
          popular: true,
        },
        {
          name: L('Online store', 'متجر إلكتروني'),
          description: L('For brands selling in Qatar and the GCC.', 'للعلامات التي تبيع في قطر ودول الخليج.'),
          features: locs([
            L('Product catalogue in both languages', 'كتالوج منتجات باللغتين'),
            L('Local payment gateways', 'بوابات دفع محلية'),
            L('Delivery and stock rules', 'قواعد التوصيل والمخزون'),
            L('Order and customer emails', 'رسائل الطلبات والعملاء'),
          ]),
          ctaText: L('Get a proposal', 'احصل على عرض'),
          popular: false,
        },
        {
          name: L('Custom platform', 'منصة مخصصة'),
          description: L('For configurators, portals and sites connected to your systems.', 'لأدوات التكوين والبوابات والمواقع المرتبطة بأنظمتك.'),
          features: locs([
            L('Node.js integrations', 'تكاملات Node.js'),
            L('CRM and ERP connections', 'الربط مع CRM وERP'),
            L('Configurators and member areas', 'أدوات تكوين ومناطق أعضاء'),
            L('Built to grow with you', 'مبنية لتنمو معك'),
          ]),
          ctaText: L('Get a proposal', 'احصل على عرض'),
          popular: false,
        },
      ]),
    },

    offer: {
      show: true,
      eyebrow: L('Free website review', 'مراجعة مجانية لموقعك'),
      title: L('Not ready for a new website? Start with a free review.', 'لست مستعداً لموقع جديد؟ ابدأ بمراجعة مجانية.'),
      text: L(
        'Send us your current site and we will tell you, in plain language, what is holding it back and what to fix first.',
        'أرسل لنا رابط موقعك الحالي وسنخبرك بلغة واضحة بما يعيقه وما الذي يجب إصلاحه أولاً.',
      ),
      points: locs([
        L('Speed on mobile networks in Qatar', 'السرعة على شبكات الجوال في قطر'),
        L('How you show up on Google and AI search', 'كيف تظهر في Google والبحث بالذكاء الاصطناعي'),
        L('Arabic and right-to-left quality', 'جودة النسخة العربية والاتجاه من اليمين إلى اليسار'),
        L('Where visitors drop off before contacting you', 'أين يغادر الزوار قبل التواصل معك'),
      ]),
      buttonText: L('Get my free review', 'أريد مراجعة مجانية'),
      formTag: 'Free Website Review (Web Development Qatar LP)',
      image: img(offerImg, L('Laptop and phone showing a rising performance chart', 'حاسوب وهاتف يعرضان منحنى أداء صاعداً')),
      exitIntent: true,
      popupTitle: L('Before you go: want a free review of your website?', 'قبل أن تغادر: هل تريد مراجعة مجانية لموقعك؟'),
      popupText: L(
        'We will check speed, Google and AI visibility, Arabic and conversions, and send you a short list of what to fix first. No obligation.',
        'سنفحص السرعة والظهور في Google والبحث بالذكاء الاصطناعي والنسخة العربية والتحويلات، ونرسل لك قائمة قصيرة بما يجب إصلاحه أولاً. دون أي التزام.',
      ),
      popupDismissText: L('No thanks', 'لا شكراً'),
    },

    faqs: {
      eyebrow: L('Questions', 'أسئلة'),
      title: L('Web development in Qatar: common questions', 'تطوير المواقع في قطر: أسئلة شائعة'),
      items: withKeys([
        {
          question: L('How much does a website cost in Qatar?', 'كم تكلفة الموقع في قطر؟'),
          answer: L(
            'It depends on how many pages and languages you need, any custom features, integrations with systems like your CRM, ERP or payments, and whether you want an online store. We do not use a fixed price list. Send us your brief and we will reply within 24 hours with a clear, itemised proposal.',
            'تعتمد على عدد الصفحات واللغات، وأي ميزات مخصصة، والتكامل مع أنظمة مثل CRM وERP والدفع، وما إذا كنت تريد متجراً إلكترونياً. لا نعتمد قائمة أسعار ثابتة. أرسل لنا تفاصيل مشروعك وسنرد خلال 24 ساعة بعرض واضح ومفصّل.',
          ),
        },
        {
          question: L('How long does it take to build a website?', 'كم يستغرق بناء الموقع؟'),
          answer: L(
            'A typical company website takes 6 to 10 weeks. Online stores and larger platforms take 10 to 16 weeks. You see real progress every two weeks.',
            'يستغرق موقع الشركة النموذجي من 6 إلى 10 أسابيع، والمتاجر الإلكترونية والمنصات الأكبر من 10 إلى 16 أسبوعاً. وسترى تقدماً حقيقياً كل أسبوعين.',
          ),
        },
        {
          question: L('Should I choose WordPress or a headless CMS?', 'هل أختار WordPress أم نظام إدارة محتوى Headless؟'),
          answer: L(
            'WordPress suits simple sites and teams that already know it. A headless CMS with Next.js is faster, more secure and easier to connect to other systems, which is why it is our default for most projects. We recommend whichever fits your goals and budget.',
            'يناسب WordPress المواقع البسيطة والفرق التي تعرفه مسبقاً. أما نظام إدارة المحتوى Headless مع Next.js فهو أسرع وأكثر أماناً وأسهل في الربط مع الأنظمة الأخرى، ولهذا نعتمده في معظم المشاريع. ونوصي دائماً بما يناسب أهدافك وميزانيتك.',
          ),
        },
        {
          question: L('Do you build websites in Arabic and English?', 'هل تبنون مواقع بالعربية والإنجليزية؟'),
          answer: L(
            'Yes. Both languages are designed together from the start, with proper right-to-left layouts, Arabic typography and separate SEO for each language.',
            'نعم. نصمم اللغتين معاً منذ البداية، مع اتجاه صحيح من اليمين إلى اليسار وخطوط عربية مناسبة وSEO منفصل لكل لغة.',
          ),
        },
        {
          question: L('Will my website show up on Google and AI search?', 'هل سيظهر موقعي في Google والبحث بالذكاء الاصطناعي؟'),
          answer: L(
            'We build every site to be found: fast pages, clean code, structured data, local SEO for Qatar and content that answers real questions. We also make sure AI assistants like ChatGPT, Gemini and Perplexity can read your site.',
            'نبني كل موقع ليُعثر عليه: صفحات سريعة وكود نظيف وبيانات منظمة وSEO محلي لقطر ومحتوى يجيب عن أسئلة حقيقية. ونتأكد أيضاً من أن مساعدي الذكاء الاصطناعي مثل ChatGPT وGemini وPerplexity يستطيعون قراءة موقعك.',
          ),
        },
        {
          question: L('Can you redesign my website without losing my Google rankings?', 'هل يمكنكم إعادة تصميم موقعي دون خسارة ترتيبي في Google؟'),
          answer: L(
            'Yes. We map every old page to its new address, keep what already ranks and set up redirects before launch, then watch Search Console closely in the weeks after.',
            'نعم. نربط كل صفحة قديمة بعنوانها الجديد، ونحافظ على ما يحقق ترتيباً جيداً، ونجهّز التحويلات قبل الإطلاق، ثم نراقب Search Console عن قرب في الأسابيع التالية.',
          ),
        },
        {
          question: L('Do I own the website?', 'هل أملك الموقع؟'),
          answer: L(
            'Yes. You own the domain, the code, the content and the CMS accounts. There is no lock-in.',
            'نعم. تملك النطاق والكود والمحتوى وحسابات نظام إدارة المحتوى، دون أي قيود.',
          ),
        },
        {
          question: L('What happens after launch?', 'ماذا بعد الإطلاق؟'),
          answer: L(
            'Every site includes 30 days of tuning. After that you can choose a support plan for hosting, updates, security and improvements, or hand the site over to your own team.',
            'يشمل كل موقع 30 يوماً من الضبط بعد الإطلاق. بعدها يمكنك اختيار خطة دعم للاستضافة والتحديثات والأمان والتحسينات، أو تسليم الموقع لفريقك.',
          ),
        },
      ]),
    },

    form: {
      eyebrow: L('Free consultation', 'استشارة مجانية'),
      title: L('Tell us about your website', 'أخبرنا عن موقعك'),
      subtitle: L(
        'Share a few details and we will reply within 24 hours with next steps and an honest view of what you need.',
        'شاركنا بعض التفاصيل وسنرد خلال 24 ساعة بالخطوات التالية ورأي صريح فيما تحتاجه.',
      ),
      submitText: L('Send my request', 'أرسل طلبي'),
    },

    support: {
      title: L('Prefer to talk to a person?', 'تفضّل التحدث مع شخص؟'),
      text: L(
        'Message or call our team in Doha. You will speak with someone who builds websites, not a call centre.',
        'راسل فريقنا في الدوحة أو اتصل به. ستتحدث مع شخص يبني المواقع، لا مع مركز اتصال.',
      ),
      whatsappText: L('Chat on WhatsApp', 'تحدث عبر واتساب'),
      whatsappMessage: L("Hi M&M, I'd like to talk about a new website.", 'مرحباً M&M، أود التحدث عن موقع جديد.'),
      callText: L('Call us', 'اتصل بنا'),
    },

    finalCta: {
      eyebrow: L('Ready when you are', 'جاهزون متى شئت'),
      title: L('Let’s build a website that earns its keep.', 'لنبنِ موقعاً يستحق استثمارك.'),
      subtitle: L(
        'Book a free 30-minute call. We will tell you what your site needs, with no sales pitch.',
        'احجز مكالمة مجانية مدتها 30 دقيقة. سنخبرك بما يحتاجه موقعك، دون أسلوب بيع.',
      ),
      buttonText: L('Get a proposal in 24 hours', 'احصل على عرض خلال 24 ساعة'),
    },

    stickyCta: {show: true, text: L('Get a proposal', 'احصل على عرض')},
  }

  if (/[—–]/.test(JSON.stringify(doc))) throw new Error('Long dash found in copy')

  await client.patch(LP_ID).set(doc).commit()
  console.log(`✓ ${LP_ID} updated (${projects.length} featured projects)`)
  console.log('\nLive at /lp/web-development-qatar within about a minute (after the site code is pushed).')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
