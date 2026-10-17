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
    projectType: L('Corporate website on a headless CMS', 'موقع مؤسسي على نظام إدارة محتوى Headless'),
    technologies: ['Next.js', 'Headless CMS', 'Medusa.js', 'Node.js', 'Tailwind CSS'],
    summary: L(
      'A fast corporate website for Mannai’s heavy equipment and commercial vehicles division in Saudi Arabia, fully editable by their own team.',
      'موقع مؤسسي سريع لقسم المعدات الثقيلة والمركبات التجارية لدى مناعي في المملكة العربية السعودية، يعدّله فريقهم بالكامل.',
    ),
    overview: L(
      'Mannai Heavy Equipment and Commercial Vehicles (HECV) needed a modern home for its brands, products and services in the Saudi market. We designed and built a headless website where their team manages every page, product and image themselves, with no developer needed for everyday updates.',
      'احتاجت مناعي للمعدات الثقيلة والمركبات التجارية إلى منصة حديثة لعلاماتها التجارية ومنتجاتها وخدماتها في السوق السعودي. صممنا وبنينا موقعاً بتقنية Headless يدير فيه فريقهم كل صفحة ومنتج وصورة بأنفسهم، دون الحاجة إلى مطوّر للتحديثات اليومية.',
    ),
    solution: L(
      'A Next.js website powered by a headless CMS, with a Medusa.js commerce engine ready for online sales. Sixteen content types drive sixteen pages, so nothing on the site is hard-coded. Our team also produced the hero video and motion graphics.',
      'موقع Next.js يعمل بنظام إدارة محتوى Headless، مع محرك تجارة Medusa.js جاهز للبيع عبر الإنترنت. ستة عشر نوعاً من المحتوى تشغّل ستة عشر صفحة، فلا شيء في الموقع مكتوب يدوياً في الشيفرة. كما أنتج فريقنا الفيديو الرئيسي والرسوم المتحركة.',
    ),
    features: [
      L('Fully editable headless CMS', 'نظام إدارة محتوى Headless قابل للتعديل بالكامل'),
      L('Product and brand catalogue', 'كتالوج للمنتجات والعلامات التجارية'),
      L('Commerce engine ready for online sales', 'محرك تجارة جاهز للبيع عبر الإنترنت'),
      L('Custom hero video and motion graphics', 'فيديو رئيسي ورسوم متحركة مخصصة'),
      L('Lightweight WebP images for speed', 'صور WebP خفيفة لسرعة أعلى'),
      L('Arabic version planned', 'نسخة عربية مخطط لها'),
    ],
    seo: {
      metaTitle: L('Mannai HEC Website | Web Development by M&M', 'موقع مناعي HEC | تطوير المواقع من M&M'),
      metaDescription: L(
        'How M&M built a fast Next.js website on a headless CMS for Mannai Heavy Equipment and Commercial Vehicles in Saudi Arabia.',
        'كيف بنت M&M موقع Next.js سريعاً على نظام إدارة محتوى Headless لمناعي للمعدات الثقيلة والمركبات التجارية في السعودية.',
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
      'DENZA is where the elegance of East and West come together, a blend of technology and poetry.\n\nFounded in 2010 as a joint venture between BYD and Mercedes-Benz, DENZA set out to redefine the driving experience through innovation, intelligence and refined design.\n\nIn 2024, DENZA became BYD’s fully owned premium brand, opening a new chapter in technology-led mobility.',
      'دينزا هي المكان الذي تلتقي فيه أناقة الشرق والغرب، مزيج من التكنولوجيا والشعر.\n\nتأسست DENZA في عام 2010 كمشروع مشترك بين BYD وMercedes-Benz، بهدف إعادة تعريف تجربة القيادة من خلال الابتكار والذكاء والتصميم الراقي.\n\nوفي عام 2024، أصبحت DENZA العلامة الفاخرة المملوكة بالكامل لشركة BYD، لتبدأ فصلاً جديداً في التنقل القائم على التكنولوجيا.',
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
