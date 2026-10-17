/**
 * Web Development portfolio
 *
 *   webProject     — one document per website we built. Each gets its own
 *                    indexable page at /portfolio/{slug}.
 *   portfolioPage  — singleton holding every label/heading on /portfolio and
 *                    the /portfolio/{slug} template (nothing hardcoded).
 *
 * The Web Development service references webProjects via
 * `featuredWebProjects` (see the service schema), so a project is entered
 * once and shown everywhere.
 */

export const webProject = {
  name: 'webProject',
  title: 'Web Project (Portfolio)',
  type: 'document',
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: '_createdAt', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {en: 'title.en', ar: 'title.ar', slug: 'slug.current', media: 'heroImage', url: 'websiteUrl'},
    prepare({en, ar, slug, media, url}) {
      return {title: en || ar || slug || '(no title)', subtitle: url || (slug ? `/portfolio/${slug}` : ''), media}
    },
  },
  groups: [
    {name: 'card', title: 'Card & Basics', default: true},
    {name: 'story', title: 'Project Story'},
    {name: 'media', title: 'Images'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    {name: 'title', title: 'Project Title', type: 'localeString', group: 'card', validation: (R) => R.required()},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'card',
      description: 'Page URL: /portfolio/{slug}',
      options: {source: (doc) => (doc.title && (doc.title.en || doc.title.ar)) || ''},
      validation: (R) => R.required(),
    },
    {name: 'clientName', title: 'Client Name', type: 'localeString', group: 'card'},
    {name: 'websiteUrl', title: 'Live Website URL', type: 'url', group: 'card', description: 'e.g. https://hecv.mannai.sa'},
    {name: 'category', title: 'Industry / Category', type: 'localeString', group: 'card', description: "e.g. 'Automotive', 'Semi Government'"},
    {name: 'projectType', title: 'Project Type', type: 'localeString', group: 'card', description: "e.g. 'Corporate Website', 'E-commerce', 'Web Portal'"},
    {name: 'year', title: 'Year Launched', type: 'string', group: 'card'},
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      group: 'card',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: "e.g. Next.js, Sanity, Node.js, WordPress",
    },
    {name: 'summary', title: 'Card Summary', type: 'localeText', group: 'card', description: '1–2 sentences shown on cards.'},
    {name: 'featured', title: 'Featured?', type: 'boolean', group: 'card', initialValue: false},
    {name: 'order', title: 'Display Order', type: 'number', group: 'card', description: 'Lower numbers show first.'},

    {name: 'overview', title: 'Overview', type: 'localeText', group: 'story'},
    {name: 'challenge', title: 'Challenge', type: 'localeText', group: 'story'},
    {name: 'solution', title: 'What We Built', type: 'localeText', group: 'story'},
    {name: 'results', title: 'Results', type: 'localeText', group: 'story'},
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      group: 'story',
      of: [{type: 'localeString'}],
    },
    {
      name: 'relatedCaseStudy',
      title: 'Related Case Study',
      type: 'reference',
      group: 'story',
      to: [{type: 'caseStudy'}],
      description: 'Optional. Links this project to its full case study instead of duplicating it.',
    },
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      group: 'story',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    },

    {
      name: 'heroImage',
      title: 'Main Image (screenshot)',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt text', type: 'localeString'}],
    },
    {name: 'clientLogo', title: 'Client Logo', type: 'image', group: 'media', options: {hotspot: true}},
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt text', type: 'localeString'}],
        },
      ],
    },

    {name: 'seo', title: 'SEO Settings', type: 'seo', group: 'seo'},
  ],
}

export const portfolioPage = {
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  preview: {
    select: {en: 'title.en', ar: 'title.ar'},
    prepare({en, ar}) {
      return {title: en || ar || 'Portfolio Page', subtitle: '/portfolio'}
    },
  },
  groups: [
    {name: 'index', title: '/portfolio', default: true},
    {name: 'detail', title: 'Project page labels'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    {name: 'seo', title: 'SEO Settings', type: 'seo', group: 'seo'},
    {name: 'eyebrow', title: 'Eyebrow', type: 'localeString', group: 'index'},
    {name: 'title', title: 'Hero Title', type: 'localeString', group: 'index'},
    {name: 'subtitle', title: 'Hero Subtitle', type: 'localeText', group: 'index'},
    {name: 'allFilterText', title: "'All' filter label", type: 'localeString', group: 'index'},
    {name: 'cardCtaText', title: 'Card CTA Text', type: 'localeString', group: 'index', description: "e.g. 'View Project →'"},
    {name: 'viewAllText', title: "'View full portfolio' link text", type: 'localeString', group: 'index', description: 'Shown under the project cards on service pages.'},

    {name: 'backText', title: 'Back link text', type: 'localeString', group: 'detail'},
    {name: 'visitSiteText', title: "'Visit website' button text", type: 'localeString', group: 'detail'},
    {name: 'clientLabel', title: "'Client' label", type: 'localeString', group: 'detail'},
    {name: 'industryLabel', title: "'Industry' label", type: 'localeString', group: 'detail'},
    {name: 'typeLabel', title: "'Project type' label", type: 'localeString', group: 'detail'},
    {name: 'yearLabel', title: "'Year' label", type: 'localeString', group: 'detail'},
    {name: 'techLabel', title: "'Technologies' label", type: 'localeString', group: 'detail'},
    {name: 'overviewLabel', title: "'Overview' label", type: 'localeString', group: 'detail'},
    {name: 'challengeLabel', title: "'Challenge' label", type: 'localeString', group: 'detail'},
    {name: 'solutionLabel', title: "'What we built' label", type: 'localeString', group: 'detail'},
    {name: 'resultsLabel', title: "'Results' label", type: 'localeString', group: 'detail'},
    {name: 'featuresLabel', title: "'Key features' label", type: 'localeString', group: 'detail'},
    {name: 'caseStudyText', title: "'Read the case study' link text", type: 'localeString', group: 'detail'},
    {name: 'moreProjectsTitle', title: "'More projects' heading", type: 'localeString', group: 'detail'},
    {name: 'ctaTitle', title: 'Final CTA Title', type: 'localeString', group: 'detail'},
    {name: 'ctaText', title: 'Final CTA Text', type: 'localeText', group: 'detail'},
    {name: 'ctaButtonText', title: 'Final CTA Button Text', type: 'localeString', group: 'detail'},
    {name: 'ctaButtonLink', title: 'Final CTA Button Link', type: 'string', group: 'detail'},
  ],
}
