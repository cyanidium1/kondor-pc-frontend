import { ChevronDownIcon } from "lucide-react";
import type { Faq } from "@/types/build";
import { cn } from "@/lib/utils";

/**
 * Server-rendered FAQ for crawlers and no-JS users.
 * Uses native <details> — zero client JS, full Q&A in HTML.
 */
export function FaqBlockSeo({
  items,
  className,
}: {
  items: Faq[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "divide-y divide-border overflow-hidden rounded-lg border border-border",
        className,
      )}
    >
      {items.map((f) => (
        <details
          key={f.key}
          className="group border-0 bg-white text-black [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 text-left marker:content-none hover:no-underline [&::-webkit-details-marker]:hidden">
            <span className="inline-block text-[12px] font-medium leading-[120%] lg:text-[14px]">
              {f.question}
            </span>
            <ChevronDownIcon
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="px-5 pb-5 text-[12px] leading-[120%] text-black lg:text-[14px]">
            {f.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
