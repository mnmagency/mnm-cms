/**
 * Localized field types.
 *
 *   localeString — short, single-line copy (titles, labels, CTAs, eyebrows)
 *   localeText   — multi-line prose (subtitles, descriptions, body copy)
 *
 * Both store both languages on the same field, so the GROQ shape is:
 *   { en: 'Hello', ar: 'مرحبا' }
 *
 * The frontend `localize(field, locale)` helper picks the active language and
 * falls back to English if the Arabic value is blank.
 */

import {defineField, defineType} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'string'}),
    defineField({name: 'ar', title: 'Arabic',  type: 'string'}),
  ],
  // Preview shows the English value in the studio sidebar
  preview: {
    select: {en: 'en', ar: 'ar'},
    prepare({en, ar}) {
      return {title: en || ar || '(empty)'}
    },
  },
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'text', rows: 4}),
    defineField({name: 'ar', title: 'Arabic',  type: 'text', rows: 4}),
  ],
  preview: {
    select: {en: 'en', ar: 'ar'},
    prepare({en, ar}) {
      return {title: en || ar || '(empty)'}
    },
  },
})
