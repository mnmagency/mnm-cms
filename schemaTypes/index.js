import {localeString, localeText} from './locale'
import {webProject, portfolioPage} from './portfolio'
import {comparisonBlock, cardsBlock} from './blocks'

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
        title: 'Logo (for dark backgrounds — header)',
        type: 'image',
        options: { hotspot: true },
        description: 'Primary logo. Shown in the navy header. Should be the light/white variant.',
      },
      {
        name: 'logoDark',
        title: 'Logo — dark variant (for white backgrounds — footer)',
        type: 'image',
        options: { hotspot: true },
        description: 'Dark-ink version of the logo. Shown in the white footer. If left empty, the primary logo will be used as fallback.',
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

// WhatsApp Popup — routes the floating WhatsApp button to different numbers +
// pre-filled messages depending on which page the visitor is on (e.g. Bulk SMS
// leads go to the SMS specialist, SEO leads go to the SEO team, etc.).
{
  name: 'whatsapp',
  title: 'WhatsApp Popup',
  type: 'object',
  description: 'Configure the floating WhatsApp CTA. Add routes to send visitors on specific pages to different numbers / messages.',
  fields: [
    { name: 'enabled', title: 'Enabled?', type: 'boolean', initialValue: true },
    {
      name: 'defaultNumber',
      title: 'Default WhatsApp Number',
      type: 'string',
      description: 'Fallback number when no route matches. Include country code, e.g. +97455376372',
    },
    {
      name: 'defaultMessage',
      title: 'Default Pre-filled Message',
      type: 'localeString',
      description: 'Shown when no route matches the current page.',
    },
    {
      name: 'routes',
      title: 'Page-specific Routes',
      type: 'array',
      description: 'When a visitor is on one of the paths below, they get sent to the number + message defined here instead of the defaults.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Route Label (internal)', type: 'string', description: 'For your reference only, e.g. "Social Media & Bulk SMS"' },
            {
              name: 'matchPaths',
              title: 'Match Paths',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Route matches if the current URL starts with any of these paths.',
            },
            { name: 'number',  title: 'WhatsApp Number', type: 'string' },
            { name: 'message', title: 'Pre-filled Message', type: 'localeString' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'number' },
          },
        },
      ],
    },
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
    // Tabs at the top of the document — click one to jump to that section.
    // Order matches the order sections appear on the live page.
    groups: [
      { name: 'seo',        title: '🔍 SEO',              default: true },
      { name: 'hero',       title: '🎯 Hero' },
      { name: 'clients',    title: '🤝 Clients & Partners' },
      { name: 'system',     title: '🧭 Growth System' },
      { name: 'services',   title: '🎨 Services Section' },
      { name: 'stats',      title: '📊 Stats' },
      { name: 'about',      title: '📖 About Section' },
      { name: 'work',       title: '💼 Work / Case Studies' },
      { name: 'blog',       title: '📝 Blog Section' },
      { name: 'finalCta',   title: '🚀 Final CTA' },
      { name: 'legacy',     title: '📦 Legacy (hidden)' },
    ],
    fields: [
      // ─── 🔍 SEO ─────────────────────────────────────────────────────
      { name: 'seo', title: 'SEO Settings', type: 'seo', group: 'seo' },

      // ─── 🎯 HERO ────────────────────────────────────────────────────
      { name: 'heroEyebrow',       title: 'Eyebrow (small text above title)', type: 'localeString', group: 'hero' },
      { name: 'title',             title: 'Hero Title',                       type: 'localeString', group: 'hero' },
      { name: 'subtitle',          title: 'Hero Subtitle',                    type: 'localeText',   group: 'hero' },
      { name: 'buttonText',        title: 'Primary Button Text',              type: 'localeString', group: 'hero' },
      { name: 'buttonLink',        title: 'Primary Button Link',              type: 'string',       group: 'hero' },
      { name: 'secondaryButtonText', title: 'Secondary Button Text',          type: 'localeString', group: 'hero' },
      { name: 'secondaryButtonLink', title: 'Secondary Button Link',          type: 'string',       group: 'hero' },
      {
        name: 'heroMediaType',
        title: 'Hero Media Type',
        type: 'string',
        group: 'hero',
        description: 'Choose Image or Video for the D-shape visual next to the hero text.',
        options: {
          list: [
            { title: 'Image', value: 'image' },
            { title: 'Video', value: 'video' },
          ],
          layout: 'radio',
        },
      },
      { name: 'heroImage',         title: 'Hero Image',             type: 'image', group: 'hero', options: { hotspot: true } },
      { name: 'heroImageAlt',      title: 'Hero Image Alt Text',    type: 'localeString', group: 'hero', description: 'For accessibility and SEO.' },
      { name: 'heroVideoUrl',      title: 'Hero Video URL',         type: 'url', group: 'hero', description: 'Direct URL to an .mp4 file. Used when Hero Media Type = Video.' },

      // ─── 🤝 CLIENTS & PARTNERS ──────────────────────────────────────
      { name: 'clientsBannerTitle', title: 'Clients Banner Title', type: 'localeString', group: 'clients', description: "e.g. 'Trusted by leading brands across Qatar'" },
      {
        name: 'clientLogos',
        title: 'Client Logos (scrolling marquee)',
        type: 'array',
        group: 'clients',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Client Name', type: 'localeString' },
              { name: 'logo', title: 'Client Logo', type: 'image', options: { hotspot: true } },
            ],
          },
        ],
      },
      {
        name: 'aboutLogos',
        title: 'Certified Partners (Meta, Google, etc.)',
        type: 'array',
        group: 'clients',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Name', type: 'localeString' },
              { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
            ],
          },
        ],
      },

      // ─── 🧭 GROWTH SYSTEM ───────────────────────────────────────────
      { name: 'systemEyebrow', title: 'Eyebrow',        type: 'localeString', group: 'system', description: "e.g. 'How we work'" },
      { name: 'systemTitle',   title: 'Section Title',  type: 'localeString', group: 'system' },
      {
        name: 'growthSteps',
        title: 'Growth Steps (Build / Attract / Convert / Scale)',
        type: 'array',
        group: 'system',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Step Title', type: 'localeString' },
              { name: 'text',  title: 'Step Text',  type: 'localeText' },
            ],
          },
        ],
      },

      // ─── 🎨 SERVICES SECTION ────────────────────────────────────────
      { name: 'servicesEyebrow', title: 'Eyebrow',       type: 'localeString', group: 'services', description: "e.g. 'Our Marketing Services in Qatar'" },
      { name: 'servicesTitle',   title: 'Section Title', type: 'localeString', group: 'services' },

      // ─── 📊 STATS ───────────────────────────────────────────────────
      {
        name: 'proofItems',
        title: 'Stats Numbers (600+, 1000 Students, etc.)',
        type: 'array',
        group: 'stats',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'number', title: 'Number (e.g. "600+" or "24K → 1M QAR")', type: 'string' },
              { name: 'label',  title: 'Label (below the number)',                type: 'localeString' },
            ],
          },
        ],
      },

      // ─── 📖 ABOUT SECTION ───────────────────────────────────────────
      { name: 'aboutEyebrow',    title: 'Eyebrow',       type: 'localeString', group: 'about' },
      { name: 'aboutTitle',      title: 'Section Title', type: 'localeString', group: 'about' },
      { name: 'aboutText',       title: 'About Text',    type: 'localeText',   group: 'about' },
      { name: 'aboutButtonText', title: 'Button Text',   type: 'localeString', group: 'about' },
      { name: 'aboutButtonLink', title: 'Button Link',   type: 'string',       group: 'about' },
      { name: 'aboutImage',      title: 'About Image',   type: 'image',        group: 'about', options: { hotspot: true } },

      // ─── 💼 WORK / CASE STUDIES ─────────────────────────────────────
      { name: 'caseStudiesEyebrow',  title: 'Eyebrow',           type: 'localeString', group: 'work', description: "e.g. 'Our Work in Qatar'" },
      { name: 'caseStudiesTitle',    title: 'Section Title',     type: 'localeString', group: 'work' },
      { name: 'caseStudiesLinkText', title: 'Link Text',         type: 'localeString', group: 'work', description: "e.g. 'View all case studies →'" },
      { name: 'caseStudyCardCta',    title: 'Card CTA Text',     type: 'localeString', group: 'work', description: "e.g. 'View Case Study →'" },

      // ─── 📝 BLOG SECTION ────────────────────────────────────────────
      { name: 'blogPill',        title: 'Pill / Label',      type: 'localeString', group: 'blog', description: "e.g. 'Marketing Insights'" },
      { name: 'blogTitle',       title: 'Section Title',     type: 'localeString', group: 'blog' },
      { name: 'blogDescription', title: 'Section Description', type: 'localeText',   group: 'blog' },
      { name: 'blogLinkText',    title: 'Link Text',         type: 'localeString', group: 'blog', description: "e.g. 'Read all insights →'" },

      // ─── 🚀 FINAL CTA ───────────────────────────────────────────────
      { name: 'finalCtaTitle',      title: 'CTA Title',        type: 'localeString', group: 'finalCta' },
      { name: 'finalCtaText',       title: 'CTA Text',         type: 'localeText',   group: 'finalCta' },
      { name: 'finalCtaButtonText', title: 'CTA Button Text',  type: 'localeString', group: 'finalCta' },
      { name: 'finalCtaButtonLink', title: 'CTA Button Link',  type: 'string',       group: 'finalCta' },
      {
        name: 'finalCtaImage',
        title: 'CTA Image',
        type: 'image',
        group: 'finalCta',
        description: 'Portrait image on the right of the Final CTA section. Falls back to Hero Image if empty.',
        options: { hotspot: true },
      },

      // ─── 📦 LEGACY (hidden fields — data preserved but not displayed) ─
      { name: 'logo',           title: 'Logo (legacy, use Navigation instead)', type: 'image',        group: 'legacy', options: { hotspot: true } },
      { name: 'proofEyebrow',   title: 'Proof Strip Eyebrow (legacy)',           type: 'localeString', group: 'legacy' },
      { name: 'aboutPattern',   title: 'About Background Pattern (legacy)',      type: 'image',        group: 'legacy', options: { hotspot: true } },
      { name: 'missionEyebrow', title: 'Mission Eyebrow (legacy)',               type: 'localeString', group: 'legacy' },
      { name: 'missionTitle',   title: 'Mission Title (legacy)',                 type: 'localeString', group: 'legacy' },
      { name: 'missionText',    title: 'Mission Text (legacy)',                  type: 'localeText',   group: 'legacy' },
      { name: 'workEyebrow',    title: 'Work Eyebrow (legacy)',                  type: 'localeString', group: 'legacy' },
      { name: 'workTitle',      title: 'Work Title (legacy)',                    type: 'localeString', group: 'legacy' },
      { name: 'footerText',     title: 'Footer Text (legacy, use Navigation)',   type: 'localeString', group: 'legacy' },
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
      {
        name: 'featuredWebProjects',
        title: 'Portfolio Projects (shown as cards)',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'webProject' }] }],
        description: 'Pick projects from the Portfolio. When set, these replace the inline "Projects / Companies We Worked For" cards below. Order = display order.',
      },
      { name: 'faqsEyebrow',          title: 'FAQs Eyebrow',            type: 'localeString' },
      { name: 'faqsTitle',            title: 'FAQs Title',              type: 'localeString' },

      // In-page strategy-form section copy (eyebrow / title / subtitle / button)
      { name: 'formEyebrow',          title: 'Form Section Eyebrow',    type: 'localeString' },
      { name: 'formTitle',            title: 'Form Section Title',      type: 'localeString' },
      { name: 'formSubtitle',         title: 'Form Section Subtitle',   type: 'localeText' },
      { name: 'formSubmitText',       title: 'Form Submit Button Text', type: 'localeString' },

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

