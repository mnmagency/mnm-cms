import {strategyFormSettings} from './strategyFormSettings'
export const schemaTypes = [
  // Navigation Section
  {
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    fields: [
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'items',
        title: 'Menu Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'link', title: 'Link', type: 'string' },
              {
                name: 'hasMegaMenu',
                title: 'Has Mega Menu?',
                type: 'boolean',
                initialValue: false,
              },
              {
                name: 'megaItems',
                title: 'Mega Menu Items',
                type: 'array',
                of: [
                  {
                    type: 'object',
                    fields: [
                      { name: 'title', title: 'Title', type: 'string' },
                      { name: 'description', title: 'Description', type: 'text' },
                      { name: 'link', title: 'Link', type: 'string' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
        
      { name: 'ctaText', title: 'CTA Text', type: 'string' },
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
          type: 'string',
        },
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
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
  type: 'text',
},
{
  name: 'address',
  title: 'Company Address',
  type: 'string',
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
    ],
  },

  // Homepage Section
  {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
         {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
      { name: 'title', title: 'Hero Title', type: 'string' },
      { name: 'subtitle', title: 'Hero Subtitle', type: 'text' },
      { name: 'buttonText', title: 'Primary Button Text', type: 'string' },
{ name: 'buttonLink', title: 'Primary Button Link', type: 'string' },

{ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string' },
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
              { name: 'label', title: 'Label', type: 'string' },
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
              { name: 'title', title: 'Step Title', type: 'string' },
              { name: 'text', title: 'Step Text', type: 'text' },
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
        { name: 'name', title: 'Name', type: 'string' },
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
  type: 'string',
},
{
  name: 'aboutTitle',
  title: 'About Title',
  type: 'string',
},
{
  name: 'aboutText',
  title: 'About Text',
  type: 'text',
},
{
  name: 'aboutButtonText',
  title: 'About Button Text',
  type: 'string',
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
      { name: 'missionTitle', title: 'Mission Title', type: 'string' },
      { name: 'missionText', title: 'Mission Text', type: 'text' },
      { name: 'finalCtaTitle', title: 'Final CTA Title', type: 'string' },
      { name: 'finalCtaText', title: 'Final CTA Text', type: 'text' },
       
        // Client Logo Banner
{
  name: 'clientLogos',
  title: 'Client Logos Banner',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'name', title: 'Client Name', type: 'string' },
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
      { name: 'footerText', title: 'Footer Text', type: 'string' },
    ],
  },

  // Service Section
  {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
      {
  name: 'seo',
  title: 'SEO Settings',
  type: 'seo',
},
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'content', title: 'Full Content', type: 'text' },
      {
        name: 'image',
        title: 'Service Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'whyItMatters',
        title: 'Why It Matters',
        type: 'text',
      },
      {
        name: 'deliverables',
        title: 'Deliverables',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'ctaTitle',
        title: 'CTA Title',
        type: 'string',
      },
      {
        name: 'ctaText',
        title: 'CTA Text',
        type: 'text',
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
        { name: 'clientName', title: 'Client Name', type: 'string' },
        { name: 'category', title: 'Category', type: 'string' },
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
        { name: 'title', title: 'Project Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
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

  // Work Section
  {
    name: 'work',
    title: 'Work',
    type: 'document',
    fields: [
      {
  name: 'seo',
  title: 'SEO Settings',
  type: 'seo',
},
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
      { name: 'category', title: 'Category', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      {
        name: 'image',
        title: 'Work Image',
        type: 'image',
        options: { hotspot: true },
      },
    ],
  },

// Case Study Section
{
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'client', title: 'Client Name', type: 'string' },
    { name: 'industry', title: 'Industry', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'description', title: 'Short Description', type: 'text' },
    {
      name: 'image',
      title: 'Case Study Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'challenge', title: 'Challenge', type: 'text' },
    { name: 'solution', title: 'Solution', type: 'text' },
    { name: 'results', title: 'Results', type: 'text' },
  ],
},
  // Hero Section Block
  {
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'subtitle', title: 'Subtitle', type: 'text' },
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
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'content', title: 'Content', type: 'text' },
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
      { name: 'caption', title: 'Caption', type: 'string' },
    ],
  },

  // Features Block
  {
    name: 'featuresBlock',
    title: 'Features Block',
    type: 'object',
    fields: [
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [{ type: 'string' }],
      },
    ],
  },

  // CTA Block
  {
    name: 'ctaBlock',
    title: 'CTA Block',
    type: 'object',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'text', title: 'Text', type: 'text' },
      { name: 'buttonText', title: 'Button Text', type: 'string' },
      { name: 'buttonLink', title: 'Button Link', type: 'string' },
    ],
  },
// Blog Section
{
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
  name: 'seo',
  title: 'SEO Settings',
  type: 'seo',
},
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
  ],
},

// Strategy Form Settings
{
  name: 'strategyForm',
  title: 'Strategy Form Settings',
  type: 'document',
  fields: [
    { name: 'title', title: 'Form Title', type: 'string' },
    { name: 'subtitle', title: 'Form Subtitle', type: 'text' },

    {
      name: 'countries',
      title: 'Countries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'flag', title: 'Flag Emoji', type: 'string' },
            { name: 'countryName', title: 'Country Name', type: 'string' },
            { name: 'dialCode', title: 'Dial Code', type: 'string' },
            { name: 'phoneLength', title: 'Phone Length', type: 'number' },
          ],
        },
      ],
    },

    { name: 'humanQuestion', title: 'Human Check Question', type: 'string' },
    { name: 'humanAnswer', title: 'Human Check Answer', type: 'string' },
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
      type: 'string',
      description: 'Recommended: 50–60 characters.',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Recommended: 140–160 characters.',
    },
    {
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
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
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
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
  fields: [
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
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
  type: 'string',
},
{
  name: 'formSubtitle',
  title: 'Form Subtitle',
  type: 'text',
},
{
  name: 'servicesOptions',
  title: 'Service Options',
  type: 'array',
  of: [{ type: 'string' }],
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
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
    },
  ],
},

// About Page
{
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    { name: 'seo', title: 'SEO', type: 'seo' },
    {
  name: 'heroImage',
  title: 'Hero Image',
  type: 'image',
  options: { hotspot: true },
},  
    { name: 'title', title: 'Hero Title', type: 'string' },
    { name: 'subtitle', title: 'Hero Subtitle', type: 'text' },
    { name: 'positioning', title: 'Positioning Statement', type: 'text' },
    { name: 'missionTitle', title: 'Mission Title', type: 'string' },
    { name: 'missionText', title: 'Mission Text', type: 'text' },
    { name: 'methodologyTitle', title: 'Methodology Title', type: 'string' },
    { name: 'methodologyText', title: 'Methodology Text', type: 'text' },
    {
      name: 'principles',
      title: 'Principles',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'ctaTitle', title: 'CTA Title', type: 'string' },
    { name: 'ctaText', title: 'CTA Text', type: 'text' },
  ],
},
]