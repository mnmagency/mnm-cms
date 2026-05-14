/**
 * Phase 2 seed: page singletons + navigation defaults.
 *
 * Run with:
 *   npx sanity exec scripts/seed-phase-2.ts --with-user-token
 *
 * Idempotent: createOrReplace for each page singleton at its canonical id,
 * cleans up duplicates, and patches navigation with new defaults without
 * overwriting fields the editor already set.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

// ---------------------------------------------------------------------------
// Page singletons
// ---------------------------------------------------------------------------

const singletons = [
  {
    _id: 'blogPage',
    _type: 'blogPage',
    eyebrow: 'Insights',
    title: 'Growth, marketing, and digital strategy insights.',
    subtitle:
      'Practical thinking from M&M Marketing on websites, SEO, social media, AI-driven growth, and revenue systems.',
    seo: {
      _type: 'seo',
      metaTitle: 'Marketing Insights & Growth Blog | M&M Marketing Qatar',
      metaDescription:
        'Insights on websites, SEO, social media, branding, paid media, and AI-driven growth for brands in Qatar.',
      focusKeyword: 'marketing blog Qatar',
      canonicalUrl: 'https://mnmagency.com/blog',
    },
  },
  {
    _id: 'faqsPage',
    _type: 'faqsPage',
    eyebrow: 'FAQs',
    title: 'Frequently Asked Questions',
    subtitle:
      'Answers to the most common questions about M&M Marketing services, growth systems, and how we work with brands in Qatar.',
    seo: {
      _type: 'seo',
      metaTitle: 'FAQs | M&M Marketing Qatar',
      metaDescription:
        'Frequently asked questions about M&M Marketing services, websites, SEO, social media, branding, bulk SMS, paid ads, and AI-driven growth in Qatar.',
      focusKeyword: 'marketing agency FAQ Qatar',
      canonicalUrl: 'https://mnmagency.com/faqs',
    },
  },
  {
    _id: 'workPage',
    _type: 'workPage',
    eyebrow: 'Our Work',
    title: 'Work that turns attention into measurable growth.',
    subtitle:
      'Explore selected projects created by M&M Marketing for brands across Qatar — built as revenue systems, not vanity campaigns.',
    seo: {
      _type: 'seo',
      metaTitle: 'Our Work | M&M Marketing Qatar',
      metaDescription:
        'Selected work by M&M Marketing across websites, SEO, social media, branding, paid media, and digital growth for brands in Qatar.',
      focusKeyword: 'marketing portfolio Qatar',
      canonicalUrl: 'https://mnmagency.com/work',
    },
  },
  {
    _id: 'caseStudiesPage',
    _type: 'caseStudiesPage',
    eyebrow: 'Case Studies',
    title: 'Real work. Real strategy. Real measurable growth.',
    subtitle:
      'Explore selected case studies showing how M&M Marketing helps brands in Qatar turn digital strategy into business growth.',
    cardCtaText: 'View Case Study →',
    seo: {
      _type: 'seo',
      metaTitle: 'Marketing Case Studies | M&M Marketing Qatar',
      metaDescription:
        'M&M Marketing case studies — measurable growth results across websites, SEO, social media, branding, paid media, and AI-driven systems in Qatar.',
      focusKeyword: 'marketing case studies Qatar',
      canonicalUrl: 'https://mnmagency.com/case-studies',
    },
  },
  {
    _id: 'seoAuditPage',
    _type: 'seoAuditPage',
    eyebrow: 'Free SEO Audit',
    title: 'Free SEO Audit',
    subtitle:
      'Enter your website URL to receive a full SEO report covering technical SEO, on-page optimisation, performance, and growth opportunities.',
    widgetTitle: "Audit Your Website's SEO Now!",
    // Keep the existing SEOptimer credentials so the form keeps working.
    // Editor can rotate these in the studio when SEOptimer changes them.
    seoptimerUid: '89271',
    seoptimerCsrfToken: 'be97f0368c0bb95b44c0883324bfa7f436cacae1',
    placeholders: {
      url: 'Website URL',
      firstName: 'First Name',
      email: 'Email',
      phone: 'Phone Number',
      submit: 'Check',
    },
    successMessage: 'The report will be sent to your email shortly. Thank you!',
    seo: {
      _type: 'seo',
      metaTitle: 'Free SEO Audit | M&M Marketing Qatar',
      metaDescription:
        'Get a free SEO audit of your website covering technical SEO, on-page issues, performance, and growth opportunities for your business in Qatar.',
      focusKeyword: 'free SEO audit Qatar',
      canonicalUrl: 'https://mnmagency.com/seo-audit',
    },
  },
]

// ---------------------------------------------------------------------------
// Navigation patches (only fills new fields if missing — won't clobber edits)
// ---------------------------------------------------------------------------

const navigationDefaults = {
  brandName: 'M&M Marketing',
  copyright: '© {year} M&M Marketing. All rights reserved.',
  contactColumnTitle: 'Contact',
  promoBanner: {
    enabled: true,
    text: "Audit Your Website's SEO Now!",
    link: '/seo-audit',
  },
}

// ---------------------------------------------------------------------------

async function dedupe(_type: string, canonicalId: string) {
  const dupes: Array<{_id: string}> = await client.fetch(
    `*[_type == $type && _id != $id]{ _id }`,
    {type: _type, id: canonicalId},
  )
  if (dupes.length === 0) return
  console.log(`  · removing ${dupes.length} duplicate ${_type} doc(s)`)
  const tx = client.transaction()
  dupes.forEach((d) => tx.delete(d._id))
  await tx.commit()
}

async function seedSingletons() {
  for (const doc of singletons) {
    console.log(`Seeding ${doc._id}…`)
    await dedupe(doc._type, doc._id)
    await client.createOrReplace(doc)
    console.log(`  ✓ ${doc._id}`)
  }
}

async function patchNavigation() {
  console.log('Patching navigation defaults…')
  const nav: {_id?: string; brandName?: string; copyright?: string; contactColumnTitle?: string; promoBanner?: unknown} | null =
    await client.fetch(`*[_type == "navigation"][0]{
      _id, brandName, copyright, contactColumnTitle, promoBanner
    }`)

  if (!nav?._id) {
    console.log('  · no navigation doc exists yet — creating one with defaults')
    await client.create({_type: 'navigation', ...navigationDefaults})
    return
  }

  const patch: Record<string, unknown> = {}
  if (!nav.brandName)          patch.brandName = navigationDefaults.brandName
  if (!nav.copyright)          patch.copyright = navigationDefaults.copyright
  if (!nav.contactColumnTitle) patch.contactColumnTitle = navigationDefaults.contactColumnTitle
  if (!nav.promoBanner)        patch.promoBanner = navigationDefaults.promoBanner

  if (Object.keys(patch).length === 0) {
    console.log('  ✓ navigation already has all defaults — nothing to patch')
    return
  }

  await client.patch(nav._id).setIfMissing(patch).commit()
  console.log(`  ✓ patched: ${Object.keys(patch).join(', ')}`)
}

async function main() {
  await seedSingletons()
  await patchNavigation()
  console.log('\nDone. Refresh the frontend to see the new content.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
