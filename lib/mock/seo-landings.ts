import type { Resolution, SkuSlug } from "@/types/build";

export type LandingType = "by_game" | "by_budget" | "by_task";

export interface SeoLanding {
  slug: string;
  type: LandingType;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  body: Array<{ heading: string; paragraphs: string[]; list?: string[] }>;
  faqs: { question: string; answer: string }[];
  filter: {
    gameSlug?: string;
    budgetMaxUah?: number;
    resolution?: Resolution;
    maxBuilds?: number;
    onlySlugs?: SkuSlug[];
  };
}

export const SEO_LANDINGS: SeoLanding[] = [
  {
    slug: "pk-dlya-cs2",
    type: "by_game",
    title: "Ігровий ПК для CS2 у 2026 — купити з доставкою по Україні",
    metaDescription:
      "ПК для Counter-Strike 2 від 20 000 грн. Стабільні 300+ FPS у Full HD, 240+ у 2K. Реальні тести, гарантія до 3 років, доставка НП.",
    h1: "Ігрові ПК для Counter-Strike 2",
    intro:
      "CS2 — одна з найпопулярніших кіберспортивних ігор в Україні. Для комфортної гри на моніторі 144 Гц потрібно стабільно отримувати 300+ FPS. Наші збірки дають саме такий FPS у Full HD на високих налаштуваннях. Гарантія до 3 років та безкоштовна доставка Новою Поштою.",
    body: [
      {
        heading: "Що впливає на FPS у CS2",
        paragraphs: [
          "CS2 переважно залежить від процесора — саме він відповідає за обробку фізики гри. Відеокарта впливає менше, але важлива для високих налаштувань графіки.",
          "Оптимальна збірка для CS2 у 2026 році: CPU Ryzen 5 7500F або Intel i5-13400F, GPU RTX 5060 або RX 7600, 32 ГБ DDR5.",
        ],
      },
      {
        heading: "Який монітор обрати для CS2",
        list: [
          "144 Гц — мінімум для FPS-ігор",
          "240 Гц — для серйозних гравців",
          "360 Гц — для професіоналів",
          "Час відгуку: 1 мс (IPS або TN)",
          "Розмір: 24–27″ Full HD або 27″ 1440p",
        ],
        paragraphs: [],
      },
    ],
    faqs: [
      {
        question: "Скільки FPS дають ваші ПК у CS2?",
        answer:
          "VEGA — 380 FPS у Full HD, NEBULA — 420 FPS, ORBITRA — 500+ FPS. Усі значення виміряні на нашій лабораторії при налаштуваннях «Високі».",
      },
      {
        question: "Яку збірку обрати для кіберспорту?",
        answer:
          "Для серйозних матчів — NEBULA або ORBITRA з GPU RTX 5060 Ti+. Вони дають стабільні 240+ FPS у 2K на моніторі 240 Гц.",
      },
    ],
    filter: { gameSlug: "cs2", maxBuilds: 4 },
  },
  {
    slug: "pk-dlya-warzone",
    type: "by_game",
    title: "Ігровий ПК для Warzone — стабільні 144+ FPS | Kondor PC",
    metaDescription:
      "ПК для Call of Duty Warzone від 35 000 грн. Стабільні 144+ FPS у Full HD на високих. Реальні тести, гарантія 3 роки, безкоштовна доставка.",
    h1: "Ігрові ПК для Call of Duty: Warzone",
    intro:
      "Warzone — одна з найвимогливіших Battle Royale ігор 2026 року. Для стабільної гри без мікро-фризів потрібен потужний ПК з балансом CPU та GPU. Ми тестували кожну збірку саме на Warzone — показуємо реальні FPS, а не рекламні цифри.",
    body: [
      {
        heading: "Що потрібно для Warzone",
        paragraphs: [
          "Warzone активно використовує і процесор, і відеокарту — на відміну від CS2, тут важливе і те, і інше.",
        ],
        list: [
          "Ryzen 5 7500F або Intel i5-13400F",
          "RTX 5060 або RX 7600",
          "32 ГБ DDR5",
          "SSD NVMe (обов'язково, гра важить 150+ ГБ)",
        ],
      },
      {
        heading: "Які налаштування обрати",
        paragraphs: [
          "Для Warzone не женися за «Ультра». Краще стабільні 144+ FPS на високих, ніж 60 FPS на ультра. Вимикай Ray Tracing — він не додає переваги в Battle Royale.",
        ],
      },
    ],
    faqs: [
      {
        question: "Чи тягне Warzone у 4K?",
        answer:
          "ORBITRA та VELAR дають стабільні 95–100 FPS у 4K на високих. Для 4K з Ray Tracing потрібен ще потужніший ПК.",
      },
    ],
    filter: { gameSlug: "warzone", maxBuilds: 4 },
  },
  {
    slug: "pk-dlya-gta5",
    type: "by_game",
    title: "Ігровий ПК для GTA V та GTA VI — купити з доставкою",
    metaDescription:
      "Потужні ПК для GTA V і майбутньої GTA VI. Стабільні 144 FPS Full HD, 2K геймінг, моддінг, RTX. Від 30 000 грн.",
    h1: "Ігрові ПК для GTA V та GTA VI",
    intro:
      "GTA V досі залишається однією з найпопулярніших ігор 2026 року, а з виходом GTA VI ПК стають ще актуальнішими. Наші збірки тестувались саме на GTA V у різних налаштуваннях — від стабільних 60 FPS на мінімалках до 144+ FPS на ультра з модами. Плюс — запас на GTA VI.",
    body: [
      {
        heading: "Які компоненти важливі для GTA",
        paragraphs: [
          "GTA V і GTA VI — це відкритий світ, який навантажує одночасно CPU, GPU і оперативну пам'ять.",
        ],
        list: [
          "Ryzen 5 7500F або Intel i5-13400F",
          "RTX 5060 або RX 7600",
          "32 ГБ DDR5 (16 ГБ вже замало)",
          "SSD 500 ГБ+ NVMe (гра важить 150 ГБ з модами)",
        ],
      },
      {
        heading: "Моддінг GTA V — що потрібно",
        paragraphs: [
          "Якщо плануєш моди (LSPDFR, NaturalVision, ENB), орієнтир — 32 ГБ RAM, RTX 5070 або вище, 1 ТБ SSD для мап та модів.",
        ],
      },
    ],
    faqs: [
      {
        question: "Чи потягне ПК GTA VI на релізі?",
        answer:
          "За офіційними вимогами Rockstar, для 60 FPS у 1440p знадобиться щось на рівні RTX 5070 + Ryzen 7. ORBITRA та VELAR — це покривають із запасом.",
      },
    ],
    filter: { gameSlug: "gta5", maxBuilds: 4 },
  },
  {
    slug: "igroviy-pk-do-40000-grn",
    type: "by_budget",
    title: "Ігровий ПК до 40 000 грн — збірки 2026 | Kondor PC",
    metaDescription:
      "Готові ігрові ПК до 40 000 грн. Full HD на високих, 144 FPS у Warzone, CS2, Fortnite. Гарантія 3 роки, доставка НП безкоштовно.",
    h1: "Ігрові ПК до 40 000 гривень",
    intro:
      "За 40 000 гривень у 2026 році можна отримати ПК, який комфортно тягне всі сучасні ігри у Full HD на високих. Нижче — 3 перевірені збірки з цього діапазону, зібрані нами та протестовані на популярних іграх.",
    body: [
      {
        heading: "Що очікувати від ПК до 40 000 грн",
        list: [
          "144+ FPS у CS2, Valorant, Dota 2, Fortnite (Full HD)",
          "80–120 FPS у Warzone, Cyberpunk (Full HD, високі)",
          "60+ FPS у 2K для більшості ігор",
          "Запас на 2–3 роки без апгрейду",
        ],
        paragraphs: [],
      },
      {
        heading: "Що ми НЕ рекомендуємо в цьому бюджеті",
        list: [
          "RTX 5070 і вище — не поміщається без економії на інших компонентах",
          "Менше 32 ГБ ОЗП — у 2026 це мінімум для комфорту",
          "HDD замість SSD — ігри завантажуватимуться по 2–3 хвилини",
        ],
        paragraphs: [],
      },
    ],
    faqs: [
      {
        question: "Чи тягне ПК до 40 000 ₴ GTA VI?",
        answer:
          "За нашою оцінкою — так, на середніх налаштуваннях у Full HD. Точні тести оновимо після релізу гри.",
      },
    ],
    filter: { budgetMaxUah: 40000, maxBuilds: 4 },
  },
  {
    slug: "igroviy-pk-do-25000-grn",
    type: "by_budget",
    title: "Ігровий ПК до 25 000 грн — бюджетні збірки 2026",
    metaDescription:
      "Доступні ігрові ПК до 25 000 грн. Full HD геймінг, 144+ FPS у CS2, Dota 2, Fortnite. Гарантія 12 місяців, доставка НП безкоштовно.",
    h1: "Ігрові ПК до 25 000 гривень",
    intro:
      "Бюджетний сегмент ігрових ПК — Full HD геймінг у популярних онлайн-іграх. Саме те, що потрібно школяру, студенту або для першого досвіду.",
    body: [
      {
        heading: "Що вміють ПК у цьому бюджеті",
        list: [
          "200+ FPS у CS2, Valorant, Fortnite (Full HD)",
          "60+ FPS у Warzone, Cyberpunk на середніх",
          "Запас на легкий стрім у Discord",
        ],
        paragraphs: [],
      },
    ],
    faqs: [
      {
        question: "Чи вистачить ПК у 25k для Warzone?",
        answer:
          "NYX та COMET дають 110–130 FPS у Warzone на Full HD. Комфортно для казуальної гри, для серйозних матчів — розглянь ПК 30–35k.",
      },
    ],
    filter: { budgetMaxUah: 25000, maxBuilds: 3 },
  },
  {
    slug: "kupyty-igroviy-pk-kyiv",
    type: "by_task",
    title: "Купити ігровий ПК у Києві — Kondor PC шоурум",
    metaDescription:
      "Ігрові ПК у Києві: шоурум, самовивіз, кур'єр того ж дня. 8+ готових збірок. Подивись ПК перед покупкою. Гарантія до 3 років.",
    h1: "Купити ігровий ПК у Києві",
    intro:
      "Якщо ти у Києві — найзручніший спосіб купити ПК у Kondor PC. У нашому шоурумі ти можеш подивитися збірку, поспілкуватися з інженером і забрати ПК одразу. Або замовити доставку кур'єром по місту того ж дня.",
    body: [
      {
        heading: "Способи отримання в Києві",
        list: [
          "Самовивіз зі шоуруму — безкоштовно, у зручний час",
          "Кур'єр по Києву — 200–400 ₴, доставка того ж дня",
          "Нова Пошта — відділення по всьому Києву, 1 день",
        ],
        paragraphs: [],
      },
      {
        heading: "Чому купувати у нас",
        list: [
          "Офіційний продавець (ФОП), усі документи",
          "Збираємо під замовлення — свіже залізо, не з вітрини",
          "Гарантія 12 місяців + гарантія виробника",
          "Безкоштовний сервіс у разі поломки протягом року",
        ],
        paragraphs: [],
      },
    ],
    faqs: [
      {
        question: "Де ваш шоурум?",
        answer:
          "[Адреса буде заповнена], 5 хвилин від метро [станція]. Працюємо щодня 10:00–20:00. Перед візитом зателефонуй або напиши в Telegram.",
      },
    ],
    filter: { maxBuilds: 6 },
  },
];

export const RESERVED_SEO_SLUGS = new Set<string>([
  "pk",
  "pidbir",
  "sborka",
  "garantiya",
  "dostavka-oplata",
  "kontakty",
  "koshyk",
  "oformlennya",
  "legal",
  "styleguide",
  "api",
]);

export function seoLandingBySlug(slug: string): SeoLanding | undefined {
  if (RESERVED_SEO_SLUGS.has(slug)) return undefined;
  return SEO_LANDINGS.find((l) => l.slug === slug);
}
