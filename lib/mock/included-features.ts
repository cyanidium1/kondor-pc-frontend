import type { IncludedFeature } from "@/types/build";

export const INCLUDED_FEATURES: IncludedFeature[] = [
  { key: "assembly", title: "Збірка та налаштування", description: "Наші інженери збирають твій ПК вручну", icon: "wrench" },
  { key: "stress-test", title: "Стрес-тест 4 години", description: "Перевірка під максимальним навантаженням", icon: "flame" },
  { key: "windows", title: "Windows 11 Home", description: "Ліцензія, встановлена, з драйверами", icon: "monitor" },
  { key: "office", title: "Базовий офісний пакет", description: "LibreOffice встановлений безкоштовно", icon: "file-text" },
  { key: "video-report", title: "Фото- та відеозвіт", description: "Знімаємо готовий ПК перед відправкою", icon: "camera" },
  { key: "delivery", title: "Безкоштовна доставка", description: "Новою Поштою по всій Україні", icon: "truck" },
  { key: "warranty", title: "Гарантія 12 місяців", description: "Від Kondor PC + гарантія виробника", icon: "shield" },
  { key: "support", title: "Технічна підтримка", description: "Telegram 9:00–21:00 щодня", icon: "message-circle" },
  { key: "consult", title: "Безкоштовна консультація", description: "Після покупки допоможемо налаштувати", icon: "help-circle" },
  { key: "return", title: "Повернення 14 днів", description: "Без пояснення причин за законом", icon: "rotate-ccw" },
];

export function includedByKey(key: string): IncludedFeature | undefined {
  return INCLUDED_FEATURES.find((f) => f.key === key);
}
