/**
 * Web Development page: local SEO pass (Qatar / Doha keywords), keeping the
 * humanised tone. Run AFTER seed-webdev-humanize.ts. No long dashes.
 *
 * Targets: "web development in Qatar", "web design Doha",
 * "website design company in Qatar", and Arabic equivalents
 * (تطوير المواقع في قطر، تصميم مواقع في الدوحة، شركة تصميم مواقع).
 *
 * Also: H1 via new heroTitle field, portfolio projects link back to the
 * service with keyword anchor text.
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-webdev-seo.ts --with-user-token
 */
/* eslint-disable no-console */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

const SERVICE_ID = '140e8c17-bca6-4f27-8735-f16b89d9dde9'

const SERVICE = {
  heroTitle: L('Web Development in Qatar', 'تطوير وتصميم المواقع في قطر'),
  description: L(
    'Web design and development in Qatar, done properly. We build fast, bilingual websites on a headless CMS and Node.js that load quickly, rank well on Google and AI search, and make it easy for customers to get in touch. Our team is based in Doha.',
    'تصميم وتطوير المواقع في قطر كما يجب. نبني مواقع سريعة وثنائية اللغة على نظام إدارة محتوى Headless وNode.js، تُحمَّل بسرعة وتظهر جيداً في Google والبحث بالذكاء الاصطناعي وتسهّل على العملاء التواصل معك. فريقنا في الدوحة.',
  ),
  whatWeBuildTitle: L('Web development in Qatar, built around your customers.', 'تطوير مواقع في قطر يتمحور حول عملائك.'),
  content: L(
    `Most of your customers will meet your website before they meet you. As a web design and development company in Doha, we build every site around one simple question: when someone lands here, how quickly can they understand what you do and decide to contact you?

In practice that means pages that load in under two seconds on mobile networks in Qatar, English and Arabic designed together from the start, structured data that helps Google and AI search understand your business, and enquiries that go straight to your CRM or WhatsApp. You also get analytics that show which pages and channels actually bring in business.

We build on modern technology, Next.js and a headless CMS, so the site stays fast as you grow. And we stay with you after launch. Every website comes with 30 days of tuning, where we watch how real visitors use it and improve what needs improving.`,
    `يتعرّف معظم عملائك على موقعك قبل أن يتعرّفوا عليك. وبصفتنا شركة تصميم وتطوير مواقع في الدوحة، نبني كل موقع حول سؤال بسيط: حين يصل شخص إلى هنا، كم يحتاج من الوقت ليفهم ما تقدّمه ويقرر التواصل معك؟

عملياً يعني ذلك صفحات تُحمَّل في أقل من ثانيتين على شبكات الجوال في قطر، وتصميماً بالعربية والإنجليزية معاً منذ البداية، وبيانات منظمة تساعد Google والبحث بالذكاء الاصطناعي على فهم عملك، واستفسارات تصل مباشرة إلى نظام CRM أو WhatsApp. كما تحصل على تحليلات توضّح أي الصفحات والقنوات تجلب لك العملاء فعلاً.

نبني بتقنيات حديثة، Next.js ونظام إدارة محتوى Headless، ليبقى الموقع سريعاً مع نمو أعمالك. ولا نختفي بعد الإطلاق، فكل موقع يأتي مع 30 يوماً من المتابعة والضبط، نراقب خلالها كيف يستخدمه الزوار الحقيقيون ونحسّن ما يحتاج إلى تحسين.`,
  ),
  whyItMattersTitle: L('Why your website matters for business in Qatar', 'لماذا يهم موقعك لأعمالك في قطر'),
  deliverablesTitle: L('What you get with our website design service', 'ما تحصل عليه مع خدمة تصميم المواقع لدينا'),
  projectsTitle: L('Websites we have built in Qatar and the region.', 'مواقع بنيناها في قطر والمنطقة.'),
  faqsTitle: L('Web development in Qatar: your questions answered', 'تطوير المواقع في قطر: إجابات أسئلتك'),
  'seo.metaDescription': L(
    'Web design and development in Qatar. Fast, bilingual websites on a headless CMS and Next.js, built by M&M’s team in Doha. See how headless compares with WordPress.',
    'تصميم وتطوير مواقع في قطر. مواقع سريعة وثنائية اللغة بنظام إدارة محتوى Headless وNext.js من فريق M&M في الدوحة. قارن بين Headless وWordPress.',
  ),
  // section headings (by _key)
  'sections[_key=="wp-vs-headless"].title': L('Which is right for your business in Qatar?', 'أيهما الأنسب لعملك في قطر؟'),
  'sections[_key=="process"].title': L('How we build your website, step by step', 'كيف نبني موقعك، خطوة بخطوة'),
  'sections[_key=="process"].subtitle': L(
    'A typical company website in Qatar takes 6 to 10 weeks. Online stores and larger platforms take 10 to 16 weeks. You will see real progress every two weeks, and you can meet our team in Doha whenever you like.',
    'يستغرق موقع الشركة في قطر عادةً من 6 إلى 10 أسابيع، والمتاجر الإلكترونية والمنصات الأكبر من 10 إلى 16 أسبوعاً. وسترى تقدماً حقيقياً كل أسبوعين، ويمكنك لقاء فريقنا في الدوحة متى شئت.',
  ),
}

