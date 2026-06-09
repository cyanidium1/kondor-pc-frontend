"use client";

import dynamic from "next/dynamic";
import type { CatalogFilters as CatalogFiltersType } from "@/lib/catalog/pkFilters";
import type { Game } from "@/types/build";
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
  games,
  filters,
}: {
  games: Game[];
  filters: CatalogFiltersType;
}) {
  return <CatalogFiltersPanel games={games} filters={filters} />;
}
