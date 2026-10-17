/**
 * Web Development page: humanised copy, no long dashes, CMS kept generic
 * ("headless CMS", no vendor name). Replaces scripts/seed-webdev-content.ts.
 *
 * Rewrites every visible text field on the service, all 12 web-dev FAQs,
 * the landing-page cost FAQ, and the HEC Mannai portfolio project copy.
 * Idempotent: re-running sets the same values.
 *
 *   cd ~/mnm-cms
 *   npx sanity exec scripts/seed-webdev-humanize.ts --with-user-token
 */
/* eslint-disable no-console */

import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type Loc = {en: string; ar: string}
const L = (en: string, ar: string): Loc => ({en, ar})

const SERVICE_ID = '140e8c17-bca6-4f27-8735-f16b89d9dde9'
const LP_ID = 'landingPage-web-development-qatar'
const LP_COST_FAQ_KEY = 'bM4Vn6Xhr0kQ8myfjAYOJM'
const HEC_ID = 'webProject-hec-mannai'

// ─── Service fields ─────────────────────────────────────────────────────────
const service = {
  description: L(
    'We design and build fast, bilingual websites on a headless CMS and Node.js. They load quickly, rank well on Google and AI search, and make it easy for visitors to get in touch. Built in Qatar, for businesses in Qatar.',
    'نصمم ونبني مواقع سريعة وثنائية اللغة على نظام إدارة محتوى Headless وNode.js. مواقع تُحمَّل بسرعة، وتظهر جيداً في Google والبحث بالذكاء الاصطناعي، وتسهّل على الزائر التواصل معك. نبنيها في قطر، للشركات في قطر.',
  ),
  whatWeBuildTitle: L('A website that works as hard as your team does.', 'موقع يعمل بجدّ مثل فريقك.'),
  content: L(
    `Most of your customers will meet your website before they meet you. So we build every site around one simple question: when someone lands here, how quickly can they understand what you do and decide to contact you?

In practice that means pages that load in under two seconds on mobile networks in Doha, English and Arabic designed together from the start, structured data that helps Google and AI search understand your business, and enquiries that go straight to your CRM or WhatsApp. You also get analytics that show which pages and channels actually bring in business.

We build on modern technology, Next.js and a headless CMS, so the site stays fast as you grow. And we stay with you after launch. Every website comes with 30 days of tuning, where we watch how real visitors use it and improve what needs improving.`,
    `يتعرّف معظم عملائك على موقعك قبل أن يتعرّفوا عليك. لذلك نبني كل موقع حول سؤال بسيط: حين يصل شخص إلى هنا، كم يحتاج من الوقت ليفهم ما تقدّمه ويقرر التواصل معك؟

عملياً يعني ذلك صفحات تُحمَّل في أقل من ثانيتين على شبكات الجوال في الدوحة، وتصميماً بالعربية والإنجليزية معاً منذ البداية، وبيانات منظمة تساعد Google والبحث بالذكاء الاصطناعي على فهم عملك، واستفسارات تصل مباشرة إلى نظام CRM أو WhatsApp. كما تحصل على تحليلات توضّح أي الصفحات والقنوات تجلب لك العملاء فعلاً.

نبني بتقنيات حديثة، Next.js ونظام إدارة محتوى Headless، ليبقى الموقع سريعاً مع نمو أعمالك. ولا نختفي بعد الإطلاق، فكل موقع يأتي مع 30 يوماً من المتابعة والضبط، نراقب خلالها كيف يستخدمه الزوار الحقيقيون ونحسّن ما يحتاج إلى تحسين.`,
  ),
  whyItMattersTitle: L('Your website shapes the first impression.', 'موقعك يصنع الانطباع الأول.'),
  whyItMatters: L(
    `Your website is often the first place people check you out. They compare it with the best sites they use every day, not only with your competitors in Doha. If it is slow, confusing or looks dated, people leave. You lose trust, your ads cost more for every lead, and the sale goes to someone else.

Many businesses still treat their website as a one-off project. They launch it and move on, while results slowly slip away. The companies that do well treat it like part of the team: they measure it, keep it fresh and keep improving it. That is how we work with our clients.`,
    `غالباً ما يكون موقعك أول مكان يتعرّف فيه الناس عليك. وهم يقارنونه بأفضل المواقع التي يستخدمونها يومياً، لا بمنافسيك في الدوحة فقط. فإن كان بطيئاً أو مربكاً أو قديم المظهر، يغادرون. فتخسر الثقة، وترتفع تكلفة كل عميل من إعلاناتك، وتذهب الصفقة إلى غيرك.

لا تزال شركات كثيرة تتعامل مع موقعها كمشروع لمرة واحدة، تطلقه ثم تنساه بينما تتراجع النتائج ببطء. أما الشركات الناجحة فتتعامل معه كجزء من الفريق: تقيس أداءه وتحدّثه وتطوّره باستمرار. وهكذا نعمل مع عملائنا.`,
  ),
  deliverablesTitle: L('Everything you need, from the first workshop to launch day and beyond.', 'كل ما تحتاجه، من ورشة العمل الأولى إلى يوم الإطلاق وما بعده.'),
  deliverables: [
    L('Discovery and business goals workshop', 'ورشة لفهم عملك وأهدافك'),
    L('User research, sitemap, wireframes and prototypes', 'دراسة المستخدمين وخريطة الموقع ونماذج أولية'),
    L('Custom design in English and Arabic', 'تصميم مخصص بالعربية والإنجليزية'),
    L('Fast, secure Next.js development', 'تطوير سريع وآمن بتقنية Next.js'),
    L('Headless CMS your team can edit easily', 'نظام إدارة محتوى Headless يعدّله فريقك بسهولة'),
    L('Node.js integrations with your CRM, ERP and payments', 'تكاملات Node.js مع أنظمة CRM وERP والدفع'),
    L('SEO setup: structured data, sitemap and hreflang', 'إعداد SEO: بيانات منظمة وخريطة موقع وhreflang'),
    L('Enquiries sent straight to your CRM and WhatsApp', 'استفسارات تصل مباشرة إلى CRM وWhatsApp'),
    L('Pages that load in under 2 seconds on mobile', 'صفحات تُحمَّل في أقل من ثانيتين على الجوال'),
    L('Analytics and conversion tracking', 'تحليلات وتتبع للتحويلات'),
    L('Domain, hosting and SSL taken care of', 'نتولى النطاق والاستضافة وشهادة SSL'),
    L('30 days of tuning after launch, plus team training', '30 يوماً من الضبط بعد الإطلاق مع تدريب فريقك'),
  ],
  projectsTitle: L('A few of the websites we have built.', 'بعض المواقع التي بنيناها.'),
  ctaTitle: L('Ready for a website that brings in business?', 'جاهز لموقع يجلب لك العملاء؟'),
  ctaText: L(
    'Tell us a little about your business and what you want the website to do. Within 24 hours we will send you a clear proposal, a realistic timeline and examples of similar sites we have built.',
    'أخبرنا قليلاً عن عملك وما تريده من الموقع. وخلال 24 ساعة نرسل لك عرضاً واضحاً وجدولاً زمنياً واقعياً وأمثلة لمواقع مشابهة بنيناها.',
  ),
  formSubtitle: L(
    'Fill in the form and our team will get back to you within 24 hours with ideas for your website.',
    'املأ النموذج وسيتواصل معك فريقنا خلال 24 ساعة بأفكار لموقعك.',
  ),
  metaDescription: L(
    'Web development in Qatar on a headless CMS. Fast, secure, bilingual Next.js websites with Node.js integrations. See how headless compares with WordPress.',
    'تطوير مواقع في قطر بنظام إدارة محتوى Headless. مواقع Next.js سريعة وآمنة وثنائية اللغة مع تكاملات Node.js. قارن بين Headless وWordPress.',
  ),
}

