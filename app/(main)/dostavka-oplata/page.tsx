import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FaqBlock } from "@/components/shared/FaqBlock";
import { faqsByScope, FAQS } from "@/lib/mock/faqs";
import {
  Truck,
  Package,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  Building2,
  Bitcoin,
  Box,
  Shield,
} from "lucide-react";
import MarqueeLine from "@/components/shared/MarqueeLine";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Доставка та оплата",
  description:
    "Безкоштовна доставка Новою Поштою по Україні. 8 способів оплати: карта, MonoPay, частинами, IBAN, крипто, накладений платіж.",
};

const DELIVERY = [
  {
    icon: Truck,
    title: "Нова Пошта — відділення",
    price: "200–400 ₴",
    term: "1–3 дні",
    note: "Доставка по всій Україні",
  },
  {
    icon: Package,
    title: "Нова Пошта — кур'єр",
    price: "200–400 ₴",
    term: "1–2 дні",
    note: "Залежно від адреси",
  },
  {
    icon: MapPin,
    title: "Самовивіз",
    price: "Безкоштовно",
    term: "за записом",
    note: "Київ",
  },
];

const PACKING = [
  { icon: Package, text: "Страхуємо кожне замовлення на повну вартість" },
  { icon: Package, text: "Додаткова фіксація компонентів всередині корпусу" },
  { icon: Shield, text: "Пінопластові вставки на всіх сторонах" },
];

const PAYMENT = [
  {
    icon: CreditCard,
    title: "Карта онлайн (MonoPay)",
    text: "Миттєве підтвердження. Комісія 1.3% додається до суми.",
  },

  {
    icon: Wallet,
    title: "Monobank Частинами",
    text: "3 платежі без %. Оформлення онлайн 2 хв.",
  },

  {
    icon: Wallet,
    title: "ПУМБ Частинами",
    text: "До 24 місяців (% залежить від терміну).",
  },

  {
    icon: Building2,
    title: "ФОП / ЮО — рахунок",
    text: "Рахунок, договір та закриваючі документи для ФОП/ЮО.",
  },
  {
    icon: Package,
    title: "Оплата при отриманні на НП",
    text: "Для замовлень до 50 000 ₴. Комісія НП: 2% + 20 ₴.",
  },
  {
    icon: Wallet,
    title: "ПриватБанк Оплата частинами",
    text: "До 24 місяців (% залежить від терміну).",
  },
  {
    icon: Banknote,
    title: "Безготівковий IBAN",
    text: "Переказ на наш IBAN — для фізосіб.",
  },
  {
    icon: Bitcoin,
    title: "Криптовалюта",
    text: "USDT, BTC, ETH — за домовленістю з менеджером.",
  },
];

const BUSINESS_DOCS = [
  "Рахунок на оплату",
  "Договір поставки",
  "УПД / видаткова накладна",
  "Акт приймання-передачі",
];

export default function DeliveryPaymentPage() {
  const faqs = [...faqsByScope("delivery"), ...faqsByScope("payment")];
  const items = faqs.length > 0 ? faqs : FAQS.slice(0, 5);

  return (
    <>
      <section className="">
        <div className="container-site py-[50px] lg:pt-[86px] lg:pb-25">
          <SectionHeader
            kicker="Доставка та оплата"
            title="ШВИДКА ДОСТАВКА ПО УКРАЇНІ, ЗРУЧНА ОПЛАТА"
            subtitle="Надійно пакуємо та відправляємо ПК по всій Україні. Доступна розстрочка, безготівкова оплата та кілька способів отримання замовлення."
            titleAs="h1"
            className="mb-0"
            titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10 md:max-w-[1054px]"
            subtitleClassName="text-[14px] lg:text-[16px] leading-[120%] lg:max-w-[644px]"
          />
        </div>
      </section>

      {/* DELIVERY */}
      <section className="container-site pb-[134px] lg:pb-20 rounded-b-[28px] lg:rounded-b-[40px]">
        <SectionHeader
          kicker="01 · Доставка"
          title="Способи доставки"
          className="mb-7 lg:mb-10"
          showKickerDot={false}
          titleClassName="lg:text-[36px]"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {DELIVERY.map((d) => (
            <div
              key={d.title}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                <d.icon className="size-5" strokeWidth={1.5} />
              </div>
              <div className="text-[16px] leading-[120%] font-semibold tracking-wide uppercase">
                {d.title}
              </div>
              <div className="tabular mt-3 flex items-baseline gap-3">
                <span className="font-display text-xl font-bold">
                  {d.price}
                </span>
                <span className="text-xs text-muted-foreground">
                  · {d.term}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PACKING */}
      <section className="">
        <div className="container-site pt-14 pb-[195px] lg:pt-20 lg:pb-[170px]">
          <SectionHeader
            kicker="Як пакуємо"
            title="ЯК МИ УПАКОВУЄМО ПК ДЛЯ ДОСТАВКИ"
            subtitle="Жодної поломки за всі роки доставки. Якщо коробка прийшла пошкодженою — не приймай, ми вирішимо."
            className="mb-[70px]"
            titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10 lg:text-[36px]"
            subtitleClassName="text-[16px] leading-[120%] lg:max-w-[492px]"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {PACKING.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-md border border-border bg-surface p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                  <p.icon className="size-4.5" strokeWidth={1.5} />
                </div>
                <div className="text-sm">{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeLine />

      {/* PAYMENT */}
      <section className="container-site py-[92px] lg:pt-[66px] lg:pb-[76px]">
        <SectionHeader
          kicker="02 · Оплата"
          title="8 способів оплати"
          subtitle="Вибирай при оформленні замовлення — умови відображаються прямо в чекауті."
          className="mb-[92px]"
          titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10"
          subtitleClassName="text-[16px] leading-[120%]"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {PAYMENT.map((p) => (
            <div
              key={p.title}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface p-5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                <p.icon className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-medium">{p.title}</div>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BUSINESS */}
      <section className="rounded-[40px] bg-brand-primary">
        <div className="container-site pt-[233px] pb-16 md:py-20 lg:max-w-[861px]">
          <SectionHeader
            kicker="ФОП та ЮО"
            title="Для юридичних осіб"
            subtitle="Оформлюй замовлення як ФОП або ЮО — надамо всі необхідні документи."
            className="mb-10"
            kickerClassName="text-center text-black"
            titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10 text-center text-black"
            subtitleClassName="text-[14px] lg:text-[16px] leading-[120%] text-center lg:max-w-[424px] lg:mx-auto text-black"
            showKickerDot={false}
          />
          <div className="rounded-lg border border-border bg-surface p-6 mb-9">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Працюємо з документами
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {BUSINESS_DOCS.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-[12px] lg:text-[14px] leading-[120%]"
                >
                  <span className="text-brand-primary">✓</span>
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12px] lg:text-[14px] leading-[120%] text-muted-foreground">
              Для оформлення напиши на{" "}
              <a
                href="mailto:info@kondor-pc.ua"
                className="text-foreground underline underline-offset-1"
              >
                info@kondor-pc.ua
              </a>{" "}
              або обери «Для ФОП/ЮО» при оформленні замовлення.
            </p>
          </div>

          <FaqBlock items={items} />
        </div>
      </section>
    </>
  );
}
