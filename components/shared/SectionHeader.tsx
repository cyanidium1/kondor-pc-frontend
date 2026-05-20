import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "start",
  className,
  titleClassName,
  subtitleClassName,
}: {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <header
      className={cn(
        "mb-10 flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && (
        <div className="text-[8px] lg:text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {kicker}
          <span className="inline-block ml-3 lg:ml-5.5 size-2 lg:size-3 rounded-full bg-brand-primary" />
        </div>
      )}
      <h2
        className={cn(
          "font-display text-[24px] font-bold lg:text-[48px] leading-[120%]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-muted-foreground text-[14px] lg:text-[16px] leading-[120%]",
            align === "center" && "mx-auto",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
