/**
 * Blog post: "Why Qatar's Enterprise Brands are Moving from Monolithic
 * WordPress to Headless Node.js" (EN + AR).
 *
 * Images: seed-assets/blog/headless-cover.webp (featured) and
 * headless-boardroom.webp (inline). Both generated with Higgsfield.
 *
 * House rules: humanised, no long dashes, no prices, CMS kept generic,
 * internal links to the web development service and portfolio.
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-blog-headless-nodejs.ts --with-user-token
 *
 * Safe to re-run (replaces the post, images uploaded once).
 */
/* eslint-disable no-console */

import {createReadStream, existsSync} from 'node:fs'
import path from 'node:path'
import {randomUUID} from 'node:crypto'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {_type: 'localeString' | 'localeText'; en: string; ar: string}
const LS = (en: string, ar: string): Loc => ({_type: 'localeString', en, ar})
const LT = (en: string, ar: string): Loc => ({_type: 'localeText', en, ar})

const ID = 'blog-headless-nodejs-vs-wordpress-qatar'
const SLUG = 'why-qatar-enterprise-brands-are-moving-from-wordpress-to-headless-nodejs'
const ASSET_DIR = path.join(process.cwd(), 'seed-assets', 'blog')
const SITE = 'https://mnmagency.com'

// ─── mini markdown → portable text ─────────────────────────────────────
// "## " h2, "### " h3, "- " bullet, "1. " numbered, "> " quote,
// "[[image]]" inline image, **bold**, [text](url). Blank line = new block.
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

function spans(text: string) {
  const markDefs: Array<{_key: string; _type: 'link'; href: string}> = []
  const children: Array<{_type: 'span'; _key: string; text: string; marks: string[]}> = []
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  const push = (t: string, marks: string[] = []) => t && children.push({_type: 'span', _key: key(), text: t, marks})
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index))
    if (m[1]) push(m[1], ['strong'])
    else {
      const k = key()
      markDefs.push({_key: k, _type: 'link', href: m[3].startsWith('/') ? SITE + m[3] : m[3]})
      push(m[2], [k])
    }
    last = re.lastIndex
  }
  push(text.slice(last))
  return {markDefs, children}
}

function toPortable(md: string, image: unknown) {
  const out: unknown[] = []
  for (const raw of md.trim().split(/\n\s*\n/)) {
    for (const line of raw.split('\n').map((l) => l.trim()).filter(Boolean)) {
      if (line === '[[image]]') { out.push({_key: key(), ...(image as object)}); continue }
      let style = 'normal'
      let listItem: string | undefined
      let text = line
      if (line.startsWith('### ')) { style = 'h3'; text = line.slice(4) }
      else if (line.startsWith('## ')) { style = 'h2'; text = line.slice(3) }
      else if (line.startsWith('> ')) { style = 'blockquote'; text = line.slice(2) }
      else if (line.startsWith('- ')) { listItem = 'bullet'; text = line.slice(2) }
      else if (/^\d+\. /.test(line)) { listItem = 'number'; text = line.replace(/^\d+\. /, '') }
      out.push({_type: 'block', _key: key(), style, ...(listItem ? {listItem, level: 1} : {}), ...spans(text)})
    }
  }
  return out
}

