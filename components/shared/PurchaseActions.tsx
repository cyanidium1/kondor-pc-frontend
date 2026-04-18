"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useProductConfiguratorOptional } from "@/components/shared/ProductConfigurator";
import type { SkuSlug } from "@/types/build";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PurchaseActions({
  slug,
  name,
  priceUah,
  size = "lg",
  className,
}: {
  slug: SkuSlug;
  name: string;
  priceUah: number;
  size?: "default" | "lg";
  className?: string;
}) {
  const cart = useCart();
  const router = useRouter();
  const config = useProductConfiguratorOptional();
  const [justAdded, setJustAdded] = useState(false);

  const unitPriceUah = config?.resolvedPriceUah ?? priceUah;
  const options = config?.cartOptions;

  function addAndStay() {
    cart.add({
      slug,
      name,
      priceUah,
      unitPriceUah,
      options,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  function buyNow() {
    cart.add({
      slug,
      name,
      priceUah,
      unitPriceUah,
      options,
    });
    router.push("/oformlennya");
  }

  const heightClass = size === "lg" ? "h-12 px-6" : "h-9 px-4";

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <Button size={size} className={cn("flex-1", heightClass)} onClick={buyNow}>
        Купити зараз
      </Button>
      <Button
        size={size}
        variant="outline"
        className={cn("flex-1", heightClass)}
        onClick={addAndStay}
      >
        {justAdded ? (
          <>
            <Check className="mr-1 size-4" strokeWidth={2.5} />
            Додано в кошик
          </>
        ) : (
          "Додати в кошик"
        )}
      </Button>
    </div>
  );
}
