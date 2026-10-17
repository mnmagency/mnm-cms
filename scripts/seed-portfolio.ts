/**
 * Seed the Web Development portfolio.
 *
 *   1. portfolioPage singleton — every label on /portfolio and /portfolio/{slug}
 *   2. webProject documents from scripts/portfolio-projects.ts
 *        (ICC Qatar + Denza migrated from the old inline cards, reusing their
 *         existing images; HEC Mannai added new)
 *   3. Web Development service → featuredWebProjects references
 *   4. Navigation "Our Work" → /portfolio (was /work, which only redirected
 *      to /case-studies and duplicated that menu item)
 *
 * Safe to re-run: existing documents are NOT overwritten unless you pass
 * --update (text fields only; images you replaced in Studio are kept).
 * The old inline `projects[]` on the service is left untouched as a fallback.
 *
 * Images for new projects: seed-assets/portfolio/<slug>.(jpg|png|webp);
 * if missing, the live site's og:image is downloaded instead.
 *
 * Run (uses your Sanity login — no token needed):
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-portfolio.ts --with-user-token
 *   npx sanity exec scripts/seed-portfolio.ts --with-user-token -- --update
 */
/* eslint-disable no-console */

import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {PORTFOLIO_PROJECTS, type PortfolioProject} from './portfolio-projects'

const client = getCliClient({apiVersion: '2024-01-01'})
const UPDATE = process.argv.includes('--update') || process.env.UPDATE === '1'

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

// ─── 1. Portfolio page labels ────────────────────────────────────────────────
const PORTFOLIO_PAGE = {
  eyebrow: L('Portfolio', 'أعمالنا'),
  title: L('Websites we’ve designed and built', 'مواقع صممناها وطورناها'),
  subtitle: L(
    'Corporate sites, e-commerce platforms and web portals delivered by M&M for brands in Qatar and the GCC — fast, bilingual and fully editable by your team.',
    'مواقع مؤسسية ومنصات تجارة إلكترونية وبوابات ويب نفذتها M&M لعلامات تجارية في قطر ودول الخليج — سريعة وثنائية اللغة وقابلة للتعديل بالكامل من فريقك.',
  ),
  allFilterText: L('All', 'الكل'),
  cardCtaText: L('View Project →', 'عرض المشروع ←'),
  viewAllText: L('View full portfolio', 'عرض جميع الأعمال'),
  backText: L('← Back to Portfolio', '→ العودة إلى أعمالنا'),
  visitSiteText: L('Visit Website ↗', 'زيارة الموقع ↗'),
  clientLabel: L('Client', 'العميل'),
  industryLabel: L('Industry', 'القطاع'),
  typeLabel: L('Project Type', 'نوع المشروع'),
  yearLabel: L('Year', 'السنة'),
  techLabel: L('Technologies', 'التقنيات'),
  overviewLabel: L('Overview', 'نظرة عامة'),
  challengeLabel: L('The Challenge', 'التحدي'),
  solutionLabel: L('What We Built', 'ما الذي بنيناه'),
  resultsLabel: L('Results', 'النتائج'),
  featuresLabel: L('Key Features', 'أبرز المزايا'),
  caseStudyText: L('Read the full case study →', 'اقرأ دراسة الحالة كاملة ←'),
  moreProjectsTitle: L('More projects', 'مشاريع أخرى'),
  ctaTitle: L('Want a website like this?', 'تريد موقعاً مثل هذا؟'),
  ctaText: L(
    'Tell us about your business and we’ll plan a fast, bilingual website built to rank and convert in Qatar.',
    'أخبرنا عن عملك وسنخطط لموقع سريع وثنائي اللغة مصمم ليتصدر نتائج البحث ويحقق التحويلات في قطر.',
  ),
  ctaButtonText: L('Get Free Consultation', 'احصل على استشارة مجانية'),
  ctaButtonLink: '/get-strategy',
  seo: {
    _type: 'seo',
    metaTitle: L('Web Development Portfolio Qatar | M&M Marketing', 'أعمال تطوير المواقع في قطر | M&M للتسويق'),
    metaDescription: L(
      'Websites designed and developed by M&M Marketing for brands in Qatar and the GCC — corporate, e-commerce and web portals built on modern stacks.',
      'مواقع صممتها وطورتها M&M للتسويق لعلامات تجارية في قطر والخليج — مواقع مؤسسية ومتاجر إلكترونية وبوابات ويب بأحدث التقنيات.',
    ),
  },
}

// ─── helpers ────────────────────────────────────────────────────────────────
const imageRef = (assetId: string) => ({_type: 'image', asset: {_type: 'reference', _ref: assetId}})

async function findLocalImage(slug: string): Promise<string | null> {
  const dir = path.join(process.cwd(), 'seed-assets', 'portfolio')
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const p = path.join(dir, `${slug}.${ext}`)
    if (fs.existsSync(p)) return p
  }
  return null
}

async function fetchOgImage(siteUrl: string): Promise<{buf: Buffer; name: string} | null> {
  try {
    const html = await (await fetch(siteUrl, {redirect: 'follow'})).text()
    const m =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
    if (!m) return null
    const imgUrl = new URL(m[1], siteUrl).toString()
    const res = await fetch(imgUrl)
    if (!res.ok) return null
    return {buf: Buffer.from(await res.arrayBuffer()), name: path.basename(new URL(imgUrl).pathname) || 'og-image.jpg'}
  } catch (e) {
    console.warn(`   ! could not fetch og:image from ${siteUrl}: ${(e as Error).message}`)
    return null
  }
}

