import type { CartItem } from "@/lib/cartStore";

import type { MonopayBasket } from "./types";

export function buildMonopayBasket(items: CartItem[]): MonopayBasket {
  return items.map((item) => {
    const sum = item.unitPriceUah * 100;
    const total = sum * item.quantity;

    return {
      name: item.name,
      qty: item.quantity,
      sum,
      total,
      icon: null,
      unit: "шт.",
      code: item.slug,
      barcode: null,
      header: null,
      footer: null,
      tax: [],
      uktzed: null,
    };
  });
}
