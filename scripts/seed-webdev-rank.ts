/**
 * Web Development ranking pass (2026-10-26).
 *
 * 1. Service page targets the phrases people actually search in Qatar:
 *    "web development company in Qatar", "website development Qatar",
 *    "website design Doha" (and Arabic equivalents).
 * 2. The web-dev landing page (/lp/web-development-qatar) is hidden from
 *    Google so it stops competing with the service page. Ads still work.
 * 3. Three new FAQs written the way people ask Google and AI assistants.
 *
 * No prices, no long dashes, CMS kept generic.
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-webdev-rank.ts --with-user-token
 *
 * Safe to re-run.
 */
/* eslint-disable no-console */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({_type: 'localeString', en, ar}) as Loc

const SERVICE_ID = '140e8c17-bca6-4f27-8735-f16b89d9dde9'
const LP_ID = 'landingPage-web-development-qatar'

const SERVICE = {
  // Root layout adds " | M&M" → 59 characters in total.
  'seo.metaTitle': L('Web Development Company in Qatar | Website Design Doha', 'شركة تطوير مواقع في قطر | تصميم مواقع الدوحة'),
  'seo.metaDescription': L(
    'Web development company in Doha, Qatar. Fast English and Arabic websites on a headless CMS or WordPress. See our work and get a proposal in 24 hours.',
    'شركة تطوير مواقع في الدوحة، قطر. نصمم ونبني مواقع سريعة بالعربية والإنجليزية على نظام إدارة محتوى Headless أو WordPress. شاهد أعمالنا واحصل على عرض خلال 24 ساعة.',
  ),
  'seo.focusKeyword': L('web development company in qatar', 'شركة تطوير مواقع في قطر'),
  heroEyebrow: L('Website design and development, Doha', 'تصميم وتطوير المواقع، الدوحة'),
  heroTitle: L('Web Design & Development Company in Qatar', 'شركة تصميم وتطوير مواقع في قطر'),
  description: L(
    'M&M is a website design and development company in Doha. We build fast, bilingual websites on a headless CMS, Node.js or WordPress that load quickly, rank well on Google and AI search, and make it easy for customers in Qatar to get in touch.',
    'M&M شركة تصميم وتطوير مواقع في الدوحة. نبني مواقع سريعة وثنائية اللغة على نظام إدارة محتوى Headless أو Node.js أو WordPress، تُحمَّل بسرعة وتظهر جيداً في Google والبحث بالذكاء الاصطناعي، وتسهّل على العملاء في قطر التواصل معك.',
  ),
}

const FAQS = [
  {
    _id: 'faq-web-development-choose',
    order: 7,
    question: L('How do I choose a web development company in Qatar?', 'كيف أختار شركة تطوير مواقع في قطر؟'),
    answer: L(
      'Look at websites they have actually built and launched in Qatar, and check that both the English and Arabic versions are designed properly, not translated as an afterthought. Ask who owns the code and content after launch, how fast their sites load on a phone, and who you will speak to when you need a change. A good partner gives you a clear written proposal before you commit.',
      'انظر إلى مواقع بنتها الشركة وأطلقتها فعلاً في قطر، وتأكد من أن النسختين العربية والإنجليزية مصممتان بعناية وليستا ترجمة لاحقة. اسأل عمّن يملك الكود والمحتوى بعد الإطلاق، وعن سرعة تحميل مواقعهم على الجوال، ومن ستتواصل معه حين تحتاج تعديلاً. والشريك الجيد يقدّم لك عرضاً مكتوباً وواضحاً قبل أن تلتزم.',
    ),
  },
  {
    _id: 'faq-web-development-ecommerce',
    order: 8,
    question: L('Do you build e-commerce websites in Qatar?', 'هل تبنون متاجر إلكترونية في قطر؟'),
    answer: L(
      'Yes. We build online stores in English and Arabic with local payment gateways, delivery and stock rules, and order emails, and we can connect them to your ERP or CRM. Larger stores usually take 10 to 16 weeks.',
      'نعم. نبني متاجر إلكترونية بالعربية والإنجليزية مع بوابات دفع محلية وقواعد للتوصيل والمخزون ورسائل للطلبات، ويمكننا ربطها بنظام ERP أو CRM لديك. وتستغرق المتاجر الأكبر عادةً من 10 إلى 16 أسبوعاً.',
    ),
  },
  {
    _id: 'faq-web-development-industries',
    order: 9,
    question: L('What kind of websites have you built in Qatar?', 'ما نوع المواقع التي بنيتموها في قطر؟'),
    answer: L(
      'Car brand websites with configurators, a property portal with location search, a university website, corporate sites for retail groups and heavy equipment, and an institutional site for a chamber of commerce. You can see each one, with screenshots and the technology used, in our portfolio.',
      'مواقع لعلامات سيارات مع أدوات تكوين، وبوابة عقارية مع البحث حسب الموقع، وموقع جامعي، ومواقع مؤسسية لمجموعات تجزئة ومعدات ثقيلة، وموقع مؤسسي لغرفة تجارة. ويمكنك مشاهدة كل منها مع الصور والتقنيات المستخدمة في معرض أعمالنا.',
    ),
  },
]

function assertNoLongDashes(label: string, v: unknown) {
  if (/[—–]/.test(JSON.stringify(v))) throw new Error(`Long dash in ${label}`)
}

async function run() {
  assertNoLongDashes('service', SERVICE)
  assertNoLongDashes('faqs', FAQS)

  await client.patch(SERVICE_ID).set(SERVICE).commit()
  console.log('✓ Web Development page: title, meta description, H1, eyebrow and intro updated')

  for (const f of FAQS) {
    await client.createOrReplace({
      _type: 'faq',
      ...f,
      category: 'website-development',
      showOnFaqPage: true,
      relatedService: {_type: 'reference', _ref: SERVICE_ID},
    })
  }
  console.log(`✓ ${FAQS.length} FAQs added to the Web Development page`)

  if (await client.fetch<string | null>(`*[_id == $id][0]._id`, {id: LP_ID})) {
    await client.patch(LP_ID).set({
      hideFromSearch: true,
      'seo.metaTitle': L('Web Development Company in Qatar | Website Design Doha', 'شركة تطوير مواقع في قطر | تصميم مواقع الدوحة'),
    }).commit()
    console.log('✓ /lp/web-development-qatar hidden from Google (ads still work)')
  }

  console.log('\nLive within about a minute once the site code is pushed.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
