import {localeString, localeText} from './locale'

export const schemaTypes = [
  // Localized field primitives — used throughout the schema
  localeString,
  localeText,

  // Navigation Section
  {
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    preview: {
      select: { brand: 'brandName' },
      prepare({ brand }) {
        return { title: 'Navigation', subtitle: brand || '' }
      },
    },
    fields: [
      {
        name: 'brandName',
        title: 'Brand Name',
        type: 'string',
        description: 'Used as logo alt text, copyright, and schema.org organization name.',
      },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: { hotspot: true },
      },
      // Promo Banner (top header strip — replaces the hardcoded "Audit Your Website's SEO Now!" link)
      {
        name: 'promoBanner',
        title: 'Promo Banner',
        type: 'object',
        fields: [
          { name: 'enabled', title: 'Enabled?', type: 'boolean', initialValue: false },
          { name: 'text',    title: 'Banner Text', type: 'localeString' },
          { name: 'link',    title: 'Banner Link', type: 'string' },
        ],
      },
      {
        name: 'copyright',
        title: 'Copyright Line',
        type: 'localeString',
        description: 'Shown in footer. Use {year} placeholder for the current year.',
      },
      {
        name: 'contactColumnTitle',
        title: 'Footer Contact Column Title',
        type: 'localeString',
      },
      {
        name: 'items',
        title: 'Menu Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'localeString' },
              { name: 'link', title: 'Link', type: 'string' },
              {
                name: 'hasMegaMenu',
                title: 'Has Mega Menu?',
                type: 'boolean',
                initialValue: false,
              },
              {
                name: 'megaHeadline',
                title: 'Mega Menu Headline',
                type: 'localeString',
                description: 'Shown above the mega menu items.',
              },
              {
                name: 'megaItems',
                title: 'Mega Menu Items',
                type: 'array',
                of: [
                  {
                    type: 'object',
                    fields: [
                      { name: 'title', title: 'Title', type: 'localeString' },
                      { name: 'description', title: 'Description', type: 'localeText' },
                      { name: 'link', title: 'Link', type: 'string' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      { name: 'ctaText', title: 'CTA Text', type: 'localeString' },
      { name: 'ctaLink', title: 'CTA Link', type: 'string' },

// Footer Information
{
  name: 'footerColumns',
  title: 'Footer Columns',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'columnTitle',
          title: 'Column Title',
          type: 'localeString',
        },
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'localeString' },
                { name: 'link', title: 'Link', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
  ],
},
    {
  name: 'footerDescription',
  title: 'Footer Description',
  type: 'localeText',
},
{
  name: 'address',
  title: 'Company Address',
  type: 'localeString',
},
{
  name: 'phone',
  title: 'Phone Number',
  type: 'string',
},
{
  name: 'email',
  title: 'Email Address',
  type: 'string',
},
{
  name: 'socials',
  title: 'Social Media',
  type: 'object',
  fields: [
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
    { name: 'facebook', title: 'Facebook URL', type: 'url' },
    { name: 'x', title: 'X (Twitter) URL', type: 'url' },
    { name: 'youtube', title: 'YouTube URL', type: 'url' },
  ],
},
    ],
  },

  // Homepage Section
  {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    preview: {
      select: { en: 'title.en', ar: 'title.ar' },
      prepare({ en, ar }) {
        return { title: en || ar || 'Homepage', subtitle: 'mnmagency.com' }
      },
    },
    fields: [
         {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
      { name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'localeString' },
      { name: 'title', title: 'Hero Title', type: 'localeString' },
      { name: 'subtitle', title: 'Hero Subtitle', type: 'localeText' },
      { name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'localeString' },
      { name: 'buttonText', title: 'Primary Button Text', type: 'localeString' },
{ name: 'buttonLink', title: 'Primary Button Link', type: 'string' },

{ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'localeString' },
{ name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string' },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'heroMediaType',
        title: 'Hero Media Type',
        type: 'string',
        options: {
          list: [
            { title: 'Image', value: 'image' },
            { title: 'Video', value: 'video' },
          ],
          layout: 'radio',
        },
      },
      {
        name: 'heroImage',
        title: 'Hero Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'heroVideoUrl',
        title: 'Hero Video URL',
        type: 'url',
      },
      {
        name: 'proofItems',
        title: 'Proof Numbers',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'number', title: 'Number', type: 'string' },
              { name: 'label', title: 'Label', type: 'localeString' },
            ],
          },
        ],
      },
      {
        name: 'growthSteps',
        title: 'Growth System Steps',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Step Title', type: 'localeString' },
              { name: 'text', title: 'Step Text', type: 'localeText' },
            ],
          },
        ],
      },
           
        // About Journey Section
        
        {
  name: 'aboutLogos',
  title: 'About Partner Logos',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'localeString' },
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
},
{
  name: 'aboutEyebrow',
  title: 'About Eyebrow',
  type: 'localeString',
},
{
  name: 'aboutTitle',
  title: 'About Title',
  type: 'localeString',
},
{
  name: 'aboutText',
  title: 'About Text',
  type: 'localeText',
},
{
  name: 'aboutButtonText',
  title: 'About Button Text',
  type: 'localeString',
},
{
  name: 'aboutButtonLink',
  title: 'About Button Link',
  type: 'string',
},
{
  name: 'aboutImage',
  title: 'About Image',
  type: 'image',
  options: { hotspot: true },
},
{
  name: 'aboutPattern',
  title: 'About Background Pattern',
  type: 'image',
  options: { hotspot: true },
},
      { name: 'missionTitle', title: 'Mission Title', type: 'localeString' },
      { name: 'missionText', title: 'Mission Text', type: 'localeText' },
      { name: 'finalCtaTitle', title: 'Final CTA Title', type: 'localeString' },
      { name: 'finalCtaText', title: 'Final CTA Text', type: 'localeText' },

        // Section labels (CMS-driven so editors can change every eyebrow / headline)
        { name: 'clientsBannerTitle',    title: 'Clients Banner Title',     type: 'localeString' },
        { name: 'systemEyebrow',         title: 'Growth System Eyebrow',    type: 'localeString' },
        { name: 'systemTitle',           title: 'Growth System Title',      type: 'localeString' },
        { name: 'servicesEyebrow',       title: 'Services Section Eyebrow', type: 'localeString' },
        { name: 'servicesTitle',         title: 'Services Section Title',   type: 'localeString' },
        { name: 'caseStudiesEyebrow',    title: 'Case Studies Eyebrow',     type: 'localeString' },
        { name: 'caseStudiesTitle',      title: 'Case Studies Title',       type: 'localeString' },
        { name: 'caseStudiesLinkText',   title: 'Case Studies Link Text',   type: 'localeString', description: "e.g. 'View all case studies →'" },
        { name: 'caseStudyCardCta',      title: 'Case Study Card CTA',      type: 'localeString', description: "e.g. 'View Case Study →'" },
        { name: 'missionEyebrow',        title: 'Mission Eyebrow',          type: 'localeString' },
        { name: 'workEyebrow',           title: 'Work Section Eyebrow',     type: 'localeString' },
        { name: 'workTitle',             title: 'Work Section Title',       type: 'localeString' },
        { name: 'blogPill',              title: 'Blog Section Pill',        type: 'localeString', description: "e.g. 'Daily News'" },
        { name: 'blogTitle',             title: 'Blog Section Title',       type: 'localeString' },
        { name: 'blogDescription',       title: 'Blog Section Description', type: 'localeText' },
        { name: 'blogLinkText',          title: 'Blog Section Link Text',   type: 'localeString', description: "e.g. 'Read more from the blog ›'" },
        { name: 'proofEyebrow',          title: 'Proof Strip Eyebrow',      type: 'localeString', description: 'Shown above the hero proof items fallback.' },
        { name: 'finalCtaButtonText',    title: 'Final CTA Button Text',    type: 'localeString' },
        { name: 'finalCtaButtonLink',    title: 'Final CTA Button Link',    type: 'string' },

        // Client Logo Banner
{
  name: 'clientLogos',
  title: 'Client Logos Banner',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'name', title: 'Client Name', type: 'localeString' },
        {
          name: 'logo',
          title: 'Client Logo',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
},
      { name: 'footerText', title: 'Footer Text', type: 'localeString' },
    ],
  },

  // Service Section
  {
    name: 'service',
    title: 'Service',
    type: 'document',
    preview: {
      select: { en: 'title.en', ar: 'title.ar', slug: 'slug.current', media: 'image' },
      prepare({ en, ar, slug, media }) {
        return { title: en || ar || slug || '(no title)', subtitle: slug ? `/services/${slug}` : '', media }
      },
    },
    fields: [
      {
        name: 'seo',
        title: 'SEO Settings',
        type: 'seo',
      },
      { name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'localeString', description: "Defaults to 'M&M Service'." },
      { name: 'heroCtaButtonText', title: 'Hero CTA Button Text', type: 'localeString' },
      { name: 'heroCtaButtonLink', title: 'Hero CTA Button Link', type: 'string' },
      { name: 'title', title: 'Title', type: 'localeString' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: (doc) => (doc.title && (doc.title.en || doc.title.ar)) || '' } },
      { name: 'description', title: 'Description', type: 'localeText' },
      { name: 'content', title: 'Full Content', type: 'localeText' },
      { name: 'whatWeBuildEyebrow',   title: 'What We Build Eyebrow',   type: 'localeString' },
      { name: 'whatWeBuildTitle',     title: 'What We Build Title',     type: 'localeString' },
      { name: 'whyItMattersEyebrow',  title: 'Why It Matters Eyebrow',  type: 'localeString' },
      { name: 'whyItMattersTitle',    title: 'Why It Matters Title',    type: 'localeString' },
      { name: 'deliverablesEyebrow',  title: 'Deliverables Eyebrow',    type: 'localeString' },
      { name: 'deliverablesTitle',    title: 'Deliverables Title',      type: 'localeString' },
      { name: 'projectsEyebrow',      title: 'Projects Eyebrow',        type: 'localeString' },
      { name: 'projectsTitle',        title: 'Projects Title',          type: 'localeString' },
      { name: 'faqsEyebrow',          title: 'FAQs Eyebrow',            type: 'localeString' },
      { name: 'faqsTitle',            title: 'FAQs Title',              type: 'localeString' },
      { name: 'finalCtaButtonText',   title: 'Final CTA Button Text',   type: 'localeString' },
      { name: 'finalCtaButtonLink',   title: 'Final CTA Button Link',   type: 'string' },
      {
        name: 'image',
        title: 'Service Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'whyItMatters',
        title: 'Why It Matters',
        type: 'localeText',
      },
      {
        name: 'deliverables',
        title: 'Deliverables',
        type: 'array',
        of: [{ type: 'localeString' }],
      },
      {
        name: 'ctaTitle',
        title: 'CTA Title',
        type: 'localeString',
      },
      {
        name: 'ctaText',
        title: 'CTA Text',
        type: 'localeText',
      },
// Service Projects
{
  name: 'projects',
  title: 'Projects / Companies We Worked For',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'clientName', title: 'Client Name', type: 'localeString' },
        { name: 'category', title: 'Category', type: 'localeString' },
        {
          name: 'projectImage',
          title: 'Project Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'clientLogo',
          title: 'Client Logo',
          type: 'image',
          options: { hotspot: true },
        },
        { name: 'title', title: 'Project Title', type: 'localeString' },
        { name: 'description', title: 'Description', type: 'localeText' },
      ],
    },
  ],
},
        
      // Page Builder Sections
      {
        name: 'sections',
        title: 'Page Sections',
        type: 'array',
        of: [
          { type: 'heroSection' },
          { type: 'textBlock' },
          { type: 'imageBlock' },
          { type: 'featuresBlock' },
          { type: 'ctaBlock' },
        ],
      },
    ],
  },

  // Services Index Page (singleton — controls /services landing page)
  {
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    preview: {
      select: { en: 'title.en', ar: 'title.ar' },
      prepare({ en, ar }) {
        return { title: en || ar || 'Services Page', subtitle: '/services' }
      },
    },
    fields: [
      { name: 'seo', title: 'SEO Settings', type: 'seo' },
      { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
      { name: 'title', title: 'Hero Title', type: 'localeString' },
      { name: 'subtitle', title: 'Hero Subtitle', type: 'localeText' },
      { name: 'intro', title: 'Intro Paragraph', type: 'localeText' },
      { name: 'ctaTitle', title: 'CTA Title', type: 'localeString' },
      { name: 'ctaText', title: 'CTA Text', type: 'localeText' },
      { name: 'ctaButtonText', title: 'CTA Button Text', type: 'localeString' },
      { name: 'ctaButtonLink', title: 'CTA Button Link', type: 'string' },
    ],
  },

  // (work schema removed — consolidated into caseStudy in Phase 3-D)

// Case Study Section
{
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar', slug: 'slug.current', media: 'image' },
    prepare({ en, ar, slug, media }) {
      return { title: en || ar || slug || '(no title)', subtitle: slug ? `/case-studies/${slug}` : '', media }
    },
  },
  fields: [
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
    { name: 'title', title: 'Title', type: 'localeString' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: (doc) => (doc.title && (doc.title.en || doc.title.ar)) || '' } },
    { name: 'client', title: 'Client Name', type: 'localeString' },
    { name: 'industry', title: 'Industry', type: 'localeString' },
    { name: 'category', title: 'Category', type: 'localeString' },
    { name: 'description', title: 'Short Description', type: 'localeText' },
    {
      name: 'image',
      title: 'Case Study Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'challenge', title: 'Challenge', type: 'localeText' },
    { name: 'solution', title: 'Solution', type: 'localeText' },
    { name: 'results', title: 'Results', type: 'localeText' },
  ],
},
  // Hero Section Block
  {
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
      { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
      { name: 'title', title: 'Title', type: 'localeString' },
      { name: 'subtitle', title: 'Subtitle', type: 'localeText' },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
      },
    ],
  },

  // Text Block
  {
    name: 'textBlock',
    title: 'Text Block',
    type: 'object',
    fields: [
      { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
      { name: 'title', title: 'Title', type: 'localeString' },
      { name: 'content', title: 'Content', type: 'localeText' },
    ],
  },

  // Image Block
  {
    name: 'imageBlock',
    title: 'Image Block',
    type: 'object',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
      },
      { name: 'caption', title: 'Caption', type: 'localeString' },
    ],
  },

  // Features Block
  {
    name: 'featuresBlock',
    title: 'Features Block',
    type: 'object',
    fields: [
      { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
      { name: 'title', title: 'Title', type: 'localeString' },
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [{ type: 'localeString' }],
      },
    ],
  },

  // CTA Block
  {
    name: 'ctaBlock',
    title: 'CTA Block',
    type: 'object',
    fields: [
      { name: 'title', title: 'Title', type: 'localeString' },
      { name: 'text', title: 'Text', type: 'localeText' },
      { name: 'buttonText', title: 'Button Text', type: 'localeString' },
      { name: 'buttonLink', title: 'Button Link', type: 'string' },
    ],
  },
