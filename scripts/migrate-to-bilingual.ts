/**
 * One-shot migration: wrap every existing plain string into `{en: value, ar: ''}`
 * for every field that became a localeString/localeText in Phase 5.
 *
 * Run with:
 *   npx sanity exec scripts/migrate-to-bilingual.ts --with-user-token
 *
 * Idempotent: fields already in the {en, ar} shape are skipped. Safe to re-run.
 * Leaves the Arabic slot blank — editors fill it in over time, and the frontend
 * `localize()` helper falls back to English when Arabic is missing.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type AnyObj = Record<string, unknown>

/** Wrap a plain string into the localized shape. */
function wrap(value: unknown): AnyObj | undefined {
  if (value == null) return undefined
  if (typeof value === 'object' && !Array.isArray(value)) {
    const o = value as AnyObj
    // Already localized — leave alone
    if ('en' in o || 'ar' in o) return o
  }
  if (typeof value !== 'string') return undefined
  return {en: value, ar: ''}
}

/** Convert any localized fields in `obj` at the given keys, mutating in place. */
function wrapFields(obj: AnyObj | undefined, keys: string[]): boolean {
  if (!obj) return false
  let changed = false
  for (const key of keys) {
    const v = obj[key]
    if (typeof v === 'string') {
      obj[key] = {en: v, ar: ''}
      changed = true
    }
  }
  return changed
}

/** Walk an array of objects and apply wrapFields to each. */
function wrapArray(
  arr: unknown,
  keys: string[],
  nested?: Array<{key: string; keys: string[]; nested?: Parameters<typeof wrapArray>[2]}>,
): boolean {
  if (!Array.isArray(arr)) return false
  let changed = false
  for (const item of arr) {
    if (typeof item !== 'object' || !item) continue
    if (wrapFields(item as AnyObj, keys)) changed = true
    if (nested) {
      for (const n of nested) {
        const child = (item as AnyObj)[n.key]
        if (wrapArray(child, n.keys, n.nested)) changed = true
      }
    }
  }
  return changed
}

// ---------------------------------------------------------------------------
// Per-doc migrators
// ---------------------------------------------------------------------------

function migrateNavigation(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, ['copyright', 'contactColumnTitle', 'ctaText', 'address', 'footerDescription']) || changed
  // Promo banner
  const promo = doc.promoBanner as AnyObj | undefined
  if (promo) {
    changed = wrapFields(promo, ['text']) || changed
  }
  // Items (nav)
  changed = wrapArray(doc.items, ['label', 'megaHeadline'], [
    {key: 'megaItems', keys: ['title', 'description']},
  ]) || changed
  // Footer columns
  changed = wrapArray(doc.footerColumns, ['columnTitle'], [
    {key: 'links', keys: ['label']},
  ]) || changed
  return changed
}

function migrateHomepage(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, [
    'heroEyebrow', 'title', 'subtitle', 'heroImageAlt', 'buttonText',
    'secondaryButtonText',
    'aboutEyebrow', 'aboutTitle', 'aboutText', 'aboutButtonText',
    'missionTitle', 'missionText',
    'finalCtaTitle', 'finalCtaText',
    'clientsBannerTitle', 'systemEyebrow', 'systemTitle',
    'servicesEyebrow', 'servicesTitle',
    'caseStudiesEyebrow', 'caseStudiesTitle', 'caseStudiesLinkText', 'caseStudyCardCta',
    'missionEyebrow', 'workEyebrow', 'workTitle',
    'blogPill', 'blogTitle', 'blogDescription', 'blogLinkText',
    'proofEyebrow', 'finalCtaButtonText', 'footerText',
  ]) || changed
  // SEO sub-object
  const seo = doc.seo as AnyObj | undefined
  if (seo) {
    changed = wrapFields(seo, ['metaTitle', 'metaDescription', 'focusKeyword']) || changed
  }
  // Arrays
  changed = wrapArray(doc.proofItems, ['label']) || changed
  changed = wrapArray(doc.growthSteps, ['title', 'text']) || changed
  changed = wrapArray(doc.aboutLogos, ['name']) || changed
  changed = wrapArray(doc.clientLogos, ['name']) || changed
  return changed
}