// ─── Page sections ──────────────────────────────────────────────────────────
const sections = [
  {
    _key: 'headless-why',
    _type: 'textBlock',
    eyebrow: L('Headless, explained', 'ما معنى Headless؟'),
    title: L('Why we build on a headless CMS', 'لماذا نبني على نظام إدارة محتوى Headless'),
    content: L(
      `A traditional CMS like WordPress does two jobs at once. It stores your content, and it also builds your pages using a theme and a collection of plugins. A headless CMS splits those jobs. Your content sits in a clean, simple editor that your team can use without a developer. The website itself is a fast Next.js app that takes that content and serves ready-made pages from servers close to your visitors.

Here is what that means for you:

• Speed. Pages are prepared in advance, so they open quickly even on a phone. Faster pages rank better and convert better.
• Security. There is no public login page, database or plugin on the live site for hackers to target.
• Control. Your team updates text, images, FAQs and landing pages in English and Arabic from one place, and the design never breaks.
• Room to grow. The same content can feed your website, an app, a screen in your showroom or a WhatsApp flow.`,
      `يقوم نظام إدارة المحتوى التقليدي مثل WordPress بمهمتين معاً: يخزّن المحتوى، ويبني الصفحات أيضاً باستخدام قالب ومجموعة من الإضافات. أما نظام إدارة المحتوى Headless فيفصل بينهما. يبقى محتواك في محرر بسيط وواضح يستخدمه فريقك دون مطوّر، بينما الموقع نفسه تطبيق Next.js سريع يأخذ هذا المحتوى ويقدّم صفحات جاهزة من خوادم قريبة من زوارك.

وهذا ما يعنيه ذلك لك:

• السرعة. تُجهَّز الصفحات مسبقاً فتفتح بسرعة حتى على الهاتف. والصفحات الأسرع تظهر أفضل في البحث وتجلب عملاء أكثر.
• الأمان. لا توجد صفحة دخول عامة أو قاعدة بيانات أو إضافات على الموقع المباشر يستهدفها المخترقون.
• التحكم. يحدّث فريقك النصوص والصور والأسئلة الشائعة وصفحات الهبوط بالعربية والإنجليزية من مكان واحد، دون أن يتأثر التصميم.
• مجال للنمو. يمكن للمحتوى نفسه أن يغذّي موقعك وتطبيقك وشاشة في صالة العرض ومحادثات WhatsApp.`,
    ),
  },
  {
    _key: 'wp-vs-headless',
    _type: 'comparisonBlock',
    eyebrow: L('WordPress or headless?', 'WordPress أم Headless؟'),
    title: L('An honest comparison', 'مقارنة صريحة'),
    subtitle: L(
      'Both can run a good website. Here is how they differ on the things that matter most for your business.',
      'كلاهما يمكن أن يشغّل موقعاً جيداً. إليك الفرق بينهما في الأمور الأهم لعملك.',
    ),
    criterionLabel: L('What matters', 'المعيار'),
    optionALabel: L('Traditional WordPress', 'WordPress التقليدي'),
    optionBLabel: L('Headless CMS + Next.js', 'Headless CMS مع Next.js'),
    rows: [
      {
        _key: 'speed',
        criterion: L('Speed', 'السرعة'),
        optionA: L(
          'Depends on the theme, hosting and plugins. Usually needs caching plugins and regular tuning to stay quick.',
          'تعتمد على القالب والاستضافة والإضافات، وتحتاج عادةً إلى إضافات تخزين مؤقت وضبط مستمر لتبقى سريعة.',
        ),
        optionB: L(
          'Pages are prepared in advance and served from a global network, so they stay fast without extra plugins.',
          'تُجهَّز الصفحات مسبقاً وتُقدَّم من شبكة عالمية، فتبقى سريعة دون إضافات.',
        ),
      },
      {
        _key: 'security',
        criterion: L('Security', 'الأمان'),
        optionA: L(
          'Plugins and themes are the most common way in for attackers, and the login page is public. It needs regular updates.',
          'الإضافات والقوالب هي الطريق الأكثر شيوعاً للاختراق، وصفحة الدخول مكشوفة للجميع، لذا يحتاج إلى تحديثات مستمرة.',
        ),
        optionB: L(
          'No database or admin login on the live site, so there is very little to attack.',
          'لا قاعدة بيانات ولا صفحة دخول على الموقع المباشر، فلا يوجد الكثير مما يمكن مهاجمته.',
        ),
      },
      {
        _key: 'editing',
        criterion: L('Editing', 'التحرير'),
        optionA: L(
          'A familiar dashboard. Page builders are flexible, but they can break layouts or slow pages down.',
          'لوحة مألوفة. أدوات بناء الصفحات مرنة، لكنها قد تُفسد التصميم أو تُبطئ الصفحات.',
        ),
        optionB: L(
          'Simple forms for each type of content. Your team can update anything without worrying about the design.',
          'نماذج بسيطة لكل نوع من المحتوى، فيحدّث فريقك ما يريد دون القلق على التصميم.',
        ),
      },
      {
        _key: 'bilingual',
        criterion: L('English and Arabic', 'العربية والإنجليزية'),
        optionA: L(
          'Usually needs a translation plugin, and right-to-left support depends on the theme.',
          'يحتاج عادةً إلى إضافة ترجمة، ودعم الكتابة من اليمين إلى اليسار يعتمد على القالب.',
        ),
        optionB: L(
          'Both languages are planned from day one, with proper Arabic layouts and hreflang tags.',
          'اللغتان مخطط لهما منذ اليوم الأول، مع تصميم عربي صحيح ووسوم hreflang.',
        ),
      },
      {
        _key: 'seo',
        criterion: L('SEO and AI search', 'SEO والبحث بالذكاء الاصطناعي'),
        optionA: L(
          'Works well with SEO plugins, though heavy themes can hurt speed and code quality.',
          'يعمل جيداً مع إضافات SEO، لكن القوالب الثقيلة قد تضرّ بالسرعة وجودة الشيفرة.',
        ),
        optionB: L(
          'Clean code, structured data and fast pages come built in. This is what Google and AI tools read best.',
          'شيفرة نظيفة وبيانات منظمة وصفحات سريعة مدمجة من الأساس، وهذا ما تقرؤه Google وأدوات الذكاء الاصطناعي بأفضل شكل.',
        ),
      },
      {
        _key: 'integrations',
        criterion: L('Integrations', 'التكاملات'),
        optionA: L(
          'Thousands of plugins. Quick to add, but each one adds weight and risk.',
          'آلاف الإضافات، سهلة التركيب لكن كل واحدة تزيد الحِمل والمخاطر.',
        ),
        optionB: L(
          'Custom Node.js connections to your CRM, ERP, payment gateway or WhatsApp, built around how you work.',
          'روابط Node.js مخصصة مع CRM وERP وبوابة الدفع وWhatsApp، مبنية حول طريقة عملك.',
        ),
      },
      {
        _key: 'upfront',
        criterion: L('Cost to build', 'تكلفة البناء'),
        optionA: L(
          'Lower. Ready-made themes and plugins make simple sites quicker to build.',
          'أقل. القوالب والإضافات الجاهزة تجعل بناء المواقع البسيطة أسرع.',
        ),
        optionB: L(
          'Higher. Every part is designed and built for your brand.',
          'أعلى. كل جزء يُصمَّم ويُبنى خصيصاً لعلامتك التجارية.',
        ),
      },
      {
        _key: 'running',
        criterion: L('Cost to run', 'تكلفة التشغيل'),
        optionA: L(
          'Plugin licences, security fixes and speed tuning add up over the years.',
          'تراخيص الإضافات والإصلاحات الأمنية وضبط السرعة تتراكم تكلفتها مع السنوات.',
        ),
        optionB: L(
          'Fewer moving parts to look after, and hosting grows with your traffic.',
          'عناصر أقل تحتاج إلى صيانة، والاستضافة تكبر مع حجم زياراتك.',
        ),
      },
      {
        _key: 'best-for',
        criterion: L('Best for', 'الأنسب لـ'),
        optionA: L(
          'Simple sites, blogs and smaller budgets where launching quickly matters most.',
          'المواقع البسيطة والمدونات والميزانيات الأصغر حين تكون سرعة الإطلاق هي الأهم.',
        ),
        optionB: L(
          'Businesses that compete on search and need two languages, integrations or room to grow.',
          'الشركات التي تنافس في نتائج البحث وتحتاج إلى لغتين وتكاملات ومجال للنمو.',
        ),
      },
    ],
    footnote: L(
      'We build both. Headless is our usual recommendation for growing businesses. If a well-built WordPress site suits your goals and budget better, we will tell you, and we will build it properly.',
      'نحن نبني الاثنين. ونوصي عادةً بتقنية Headless للشركات التي تنمو. وإن كان موقع WordPress مبني بإتقان أنسب لأهدافك وميزانيتك، فسنخبرك بذلك ونبنيه كما يجب.',
    ),
  },
  {
    _key: 'stack',
    _type: 'cardsBlock',
    numbered: false,
    eyebrow: L('What we build with', 'التقنيات التي نستخدمها'),
    title: L('Proven technology, chosen for speed and control', 'تقنيات مجرّبة، نختارها للسرعة والتحكم'),
    subtitle: L(
      'Each part of the stack is there for a reason. You get a site that is fast today and easy to grow later.',
      'لكل جزء سبب واضح. تحصل على موقع سريع اليوم وسهل التوسع لاحقاً.',
    ),
    cards: [
      {
        _key: 'nextjs',
        tag: L('Front end', 'الواجهة'),
        title: L('Next.js', 'Next.js'),
        text: L(
          'The React framework behind many of the fastest websites online. Pages are prepared in advance for speed and SEO, with interactive features where you need them.',
          'إطار عمل React الذي يقف خلف كثير من أسرع المواقع. تُجهَّز الصفحات مسبقاً للسرعة وتحسين البحث، مع ميزات تفاعلية حيث تحتاجها.',
        ),
      },
      {
        _key: 'cms',
        tag: L('Content', 'المحتوى'),
        title: L('Headless CMS', 'نظام إدارة محتوى Headless'),
        text: L(
          'An editor your marketing team will actually like using. Clear forms, easy image management, and English and Arabic side by side.',
          'محرر يحب فريق التسويق استخدامه فعلاً: نماذج واضحة وإدارة سهلة للصور والعربية والإنجليزية جنباً إلى جنب.',
        ),
      },
      {
        _key: 'nodejs',
        tag: L('Back end', 'الخلفية'),
        title: L('Node.js', 'Node.js'),
        text: L(
          'Fast, reliable server code for forms, enquiry routing and connections to the systems you already use.',
          'شيفرة خادم سريعة وموثوقة للنماذج وتوجيه الاستفسارات والربط مع الأنظمة التي تستخدمها.',
        ),
      },
      {
        _key: 'commerce',
        tag: L('E-commerce', 'المتاجر'),
        title: L('Headless commerce', 'تجارة إلكترونية Headless'),
        text: L(
          'For online stores we use headless commerce engines such as Medusa.js, connected to your payment gateway and stock system.',
          'للمتاجر الإلكترونية نستخدم محركات Headless مثل Medusa.js، مرتبطة ببوابة الدفع ونظام المخزون لديك.',
        ),
      },
      {
        _key: 'tailwind',
        tag: L('Design', 'التصميم'),
        title: L('Tailwind CSS', 'Tailwind CSS'),
        text: L(
          'A design system made for your brand instead of a borrowed theme. It looks right on every screen and in both reading directions.',
          'نظام تصميم مصنوع لعلامتك بدلاً من قالب مستعار، يبدو صحيحاً على كل شاشة وفي اتجاهي القراءة.',
        ),
      },
      {
        _key: 'cloud',
        tag: L('Hosting', 'الاستضافة'),
        title: L('Cloud hosting and CDN', 'استضافة سحابية وشبكة CDN'),
        text: L(
          'Reliable cloud hosting with a global CDN, SSL, automatic scaling and round-the-clock monitoring.',
          'استضافة سحابية موثوقة مع شبكة CDN عالمية وشهادة SSL وتوسع تلقائي ومراقبة على مدار الساعة.',
        ),
      },
    ],
  },
  {
    _key: 'nodejs-integrations',
    _type: 'textBlock',
    eyebrow: L('Node.js integrations', 'تكاملات Node.js'),
    title: L('Your website, connected to the rest of your business', 'موقعك متصل ببقية أعمالك'),
    content: L(
      `Your website should not sit on its own. Using Node.js, we connect it to the tools you already rely on: your CRM, ERP, booking or stock system, payment gateway, email and WhatsApp. Enquiries reach the right person straight away, prices and stock stay in sync, and your team stops copying data from one system to another.

Because we build these connections for you, they work the way your business works. No compromises forced by a plugin, and full control over your data.`,
      `لا ينبغي أن يبقى موقعك معزولاً. باستخدام Node.js نربطه بالأدوات التي تعتمد عليها: نظام CRM وERP ونظام الحجز أو المخزون وبوابة الدفع والبريد الإلكتروني وWhatsApp. فتصل الاستفسارات إلى الشخص المناسب فوراً، وتبقى الأسعار والمخزون متطابقة، ويتوقف فريقك عن نقل البيانات يدوياً من نظام إلى آخر.

ولأننا نبني هذه الروابط خصيصاً لك، فهي تعمل بالطريقة التي يعمل بها عملك، دون تنازلات تفرضها إضافة جاهزة، ومع تحكم كامل في بياناتك.`,
    ),
  },
  {
    _key: 'process',
    _type: 'cardsBlock',
    numbered: true,
    eyebrow: L('How we work', 'كيف نعمل'),
    title: L('From first meeting to launch, step by step', 'من أول اجتماع إلى الإطلاق، خطوة بخطوة'),
    subtitle: L(
      'A typical company website takes 6 to 10 weeks. Online stores and larger platforms take 10 to 16 weeks. You will see real progress every two weeks.',
      'يستغرق موقع الشركة عادةً من 6 إلى 10 أسابيع، والمتاجر الإلكترونية والمنصات الأكبر من 10 إلى 16 أسبوعاً. وسترى تقدماً حقيقياً كل أسبوعين.',
    ),
    cards: [
      {
        _key: 'discovery',
        tag: L('Week 1', 'الأسبوع 1'),
        title: L('Getting to know you', 'نتعرّف عليك'),
        text: L(
          'We sit down together to talk about your goals, your customers and your competitors. Then we agree on the pages, the features and how we will measure success.',
          'نجلس معاً لنتحدث عن أهدافك وعملائك ومنافسيك، ثم نتفق على الصفحات والميزات وطريقة قياس النجاح.',
        ),
      },
      {
        _key: 'ux',
        tag: L('Weeks 2 to 3', 'الأسبوعان 2 و3'),
        title: L('Planning the structure', 'تخطيط الهيكل'),
        text: L(
          'We map how visitors will move through the site and plan the content, so the CMS fits the way your team works.',
          'نرسم كيف سيتنقل الزوار في الموقع ونخطط للمحتوى، ليتناسب نظام إدارة المحتوى مع طريقة عمل فريقك.',
        ),
      },
      {
        _key: 'design',
        tag: L('Weeks 3 to 5', 'الأسابيع 3 إلى 5'),
        title: L('Design in both languages', 'التصميم باللغتين'),
        text: L(
          'We design every page in English and Arabic, with proper right-to-left layouts, and review it on real phones and laptops.',
          'نصمم كل صفحة بالعربية والإنجليزية مع تخطيط صحيح من اليمين إلى اليسار، ونراجعها على هواتف وأجهزة حقيقية.',
        ),
      },
      {
        _key: 'build',
        tag: L('Weeks 4 to 8', 'الأسابيع 4 إلى 8'),
        title: L('Building the site', 'بناء الموقع'),
        text: L(
          'We develop the site, the CMS and any integrations in short rounds. You get a preview link and can click through it at every stage.',
          'نطوّر الموقع ونظام إدارة المحتوى والتكاملات على مراحل قصيرة، وتحصل على رابط معاينة تتصفحه في كل مرحلة.',
        ),
      },
      {
        _key: 'seo-migration',
        tag: L('Weeks 7 to 9', 'الأسابيع 7 إلى 9'),
        title: L('Content, SEO and moving over', 'المحتوى وSEO والانتقال'),
        text: L(
          'We add the content, set up SEO, redirect your old links and test the speed, so you keep the Google rankings you already have.',
          'نضيف المحتوى ونجهّز SEO ونحوّل الروابط القديمة ونختبر السرعة، لتحافظ على ترتيبك الحالي في Google.',
        ),
      },
      {
        _key: 'launch',
        tag: L('Weeks 9 to 10', 'الأسبوعان 9 و10'),
        title: L('Launch and fine-tuning', 'الإطلاق والضبط'),
        text: L(
          'We go live, train your team on the CMS, and spend the next 30 days improving things based on how real visitors use the site.',
          'نطلق الموقع وندرّب فريقك على نظام إدارة المحتوى، ثم نقضي 30 يوماً في تحسينه بناءً على استخدام الزوار الحقيقي.',
        ),
      },
    ],
  },
]

