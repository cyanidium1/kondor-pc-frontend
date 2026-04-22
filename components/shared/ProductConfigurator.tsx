"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { formatUah } from "@/lib/format";
import type { Build, BuildSpecShort, ConfigOption } from "@/types/build";
import type { CartItemOption } from "@/lib/cartStore";

export interface ConfiguratorSelection {
  groupId: string;
  optionId: string;
}

export interface ConfiguratorValue {
  build: Build;
  selections: Record<string, string>;
  select(groupId: string, optionId: string): void;
  /** Base + sum of deltas. */
  resolvedPriceUah: number;
  /** Adjusted old price (preserves original discount magnitude) if `build.oldPriceUah` present. */
  resolvedOldPriceUah?: number;
  /** Same as resolved minus base — useful for the "+ X ₴" labels. */
  deltaUah: number;
  /** Spec panel values reflecting picked options (ram/storage overrides). */
  resolvedSpec: BuildSpecShort;
  /** Rich list of picked options for display and cart. */
  selectedOptions: Array<{
    groupId: string;
    groupLabel: string;
    option: ConfigOption;
  }>;
  /** Serializable options payload for cart.add(). */
  cartOptions: CartItemOption[];
}

const ProductConfiguratorContext = createContext<ConfiguratorValue | null>(
  null,
);

function defaultSelections(build: Build): Record<string, string> {
  const map: Record<string, string> = {};
  for (const group of build.configurableOptions ?? []) {
    const def =
      group.options.find((o) => o.isDefault) ?? group.options[0];
    if (def) map[group.id] = def.id;
  }
  return map;
}

export function ProductConfiguratorProvider({
  build,
  children,
}: {
  build: Build;
  children: ReactNode;
}) {
  const [selections, setSelections] = useState<Record<string, string>>(() =>
    defaultSelections(build),
  );

  const value = useMemo<ConfiguratorValue>(() => {
    const groups = build.configurableOptions ?? [];

    const selectedOptions = groups
      .map((group) => {
        const optionId = selections[group.id];
        const option = group.options.find((o) => o.id === optionId);
        if (!option) return null;
        return { groupId: group.id, groupLabel: group.label, option };
      })
      .filter(
        (x): x is { groupId: string; groupLabel: string; option: ConfigOption } =>
          x !== null,
      );

    const deltaUah = selectedOptions.reduce(
      (s, { option }) => s + option.priceDelta,
      0,
    );
    const resolvedPriceUah = build.priceUah + deltaUah;
    const resolvedOldPriceUah = build.oldPriceUah
      ? build.oldPriceUah + deltaUah
      : undefined;

    const resolvedSpec: BuildSpecShort = { ...build.spec };
    for (const group of groups) {
      if (!group.overridesSpec) continue;
      const picked = selectedOptions.find((s) => s.groupId === group.id);
      if (!picked) continue;
      if (group.overridesSpec === "ram") {
        resolvedSpec.ram = picked.option.label;
        resolvedSpec.ramSpeed =
          picked.option.description?.match(/(\d{3,5})\s*MHz/i)?.[1] ??
          build.spec.ramSpeed;
      } else if (group.overridesSpec === "storage") {
        resolvedSpec.storage = picked.option.label;
      }
    }

    const cartOptions: CartItemOption[] = selectedOptions
      // only include non-default picks in cart payload — cleaner display
      .filter(({ option, groupId }) => {
        const group = groups.find((g) => g.id === groupId);
        const def = group?.options.find((o) => o.isDefault);
        return option.priceDelta !== 0 || option.id !== def?.id;
      })
      .map(({ groupId, groupLabel, option }) => ({
        groupId,
        groupLabel,
        optionId: option.id,
        optionLabel: option.label,
        priceDelta: option.priceDelta,
      }));

    return {
      build,
      selections,
      select: (groupId: string, optionId: string) =>
        setSelections((prev) => ({ ...prev, [groupId]: optionId })),
      resolvedPriceUah,
      resolvedOldPriceUah,
      deltaUah,
      resolvedSpec,
      selectedOptions,
      cartOptions,
    };
  }, [build, selections]);

  return (
    <ProductConfiguratorContext.Provider value={value}>
      {children}
    </ProductConfiguratorContext.Provider>
  );
}

export function useProductConfigurator(): ConfiguratorValue {
  const ctx = useContext(ProductConfiguratorContext);
  if (!ctx)
    throw new Error(
      "useProductConfigurator must be used within <ProductConfiguratorProvider>",
    );
  return ctx;
}

/** Optional variant — returns null if not inside a provider. Useful for shared components (sticky bar). */
export function useProductConfiguratorOptional(): ConfiguratorValue | null {
  return useContext(ProductConfiguratorContext);
}

// ──────────────────────────────────────────────────────────────
//  UI
// ──────────────────────────────────────────────────────────────

export function Configurator({ className }: { className?: string }) {
  const { build, selections, select, deltaUah } = useProductConfigurator();
  const groups = build.configurableOptions ?? [];
  if (groups.length === 0) return null;

  return (
    <div
      className={cn(
        "tabular space-y-4 rounded-md border border-border bg-surface p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Налаштуй під себе
        </div>
        {deltaUah !== 0 && (
          <div
            className={cn(
              "text-xs font-semibold",
              deltaUah > 0
                ? "text-[color:var(--sku)]"
                : "text-[color:var(--fps-green)]",
            )}
          >
            {deltaUah > 0 ? "+" : "−"}
            {formatUah(Math.abs(deltaUah))} ₴
          </div>
        )}
      </div>

      {groups.map((group) => {
        const activeId = selections[group.id];
        return (
          <div key={group.id}>
            <div className="mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              {group.label}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.options.map((opt) => {
                const active = activeId === opt.id;
                const isPositive = opt.priceDelta > 0;
                const isNegative = opt.priceDelta < 0;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => select(group.id, opt.id)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-left text-sm transition",
                      active
                        ? "border-foreground bg-surface-elevated"
                        : "border-border hover:border-white/25",
                    )}
                  >
                    <span className="font-medium">{opt.label}</span>
                    {opt.priceDelta !== 0 && (
                      <span
                        className={cn(
                          "ml-2 text-[11px]",
                          isPositive && "text-muted-foreground",
                          isNegative && "text-[color:var(--fps-green)]",
                        )}
                      >
                        {isPositive && "+"}
                        {formatUah(opt.priceDelta)} ₴
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
