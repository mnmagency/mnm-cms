/**
 * Upload service-relevant hero images to Sanity and attach them to each
 * landing page with SEO-rich alt text that naturally includes
 * "marketing agency in Qatar" / "marketing agencies in Qatar".
 *
 * Run:
 *   npx sanity exec scripts/seed-lp-images.ts --with-user-token
 *
 * Idempotent: each upload uses a deterministic filename. Re-running just
 * re-uploads (Sanity dedupes by content hash) and re-patches the docs.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type ImageSpec = {
  slug: string
  url: string
  filename: string
  alt: {en: string; ar: string}
  caption: {en: string; ar: string}
}

// Each image is a high-quality, freely-usable Unsplash photo chosen to match
// the service. The Unsplash URL parameters force JPEG, ~1600px wide, 80% quality.
const HERO_IMAGES: ImageSpec[] = [
  {
    slug: 'seo-qatar',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&fm=jpg',
    filename: 'lp-seo-qatar-hero.jpg',
    alt: {
      en: 'SEO analytics dashboard showing growth — M&M Marketing, a top marketing agency in Qatar',
      ar: 'لوحة تحليلات SEO تُظهر النمو — إم آند إم، من أفضل وكالات التسويق في قطر',
    },
    caption: {
      en: 'Tracked rankings and traffic for marketing agencies in Qatar.',
      ar: 'تتبّع التراتيب والزيارات لوكالات التسويق في قطر.',
    },
  },
  {
    slug: 'web-development-qatar',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80&fm=jpg',
    filename: 'lp-web-development-qatar-hero.jpg',
    alt: {
      en: 'Web development workspace with code on screen — built by M&M, a marketing agency in Qatar',
      ar: 'مساحة عمل لتطوير المواقع مع الكود على الشاشة — من بناء إم آند إم، وكالة تسويق في قطر',
    },
    caption: {
      en: 'Fast, SEO-friendly websites built by marketing agencies in Qatar.',
      ar: 'مواقع سريعة وصديقة لمحركات البحث من وكالات التسويق في قطر.',
    },
  },
  {
    slug: 'social-media-qatar',
    url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1600&q=80&fm=jpg',
    filename: 'lp-social-media-qatar-hero.jpg',
    alt: {
      en: 'Phone showing social media apps — managed by M&M, a marketing agency in Qatar',
      ar: 'هاتف يعرض تطبيقات سوشيال ميديا — تديرها إم آند إم، وكالة تسويق في قطر',
    },
    caption: {
      en: 'Social campaigns by marketing agencies in Qatar that actually convert.',
      ar: 'حملات سوشيال من وكالات التسويق في قطر تحقّق تحويلات فعلية.',
    },
  },
  {
    slug: 'bulk-sms-qatar',
    url: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1600&q=80&fm=jpg',
    filename: 'lp-bulk-sms-qatar-hero.jpg',
    alt: {
      en: 'Hand holding phone with SMS notification — bulk SMS by M&M, a marketing agency in Qatar',
      ar: 'يد تحمل هاتفًا مع إشعار رسالة — رسائل SMS جماعية من إم آند إم، وكالة تسويق في قطر',
    },
    caption: {
      en: 'High-conversion SMS campaigns from marketing agencies in Qatar.',
      ar: 'حملات SMS عالية التحويل من وكالات التسويق في قطر.',
    },
  },
]

async function uploadFromUrl(spec: ImageSpec) {
  const res = await fetch(spec.url)
  if (!res.ok) {
    throw new Error(`Fetch failed for ${spec.url}: HTTP ${res.status}`)
  }
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename: spec.filename,
    contentType: 'image/jpeg',
  })
  return asset
}

async function patchLandingPage(spec: ImageSpec, assetId: string) {
  // Find the landing page doc by slug
  const doc = await client.fetch<{_id: string} | null>(
    `*[_type == "landingPage" && slug.current == $slug][0]{_id}`,
    {slug: spec.slug},
  )
  if (!doc?._id) {
    throw new Error(`No landingPage found for slug ${spec.slug}`)
  }

  await client
    .patch(doc._id)
    .set({
      'hero.image': {
        _type: 'image',
        asset: {_type: 'reference', _ref: assetId},
        alt: spec.alt,
        caption: spec.caption,
      },
    })
    .commit({autoGenerateArrayKeys: true})
}

async function run() {
  console.log('\n── Uploading hero images for landing pages ──\n')

  for (const spec of HERO_IMAGES) {
    try {
      console.log(`  → /lp/${spec.slug}`)
      console.log(`     downloading ${spec.url}`)
      const asset = await uploadFromUrl(spec)
      console.log(`     uploaded as ${asset._id}`)
      await patchLandingPage(spec, asset._id)
      console.log(`     ✓ patched landingPage doc with image + alt text`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`     ✗ failed: ${msg}`)
    }
  }

  console.log('\n✓ Done.\n')
}

run().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