// ─── FAQs (all 12 web-dev FAQs, rewritten) ──────────────────────────────────
const COST = L(
  'Every website is planned around your goals, so we do not have a fixed price list. The cost depends on how many pages and languages you need, any custom features, integrations with systems like your CRM, ERP or payments, and whether you want an online store. Send us your brief and we will reply within 24 hours with a clear, itemised proposal. No surprises later.',
  'نخطط لكل موقع حسب أهدافك، لذلك ليست لدينا قائمة أسعار ثابتة. تعتمد التكلفة على عدد الصفحات واللغات، وأي ميزات مخصصة، والتكامل مع أنظمة مثل CRM وERP والدفع، وما إذا كنت تريد متجراً إلكترونياً. أرسل لنا تفاصيل مشروعك وسنرد خلال 24 ساعة بعرض واضح ومفصّل، دون مفاجآت لاحقاً.',
)

const FAQS: Record<string, {question: Loc; answer: Loc}> = {
  '945ce896-f1b0-480b-8267-d6cb543d2944': {
    question: L('How much does a website cost in Qatar?', 'كم تبلغ تكلفة الموقع الإلكتروني في قطر؟'),
    answer: COST,
  },
  'e9ef9166-8962-4ce7-b917-d716a097831e': {
    question: L('Should I choose WordPress or a headless CMS?', 'هل أختار WordPress أم نظام إدارة محتوى Headless؟'),
    answer: L(
      'If you need a simple site or blog quickly and your budget is tight, a well-built WordPress site can be a good choice. If you compete on search, need English and Arabic, depend on integrations or plan to grow, headless is faster, safer and usually cheaper to look after in the long run. We build both, and we will recommend whichever suits you best.',
      'إذا كنت تحتاج إلى موقع بسيط أو مدونة بسرعة وميزانيتك محدودة، فقد يكون موقع WordPress مبني بإتقان خياراً جيداً. أما إذا كنت تنافس في نتائج البحث وتحتاج إلى العربية والإنجليزية وتعتمد على التكاملات أو تخطط للنمو، فإن Headless أسرع وأكثر أماناً وأقل تكلفة في الصيانة على المدى البعيد عادةً. نحن نبني الاثنين وسنوصي بما يناسبك أكثر.',
    ),
  },
  'cf930089-bef6-49f0-b1a1-64802c581c62': {
    question: L('Will my website be SEO friendly?', 'هل سيكون موقعي متوافقاً مع محركات البحث؟'),
    answer: L(
      'Yes. Every site we build is fast, works well on phones, uses clean code and structured data, and has proper titles, descriptions and hreflang tags for both languages. We also set up Google Search Console and analytics so you can see how it performs.',
      'نعم. كل موقع نبنيه سريع ويعمل جيداً على الهواتف، بشيفرة نظيفة وبيانات منظمة وعناوين وأوصاف صحيحة ووسوم hreflang للغتين. كما نجهّز Google Search Console والتحليلات لترى أداء موقعك.',
    ),
  },
  '734e8d0a-88bb-452f-bf6a-35ad5d82ef59': {
    question: L(
      'Can you move my WordPress site to headless without losing rankings?',
      'هل يمكنكم نقل موقعي من WordPress إلى Headless دون خسارة ترتيبي في البحث؟',
    ),
    answer: L(
      'Yes. We move your content into the new CMS, keep or improve your link structure, redirect every link that changes, and carry over your page titles, descriptions and structured data. We check speed and rankings before and after launch. Most sites get noticeably faster after the move.',
      'نعم. ننقل محتواك إلى نظام إدارة المحتوى الجديد، ونحافظ على بنية الروابط أو نحسّنها، ونحوّل كل رابط يتغيّر، وننقل العناوين والأوصاف والبيانات المنظمة. ونقيس السرعة والترتيب قبل الإطلاق وبعده. ومعظم المواقع تصبح أسرع بوضوح بعد الانتقال.',
    ),
  },
  '79901098-0133-45bf-bbeb-af0e55fd3a34': {
    question: L(
      'What is a headless CMS, and can my team edit the site without a developer?',
      'ما هو نظام إدارة المحتوى Headless، وهل يستطيع فريقي تعديل الموقع دون مطوّر؟',
    ),
    answer: L(
      'A headless CMS keeps your content separate from the design and code of the website. Your team logs in, edits text, images, FAQs, landing pages and SEO fields in English and Arabic, and presses publish. No developer needed. The design stays intact because content goes into simple forms, not a free-form page builder.',
      'يفصل نظام إدارة المحتوى Headless المحتوى عن تصميم الموقع وشيفرته. يسجّل فريقك الدخول ويعدّل النصوص والصور والأسئلة الشائعة وصفحات الهبوط وحقول SEO بالعربية والإنجليزية ثم ينشر، دون الحاجة إلى مطوّر. ويبقى التصميم سليماً لأن المحتوى يُدخَل في نماذج بسيطة لا في أداة بناء صفحات حرة.',
    ),
  },
  '52b07e3d-3272-41bb-b9d0-3e0431e999ad': {
    question: L('What technologies do you use?', 'ما التقنيات التي تستخدمونها؟'),
    answer: L(
      'Most of our sites use Next.js for the front end, a headless CMS for content and Node.js for integrations, styled with Tailwind CSS and hosted in the cloud with a global CDN. For online stores we use headless commerce engines such as Medusa.js. When a simpler build makes more sense, we also work with WordPress.',
      'تعتمد معظم مواقعنا على Next.js للواجهة، ونظام إدارة محتوى Headless للمحتوى، وNode.js للتكاملات، مع Tailwind CSS للتصميم واستضافة سحابية بشبكة CDN عالمية. وللمتاجر الإلكترونية نستخدم محركات Headless مثل Medusa.js. وحين يكون البناء الأبسط أنسب، نعمل أيضاً على WordPress.',
    ),
  },
  'faq-web-development-1': {
    question: L('How long does it take to build a website with M&M?', 'كم يستغرق بناء موقع مع M&M؟'),
    answer: L(
      'A company website of 12 to 18 pages usually takes 6 to 10 weeks. An online store or larger platform takes 10 to 16 weeks. We work in two-week rounds, so you see real progress regularly and always know where things stand. If you have a fixed date, such as an event or a product launch, we can speed things up.',
      'يستغرق موقع الشركة من 12 إلى 18 صفحة عادةً من 6 إلى 10 أسابيع، والمتجر الإلكتروني أو المنصة الأكبر من 10 إلى 16 أسبوعاً. نعمل على مراحل كل أسبوعين، فترى تقدماً حقيقياً بانتظام وتعرف دائماً أين وصلنا. وإذا كان لديك موعد محدد، مثل فعالية أو إطلاق منتج، يمكننا تسريع العمل.',
    ),
  },
  'faq-web-development-2': {
    question: L('Do you handle hosting and maintenance?', 'هل تتولّون الاستضافة والصيانة؟'),
    answer: L(
      'Yes. We host on reliable cloud infrastructure with a global CDN and SSL. Our monthly maintenance plans cover security updates, software updates, content changes and performance monitoring, and we respond to any downtime within 4 hours. Many clients combine this with SEO so one team looks after the whole site.',
      'نعم. نستضيف المواقع على بنية سحابية موثوقة مع شبكة CDN عالمية وشهادة SSL. وتشمل خطط الصيانة الشهرية التحديثات الأمنية وتحديث البرمجيات وتعديلات المحتوى ومراقبة الأداء، ونستجيب لأي انقطاع خلال 4 ساعات. ويجمع كثير من العملاء ذلك مع خدمة SEO ليتولى فريق واحد الموقع بالكامل.',
    ),
  },
  'faq-web-development-3': {
    question: L('Will my website work in both English and Arabic?', 'هل سيعمل موقعي بالعربية والإنجليزية؟'),
    answer: L(
      'Yes. Every site we build is bilingual from the start. Arabic gets a proper right-to-left layout, not just flipped text, and each language has its own web addresses so Google shows the right version. We write the Arabic properly instead of running it through a translator, and your team manages both languages from one place. Visitors switch language with one click.',
      'نعم. كل موقع نبنيه ثنائي اللغة من البداية. تحصل العربية على تصميم صحيح من اليمين إلى اليسار لا مجرد نص معكوس، ولكل لغة روابطها الخاصة ليعرض Google النسخة المناسبة. نكتب المحتوى العربي بعناية بدلاً من الترجمة الآلية، ويدير فريقك اللغتين من مكان واحد، ويبدّل الزائر اللغة بنقرة واحدة.',
    ),
  },
  'faq-web-development-4': {
    question: L('I already have a website. Can you fix it or rebuild it?', 'لدي موقع بالفعل. هل يمكنكم إصلاحه أو إعادة بنائه؟'),
    answer: L(
      'Of course. We start with a free review of the technical side, SEO, mobile experience and how well it turns visitors into enquiries. If the foundation is solid, we suggest targeted fixes. If it is costing you customers, we recommend a rebuild. Either way you keep your domain, your content and your current rankings, because we move everything over carefully.',
      'بالتأكيد. نبدأ بمراجعة مجانية للجانب التقني وSEO وتجربة الجوال ومدى قدرة الموقع على تحويل الزوار إلى استفسارات. فإن كان الأساس متيناً نقترح إصلاحات محددة، وإن كان يكلّفك عملاء نوصي بإعادة البناء. وفي الحالتين تحتفظ بنطاقك ومحتواك وترتيبك الحالي، لأننا ننقل كل شيء بعناية.',
    ),
  },
  'faq-web-development-5': {
    question: L('Is Node.js a good choice for a business website?', 'هل Node.js خيار جيد لموقع شركة؟'),
    answer: L(
      'Yes. Node.js runs the back end of many large websites and apps because it is fast, copes well with lots of visitors at once and uses the same language as the front end. For you that means quicker development, dependable integrations and a site that keeps up as you grow.',
      'نعم. يشغّل Node.js الأنظمة الخلفية لكثير من المواقع والتطبيقات الكبيرة لأنه سريع ويتعامل جيداً مع عدد كبير من الزوار في وقت واحد، ويستخدم اللغة نفسها المستخدمة في الواجهة. وهذا يعني لك تطويراً أسرع وتكاملات موثوقة وموقعاً يواكب نموك.',
    ),
  },
  'faq-web-development-6': {
    question: L('Is a headless website more expensive than WordPress?', 'هل الموقع بتقنية Headless أغلى من WordPress؟'),
    answer: L(
      'It usually costs more to build than a WordPress site based on a ready-made theme, because everything is made for you. Over two or three years it often works out the same or cheaper: fewer plugin licences, fewer security fixes, less speed tuning, and a site your team can update without paying a developer.',
      'تكون تكلفة بنائه عادةً أعلى من موقع WordPress قائم على قالب جاهز، لأن كل شيء يُصنع خصيصاً لك. لكن على مدى سنتين أو ثلاث غالباً ما تتساوى التكلفة أو تقل: تراخيص إضافات أقل، وإصلاحات أمنية أقل، وضبط سرعة أقل، وموقع يحدّثه فريقك دون دفع أجور مطوّر.',
    ),
  },
}

