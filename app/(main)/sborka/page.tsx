import type { Metadata } from "next";
import { CustomBuildForm } from "./CustomBuildForm";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Кастомна збірка ПК під замовлення",
  description:
    "Зберемо ПК під твої задачі та бюджет. Менеджер зв'яжеться за 2 години у робочий час.",
};

const WHAT_WE_CAN = [
  {
    n: "01",
    title: "ІГРОВИЙ ПК З НУЛЯ",
    text: "Будь-яка конфігурація під твої ігри та бюджет.",
  },
  {
    n: "02",
    title: "РОБОЧА СТАНЦІЯ",
    text: "Для монтажу відео, 3D, роботи з AI, програмування.",
  },
  {
    n: "03",
    title: "УНІКАЛЬНИЙ ДІЗАЙН",
    text: "Кастомний корпус, обтяжка, RGB-підсвітка під твій стиль.",
  },
];

const STEPS = [
  "Заповнюєш заявку",
  "Ми зв'яжемося за 2 години",
  "Оплата та збірка (5–7 днів)",
  "Надійне пакування та страхування посилки НП",
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
          subtitleClassName="text-[16px] leading-[120%] lg:max-w-[430px]"
          className="mb-12"
        />
      </Reveal>

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {WHAT_WE_CAN.map((c) => (
          <div
            key={c.n}
            className="relative overflow-hidden clip-angular-12 bg-brand-primary p-6 min-h-[183px] sm:min-h-[230px] md:min-h-[210px] lg:min-h-[230px] xl:min-h-[183px]"
          >
            <div className="mb-4 flex items-center justify-between" />
            <div className="font-display text-[24px] sm:text-[15px] md:text-[20px] lg:text-[24px] font-semibold leading-[120%] text-black">
              {c.title}
            </div>
            <p className="mt-3 max-w-[204px] text-[12px] leading-[120%] text-black">
              {c.text}
            </p>
            <div className="absolute bottom-[0px] right-[0px] tabular font-heading text-[60px] font-bold text-black lg:bottom-[-27px] lg:right-[-27px] lg:text-[104px]">
              {c.n}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <ol className="tabular flex flex-col sm:flex-row sm:flex-wrap md:items-center gap-x-6 gap-y-3 text-sm">
          {STEPS.map((s, i) => (
            <li
              key={i}
              className="flex items-center gap-4 rounded-[6px] bg-white px-4 py-3"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-background font-display text-xs font-semibold text-white">
                {i + 1}
              </span>
              <span className="font-heading text-[12px] lg:text-[14px] font-medium leading-[120%] text-black uppercase">
                {s}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <CustomBuildForm />
    </div>
  );
}
