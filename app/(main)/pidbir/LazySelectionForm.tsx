"use client";

import dynamic from "next/dynamic";
import type { Game } from "@/types/build";
import { SelectionFormSkeleton } from "./SelectionFormSkeleton";

const SelectionFormPanel = dynamic(
  () =>
    import("./SelectionForm").then((m) => ({
      default: m.SelectionForm,
    })),
  { loading: () => <SelectionFormSkeleton />, ssr: false },
);

/** Defers game tiles + form JS until after the hero heading paints (LCP). */
export function LazySelectionForm({ gamesCatalog }: { gamesCatalog: Game[] }) {
  return <SelectionFormPanel gamesCatalog={gamesCatalog} />;
}
