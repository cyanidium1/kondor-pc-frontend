"use client";

import { useRouter } from "next/navigation";
import { TechButton } from "@/components/shared/TechButton";
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
  size?: "md" | "lg";
  className?: string;
}) {
  const cart = useCart();
  const router = useRouter();
  const config = useProductConfiguratorOptional();
  const [justAdded, setJustAdded] = useState(false);

  const unitPriceUah = config?.resolvedPriceUah ?? priceUah;
  const options = config?.cartOptions;

  function addAndStay() {
    cart.add({ slug, name, priceUah, unitPriceUah, options });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  function buyNow() {
    cart.add({ slug, name, priceUah, unitPriceUah, options });
    router.push("/oformlennya");
  }

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <TechButton size={size} className="flex-1" onClick={buyNow}>
        Купити зараз
      </TechButton>
      <TechButton
        size={size}
        className="flex-1"
        style={{ ["--tech-accent" as string]: "oklch(1 0 0 / 0.35)" }}
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
      </TechButton>
    </div>
  );
}