// Blog Section
{
  name: 'blog',
  title: 'Blog',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar', slug: 'slug.current', media: 'image', date: 'publishedAt' },
    prepare({ en, ar, slug, media, date }) {
      const dateStr = date ? new Date(date).toISOString().slice(0, 10) : ''
      return { title: en || ar || slug || '(no title)', subtitle: [dateStr, slug && `/blog/${slug}`].filter(Boolean).join(' · '), media }
    },
  },
  fields: [
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
    { name: 'title', title: 'Title', type: 'localeString' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: (doc) => (doc.title && (doc.title.en || doc.title.ar)) || '' } },
    { name: 'category', title: 'Category', type: 'localeString' },
    { name: 'author', title: 'Author', type: 'localeString' },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'localeString' }],
      options: { layout: 'tags' },
    },
    { name: 'excerpt', title: 'Excerpt', type: 'localeText' },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Rich text with headings, lists, links, and inline images.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  { name: 'href', title: 'URL', type: 'url' },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'localeString' },
            { name: 'alt', title: 'Alt text', type: 'localeString' },
          ],
        },
      ],
    },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
  ],
},

// Strategy Form (consolidated singleton — controls /get-strategy)
{
  name: 'strategyForm',
  title: 'Strategy Form',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar' },
    prepare({ en, ar }) {
      return { title: en || ar || 'Strategy Form', subtitle: '/get-strategy' }
    },
  },
  fields: [
    { name: 'seo', title: 'SEO Settings', type: 'seo' },
    { name: 'eyebrow', title: 'Hero Eyebrow', type: 'localeString' },
    { name: 'title', title: 'Form Title', type: 'localeString' },
    { name: 'subtitle', title: 'Form Subtitle', type: 'localeText' },

    {
      name: 'placeholders',
      title: 'Form Placeholders',
      type: 'object',
      fields: [
        { name: 'name',    title: 'Name Placeholder',    type: 'localeString' },
        { name: 'email',   title: 'Email Placeholder',   type: 'string' },
        { name: 'country', title: 'Country Placeholder', type: 'localeString' },
        { name: 'phone',   title: 'Phone Placeholder',   type: 'string' },
        { name: 'company', title: 'Company Placeholder', type: 'localeString' },
        { name: 'budget',  title: 'Budget Placeholder',  type: 'localeString' },
        { name: 'message', title: 'Message Placeholder', type: 'localeString' },
        { name: 'service', title: 'Service Placeholder', type: 'localeString', description: "e.g. 'Select Service'" },
      ],
    },

    {
      name: 'services',
      title: 'Service Options',
      type: 'array',
      of: [{ type: 'localeString' }],
      description: 'Shown as dropdown choices in the form.',
    },
    {
      name: 'budgetOptions',
      title: 'Budget Options',
      type: 'array',
      of: [{ type: 'localeString' }],
      description: 'Shown as dropdown choices for the budget field.',
    },

    {
      name: 'countries',
      title: 'Countries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'flag', title: 'Flag Emoji', type: 'string' },
            { name: 'countryName', title: 'Country Name', type: 'localeString' },
            { name: 'dialCode', title: 'Dial Code', type: 'string' },
            { name: 'phoneLength', title: 'Phone Length', type: 'number' },
          ],
        },
      ],
    },

    { name: 'humanQuestion', title: 'Human Check Question', type: 'localeString' },
    { name: 'humanAnswer', title: 'Human Check Answer', type: 'localeString' },

    { name: 'submitText', title: 'Submit Button Text', type: 'localeString', initialValue: 'Get Strategy' },
    { name: 'successMessage', title: 'Success Message', type: 'localeText' },
    { name: 'errorMessage', title: 'Error Message', type: 'localeText', description: 'Shown when the submission fails.' },

    {
      name: 'recipientEmail',
      title: 'Recipient Email',
      type: 'string',
      description: 'Where strategy form submissions are emailed. Falls back to STRATEGY_RECIPIENT_EMAIL env var if blank.',
    },

    // Trust signals (rendered around the form on /get-strategy)
    { name: 'trustEyebrow', title: 'Trust Eyebrow', type: 'localeString', description: "e.g. 'Trusted by brands across Qatar'" },
    {
      name: 'trustLogos',
      title: 'Trust Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Brand Name', type: 'localeString' },
            { name: 'logo', title: 'Logo',       type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
    { name: 'processEyebrow', title: 'Process Eyebrow', type: 'localeString', description: "e.g. 'What Happens Next'" },
    { name: 'processTitle',   title: 'Process Title',   type: 'localeString' },
    {
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title',       title: 'Step Title',       type: 'localeString' },
            { name: 'description', title: 'Step Description', type: 'localeText' },
          ],
        },
      ],
    },
    { name: 'testimonialsEyebrow', title: 'Testimonials Eyebrow', type: 'localeString' },
    { name: 'testimonialsTitle',   title: 'Testimonials Title',   type: 'localeString' },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote',        title: 'Quote',        type: 'localeText' },
            { name: 'authorName',   title: 'Author Name',  type: 'localeString' },
            { name: 'authorTitle',  title: 'Author Title', type: 'localeString' },
            { name: 'authorLogo',   title: 'Author Logo',  type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
  ],
},

