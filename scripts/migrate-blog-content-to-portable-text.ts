/**
 * Convert each blog doc's `content` field from a plain string into a portable
 * text array. Idempotent: docs whose content is already an array are skipped.
 *
 * Run with:
 *   npx sanity exec scripts/migrate-blog-content-to-portable-text.ts --with-user-token
 *
 * Strategy:
 *   - Split the old string on blank lines (paragraph breaks)
 *   - Each paragraph becomes a single portable text block of style 'normal'
 *   - This preserves the line-break behaviour you had with whitespace-pre-line
 *     while making the content actually editable as rich text going forward
 */

import {getCliClient} from 'sanity/cli'
import {randomUUID} from 'node:crypto'

const client = getCliClient({apiVersion: '2024-01-01'})

type BlogDoc = {
  _id: string
  title?: string
  content?: unknown
}

type PortableBlock = {
  _type: 'block'
  _key: string
  style: 'normal'
  markDefs: []
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks: []
  }>
}

function stringToPortableText(content: string): PortableBlock[] {
  // Split on one-or-more blank lines so paragraph breaks become block breaks.
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  if (paragraphs.length === 0) {
    // Edge case: content was just whitespace. Return one empty block so Sanity
    // doesn't see this as "no content".
    return [
      {
        _type: 'block',
        _key: randomUUID(),
        style: 'normal',
        markDefs: [],
        children: [{_type: 'span', _key: randomUUID(), text: '', marks: []}],
      },
    ]
  }

  return paragraphs.map((para) => ({
    _type: 'block',
    _key: randomUUID(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: randomUUID(),
        // Preserve single-line breaks within a paragraph as actual newlines.
        // Portable text spans render newlines as soft breaks.
        text: para,
        marks: [],
      },
    ],
  }))
}

async function main() {
  const blogs: BlogDoc[] = await client.fetch(`
    *[_type == "blog" && !(_id in path("drafts.**"))]{
      _id, title, content
    }
  `)

  if (blogs.length === 0) {
    console.log('No blog documents found.')
    return
  }

  let converted = 0
  let alreadyPortable = 0
  let empty = 0

  const tx = client.transaction()

  for (const post of blogs) {
    if (Array.isArray(post.content)) {
      alreadyPortable++
      continue
    }
    if (typeof post.content !== 'string') {
      empty++
      continue
    }

    const portable = stringToPortableText(post.content)
    tx.patch(post._id, {set: {content: portable}})
    converted++
    console.log(`  · queued conversion: "${post.title || post._id}" (${portable.length} block(s))`)
  }

  if (converted > 0) {
    await tx.commit()
  }

  console.log('\nDone:')
  console.log(`  converted to portable text: ${converted}`)
  console.log(`  already portable text:      ${alreadyPortable}`)
  console.log(`  empty / no content:         ${empty}`)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