// Video samples (reel) — primarily used by the Videography service, but
// available on any service that wants to embed videos. Supports YouTube,
// Vimeo, and direct video files (Sanity-uploaded or external MP4 URLs).
{ name: 'videoSamplesEyebrow', title: 'Video Samples Eyebrow', type: 'localeString', description: "e.g. 'Selected Reel'" },
{ name: 'videoSamplesTitle',   title: 'Video Samples Title',   type: 'localeString', description: 'Headline shown above the video grid.' },
{ name: 'videoSamplesSubtitle', title: 'Video Samples Subtitle', type: 'localeText', description: 'Optional intro paragraph above the grid.' },
{
  name: 'videoSamples',
  title: 'Video Samples',
  type: 'array',
  description: 'Embed YouTube, Vimeo, or direct video URLs to showcase work. Order = display order.',
  of: [
    {
      type: 'object',
      preview: {
        select: { en: 'title.en', ar: 'title.ar', media: 'thumbnail' },
        prepare: ({ en, ar, media }) => ({ title: en || ar || 'Video sample', media }),
      },
      fields: [
        { name: 'title', title: 'Title', type: 'localeString' },
        { name: 'description', title: 'Short Description', type: 'localeText', description: 'Shown under the title (optional).' },
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'Paste a YouTube link (watch, youtu.be, or Shorts), a Vimeo link, or a direct .mp4/.webm URL.',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        },
        {
          name: 'videoFile',
          title: 'Video File (optional)',
          type: 'file',
          description: 'Upload directly to Sanity instead of using a URL. Use sparingly — large files are expensive.',
          options: { accept: 'video/mp4,video/webm,video/quicktime' },
        },
        {
          name: 'thumbnail',
          title: 'Thumbnail / Poster',
          type: 'image',
          options: { hotspot: true },
          description: 'Used as the still image before the video plays. Recommended.',
        },
        {
          name: 'aspectRatio',
          title: 'Aspect Ratio',
          type: 'string',
          description: 'Affects how the card is sized in the grid.',
          options: {
            list: [
              { title: 'Landscape · 16:9 (default)', value: '16-9' },
              { title: 'Portrait · 9:16 (Reels / Shorts / TikTok)', value: '9-16' },
              { title: 'Square · 1:1', value: '1-1' },
            ],
            layout: 'radio',
          },
          initialValue: '16-9',
        },
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
          { type: 'cardsBlock' },
          { type: 'comparisonBlock' },
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
  groups: [
    { name: 'seo',      title: '🔍 SEO',                default: true },
    { name: 'hero',     title: '🎯 Hero' },
    { name: 'details',  title: '📞 Contact Details' },
    { name: 'map',      title: '🗺️ Map' },
    { name: 'form',     title: '📝 Contact Form' },
    { name: 'cta',      title: '🚀 Final CTA' },
  ],
  fields: [
    // ─── SEO ─────────────────────────────────────────────────────────
    { name: 'seo', title: 'SEO Settings', type: 'seo', group: 'seo' },

    // ─── HERO ────────────────────────────────────────────────────────
    { name: 'eyebrow',  title: 'Eyebrow (small text above title)', type: 'localeString', group: 'hero' },
    { name: 'title',    title: 'Page Title',                       type: 'localeString', group: 'hero' },
    { name: 'subtitle', title: 'Page Subtitle',                    type: 'localeText',   group: 'hero' },

    // ─── CONTACT DETAILS ─────────────────────────────────────────────
    { name: 'contactDetailsTitle', title: 'Section Title', type: 'localeString', group: 'details' },
    {
      name: 'detailLabels',
      title: 'Detail Labels (bilingual)',
      type: 'object',
      group: 'details',
      description: 'Labels shown above each contact detail (Working Hours, Phone, Email, Location).',
      fields: [
        { name: 'workingHours', title: 'Working Hours Label', type: 'localeString' },
        { name: 'phone',        title: 'Phone Label',         type: 'localeString' },
        { name: 'email',        title: 'Email Label',         type: 'localeString' },
        { name: 'location',     title: 'Location Label',      type: 'localeString' },
      ],
    },
    { name: 'phone',        title: 'Phone Number',    type: 'string',     group: 'details' },
    { name: 'email',        title: 'Email Address',   type: 'string',     group: 'details' },
    { name: 'address',      title: 'Address',         type: 'localeText', group: 'details' },
    { name: 'workingHours', title: 'Working Hours',   type: 'string',     group: 'details', description: "e.g. '9 AM - 6 PM'" },
    { name: 'openLocationButton', title: 'Open Location Button Text', type: 'localeString', group: 'details' },

    // ─── MAP ─────────────────────────────────────────────────────────
    { name: 'mapEmbed', title: 'Google Maps Embed URL', type: 'url', group: 'map', description: 'From Google Maps → Share → Embed a map → Copy the URL inside the iframe src.' },
    { name: 'mapUrl',   title: 'Google Maps Page URL',  type: 'url', group: 'map', description: 'Link opened when the user clicks the location.' },

    // ─── CONTACT FORM ────────────────────────────────────────────────
    { name: 'formEyebrow',  title: 'Form Eyebrow',   type: 'localeString', group: 'form' },
    { name: 'formTitle',    title: 'Form Title',     type: 'localeString', group: 'form' },
    { name: 'formSubtitle', title: 'Form Subtitle',  type: 'localeText',   group: 'form' },
    {
      name: 'formPlaceholders',
      title: 'Field Placeholders',
      type: 'object',
      group: 'form',
      fields: [
        { name: 'name',    title: 'Name Placeholder',    type: 'localeString' },
        { name: 'email',   title: 'Email Placeholder',   type: 'string' },
        { name: 'phone',   title: 'Phone Placeholder',   type: 'string' },
        { name: 'company', title: 'Company Placeholder', type: 'localeString' },
        { name: 'service', title: 'Service Placeholder', type: 'localeString' },
        { name: 'message', title: 'Message Placeholder', type: 'localeString' },
      ],
    },
    {
      name: 'servicesOptions',
      title: 'Service Dropdown Options',
      type: 'array',
      group: 'form',
      of: [{ type: 'localeString' }],
    },
    { name: 'formSubmitText',   title: 'Submit Button Text', type: 'localeString', group: 'form' },
    { name: 'formSuccessTitle', title: 'Success Title',      type: 'localeString', group: 'form' },
    { name: 'formSuccessText',  title: 'Success Message',    type: 'localeText',   group: 'form' },
    { name: 'formErrorMessage', title: 'Error Message',      type: 'localeText',   group: 'form' },
    { name: 'formPrivacyNote',  title: 'Privacy Note',       type: 'localeString', group: 'form' },
    {
      name: 'recipientEmail',
      title: 'Form Recipient Email',
      type: 'string',
      group: 'form',
      description: 'Where contact form submissions are emailed. Falls back to CONTACT_RECIPIENT_EMAIL env var if blank.',
    },

    // ─── FINAL CTA ───────────────────────────────────────────────────
    { name: 'ctaTagline',    title: 'CTA Tagline',        type: 'localeString', group: 'cta', description: 'Bold line on the left of the premium CTA.' },
    { name: 'ctaSubTagline', title: 'CTA Sub-Tagline',    type: 'localeString', group: 'cta' },
    { name: 'ctaTitle',      title: 'CTA Title',          type: 'localeString', group: 'cta' },
    { name: 'ctaText',       title: 'CTA Text',           type: 'localeText',   group: 'cta' },
    { name: 'ctaButtonText', title: 'CTA Button Text',    type: 'localeString', group: 'cta' },
    { name: 'ctaButtonLink', title: 'CTA Button Link',    type: 'string',       group: 'cta' },
    { name: 'ctaButtonNote', title: 'CTA Button Note',    type: 'localeString', group: 'cta', description: 'Small text under the CTA button.' },
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
  groups: [
    { name: 'seo',         title: '🔍 SEO',           default: true },
    { name: 'hero',        title: '🎯 Hero' },
    { name: 'positioning', title: '💡 Positioning' },
    { name: 'mission',     title: '🎪 Mission' },
    { name: 'methodology', title: '⚙️ Methodology' },
    { name: 'principles',  title: '📐 Principles' },
    { name: 'cta',         title: '🚀 Final CTA' },
  ],
  fields: [
    // ─── SEO ─────────────────────────────────────────────────────────
    { name: 'seo', title: 'SEO Settings', type: 'seo', group: 'seo' },

    // ─── HERO ────────────────────────────────────────────────────────
    { name: 'eyebrow',      title: 'Eyebrow (small text above title)', type: 'localeString', group: 'hero' },
    { name: 'title',        title: 'Hero Title',                       type: 'localeString', group: 'hero' },
    { name: 'subtitle',     title: 'Hero Subtitle',                    type: 'localeText',   group: 'hero' },
    { name: 'heroImage',    title: 'Hero Image',                       type: 'image',        group: 'hero', options: { hotspot: true } },
    { name: 'heroImageAlt', title: 'Hero Image Alt Text',              type: 'localeString', group: 'hero', description: 'For accessibility & SEO.' },

    // ─── POSITIONING ─────────────────────────────────────────────────
    { name: 'positioningTitle', title: 'Section Title',       type: 'localeString', group: 'positioning' },
    { name: 'positioning',      title: 'Positioning Statement', type: 'localeText', group: 'positioning' },

    // ─── MISSION ─────────────────────────────────────────────────────
    { name: 'missionEyebrow', title: 'Eyebrow',       type: 'localeString', group: 'mission' },
    { name: 'missionTitle',   title: 'Section Title', type: 'localeString', group: 'mission' },
    { name: 'missionText',    title: 'Section Text',  type: 'localeText',   group: 'mission' },

    // ─── METHODOLOGY ─────────────────────────────────────────────────
    { name: 'methodologyEyebrow', title: 'Eyebrow',       type: 'localeString', group: 'methodology' },
    { name: 'methodologyTitle',   title: 'Section Title', type: 'localeString', group: 'methodology' },
    { name: 'methodologyText',    title: 'Section Text',  type: 'localeText',   group: 'methodology' },

    // ─── PRINCIPLES ──────────────────────────────────────────────────
    { name: 'principlesEyebrow', title: 'Eyebrow',       type: 'localeString', group: 'principles' },
    { name: 'principlesTitle',   title: 'Section Title', type: 'localeString', group: 'principles' },
    {
      name: 'principles',
      title: 'Principles List',
      type: 'array',
      group: 'principles',
      of: [{ type: 'localeString' }],
    },

    // ─── FINAL CTA ───────────────────────────────────────────────────
    { name: 'ctaTitle',      title: 'CTA Title',       type: 'localeString', group: 'cta' },
    { name: 'ctaText',       title: 'CTA Text',        type: 'localeText',   group: 'cta' },
    { name: 'ctaButtonText', title: 'CTA Button Text', type: 'localeString', group: 'cta' },
    { name: 'ctaButtonLink', title: 'CTA Button Link', type: 'string',       group: 'cta' },
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

// ──────────────────────────────────────────────────────────────────────
// Site Settings — analytics, pixels, verification tokens, API keys.
// Edit-only-in-Studio singleton. Paste IDs here, they wire themselves
// into every page automatically (see PageLayout.tsx).
// ──────────────────────────────────────────────────────────────────────
{
  name: 'siteSettings',
  title: 'Site Settings — Analytics & Pixels',
  type: 'document',
  preview: {
    prepare() {
      return {title: 'Site Settings', subtitle: 'Analytics, pixels, verification'}
    },
  },
  groups: [
    {name: 'google',       title: 'Google (Analytics, Ads, Search Console)'},
    {name: 'meta',         title: 'Meta (Facebook & Instagram)'},
    {name: 'other',        title: 'Other Pixels (TikTok, Snapchat, LinkedIn, X)'},
    {name: 'verification', title: 'Site Verification Tokens'},
  ],
  fields: [
    // ─── Google ───────────────────────────────────────────────────────
    {
      name: 'gaMeasurementId',
      title: 'Google Analytics 4 — Measurement ID',
      type: 'string',
      group: 'google',
      description: "Starts with 'G-'. From analytics.google.com → Admin → Data Streams → Web.",
    },
    {
      name: 'gtmContainerId',
      title: 'Google Tag Manager — Container ID',
      type: 'string',
      group: 'google',
      description: "Starts with 'GTM-'. Use this instead of GA4 if you prefer managing tags in GTM.",
    },
    {
      name: 'googleAdsConversionId',
      title: 'Google Ads — Conversion ID',
      type: 'string',
      group: 'google',
      description: "Starts with 'AW-'. From ads.google.com → Tools & Settings → Conversions → Tag setup.",
    },
    {
      name: 'googleAdsConversionLabel',
      title: 'Google Ads — Conversion Label',
      type: 'string',
      group: 'google',
      description: 'The label of the conversion action you want to fire when the strategy form submits.',
    },

    // ─── Meta ─────────────────────────────────────────────────────────
    {
      name: 'metaPixelId',
      title: 'Meta Pixel ID (Facebook & Instagram)',
      type: 'string',
      group: 'meta',
      description: '15–16 digit number from business.facebook.com → Events Manager.',
    },
    {
      name: 'metaConversionsApiToken',
      title: 'Meta Conversions API — Access Token (optional)',
      type: 'string',
      group: 'meta',
      description: 'For server-side tracking (bypasses iOS 14.5 blocking). Add later when ready.',
    },

    // ─── Other pixels ─────────────────────────────────────────────────
    {
      name: 'tiktokPixelId',
      title: 'TikTok Pixel ID',
      type: 'string',
      group: 'other',
    },
    {
      name: 'snapchatPixelId',
      title: 'Snapchat Pixel ID',
      type: 'string',
      group: 'other',
    },
    {
      name: 'linkedinPartnerId',
      title: 'LinkedIn Insight Tag — Partner ID',
      type: 'string',
      group: 'other',
    },
    {
      name: 'xPixelId',
      title: 'X (Twitter) Pixel ID',
      type: 'string',
      group: 'other',
    },

    // ─── Site verification tokens ─────────────────────────────────────
    {
      name: 'googleSiteVerification',
      title: 'Google Search Console — Verification Token',
      type: 'string',
      group: 'verification',
      description: "The 'content' value from Google's HTML tag verification method.",
    },
    {
      name: 'bingSiteVerification',
      title: 'Bing Webmaster — Verification Token',
      type: 'string',
      group: 'verification',
    },
    {
      name: 'yandexSiteVerification',
      title: 'Yandex — Verification Token',
      type: 'string',
      group: 'verification',
    },
    {
      name: 'facebookDomainVerification',
      title: 'Facebook Domain Verification',
      type: 'string',
      group: 'verification',
      description: 'From business.facebook.com → Business Settings → Brand Safety → Domains.',
    },
  ],
},

// ──────────────────────────────────────────────────────────────────────
// Landing Pages — conversion-focused campaign pages at /lp/{slug}
// ──────────────────────────────────────────────────────────────────────
{
  name: 'landingPage',
  title: 'Landing Pages',
  type: 'document',
  preview: {
    select: { en: 'hero.title.en', ar: 'hero.title.ar', slug: 'slug.current' },
    prepare({ en, ar, slug }) {
      return {
        title: en || ar || slug || '(untitled landing page)',
        subtitle: slug ? `/lp/${slug}` : '',
      }
    },
  },
  fields: [
    { name: 'seo', title: 'SEO Settings', type: 'seo' },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used in the URL: /lp/{slug}. Keep it keyword-rich, e.g. "seo-qatar".',
      options: { source: (doc) => (doc?.hero?.title?.en || doc?.hero?.title?.ar || ''), maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'serviceTag',
      title: 'Service Tag',
      type: 'string',
      description: 'Pre-filled in the strategy form so leads come tagged with the right campaign (e.g. "SEO Retainer Qatar").',
    },

    // Hero
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow (small label above headline)', type: 'localeString' },
        { name: 'title', title: 'Headline', type: 'localeString' },
        { name: 'subtitle', title: 'Subheadline', type: 'localeText' },
        {
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'localeString',
              description: 'Accessibility + SEO. Should include "marketing agency in Qatar" or similar phrasing naturally.',
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'localeString',
              description: 'Optional caption shown under the image.',
            },
          ],
        },
        { name: 'ctaText', title: 'Primary CTA Text', type: 'localeString', description: 'e.g. "Get My Free SEO Audit"' },
        { name: 'trustNote', title: 'Trust Note (small text below CTA)', type: 'localeString', description: 'e.g. "No commitment · 30-min call"' },
      ],
    },

    // Pain points
    {
      name: 'pains',
      title: 'Pain Points',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
        { name: 'title', title: 'Title', type: 'localeString' },
        { name: 'subtitle', title: 'Subtitle', type: 'localeText' },
        {
          name: 'items',
          title: 'Pain Points',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'localeString', title: 'Title' },
              { name: 'description', type: 'localeText', title: 'Description' },
            ],
            preview: { select: { en: 'title.en', ar: 'title.ar' }, prepare: ({en, ar}) => ({title: en || ar || 'Pain'}) },
          }],
        },
      ],
    },

    // What's included
    {
      name: 'includes',
      title: "What's Included",
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
        { name: 'title', title: 'Title', type: 'localeString' },
        { name: 'subtitle', title: 'Subtitle', type: 'localeText' },
        {
          name: 'items',
          title: 'Inclusions',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'localeString', title: 'Title' },
              { name: 'description', type: 'localeText', title: 'Description' },
            ],
            preview: { select: { en: 'title.en', ar: 'title.ar' }, prepare: ({en, ar}) => ({title: en || ar || 'Item'}) },
          }],
        },
      ],
    },

    // Process
    {
      name: 'process',
      title: 'Process / How it works',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
        { name: 'title', title: 'Title', type: 'localeString' },
        {
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'localeString', title: 'Title' },
              { name: 'description', type: 'localeText', title: 'Description' },
            ],
            preview: { select: { en: 'title.en', ar: 'title.ar' }, prepare: ({en, ar}) => ({title: en || ar || 'Step'}) },
          }],
        },
      ],
    },

    // Proof / testimonials
    {
      name: 'proof',
      title: 'Proof / Testimonials',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
        { name: 'title', title: 'Title', type: 'localeString' },
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'quote', type: 'localeText', title: 'Quote' },
              { name: 'author', type: 'string', title: 'Author Name' },
              { name: 'role', type: 'localeString', title: 'Role / Company' },
            ],
            preview: { select: { author: 'author', en: 'role.en' }, prepare: ({author, en}) => ({title: author || 'Testimonial', subtitle: en}) },
          }],
        },
      ],
    },

    // Featured case studies
    {
      name: 'featuredCaseStudies',
      title: 'Featured Case Studies',
      type: 'array',
      description: 'Cherry-pick the most persuasive case studies for this campaign.',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    },

    // Pricing (optional)
    {
      name: 'pricing',
      title: 'Pricing (optional)',
      type: 'object',
      fields: [
        { name: 'show', title: 'Show Pricing Section', type: 'boolean', initialValue: false },
        { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
        { name: 'title', title: 'Title', type: 'localeString' },
        { name: 'subtitle', title: 'Subtitle', type: 'localeText' },
        {
          name: 'tiers',
          title: 'Pricing Tiers',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'name', type: 'localeString', title: 'Tier Name' },
              { name: 'price', type: 'string', title: 'Price', description: 'e.g. "5,000 QAR"' },
              { name: 'period', type: 'localeString', title: 'Period', description: 'e.g. "/month"' },
              { name: 'description', type: 'localeText', title: 'Short Description' },
              {
                name: 'features',
                title: 'Features',
                type: 'array',
                of: [{ type: 'localeString' }],
              },
              { name: 'ctaText', type: 'localeString', title: 'CTA Button Text' },
              { name: 'popular', type: 'boolean', title: 'Mark as Most Popular', initialValue: false },
            ],
            preview: { select: { en: 'name.en', price: 'price' }, prepare: ({en, price}) => ({title: en || 'Tier', subtitle: price}) },
          }],
        },
      ],
    },

    // FAQ
    {
      name: 'faqs',
      title: 'FAQ',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
        { name: 'title', title: 'Title', type: 'localeString' },
        { name: 'subtitle', title: 'Subtitle', type: 'localeText' },
        {
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'question', type: 'localeString', title: 'Question' },
              { name: 'answer', type: 'localeText', title: 'Answer' },
            ],
            preview: { select: { en: 'question.en', ar: 'question.ar' }, prepare: ({en, ar}) => ({title: en || ar || 'Question'}) },
          }],
        },
      ],
    },

    // Form Section copy (the form itself reuses global strategyForm settings)
    {
      name: 'form',
      title: 'Form Section Copy',
      type: 'object',
      description: "The form's countries, services list and validation come from the global Strategy Form singleton. This section just controls the surrounding copy.",
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
        { name: 'title', title: 'Title', type: 'localeString' },
        { name: 'subtitle', title: 'Subtitle', type: 'localeText' },
        { name: 'submitText', title: 'Submit Button Text', type: 'localeString' },
      ],
    },

    // Final CTA
    {
      name: 'finalCta',
      title: 'Final CTA',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'localeString' },
        { name: 'title', title: 'Title', type: 'localeString' },
        { name: 'subtitle', title: 'Subtitle', type: 'localeText' },
        { name: 'buttonText', title: 'Button Text', type: 'localeString' },
      ],
    },
  ],
},

  // Web Development portfolio (see ./portfolio.js)
  webProject,
  portfolioPage,
  // Extra service page-builder blocks (see ./blocks.js)
  comparisonBlock,
  cardsBlock,
]