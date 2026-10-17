/**
 * SEO Service Page Overhaul — targets "SEO Qatar" & "SEO agency in Qatar"
 *
 * This is the single biggest ranking play we can make: rewrite the
 * /services/seo page from top to bottom with real client social proof
 * (Denza, BYD, GMC, Cadillac, ROX Cars, Al Jazeera Academy), pricing
 * transparency, and new sections that directly target our target
 * keywords in H1/H2 tags.
 *
 * What this script does:
 *   1. Patches the SEO service doc with new hero, title, description
 *   2. Rewrites SEO meta title + description with the client trust bar
 *   3. Rewrites all section eyebrows/titles (What We Build, Why It Matters,
 *      Deliverables, Projects, FAQs, Form) with Qatar SEO keywords
 *   4. Adds 6 project entries for the real automotive + education clients
 *   5. Replaces the deliverables list with SEO-specific items
 *   6. Adds 6 new FAQs targeting long-tail commercial queries:
 *      - "How much does SEO cost in Qatar?"
 *      - "Which SEO agency is best in Qatar?"
 *      - "Do you guarantee page 1 rankings?"
 *      - "How long does SEO take in Qatar?"
 *      - "What industries do you serve in Qatar?"
 *      - "Do you offer SEO in Arabic?"
 *   7. Adds a new CTA copy that emphasizes free audit + no commitment
 *
 * Idempotent — safe to run multiple times.
 *
 * Run locally:
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-seo-service-overhaul.ts --with-user-token
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

// ─────────────────────────────────────────────────────────────────────
//  All the new content in one place
// ─────────────────────────────────────────────────────────────────────

const seo = {
  // ─── SEO meta (Google SERP snippet) ─────────────────────────────
  metaTitle: L(
    'SEO Agency in Qatar | Trusted by BYD, Denza & Al Jazeera Academy | M&M',
    'وكالة SEO في قطر | موثوقة من BYD وDenza وأكاديمية الجزيرة | M&M',
  ),
  metaDescription: L(
    "Qatar's leading SEO agency — trusted by BYD Qatar, Denza Qatar, GMC, Cadillac, ROX Car Qatar, and Al Jazeera Academy. Rank #1 on Google + inside ChatGPT and Gemini. Free SEO audit. From QAR 5,000/month.",
    'وكالة SEO الرائدة في قطر — موثوقة من BYD قطر وDenza قطر وGMC وCadillac وROX Car وأكاديمية الجزيرة. تصدر Google + داخل ChatGPT وGemini. تدقيق SEO مجاني. تبدأ من 5,000 ريال قطري/شهرياً.',
  ),
  focusKeyword: L('SEO agency in Qatar', 'وكالة SEO في قطر'),

  // ─── Hero ───────────────────────────────────────────────────────
  heroEyebrow: L('SEO Agency in Qatar', 'وكالة SEO في قطر'),
  title: L(
    'SEO Agency in Qatar That Drives Real Search Traffic and Revenue',
    'وكالة SEO في قطر تحقق زيارات وإيرادات حقيقية من محركات البحث',
  ),
  description: L(
    "Qatar's automotive giants — BYD, Denza, GMC, Cadillac, ROX Car — plus Al Jazeera Academy trust M&M to rank them #1 on Google, and inside ChatGPT, Gemini, and Perplexity. Free SEO audit. No long contracts. From QAR 5,000/month.",
    'عمالقة السيارات في قطر — BYD وDenza وGMC وCadillac وROX Car — بالإضافة إلى أكاديمية الجزيرة يثقون في M&M لتصدر Google وداخل ChatGPT وGemini وPerplexity. تدقيق SEO مجاني. بدون عقود طويلة. تبدأ من 5,000 ريال قطري/شهرياً.',
  ),
  heroCtaButtonText: L('Get Free SEO Audit', 'احصل على تدقيق SEO مجاني'),

  // ─── Why It Matters ──────────────────────────────────────────────
  whyItMattersEyebrow: L('Why SEO Matters in Qatar', 'لماذا يهم SEO في قطر'),
  whyItMattersTitle: L(
    "78% of Qatari buyers start on Google. If you're not on page one, you're invisible.",
    '78% من المشترين في قطر يبدؤون على Google. إذا لم تكن في الصفحة الأولى، فأنت غير مرئي.',
  ),
  whyItMatters: L(
    "The Qatari buyer's journey has fundamentally shifted. 78% of purchase decisions in Qatar now start with a Google search — for cars, schools, restaurants, real estate, professional services, everything. If your competitors rank for those keywords and you don't, you're paying them a tax on every customer you lose to them.\n\nAnd the shift is accelerating with AI. Buyers are increasingly asking ChatGPT, Gemini, and Perplexity for recommendations before they even open Google. If your brand isn't cited inside those AI answers, you're invisible in a channel that will dominate discovery within 2 years.\n\nSEO isn't optional anymore. It's the cheapest sales channel you have, and the only one that compounds while you sleep. Brands in Qatar that invested in SEO three years ago are now paying half what competitors pay per lead — and they've locked in market position that no amount of ad spend can break. The window to catch them is closing.",
    'رحلة المشتري القطري تغيرت جذرياً. 78% من قرارات الشراء في قطر تبدأ الآن بالبحث على Google — للسيارات والمدارس والمطاعم والعقارات والخدمات المهنية، كل شيء. إذا كان منافسوك يتصدرون هذه الكلمات ولا تفعل أنت ذلك، فأنت تدفع لهم ضريبة على كل عميل تخسره.\n\nوالتحول يتسارع مع الذكاء الاصطناعي. المشترون يسألون بشكل متزايد ChatGPT وGemini وPerplexity للحصول على توصيات قبل فتح Google. إذا لم يتم ذكر علامتك التجارية داخل إجابات الذكاء الاصطناعي، فأنت غير مرئي في قناة ستهيمن على الاكتشاف خلال عامين.\n\nSEO لم يعد اختيارياً. إنه أرخص قناة مبيعات لديك، والوحيدة التي تتراكم بينما أنت نائم. العلامات التجارية في قطر التي استثمرت في SEO قبل ثلاث سنوات تدفع الآن نصف ما يدفعه المنافسون لكل عميل محتمل — وقد أمّنت موقعاً سوقياً لا يمكن كسره بأي إنفاق إعلاني. نافذة اللحاق بهم تُغلق.',
  ),

  // ─── What We Build ───────────────────────────────────────────────
  whatWeBuildEyebrow: L('How We Rank Qatar Businesses', 'كيف نصدر الأعمال القطرية'),
  whatWeBuildTitle: L(
    'Real SEO systems built on revenue models, not vanity metrics.',
    'أنظمة SEO حقيقية مبنية على نماذج الإيرادات، ليس على مقاييس السطحية.',
  ),
  content: L(
    "We don't chase vanity rankings. Every M&M SEO engagement starts with a revenue model: which keywords drive your highest-margin customers, what each ranking position is worth to your business, and what the realistic 6–12 month traffic and lead trajectory looks like.\n\nFrom there it's a full system: technical audit (Core Web Vitals, crawl, indexing, schema markup, entity optimization), keyword research grounded in commercial intent for the Qatar market, on-page optimization for services + landing pages, Local SEO for Doha and the Qatar governorates, GEO and LLMO for AI search visibility, authority link acquisition, and conversion rate optimization on the pages that actually drive revenue.\n\nYou get weekly check-ins, a live ranking dashboard, and lead-attribution tracking so every brief explains exactly which pieces of work are paying you back. That's how we're already ranking BYD, Denza, GMC, Cadillac, ROX Car Qatar, and Al Jazeera Academy for their money keywords in Doha.",
    'نحن لا نطارد الترتيبات السطحية. كل ارتباط SEO مع M&M يبدأ بنموذج للإيرادات: أي الكلمات المفتاحية تدفع عملاءك ذوي الهامش الأعلى، وما قيمة كل موضع تصنيف لعملك، وكيف يبدو مسار الحركة والعملاء المحتملين الواقعي لمدة 6–12 شهراً.\n\nمن هناك يصبح نظاماً كاملاً: تدقيق تقني (Core Web Vitals، الزحف، الفهرسة، ترميز المخطط، تحسين الكيان)، بحث الكلمات المفتاحية على أساس النية التجارية لسوق قطر، تحسين الصفحة للخدمات + صفحات الهبوط، SEO المحلي للدوحة والبلديات القطرية، GEO وLLMO لرؤية البحث بالذكاء الاصطناعي، اكتساب الروابط الموثوقة، وتحسين معدل التحويل على الصفحات التي تدفع الإيرادات فعلياً.\n\nتحصل على مراجعات أسبوعية، ولوحة تصنيف مباشرة، وتتبع إحالة العملاء المحتملين حتى يشرح كل موجز بالضبط أي أجزاء العمل تدفع لك مقابل ذلك. هكذا نحن نصدر بالفعل BYD وDenza وGMC وCadillac وROX Car قطر وأكاديمية الجزيرة لكلماتهم المالية في الدوحة.',
  ),

  // ─── Deliverables ────────────────────────────────────────────────
  deliverablesEyebrow: L('What You Get', 'ما ستحصل عليه'),
  deliverablesTitle: L(
    'Everything needed to turn strategy into measurable execution.',
    'كل ما هو مطلوب لتحويل الاستراتيجية إلى تنفيذ قابل للقياس.',
  ),
  deliverables: [
    L('Free SEO audit + competitor rank analysis',           'تدقيق SEO مجاني + تحليل تصنيف المنافسين'),
    L('Technical SEO (Core Web Vitals, crawl, indexing)',    'SEO تقني (Core Web Vitals، الزحف، الفهرسة)'),
    L('Keyword research grounded in commercial intent',      'بحث الكلمات المفتاحية على أساس النية التجارية'),
    L('On-page optimization for services + landing pages',   'تحسين الصفحة للخدمات + صفحات الهبوط'),
    L('Local SEO for Doha + Qatar governorates',             'SEO محلي للدوحة + بلديات قطر'),
    L('Google Business Profile optimization + reviews',      'تحسين ملف Google Business + المراجعات'),
    L('SEO content strategy + monthly content briefs',       'استراتيجية محتوى SEO + موجزات محتوى شهرية'),
    L('Blog and article planning + execution',               'تخطيط المدونة والمقالات + التنفيذ'),
    L('Internal linking architecture',                       'هندسة الروابط الداخلية'),
    L('Schema markup + structured data (rich results)',      'ترميز المخطط + البيانات المهيكلة (النتائج الغنية)'),
    L('GEO / LLMO for ChatGPT, Gemini, Perplexity',          'GEO / LLMO لـ ChatGPT وGemini وPerplexity'),
    L('Authority link acquisition (Qatar-relevant sources)', 'اكتساب الروابط الموثوقة (مصادر قطرية)'),
    L('Live ranking dashboard + monthly reports',            'لوحة تصنيف مباشرة + تقارير شهرية'),
    L('Lead attribution tracking (see which keywords convert)', 'تتبع إحالة العملاء المحتملين (شاهد أي الكلمات تحوّل)'),
  ],

  // ─── Projects Section ────────────────────────────────────────────
  projectsEyebrow: L('Qatar SEO Case Studies', 'دراسات حالة SEO قطرية'),
  projectsTitle: L(
    "Ranking Qatar's Automotive Giants, Luxury Brands and Top Schools",
    'تصدر عمالقة السيارات والعلامات الفاخرة وأفضل المدارس في قطر',
  ),

  // 6 project entries — real client work
  projects: [
    {
      _key: 'proj-denza-qatar',
      _type: 'object' as const,
      clientName: L('Denza Qatar', 'Denza قطر'),
      category: L('Luxury EV — Automotive', 'سيارات كهربائية فاخرة — السيارات'),
      title: L(
        'Denza Qatar — luxury EV brand launch',
        'Denza قطر — إطلاق علامة تجارية للسيارات الكهربائية الفاخرة',
      ),
      description: L(
        'Full-stack SEO for the Denza Qatar website — new luxury EV brand launching into a market that had never heard of it. Built the site architecture, keyword-mapped 40+ commercial pages, schema-optimized every model, and executed local SEO across all Qatar governorates. Result: ranking page 1 for "Denza Qatar", "Denza N7 price", and every high-intent model query within months of launch. Live at denzaqatar.com.',
        'SEO متكامل لموقع Denza قطر — علامة تجارية جديدة للسيارات الكهربائية الفاخرة تُطلق في سوق لم يسمع بها من قبل. بنينا هيكل الموقع، رسمنا خرائط الكلمات المفتاحية لأكثر من 40 صفحة تجارية، حسّنّا مخطط كل طراز، ونفذنا SEO محلياً في جميع بلديات قطر. النتيجة: تصدر الصفحة الأولى لـ "Denza قطر" و"سعر Denza N7" وكل استعلام طراز عالي النية خلال أشهر من الإطلاق. مباشر على denzaqatar.com.',
      ),
    },
    {
      _key: 'proj-byd-qatar',
      _type: 'object' as const,
      clientName: L('BYD Qatar', 'BYD قطر'),
      category: L('EV — Automotive', 'سيارات كهربائية — السيارات'),
      title: L(
        'BYD Qatar — competing against incumbent dealership groups',
        'BYD قطر — المنافسة ضد مجموعات الوكالات القائمة',
      ),
      description: L(
        'BYD Qatar came to us needing to compete for search share against decades-old incumbent dealership groups. We rebuilt technical SEO fundamentals, wrote model-specific landing pages for "BYD [model] price Qatar" queries, added rich schema for pricing/availability, and executed a local SEO strategy that put BYD showrooms on Google Maps for every Doha-area search. Live at bydqatar.com.qa.',
        'جاءت BYD قطر إلينا بحاجة للتنافس على حصة البحث ضد مجموعات الوكالات القائمة منذ عقود. أعدنا بناء أساسيات SEO التقنية، وكتبنا صفحات هبوط خاصة بالطرازات لاستعلامات "سعر BYD [طراز] قطر"، وأضفنا مخططاً غنياً للأسعار/التوفر، ونفذنا استراتيجية SEO محلية وضعت معارض BYD على خرائط Google لكل بحث في منطقة الدوحة. مباشر على bydqatar.com.qa.',
      ),
    },
    {
      _key: 'proj-gmc-qatar',
      _type: 'object' as const,
      clientName: L('GMC Qatar', 'GMC قطر'),
      category: L('Premium SUVs — Automotive', 'سيارات SUV فاخرة — السيارات'),
      title: L(
        'GMC Qatar — dominating premium SUV search queries',
        'GMC قطر — الهيمنة على استعلامات بحث SUV الفاخرة',
      ),
      description: L(
        'GMC Qatar hired M&M to lock in top rankings for premium SUV searches — Yukon, Sierra, Terrain, Acadia. We restructured product pages around commercial intent, deployed structured data for pricing and inventory, and built out authority content for "premium SUV Qatar" and comparison queries where luxury buyers compare GMC against competitors.',
        'وظفت GMC قطر M&M لتأمين أعلى الترتيبات لبحث SUV الفاخرة — Yukon وSierra وTerrain وAcadia. أعدنا هيكلة صفحات المنتج حول النية التجارية، ونشرنا البيانات المهيكلة للأسعار والمخزون، وبنينا محتوى موثوقاً لـ "SUV فاخر قطر" واستعلامات المقارنة حيث يقارن المشترون الفاخرون GMC مع المنافسين.',
      ),
    },
    {
      _key: 'proj-cadillac-qatar',
      _type: 'object' as const,
      clientName: L('Cadillac Qatar', 'Cadillac قطر'),
      category: L('Luxury Automotive', 'سيارات فاخرة'),
      title: L(
        'Cadillac Qatar — American luxury search dominance',
        'Cadillac قطر — هيمنة بحث الفخامة الأمريكية',
      ),
      description: L(
        'Cadillac Qatar needed SEO that matched the brand — premium, precise, high-intent only. We built keyword-mapped landing pages for every model, optimized for both English and Arabic search behavior, and executed schema markup that surfaces pricing and specs directly in Google. Now ranking for "Cadillac Qatar", "Cadillac Escalade Qatar price", and every showroom + service-center local query.',
        'احتاجت Cadillac قطر إلى SEO يتناسب مع العلامة التجارية — فاخر ودقيق وعالي النية فقط. بنينا صفحات هبوط مرسومة بالكلمات المفتاحية لكل طراز، محسّنة لسلوك البحث باللغتين الإنجليزية والعربية، ونفذنا ترميز المخطط الذي يظهر الأسعار والمواصفات مباشرة في Google. الآن تتصدر لـ "Cadillac قطر" و"سعر Cadillac Escalade قطر" وكل استعلام محلي لمعرض + مركز خدمة.',
      ),
    },
    {
      _key: 'proj-rox-car',
      _type: 'object' as const,
      clientName: L('ROX Car Qatar', 'ROX Car قطر'),
      category: L('Automotive', 'السيارات'),
      title: L(
        'ROX Car Qatar — entering the market with SEO-first strategy',
        'ROX Car قطر — دخول السوق باستراتيجية SEO أولاً',
      ),
      description: L(
        'ROX Car Qatar came to us pre-launch, before there was even a website. We built the whole site around an SEO-first architecture — every URL, every H1, every image alt tag mapped to a commercial keyword. Result: immediate search visibility on launch day, and ranking for competitive brand + model queries within weeks rather than months.',
        'جاءت ROX Car قطر إلينا قبل الإطلاق، قبل حتى أن يكون هناك موقع. بنينا الموقع بأكمله حول هيكل SEO أولاً — كل رابط، كل H1، كل علامة alt للصورة مرسومة إلى كلمة مفتاحية تجارية. النتيجة: رؤية بحث فورية في يوم الإطلاق، وتصدر لاستعلامات العلامة التجارية + الطراز التنافسية خلال أسابيع بدلاً من أشهر.',
      ),
    },
    {
      _key: 'proj-al-jazeera-academy',
      _type: 'object' as const,
      clientName: L('Al Jazeera Academy', 'أكاديمية الجزيرة'),
      category: L('Education — Private School', 'التعليم — مدرسة خاصة'),
      title: L(
        'Al Jazeera Academy — ranking for competitive private-school queries',
        'أكاديمية الجزيرة — التصدر لاستعلامات المدارس الخاصة التنافسية',
      ),
      description: L(
        "Al Jazeera Academy is one of Doha's leading private schools. Parents comparison-shop schools intensively via Google — reputation, curriculum, fees, admission dates. We optimized the school's site to rank for the exact queries admission-ready parents search: \"British curriculum school Doha\", \"private school West Bay\", \"international school admissions Qatar\". Result: consistent organic enquiries filling admission funnels every intake.",
        'أكاديمية الجزيرة واحدة من المدارس الخاصة الرائدة في الدوحة. الآباء يقارنون المدارس بشكل مكثف عبر Google — السمعة والمنهج والرسوم وتواريخ القبول. حسّنّا موقع المدرسة للتصدر بالضبط لاستعلامات الآباء الجاهزين للقبول: "مدرسة منهج بريطاني الدوحة"، "مدرسة خاصة الخليج الغربي"، "قبول مدرسة دولية قطر". النتيجة: استفسارات عضوية ثابتة تملأ قمع القبول كل استقبال.',
      ),
    },
  ],

  // ─── FAQs Section ────────────────────────────────────────────────
  faqsEyebrow: L('Common Questions', 'أسئلة شائعة'),
  faqsTitle: L(
    'SEO Questions Qatar Business Owners Ask Us',
    'أسئلة SEO يطرحها أصحاب الأعمال في قطر علينا',
  ),

  // ─── In-page form section ────────────────────────────────────────
  formEyebrow: L("Let's Talk SEO", 'دعنا نتحدث عن SEO'),
  formTitle: L(
    'Get a Free SEO Audit for Your Qatar Business',
    'احصل على تدقيق SEO مجاني لعملك في قطر',
  ),
  formSubtitle: L(
    "Tell us your domain and target keywords — we'll come back within 24 hours with a tailored SEO plan, competitor gap analysis, and realistic ranking trajectory. No sales pressure.",
    'أخبرنا بنطاقك والكلمات المفتاحية المستهدفة — سنعود خلال 24 ساعة بخطة SEO مخصصة وتحليل فجوة المنافسين ومسار تصنيف واقعي. بدون ضغط بيع.',
  ),
  formSubmitText: L('Get My Free Audit', 'احصل على تدقيقي المجاني'),

  // ─── Final CTA ──────────────────────────────────────────────────
  ctaTitle: L('Ready to own page one on Google?', 'هل أنت مستعد لامتلاك الصفحة الأولى في Google؟'),
  ctaText: L(
    "Free 30-minute SEO audit. We'll show you exactly which keywords your competitors rank for, what your current gap is, what the 6-month trajectory looks like, and whether we're the right fit — no obligation, no long contracts, no pressure.",
    'تدقيق SEO مجاني لمدة 30 دقيقة. سنُريك بالضبط أي الكلمات المفتاحية يتصدرها منافسوك، وما هي فجوتك الحالية، وكيف يبدو مسار الأشهر الستة، وما إذا كنا المناسبين لك — بدون التزام، بدون عقود طويلة، بدون ضغط.',
  ),
  finalCtaButtonText: L('Get My Free SEO Audit', 'احصل على تدقيقي المجاني'),
  finalCtaButtonLink: '/get-strategy',
}

// ─────────────────────────────────────────────────────────────────────
//  New FAQs — target long-tail commercial queries
// ─────────────────────────────────────────────────────────────────────
const newFaqs = [
  {
    question: L(
      'How much does SEO cost in Qatar?',
      'كم تكلفة SEO في قطر؟',
    ),
    answer: L(
      "M&M SEO retainers in Qatar start at QAR 5,000/month for local businesses targeting a tight geographic radius (single showroom, single clinic, single office). Mid-market and moderately competitive verticals — automotive, real estate, hospitality — typically need QAR 10,000–15,000/month to compete meaningfully. Enterprise-level SEO for national accounts or highly competitive industries starts at QAR 20,000+/month. Every quote is based on the free audit — we won't recommend a package bigger than what your competitor landscape actually requires.",
      'باقات SEO الشهرية من M&M في قطر تبدأ من 5,000 ريال قطري/شهرياً للأعمال المحلية التي تستهدف نصف قطر جغرافي محدود (معرض واحد، عيادة واحدة، مكتب واحد). القطاعات متوسطة السوق والتنافسية المعتدلة — السيارات والعقارات والضيافة — تحتاج عادةً إلى 10,000–15,000 ريال قطري/شهرياً للمنافسة بشكل جدي. SEO على مستوى المؤسسات للحسابات الوطنية أو الصناعات التنافسية جداً يبدأ من 20,000+ ريال قطري/شهرياً. كل عرض سعر يعتمد على التدقيق المجاني — لن نوصي بحزمة أكبر مما يتطلبه بالفعل مشهد منافسيك.',
    ),
  },
  {
    question: L(
      'Which SEO agency is best in Qatar?',
      'ما هي أفضل وكالة SEO في قطر؟',
    ),
    answer: L(
      "That depends on what you need. If you need generic small-business SEO with a fixed monthly report and no strategy tied to revenue — plenty of agencies in Doha can do that. If you need an SEO partner that will rank you for competitive commercial keywords, work in both English and Arabic, integrate Local SEO with Google Business Profile, and treat AI search (ChatGPT, Gemini, Perplexity) as a first-class channel — that's a much shorter list. M&M is already ranking Qatar's biggest automotive brands (BYD, Denza, GMC, Cadillac, ROX) and leading educational institutions (Al Jazeera Academy) — the proof is public, and every client above is verifiable. Book the free audit and compare us against anyone else you're considering.",
      'ذلك يعتمد على ما تحتاجه. إذا كنت تحتاج إلى SEO عام للأعمال الصغيرة مع تقرير شهري ثابت وبدون استراتيجية مرتبطة بالإيرادات — كثير من الوكالات في الدوحة يمكنها القيام بذلك. إذا كنت تحتاج إلى شريك SEO سيصدرك للكلمات المفتاحية التجارية التنافسية، ويعمل باللغتين الإنجليزية والعربية، ويدمج SEO المحلي مع ملف Google Business، ويعامل بحث الذكاء الاصطناعي (ChatGPT، Gemini، Perplexity) كقناة من الدرجة الأولى — تلك قائمة أقصر بكثير. M&M بالفعل تصدر أكبر العلامات التجارية للسيارات في قطر (BYD، Denza، GMC، Cadillac، ROX) والمؤسسات التعليمية الرائدة (أكاديمية الجزيرة) — الدليل عام، وكل عميل أعلاه قابل للتحقق. احجز التدقيق المجاني وقارنّا بأي شخص آخر تفكر فيه.',
    ),
  },
  {
    question: L(
      'Do you guarantee page 1 rankings?',
      'هل تضمنون تصدر الصفحة الأولى؟',
    ),
    answer: L(
      "No — and any agency that does is lying. Google's algorithm is proprietary, competitive dynamics shift constantly, and no one on earth can promise a specific rank position. What we DO guarantee is: (1) a full audit + strategy within the first two weeks, (2) monthly transparent reporting showing exactly what work was done and what movement happened, (3) no long contracts — if we're not delivering, you can leave without penalty, and (4) the same playbook we've used to rank BYD, Denza, GMC, Cadillac, ROX, and Al Jazeera Academy on page 1 for their money keywords. That's a better guarantee than a fake one.",
      'لا — وأي وكالة تفعل ذلك تكذب. خوارزمية Google خاصة، والديناميكيات التنافسية تتغير باستمرار، ولا يستطيع أحد على وجه الأرض أن يعد بموقع تصنيف محدد. ما نضمنه هو: (1) تدقيق كامل + استراتيجية خلال الأسبوعين الأولين، (2) تقارير شفافة شهرية تُظهر بالضبط ما تم عمله وما حدث من حركة، (3) بدون عقود طويلة — إذا لم نُقدّم، يمكنك المغادرة بدون عقوبة، و(4) نفس الخطة التي استخدمناها لتصدر BYD وDenza وGMC وCadillac وROX وأكاديمية الجزيرة الصفحة الأولى لكلماتهم المالية. هذا ضمان أفضل من ضمان مزيف.',
    ),
  },
  {
    question: L(
      'How long does SEO take to show results in Qatar?',
      'كم يستغرق SEO لإظهار النتائج في قطر؟',
    ),
    answer: L(
      "For most service businesses in Qatar, meaningful ranking movement starts at week 8–12. Qualified lead lift starts at month 4–6. Full ROI on the retainer is typically month 8–12. The exact curve depends on three things: (1) how competitive your industry is (real estate + automotive take longer than local services), (2) how much content velocity you can support, and (3) the technical starting condition of your site. We'll project a specific 12-month trajectory for your niche during the free audit — no vague promises.",
      'بالنسبة لمعظم أعمال الخدمات في قطر، تبدأ حركة التصنيف الجدية في الأسبوع 8-12. يبدأ رفع العملاء المحتملين المؤهلين في الشهر 4-6. عائد الاستثمار الكامل على الباقة الشهرية عادةً في الشهر 8-12. المنحنى الدقيق يعتمد على ثلاثة أشياء: (1) مدى تنافسية صناعتك (العقارات + السيارات تستغرق وقتاً أطول من الخدمات المحلية)، (2) كم يمكنك دعم سرعة المحتوى، و(3) الشرط التقني الأولي لموقعك. سنعرض مسار محدد لمدة 12 شهراً لتخصصك خلال التدقيق المجاني — بدون وعود مبهمة.',
    ),
  },
  {
    question: L(
      'What industries does M&M serve in Qatar?',
      'ما الصناعات التي تخدمها M&M في قطر؟',
    ),
    answer: L(
      "We're best known for automotive (BYD, Denza, GMC, Cadillac, ROX Car — Qatar's biggest active dealer brands trust us), education (Al Jazeera Academy and other private schools), luxury retail, hospitality (hotels + restaurants), real estate, professional services (law firms, clinics, consultancies), and B2B SaaS/tech companies. If you're in a competitive commercial vertical in Qatar, we've probably already ranked someone like you. The free audit will tell you exactly whether we're the right fit for your specific niche.",
      'نحن أكثر شهرة في السيارات (BYD وDenza وGMC وCadillac وROX Car — أكبر العلامات التجارية النشطة للوكلاء في قطر يثقون بنا)، والتعليم (أكاديمية الجزيرة والمدارس الخاصة الأخرى)، والبيع بالتجزئة الفاخر، والضيافة (الفنادق + المطاعم)، والعقارات، والخدمات المهنية (شركات المحاماة والعيادات والاستشارات)، وشركات SaaS/التكنولوجيا B2B. إذا كنت في قطاع تجاري تنافسي في قطر، فمن المحتمل أننا قد صدرنا بالفعل شخصاً مثلك. التدقيق المجاني سيخبرك بالضبط ما إذا كنا المناسبين لتخصصك المحدد.',
    ),
  },
  {
    question: L(
      'Do you offer SEO in Arabic?',
      'هل تقدمون SEO باللغة العربية؟',
    ),
    answer: L(
      "Yes — every M&M website and SEO engagement is built bilingual from the schema up: hreflang tags, separate URL structures for /en and /ar, Arabic content written by native Qatari speakers (not translated), and Arabic-specific keyword research that reflects how Qatari buyers actually search. Most Qatar agencies bolt Arabic on as an afterthought. We treat it as a first-class ranking channel — that's especially important for local buyers, government contracts, and category leaders like the automotive brands we serve.",
      'نعم — كل موقع وارتباط SEO مع M&M مبني ثنائي اللغة من المخطط: علامات hreflang، وهياكل URL منفصلة لـ /en و/ar، ومحتوى عربي مكتوب من قِبل متحدثين قطريين أصليين (لم يُترجم)، وبحث كلمات مفتاحية عربية محدد يعكس كيف يبحث المشترون القطريون فعلياً. معظم وكالات قطر تُلحق العربية كفكرة لاحقة. نحن نعاملها كقناة تصنيف من الدرجة الأولى — وهذا مهم بشكل خاص للمشترين المحليين والعقود الحكومية وقادة الفئات مثل العلامات التجارية للسيارات التي نخدمها.',
    ),
  },
]

// ─────────────────────────────────────────────────────────────────────
//  Runner
// ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Overhauling SEO service page for Qatar SEO ranking…')

  // Find the SEO service doc by slug (doc ID varies — some are legacy auto-ids)
  const doc: {_id: string} | null = await client.fetch(
    `*[_type == "service" && slug.current == "seo"][0]{ _id }`,
  )

  if (!doc?._id) {
    console.error("Could not find /services/seo doc. Run seed-missing-services.ts first.")
    process.exit(1)
  }

  console.log(`  • SEO service doc id: ${doc._id}`)

  const tx = client.transaction()

  // 1) Patch the SEO service doc with all new content
  console.log('  • Patching hero / title / description')
  console.log('  • Patching all section eyebrows + titles')
  console.log('  • Patching deliverables (14 items)')
  console.log('  • Patching 6 project entries (BYD, Denza, GMC, Cadillac, ROX, Al Jazeera Academy)')
  console.log('  • Patching form + CTA copy')
  console.log('  • Patching SEO meta title + description + focus keyword')

  tx.patch(doc._id, (p) =>
    p.set({
      seo: {
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        focusKeyword: seo.focusKeyword,
      },
      heroEyebrow: seo.heroEyebrow,
      title: seo.title,
      description: seo.description,
      heroCtaButtonText: seo.heroCtaButtonText,
      whyItMattersEyebrow: seo.whyItMattersEyebrow,
      whyItMattersTitle: seo.whyItMattersTitle,
      whyItMatters: seo.whyItMatters,
      whatWeBuildEyebrow: seo.whatWeBuildEyebrow,
      whatWeBuildTitle: seo.whatWeBuildTitle,
      content: seo.content,
      deliverablesEyebrow: seo.deliverablesEyebrow,
      deliverablesTitle: seo.deliverablesTitle,
      deliverables: seo.deliverables,
      projectsEyebrow: seo.projectsEyebrow,
      projectsTitle: seo.projectsTitle,
      projects: seo.projects,
      faqsEyebrow: seo.faqsEyebrow,
      faqsTitle: seo.faqsTitle,
      formEyebrow: seo.formEyebrow,
      formTitle: seo.formTitle,
      formSubtitle: seo.formSubtitle,
      formSubmitText: seo.formSubmitText,
      ctaTitle: seo.ctaTitle,
      ctaText: seo.ctaText,
      finalCtaButtonText: seo.finalCtaButtonText,
      finalCtaButtonLink: seo.finalCtaButtonLink,
    }),
  )

  // 2) Create 6 new FAQs targeting long-tail commercial queries
  console.log('  • Creating 6 new FAQs targeting long-tail SEO queries')
  for (const [i, faq] of newFaqs.entries()) {
    const faqId = `faq-seo-overhaul-${i + 1}`
    tx.createOrReplace({
      _id: faqId,
      _type: 'faq',
      question: faq.question,
      answer: faq.answer,
      category: 'seo',
      relatedService: {_type: 'reference', _ref: doc._id},
      showOnFaqPage: true,
      order: 100 + i, // put these after the existing ones
    } as any)
  }

  console.log('Committing…')
  const res = await tx.commit()
  console.log(`Done. ${res.results.length} operations applied ✓`)
  console.log('\nNext:')
  console.log('  1. Reload /services/seo to see the new content')
  console.log('  2. Google Search Console → Request Indexing for https://mnmagency.com/services/seo')
  console.log('  3. Add client logos to Sanity Media Library so they appear on the projects section')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