// ─── content ───────────────────────────────────────────────────────────
const EN = `
For years, WordPress was the obvious choice for a company website in Qatar. It was quick to launch, everyone knew it, and there was a plugin for almost everything. For a small business that still makes sense. But over the last few years we have seen a clear shift among larger brands in Doha: car distributors, retail groups, real estate developers and institutions are moving their main websites off traditional WordPress and onto a headless setup, usually a modern front end with Node.js behind it.

This is not about fashion. It comes from real problems that show up once a website becomes important to the business.

## What "monolithic" and "headless" actually mean

A traditional WordPress site is **monolithic**. The content, the design, the plugins and the database all live in one system and are served together on every page view. Change one part and you risk breaking another.

A **headless** website separates them. Your content lives in a headless CMS where your team edits it. The website that visitors see is a separate, fast front end (we use Next.js) that pulls that content in. **Node.js** sits in the middle and handles the business logic: forms, bookings, payments and connections to your CRM or ERP.

Think of it as moving from one big machine to a set of specialist parts that talk to each other.

## Why enterprise brands in Qatar are making the switch

### 1. Speed, especially on mobile

Most visitors in Qatar arrive on a phone. A traditional WordPress page often loads its theme, a page builder and a dozen plugins before anything appears. A headless front end ships only what the page needs and can be served from a global CDN, so pages typically load in well under two seconds. Faster pages keep visitors, and Google rewards them.

### 2. Arabic and English done properly

Bilingual sites on WordPress usually depend on a translation plugin layered on top of a theme that was designed for English first. The result is often an Arabic version that feels bolted on. With a headless build, both languages are designed together from day one: proper right-to-left layouts, Arabic typography and separate SEO for each language. If you want to rank in both, read our guide to [Arabic and English SEO in Qatar](/blog/arabic-and-english-seo-in-qatar).

### 3. Security that does not depend on plugin updates

Every plugin is extra code that needs updates, and outdated plugins are one of the most common ways WordPress sites get compromised. In a headless setup there is no public admin panel on your website and far fewer moving parts exposed to the internet. For brands that handle customer data, that matters.

### 4. Connecting the website to the rest of the business

This is usually the deciding factor for enterprise clients. A modern brand website is not a brochure. It needs to send leads to Dynamics 365 or Salesforce, check stock in an ERP, take payments, book test drives or service appointments, and send WhatsApp notifications. Node.js is built for exactly this kind of work, so integrations are clean, reliable and easy to extend.

[[image]]

### 5. Interactive experiences

Car configurators, 360° viewers, property search by location, product finders: these are hard to build well inside a WordPress theme. On a headless stack they are just part of the front end. On the [Denza Qatar website](/portfolio/denza-qatar), buyers configure the Z9 GT in a 360° 3D view, download a bilingual PDF of their build and send it straight to the sales team, with every lead passed to the dealer's CRM.

### 6. Your team still edits everything

A common worry is that headless means calling a developer for every change. It does not. Your marketing team edits pages, news, offers and products in a clean editor, often more easily than in a page builder, and changes go live in about a minute.

## When WordPress is still the right choice

We still build WordPress sites when they fit. For a smaller company website, a tight budget, a team that already knows WordPress, or a campaign site that needs to launch fast, it is a perfectly good option, and we have delivered strong WordPress projects for brands in Qatar.

The question is not "which technology is better" but "what does this website need to do for the business over the next five years?" If the answer includes heavy traffic, two languages, integrations, interactive features or strict security, headless usually wins.

## What moving to headless looks like

A typical migration with us follows six steps:

1. **Discovery.** We map your current site, what ranks, what converts and what needs to connect.
2. **Content model.** We design how content is structured in the headless CMS so your team can manage it easily.
3. **Design in both languages.** English and Arabic designed together, not translated afterwards.
4. **Build and integrate.** Front end in Next.js, business logic in Node.js, connections to your CRM, ERP or payments.
5. **SEO migration.** Every old URL redirected to its new home so you keep your Google rankings.
6. **Launch and tuning.** We watch real visitor behaviour for 30 days and improve what needs improving.

Most company websites take 6 to 10 weeks, and larger platforms 10 to 16 weeks.

## The bottom line

WordPress built the web, and it still has its place. But for enterprise brands in Qatar, the website has become a sales channel, a service desk and a brand showcase at the same time. That job needs speed, security, proper Arabic and clean integrations, and that is why more of them are moving to headless Node.js.

If you are weighing up a rebuild or a migration, [talk to our web development team in Doha](/services/web-development). We will tell you honestly whether headless or WordPress is the better fit, and send you a clear proposal within 24 hours.
`

