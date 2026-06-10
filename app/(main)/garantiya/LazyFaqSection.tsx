"use client";

import dynamic from "next/dynamic";
import type { Faq } from "@/types/build";

const FaqBlock = dynamic(
  () =>
    import("@/components/shared/FaqBlock").then((m) => ({
      default: m.FaqBlock,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="space-y-2 rounded-lg border border-border p-5"
        aria-busy="true"
        aria-label="Завантаження FAQ"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 rounded bg-muted/30" />
        ))}
      </div>
    ),
  },
);

export function LazyFaqSection({ items }: { items: Faq[] }) {
  return <FaqBlock items={items} />;
}