{
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localeString',
      description: 'Recommended: 50–60 characters.',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localeText',
      description: 'Recommended: 140–160 characters.',
    },
    {
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'localeString',
      description: 'Main keyword this page should target.',
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Optional. Use final live URL only.',
    },
    {
      name: 'ogImage',
      title: 'Social Sharing Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Recommended size: 1200x630.',
    },
  ],
},
// FAQ Section
{
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  preview: {
    select: { en: 'question.en', ar: 'question.ar', category: 'category' },
    prepare({ en, ar, category }) {
      return { title: en || ar || '(no question)', subtitle: category || '' }
    },
  },
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'localeString',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'localeText',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Website Development', value: 'website-development' },
          { title: 'SEO', value: 'seo' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'Branding', value: 'branding' },
          { title: 'Bulk SMS', value: 'bulk-sms' },
          { title: 'Paid Ads', value: 'paid-ads' },
          { title: 'AI / LLMO / GEO', value: 'ai-llmo-geo' },
        ],
      },
    },
    {
      name: 'showOnFaqPage',
      title: 'Show on Main FAQ Page?',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Choose a service if this FAQ should appear on a service page.',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
},
// Contact Page
{
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar' },
    prepare({ en, ar }) {
      return { title: en || ar || 'Contact Page', subtitle: '/contact' }
    },
  },
  fields: [
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
    { name: 'eyebrow', title: 'Hero Eyebrow', type: 'localeString' },
    {
      name: 'title',
      title: 'Page Title',
      type: 'localeString',
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'localeText',
    },
    { name: 'contactDetailsTitle', title: 'Contact Details Title', type: 'localeString' },
    {
      name: 'detailLabels',
      title: 'Contact Detail Labels',
      type: 'object',
      fields: [
        { name: 'workingHours', title: 'Working Hours Label', type: 'string' },
        { name: 'phone',        title: 'Phone Label',        type: 'string' },
        { name: 'email',        title: 'Email Label',        type: 'string' },
        { name: 'location',     title: 'Location Label',     type: 'localeString' },
      ],
    },
    { name: 'openLocationButton', title: 'Open Location Button Text', type: 'localeString' },
    { name: 'formEyebrow', title: 'Form Eyebrow', type: 'localeString' },
    {
      name: 'formPlaceholders',
      title: 'Form Placeholders',
      type: 'object',
      fields: [
        { name: 'name',    title: 'Name Placeholder',    type: 'localeString' },
        { name: 'email',   title: 'Email Placeholder',   type: 'string' },
        { name: 'phone',   title: 'Phone Placeholder',   type: 'string' },
        { name: 'company', title: 'Company Placeholder', type: 'localeString' },
        { name: 'service', title: 'Service Placeholder', type: 'localeString' },
        { name: 'message', title: 'Message Placeholder', type: 'localeString' },
      ],
    },
    { name: 'formSubmitText',    title: 'Form Submit Text',    type: 'localeString' },
    { name: 'formSuccessTitle',  title: 'Form Success Title',  type: 'localeString' },
    { name: 'formSuccessText',   title: 'Form Success Text',   type: 'localeText' },
    { name: 'formErrorMessage',  title: 'Form Error Message',  type: 'localeText' },
    { name: 'formPrivacyNote',   title: 'Form Privacy Note',   type: 'localeString' },
    {
      name: 'recipientEmail',
      title: 'Form Recipient Email',
      type: 'string',
      description: 'Where contact form submissions are emailed. Falls back to CONTACT_RECIPIENT_EMAIL env var if blank.',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
    },
    {
      name: 'workingHours',
      title: 'Working Hours',
      type: 'string',
    },
      {
  name: 'formTitle',
  title: 'Form Title',
  type: 'localeString',
},
{
  name: 'formSubtitle',
  title: 'Form Subtitle',
  type: 'localeText',
},
{
  name: 'servicesOptions',
  title: 'Service Options',
  type: 'array',
  of: [{ type: 'localeString' }],
},
{
  name: 'mapEmbed',
  title: 'Google Maps Embed URL',
  type: 'url',
},
{
  name: 'mapUrl',
  title: 'Google Maps Page URL',
  type: 'url',
},
    { name: 'ctaTagline', title: 'CTA Tagline', type: 'localeString', description: 'Bold line on the left of the premium CTA.' },
    { name: 'ctaSubTagline', title: 'CTA Sub-Tagline', type: 'localeString' },
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'localeString',
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'localeText',
    },
    { name: 'ctaButtonText', title: 'CTA Button Text', type: 'localeString' },
    { name: 'ctaButtonLink', title: 'CTA Button Link', type: 'string' },
    { name: 'ctaButtonNote', title: 'CTA Button Note', type: 'localeString', description: 'Small text under the CTA button.' },
  ],
},