const AR = `
لسنوات طويلة كان WordPress الخيار البديهي لمواقع الشركات في قطر. فهو سريع الإطلاق ومعروف لدى الجميع، ويوجد له إضافة لكل شيء تقريباً. وما زال خياراً منطقياً للشركات الصغيرة. لكننا لاحظنا في السنوات الأخيرة تحولاً واضحاً لدى العلامات الكبرى في الدوحة: موزعو السيارات ومجموعات التجزئة والمطورون العقاريون والمؤسسات بدأوا ينقلون مواقعهم الرئيسية من WordPress التقليدي إلى بنية Headless، تقوم عادةً على واجهة حديثة يعمل خلفها Node.js.

وهذا ليس مجرد موضة، بل نتيجة مشكلات حقيقية تظهر حين يصبح الموقع مهماً للأعمال.

## ما معنى "الموقع المتكامل" و"Headless"؟

موقع WordPress التقليدي **متكامل في نظام واحد**: المحتوى والتصميم والإضافات وقاعدة البيانات كلها في نظام واحد، تُقدَّم معاً في كل زيارة. وأي تغيير في جزء منها قد يعطّل جزءاً آخر.

أما الموقع **Headless** فيفصل بينها. يعيش المحتوى في نظام إدارة محتوى Headless يعدّله فريقك، والموقع الذي يراه الزوار واجهة مستقلة وسريعة (نستخدم Next.js) تستدعي هذا المحتوى. ويقع **Node.js** في المنتصف ويتولى منطق الأعمال: النماذج والحجوزات والدفع والربط مع أنظمة CRM وERP.

تخيّل الأمر كالانتقال من آلة واحدة كبيرة إلى مجموعة أجزاء متخصصة تتواصل فيما بينها.

## لماذا تنتقل العلامات الكبرى في قطر؟

### 1. السرعة، خصوصاً على الجوال

يصل معظم الزوار في قطر عبر الهاتف. وصفحة WordPress التقليدية تحمّل غالباً القالب وأداة بناء الصفحات وعشرات الإضافات قبل أن يظهر أي شيء. أما الواجهة Headless فتحمّل ما تحتاجه الصفحة فقط، ويمكن تقديمها عبر شبكة CDN عالمية، فتُحمَّل الصفحات عادةً في أقل من ثانيتين. والصفحات الأسرع تحتفظ بالزوار، ويكافئها Google.

### 2. العربية والإنجليزية كما يجب

تعتمد المواقع ثنائية اللغة على WordPress عادةً على إضافة ترجمة فوق قالب صُمم للإنجليزية أولاً، فتبدو النسخة العربية وكأنها أُضيفت لاحقاً. أما في البناء Headless فتُصمَّم اللغتان معاً منذ اليوم الأول: اتجاه صحيح من اليمين إلى اليسار، وخطوط عربية مناسبة، وSEO منفصل لكل لغة. وإن أردت الظهور باللغتين فاقرأ دليلنا عن [SEO بالعربية والإنجليزية في قطر](/ar/blog/arabic-and-english-seo-in-qatar).

### 3. أمان لا يعتمد على تحديث الإضافات

كل إضافة هي كود إضافي يحتاج إلى تحديث، والإضافات القديمة من أكثر الطرق شيوعاً لاختراق مواقع WordPress. أما في البنية Headless فلا توجد لوحة تحكم عامة على موقعك، وعدد الأجزاء المكشوفة للإنترنت أقل بكثير. وهذا مهم للعلامات التي تتعامل مع بيانات العملاء.

### 4. ربط الموقع ببقية أنظمة الشركة

هذا غالباً العامل الحاسم لدى الشركات الكبرى. فموقع العلامة الحديث ليس كتيّباً، بل يجب أن يرسل الطلبات إلى Dynamics 365 أو Salesforce، ويتحقق من المخزون في نظام ERP، ويستقبل المدفوعات، ويحجز تجارب القيادة أو مواعيد الصيانة، ويرسل إشعارات واتساب. وNode.js مصمم لهذا النوع من العمل تحديداً، فتكون عمليات الربط نظيفة وموثوقة وسهلة التوسع.

[[image]]

### 5. تجارب تفاعلية

أدوات تكوين السيارات وعارضات 360° والبحث العقاري حسب الموقع وأدوات اختيار المنتجات يصعب بناؤها جيداً داخل قالب WordPress، بينما هي جزء طبيعي من الواجهة في البنية Headless. ففي [موقع دينزا قطر](/ar/portfolio/denza-qatar) يصمم المشتري سيارة Z9 GT بعرض ثلاثي الأبعاد بزاوية 360°، ويحمّل ملف PDF ثنائي اللغة لمواصفاتها ويرسله مباشرة إلى فريق المبيعات، مع وصول كل طلب إلى نظام CRM لدى الوكيل.

### 6. فريقك ما زال يعدّل كل شيء

من المخاوف الشائعة أن Headless يعني الاتصال بمطوّر لكل تعديل، وهذا غير صحيح. يعدّل فريق التسويق الصفحات والأخبار والعروض والمنتجات في محرر واضح، وغالباً بسهولة أكبر من أدوات بناء الصفحات، وتظهر التغييرات خلال دقيقة تقريباً.

## متى يبقى WordPress الخيار الصحيح؟

ما زلنا نبني مواقع WordPress حين تكون مناسبة. فلموقع شركة أصغر، أو ميزانية محدودة، أو فريق يعرف WordPress مسبقاً، أو موقع حملة يجب إطلاقه بسرعة، يبقى خياراً جيداً تماماً، وقد سلّمنا مشاريع WordPress قوية لعلامات في قطر.

السؤال ليس "أي تقنية أفضل؟" بل "ما الذي يجب أن يقدمه هذا الموقع للأعمال خلال السنوات الخمس القادمة؟". فإن تضمنت الإجابة زيارات كثيرة ولغتين وتكاملات وميزات تفاعلية وأماناً صارماً، فالبنية Headless تفوز غالباً.

## كيف يبدو الانتقال إلى Headless؟

يمر الانتقال معنا عادةً بست مراحل:

1. **الاكتشاف.** نرسم خريطة موقعك الحالي: ما يحقق ترتيباً، وما يحوّل الزوار، وما يجب ربطه.
2. **نموذج المحتوى.** نصمم هيكلة المحتوى في نظام إدارة المحتوى ليديره فريقك بسهولة.
3. **التصميم باللغتين.** العربية والإنجليزية بتصميم واحد، لا ترجمة لاحقة.
4. **البناء والربط.** الواجهة بـ Next.js، ومنطق الأعمال بـ Node.js، والربط مع CRM أو ERP أو الدفع.
5. **نقل SEO.** تحويل كل رابط قديم إلى مكانه الجديد لتحافظ على ترتيبك في Google.
6. **الإطلاق والضبط.** نراقب سلوك الزوار الحقيقي لمدة 30 يوماً ونحسّن ما يحتاج إلى تحسين.

تستغرق معظم مواقع الشركات من 6 إلى 10 أسابيع، والمنصات الأكبر من 10 إلى 16 أسبوعاً.

## الخلاصة

بنى WordPress الإنترنت، وما زال له مكانه. لكن الموقع لدى العلامات الكبرى في قطر أصبح قناة مبيعات ومكتب خدمة وواجهة للعلامة في آن واحد. وهذه المهمة تحتاج إلى السرعة والأمان والعربية الصحيحة والتكاملات النظيفة، ولهذا يتجه المزيد منها إلى Headless وNode.js.

إن كنت تفكر في إعادة بناء موقعك أو نقله، [تحدّث مع فريق تطوير المواقع لدينا في الدوحة](/ar/services/web-development). سنخبرك بصراحة إن كان Headless أم WordPress هو الأنسب، ونرسل لك عرضاً واضحاً خلال 24 ساعة.
`

