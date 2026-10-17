/**
 * Create the Videography service doc (slug: "videography") with full
 * landing-page-style content + 8 pre-seeded projects from Abdou Belal's
 * Behance portfolio (https://www.behance.net/abdoubelal1).
 *
 * Projects are seeded with title / category / description only — upload
 * the corresponding stills in Sanity Studio (Service → Videography →
 * Projects → projectImage) once you've grabbed them from Behance, or
 * replace with the final cuts. Same for clientLogo where applicable.
 *
 * Idempotent: uses createIfNotExists; safe to re-run.
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-videography-service.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

const DOC_ID = 'service-videography'

// Projects pulled from Abdou Belal's Behance portfolio. Upload the actual
// project stills/cuts in Sanity Studio after seeding.
const projects = [
  {
    _key: 'project-al-hattab',
    title: L('Al Hattab Trading — Event Opening Experience', 'افتتاح فعالية الحطاب للتجارة'),
    clientName: L('Al Hattab Trading', 'الحطاب للتجارة'),
    category: L('Event Film', 'فيلم فعاليات'),
    description: L(
      'Cinematic event-opener filmed and edited to anchor the brand reveal at Al Hattab Trading.',
      'فيلم افتتاح سينمائي تم تصويره ومونتاجه لترسيخ الكشف عن العلامة التجارية في فعالية الحطاب للتجارة.',
    ),
  },
  {
    _key: 'project-jazeera-paints',
    title: L('Jazeera Paints — Brand Event Opener', 'افتتاحية فعالية علامة جزيرة للدهانات'),
    clientName: L('Jazeera Paints', 'جزيرة للدهانات'),
    category: L('Brand Film', 'فيلم العلامة التجارية'),
    description: L(
      'High-energy opener directed and cut for the Jazeera Paints brand event in Qatar.',
      'افتتاحية عالية الطاقة بإخراج ومونتاج لفعالية علامة جزيرة للدهانات في قطر.',
    ),
  },
  {
    _key: 'project-bringing-product-to-life',
    title: L('Bringing a Product to Life — Video Campaign', 'منح المنتج الحياة — حملة فيديو'),
    clientName: L('M&M Marketing client', 'عميل M&M Marketing'),
    category: L('Product Campaign', 'حملة منتج'),
    description: L(
      'Multi-shot product campaign film engineered to drive consideration and conversion.',
      'فيلم حملة منتج بمتعدد اللقطات مصمم لزيادة الاهتمام والتحويل.',
    ),
  },
  {
    _key: 'project-product-promotion-series',
    title: L('Product Promotion Video Series', 'سلسلة فيديوهات ترويج المنتجات'),
    clientName: L('M&M Marketing client', 'عميل M&M Marketing'),
    category: L('Series / Social', 'سلسلة / سوشيال'),
    description: L(
      'Recurring product-promo series cut for performance on Instagram, TikTok, and YouTube Shorts.',
      'سلسلة ترويج منتجات مكررة مونتاجها مصمم للأداء على Instagram و TikTok و YouTube Shorts.',
    ),
  },
  {
    _key: 'project-kids-park',
    title: L('Kids Park — Brand Promotion Video', 'فيديو ترويج علامة Kids Park'),
    clientName: L('Kids Park', 'Kids Park'),
    category: L('Brand Promo', 'ترويج علامة'),
    description: L(
      'Joyful brand promo capturing the energy and emotion of the Kids Park experience.',
      'ترويج علامة تجارية مفعم بالحيوية يلتقط طاقة وعاطفة تجربة Kids Park.',
    ),
  },
  {
    _key: 'project-marble-factory',
    title: L('Marble Factory — Industrial Presentation', 'مصنع الرخام — عرض صناعي'),
    clientName: L('Industrial client', 'عميل صناعي'),
    category: L('Industrial Film', 'فيلم صناعي'),
    description: L(
      'Documentary-style factory walkthrough showcasing process, craftsmanship, and scale.',
      'جولة وثائقية في المصنع تستعرض العملية والحرفية وحجم العمل.',
    ),
  },
  {
    _key: 'project-preparing-matcha',
    title: L('Preparing Matcha — Food & Beverage Film', 'تحضير الماتشا — فيلم الأطعمة والمشروبات'),
    clientName: L('F&B client', 'عميل أطعمة ومشروبات'),
    category: L('Food & Beverage', 'الأطعمة والمشروبات'),
    description: L(
      'Slow-mo, macro-shot F&B film that turns a simple ritual into a craveable product moment.',
      'فيلم أطعمة ومشروبات بالحركة البطيئة واللقطات الماكرو يحول الطقس البسيط إلى لحظة منتج جذابة.',
    ),
  },
  {
    _key: 'project-student-interview',
    title: L('Student Interview — Education Film', 'مقابلة طلابية — فيلم تعليمي'),
    clientName: L('Education client', 'عميل تعليمي'),
    category: L('Interview / Education', 'مقابلة / تعليم'),
    description: L(
      'Long-form interview piece cut for authentic, conversion-focused education marketing.',
      'مقطع مقابلة طويل مونتاجه يركز على المصداقية والتحويل في تسويق التعليم.',
    ),
  },
]

const content = {
  _id: DOC_ID,
  _type: 'service',
  title: L('Videography', 'الفيديو والإنتاج'),
  slug: {_type: 'slug', current: 'videography'},
  description: L(
    'Cinematic brand films, product campaigns, event coverage, and social-first video — directed and edited in-house in Qatar by Abdou Belal.',
    'أفلام علامة تجارية سينمائية وحملات منتجات وتغطية فعاليات وفيديوهات للسوشيال — بإخراج ومونتاج داخلي في قطر بقيادة عبدو بلال.',
  ),
  content: L(
    "Video is the highest-converting media format on every paid platform in 2026 — but only when it's directed, shot, and edited with intent. Our in-house video team handles everything end-to-end: pre-production planning, on-location shoot, lighting and audio, edit, colour grade, motion graphics, and platform-native delivery. Whether you need a 60-second product cut, a 6-minute brand film, an event opener, or a social series, we build the entire production around your business objective and the platform it'll live on.",
    'الفيديو هو أعلى أشكال الوسائط تحويلاً على كل منصة مدفوعة في 2026 — ولكن فقط عندما يتم إخراجه وتصويره ومونتاجه بنية واضحة. يدير فريق الفيديو الداخلي لدينا كل شيء من البداية إلى النهاية: تخطيط ما قبل الإنتاج، التصوير في الموقع، الإضاءة والصوت، المونتاج، تصحيح الألوان، الجرافيكس المتحركة، والتسليم المخصص لكل منصة. سواء كنت تحتاج إلى فيديو منتج 60 ثانية أو فيلم علامة تجارية 6 دقائق أو افتتاحية فعالية أو سلسلة سوشيال، نبني الإنتاج بأكمله حول هدفك التجاري والمنصة التي سيعيش عليها.',
  ),
  whyItMatters: L(
    "Static creative is hitting diminishing returns across Meta, TikTok, and YouTube in 2026. Algorithms are pushing video — and audiences only stop scrolling for video that feels intentional. Cheap, generic stock-style cuts get scrolled past in 0.5 seconds. Brand films with direction, lighting, and editing rhythm hold attention long enough to actually sell. The agencies still relying on canva-style motion graphics are quietly losing share to brands that invest in real production.",
    'الإبداع الثابت يصل إلى عوائد متناقصة عبر Meta و TikTok و YouTube في 2026. الخوارزميات تدفع الفيديو — والجماهير لا تتوقف عن التمرير إلا للفيديو الذي يبدو مقصوداً. اللقطات العامة الرخيصة بأسلوب المخزون يتم تمريرها في نصف ثانية. أفلام العلامات التجارية بإخراج وإضاءة وإيقاع مونتاج تحافظ على الانتباه لفترة كافية للبيع فعلاً. الوكالات التي لا تزال تعتمد على الجرافيكس بأسلوب canva تخسر بهدوء حصتها لصالح العلامات التجارية التي تستثمر في إنتاج حقيقي.',
  ),
  deliverables: [
    L('Pre-production: concept, script, storyboard', 'ما قبل الإنتاج: المفهوم، السيناريو، اللوحة القصصية'),
    L('On-location shoot in Qatar (camera, lighting, audio)', 'التصوير في الموقع في قطر (كاميرا، إضاءة، صوت)'),
    L('Studio + product shoots', 'تصوير الاستوديو والمنتجات'),
    L('Event coverage & brand-event openers', 'تغطية الفعاليات وافتتاحيات فعاليات العلامة التجارية'),
    L('Edit, colour grade, sound design', 'المونتاج، تصحيح الألوان، التصميم الصوتي'),
    L('Motion graphics & lower-thirds', 'الجرافيكس المتحركة والشاشات السفلية'),
    L('Platform-native delivery (16:9, 9:16, 1:1)', 'تسليم مخصص لكل منصة (16:9 و 9:16 و 1:1)'),
    L('Subtitles in English + Arabic', 'الترجمة بالإنجليزية والعربية'),
  ],
  projects,
  heroEyebrow: L('M&M Service', 'خدمة من M&M'),
  heroCtaButtonText: L('Plan Your Video Project', 'خطط لمشروع الفيديو الخاص بك'),
  heroCtaButtonLink: '/get-strategy',
  whatWeBuildEyebrow: L('What We Build', 'ما الذي نبنيه'),
  whatWeBuildTitle: L(
    'Brand films and campaigns engineered to convert — not just to look pretty.',
    'أفلام وحملات علامة تجارية مهندسة للتحويل — وليس فقط للمظهر الجميل.',
  ),
  whyItMattersEyebrow: L('Why It Matters', 'لماذا هذا مهم'),
  whyItMattersTitle: L(
    'Video is the only format with rising ROI across every paid platform.',
    'الفيديو هو الشكل الوحيد الذي يحقق عائداً متزايداً عبر كل منصة مدفوعة.',
  ),
  deliverablesEyebrow: L("What's Included", 'ما ستحصل عليه'),
  deliverablesTitle: L(
    'A full in-house production stack — concept to delivery in Qatar.',
    'حزمة إنتاج داخلية كاملة — من الفكرة إلى التسليم في قطر.',
  ),
  projectsEyebrow: L('Selected Work', 'أعمال مختارة'),
  projectsTitle: L(
    "Recent video work directed by our team in Qatar.",
    'أعمال فيديو حديثة بإخراج فريقنا في قطر.',
  ),

  // ─── Video samples (reel) ───
  videoSamplesEyebrow: L('Watch the Reel', 'شاهد الريل'),
  videoSamplesTitle: L(
    'Selected video work from our team in Qatar.',
    'أعمال فيديو مختارة من فريقنا في قطر.',
  ),
  videoSamplesSubtitle: L(
    'Brand films, product cuts, event openers, and social-first edits. Click any thumbnail to play.',
    'أفلام علامة تجارية، مقاطع منتجات، افتتاحيات فعاليات، ومونتاج موجه للسوشيال. اضغط على أي صورة مصغّرة للتشغيل.',
  ),
  videoSamples: [
    {
      _key: 'sample-1',
      title: L('Brand Film — Replace in Studio', 'فيلم علامة تجارية — استبدل في الاستوديو'),
      description: L(
        'Placeholder. Edit in Studio → Service → Videography → Video Samples.',
        'عنصر نائب. عدّل في Studio → Service → Videography → Video Samples.',
      ),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      aspectRatio: '16-9',
    },
    {
      _key: 'sample-2',
      title: L('Reels / Shorts — Replace in Studio', 'ريلز / شورتس — استبدل في الاستوديو'),
      description: L(
        'Vertical 9:16 cut. Edit in Studio.',
        'مقطع عمودي 9:16. عدّل في Studio.',
      ),
      videoUrl: 'https://www.youtube.com/shorts/aqz-KE-bpKQ',
      aspectRatio: '9-16',
    },
    {
      _key: 'sample-3',
      title: L('Event Opener — Replace in Studio', 'افتتاحية فعالية — استبدل في الاستوديو'),
      description: L(
        'Landscape event film. Edit in Studio.',
        'فيلم فعالية أفقي. عدّل في Studio.',
      ),
      videoUrl: 'https://vimeo.com/76979871',
      aspectRatio: '16-9',
    },
  ],
  faqsEyebrow: L('FAQs', 'الأسئلة الشائعة'),
  faqsTitle: L('Frequently Asked Questions', 'أسئلة يطرحها العملاء'),
  formEyebrow: L("Let's Talk", 'تحدث إلى الخبراء'),
  formTitle: L('Plan Your Video Project', 'خطط لمشروع الفيديو الخاص بك'),
  formSubtitle: L(
    "Tell us about your project — script, shoot, edit, full campaign? We'll come back within 24 hours with a scoped plan and timeline.",
    'أخبرنا عن مشروعك — سيناريو، تصوير، مونتاج، حملة كاملة؟ نرد خلال 24 ساعة بخطة محددة النطاق وجدول زمني.',
  ),
  formSubmitText: L('Get Started', 'أرسل'),
  ctaTitle: L('Ready to shoot something that actually performs?', 'جاهز لتصوير شيء يحقق نتائج فعلية؟'),
  ctaText: L(
    "Let's plan a video project that earns attention, holds it, and turns it into measurable business growth.",
    'لنخطط لمشروع فيديو يكسب الانتباه ويحافظ عليه ويحوله إلى نمو تجاري قابل للقياس.',
  ),
  finalCtaButtonText: L('Get Your Quote', 'احصل على عرض السعر'),
  finalCtaButtonLink: '/get-strategy',
  seo: {
    _type: 'seo',
    metaTitle: L(
      'Videography & Brand Film Production in Qatar | M&M Marketing',
      'خدمات الفيديو والإنتاج السينمائي في قطر | M&M Marketing',
    ),
    metaDescription: L(
      'Cinematic brand films, product campaigns, event coverage and social-first video — directed, shot and edited in Qatar by M&M Marketing.',
      'أفلام علامة تجارية سينمائية وحملات منتجات وتغطية فعاليات وفيديوهات سوشيال — بإخراج وتصوير ومونتاج في قطر بواسطة M&M Marketing.',
    ),
    focusKeyword: L('videography Qatar', 'فيديو وإنتاج قطر'),
    canonicalUrl: 'https://mnmagency.com/services/videography',
  },
}

async function main() {
  console.log('Seeding videography service…')
  await client.createIfNotExists(content as any)
  console.log(`Done. /services/videography is live ✓`)
  console.log('\nNext step: upload project stills in Sanity Studio')
  console.log('  Studio → Service → Videography → Projects → projectImage')
  console.log('\nReference: https://www.behance.net/abdoubelal1')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
