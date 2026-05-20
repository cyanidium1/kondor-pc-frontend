import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "start",
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
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
      <h2 className="font-display text-[24px] font-bold md:text-[48px]">
        {title}{" "}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-muted-foreground text-[14px] lg:text-[16px] leading-[120%]",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
