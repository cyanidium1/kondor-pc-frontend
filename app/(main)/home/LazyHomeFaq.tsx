"use client";

import dynamic from "next/dynamic";
import type { Faq } from "@/types/build";

const FaqBlock = dynamic(
  () =>
    import("@/components/shared/FaqBlock").then((m) => ({
      default: m.FaqBlock,
    })),
  { ssr: false },
);

export function LazyHomeFaq({ items }: { items: Faq[] }) {
  return <FaqBlock items={items} />;
}
