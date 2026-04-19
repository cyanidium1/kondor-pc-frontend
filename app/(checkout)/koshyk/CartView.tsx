"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { PriceBlock } from "@/components/shared/PriceBlock";
import { BuildCard } from "@/components/shared/BuildCard";
import { ChassisArt } from "@/components/brand/ChassisArt";
import { SKU_ACCENTS } from "@/lib/sku-accents";
import { buildBySlug, popularBuilds } from "@/lib/mock/builds";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";

export function CartView() {
  const cart = useCart();

  if (cart.items.length === 0) {
    const suggestions = popularBuilds(["vega", "nebula", "orbitra"]);
    return (
      <div className="space-y-10">
        <div className="rounded-lg border border-border bg-surface p-10 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-background text-2xl">
            🛒
          </div>
          <div className="font-display text-xl font-bold">
            Кошик порожній
          </div>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Ось що може сподобатися:
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {suggestions.map((b) => (
            <BuildCard
              key={b.slug}
              build={b}
              variant="full"
              highlightGames={["cs2", "warzone", "cyberpunk"]}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/pk"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Переглянути каталог →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_340px]">
      <ul className="space-y-3">
        {cart.items.map((item) => {
          const build = buildBySlug(item.slug);
          const key = cart.lineKey(item.slug, item.options);
          return (
            <li
              key={key}
              className="relative overflow-hidden rounded-lg border border-border bg-surface p-4"
              style={{ ["--sku" as string]: SKU_ACCENTS[item.slug] }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-25 blur-3xl"
                style={{ background: "var(--sku)" }}
              />
              <div className="relative flex gap-4">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-md">
                  <ChassisArt compact className="absolute inset-0 size-full" />
                  {build?.heroImageUrl && (
                    <Image
                      src={build.heroImageUrl}
                      alt=""
                      fill
                      sizes="96px"
                      className="relative z-10 object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/pk/${item.slug}`}
                        className="font-display text-xl font-bold uppercase tracking-wider hover:opacity-80"
                      >
                        {item.name}
                      </Link>
                      {build && (
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {build.spec.cpu} · {build.spec.gpu}
                          {build.spec.gpuVram ? ` · ${build.spec.gpuVram}` : ""}
                        </div>
                      )}
                      {item.options && item.options.length > 0 && (
                        <ul className="mt-2 space-y-0.5 text-[11px] text-muted-foreground">
                          {item.options.map((o) => (
                            <li key={o.groupId}>
                              <span className="text-foreground">{o.groupLabel}:</span>{" "}
                              {o.optionLabel}
                              {o.priceDelta !== 0 && (
                                <span className="tabular ml-1">
                                  ({o.priceDelta > 0 ? "+" : ""}
                                  {o.priceDelta.toLocaleString("uk-UA")} ₴)
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.remove(key)}
                      aria-label="Видалити"
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
                    >
                      <X className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div className="tabular mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          cart.setQuantity(key, item.quantity - 1)
                        }
                        className="flex size-8 items-center justify-center rounded-md border border-border transition hover:bg-accent"
                        aria-label="Зменшити"
                      >
                        <Minus className="size-3.5" strokeWidth={2.5} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          cart.setQuantity(key, item.quantity + 1)
                        }
                        className="flex size-8 items-center justify-center rounded-md border border-border transition hover:bg-accent"
                        aria-label="Збільшити"
                      >
                        <Plus className="size-3.5" strokeWidth={2.5} />
                      </button>
                    </div>
                    <div className="font-display text-xl font-bold">
                      {formatPrice(item.unitPriceUah * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        <li>
          <Link
            href="/pk"
            className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm text-muted-foreground transition hover:border-white/25 hover:text-foreground"
          >
            <Plus className="size-4" />
            Додати ще збірку
          </Link>
        </li>
      </ul>

      <aside className="h-fit space-y-4 rounded-lg border border-border bg-surface p-5 md:sticky md:top-20">
        <div>
          <div className="mb-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            Підсумок
          </div>
          <div className="tabular space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Товарів</span>
              <span>{formatPrice(cart.totalUah)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Доставка</span>
              <span>Безкоштовно</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <PriceBlock priceUah={cart.totalUah} size="lg" showInstallment />
        </div>
        <Link
          href="/oformlennya"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 w-full justify-center px-6",
          )}
        >
          Оформити замовлення →
        </Link>
        <p className="text-center text-[11px] uppercase tracking-wider text-muted-foreground">
          Гарантія 12 міс · Повернення 14 днів
        </p>
      </aside>
    </div>
  );
}
