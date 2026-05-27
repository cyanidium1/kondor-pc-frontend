import { RichContent } from "@/components/blocks/RichContent";
import type { ContentNode } from "@/lib/data/types/content";
import { cn } from "@/lib/utils";

type MaxWidth = "narrow" | "normal" | "wide";

const WIDTH: Record<MaxWidth, string> = {
  narrow: "max-w-[720px]",
  normal: "max-w-[880px]",
  wide: "max-w-none",
};

export function TextBlock({
  heading,
  subheading,
  content,
  maxWidth = "narrow",
}: {
  heading?: string;
  subheading?: string;
  content: ContentNode[];
  maxWidth?: MaxWidth;
}) {
  return (
    <div className="container-site py-16 md:py-20">
      <div className={cn("mx-auto", WIDTH[maxWidth])}>
        {heading ? (
          <h2 className="font-display text-[28px] font-bold uppercase leading-[120%] tracking-tight text-foreground lg:text-[40px]">
            {heading}
          </h2>
        ) : null}
        {subheading ? (
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground lg:text-[16px]">
            {subheading}
          </p>
        ) : null}
        <RichContent nodes={content} />
      </div>
    </div>
  );
}
