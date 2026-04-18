"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SKU_ACCENTS, type SkuSlug } from "@/lib/sku-accents";
import { useCart } from "@/lib/cart";
import { useProductConfiguratorOptional } from "@/components/shared/ProductConfigurator";

export function StickyMobileBuyBar({
  name,
  slug,
  priceUah,
  triggerPx = 520,
}: {
  name: string;
  slug: SkuSlug;
  priceUah: number;
  triggerPx?: number;
}) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const cart = useCart();
  const config = useProductConfiguratorOptional();

  const displayPrice = config?.resolvedPriceUah ?? priceUah;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > triggerPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [triggerPx]);

  function buy() {
    cart.add({
      slug,
      name,
      priceUah,
      unitPriceUah: displayPrice,
      options: config?.cartOptions,
    });
    router.push("/oformlennya");
  }

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden",
        "transition-transform duration-200",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ ["--sku" as string]: SKU_ACCENTS[slug] }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="size-2 shrink-0 rounded-full"
            style={{ background: "var(--sku)" }}
          />
          <div className="min-w-0">
            <div className="font-display text-sm font-bold uppercase truncate">
              {name}
            </div>
            <div className="tabular text-xs text-muted-foreground">
              {formatPrice(displayPrice)}
            </div>
          </div>
        </div>
        <Button size="sm" className="shrink-0 h-9 px-4" onClick={buy}>
          Купити
        </Button>
      </div>
    </div>
  );
}