const SEO_FAQ = {
  id: 'cf930089-bef6-49f0-b1a1-64802c581c62',
  question: L('Will my website be SEO friendly?', 'هل سيكون موقعي متوافقاً مع محركات البحث؟'),
  answer: L(
    'Yes. Every site we build is fast, works well on phones, uses clean code and structured data, and has proper titles, descriptions and hreflang tags for both languages. We also set up local SEO, so you show up when people in Qatar search for what you offer, and connect Google Search Console and analytics so you can see how it performs.',
    'نعم. كل موقع نبنيه سريع ويعمل جيداً على الهواتف، بشيفرة نظيفة وبيانات منظمة وعناوين وأوصاف صحيحة ووسوم hreflang للغتين. كما نجهّز SEO المحلي لتظهر حين يبحث الناس في قطر عمّا تقدّمه، ونربط Google Search Console والتحليلات لترى أداء موقعك.',
  ),
}

const PORTFOLIO_PAGE = {
  title: L('Websites we have designed and built in Qatar', 'مواقع صممناها وبنيناها في قطر'),
  relatedServiceText: L('Explore our web development services in Qatar →', 'تعرّف على خدمات تطوير المواقع في قطر ←'),
}

const PROJECT_IDS = ['webProject-hec-mannai', 'webProject-denza-qatar', 'webProject-icc-qatar']

function assertNoLongDashes(label: string, v: unknown) {
  if (/[—–]/.test(JSON.stringify(v))) throw new Error(`Long dash in ${label}`)
}

async function run() {
  assertNoLongDashes('service', SERVICE)
  assertNoLongDashes('faq', SEO_FAQ)
  assertNoLongDashes('portfolio', PORTFOLIO_PAGE)

  await client.patch(SERVICE_ID).set(SERVICE).commit()
  console.log('✓ Web Development page: H1, intro, headings and meta updated for Qatar/Doha keywords')

  await client.patch(SEO_FAQ.id).set({question: SEO_FAQ.question, answer: SEO_FAQ.answer}).commit()
  console.log('✓ SEO FAQ mentions local SEO in Qatar')

  if (await client.fetch<string | null>(`*[_id == "portfolioPage"][0]._id`)) {
    await client.patch('portfolioPage').set(PORTFOLIO_PAGE).commit()
    console.log('✓ Portfolio page title + link-back text')
  }

  for (const id of PROJECT_IDS) {
    if (!(await client.fetch<string | null>(`*[_id == $id][0]._id`, {id}))) continue
    await client
      .patch(id)
      .set({relatedServices: [{_key: 'web-development', _type: 'reference', _ref: SERVICE_ID}]})
      .commit()
  }
  console.log('✓ Portfolio projects now link to the Web Development service')

  console.log('\nDone. Live within about a minute (after the site code is pushed).')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