async function imageAsset(file: string) {
  const filename = `blog-${file}`
  const existing = await client.fetch<string | null>(`*[_type == "sanity.imageAsset" && originalFilename == $f][0]._id`, {f: filename})
  if (existing) return existing
  const p = path.join(ASSET_DIR, file)
  if (!existsSync(p)) throw new Error(`Missing ${p}`)
  const a = await client.assets.upload('image', createReadStream(p), {filename, contentType: 'image/webp'})
  console.log(`  ↑ uploaded ${filename}`)
  return a._id
}

async function run() {
  if (/[—–]/.test(EN + AR)) throw new Error('Long dash found in article')

  const [cover, inline] = await Promise.all([imageAsset('headless-cover.webp'), imageAsset('headless-boardroom.webp')])
  const inlineImg = {
    _type: 'image',
    asset: {_type: 'reference', _ref: inline},
    alt: LS('Enterprise boardroom in Doha showing a headless website architecture and a bilingual site on laptop and tablet', 'قاعة اجتماعات في الدوحة تعرض بنية موقع Headless وموقعاً ثنائي اللغة على حاسوب وجهاز لوحي'),
    caption: LS('One content source, many connected parts: the headless approach.', 'مصدر محتوى واحد وأجزاء متعددة مترابطة: هذا هو نهج Headless.'),
  }

  await client.createOrReplace({
    _id: ID,
    _type: 'blog',
    slug: {_type: 'slug', current: SLUG},
    title: LS(
      "Why Qatar's Enterprise Brands are Moving from Monolithic WordPress to Headless Node.js",
      'لماذا تنتقل العلامات الكبرى في قطر من WordPress التقليدي إلى Headless وNode.js',
    ),
    category: LS('Web Development', 'تطوير المواقع'),
    author: LS('M&M Web Development Team', 'فريق تطوير المواقع في M&M'),
    tags: [
      LS('Headless CMS', 'Headless CMS'),
      LS('Node.js', 'Node.js'),
      LS('WordPress', 'WordPress'),
      LS('Web Development Qatar', 'تطوير المواقع في قطر'),
    ].map((t) => ({_key: key(), ...t})),
    excerpt: LT(
      'Car distributors, retail groups and institutions in Doha are moving their main websites from traditional WordPress to headless Node.js. Here is why, and when WordPress is still the right call.',
      'موزعو السيارات ومجموعات التجزئة والمؤسسات في الدوحة ينقلون مواقعهم الرئيسية من WordPress التقليدي إلى Headless وNode.js. إليك الأسباب، ومتى يبقى WordPress الخيار الصحيح.',
    ),
    image: {
      _type: 'image',
      asset: {_type: 'reference', _ref: cover},
      alt: LS('A cracked monolithic server block next to light, connected modules, with the Doha skyline behind', 'كتلة خوادم متشققة بجانب وحدات خفيفة مترابطة، وخلفها أفق الدوحة'),
    },
    content: toPortable(EN, inlineImg),
    contentAr: toPortable(AR, inlineImg),
    publishedAt: new Date().toISOString(),
    seo: {
      _type: 'seo',
      metaTitle: LS('Why Qatar Brands Are Leaving WordPress for Headless', 'لماذا تنتقل علامات قطر من WordPress إلى Headless'),
      metaDescription: LS(
        'Why enterprise brands in Qatar are moving from monolithic WordPress to headless Node.js: speed, proper Arabic, security and integrations. Plus when WordPress still fits.',
        'لماذا تنتقل الشركات الكبرى في قطر من WordPress التقليدي إلى Headless وNode.js: السرعة والعربية الصحيحة والأمان والتكاملات، ومتى يبقى WordPress مناسباً.',
      ),
      focusKeyword: LS('headless vs wordpress qatar', 'Headless أم WordPress قطر'),
    },
  })
  console.log(`✓ Blog post published: /blog/${SLUG}`)
  console.log(`  Arabic: /ar/blog/${SLUG}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