function migrateAboutPage(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, [
    'eyebrow', 'title', 'subtitle', 'heroImageAlt',
    'positioningTitle', 'positioning',
    'missionEyebrow', 'missionTitle', 'missionText',
    'methodologyEyebrow', 'methodologyTitle', 'methodologyText',
    'principlesEyebrow', 'principlesTitle',
    'ctaTitle', 'ctaText', 'ctaButtonText',
  ]) || changed
  const seo = doc.seo as AnyObj | undefined
  if (seo) {
    changed = wrapFields(seo, ['metaTitle', 'metaDescription', 'focusKeyword']) || changed
  }
  // principles is an array of strings → array of localizedString objects
  if (Array.isArray(doc.principles)) {
    const next = doc.principles.map((p) =>
      typeof p === 'string' ? {_type: 'localeString', en: p, ar: ''} : p,
    )
    if (next.some((_, i) => next[i] !== (doc.principles as unknown[])[i])) {
      doc.principles = next
      changed = true
    }
  }
  return changed
}

function migrateContactPage(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, [
    'eyebrow', 'title', 'subtitle',
    'contactDetailsTitle', 'openLocationButton', 'formEyebrow',
    'formTitle', 'formSubtitle', 'formSubmitText',
    'formSuccessTitle', 'formSuccessText', 'formErrorMessage', 'formPrivacyNote',
    'ctaTagline', 'ctaSubTagline', 'ctaTitle', 'ctaText', 'ctaButtonText', 'ctaButtonNote',
  ]) || changed
  const seo = doc.seo as AnyObj | undefined
  if (seo) changed = wrapFields(seo, ['metaTitle', 'metaDescription', 'focusKeyword']) || changed
  const dl = doc.detailLabels as AnyObj | undefined
  if (dl) changed = wrapFields(dl, ['workingHours', 'phone', 'email', 'location']) || changed
  const fp = doc.formPlaceholders as AnyObj | undefined
  if (fp) changed = wrapFields(fp, ['name', 'email', 'phone', 'company', 'service', 'message']) || changed
  // servicesOptions: array of strings
  if (Array.isArray(doc.servicesOptions)) {
    const next = doc.servicesOptions.map((s) =>
      typeof s === 'string' ? {_type: 'localeString', en: s, ar: ''} : s,
    )
    if (next.length > 0) {
      doc.servicesOptions = next
      changed = true
    }
  }
  return changed
}

function migrateGenericIndex(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, ['eyebrow', 'title', 'subtitle', 'intro',
    'ctaTitle', 'ctaText', 'ctaButtonText', 'cardCtaText', 'widgetTitle',
    'successMessage', 'introTitle']) || changed
  const seo = doc.seo as AnyObj | undefined
  if (seo) changed = wrapFields(seo, ['metaTitle', 'metaDescription', 'focusKeyword']) || changed
  const ph = doc.placeholders as AnyObj | undefined
  if (ph) changed = wrapFields(ph, ['url', 'firstName', 'email', 'phone', 'submit']) || changed
  const cl = doc.categoryLabels as AnyObj | undefined
  if (cl) {
    changed = wrapFields(cl, [
      'general', 'websiteDevelopment', 'seo', 'socialMedia',
      'branding', 'bulkSms', 'paidAds', 'aiLlmoGeo',
    ]) || changed
  }
  return changed
}

function migrateService(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, [
    'heroEyebrow', 'heroCtaButtonText',
    'title', 'description', 'content', 'whyItMatters',
    'ctaTitle', 'ctaText',
    'whatWeBuildEyebrow', 'whatWeBuildTitle',
    'whyItMattersEyebrow', 'whyItMattersTitle',
    'deliverablesEyebrow', 'deliverablesTitle',
    'projectsEyebrow', 'projectsTitle',
    'faqsEyebrow', 'faqsTitle',
    'finalCtaButtonText',
  ]) || changed
  const seo = doc.seo as AnyObj | undefined
  if (seo) changed = wrapFields(seo, ['metaTitle', 'metaDescription', 'focusKeyword']) || changed
  // deliverables: array of strings → array of localeString
  if (Array.isArray(doc.deliverables)) {
    const next = doc.deliverables.map((d) =>
      typeof d === 'string' ? {_type: 'localeString', en: d, ar: ''} : d,
    )
    if (next.length > 0) {
      doc.deliverables = next
      changed = true
    }
  }
  changed = wrapArray(doc.projects, ['clientName', 'title', 'description', 'category']) || changed
  // sections: page builder. Each section has localized fields per type.
  if (Array.isArray(doc.sections)) {
    for (const s of doc.sections as AnyObj[]) {
      if (!s || typeof s !== 'object') continue
      changed = wrapFields(s, ['eyebrow', 'title', 'subtitle', 'content', 'caption', 'text', 'buttonText']) || changed
      if (Array.isArray(s.items)) {
        const next = (s.items as unknown[]).map((it) =>
          typeof it === 'string' ? {_type: 'localeString', en: it, ar: ''} : it,
        )
        if (next.length > 0) {
          s.items = next
          changed = true
        }
      }
    }
  }
  return changed
}

