import {defineField, defineType} from 'sanity'

export const strategyFormSettings = defineType({
  name: 'strategyFormSettings',
  title: 'Strategy Form Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Form Title',
      type: 'string',
      initialValue: 'Get Your Strategy',
    }),
    defineField({
      name: 'subtitle',
      title: 'Form Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      initialValue: 'Thank you. Our team will contact you shortly.',
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Recipient Email',
      type: 'string',
      description: 'Where form submissions should be sent later when email is connected.',
    }),
    defineField({
      name: 'services',
      title: 'Services Options',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [
        'Website Development',
        'Social Media Management',
        'SEO',
        'SEM / Google Ads',
        'Bulk SMS',
        'Branding',
        'Media Buying',
        'LLMO / GEO',
      ],
    }),
    defineField({
      name: 'budgetOptions',
      title: 'Budget Options',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [
        'Below 5,000 QAR',
        '5,000 - 10,000 QAR',
        '10,000 - 25,000 QAR',
        '25,000 - 50,000 QAR',
        '50,000+ QAR',
      ],
    }),
  ],
})