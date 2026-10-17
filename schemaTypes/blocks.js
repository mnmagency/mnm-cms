/**
 * Extra page-builder blocks for service `sections[]`.
 *
 *   comparisonBlock — two-option comparison table (e.g. WordPress vs Headless)
 *   cardsBlock      — titled cards with text; optional step numbers (process,
 *                     tech stack, benefits)
 */

export const comparisonBlock = {
  name: 'comparisonBlock',
  title: 'Comparison Table',
  type: 'object',
  preview: {
    select: {en: 'title.en', a: 'optionALabel.en', b: 'optionBLabel.en'},
    prepare: ({en, a, b}) => ({title: en || 'Comparison', subtitle: [a, b].filter(Boolean).join(' vs ')}),
  },
  fields: [
    {name: 'eyebrow', title: 'Eyebrow', type: 'localeString'},
    {name: 'title', title: 'Title', type: 'localeString'},
    {name: 'subtitle', title: 'Subtitle', type: 'localeText'},
    {name: 'criterionLabel', title: 'First column header', type: 'localeString', description: "e.g. 'What matters'"},
    {name: 'optionALabel', title: 'Option A header', type: 'localeString', description: "e.g. 'Traditional WordPress'"},
    {name: 'optionBLabel', title: 'Option B header (highlighted)', type: 'localeString', description: "e.g. 'Headless (Next.js + Sanity)'"},
    {
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {select: {title: 'criterion.en'}},
          fields: [
            {name: 'criterion', title: 'Criterion', type: 'localeString'},
            {name: 'optionA', title: 'Option A', type: 'localeText'},
            {name: 'optionB', title: 'Option B', type: 'localeText'},
          ],
        },
      ],
    },
    {name: 'footnote', title: 'Note under the table', type: 'localeText'},
  ],
}

export const cardsBlock = {
  name: 'cardsBlock',
  title: 'Cards',
  type: 'object',
  preview: {
    select: {en: 'title.en', cards: 'cards'},
    prepare: ({en, cards}) => ({title: en || 'Cards', subtitle: `${(cards || []).length} cards`}),
  },
  fields: [
    {name: 'eyebrow', title: 'Eyebrow', type: 'localeString'},
    {name: 'title', title: 'Title', type: 'localeString'},
    {name: 'subtitle', title: 'Subtitle', type: 'localeText'},
    {name: 'numbered', title: 'Show step numbers?', type: 'boolean', initialValue: false},
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {select: {title: 'title.en', subtitle: 'tag.en'}},
          fields: [
            {name: 'tag', title: 'Small label', type: 'localeString', description: "Optional, e.g. 'Week 1–2' or 'Front end'"},
            {name: 'title', title: 'Title', type: 'localeString'},
            {name: 'text', title: 'Text', type: 'localeText'},
          ],
        },
      ],
    },
  ],
}
