import type { LandingPage } from "../../types/landingPage";

export const montazh4kLanding: LandingPage = {
  slug: "montazh-4k",
  type: "use_case",
  context: { refType: "use_case", refSlug: "montazh-4k" },
  seo: {
    title: "ПК для монтажу 4К відео — збірки для Premiere та DaVinci",
    description:
      "Робочі станції для відеомонтажу 4К/8К. NVIDIA RTX, 32-64 GB RAM, NVMe Gen4 SSD. Готові до Premiere Pro, DaVinci Resolve, Final Cut.",
  },
  sections: [
    { _key: "m1", _type: "breadcrumbs" },

    {
      _key: "m2",
      _type: "heroWithBuild",
      h1: "ПК ДЛЯ МОНТАЖУ 4К ВІДЕО",
      subtitle:
        "Збірки під Premiere Pro, DaVinci Resolve та Final Cut. Без фризів на таймлайні.",
      buildSlug: "orbitra",
    },

    {
      _key: "m3",
      _type: "anchorNav",
      items: [
        { label: "Що важливо", anchor: "what-matters" },
        { label: "Залізо", anchor: "hardware" },
        { label: "Збірки", anchor: "builds" },
        { label: "Переваги", anchor: "features" },
        { label: "FAQ", anchor: "faq" },
      ],
    },

    {
      _key: "m4",
      _type: "textBlock",
      anchor: "what-matters",
      maxWidth: "narrow",
      heading: "Що насправді важливо для монтажу 4К",
      content: [
        {
          type: "p",
          children: [
            {
              type: "text",
              text: "У відеомонтажі вузьке місце — не «потужний ПК взагалі», а конкретні компоненти під конкретні задачі. Розглянемо що насправді впливає на швидкість роботи.",
            },
          ],
        },
        { type: "h3", text: "Процесор — для рендеру та ефектів" },
        {
          type: "p",
          children: [
            {
              type: "text",
              text: "Adobe Premiere Pro та DaVinci Resolve активно використовують усі ядра процесора при експорті. Для 4К комфортно працювати на 8 ядрах, для 8К — 12+. ",
            },
            { type: "text", text: "AMD Ryzen 9 та Intel Core i9", bold: true },
            {
              type: "text",
              text: " — найкращий вибір. Ryzen 7 X3D-серії — компроміс, якщо ще плануєте грати.",
            },
          ],
        },
        { type: "h3", text: "Відеокарта — для прев'ю та ефектів" },
        {
          type: "p",
          children: [
            {
              type: "text",
              text: "GPU прискорює відтворення таймлайну (особливо з ефектами та LUT), кольорокорекцію в DaVinci та частково рендер. ",
            },
            { type: "text", text: "NVIDIA RTX", bold: true },
            {
              type: "text",
              text: " має апаратний кодек NVENC — потрібен для швидкого експорту H.264/H.265 на YouTube/Instagram.",
            },
          ],
        },
        {
          type: "h3",
          text: "Оперативна пам'ять — для багатошарових таймлайнів",
        },
        {
          type: "p",
          children: [
            {
              type: "text",
              text: "Мінімум для 4К — 32 GB. Для роботи з 8К, кольорокорекцією на 6+ доріжках одночасно або багатогодинними проєктами — 64 GB.",
            },
          ],
        },
        { type: "h3", text: "Накопичувач — швидкість читання вирішує все" },
        {
          type: "p",
          children: [
            {
              type: "text",
              text: "NVMe Gen4 SSD дає 7000 MB/s читання — це означає миттєвий перегляд 4К RAW без проксі. Жодний SATA SSD, а тим паче HDD, не дасть такої швидкості. Окремий диск під кеш Premiere/Resolve — обов'язково.",
            },
          ],
        },
      ],
    },

    {
      _key: "m5",
      _type: "imageTextSplit",
      anchor: "hardware",
      image: {
        src: "/use-cases/timeline.jpg",
        alt: "Таймлайн у DaVinci Resolve без фризів",
        caption: "DaVinci Resolve · 4К · 8 відеодоріжок",
      },
      imagePosition: "right",
      heading: "Що ви отримуєте з нашою збіркою",
      content: [
        {
          type: "list",
          items: [
            [
              {
                type: "text",
                text: "Прев'ю 4К ProRes на повну якість без проксі",
              },
            ],
            [
              {
                type: "text",
                text: "Експорт 10-хвилинного 4К ролика в H.265 за 3-5 хвилин (NVENC)",
              },
            ],
            [
              {
                type: "text",
                text: "Кольорокорекція у DaVinci Resolve у режимі real-time",
              },
            ],
            [
              {
                type: "text",
                text: "Робота з 6+ відеодоріжками без втрати швидкості скрабу",
              },
            ],
            [
              {
                type: "text",
                text: "Експорт у Premiere та паралельний серфінг — без фризів усієї системи",
              },
            ],
          ],
        },
      ],
      cta: {
        text: "Підібрати ПК під свій workflow",
        href: "/pidbir?type=montazh",
      },
    },

    {
      _key: "m6",
      _type: "buildsRow",
      anchor: "builds",
      heading: "РЕКОМЕНДОВАНІ ЗБІРКИ ПІД МОНТАЖ",
      subheading: "Від базового 4К до робочої станції 8К",
      buildSlugs: ["nebula", "orbitra"],
    },

    {
      _key: "m7",
      _type: "featureList",
      anchor: "features",
      heading: "ЧОМУ KONDOR ДЛЯ РОБОТИ",
      columns: 3,
      features: [
        {
          icon: "shield",
          title: "Гарантія 3 роки на компоненти",
          text: "Включно з безкоштовною заміною при заводському браку.",
        },
        {
          icon: "tools",
          title: "Тестування у реальних задачах",
          text: "Кожна збірка проходить 24-годинний стрес-тест перед відправкою.",
        },
        {
          icon: "truck",
          title: "Доставка у подвійній коробці",
          text: "Безкоштовно Новою Поштою по всій Україні.",
        },
        {
          icon: "cpu",
          title: "Підбір під твоє ПЗ",
          text: "Premiere, DaVinci, Final Cut — кожний має свої акценти. Підкажемо.",
        },
        {
          icon: "headset",
          title: "Підтримка у Telegram",
          text: "Відповідаємо протягом години у робочий час.",
        },
        {
          icon: "chart",
          title: "Реальні бенчмарки",
          text: "Не маркетинг — реальні цифри експорту на ваших проєктах.",
        },
      ],
    },

    {
      _key: "m8",
      _type: "imageFull",
      image: { src: "/use-cases/workstation.jpg", alt: "Робоче місце з ORBITRA" },
      aspectRatio: "21/9",
    },

    {
      _key: "m9",
      _type: "ctaWizardPrefilled",
      heading: "РОЗКАЖИ ПРО СВОЇ ПРОЄКТИ — ПІДБЕРЕМО ТОЧНУ ЗБІРКУ",
      buttonText: "Підібрати ПК для монтажу за 30 секунд",
    },

    {
      _key: "m10",
      _type: "faqAccordion",
      anchor: "faq",
      heading: "ЧАСТІ ПИТАННЯ ПРО ПК ДЛЯ МОНТАЖУ",
      items: [
        {
          question: "Чи піде ваша збірка для DaVinci Resolve Studio?",
          answer:
            "Так. NEBULA та ORBITRA повністю покривають Resolve Studio з кольорокорекцією у real-time на 4К матеріалі.",
        },
        {
          question: "Скільки RAM реально потрібно?",
          answer:
            "32 GB — мінімум для комфорту в 4К. 64 GB — якщо працюєте з 8К або довгими проєктами в Premiere з купою ефектів.",
        },
        {
          question: "Чи потрібна професійна Quadro/RTX A-серія?",
          answer:
            "Ні. Споживчі RTX 5060 Ti та RTX 5070 Ti дають той самий результат у Premiere/Resolve, але коштують у 2-3 рази дешевше. Quadro потрібна тільки для CAD/SolidWorks.",
        },
        {
          question: "Чи можна на цій збірці одночасно грати?",
          answer:
            "Так — ORBITRA однаково добре справляється і з монтажем 4К, і з 4К-геймінгом. Це універсальна робоча станція.",
        },
        {
          question: "Чи потрібен окремий диск під кеш?",
          answer:
            "Дуже рекомендуємо. У наших збірках є один NVMe — для кешу Premiere/Resolve можемо додати другий за окрему плату. Це прискорить рендер ще на 20-30%.",
        },
      ],
    },
  ],
};
