"use client";

import dynamic from "next/dynamic";
import type {
  AccessoryFilters,
  PriceBounds,
} from "@/lib/catalog/accessoryFilters";
import type { CategorySummary } from "@/types/catalog";
import { CatalogFiltersSkeleton } from "./CatalogFiltersSkeleton";

const CatalogFiltersPanel = dynamic(
  () =>
    import("./CatalogFilters").then((m) => ({
      default: m.CatalogFilters,
    })),
  { loading: () => <CatalogFiltersSkeleton />, ssr: false },
);

/** Defers Slider / Select / Checkbox JS until after the catalog grid paints. */
export function LazyCatalogFilters({
  categories,
  filters,
  priceBounds,
}: {
  categories: CategorySummary[];
  filters: AccessoryFilters;
  priceBounds: PriceBounds;
}) {
  return (
    <CatalogFiltersPanel
      categories={categories}
      filters={filters}
      priceBounds={priceBounds}
    />
  );
}
