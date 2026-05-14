/**
 * Translate every English value in every doc into Arabic, in place.
 * No API key needed — uses Google Translate's public endpoint.
 *
 * Run with:
 *   npx sanity exec scripts/translate-everything.ts --with-user-token
 *
 * What it covers:
 *   - Every singleton: navigation, homepage, aboutPage, contactPage,
 *     servicesPage, blogPage, faqsPage, caseStudiesPage, seoAuditPage,
 *     strategyForm.
 *   - Every service, caseStudy, blog, faq document.
 *   - Portable-text blog bodies translated span-by-span so formatting
 *     (headings, lists, links, inline images) is preserved.
 *
 * Idempotent — anything you've already translated (.ar already filled) is
 * left alone. Re-running picks up where it left off, so if it gets rate-
 * limited halfway through you can just run it again.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

// ---------------------------------------------------------------------------
// Translation primitive — Google Translate public endpoint
// ---------------------------------------------------------------------------

const ENDPOINT = 'https://translate.googleapis.com/translate_a/single'
const DELAY_MS = 120 // polite throttle to avoid rate-limiting

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function translateOne(en: string, attempt = 0): Promise<string> {
  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'en',
    tl: 'ar',
    dt: 't',
    q: en,
  })
  try {
    const res = await fetch(`${ENDPOINT}?${params.toString()}`)
    if (res.status === 429 || res.status >= 500) {
      // Backoff and retry
      if (attempt < 4) {
        await sleep(1500 * (attempt + 1))
        return translateOne(en, attempt + 1)
      }
      throw new Error(`HTTP ${res.status} after retries`)
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = (await res.json()) as unknown
    // Response shape: [[["مرحبا","Hello",null,null,1], ...], null, "en", ...]
    if (!Array.isArray(json) || !Array.isArray(json[0])) {
      throw new Error('Unexpected response shape')
    }
    const segments = json[0] as Array<Array<unknown>>
    const out = segments
      .map((seg) => (typeof seg?.[0] === 'string' ? (seg[0] as string) : ''))
      .join('')
    return out
  } catch (err) {
    if (attempt < 4) {
      await sleep(1500 * (attempt + 1))
      return translateOne(en, attempt + 1)
    }
    throw err
  }
}

const cache = new Map<string, string>()

async function translate(en: string): Promise<string> {
  if (!en || !en.trim()) return ''
  const cached = cache.get(en)
  if (cached !== undefined) return cached
  const ar = await translateOne(en)
  cache.set(en, ar)
  await sleep(DELAY_MS)
  return ar
}

// ---------------------------------------------------------------------------
// Walker — collects (english, setter) pairs from a doc tree
// ---------------------------------------------------------------------------

type AnyObj = Record<string, unknown>
type Pending = { en: string; setAr: (ar: string) => void }

function isLocaleObj(v: unknown): v is {en?: string; ar?: string} {
  return !!v && typeof v === 'object' && !Array.isArray(v)
    && (('en' in v) || ('ar' in v))
}

function inspectLocale(parent: AnyObj, key: string, pending: Pending[]) {
  const v = parent[key]
  if (typeof v === 'string') {
    const wrapped: AnyObj = {en: v, ar: ''}
    parent[key] = wrapped
    pending.push({en: v, setAr: (ar) => { (parent[key] as AnyObj).ar = ar }})
    return
  }
  if (!isLocaleObj(v)) return
  const obj = v as AnyObj
  const en = typeof obj.en === 'string' ? obj.en.trim() : ''
  const ar = typeof obj.ar === 'string' ? obj.ar.trim() : ''
  if (en && !ar) pending.push({en, setAr: (newAr) => { obj.ar = newAr }})
}

function walkArray(arr: unknown, keys: string[], pending: Pending[]) {
  if (!Array.isArray(arr)) return
  for (const item of arr) {
    if (item && typeof item === 'object') {
      for (const k of keys) inspectLocale(item as AnyObj, k, pending)
    }
  }
}

function walkLocaleArray(arr: unknown, pending: Pending[]) {
  if (!Array.isArray(arr)) return
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i]
    if (typeof v === 'string') {
      const wrapped: AnyObj = {_type: 'localeString', en: v, ar: ''}
      arr[i] = wrapped
      pending.push({en: v, setAr: (ar) => { (arr[i] as AnyObj).ar = ar }})
    } else if (isLocaleObj(v)) {
      const obj = v as AnyObj
      const en = typeof obj.en === 'string' ? obj.en.trim() : ''
      const ar = typeof obj.ar === 'string' ? obj.ar.trim() : ''
      if (en && !ar) pending.push({en, setAr: (newAr) => { obj.ar = newAr }})
    }
  }
}

function walkSeo(parent: AnyObj, pending: Pending[]) {
  const seo = parent.seo
  if (!seo || typeof seo !== 'object') return
  const s = seo as AnyObj
  for (const k of ['metaTitle', 'metaDescription', 'focusKeyword']) {
    inspectLocale(s, k, pending)
  }
}

function walkPortableText(blocks: unknown, pending: Pending[]) {
  if (!Array.isArray(blocks)) return
  for (const block of blocks) {
    if (!block || typeof block !== 'object') continue
    const b = block as AnyObj
    if (b._type !== 'block') continue
    const children = b.children
    if (!Array.isArray(children)) continue
    for (const child of children) {
      if (!child || typeof child !== 'object') continue
      const c = child as AnyObj
      if (c._type !== 'span') continue
      if (typeof c.text === 'string' && c.text.trim()) {
        pending.push({en: c.text, setAr: (ar) => { c.text = ar }})
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Per-doc walkers
// ---------------------------------------------------------------------------

const PAGE_FIELDS = [
  'eyebrow', 'title', 'subtitle', 'intro',
  'ctaTitle', 'ctaText', 'ctaButtonText',
  'cardCtaText', 'widgetTitle', 'successMessage',
]

function walkDoc(doc: AnyObj, pending: Pending[]) {
  switch (doc._type as string) {
    case 'navigation': {
      for (const k of ['copyright', 'contactColumnTitle', 'ctaText', 'address', 'footerDescription']) {
        inspectLocale(doc, k, pending)
      }
      const promo = doc.promoBanner as AnyObj | undefined
      if (promo) inspectLocale(promo, 'text', pending)
      walkArray(doc.items, ['label', 'megaHeadline'], pending)
      if (Array.isArray(doc.items)) {
        for (const it of doc.items as AnyObj[]) walkArray(it.megaItems, ['title', 'description'], pending)
      }
      walkArray(doc.footerColumns, ['columnTitle'], pending)
      if (Array.isArray(doc.footerColumns)) {
        for (const col of doc.footerColumns as AnyObj[]) walkArray(col.links, ['label'], pending)
      }
      break
    }
    case 'homepage': {
      const fields = [
        'heroEyebrow','title','subtitle','heroImageAlt','buttonText','secondaryButtonText',
        'proofEyebrow','clientsBannerTitle','systemEyebrow','systemTitle',
        'servicesEyebrow','servicesTitle','caseStudiesEyebrow','caseStudiesTitle',
        'caseStudiesLinkText','caseStudyCardCta','missionEyebrow','missionTitle','missionText',
        'workEyebrow','workTitle','blogPill','blogTitle','blogDescription','blogLinkText',
        'aboutEyebrow','aboutTitle','aboutText','aboutButtonText',
        'finalCtaTitle','finalCtaText','finalCtaButtonText','footerText',
      ]
      for (const k of fields) inspectLocale(doc, k, pending)
      walkSeo(doc, pending)
      walkArray(doc.proofItems,  ['label'], pending)
      walkArray(doc.growthSteps, ['title', 'text'], pending)
      walkArray(doc.aboutLogos,  ['name'], pending)
      walkArray(doc.clientLogos, ['name'], pending)
      break
    }
    case 'aboutPage': {
      const fields = [
        'eyebrow','title','subtitle','heroImageAlt','positioningTitle','positioning',
        'missionEyebrow','missionTitle','missionText',
        'methodologyEyebrow','methodologyTitle','methodologyText',
        'principlesEyebrow','principlesTitle','ctaTitle','ctaText','ctaButtonText',
      ]
      for (const k of fields) inspectLocale(doc, k, pending)
      walkSeo(doc, pending)
      walkLocaleArray(doc.principles, pending)
      break
    }
    case 'contactPage': {
      const fields = [
        'eyebrow','title','subtitle','address',
        'contactDetailsTitle','openLocationButton',
        'formEyebrow','formTitle','formSubtitle',
        'formSubmitText','formSuccessTitle','formSuccessText','formErrorMessage','formPrivacyNote',
        'ctaTagline','ctaSubTagline','ctaTitle','ctaText','ctaButtonText','ctaButtonNote',
      ]
      for (const k of fields) inspectLocale(doc, k, pending)
      walkSeo(doc, pending)
      const dl = doc.detailLabels as AnyObj | undefined
      if (dl) for (const k of ['workingHours','phone','email','location']) inspectLocale(dl, k, pending)
      const fp = doc.formPlaceholders as AnyObj | undefined
      if (fp) for (const k of ['name','email','phone','company','service','message']) inspectLocale(fp, k, pending)
      walkLocaleArray(doc.servicesOptions, pending)
      break
    }
    case 'servicesPage':
    case 'blogPage':
    case 'faqsPage':
    case 'caseStudiesPage':
    case 'seoAuditPage': {
      for (const k of PAGE_FIELDS) inspectLocale(doc, k, pending)
      walkSeo(doc, pending)
      const ph = doc.placeholders as AnyObj | undefined
      if (ph) for (const k of ['url','firstName','email','phone','submit']) inspectLocale(ph, k, pending)
      const cl = doc.categoryLabels as AnyObj | undefined
      if (cl) for (const k of ['general','websiteDevelopment','seo','socialMedia','branding','bulkSms','paidAds','aiLlmoGeo']) inspectLocale(cl, k, pending)
      break
    }
    case 'strategyForm': {
      const fields = [
        'eyebrow','title','subtitle','submitText','successMessage','errorMessage',
        'trustEyebrow','processEyebrow','processTitle','testimonialsEyebrow','testimonialsTitle',
      ]
      for (const k of fields) inspectLocale(doc, k, pending)
      walkSeo(doc, pending)
      const ph = doc.placeholders as AnyObj | undefined
      if (ph) for (const k of ['name','email','country','phone','company','budget','message','service']) inspectLocale(ph, k, pending)
      walkLocaleArray(doc.services, pending)
      walkLocaleArray(doc.budgetOptions, pending)
      walkArray(doc.trustLogos,   ['name'], pending)
      walkArray(doc.processSteps, ['title', 'description'], pending)
      walkArray(doc.testimonials, ['quote', 'authorName', 'authorTitle'], pending)
      break
    }
    case 'service': {
      const fields = [
        'title','description','content','whyItMatters','ctaTitle','ctaText',
        'heroEyebrow','heroCtaButtonText',
        'whatWeBuildEyebrow','whatWeBuildTitle','whyItMattersEyebrow','whyItMattersTitle',
        'deliverablesEyebrow','deliverablesTitle','projectsEyebrow','projectsTitle',
        'faqsEyebrow','faqsTitle','finalCtaButtonText',
      ]
      for (const k of fields) inspectLocale(doc, k, pending)
      walkSeo(doc, pending)
      walkLocaleArray(doc.deliverables, pending)
      walkArray(doc.projects, ['clientName','title','description','category'], pending)
      if (Array.isArray(doc.sections)) {
        for (const section of doc.sections as AnyObj[]) {
          for (const k of ['eyebrow','title','subtitle','content','caption','text','buttonText']) {
            inspectLocale(section, k, pending)
          }
          walkLocaleArray(section.items, pending)
        }
      }
      break
    }
    case 'caseStudy': {
      for (const k of ['title','category','industry','description','challenge','solution','results']) {
        inspectLocale(doc, k, pending)
      }
      walkSeo(doc, pending)
      break
    }
    case 'blog': {
      for (const k of ['title','excerpt','category','author']) inspectLocale(doc, k, pending)
      walkSeo(doc, pending)
      walkPortableText(doc.content, pending)
      break
    }
    case 'faq': {
      for (const k of ['question', 'answer']) inspectLocale(doc, k, pending)
      break
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const TYPES = [
  'navigation','homepage','aboutPage','contactPage',
  'servicesPage','blogPage','faqsPage','caseStudiesPage','seoAuditPage',
  'strategyForm',
  'service','caseStudy','blog','faq',
]

async function main() {
  for (const type of TYPES) {
    const docs: AnyObj[] = await client.fetch(
      `*[_type == $type && !(_id in path("drafts.**"))]`,
      {type},
    )
    if (docs.length === 0) {
      console.log(`(${type}) no docs`)
      continue
    }

    console.log(`\n[${type}] scanning ${docs.length} doc(s)…`)

    for (const doc of docs) {
      const pending: Pending[] = []
      walkDoc(doc, pending)

      // Dedupe to save round-trips
      const uniqueEn = Array.from(new Set(pending.map((p) => p.en)))
      if (uniqueEn.length === 0) continue

      console.log(`  • ${doc._id} — translating ${uniqueEn.length} string(s)…`)
      const arMap = new Map<string, string>()
      for (let i = 0; i < uniqueEn.length; i++) {
        const en = uniqueEn[i]
        try {
          arMap.set(en, await translate(en))
          if ((i + 1) % 10 === 0) console.log(`      ${i + 1}/${uniqueEn.length}`)
        } catch (err) {
          console.warn(`      skipped "${en.slice(0, 40)}…" — ${(err as Error).message}`)
          arMap.set(en, '')
        }
      }

      // Apply
      for (const p of pending) {
        const ar = arMap.get(p.en)
        if (ar) p.setAr(ar)
      }

      // Patch only top-level keys we touched
      const setPatch: AnyObj = {}
      for (const key of Object.keys(doc)) {
        if (key.startsWith('_')) continue
        setPatch[key] = doc[key]
      }
      await client.patch(doc._id as string).set(setPatch).commit()
      console.log(`      ✓ ${doc._id} patched`)
    }
  }

  console.log('\nDone. Refresh the frontend.')
}

main().catch((err) => {
  console.error('Translation failed:', err)
  process.exit(1)
})
