import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Замовлення оформлено",
};

const COPY: Record<
  string,
  { title: string; steps: string[] }
> = {
  monopay: {
    title: "Замовлення оформлено",
    steps: [
      "Отримаєш SMS з підтвердженням",
      "Email з деталями замовлення вже у тебе",
      "За 3–5 днів пришлемо відео твого ПК",
      "Після збірки — відправимо НП та надішлемо трек-номер",
    ],
  },
  monobank_parts: {
    title: "Замовлення оформлено",
    steps: [
      "Підтверджуй розстрочку в додатку Monobank",
      "Після підтвердження — починаємо збірку",
      "3–5 днів на збірку та відео",
      "Відправка НП, трек-номер у email",
    ],
  },
  privat_parts: {
    title: "Замовлення оформлено",
    steps: [
      "Підтверджуй розстрочку в додатку ПриватБанку",
      "Після підтвердження — починаємо збірку",
      "3–5 днів на збірку, потім відправка НП",
    ],
  },
  pumb_parts: {
    title: "Замовлення оформлено",
    steps: [
      "Підтверджуй розстрочку в додатку ПУМБ",
      "Після підтвердження — починаємо збірку",
      "3–5 днів на збірку, потім відправка НП",
    ],
  },
  cod: {
    title: "Замовлення прийнято",
    steps: [
      "Менеджер зателефонує протягом години для підтвердження",
      "Збірка ПК — 3–5 днів",
      "Відео готового ПК",
      "Відправка НП, оплата при отриманні",
    ],
  },
  iban_individual: {
    title: "Заявка на оплату IBAN прийнята",
    steps: [
      "Менеджер зателефонує протягом 2 годин у робочий час",
      "Надішле рахунок на email",
      "Після оплати рахунку починаємо збірку — 3–5 днів",
    ],
  },
  iban_business: {
    title: "Заявка для ФОП / ЮО прийнята",
    steps: [
      "Менеджер зателефонує протягом 2 годин",
      "Надішле рахунок, договір, УПД",
      "Після оплати починаємо збірку",
    ],
  },
  crypto: {
    title: "Заявка на оплату в крипто прийнята",
    steps: [
      "Менеджер напише тобі в Telegram протягом години",
      "Узгодить монету (USDT/BTC/ETH) та адресу гаманця",
      "Після надходження — починаємо збірку",
    ],
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { order, payment } = await searchParams;
  const orderNumber = order ?? "UA-XXXXXX-XXXX";
  const copy = COPY[payment ?? "monopay"] ?? COPY.monopay;

  return (
    <div className="container-narrow py-16 md:py-24">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-[color:var(--fps-green)]/15">
          <Check
            className="size-8 text-[color:var(--fps-green)]"
            strokeWidth={3}
          />
        </div>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Дякуємо за довіру. Номер замовлення:
        </p>
        <div className="tabular mt-1 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-sm">
          {orderNumber}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="mb-4 text-[11px] uppercase tracking-wider text-muted-foreground">
          Що далі
        </div>
        <ol className="tabular space-y-3">
          {copy.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background text-xs font-semibold text-muted-foreground">
                {i + 1}
              </div>
              <div className="text-sm">{step}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
          На головну
        </Link>
        <Link
          href="/pk"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Переглянути каталог
        </Link>
      </div>
    </div>
  );
}
