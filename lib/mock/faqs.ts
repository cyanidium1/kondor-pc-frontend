import type { Faq } from "@/types/build";

export const FAQS: Faq[] = [
  // GLOBAL — для главной
  {
    key: "g-warranty",
    scope: "global",
    question: "Яка гарантія на ваші ПК?",
    answer:
      "Базова гарантія 12 місяців від Kondor PC + оригінальна гарантія виробника на кожен компонент (2–3 роки). Можна продовжити до 3 років при покупці.",
  },
  {
    key: "g-parts",
    scope: "global",
    question: "Чи є розстрочка?",
    answer:
      "Так. Monobank Частинами (4 платежі без %), ПриватБанк (до 9 платежів), ПУМБ (до 12 місяців). Оформлюється онлайн за 2 хвилини.",
  },
  {
    key: "g-delivery",
    scope: "global",
    question: "Скільки йде доставка?",
    answer:
      "1–3 дні Новою Поштою по всій Україні, безкоштовно. Київ — кур'єром у день відправки.",
  },
  {
    key: "g-assembly",
    scope: "global",
    question: "За скільки збираєте ПК?",
    answer:
      "3–5 днів від оплати. Кожен ПК проходить 4-годинний стрес-тест перед відправкою.",
  },
  {
    key: "g-showroom",
    scope: "global",
    question: "Можна подивитися ПК перед покупкою?",
    answer:
      "Так, у нашому шоурумі в Києві, щодня з 10:00 до 20:00. Адреса в контактах.",
  },
  // BUILD — для страниц сборок
  {
    key: "b-gta6",
    scope: "build",
    question: "Чи потягне цей ПК GTA VI?",
    answer:
      "За нашою оцінкою — так, на середніх налаштуваннях у Full HD. Оновимо точні тести після релізу гри.",
  },
  {
    key: "b-monitor",
    scope: "build",
    question: "Який монітор мені підійде?",
    answer:
      "Для Full HD геймінгу — 24–27″ з 144 Гц і часом відгуку до 5 мс. Популярні моделі в розділі «Аксесуари».",
  },
  {
    key: "b-power",
    scope: "build",
    question: "Скільки споживає електроенергії?",
    answer:
      "Близько 350 Вт у грі. За рік при 2 годинах гри на день — приблизно 250 ₴.",
  },
  {
    key: "b-upgrade",
    scope: "build",
    question: "Чи можна додати SSD в майбутньому?",
    answer:
      "Так. В материнській платі є вільні M.2 слоти — можна додати до 2 ТБ NVMe.",
  },
  {
    key: "b-return",
    scope: "build",
    question: "А якщо мені не сподобається?",
    answer:
      "Повертаємо кошти протягом 14 днів без пояснень — за законом «Про захист прав споживачів».",
  },
];

export function faqByKey(key: string): Faq | undefined {
  return FAQS.find((f) => f.key === key);
}

export function faqsByScope(scope: Faq["scope"]): Faq[] {
  return FAQS.filter((f) => f.scope === scope);
}
