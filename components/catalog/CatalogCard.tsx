"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { TechButton } from "@/components/shared/TechButton";
import {
  AddToCartAnimation,
  FLY_DURATION_MS,
} from "@/components/cart/AddToCartAnimation";
import { useCartStore } from "@/lib/cartStore";
import { formatPrice } from "@/lib/format";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type {
  CatalogColorDot,
  CatalogProductListItem,
  SanityImageRef,
} from "@/types/catalog";

function imageUrl(source: SanityImageRef | undefined, size: number) {
  return source?.asset
    ? urlFor(source).width(size).height(size).fit("crop").quality(85).url()
    : undefined;
}

export function CatalogCard({
  item,
  className,
}: {
  item: CatalogProductListItem;
  className?: string;
}) {
  const { add, openDrawer } = useCartStore();

  const colors: CatalogColorDot[] = useMemo(() => {
    if (!item.colors || item.colors.length === 0) return [];
    // De-dupe on color name — same item sometimes has multiple empty entries.
    const seen = new Set<string>();
    const out: CatalogColorDot[] = [];
    for (const c of item.colors) {
      if (!c?.color) continue;
      const key = c.color.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(c);
    }
    return out;
  }, [item.colors]);

  // The selected (clicked) color drives both the displayed photo and
  // the color sent to cart. Hover on a dot previews without committing.
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const activeIdx = hoverIdx ?? selectedIdx;
  const activeColor = colors[activeIdx];

  const displayImage: SanityImageRef | undefined =
    activeColor?.photo ?? item.heroImage;
  const heroUrl = imageUrl(displayImage, 900);
  const thumbUrl = imageUrl(displayImage, 240);

  const hasDiscount =
    typeof item.priceDiscount === "number" && item.priceDiscount < item.price;
  const finalPrice = hasDiscount ? item.priceDiscount! : item.price;
  const discountPct = hasDiscount
    ? Math.round(((item.price - item.priceDiscount!) / item.price) * 100)
    : 0;

  const [animationKey, setAnimationKey] = useState<number | null>(null);
  const [startPos, setStartPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    const committedColor = colors[selectedIdx];
    // Open drawer immediately — item will "fly in" to the already-open cart.
    openDrawer();
    if (thumbUrl) {
      const rect = e.currentTarget.getBoundingClientRect();
      setStartPos({
        top: rect.top + rect.height / 2 - 30,
        left: rect.left + rect.width / 2 - 30,
      });
      setAnimationKey(Date.now());
    }
    window.setTimeout(() => {
      add({
        itemType: "accessory",
        slug: item.slug,
        name: item.name,
        priceUah: item.price,
        unitPriceUah: finalPrice,
        image: thumbUrl,
        colorCode: committedColor?.code,
        colorName: committedColor?.color,
      });
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1500);
    }, FLY_DURATION_MS);
  }

  const detailHref = activeColor?.color
    ? `/catalog/${item.slug}?color=${encodeURIComponent(activeColor.color)}`
    : `/catalog/${item.slug}`;

  return (
    <>
      <div
        className={cn(
          "card-frame-md group relative flex flex-col overflow-hidden bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:bg-surface/80",
          className,
        )}
      >
        {/* Image area */}
        <Link
          href={detailHref}
          className="relative block aspect-square overflow-hidden"
        >
          {heroUrl ? (
            <Image
              key={heroUrl}
              src={heroUrl}
              alt={displayImage?.alt || item.name}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
              quality={85}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface text-[10px] uppercase tracking-wider text-muted-foreground">
              Без фото
            </div>
          )}

          {/* Badge (top-left) */}
          {item.badge && (
            <span
              className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
              style={{
                background: item.badge.hex || "var(--sku-pulsar, #ffc857)",
              }}
            >
              {item.badge.text}
            </span>
          )}
          {/* NEW indicator */}
          {item.newItem && !item.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
              Новинка
            </span>
          )}
          {/* Preorder pill (top-right) */}
          {item.preorder && (
            <span className="absolute right-3 top-3 rounded-full border border-border bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
              Передзамовлення
            </span>
          )}
          {/* Discount % chip */}
          {hasDiscount && (
            <span className="absolute bottom-3 left-3 rounded-sm bg-foreground px-1.5 py-0.5 text-[10px] font-bold text-background">
              −{discountPct}%
            </span>
          )}
        </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            {item.category && (
              <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.category.name}
              </div>
            )}
            <Link
              href={detailHref}
              className="font-display text-base font-bold uppercase leading-tight tracking-wide hover:opacity-80"
            >
              {item.name}
            </Link>
          </div>

          {/* Color dots */}
          {colors.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {colors.map((c, i) => {
                const active = i === selectedIdx;
                return (
                  <button
                    key={(c.code ?? "") + i}
                    type="button"
                    aria-label={c.color}
                    title={c.color}
                    onClick={() => setSelectedIdx(i)}
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                    className={cn(
                      "relative size-5 rounded-full border transition",
                      active
                        ? "border-foreground ring-1 ring-foreground/40 ring-offset-1 ring-offset-background"
                        : "border-border hover:border-white/40",
                    )}
                    style={{ background: c.hex || "#999" }}
                  />
                );
              })}
              {activeColor && (
                <span className="ml-1 truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                  {activeColor.color}
                </span>
              )}
            </div>
          )}

          {/* Price + CTA group — primary "Купити" + secondary "Детальніше" */}
          <div className="mt-auto space-y-3">
            <div className="flex items-baseline gap-2">
              <div className="font-display tabular text-xl font-bold">
                {formatPrice(finalPrice)}
              </div>
              {hasDiscount && (
                <div className="tabular text-xs text-muted-foreground line-through">
                  {formatPrice(item.price)}
                </div>
              )}
            </div>
            <TechButton
              size="sm"
              className="w-full"
              onClick={handleAdd}
              disabled={justAdded}
            >
              {justAdded ? (
                <>
                  <Check className="mr-1 size-3.5" strokeWidth={2.5} />
                  Додано
                </>
              ) : item.preorder ? (
                "Передзамовити"
              ) : (
                "Купити"
              )}
            </TechButton>
            <Link
              href={detailHref}
              className="group/more flex items-center justify-center gap-1 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              Детальніше · характеристики
              <ArrowRight className="size-3 transition group-hover/more:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {animationKey !== null && startPos && thumbUrl && (
        <AddToCartAnimation
          animationKey={animationKey}
          startPos={startPos}
          image={thumbUrl}
        />
      )}
    </>
  );
}
