/**
 * Migrate every `work` document into a `caseStudy` document, then delete the
 * original. Idempotent: re-running is safe (already-migrated work docs are
 * skipped, and re-runs after partial migrations pick up where they left off).
 *
 * Run with:
 *   npx sanity exec scripts/migrate-work-to-casestudy.ts --with-user-token
 *
 * Conflict handling: if a `caseStudy` already exists with the same slug, the
 * work doc is skipped and logged so you can resolve manually in the Studio
 * (usually by editing one slug and re-running).
 *
 * What gets copied:
 *   work.title        → caseStudy.title
 *   work.slug         → caseStudy.slug
 *   work.category     → caseStudy.category
 *   work.description  → caseStudy.description
 *   work.image        → caseStudy.image
 *   work.seo          → caseStudy.seo
 *
 * Fields unique to caseStudy (client, industry, challenge, solution, results)
 * are left blank — they can be filled in later in the Studio.
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type ImageRef = {asset?: {_ref?: string; _type?: string}; _type?: string; hotspot?: unknown; crop?: unknown}
type Seo = unknown

type WorkDoc = {
  _id: string
  title?: string
  slug?: {current?: string; _type?: string}
  category?: string
  description?: string
  image?: ImageRef
  seo?: Seo
}

type CaseStudyMatch = {_id: string; title?: string}

function caseStudyIdFromWorkId(workId: string): string {
  // Stable target id derived from the source id so we can spot already-migrated
  // pairs across multiple runs. e.g. "abc123" → "caseStudy-abc123".
  return `caseStudy-${workId.replace(/^drafts\./, '')}`
}

async function main() {
  const works: WorkDoc[] = await client.fetch(`
    *[_type == "work" && !(_id in path("drafts.**"))]{
      _id,
      title,
      "slug": slug,
      category,
      description,
      image,
      seo
    }
  `)

  if (works.length === 0) {
    console.log('No work documents to migrate.')
    return
  }

  console.log(`Found ${works.length} work doc(s) to migrate.\n`)

  let created = 0
  let skipped = 0
  const skippedDetails: string[] = []

  for (const work of works) {
    const slug = work.slug?.current
    const targetId = caseStudyIdFromWorkId(work._id)

    if (!slug) {
      skipped++
      skippedDetails.push(`${work._id} — no slug, skipping`)
      continue
    }

    // Conflict check: does a caseStudy with this slug already exist (and isn't
    // the migration's own target)?
    const conflict: CaseStudyMatch | null = await client.fetch(
      `*[_type == "caseStudy" && slug.current == $slug && _id != $targetId][0]{
        _id, title
      }`,
      {slug, targetId},
    )

    if (conflict) {
      skipped++
      skippedDetails.push(
        `${work._id} ("${work.title}", slug "${slug}") — caseStudy "${conflict.title}" (${conflict._id}) already uses this slug. Skipped.`,
      )
      continue
    }

    // Create or replace the target caseStudy doc
    const caseStudyDoc = {
      _id: targetId,
      _type: 'caseStudy',
      title: work.title,
      slug: {_type: 'slug', current: slug},
      category: work.category,
      description: work.description,
      ...(work.image ? {image: work.image} : {}),
      ...(work.seo ? {seo: work.seo} : {}),
    }

    await client.createOrReplace(caseStudyDoc)
    await client.delete(work._id)

    created++
    console.log(`  ✓ ${slug} — migrated`)
  }

  console.log(`\nMigration complete:`)
  console.log(`  created caseStudies: ${created}`)
  console.log(`  skipped: ${skipped}`)
  if (skippedDetails.length > 0) {
    console.log('\nSkip details:')
    skippedDetails.forEach((d) => console.log(`  · ${d}`))
  }
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