function migrateCaseStudy(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, [
    'title', 'category', 'industry',
    'description', 'challenge', 'solution', 'results',
  ]) || changed
  const seo = doc.seo as AnyObj | undefined
  if (seo) changed = wrapFields(seo, ['metaTitle', 'metaDescription', 'focusKeyword']) || changed
  return changed
}

function migrateBlog(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, ['title', 'excerpt', 'category', 'author']) || changed
  const seo = doc.seo as AnyObj | undefined
  if (seo) changed = wrapFields(seo, ['metaTitle', 'metaDescription', 'focusKeyword']) || changed
  // Note: content (portable text) is intentionally NOT touched here — that's
  // a separate migration if bilingual blog bodies are needed.
  return changed
}

function migrateFaq(doc: AnyObj): boolean {
  return wrapFields(doc, ['question', 'answer'])
}

function migrateStrategyForm(doc: AnyObj): boolean {
  let changed = false
  changed = wrapFields(doc, [
    'eyebrow', 'title', 'subtitle', 'submitText',
    'successMessage', 'errorMessage',
    'trustEyebrow', 'processEyebrow', 'processTitle',
    'testimonialsEyebrow', 'testimonialsTitle',
  ]) || changed
  const seo = doc.seo as AnyObj | undefined
  if (seo) changed = wrapFields(seo, ['metaTitle', 'metaDescription', 'focusKeyword']) || changed
  const ph = doc.placeholders as AnyObj | undefined
  if (ph) changed = wrapFields(ph, ['name', 'email', 'country', 'phone', 'company', 'budget', 'message', 'service']) || changed
  // services & budgetOptions arrays
  if (Array.isArray(doc.services)) {
    doc.services = (doc.services as unknown[]).map((s) =>
      typeof s === 'string' ? {_type: 'localeString', en: s, ar: ''} : s,
    )
    changed = true
  }
  if (Array.isArray(doc.budgetOptions)) {
    doc.budgetOptions = (doc.budgetOptions as unknown[]).map((s) =>
      typeof s === 'string' ? {_type: 'localeString', en: s, ar: ''} : s,
    )
    changed = true
  }
  changed = wrapArray(doc.trustLogos, ['name']) || changed
  changed = wrapArray(doc.processSteps, ['title', 'description']) || changed
  changed = wrapArray(doc.testimonials, ['quote', 'authorName', 'authorTitle']) || changed
  return changed
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

const MIGRATORS: Record<string, (doc: AnyObj) => boolean> = {
  navigation: migrateNavigation,
  homepage: migrateHomepage,
  aboutPage: migrateAboutPage,
  contactPage: migrateContactPage,
  servicesPage: migrateGenericIndex,
  blogPage: migrateGenericIndex,
  faqsPage: migrateGenericIndex,
  caseStudiesPage: migrateGenericIndex,
  seoAuditPage: migrateGenericIndex,
  service: migrateService,
  caseStudy: migrateCaseStudy,
  blog: migrateBlog,
  faq: migrateFaq,
  strategyForm: migrateStrategyForm,
}

async function main() {
  for (const [type, migrator] of Object.entries(MIGRATORS)) {
    const docs: AnyObj[] = await client.fetch(
      `*[_type == $type && !(_id in path("drafts.**"))]`,
      {type},
    )
    if (docs.length === 0) {
      console.log(`(${type}) no docs`)
      continue
    }
    const tx = client.transaction()
    let mutated = 0
    for (const doc of docs) {
      const before = JSON.stringify(doc)
      if (migrator(doc)) {
        const after = JSON.stringify(doc)
        if (after !== before) {
          // Build a `set` patch for just the top-level keys we changed
          const setPatch: AnyObj = {}
          for (const key of Object.keys(doc)) {
            if (key.startsWith('_')) continue
            setPatch[key] = doc[key]
          }
          tx.patch(doc._id as string, {set: setPatch})
          mutated++
        }
      }
    }
    if (mutated > 0) {
      await tx.commit()
    }
    console.log(`(${type}) ${mutated}/${docs.length} doc(s) migrated`)
  }
  console.log('\nDone. Refresh the frontend.')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
