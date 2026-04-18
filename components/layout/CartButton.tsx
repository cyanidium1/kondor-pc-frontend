"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";

export function CartButton() {
  const cart = useCart();
  const count = cart.count;
  return (
    <Link
      href="/koshyk"
      aria-label={count > 0 ? `Кошик — ${count}` : "Кошик"}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "relative",
      )}
    >
      <ShoppingBag className="size-4" />
      {count > 0 && (
        <span className="tabular absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background ring-2 ring-background">
          {count}
        </span>
      )}
    </Link>
  );
}
