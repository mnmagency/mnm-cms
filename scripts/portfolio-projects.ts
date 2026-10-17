/**
 * Portfolio projects — the single list of websites seeded into Sanity as
 * `webProject` documents by scripts/seed-portfolio.ts.
 *
 * To add a site: copy a block, give it a unique `id` + `slug`, fill the
 * bilingual copy, and put a screenshot at seed-assets/portfolio/<slug>.jpg
 * (or .png/.webp). With no local image, the seed script uses the live site's
 * og:image. After seeding, everything stays editable in Studio → Web Project.
 */

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

export type PortfolioProject = {
  id: string // Sanity _id suffix → webProject-<id>
  slug: string
  order: number
  title: Loc
  clientName: Loc
  websiteUrl?: string
  category: Loc
  projectType: Loc
  year?: string
  technologies?: string[]
  summary: Loc
  overview?: Loc
  challenge?: Loc
  solution?: Loc
  results?: Loc
  features?: Loc[]
  /** Reuse an image already in Sanity instead of uploading. */
  heroImageAssetId?: string
  clientLogoAssetId?: string
  /** slug of an existing caseStudy to link (avoids duplicating it). */
  relatedCaseStudySlug?: string
  seo?: {metaTitle: Loc; metaDescription: Loc}
  /** Show on the Web Development service page. */
  showOnWebDevPage?: boolean
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // ── HEC Mannai ────────────────────────────────────────────────────────────
  {
    id: 'hec-mannai',
    slug: 'hec-mannai',
    order: 10,
    title: L('Mannai Heavy Equipment & Commercial Vehicles', 'مناعي للمعدات الثقيلة والمركبات التجارية'),
    clientName: L('Mannai HEC', 'مناعي HEC'),
    websiteUrl: 'https://hecv.mannai.sa',
    category: L('Heavy Equipment', 'المعدات الثقيلة'),
    projectType: L('Corporate Website · Headless CMS', 'موقع مؤسسي · نظام إدارة محتوى Headless'),
    technologies: ['Next.js', 'Sanity CMS', 'Medusa.js', 'Node.js', 'Tailwind CSS'],
    summary: L(
      'A fast, fully CMS-driven corporate website for Mannai’s heavy equipment and commercial vehicles division in Saudi Arabia.',
      'موقع مؤسسي سريع يُدار بالكامل عبر نظام إدارة المحتوى لقسم المعدات الثقيلة والمركبات التجارية لدى مناعي في المملكة العربية السعودية.',
    ),
    overview: L(
      'Mannai Heavy Equipment & Commercial Vehicles (HECV) needed a modern digital home for its brands, product lines and services in the Saudi market. M&M designed and developed a headless website where every page, product and image is managed by the client’s team — no developer needed for day-to-day updates.',
      'احتاجت مناعي للمعدات الثقيلة والمركبات التجارية إلى منصة رقمية حديثة تعرض علاماتها التجارية وخطوط منتجاتها وخدماتها في السوق السعودي. صممت M&M وطوّرت موقعاً بتقنية Headless يتيح لفريق العميل إدارة كل صفحة ومنتج وصورة دون الحاجة إلى مطوّر للتحديثات اليومية.',
    ),
    solution: L(
      'A Next.js front end backed by Sanity CMS and a Medusa.js commerce engine, built as a monorepo. Sixteen content models power sixteen pages with a strict CMS-first approach, plus custom hero video and motion graphics produced in-house.',
      'واجهة أمامية مبنية على Next.js مدعومة بنظام Sanity لإدارة المحتوى ومحرك تجارة Medusa.js ضمن بنية Monorepo. ستة عشر نموذج محتوى تشغّل ستة عشر صفحة وفق منهج يعتمد كلياً على نظام إدارة المحتوى، إلى جانب فيديو رئيسي ورسوم متحركة أنتجها فريقنا.',
    ),
    features: [
      L('Fully editable headless CMS (Sanity)', 'نظام إدارة محتوى Headless قابل للتعديل بالكامل (Sanity)'),
      L('Product and brand catalogue', 'كتالوج للمنتجات والعلامات التجارية'),
      L('Commerce-ready Medusa.js backend', 'خلفية Medusa.js جاهزة للتجارة الإلكترونية'),
      L('Custom hero video & motion graphics', 'فيديو رئيسي ورسوم متحركة مخصصة'),
      L('Optimised WebP imagery for speed', 'صور WebP محسّنة للسرعة'),
      L('Arabic / RTL on the roadmap', 'دعم العربية واتجاه RTL ضمن خارطة الطريق'),
    ],
    seo: {
      metaTitle: L('Mannai HEC Website | Web Development by M&M', 'موقع مناعي HEC | تطوير المواقع من M&M'),
      metaDescription: L(
        'How M&M built a headless Next.js + Sanity website for Mannai Heavy Equipment & Commercial Vehicles in Saudi Arabia.',
        'كيف بنت M&M موقعاً بتقنية Next.js وSanity لمناعي للمعدات الثقيلة والمركبات التجارية في السعودية.',
      ),
    },
    showOnWebDevPage: true,
  },

  // ── Denza Qatar (migrated from the inline card; linked to its case study) ──
  {
    id: 'denza-qatar',
    slug: 'denza-qatar',
    order: 20,
    title: L('Denza Qatar', 'دينزا قطر'),
    clientName: L('Denza Qatar', 'دينزا قطر'),
    websiteUrl: 'https://www.denzaqatar.com',
    category: L('Automotive', 'السيارات'),
    projectType: L('Brand Website', 'موقع علامة تجارية'),
    summary: L(
      'The official Qatar website for DENZA, BYD’s premium electric marque.',
      'الموقع الرسمي في قطر لعلامة دينزا، العلامة الفاخرة للسيارات الكهربائية من BYD.',
    ),
    overview: L(
      'DENZA is where the elegance of East and West converges — a seamless fusion of technology and poetry.\n\nFounded in 2010 as a joint venture between BYD and Mercedes-Benz, DENZA was born with a clear vision: to redefine the automotive experience through innovation, intelligence, and refined excellence.\n\nIn 2024, DENZA became BYD’s fully owned premium marque, ushering in a new era of technology-driven mobility.',
      'دينزا هي المكان الذي تلتقي فيه أناقة الشرق والغرب - مزيج سلس بين التكنولوجيا والشعر.\n\nتأسست DENZA في عام 2010 كمشروع مشترك بين BYD وMercedes-Benz، وقد ولدت برؤية واضحة: إعادة تعريف تجربة السيارات من خلال الابتكار والذكاء والتميز الراقي.\n\nوفي عام 2024، أصبحت DENZA العلامة التجارية الفاخرة المملوكة بالكامل لشركة BYD، إيذانا ببدء عصر جديد من التنقل القائم على التكنولوجيا.',
    ),
    heroImageAssetId: 'image-5344afb16725bafcbf3697df0b9f73ae9d16a43b-2878x1552-png',
    clientLogoAssetId: 'image-04549a44857bc6af573ed0605b62c3d6de591329-259x194-jpg',
    relatedCaseStudySlug: 'designing-and-developing-denza-qatar-website',
    showOnWebDevPage: true,
  },

  // ── ICC Qatar (migrated from the inline card) ──────────────────────────────
  {
    id: 'icc-qatar',
    slug: 'icc-qatar',
    order: 30,
    title: L('ICC Qatar', 'غرفة التجارة الدولية قطر'),
    clientName: L('International Chamber of Commerce Qatar', 'غرفة التجارة الدولية قطر'),
    // websiteUrl: 'https://…',  ← TODO: confirm live URL
    category: L('Semi Government', 'شبه حكومية'),
    projectType: L('Institutional Website', 'موقع مؤسسي'),
    summary: L(
      'Website for ICC Qatar, the national committee of the Paris-based International Chamber of Commerce.',
      'موقع غرفة التجارة الدولية قطر، اللجنة الوطنية لغرفة التجارة الدولية ومقرها باريس.',
    ),
    overview: L(
      'ICC is the world business organization, with a global network of over 6 million members in more than 100 countries, enabling business to secure peace, prosperity and opportunity for all.\n\nThe International Chamber of Commerce (ICC) Qatar, a national committee of the Paris-based ICC, represents a growing number of Qatari-based businesses, as well as, local and foreign business chambers and key national associations of the business sector.\n\nICC Qatar was established more than twenty years ago to promote the Qatari business community\'s interests in areas such as trade, investment and international relations. Furthermore, to help cultivate an environment conducive to foreign investments and enable Qatari businesses to be more involved with the global economy.',
      'غرفة التجارة الدولية هي منظمة الأعمال العالمية، مع شبكة عالمية تضم أكثر من 6 ملايين عضو في أكثر من 100 دولة، مما يتيح للشركات ضمان السلام والازدهار والفرص للجميع.\n\nتمثل غرفة التجارة الدولية في قطر، وهي لجنة وطنية تابعة لغرفة التجارة الدولية ومقرها باريس، عددًا متزايدًا من الشركات القطرية، بالإضافة إلى غرف الأعمال المحلية والأجنبية والجمعيات الوطنية الرئيسية لقطاع الأعمال.\n\nتأسست غرفة التجارة الدولية قطر منذ أكثر من عشرين عاماً لتعزيز مصالح مجتمع الأعمال القطري في مجالات مثل التجارة والاستثمار والعلاقات الدولية. علاوة على ذلك، للمساعدة في تهيئة بيئة مواتية للاستثمارات الأجنبية وتمكين الشركات القطرية من المشاركة بشكل أكبر في الاقتصاد العالمي.',
    ),
    heroImageAssetId: 'image-f2034668f15ab62e8744cc213248d2937c55927a-2870x1396-jpg',
    clientLogoAssetId: 'image-618602357a73b3b175b39ded9e2241cc510271bf-1218x918-webp',
    showOnWebDevPage: true,
  },
]
