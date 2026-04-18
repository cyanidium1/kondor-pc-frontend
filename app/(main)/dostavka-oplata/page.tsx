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

export const metadata: Metadata = {
  title: "Доставка та оплата",
  description:
    "Безкоштовна доставка Новою Поштою по Україні. 8 способів оплати: карта, MonoPay, частинами, IBAN, крипто, накладений платіж.",
};

const DELIVERY = [
  {
    icon: Truck,
    title: "Нова Пошта — відділення",
    price: "Безкоштовно",
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
    title: "Самовивіз із шоуруму",
    price: "Безкоштовно",
    term: "за записом",
    note: "Київ, щодня 10:00–20:00",
  },
];

const PACKING = [
  { icon: Box, text: "Подвійна коробка (зовнішня + оригінальна)" },
  { icon: Shield, text: "Пінопластові вставки на всіх сторонах" },
  { icon: Package, text: "Додаткова фіксація компонентів всередині корпусу" },
  { icon: Truck, text: "Фото упаковки перед відправкою — надсилаємо тобі" },
];

const PAYMENT = [
  { icon: CreditCard, title: "Карта онлайн (MonoPay)", text: "Миттєве підтвердження. Комісія 1.3% додається до суми." },
  { icon: Package, title: "Оплата при отриманні на НП", text: "Для замовлень до 50 000 ₴. Комісія НП: 2% + 20 ₴." },
  { icon: Wallet, title: "Monobank Частинами", text: "4 платежі без %. Оформлення онлайн 2 хв." },
  { icon: Wallet, title: "ПриватБанк Оплата частинами", text: "До 9 платежів без переплати." },
  { icon: Wallet, title: "ПУМБ Частинами", text: "До 12 місяців (% залежить від терміну)." },
  { icon: Banknote, title: "Безготівковий IBAN", text: "Переказ на наш IBAN — для фізосіб." },
  { icon: Building2, title: "ФОП / ЮО — рахунок", text: "Рахунок, договір, УПД, ПДВ за потреби." },
  { icon: Bitcoin, title: "Криптовалюта", text: "USDT, BTC, ETH — за домовленістю з менеджером." },
];

const BUSINESS_DOCS = [
  "Рахунок на оплату",
  "Договір поставки",
  "УПД / видаткова накладна",
  "Акт приймання-передачі",
  "ПДВ за потреби",
];

export default function DeliveryPaymentPage() {
  const faqs = [
    ...faqsByScope("delivery"),
    ...faqsByScope("payment"),
  ];
  const items = faqs.length > 0 ? faqs : FAQS.slice(0, 6);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-site py-20 md:py-28 text-center">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Доставка та оплата
          </div>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Доставка безкоштовно, оплата — як зручно
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Новою Поштою по всій Україні без доплат. 8 способів оплати, у тому
            числі розстрочка без % та безготівковий розрахунок для ФОП/ЮО.
          </p>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="container-site py-16 md:py-20">
        <SectionHeader
          kicker="01 · Доставка"
          title="Способи доставки"
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
              <div className="font-display text-base font-semibold">
                {d.title}
              </div>
              <div className="tabular mt-3 flex items-baseline gap-3">
                <span className="font-display text-xl font-bold">{d.price}</span>
                <span className="text-xs text-muted-foreground">· {d.term}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PACKING */}
      <section className="border-y border-border bg-surface/30">
        <div className="container-site py-16 md:py-20">
          <SectionHeader
            kicker="Як пакуємо"
            title="Як ми упаковуємо ПК для доставки"
            subtitle="Жодної поломки за всі роки доставки. Якщо коробка прийшла пошкодженою — не приймай, ми вирішимо."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {PACKING.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-md border border-border bg-surface p-4"
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

      {/* PAYMENT */}
      <section className="container-site py-16 md:py-20">
        <SectionHeader
          kicker="02 · Оплата"
          title="8 способів оплати"
          subtitle="Вибирай при оформленні замовлення — умови відображаються прямо в чекауті."
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
      <section className="border-y border-border bg-surface/30">
        <div className="container-site py-16 md:py-20">
          <SectionHeader
            kicker="ФОП та ЮО"
            title="Для юридичних осіб"
            subtitle="Оформлюй замовлення як ФОП або ЮО — надамо всі необхідні документи."
          />
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Працюємо з документами
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {BUSINESS_DOCS.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm">
                  <span className="text-[color:var(--fps-green)]">✓</span>
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Для оформлення напиши на{" "}
              <a
                href="mailto:legal@kondor-pc.ua"
                className="text-foreground underline underline-offset-4"
              >
                legal@kondor-pc.ua
              </a>{" "}
              або обери «Для ФОП/ЮО» при оформленні замовлення.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-prose py-16 md:py-20">
        <SectionHeader
          kicker="Часті питання"
          title="Про доставку та оплату"
        />
        <FaqBlock items={items} />
      </section>
    </>
  );
}
