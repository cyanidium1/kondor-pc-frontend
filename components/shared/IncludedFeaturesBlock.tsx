import * as LucideIcons from "lucide-react";
import { Check } from "lucide-react";
import { INCLUDED_FEATURES } from "@/lib/mock/included-features";
import type { IncludedFeature } from "@/types/build";

function iconFor(name: string): React.ComponentType<{ className?: string; strokeWidth?: number }> {
  const pascal = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[pascal];
  return Icon ?? Check;
}

export function IncludedFeaturesBlock({
  featureKeys,
}: {
  featureKeys?: string[];
}) {
  const features: IncludedFeature[] = featureKeys
    ? featureKeys
        .map((k) => INCLUDED_FEATURES.find((f) => f.key === k))
        .filter((f): f is IncludedFeature => Boolean(f))
    : INCLUDED_FEATURES;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {features.map((f) => {
        const Icon = iconFor(f.icon);
        return (
          <li
            key={f.key}
            className="flex items-start gap-3 rounded-md border border-border bg-surface p-4"
          >
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
              <Icon className="size-4" strokeWidth={1.75} />
            </div>
            <div>
              <div className="font-medium">{f.title}</div>
              <div className="text-sm text-muted-foreground">{f.description}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