// About Page
{
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar' },
    prepare({ en, ar }) {
      return { title: en || ar || 'About Page', subtitle: '/about' }
    },
  },
  fields: [
    { name: 'seo', title: 'SEO', type: 'seo' },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'eyebrow', title: 'Hero Eyebrow', type: 'localeString' },
    { name: 'title', title: 'Hero Title', type: 'localeString' },
    { name: 'subtitle', title: 'Hero Subtitle', type: 'localeText' },
    { name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'localeString' },
    { name: 'positioningTitle', title: 'Positioning Title', type: 'localeString' },
    { name: 'positioning', title: 'Positioning Statement', type: 'localeText' },
    { name: 'missionEyebrow', title: 'Mission Eyebrow', type: 'localeString' },
    { name: 'missionTitle', title: 'Mission Title', type: 'localeString' },
    { name: 'missionText', title: 'Mission Text', type: 'localeText' },
    { name: 'methodologyEyebrow', title: 'Methodology Eyebrow', type: 'localeString' },
    { name: 'methodologyTitle', title: 'Methodology Title', type: 'localeString' },
    { name: 'methodologyText', title: 'Methodology Text', type: 'localeText' },
    { name: 'principlesEyebrow', title: 'Principles Eyebrow', type: 'localeString' },
    { name: 'principlesTitle', title: 'Principles Title', type: 'localeString' },
    {
      name: 'principles',
      title: 'Principles',
      type: 'array',
      of: [{ type: 'localeString' }],
    },
    { name: 'ctaTitle', title: 'CTA Title', type: 'localeString' },
    { name: 'ctaText', title: 'CTA Text', type: 'localeText' },
    { name: 'ctaButtonText', title: 'CTA Button Text', type: 'localeString' },
    { name: 'ctaButtonLink', title: 'CTA Button Link', type: 'string' },
  ],
},

