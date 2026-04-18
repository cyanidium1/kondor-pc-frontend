"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SkuSlug } from "@/types/build";

const STORAGE_KEY = "kondor-cart-v2";

export interface CartItemOption {
  groupId: string;
  groupLabel: string;
  optionId: string;
  optionLabel: string;
  priceDelta: number;
}

export interface CartItem {
  itemType: "build";
  slug: SkuSlug;
  name: string;
  /** Base price (without configuration). Kept for "cross out" display if needed. */
  priceUah: number;
  /** Resolved unit price = priceUah + sum(options.priceDelta). */
  unitPriceUah: number;
  quantity: number;
  /** Chosen configuration options. Empty/undefined → default config. */
  options?: CartItemOption[];
}

interface AddInput {
  slug: SkuSlug;
  name: string;
  priceUah: number;
  unitPriceUah?: number;
  options?: CartItemOption[];
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  add: (item: AddInput) => void;
  remove: (lineKey: string) => void;
  setQuantity: (lineKey: string, qty: number) => void;
  clear: () => void;
  totalUah: number;
  count: number;
  /** Produce a stable key for a line (slug + options signature). */
  lineKey: (slug: SkuSlug, options?: CartItemOption[]) => string;
}

const CartContext = createContext<CartState | null>(null);

function optionsSignature(options?: CartItemOption[]): string {
  if (!options || options.length === 0) return "base";
  return [...options]
    .map((o) => `${o.groupId}:${o.optionId}`)
    .sort()
    .join("|");
}

function lineKey(slug: SkuSlug, options?: CartItemOption[]): string {
  return `${slug}#${optionsSignature(options)}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        // Backfill unitPriceUah for legacy entries
        const normalized = parsed.map((i) => ({
          ...i,
          unitPriceUah: typeof i.unitPriceUah === "number" ? i.unitPriceUah : i.priceUah,
        }));
        setItems(normalized);
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // quota / SSR
    }
  }, [items, hydrated]);

  const add = useCallback<CartState["add"]>((input) => {
    const unit =
      typeof input.unitPriceUah === "number"
        ? input.unitPriceUah
        : input.priceUah +
          (input.options?.reduce((s, o) => s + o.priceDelta, 0) ?? 0);
    const key = lineKey(input.slug, input.options);
    const qtyAdd = input.quantity ?? 1;
    setItems((curr) => {
      const existing = curr.find(
        (i) => lineKey(i.slug, i.options) === key,
      );
      if (existing) {
        return curr.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + qtyAdd } : i,
        );
      }
      return [
        ...curr,
        {
          itemType: "build",
          slug: input.slug,
          name: input.name,
          priceUah: input.priceUah,
          unitPriceUah: unit,
          quantity: qtyAdd,
          options: input.options,
        },
      ];
    });
  }, []);

  const remove = useCallback<CartState["remove"]>((key) => {
    setItems((curr) => curr.filter((i) => lineKey(i.slug, i.options) !== key));
  }, []);

  const setQuantity = useCallback<CartState["setQuantity"]>((key, qty) => {
    setItems((curr) =>
      qty <= 0
        ? curr.filter((i) => lineKey(i.slug, i.options) !== key)
        : curr.map((i) =>
            lineKey(i.slug, i.options) === key ? { ...i, quantity: qty } : i,
          ),
    );
  }, []);

  const clear = useCallback<CartState["clear"]>(() => setItems([]), []);

  const value = useMemo<CartState>(() => {
    const totalUah = items.reduce(
      (sum, i) => sum + i.unitPriceUah * i.quantity,
      0,
    );
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    return {
      items,
      add,
      remove,
      setQuantity,
      clear,
      totalUah,
      count,
      lineKey,
    };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
