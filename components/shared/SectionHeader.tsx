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
        <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {kicker}
        </div>
      )}
      <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
