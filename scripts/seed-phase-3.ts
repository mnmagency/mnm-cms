/**
 * Phase 3 seed:
 *   - Patches homepage / aboutPage / contactPage / service docs with section
 *     labels (eyebrows, titles, button text) using setIfMissing so editor
 *     changes are never overwritten.
 *   - Migrates any data from the deprecated `strategyFormSettings` doc into
 *     `strategyForm`, then deletes the old doc.
 *
 * Run with:
 *   npx sanity exec scripts/seed-phase-3.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

// ---------------------------------------------------------------------------
// Homepage defaults
// ---------------------------------------------------------------------------

const HOMEPAGE_DEFAULTS = {
  heroEyebrow: 'AI-Driven Growth Partner in Qatar',
  heroImageAlt: 'M&M Marketing Growth System',
  proofEyebrow: 'Revenue Proof',
  clientsBannerTitle: 'Trusted by brands across Qatar',
  systemEyebrow: 'The Growth System',
  systemTitle: "We don't run random campaigns. We build revenue systems.",
  servicesEyebrow: 'Our Services',
  servicesTitle: 'Services built to generate revenue.',
  caseStudiesEyebrow: 'Proven Results',
  caseStudiesTitle: 'Real businesses. Real measurable growth.',
  caseStudiesLinkText: 'View all case studies →',
  caseStudyCardCta: 'View Case Study →',
  missionEyebrow: 'Our Mission',
  workEyebrow: 'Selected Work',
  workTitle: 'Work that turns attention into measurable growth.',
  blogPill: 'Daily News',
  blogTitle: 'Read from our blog',
  blogDescription:
    'Insights on websites, SEO, social media, AI-driven growth, and revenue systems.',
  blogLinkText: 'Read more from the blog ›',
}

// ---------------------------------------------------------------------------
// About page defaults
// ---------------------------------------------------------------------------

const ABOUT_DEFAULTS = {
  eyebrow: 'About',
  heroImageAlt: 'About M&M Marketing',
  positioningTitle: "We don't just market. We build growth systems.",
  missionEyebrow: 'Mission',
  methodologyEyebrow: 'Methodology',
  principlesEyebrow: 'Principles',
  principlesTitle: 'How we think. How we execute.',
  ctaButtonText: 'Get Your AI Growth Strategy',
  ctaButtonLink: '/get-strategy',
}

// ---------------------------------------------------------------------------
// Contact page defaults
// ---------------------------------------------------------------------------

const CONTACT_DEFAULTS = {
  eyebrow: 'Contact M&M',
  contactDetailsTitle: 'Contact Details',
  detailLabels: {
    workingHours: 'Working Hours:',
    phone: 'Phone:',
    email: 'Email:',
    location: 'Location:',
  },
  openLocationButton: 'Open Location',
  formEyebrow: "Let's Talk",
  ctaTagline: 'Your growth is our mission.',
  ctaSubTagline: "Let's achieve it together.",
  ctaButtonText: 'Get Your AI Growth Strategy',
  ctaButtonLink: '/get-strategy',
  ctaButtonNote: 'No commitment. Strategy call within 24 hours.',
}

// ---------------------------------------------------------------------------
// Per-service defaults
// ---------------------------------------------------------------------------

const SERVICE_DEFAULTS = {
  heroEyebrow: 'M&M Service',
  heroCtaButtonText: 'Get Your AI Growth Strategy',
  heroCtaButtonLink: '/get-strategy',
  whatWeBuildEyebrow: 'What We Build',
  whatWeBuildTitle: 'Built as a revenue system, not a digital brochure.',
  whyItMattersEyebrow: 'Why It Matters',
  whyItMattersTitle: 'Your digital presence directly affects growth.',
  deliverablesEyebrow: 'Deliverables',
  deliverablesTitle:
    'Everything needed to turn strategy into measurable execution.',
  projectsEyebrow: 'Companies We Worked For',
  projectsTitle: 'Selected projects built to create measurable growth.',
  faqsEyebrow: 'FAQs',
  faqsTitle: 'Frequently Asked Questions',
  finalCtaButtonText: 'Get Your AI Growth Strategy',
  finalCtaButtonLink: '/get-strategy',
}

// ---------------------------------------------------------------------------
// Strategy form defaults
// ---------------------------------------------------------------------------

const STRATEGY_FORM_DEFAULTS = {
  eyebrow: 'Tell us about your business',
  title: 'Get Your AI Growth Strategy',
  subtitle:
    'Share a few details about your business, market, and goals. Our team will respond with a tailored growth strategy within 24 hours.',
  placeholders: {
    name: 'Your Name',
    email: 'Email Address',
    country: 'Country',
    phone: 'Phone Number',
    company: 'Company Name',
    budget: 'Monthly Marketing Budget',
    message: 'What do you want to achieve?',
    service: 'Select Service',
  },
  services: [
    'Website Development',
    'Social Media Management',
    'SEO',
    'SEM / Google Ads',
    'Bulk SMS',
    'Branding',
    'Media Buying',
    'LLMO / GEO',
  ],
  budgetOptions: [
    'Below 5,000 QAR',
    '5,000 - 10,000 QAR',
    '10,000 - 25,000 QAR',
    '25,000 - 50,000 QAR',
    '50,000+ QAR',
  ],
  submitText: 'Get Strategy',
  successMessage:
    "Thanks — your strategy request is in. Our team will reach out within 24 hours.",
  errorMessage:
    'Sorry, something went wrong. Please try again or email us directly.',
  seo: {
    _type: 'seo',
    metaTitle: 'Get Your AI Growth Strategy | M&M Marketing Qatar',
    metaDescription:
      'Get a tailored AI-driven marketing growth strategy from M&M Marketing in Qatar. Tell us about your business and goals — we respond within 24 hours.',
    focusKeyword: 'marketing strategy Qatar',
    canonicalUrl: 'https://mnmagency.com/get-strategy',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function patchSingleton(type: string, defaults: Record<string, unknown>) {
  const existing: {_id?: string} | null = await client.fetch(
    `*[_type == $type][0]{ _id }`,
    {type},
  )
  if (!existing?._id) {
    console.log(`  · no ${type} doc exists yet — creating one with defaults`)
    await client.create({_type: type, ...defaults})
    return
  }
  await client.patch(existing._id).setIfMissing(defaults).commit()
  console.log(`  ✓ patched ${type}`)
}

async function patchAllServices() {
  const services: Array<{_id: string; title?: string}> = await client.fetch(
    `*[_type == "service"]{ _id, title }`,
  )
  if (services.length === 0) {
    console.log('  · no service docs to patch')
    return
  }
  const tx = client.transaction()
  services.forEach((s) => {
    tx.patch(s._id, {setIfMissing: SERVICE_DEFAULTS})
  })
  await tx.commit()
  console.log(`  ✓ patched ${services.length} service doc(s)`)
}

async function migrateStrategyFormSettings() {
  // Pull any legacy strategyFormSettings doc(s)
  const old: Array<{
    _id: string
    title?: string
    subtitle?: string
    services?: string[]
    budgetOptions?: string[]
    successMessage?: string
    recipientEmail?: string
  }> = await client.fetch(
    `*[_type == "strategyFormSettings"]{
      _id, title, subtitle, services, budgetOptions, successMessage, recipientEmail
    }`,
  )

  // Find the canonical strategyForm doc (or create one)
  const target: {_id?: string} | null = await client.fetch(
    `*[_type == "strategyForm"][0]{ _id }`,
  )

  const migrated: Record<string, unknown> = {}
  for (const o of old) {
    if (o.title && !migrated.title) migrated.title = o.title
    if (o.subtitle && !migrated.subtitle) migrated.subtitle = o.subtitle
    if (o.services && o.services.length && !migrated.services) migrated.services = o.services
    if (o.budgetOptions && o.budgetOptions.length && !migrated.budgetOptions) migrated.budgetOptions = o.budgetOptions
    if (o.successMessage && !migrated.successMessage) migrated.successMessage = o.successMessage
    if (o.recipientEmail && !migrated.recipientEmail) migrated.recipientEmail = o.recipientEmail
  }

  if (!target?._id) {
    console.log('  · no strategyForm doc — creating with defaults' + (old.length ? ' (and migrated legacy data)' : ''))
    await client.create({_type: 'strategyForm', ...STRATEGY_FORM_DEFAULTS, ...migrated})
  } else {
    // setIfMissing the migrated values first (so they win over defaults), then
    // setIfMissing the defaults (filling in anything still blank).
    await client
      .patch(target._id)
      .setIfMissing(migrated)
      .setIfMissing(STRATEGY_FORM_DEFAULTS)
      .commit()
    console.log(`  ✓ patched strategyForm${old.length ? ' (migrated from legacy strategyFormSettings)' : ''}`)
  }

  // Delete legacy docs
  if (old.length > 0) {
    const tx = client.transaction()
    old.forEach((o) => tx.delete(o._id))
    await tx.commit()
    console.log(`  ✓ deleted ${old.length} legacy strategyFormSettings doc(s)`)
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Patching homepage…')
  await patchSingleton('homepage', HOMEPAGE_DEFAULTS)

  console.log('Patching aboutPage…')
  await patchSingleton('aboutPage', ABOUT_DEFAULTS)

  console.log('Patching contactPage…')
  await patchSingleton('contactPage', CONTACT_DEFAULTS)

  console.log('Patching service docs…')
  await patchAllServices()

  console.log('Migrating strategy form…')
  await migrateStrategyFormSettings()

  console.log('\nDone. Refresh the frontend to see the new content.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
