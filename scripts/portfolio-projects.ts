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

  // ── Denza Qatar (Z9 GT, B5 and B8 configurators; linked to its case study) ─
  {
    id: 'denza-qatar',
    slug: 'denza-qatar',
    order: 20,
    title: L('Denza Qatar', 'دينزا قطر'),
    clientName: L('Denza Qatar by Mannai', 'دينزا قطر من مناعي'),
    websiteUrl: 'https://www.denzaqatar.com',
    category: L('Automotive', 'السيارات'),
    projectType: L('Brand website with car configurators', 'موقع علامة تجارية مع أدوات تكوين السيارات'),
    technologies: ['Next.js', 'Headless CMS', 'Node.js', 'Three.js', 'Tailwind CSS'],
    summary: L(
      'The official DENZA website in Qatar, with interactive configurators for the B5, the B8 and the flagship Z9 GT.',
      'الموقع الرسمي لعلامة دينزا في قطر، مع أدوات تكوين تفاعلية لطرازات B5 وB8 والطراز الأبرز Z9 GT.',
    ),
    overview: L(
      'DENZA is BYD’s premium car brand, brought to Qatar by Mannai. They needed a website that feels as premium as the cars and turns interest into test drives. We designed and built a bilingual site in English and Arabic where visitors can explore every model, build their own car and book a test drive in a few clicks.',
      'دينزا هي العلامة الفاخرة لسيارات BYD، وقد قدّمتها مناعي إلى قطر. احتاجوا إلى موقع يليق بفخامة السيارات ويحوّل الاهتمام إلى حجوزات تجربة قيادة. صممنا وبنينا موقعاً ثنائي اللغة بالعربية والإنجليزية يستكشف فيه الزائر كل طراز، ويصمم سيارته بنفسه، ويحجز تجربة قيادة بنقرات قليلة.',
    ),
    solution: L(
      `A fast Next.js website on a headless CMS, with Node.js handling forms and leads.

The Z9 GT configurator is the centrepiece. Buyers choose the drive (fully electric or plug-in hybrid), the paintwork and the interior, explore the car in a self-hosted 360° 3D view, then download a branded bilingual PDF of their build or send it straight to the sales team.

The B5 and B8 pages have their own configurators with a 360° exterior view, a 720° interior view and wheel options. Every lead, from test drive requests to saved configurations, is stored in the CMS, emailed to the sales team and passed to the dealer’s Dynamics 365 CRM.`,
      `موقع Next.js سريع على نظام إدارة محتوى Headless، مع Node.js لمعالجة النماذج والطلبات.

أداة تكوين Z9 GT هي محور الموقع. يختار المشتري نوع الدفع (كهربائي بالكامل أو هجين قابل للشحن)، ولون الطلاء، والتصميم الداخلي، ثم يستكشف السيارة بعرض ثلاثي الأبعاد بزاوية 360°، وبعدها يحمّل ملف PDF ثنائي اللغة يحمل هوية العلامة لمواصفات سيارته، أو يرسله مباشرة إلى فريق المبيعات.

ولصفحتي B5 وB8 أدوات تكوين خاصة بهما، مع عرض خارجي بزاوية 360° وعرض داخلي بزاوية 720° وخيارات للعجلات. وكل طلب، من حجوزات تجربة القيادة إلى التكوينات المحفوظة، يُحفظ في نظام إدارة المحتوى ويُرسل إلى فريق المبيعات بالبريد ويصل إلى نظام Dynamics 365 لدى الوكيل.`,
    ),
    features: [
      L('Z9 GT configurator: drive, paintwork and interior', 'أداة تكوين Z9 GT: نوع الدفع والطلاء والتصميم الداخلي'),
      L('Self-hosted 360° 3D viewer', 'عارض ثلاثي الأبعاد بزاوية 360° مستضاف على الموقع'),
      L('Branded bilingual PDF of each build', 'ملف PDF ثنائي اللغة بهوية العلامة لكل تكوين'),
      L('B5 and B8 configurators: 360° exterior, 720° interior, wheels', 'أدوات تكوين B5 وB8: عرض خارجي 360° وداخلي 720° والعجلات'),
      L('Leads sent to the CMS, sales inbox and Dynamics 365 CRM', 'طلبات تصل إلى نظام المحتوى وبريد المبيعات ونظام Dynamics 365'),
      L('Full English and Arabic with right-to-left layouts', 'العربية والإنجليزية بالكامل مع تصميم من اليمين إلى اليسار'),
    ],
    clientLogoAssetId: 'image-04549a44857bc6af573ed0605b62c3d6de591329-259x194-jpg',
    relatedCaseStudySlug: 'designing-and-developing-denza-qatar-website',
    seo: {
      metaTitle: L('Denza Qatar Website and Z9 GT Configurator | M&M', 'موقع دينزا قطر وأداة تكوين Z9 GT | M&M'),
      metaDescription: L(
        'How M&M built the Denza Qatar website with configurators for the Z9 GT, B5 and B8, a 360° 3D viewer, PDF builds and CRM-connected leads.',
        'كيف بنت M&M موقع دينزا قطر مع أدوات تكوين Z9 GT وB5 وB8 وعارض 360° وملفات PDF وطلبات مرتبطة بنظام CRM.',
      ),
    },
    showOnWebDevPage: true,
  },

  // ── Yangwang Qatar (WordPress) ──────────────────────────────────────────────
  {
    id: 'yangwang-qatar',
    slug: 'yangwang-qatar',
    order: 25,
    title: L('Yangwang Qatar', 'يانغ وانغ قطر'),
    clientName: L('Yangwang Qatar by Mannai', 'يانغ وانغ قطر من مناعي'),
    websiteUrl: 'https://yangwangqatar.com',
    category: L('Automotive', 'السيارات'),
    projectType: L('Luxury car brand website', 'موقع علامة سيارات فاخرة'),
    technologies: ['WordPress', 'Bricks Builder', 'PHP'],
    summary: L(
      'The official YANGWANG website in Qatar, showcasing the U8 luxury SUV and the U9 Xtreme electric supercar.',
      'الموقع الرسمي لعلامة يانغ وانغ في قطر، يعرض سيارة U8 الرياضية الفاخرة وسيارة U9 Xtreme الكهربائية الخارقة.',
    ),
    overview: L(
      'YANGWANG is BYD’s ultra-luxury brand, brought to Qatar by Mannai. The cars are bold and the audience is demanding, so the website had to feel like a flagship showroom. We designed and built a bilingual site in English and Arabic where visitors can explore each model in detail and book a test drive or a service visit in a few clicks.',
      'يانغ وانغ هي العلامة الفاخرة جداً لسيارات BYD، وقد قدّمتها مناعي إلى قطر. السيارات جريئة والجمهور متطلّب، لذلك كان على الموقع أن يبدو كصالة عرض رئيسية. صممنا وبنينا موقعاً ثنائي اللغة بالعربية والإنجليزية يستكشف فيه الزائر كل طراز بالتفصيل، ويحجز تجربة قيادة أو موعد صيانة بنقرات قليلة.',
    ),
    solution: L(
      `For this launch WordPress was the right fit, so we built it on WordPress with a visual page builder. Mannai’s marketing team can update models, offers and news themselves without waiting on developers.

Each model gets a full story page. The U8 page opens with its headline numbers (880 kW, 1,280 Nm, 0 to 100 km/h in 3.6 seconds), then lets visitors switch paint colours and wheels, and moves through design, luxury and off-road power with cinematic video. The U9 Xtreme page tells the story of the fastest electric car on earth.

Around the models sit the pages that turn interest into business: test drive and service booking, ownership and warranty, extended protection plans, the showroom location and a media centre.`,
      `في هذا الإطلاق كان WordPress الخيار الأنسب، فبنينا الموقع عليه مع أداة تصميم صفحات مرئية، ليتمكن فريق التسويق في مناعي من تحديث الطرازات والعروض والأخبار بنفسه دون انتظار المطورين.

لكل طراز صفحة تروي قصته كاملة. تبدأ صفحة U8 بأرقامها الأبرز (880 كيلوواط، 1,280 نيوتن متر، ومن 0 إلى 100 كم/س في 3.6 ثانية)، ثم تتيح للزائر تبديل ألوان الطلاء والعجلات، وتنتقل بين التصميم والفخامة والقوة على الطرق الوعرة بمقاطع فيديو سينمائية. أما صفحة U9 Xtreme فتروي قصة أسرع سيارة كهربائية في العالم.

وحول الطرازات صفحات تحوّل الاهتمام إلى أعمال: حجز تجربة القيادة والصيانة، والملكية والضمان، وخطط الحماية الممتدة، وموقع صالة العرض، والمركز الإعلامي.`,
    ),
    features: [
      L('Model story pages for the U8 and U9 Xtreme', 'صفحات تروي قصة طرازي U8 وU9 Xtreme'),
      L('U8 colour and wheel selector', 'أداة اختيار اللون والعجلات لسيارة U8'),
      L('Animated performance figures and cinematic video', 'أرقام أداء متحركة ومقاطع فيديو سينمائية'),
      L('Test drive and service booking forms', 'نماذج حجز تجربة القيادة والصيانة'),
      L('Ownership, warranty and extended protection pages', 'صفحات الملكية والضمان والحماية الممتدة'),
      L('Full English and Arabic with right-to-left layouts', 'العربية والإنجليزية بالكامل مع تصميم من اليمين إلى اليسار'),
      L('Content the marketing team edits visually', 'محتوى يعدّله فريق التسويق بصرياً'),
    ],
    seo: {
      metaTitle: L('Yangwang Qatar Website on WordPress | M&M', 'موقع يانغ وانغ قطر على WordPress | M&M'),
      metaDescription: L(
        'How M&M built the Yangwang Qatar website on WordPress: U8 and U9 Xtreme model pages, colour selector, test drive booking and full Arabic.',
        'كيف بنت M&M موقع يانغ وانغ قطر على WordPress: صفحات طرازي U8 وU9 Xtreme، واختيار الألوان، وحجز تجربة القيادة، والعربية بالكامل.',
      ),
    },
    showOnWebDevPage: true,
  },

  // ── Mirage Property (WordPress) ─────────────────────────────────────────────
  {
    id: 'mirage-property',
    slug: 'mirage-property',
    order: 28,
    title: L('Mirage Property', 'ميراج للعقارات'),
    clientName: L('Mirage Property Qatar', 'ميراج للعقارات قطر'),
    websiteUrl: 'https://mirageproperty.com',
    category: L('Real Estate', 'العقارات'),
    projectType: L('Property portal with location search', 'بوابة عقارية مع البحث حسب الموقع'),
    technologies: ['WordPress', 'Houzez', 'Elementor', 'Google Maps API'],
    summary: L(
      'A property portal for homes and commercial spaces in Doha, Lusail and across Qatar, where tenants can search by what is nearby.',
      'بوابة عقارية للمنازل والمساحات التجارية في الدوحة ولوسيل وأنحاء قطر، يبحث فيها المستأجر حسب ما هو قريب منه.',
    ),
    overview: L(
      'Mirage Property rents, sells and manages apartments, villas, compounds and commercial spaces across Qatar. Tenants rarely search by listing alone. They want to know what is near the school, the metro or the office. We built a property portal that lets them search the way they actually think.',
      'تؤجر ميراج للعقارات وتبيع وتدير الشقق والفلل والمجمعات والمساحات التجارية في أنحاء قطر. ونادراً ما يبحث المستأجر عن العقار وحده، فهو يريد أن يعرف ما القريب من المدرسة أو المترو أو المكتب. لذلك بنينا بوابة عقارية تتيح له البحث بالطريقة التي يفكر بها فعلاً.',
    ),
    solution: L(
      `A WordPress property portal built on Houzez and Elementor, so the Mirage team can add listings, prices and photos themselves.

The standout feature is location search. Visitors can browse every listing on a map of Qatar, find properties near them, near schools or near metro stations, or pick a point such as their office and see what they can reach within a set travel time by bus, car or on foot.

Each listing has a full gallery, key specs, a virtual tour, a viewing request form and one-tap WhatsApp. Area pages for Lusail, The Pearl, West Bay, Al Waab, Al Wakrah and more help people explore by neighbourhood.`,
      `بوابة عقارية على WordPress مبنية بـ Houzez وElementor، ليضيف فريق ميراج العقارات والأسعار والصور بنفسه.

أبرز ما فيها هو البحث حسب الموقع. يستطيع الزائر تصفح كل العقارات على خريطة قطر، أو العثور على العقارات القريبة منه أو من المدارس أو من محطات المترو، أو اختيار نقطة مثل مكتبه ليرى ما يمكنه الوصول إليه خلال وقت تنقل محدد بالحافلة أو السيارة أو سيراً على الأقدام.

ولكل عقار معرض صور كامل ومواصفات أساسية وجولة افتراضية ونموذج لطلب المعاينة وزر واتساب بلمسة واحدة. كما تساعد صفحات المناطق مثل لوسيل واللؤلؤة والخليج الغربي والوعب والوكرة الزوار على الاستكشاف حسب الحي.`,
    ),
    features: [
      L('Map search across Qatar', 'البحث على خريطة قطر'),
      L('Find properties near me, near schools or near metro stations', 'عقارات قريبة مني أو من المدارس أو من محطات المترو'),
      L('Travel-time search by bus, car or walking', 'البحث حسب وقت التنقل بالحافلة أو السيارة أو سيراً'),
      L('Listing pages with gallery, virtual tour and viewing requests', 'صفحات عقارات مع معرض صور وجولة افتراضية وطلب معاينة'),
      L('Area pages for Lusail, The Pearl, West Bay and more', 'صفحات مناطق للوسيل واللؤلؤة والخليج الغربي وغيرها'),
      L('One-tap WhatsApp on every listing', 'واتساب بلمسة واحدة في كل عقار'),
      L('Listings managed by the Mirage team', 'عقارات يديرها فريق ميراج بنفسه'),
    ],
    seo: {
      metaTitle: L('Mirage Property Portal with Location Search | M&M', 'بوابة ميراج العقارية مع البحث حسب الموقع | M&M'),
      metaDescription: L(
        'How M&M built the Mirage Property portal in Qatar: map search, properties near schools and metro stations, travel-time search and listings the team manages.',
        'كيف بنت M&M بوابة ميراج العقارية في قطر: البحث على الخريطة، وعقارات قرب المدارس ومحطات المترو، والبحث حسب وقت التنقل، وعقارات يديرها الفريق بنفسه.',
      ),
    },
    showOnWebDevPage: true,
  },

  // ── CUQ Ulster University (WordPress) ───────────────────────────────────────
  {
    id: 'cuq-ulster',
    slug: 'cuq-ulster',
    order: 29,
    title: L('CUQ Ulster University', 'جامعة CUQ أولستر'),
    clientName: L('City University Qatar, in partnership with Ulster University', 'جامعة المدينة قطر بالشراكة مع جامعة أولستر'),
    websiteUrl: 'https://cuq-ulster.edu.qa',
    category: L('Education', 'التعليم'),
    projectType: L('University website', 'موقع جامعي'),
    technologies: ['WordPress', 'BeTheme', 'TranslatePress'],
    summary: L(
      'The bilingual website of City University Qatar, which offers UK degrees from Ulster University on its campus in Lusail.',
      'الموقع ثنائي اللغة لجامعة المدينة قطر، التي تقدّم شهادات بريطانية من جامعة أولستر في حرمها الجامعي بلوسيل.',
    ),
    overview: L(
      'City University Qatar offers UK undergraduate and postgraduate degrees from Ulster University, as well as foundation programmes and IELTS testing. Its website has to speak to students, parents and partners at once, in English and Arabic, and turn interest into applications and campus visits.',
      'تقدّم جامعة المدينة قطر شهادات البكالوريوس والدراسات العليا البريطانية من جامعة أولستر، إلى جانب البرامج التأسيسية واختبارات IELTS. وعلى موقعها أن يخاطب الطلاب وأولياء الأمور والشركاء معاً، بالعربية والإنجليزية، وأن يحوّل الاهتمام إلى طلبات التحاق وزيارات للحرم الجامعي.',
    ),
    solution: L(
      `A bilingual WordPress website the university team updates themselves, from programmes and admissions to news and events.

The homepage leads straight to the four things prospective students want most: the degree programmes, booking an appointment with the admissions team, applying online, and a 360° virtual tour of the campus, labs, classrooms and sports facilities.

Behind that sit the full programme pages, admissions and fees, a dedicated IELTS testing centre page for paper and computer based exams, student life, alumni and careers, plus a newsroom that keeps the site fresh.`,
      `موقع ثنائي اللغة على WordPress يحدّثه فريق الجامعة بنفسه، من البرامج والقبول إلى الأخبار والفعاليات.

تقود الصفحة الرئيسية مباشرة إلى أهم أربعة أشياء يبحث عنها الطالب: البرامج الأكاديمية، وحجز موعد مع فريق القبول، والتقديم عبر الإنترنت، وجولة افتراضية بزاوية 360° في الحرم الجامعي والمختبرات والقاعات والمرافق الرياضية.

وخلفها صفحات البرامج كاملة، والقبول والرسوم، وصفحة مخصصة لمركز اختبارات IELTS الورقية والحاسوبية، والحياة الطلابية، والخريجين، والوظائف، إضافة إلى غرفة أخبار تُبقي الموقع متجدداً.`,
    ),
    features: [
      L('English and Arabic versions', 'نسختان بالعربية والإنجليزية'),
      L('Online applications and admissions appointments', 'التقديم عبر الإنترنت وحجز مواعيد القبول'),
      L('360° virtual campus tour', 'جولة افتراضية بزاوية 360° في الحرم الجامعي'),
      L('Programme pages for foundation, undergraduate and postgraduate study', 'صفحات البرامج التأسيسية والبكالوريوس والدراسات العليا'),
      L('IELTS testing centre page', 'صفحة مركز اختبارات IELTS'),
      L('Newsroom, student life, alumni and careers', 'غرفة أخبار والحياة الطلابية والخريجون والوظائف'),
      L('Content managed by the university team', 'محتوى يديره فريق الجامعة بنفسه'),
    ],
    seo: {
      metaTitle: L('CUQ Ulster University Website | Web Development by M&M', 'موقع جامعة CUQ أولستر | تطوير المواقع من M&M'),
      metaDescription: L(
        'How M&M built the bilingual website for City University Qatar and Ulster University: programmes, online applications, a 360° campus tour and IELTS testing.',
        'كيف بنت M&M الموقع ثنائي اللغة لجامعة المدينة قطر وجامعة أولستر: البرامج والتقديم عبر الإنترنت وجولة 360° في الحرم واختبارات IELTS.',
      ),
    },
    showOnWebDevPage: true,
  },

  // ── ICC Qatar (Laravel) ─────────────────────────────────────────────────────
  {
    id: 'icc-qatar',
    slug: 'icc-qatar',
    order: 30,
    title: L('ICC Qatar', 'غرفة التجارة الدولية قطر'),
    clientName: L('International Chamber of Commerce Qatar', 'غرفة التجارة الدولية قطر'),
    websiteUrl: 'https://iccqatar.org',
    category: L('Semi Government', 'شبه حكومية'),
    projectType: L('Institutional website', 'موقع مؤسسي'),
    technologies: ['Laravel', 'PHP'],
    summary: L(
      'The website of ICC Qatar, the national committee of the International Chamber of Commerce, built on Laravel.',
      'موقع غرفة التجارة الدولية قطر، اللجنة الوطنية لغرفة التجارة الدولية، مبني على Laravel.',
    ),
    overview: L(
      'ICC Qatar represents Qatari businesses within the International Chamber of Commerce, the world business organisation with members in more than 170 countries. They needed one clear place to share news, publications, training, certifications and events, and to make joining ICC simple.',
      'تمثّل غرفة التجارة الدولية قطر الشركات القطرية داخل غرفة التجارة الدولية، منظمة الأعمال العالمية التي تضم أعضاء في أكثر من 170 دولة. احتاجوا إلى مكان واحد وواضح لنشر الأخبار والمنشورات والتدريب والشهادات والفعاليات، وتسهيل الانضمام إلى الغرفة.',
    ),
    solution: L(
      'A custom Laravel website with content the ICC Qatar team keeps up to date themselves. It brings together the newsroom, resources for business (publications, training, certifications and events), the World Chambers Federation, ICC dispute resolution and SME services, membership sign-up and a contact form, so every visitor finds what they need quickly.',
      'موقع مخصص مبني على Laravel يحدّث فريق الغرفة محتواه بنفسه. يجمع غرفة الأخبار، وموارد الأعمال (المنشورات والتدريب والشهادات والفعاليات)، واتحاد الغرف العالمي، وخدمات تسوية النزاعات ودعم الشركات الصغيرة والمتوسطة، والتسجيل في العضوية، ونموذج التواصل، ليجد كل زائر ما يحتاجه بسرعة.',
    ),
    features: [
      L('Newsroom with categories', 'غرفة أخبار مصنّفة'),
      L('Resources hub: publications, training, certifications and events', 'مركز موارد: منشورات وتدريب وشهادات وفعاليات'),
      L('Dispute resolution and SME service highlights', 'إبراز خدمات تسوية النزاعات ودعم الشركات الصغيرة والمتوسطة'),
      L('Membership sign-up', 'التسجيل في العضوية'),
      L('Email alerts sign-up', 'الاشتراك في التنبيهات البريدية'),
      L('Contact form with location map', 'نموذج تواصل مع خريطة الموقع'),
    ],
    clientLogoAssetId: 'image-618602357a73b3b175b39ded9e2241cc510271bf-1218x918-webp',
    seo: {
      metaTitle: L('ICC Qatar Website on Laravel | Web Development by M&M', 'موقع غرفة التجارة الدولية قطر | تطوير المواقع من M&M'),
      metaDescription: L(
        'How M&M built the ICC Qatar website on Laravel: newsroom, publications, training, certifications, events and membership in one place.',
        'كيف بنت M&M موقع غرفة التجارة الدولية قطر على Laravel: الأخبار والمنشورات والتدريب والشهادات والفعاليات والعضوية في مكان واحد.',
      ),
    },
    showOnWebDevPage: true,
  },
]
