/**
 * Phase 4 seed: fills sensible defaults for the new fields added in P4.
 *
 * Run with:
 *   npx sanity exec scripts/seed-phase-4.ts --with-user-token
 *
 * Strictly setIfMissing — never overwrites editor changes.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const FAQS_PAGE_DEFAULTS = {
  categoryLabels: {
    general: 'General',
    websiteDevelopment: 'Website Development',
    seo: 'SEO',
    socialMedia: 'Social Media',
    branding: 'Branding',
    bulkSms: 'Bulk SMS',
    paidAds: 'Paid Ads',
    aiLlmoGeo: 'AI / LLMO / GEO',
  },
}

// Trust signals defaults — only the labels/eyebrows that are content-neutral.
// The logos / testimonials / step contents themselves are intentionally left
// blank so the editor adds real ones from the studio.
const STRATEGY_FORM_DEFAULTS = {
  trustEyebrow: 'Trusted by brands across Qatar',
  processEyebrow: 'What Happens Next',
  processTitle: "Here's exactly what to expect.",
  processSteps: [
    {
      title: 'You submit the form',
      description:
        'Tell us about your business, market, and goals. The more detail you share, the more tailored the strategy.',
    },
    {
      title: 'We respond within 24 hours',
      description:
        'A senior strategist reviews your inputs and reaches out to schedule a 30-minute strategy call.',
    },
    {
      title: 'You receive a custom growth plan',
      description:
        'Within 5 business days of the call, you get a tailored growth plan with services, timelines, and projected outcomes.',
    },
  ],
  testimonialsEyebrow: 'What Clients Say',
  testimonialsTitle: 'Real businesses. Real measurable growth.',
}

async function patchSingleton(type: string, defaults: Record<string, unknown>) {
  const existing: {_id?: string} | null = await client.fetch(
    `*[_type == $type][0]{ _id }`,
    {type},
  )
  if (!existing?._id) {
    console.log(`  · no ${type} doc — creating with defaults`)
    await client.create({_type: type, ...defaults})
    return
  }
  await client.patch(existing._id).setIfMissing(defaults).commit()
  console.log(`  ✓ patched ${type}`)
}

async function main() {
  console.log('Patching faqsPage…')
  await patchSingleton('faqsPage', FAQS_PAGE_DEFAULTS)

  console.log('Patching strategyForm trust signals…')
  await patchSingleton('strategyForm', STRATEGY_FORM_DEFAULTS)

  console.log('\nDone. Refresh the frontend to verify.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
