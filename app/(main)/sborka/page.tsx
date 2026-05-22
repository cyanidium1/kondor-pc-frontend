import type { Metadata } from "next";
import { CustomBuildForm } from "./CustomBuildForm";
import { Gamepad2, Briefcase, Palette } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Кастомна збірка ПК під замовлення",
  description:
    "Зберемо ПК під твої задачі та бюджет. Менеджер зв'яжеться за 2 години у робочий час.",
};

const WHAT_WE_CAN = [
  {
    icon: Gamepad2,
    title: "Ігровий ПК з нуля",
    text: "Будь-яка конфігурація під твої ігри та бюджет.",
  },
  {
    icon: Briefcase,
    title: "Робоча станція",
    text: "Для монтажу відео, 3D, роботи з AI, програмування.",
  },
  {
    icon: Palette,
    title: "Унікальний дизайн",
    text: "Кастомний корпус, обтяжка, RGB-підсвітка під твій стиль.",
  },
];

const STEPS = [
  "Заповнюєш заявку",
  "Ми зв'яжемося за 2 години",
  "Оплата та збірка (5–7 днів)",
  "Безкоштовна доставка НП",
];

export default function SborkaPage() {
  return (
    <div className="container-site py-16 md:py-24">
      <Reveal>
        <SectionHeader
          kicker="Кастомна збірка"
          title="ЗБІРКА ПІД ТВОЇ ЗАДАЧІ"
          subtitle="Не знайшов ідеальну конфігурацію в каталозі? Зберемо саме те, що тобі потрібно."
          titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10"
          subtitleClassName="text-[16px] leading-[120%]"
          className="mb-12"
        />
      </Reveal>

      <div className="mb-12 grid gap-4 md:grid-cols-3">
        {WHAT_WE_CAN.map((c) => (
          <div
            key={c.title}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
              <c.icon className="size-5" strokeWidth={1.5} />
            </div>
            <div className="font-display text-base font-semibold">
              {c.title}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mb-12 rounded-lg border border-border bg-surface/60 p-5">
        <div className="mb-3 text-[11px] uppercase tracking-wider text-muted-foreground">
          Як ми працюємо
        </div>
        <ol className="tabular flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {STEPS.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-background text-xs font-semibold text-muted-foreground">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <CustomBuildForm />
    </div>
  );
}
