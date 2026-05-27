import type { LandingPage } from "../../types/landingPage";

export const cs2Landing: LandingPage = {
  slug: "cs2",
  type: "game",
  context: { refType: "game", refSlug: "cs2" },
  seo: {
    title: "ПК для Counter-Strike 2 — реальний FPS під твій бюджет",
    description:
      "Збірки ПК для CS2 з реальними FPS. VEGA — 380 FPS у Full HD, NEBULA — 500 FPS competitive, ORBITRA — 4К. Гарантія 3 роки.",
  },
  sections: [
    { _key: "s1", _type: "breadcrumbs" },
    {
      _key: "s2",
      _type: "heroWithBuild",
      h1: "ПК ДЛЯ COUNTER-STRIKE 2",
      subtitle: "Реальний FPS у твоїй грі, а не абстрактні характеристики",
      buildSlug: "vega",
    },
    { _key: "s2b", _type: "statsStrip" },
    {
      _key: "s3",
      _type: "anchorNav",
      items: [
        { label: "Вимоги", anchor: "requirements" },
        { label: "FPS", anchor: "fps" },
        { label: "Збірки", anchor: "builds" },
        { label: "Налаштування", anchor: "settings" },
        { label: "Відгуки", anchor: "reviews" },
        { label: "FAQ", anchor: "faq" },
      ],
    },
    { _key: "s4", _type: "specsSystemRequirements", anchor: "requirements" },
    {
      _key: "s5",
      _type: "fpsTablePerGame",
      anchor: "fps",
      resolutions: ["1080p", "1440p", "4K"],
    },
    {
      _key: "s5a",
      _type: "textBlock",
      maxWidth: "narrow",
      heading: "Чому FPS у CS2 важливіший за роздільну здатність",
      content: [
        {
          type: "p",
          children: [
            {
              type: "text",
              text: "У Counter-Strike 2 кожен кадр — це інформація. На 60 FPS гравець бачить світ із затримкою 16 мс між кадрами, на 240 FPS — 4 мс. Це не «красивіша картинка», це ",
            },
            {
              type: "text",
              text: "фізична перевага в реакції",
              bold: true,
            },
            {
              type: "text",
              text: ". Саме тому профі грають на 240+ Гц моніторах у Full HD, а не на 4К у 60 Гц.",
            },
          ],
        },
        {
          type: "p",
          children: [
            {
              type: "text",
              text: "Усі три наші збірки тримають вище 240 FPS у 1080p на competitive-налаштуваннях. Різниця між ними — у тому, що вище 240 FPS вже неважливо, але важлива стабільність і запас на майбутні оновлення гри.",
            },
          ],
        },
      ],
    },
    {
      _key: "s6",
      _type: "productRecommendedForGame",
      anchor: "builds",
      heading: "ТРИ ЗБІРКИ ПІД CS2 — ОБИРАЙ ЗА БЮДЖЕТОМ",
    },
    { _key: "s7", _type: "specsGraphicsSettings", anchor: "settings" },
    {
      _key: "s8",
      _type: "socialTestimonialForGame",
      anchor: "reviews",
      limit: 2,
    },
    {
      _key: "s8a",
      _type: "featureList",
      heading: "ЧОМУ ПК ДЛЯ CS2 ВІД KONDOR",
      columns: 3,
      features: [
        {
          icon: "chart",
          title: "380+ FPS у Full HD",
          text: "Реальні цифри з наших тестових збірок, не маркетингові обіцянки.",
        },
        {
          icon: "shield",
          title: "Гарантія 3 роки",
          text: "На усі компоненти, включно з безкоштовною заміною у разі заводського браку.",
        },
        {
          icon: "zap",
          title: "Збирання за 3-5 днів",
          text: "Тестування 24 години в режимі стрес-тесту перед відправкою.",
        },
      ],
    },
    {
      _key: "s9",
      _type: "ctaWizardPrefilled",
      heading: "НЕ ЗНАЄШ ЯКУ ОБРАТИ?",
      buttonText: "Підібрати ПК для CS2",
    },
    {
      _key: "s10",
      _type: "faqAccordion",
      anchor: "faq",
      heading: "ЧАСТІ ПИТАННЯ ПРО ПК ДЛЯ CS2",
      items: [
        {
          question: "Чи піде CS2 на 144 Гц моніторі?",
          answer:
            "Так, навіть базова збірка VEGA видає стабільні 380 FPS у Full HD — цього вистачить для 240 Гц моніторів.",
        },
        {
          question: "Скільки оперативної пам'яті потрібно для CS2?",
          answer:
            "Мінімум 8 GB за вимогами Valve, але рекомендуємо 16 GB або 32 GB — особливо якщо одночасно стрімите або відкриваєте Discord/браузер.",
        },
        {
          question: "Чи варто переплачувати за RTX-карту для CS2?",
          answer:
            "Для самої CS2 — ні. Але RTX-карта стане у нагоді в інших іграх, та має NVENC для якісних стрімів.",
        },
        {
          question: "VEGA чи NEBULA для CS2 — у чому різниця?",
          answer:
            "VEGA дає 380 FPS у Full HD — оптимально якщо граєте на 1080p моніторі. NEBULA — 380 FPS у 1440p, обирайте якщо плануєте 2К монітор або стрімінг.",
        },
        {
          question: "Який монітор обрати для CS2?",
          answer:
            "Для competitive — 1080p 240/360 Гц. Для casual — 1440p 165 Гц. Жодного сенсу брати 4К — у CS2 важлива швидкість, а не роздільна здатність.",
        },
        {
          question: "Чи буде стабільні 300+ FPS у напружених замісах?",
          answer:
            "Так. Усі наші збірки тримають заявлений FPS навіть у Inferno mid та Mirage A site з димами та гранатами.",
        },
      ],
    },
  ],
};
