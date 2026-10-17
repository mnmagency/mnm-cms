/**
 * Update the navigation singleton so the "Our Services" mega menu lists
 * all seven services (web dev, SEO, social, SMS, branding, paid ads,
 * AI/LLMO/GEO) with bilingual titles + descriptions.
 *
 * Idempotent: locates the existing "Our Services" item by label or by
 * `hasMegaMenu: true`, replaces its `megaItems` array, and leaves every
 * other navigation field alone (CTAs, footer columns, socials, etc).
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-nav-services-megamenu.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

type MegaEntry = {
  title: Loc
  description: Loc
  link: string
  _key: string
}

const megaItems: MegaEntry[] = [
  {
    _key: 'mega-web-development',
    title: L('Web Development', 'تطوير المواقع'),
    description: L(
      'High-performance websites built to convert visitors into qualified leads.',
      'مواقع عالية الأداء مصممة لتحويل الزوار إلى عملاء محتملين مؤهلين.',
    ),
    link: '/services/web-development',
  },
  {
    _key: 'mega-seo',
    title: L('SEO', 'تحسين محركات البحث'),
    description: L(
      'Search visibility strategies that attract high-intent traffic in Qatar.',
      'استراتيجيات ظهور بحثي تجذب زيارات عالية النية في قطر.',
    ),
    link: '/services/seo',
  },
  {
    _key: 'mega-social-media',
    title: L('Social Media', 'وسائل التواصل الاجتماعي'),
    description: L(
      'Content systems that build attention, engagement, and brand authority.',
      'أنظمة محتوى تبني الانتباه والتفاعل وسلطة العلامة التجارية.',
    ),
    link: '/services/social-media',
  },
  {
    _key: 'mega-bulk-sms',
    title: L('Bulk SMS', 'الرسائل النصية الجماعية'),
    description: L(
      'Direct broadcast campaigns that reach your audience in seconds.',
      'حملات بث مباشرة تصل إلى جمهورك في ثوانٍ.',
    ),
    link: '/services/bulk-sms',
  },
  {
    _key: 'mega-branding',
    title: L('Branding', 'العلامة التجارية'),
    description: L(
      'Distinct identities that earn trust and command premium pricing.',
      'هويات مميزة تكسب الثقة وتفرض تسعيراً متميزاً.',
    ),
    link: '/services/branding',
  },
  {
    _key: 'mega-paid-ads',
    title: L('Paid Ads', 'الإعلانات المدفوعة'),
    description: L(
      'High-ROAS paid media across Google, Meta, TikTok, and LinkedIn.',
      'إعلانات مدفوعة بعائد مرتفع عبر Google و Meta و TikTok و LinkedIn.',
    ),
    link: '/services/paid-ads',
  },
  {
    _key: 'mega-ai-llmo-geo',
    title: L('AI Visibility', 'الظهور في الذكاء الاصطناعي'),
    description: L(
      "Get cited inside ChatGPT, Gemini, Perplexity, and Google's AI search.",
      'احصل على ذكر داخل ChatGPT و Gemini و Perplexity وبحث Google بالذكاء الاصطناعي.',
    ),
    link: '/services/ai-llmo-geo',
  },
  {
    _key: 'mega-videography',
    title: L('Videography', 'الفيديو والإنتاج'),
    description: L(
      'Cinematic brand films, product campaigns and event coverage shot in Qatar.',
      'أفلام علامة تجارية سينمائية وحملات منتجات وتغطية فعاليات بتصوير في قطر.',
    ),
    link: '/services/videography',
  },
]

async function main() {
  console.log('Fetching navigation doc…')
  const nav: any = await client.fetch(
    `*[_type == "navigation"][0]{ _id, items }`,
  )

  if (!nav?._id) {
    console.error('No navigation document found. Aborting.')
    process.exit(1)
  }

  const items: any[] = Array.isArray(nav.items) ? nav.items : []

  // Locate "Our Services" by:
  //   1) existing hasMegaMenu flag
  //   2) label matching /services or "Our Services" (en/ar)
  let targetIndex = items.findIndex((it: any) => it?.hasMegaMenu === true)
  if (targetIndex === -1) {
    targetIndex = items.findIndex((it: any) => {
      const link = (it?.link || '').toString().toLowerCase()
      const en = (it?.label?.en || '').toString().toLowerCase()
      const ar = (it?.label?.ar || '').toString()
      return (
        link === '/services' ||
        en.includes('service') ||
        ar.includes('خدمات')
      )
    })
  }

  const megaHeadline = L(
    'Built to generate revenue, not just impressions.',
    'مصممة لتحقيق إيرادات حقيقية، وليس مجرد ظهور.',
  )

  const ourServicesItem: any = {
    _key: 'nav-our-services',
    label: L('Our Services', 'خدماتنا'),
    link: '/services',
    hasMegaMenu: true,
    megaHeadline,
    megaItems,
  }

  let nextItems: any[]
  if (targetIndex >= 0) {
    console.log(`  • Updating existing "Our Services" item at index ${targetIndex}`)
    nextItems = items.map((it: any, i: number) =>
      i === targetIndex
        ? {...it, hasMegaMenu: true, megaHeadline, megaItems, label: it.label || ourServicesItem.label, link: it.link || '/services'}
        : it,
    )
  } else {
    console.log('  • No "Our Services" item found — inserting one after the first item.')
    nextItems = [...items]
    nextItems.splice(1, 0, ourServicesItem)
  }

  console.log('Patching navigation…')
  await client.patch(nav._id).set({items: nextItems}).commit()
  console.log(`Done. Mega menu now lists ${megaItems.length} services ✓`)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