async function resolveHeroImage(p: PortfolioProject) {
  if (p.heroImageAssetId) return imageRef(p.heroImageAssetId)
  const local = await findLocalImage(p.slug)
  if (local) {
    console.log(`   ↑ uploading ${path.relative(process.cwd(), local)}`)
    const asset = await client.assets.upload('image', fs.createReadStream(local), {filename: path.basename(local)})
    return imageRef(asset._id)
  }
  if (p.websiteUrl) {
    const og = await fetchOgImage(p.websiteUrl)
    if (og) {
      console.log(`   ↑ uploading og:image from ${p.websiteUrl}`)
      const asset = await client.assets.upload('image', og.buf, {filename: `${p.slug}-${og.name}`})
      return imageRef(asset._id)
    }
  }
  console.warn(`   ! no image for ${p.slug} — add one in Studio or at seed-assets/portfolio/${p.slug}.jpg and re-run`)
  return undefined
}

function textFields(p: PortfolioProject) {
  return Object.fromEntries(
    Object.entries({
      title: p.title,
      slug: {_type: 'slug', current: p.slug},
      clientName: p.clientName,
      websiteUrl: p.websiteUrl,
      category: p.category,
      projectType: p.projectType,
      year: p.year,
      technologies: p.technologies,
      summary: p.summary,
      overview: p.overview,
      challenge: p.challenge,
      solution: p.solution,
      results: p.results,
      features: p.features?.map((f, i) => ({_key: `f${i}`, _type: 'localeString', ...f})),
      order: p.order,
      seo: p.seo ? {_type: 'seo', ...p.seo} : undefined,
    }).filter(([, v]) => v !== undefined),
  )
}

// ─── main ───────────────────────────────────────────────────────────────────
async function run() {
  console.log(`Seeding portfolio${UPDATE ? ' (--update: refreshing text fields)' : ''}\n`)

  // 1. portfolioPage
  await client.createIfNotExists({_id: 'portfolioPage', _type: 'portfolioPage'})
  await client.patch('portfolioPage').setIfMissing(PORTFOLIO_PAGE).commit()
  if (UPDATE) await client.patch('portfolioPage').set(PORTFOLIO_PAGE).commit()
  console.log('✓ portfolioPage')

  // 2. webProjects
  const caseStudyIds: Record<string, string> = Object.fromEntries(
    (await client.fetch<{slug: string; _id: string}[]>(`*[_type == "caseStudy" && !(_id in path("drafts.**"))]{ "slug": slug.current, _id }`)).map(
      (c) => [c.slug, c._id],
    ),
  )

  for (const p of PORTFOLIO_PROJECTS) {
    const _id = `webProject-${p.id}`
    const existing = await client.fetch<{_id: string; hasImage: boolean} | null>(
      `*[_id == $id][0]{ _id, "hasImage": defined(heroImage.asset) }`,
      {id: _id},
    )
    console.log(`• ${p.slug}${existing ? ' (exists)' : ''}`)

    const rel = p.relatedCaseStudySlug && caseStudyIds[p.relatedCaseStudySlug]
    if (p.relatedCaseStudySlug && !rel) console.warn(`   ! case study "${p.relatedCaseStudySlug}" not found`)

    if (!existing) {
      const heroImage = await resolveHeroImage(p)
      await client.create({
        _id,
        _type: 'webProject',
        ...textFields(p),
        ...(heroImage ? {heroImage} : {}),
        ...(p.clientLogoAssetId ? {clientLogo: imageRef(p.clientLogoAssetId)} : {}),
        ...(rel ? {relatedCaseStudy: {_type: 'reference', _ref: rel}} : {}),
      })
      console.log('   ✓ created')
    } else {
      let patch = client.patch(_id)
      if (UPDATE) patch = patch.set(textFields(p))
      if (!existing.hasImage) {
        const heroImage = await resolveHeroImage(p)
        if (heroImage) patch = patch.set({heroImage})
      }
      if (rel) patch = patch.setIfMissing({relatedCaseStudy: {_type: 'reference', _ref: rel}})
      if (p.clientLogoAssetId) patch = patch.setIfMissing({clientLogo: imageRef(p.clientLogoAssetId)})
      await patch.commit()
      console.log(UPDATE ? '   ✓ updated' : '   ✓ kept (pass --update to refresh text)')
    }
  }

  // 3. Web Development service references
  const svc = await client.fetch<{_id: string; refs: string[] | null} | null>(
    `*[_type == "service" && slug.current == "web-development" && !(_id in path("drafts.**"))][0]{ _id, "refs": featuredWebProjects[]._ref }`,
  )
  if (!svc) {
    console.warn('! web-development service not found — skipped references')
  } else {
    const have = new Set(svc.refs || [])
    const add = PORTFOLIO_PROJECTS.filter((p) => p.showOnWebDevPage)
      .sort((a, b) => a.order - b.order)
      .map((p) => `webProject-${p.id}`)
      .filter((id) => !have.has(id))
    if (add.length) {
      await client
        .patch(svc._id)
        .setIfMissing({featuredWebProjects: []})
        .append('featuredWebProjects', add.map((id) => ({_key: id.replace('webProject-', ''), _type: 'reference', _ref: id})))
        .commit()
    }
    console.log(`✓ web-development service: ${add.length} project(s) added to featuredWebProjects`)
  }

  // 4. Navigation: Our Work → /portfolio
  const nav = await client.fetch<{_id: string; hasWork: boolean} | null>(
    `*[_type == "navigation" && !(_id in path("drafts.**"))][0]{ _id, "hasWork": count(items[link == "/work"]) > 0 }`,
  )
  if (nav?.hasWork) {
    await client.patch(nav._id).set({'items[link=="/work"].link': '/portfolio'}).commit()
    console.log('✓ navigation: "Our Work" now links to /portfolio')
  }

  console.log('\nDone. Changes appear on mnmagency.com within ~60 seconds.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
