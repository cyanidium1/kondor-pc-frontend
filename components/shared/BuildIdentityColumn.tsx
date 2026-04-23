"use client";

import { PriceBlock } from "@/components/shared/PriceBlock";
import { PurchaseActions } from "@/components/shared/PurchaseActions";
import { Configurator, useProductConfigurator } from "@/components/shared/ProductConfigurator";
import { ContactManager } from "@/components/shared/ContactManager";
import { UpgradeSuggestion } from "@/components/shared/UpgradeSuggestion";
import { formatInstallment } from "@/lib/format";
import type { BuildStatus } from "@/types/build";

const STATUS = {
  in_stock: { label: "В наявності — відправимо завтра", dot: "var(--fps-green)" },
  assemble_on_order: { label: "Збираємо під замовлення", dot: "var(--fps-yellow)" },
  out_of_stock: { label: "Немає в наявності", dot: "var(--fps-red)" },
  archived: { label: "Архів", dot: "var(--muted-foreground)" },
} as const;

export function BuildIdentityColumn() {
  const { build, resolvedPriceUah, resolvedOldPriceUah, resolvedSpec } =
    useProductConfigurator();
  const status = STATUS[build.status as BuildStatus];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Ігровий ПК · {build.tier}
        </div>
        <h1 className="font-display text-5xl font-bold uppercase leading-[1] tracking-tight md:text-6xl">
          {build.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{build.shortTagline}</p>
      </div>

      <div className="tabular grid grid-cols-2 gap-3 rounded-md border border-border bg-surface p-4 text-sm">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Процесор
          </div>
          <div className="font-semibold">{resolvedSpec.cpu}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Відеокарта
          </div>
          <div className="font-semibold">
            {resolvedSpec.gpu}
            {resolvedSpec.gpuVram && (
              <span className="text-muted-foreground">
                {" "}
                · {resolvedSpec.gpuVram}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            ОЗП
          </div>
          <div className="font-semibold">{resolvedSpec.ram}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Накопичувач
          </div>
          <div className="font-semibold">{resolvedSpec.storage}</div>
        </div>
      </div>

      <Configurator />

      <PriceBlock
        priceUah={resolvedPriceUah}
        oldPriceUah={resolvedOldPriceUah}
        size="lg"
        showInstallment={false}
      />

      <div className="tabular rounded-md border border-border bg-surface p-4 text-sm">
        <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          Або в розстрочку без %
        </div>
        <div className="grid gap-1.5">
          <div className="flex justify-between">
            <span>Monobank Частинами</span>
            <span className="font-medium">
              {formatInstallment(resolvedPriceUah, 4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>ПриватБанк</span>
            <span className="font-medium">до 9 платежів</span>
          </div>
          <div className="flex justify-between">
            <span>ПУМБ</span>
            <span className="font-medium">до 12 місяців</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-border bg-surface/60 px-3 py-2 text-sm">
        <span
          className="size-2 rounded-full"
          style={{ background: status.dot }}
        />
        <span>{status.label}</span>
        {build.status === "assemble_on_order" && (
          <span className="ml-auto text-xs text-muted-foreground">
            · {build.assemblyDays} дні
          </span>
        )}
      </div>

      <UpgradeSuggestion />

      <PurchaseActions
        slug={build.slug}
        name={build.name}
        priceUah={build.priceUah}
      />

      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
        Доставка безкоштовно · Гарантія 12 міс · Повернення 14 днів
      </div>

      <ContactManager buildName={build.name} priceUah={build.priceUah} />
    </div>
  );
}