// Blog Index Page (singleton — controls /blog landing page)
{
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar' },
    prepare({ en, ar }) {
      return { title: en || ar || 'Blog Page', subtitle: '/blog' }
    },
  },
  fields: [
    { name: 'seo', title: 'SEO Settings', type: 'seo' },
    { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
    { name: 'title', title: 'Hero Title', type: 'localeString' },
    { name: 'subtitle', title: 'Hero Subtitle', type: 'localeText' },
  ],
},

// FAQs Page (singleton — controls /faqs landing page)
{
  name: 'faqsPage',
  title: 'FAQs Page',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar' },
    prepare({ en, ar }) {
      return { title: en || ar || 'FAQs Page', subtitle: '/faqs' }
    },
  },
  fields: [
    { name: 'seo', title: 'SEO Settings', type: 'seo' },
    { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
    { name: 'title', title: 'Hero Title', type: 'localeString' },
    { name: 'subtitle', title: 'Hero Subtitle', type: 'localeText' },
    {
      name: 'categoryLabels',
      title: 'Category Section Labels',
      type: 'object',
      description: 'Display names shown above each FAQ category group. Leave blank to use the default.',
      fields: [
        { name: 'general',            title: 'General',             type: 'localeString' },
        { name: 'websiteDevelopment', title: 'Website Development', type: 'localeString' },
        { name: 'seo',                title: 'SEO',                 type: 'localeString' },
        { name: 'socialMedia',        title: 'Social Media',        type: 'localeString' },
        { name: 'branding',           title: 'Branding',            type: 'localeString' },
        { name: 'bulkSms',            title: 'Bulk SMS',            type: 'localeString' },
        { name: 'paidAds',            title: 'Paid Ads',            type: 'localeString' },
        { name: 'aiLlmoGeo',          title: 'AI / LLMO / GEO',     type: 'localeString' },
      ],
    },
  ],
},

