/**
 * WhatsApp popup: split "Social Media & Bulk SMS" into two separate entries,
 * both routed to the same number (+974 5566 3353).
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/split-whatsapp-social-sms.ts --with-user-token
 *
 * Safe to re-run.
 */
/* eslint-disable no-console */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})
const NAV_ID = 'a0aedf00-e12e-4de2-9847-795b504a9ffa'

type Route = {_key: string; label?: string; number?: string; matchPaths?: string[]; message?: unknown}

async function run() {
  const nav = await client.fetch<{routes?: Route[]} | null>(`*[_id == $id][0].whatsapp{routes}`, {id: NAV_ID})
  const routes = nav?.routes || []
  const old = routes.find((r) => r._key === 'route-social-sms')
  if (!old) {
    console.log('Nothing to split (route-social-sms not found). Current routes:', routes.map((r) => r.label).join(', '))
    return
  }
  const number = old.number || '+97455663353'

  const social: Route = {
    _key: 'route-social-media',
    label: 'Social Media',
    number,
    matchPaths: ['/services/social-media', '/lp/social-media-qatar'],
    message: {
      _type: 'localeString',
      en: "Hi M&M, I'm interested in your Social Media services.",
      ar: 'مرحباً M&M، أنا مهتم بخدمات وسائل التواصل الاجتماعي.',
    },
  }
  const sms: Route = {
    _key: 'route-bulk-sms',
    label: 'Bulk SMS',
    number,
    matchPaths: ['/services/bulk-sms', '/lp/bulk-sms-qatar'],
    message: {
      _type: 'localeString',
      en: "Hi M&M, I'm interested in your Bulk SMS service.",
      ar: 'مرحباً M&M، أنا مهتم بخدمة الرسائل النصية الجماعية.',
    },
  }

  const next = routes.flatMap((r) => (r._key === 'route-social-sms' ? [social, sms] : [r]))
  await client.patch(NAV_ID).set({'whatsapp.routes': next}).commit()
  console.log('✓ WhatsApp popup now lists:', next.map((r) => r.label).join(' | '))
  console.log(`  Social Media and Bulk SMS both go to ${number}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
