/**
 * Four older blog posts have Arabic text saved in the ENGLISH body field
 * (`content`), so the English page shows Arabic.
 *
 * For each post this script:
 *   1. moves the current Arabic body into `contentAr` (the Arabic field),
 *   2. looks back through the document history for the most recent
 *      version whose `content` was English, and restores it to `content`.
 *
 * Nothing is deleted. If no English version exists in the history,
 * the script says so and leaves `content` untouched.
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/fix-blog-languages.ts --with-user-token
 */
/* eslint-disable no-console */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})
const DATASET = client.config().dataset || 'production'

type Block = {_type?: string; children?: Array<{text?: string}>}

function text(content: unknown): string {
  if (!Array.isArray(content)) return ''
  return (content as Block[])
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text || '').join(''))
    .join(' ')
}
const arabic = (s: string) => (s.match(/[؀-ۿ]/g) || []).length
const latin = (s: string) => (s.match(/[A-Za-z]/g) || []).length
const isArabic = (c: unknown) => { const t = text(c); return arabic(t) > latin(t) }
const isEnglish = (c: unknown) => { const t = text(c); return t.length > 200 && latin(t) > arabic(t) * 3 }

async function findEnglish(id: string): Promise<unknown[] | null> {
  const raw = await client.request<string | Array<{id: string}>>({
    url: `/data/history/${DATASET}/transactions/${id}?excludeContent=true&reverse=true&limit=200`,
  })
  const txs: Array<{id: string}> = typeof raw === 'string'
    ? raw.split('\n').filter(Boolean).map((l) => JSON.parse(l))
    : Array.isArray(raw) ? raw : [raw as {id: string}]
  for (const tx of txs) {
    try {
      const res = await client.request<{documents?: Array<{content?: unknown}>}>({
        url: `/data/history/${DATASET}/documents/${id}?revision=${tx.id}`,
      })
      const c = res.documents?.[0]?.content
      if (isEnglish(c)) return c as unknown[]
    } catch {
      // revision may predate the doc; keep looking
    }
  }
  return null
}

async function run() {
  const posts = await client.fetch<Array<{_id: string; slug: string; content: unknown; contentAr: unknown}>>(
    `*[_type == "blog" && !(_id in path("drafts.**"))]{_id, "slug": slug.current, content, contentAr}`,
  )
  for (const p of posts) {
    if (!isArabic(p.content)) continue
    console.log(`\n• ${p.slug}`)
    const english = await findEnglish(p._id)
    const set: Record<string, unknown> = {}
    if (!Array.isArray(p.contentAr) || p.contentAr.length === 0) set.contentAr = p.content
    if (english) set.content = english
    if (Object.keys(set).length) await client.patch(p._id).set(set).commit()
    console.log(set.contentAr ? '  ✓ Arabic body moved to the Arabic field' : '  · Arabic field already filled')
    console.log(english ? '  ✓ English body restored from history' : '  ✗ no English version in history (English page still shows Arabic)')
  }
  console.log('\nDone. Live within about a minute.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