// ─── HEC Mannai portfolio project (CMS kept generic, no long dashes) ────────
const HEC = {
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
}

// ─── Portfolio page + Denza (remove long dashes) ────────────────────────────
const PORTFOLIO_PAGE = {
  subtitle: L(
    'Company websites, online stores and web portals we have built for brands in Qatar and the GCC. Fast, bilingual and easy for your own team to update.',
    'مواقع شركات ومتاجر إلكترونية وبوابات ويب بنيناها لعلامات تجارية في قطر ودول الخليج. سريعة وثنائية اللغة وسهلة التحديث من فريقك.',
  ),
  'seo.metaDescription': L(
    'Websites designed and built by M&M Marketing for brands in Qatar and the GCC: company sites, online stores and web portals on modern technology.',
    'مواقع صممتها وبنتها M&M للتسويق لعلامات تجارية في قطر والخليج: مواقع شركات ومتاجر إلكترونية وبوابات ويب بتقنيات حديثة.',
  ),
}

const DENZA_OVERVIEW = L(
  'DENZA is where the elegance of East and West come together, a blend of technology and poetry.\n\nFounded in 2010 as a joint venture between BYD and Mercedes-Benz, DENZA set out to redefine the driving experience through innovation, intelligence and refined design.\n\nIn 2024, DENZA became BYD’s fully owned premium brand, opening a new chapter in technology-led mobility.',
  'دينزا هي المكان الذي تلتقي فيه أناقة الشرق والغرب، مزيج من التكنولوجيا والشعر.\n\nتأسست DENZA في عام 2010 كمشروع مشترك بين BYD وMercedes-Benz، بهدف إعادة تعريف تجربة القيادة من خلال الابتكار والذكاء والتصميم الراقي.\n\nوفي عام 2024، أصبحت DENZA العلامة الفاخرة المملوكة بالكامل لشركة BYD، لتبدأ فصلاً جديداً في التنقل القائم على التكنولوجيا.',
)

