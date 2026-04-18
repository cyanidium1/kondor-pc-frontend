import { cn } from "@/lib/utils";
import { formatPrice, formatInstallment } from "@/lib/format";

export function PriceBlock({
  priceUah,
  oldPriceUah,
  size = "md",
  showInstallment = true,
  className,
}: {
  priceUah: number;
  oldPriceUah?: number;
  size?: "sm" | "md" | "lg";
  showInstallment?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-5xl",
  };
  const discount = oldPriceUah
    ? Math.round(((oldPriceUah - priceUah) / oldPriceUah) * 100)
    : 0;
  return (
    <div className={cn("tabular space-y-1", className)}>
      <div className="flex items-baseline gap-3">
        <span className={cn("font-display font-bold", sizes[size])}>
          {formatPrice(priceUah)}
        </span>
        {oldPriceUah && (
          <>
            <span className="text-muted-foreground line-through">
              {formatPrice(oldPriceUah)}
            </span>
            <span className="rounded-md bg-destructive/15 px-2 py-0.5 text-xs font-semibold text-destructive">
              −{discount}%
            </span>
          </>
        )}
      </div>
      {showInstallment && (
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          або {formatInstallment(priceUah, 4)} Monobank без %
        </div>
      )}
    </div>
  );
}