// (workPage singleton removed — /work redirects to /case-studies in Phase 3-D)

// Case Studies Index Page (singleton — controls /case-studies landing page)
{
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar' },
    prepare({ en, ar }) {
      return { title: en || ar || 'Case Studies Page', subtitle: '/case-studies' }
    },
  },
  fields: [
    { name: 'seo', title: 'SEO Settings', type: 'seo' },
    { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
    { name: 'title', title: 'Hero Title', type: 'localeString' },
    { name: 'subtitle', title: 'Hero Subtitle', type: 'localeText' },
    { name: 'cardCtaText', title: 'Card CTA Text', type: 'localeString', description: "e.g. 'View Case Study →'" },
  ],
},

// SEO Audit Page (singleton — controls /seo-audit landing page)
{
  name: 'seoAuditPage',
  title: 'SEO Audit Page',
  type: 'document',
  preview: {
    select: { en: 'title.en', ar: 'title.ar' },
    prepare({ en, ar }) {
      return { title: en || ar || 'SEO Audit Page', subtitle: '/seo-audit' }
    },
  },
  fields: [
    { name: 'seo', title: 'SEO Settings', type: 'seo' },
    { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
    { name: 'title', title: 'Hero Title', type: 'localeString' },
    { name: 'subtitle', title: 'Hero Subtitle', type: 'localeText' },
    { name: 'widgetTitle', title: 'Widget Title', type: 'localeString', description: 'Shown above the SEOptimer audit form.' },
    { name: 'seoptimerUid', title: 'SEOptimer UID', type: 'string', description: 'Your SEOptimer widget UID.' },
    { name: 'seoptimerCsrfToken', title: 'SEOptimer CSRF Token', type: 'string', description: 'Rotated by SEOptimer — paste fresh value if the form breaks.' },
    {
      name: 'placeholders',
      title: 'Form Placeholders',
      type: 'object',
      fields: [
        { name: 'url',       title: 'URL Placeholder',       type: 'localeString' },
        { name: 'firstName', title: 'First Name Placeholder', type: 'localeString' },
        { name: 'email',     title: 'Email Placeholder',     type: 'localeString' },
        { name: 'phone',     title: 'Phone Placeholder',     type: 'localeString' },
        { name: 'submit',    title: 'Submit Button Label',   type: 'localeString' },
      ],
    },
    { name: 'successMessage', title: 'Success Message', type: 'localeText' },
  ],
},
]