// ─── run ────────────────────────────────────────────────────────────────────
function assertNoLongDashes(label: string, value: unknown) {
  const s = JSON.stringify(value)
  if (/[—–]/.test(s)) throw new Error(`Long dash found in ${label}`)
}

async function run() {
  assertNoLongDashes('service', service)
  assertNoLongDashes('sections', sections)
  assertNoLongDashes('faqs', FAQS)
  assertNoLongDashes('hec', HEC)
  assertNoLongDashes('portfolioPage', PORTFOLIO_PAGE)
  assertNoLongDashes('denza', DENZA_OVERVIEW)

  await client
    .patch(SERVICE_ID)
    .set({
      description: service.description,
      whatWeBuildTitle: service.whatWeBuildTitle,
      content: service.content,
      whyItMattersTitle: service.whyItMattersTitle,
      whyItMatters: service.whyItMatters,
      deliverablesTitle: service.deliverablesTitle,
      deliverables: service.deliverables.map((d, i) => ({_key: `d${i}`, _type: 'localeString', ...d})),
      projectsTitle: service.projectsTitle,
      ctaTitle: service.ctaTitle,
      ctaText: service.ctaText,
      formSubtitle: service.formSubtitle,
      'seo.metaDescription': service.metaDescription,
      sections,
    })
    .commit()
  console.log('✓ Web Development page copy rewritten')

  for (const [id, f] of Object.entries(FAQS)) {
    const exists = await client.fetch<string | null>(`*[_id == $id][0]._id`, {id})
    if (!exists) {
      console.warn(`! FAQ ${id} not found, skipped`)
      continue
    }
    await client.patch(id).set(f).commit()
  }
  console.log(`✓ ${Object.keys(FAQS).length} FAQs rewritten`)

  const lp = await client.fetch<string | null>(`*[_id == $id && count(faqs.items[_key == $key]) > 0][0]._id`, {
    id: LP_ID,
    key: LP_COST_FAQ_KEY,
  })
  if (lp) {
    await client.patch(LP_ID).set({[`faqs.items[_key=="${LP_COST_FAQ_KEY}"].answer`]: COST}).commit()
    console.log('✓ Landing page cost FAQ updated')
  }

  const hec = await client.fetch<string | null>(`*[_id == $id][0]._id`, {id: HEC_ID})
  if (hec) {
    await client
      .patch(HEC_ID)
      .set({
        ...HEC,
        features: HEC.features.map((f, i) => ({_key: `f${i}`, _type: 'localeString', ...f})),
        seo: {_type: 'seo', ...HEC.seo},
      })
      .commit()
    console.log('✓ HEC Mannai portfolio copy updated')
  }

  if (await client.fetch<string | null>(`*[_id == "portfolioPage"][0]._id`)) {
    await client.patch('portfolioPage').set(PORTFOLIO_PAGE).commit()
    console.log('✓ Portfolio page intro updated')
  }

  if (await client.fetch<string | null>(`*[_id == "webProject-denza-qatar"][0]._id`)) {
    await client.patch('webProject-denza-qatar').set({overview: DENZA_OVERVIEW}).commit()
    console.log('✓ Denza Qatar overview updated')
  }

  // Gallery alt texts on HEC used a long dash
  const gallery = await client.fetch<{_key: string}[] | null>(`*[_id == $id][0].gallery[]{_key}`, {id: HEC_ID})
  for (const [i, g] of (gallery || []).entries()) {
    await client
      .patch(HEC_ID)
      .set({[`gallery[_key=="${g._key}"].alt`]: L(`Mannai HEC website, screenshot ${i + 1}`, `موقع مناعي HEC، لقطة ${i + 1}`)})
      .commit()
  }

  console.log('\nDone. Live on mnmagency.com within about a minute.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
