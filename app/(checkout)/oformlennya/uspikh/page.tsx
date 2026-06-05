import type { Metadata } from "next";
import { TechButtonLink } from "@/components/shared/TechButton";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Замовлення оформлено",
};

const COPY: Record<string, { title: string }> = {
  monopay: {
    title: "Замовлення оформлено",
  },
  monobank_parts: {
    title: "Замовлення оформлено",
  },
  privat_parts: {
    title: "Замовлення оформлено",
  },
  pumb_parts: {
    title: "Замовлення оформлено",
  },
  cod: {
    title: "Замовлення прийнято",
  },
  iban_individual: {
    title: "Заявка на оплату IBAN прийнята",
  },
  iban_business: {
    title: "Заявка для ФОП / ЮО прийнята",
  },
  crypto: {
    title: "Заявка на оплату в крипто прийнята",
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
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-brand-primary/15">
          <Check className="size-8 text-brand-primary" strokeWidth={3} />
        </div>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Дякуємо за довіру. Номер замовлення:
        </p>
        <div className="tabular mt-1 rounded-md border border-border bg-surface px-3 py-1.5 font-body text-sm">
          {orderNumber}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <TechButtonLink href="/" variant="white" className="h-12">
          На головну
        </TechButtonLink>
        <TechButtonLink href="/pk" variant="primary" className="h-12">
          Переглянути каталог
        </TechButtonLink>
      </div>
    </div>
  );
}
