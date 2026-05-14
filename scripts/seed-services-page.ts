/**
 * Seed the `servicesPage` singleton with marketing copy.
 *
 * Run with:
 *   npx sanity exec scripts/seed-services-page.ts --with-user-token
 *
 * Uses the Sanity CLI's currently-logged-in user — no API token required.
 * Idempotent: creates the doc with id 'servicesPage' on first run, then
 * patches its fields on subsequent runs.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const DOC_ID = 'servicesPage'

const content = {
  _id: DOC_ID,
  _type: 'servicesPage',
  eyebrow: 'Marketing Services',
  title: 'Services built to generate revenue, not just impressions.',
  subtitle:
    'Every M&M service is a revenue system — strategy, execution, and measurement working together to drive real business growth for brands in Qatar.',
  intro:
    "We don't run isolated campaigns. We build connected growth systems where every service — websites, SEO, social, paid media, branding, and AI-driven optimisation — is engineered to compound revenue. Pick a service, or combine several into a system tailored to your market, audience, and growth targets.",
  ctaTitle: 'Ready to build your growth system?',
  ctaText:
    "Tell us about your business, market, and revenue targets. We'll send back a custom strategy showing exactly how the right combination of services can generate measurable growth.",
  ctaButtonText: 'Get Your AI Growth Strategy',
  ctaButtonLink: '/get-strategy',
  seo: {
    _type: 'seo',
    metaTitle: 'Marketing Services in Qatar | M&M Marketing',
    metaDescription:
      'Websites, SEO, social media, branding, paid media, and AI-driven growth systems built to generate measurable revenue for brands in Qatar.',
    focusKeyword: 'marketing services Qatar',
    canonicalUrl: 'https://mnmagency.com/services',
  },
}

async function main() {
  console.log(`Seeding ${DOC_ID}…`)

  // Find and remove any duplicate auto-generated servicesPage docs so we end
  // up with exactly one singleton at the canonical id.
  const duplicates: Array<{_id: string}> = await client.fetch(
    `*[_type == "servicesPage" && _id != $id]{ _id }`,
    {id: DOC_ID},
  )

  if (duplicates.length > 0) {
    console.log(`Removing ${duplicates.length} duplicate servicesPage doc(s)…`)
    const tx = client.transaction()
    duplicates.forEach((d) => tx.delete(d._id))
    await tx.commit()
  }

  // createOrReplace makes this idempotent — safe to re-run.
  const result = await client.createOrReplace(content)
  console.log(`Seeded ${result._id} ✓`)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
