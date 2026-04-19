import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FaqBlock } from "@/components/shared/FaqBlock";
import { buttonVariants } from "@/components/ui/button";
import { faqsByScope, FAQS } from "@/lib/mock/faqs";
import { cn } from "@/lib/utils";
import { Shield, Wrench, Truck, Phone, MessageSquare, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Гарантія на ігрові ПК до 3 років",
  description:
    "Офіційна гарантія 12 місяців + гарантія виробника на кожен компонент до 3 років. Безкоштовне повернення Новою Поштою при поломці.",
};

const COVERED = [
  "Справність усіх компонентів протягом 12 місяців",
  "Безкоштовне обслуговування та ремонт у цей період",
  "Заміна компонента на новий, якщо ремонт неможливий",
  "Гарантія виробника на кожен компонент (2–5 років)",
  "Безкоштовна доставка до сервісу та назад",
];

const NOT_COVERED = [
  "Механічні пошкодження з вини користувача",
  "Наслідки скачків напруги (радимо ДБЖ)",
  "Псування від рідини або їжі",
  "Самостійне розбирання без нашої присутності",
];

const SERVICE_STEPS = [
  { icon: MessageSquare, title: "Пиши нам", text: "Telegram @kondor_pc або телефон" },
  { icon: Wrench, title: "Опис проблеми", text: "Надсилаєш фото чи відео поломки" },
  { icon: Truck, title: "Безкоштовна доставка НП", text: "Наш сервіс — у Києві" },
  { icon: Shield, title: "Діагностика 1–3 дні", text: "Наш інженер перевіряє систему" },
  { icon: Wrench, title: "Ремонт 3–10 днів", text: "Ремонтуємо або замінюємо компонент" },
  { icon: Truck, title: "Повернення", text: "Відправляємо ПК назад безкоштовно" },
];

const PLANS = [
  { years: 1, price: 0, note: "базовий · включено" },
  { years: 2, price: 3500, note: "захист компонентів" },
  { years: 3, price: 6500, note: "пріоритет + чистки" },
];

export default function WarrantyPage() {
  const faqs = faqsByScope("warranty").length > 0
    ? faqsByScope("warranty")
    : FAQS.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.35 0.08 150 / 0.5), transparent 70%)",
          }}
        />
        <div className="container-site relative py-20 md:py-28 text-center">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Гарантія
          </div>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Гарантія до 3 років
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            12 місяців гарантії від Kondor PC + оригінальна гарантія виробника
            на кожен компонент. Якщо щось зламається — забираємо ПК НП за наш
            рахунок.
          </p>
        </div>
      </section>

      {/* Covered / Not covered */}
      <section className="container-site py-16 md:py-20">
        <SectionHeader
          kicker="Що входить"
          title="Що покриває наша гарантія"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-[color:var(--fps-green)]/30 bg-surface p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--fps-green)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--fps-green)]">
              Покриває
            </div>
            <ul className="space-y-2.5 text-sm">
              {COVERED.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[color:var(--fps-green)]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Не покриває
            </div>
            <ul className="space-y-2.5 text-sm">
              {NOT_COVERED.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-muted-foreground">—</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-surface/30">
        <div className="container-site py-16 md:py-20">
          <SectionHeader
            kicker="Як обслуговуємо"
            title="6 кроків гарантійного випадку"
            subtitle="Середній час обслуговування — 7 робочих днів від звернення до повернення ПК додому."
          />
          <ol className="grid gap-3 md:grid-cols-2">
            {SERVICE_STEPS.map((s, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-lg border border-border bg-surface p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                  <s.icon className="size-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="tabular text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Крок {i + 1}
                  </div>
                  <div className="font-display text-base font-semibold">
                    {s.title}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Extended warranty */}
      <section className="container-site py-16 md:py-20">
        <SectionHeader
          kicker="Розширена гарантія"
          title="Продовж гарантію до 3 років"
          subtitle="Обирай при покупці — додатковий захист, пріоритетне обслуговування, безкоштовні чистки."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.years}
              className={cn(
                "rounded-lg border p-6",
                p.years === 2
                  ? "border-foreground bg-surface-elevated"
                  : "border-border bg-surface",
              )}
            >
              <div className="tabular font-display text-3xl font-bold">
                {p.years} {p.years === 1 ? "рік" : p.years < 5 ? "роки" : "років"}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {p.note}
              </div>
              <div className="tabular mt-4 font-display text-xl font-bold">
                {p.price === 0 ? "Безкоштовно" : `+${p.price.toLocaleString("uk-UA")} ₴`}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts block */}
      <section className="border-y border-border bg-surface/30">
        <div className="container-prose py-16 md:py-20 text-center">
          <SectionHeader
            align="center"
            kicker="Якщо щось зламалося"
            title="Пиши нам одразу"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <a
              href="tel:+380000000000"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Phone className="mr-1.5 size-4" />
              +380 XX XXX XX XX
            </a>
            <a
              href="https://t.me/kondor_pc"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <MessageSquare className="mr-1.5 size-4" />
              Telegram
            </a>
            <a
              href="mailto:support@kondor-pc.ua"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Mail className="mr-1.5 size-4" />
              Email
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Робочі години: щодня 9:00–21:00
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-prose py-16 md:py-20">
        <SectionHeader
          kicker="Часті питання"
          title="Про гарантію"
        />
        <FaqBlock items={faqs} />
      </section>
    </>
  );
}
