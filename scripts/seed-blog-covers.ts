/**
 * Replace the flat placeholder covers on four blog posts with
 * Higgsfield photos (2400px WebP).
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-blog-covers.ts --with-user-token
 *
 * Safe to re-run (images uploaded once).
 */
/* eslint-disable no-console */

import {createReadStream, existsSync} from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})
const DIR = path.join(process.cwd(), 'seed-assets', 'blog')
const LS = (en: string, ar: string) => ({_type: 'localeString', en, ar})

const COVERS = [
  {
    id: 'blog-arabic-and-english-seo-in-qatar',
    file: 'bilingual-seo.webp',
    alt: LS('English and Arabic search results on a laptop and tablet, with the Doha skyline at dusk', 'نتائج بحث بالإنجليزية والعربية على حاسوب وجهاز لوحي، وخلفهما أفق الدوحة عند الغروب'),
  },
  {
    id: 'blog-how-to-choose-an-seo-company-in-qatar',
    file: 'seo-company-roadmap.webp',
    alt: LS('A business owner reviewing a 90-day SEO roadmap and a rising traffic chart in a Doha office', 'صاحب عمل يراجع خطة SEO لمدة 90 يوماً ومخططاً لارتفاع الزيارات في مكتب بالدوحة'),
  },
  {
    id: 'blog-best-marketing-agency-in-qatar',
    file: 'marketing-agency-checklist.webp',
    alt: LS('A team in a Doha meeting room comparing marketing agencies on a checklist screen', 'فريق في قاعة اجتماعات بالدوحة يقارن بين وكالات التسويق على شاشة قائمة تحقق'),
  },
  {
    id: '17e97a33-1972-4cb1-b68c-cccf9beef46a',
    file: 'websites-convert.webp',
    alt: LS('A company website with a clear enquiry button on laptop and phone, with a lead funnel above', 'موقع شركة بزر تواصل واضح على حاسوب وهاتف، وفوقه مسار تحويل الزوار إلى عملاء'),
  },
]

async function upload(file: string) {
  const filename = `blog-${file}`
  const existing = await client.fetch<string | null>(`*[_type == "sanity.imageAsset" && originalFilename == $f][0]._id`, {f: filename})
  if (existing) return existing
  const p = path.join(DIR, file)
  if (!existsSync(p)) throw new Error(`Missing ${p}`)
  const a = await client.assets.upload('image', createReadStream(p), {filename, contentType: 'image/webp'})
  console.log(`  ↑ uploaded ${filename}`)
  return a._id
}

async function run() {
  for (const c of COVERS) {
    const ref = await upload(c.file)
    await client
      .patch(c.id)
      .set({image: {_type: 'image', asset: {_type: 'reference', _ref: ref}, alt: c.alt}})
      .commit()
    console.log(`✓ ${c.id}: new cover`)
  }
  console.log('\nLive within about a minute.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
