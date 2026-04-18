import { cn } from "@/lib/utils";
import type { Build, Resolution } from "@/types/build";
import { fpsTier, FPS_TIER_META } from "@/lib/fps-thresholds";
import { gameLabel } from "@/lib/mock/games";

const RESOLUTIONS: Resolution[] = ["fullhd", "2k", "4k"];
const RESOLUTION_LABEL: Record<Resolution, string> = {
  fullhd: "Full HD",
  "2k": "2K",
  "4k": "4K",
};

export function FpsTable({
  build,
  className,
}: {
  build: Build;
  className?: string;
}) {
  const gameSlugs = Array.from(new Set(build.fps.map((f) => f.gameSlug)));

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      <div className="tabular">
        {/* header */}
        <div className="grid grid-cols-[1fr_repeat(3,minmax(0,1fr))] gap-px bg-border/50 text-xs uppercase tracking-wider text-muted-foreground">
          <div className="bg-surface px-4 py-3">Гра</div>
          {RESOLUTIONS.map((r) => (
            <div key={r} className="bg-surface px-3 py-3 text-right">
              {RESOLUTION_LABEL[r]}
            </div>
          ))}
        </div>
        {/* rows */}
        <div className="grid gap-px bg-border/50">
          {gameSlugs.map((slug) => {
            const row = RESOLUTIONS.map((r) =>
              build.fps.find((f) => f.gameSlug === slug && f.resolution === r),
            );
            if (!row.some(Boolean)) return null;
            return (
              <div
                key={slug}
                className="grid grid-cols-[1fr_repeat(3,minmax(0,1fr))] gap-px bg-border/50"
              >
                <div className="bg-surface px-4 py-3 text-sm font-medium">
                  {gameLabel(slug)}
                </div>
                {row.map((entry, i) => {
                  if (!entry) {
                    return (
                      <div
                        key={i}
                        className="bg-surface px-3 py-3 text-right text-xs text-muted-foreground/40"
                      >
                        —
                      </div>
                    );
                  }
                  const tier = fpsTier(entry.fpsAvg);
                  return (
                    <div
                      key={i}
                      className="bg-surface px-3 py-3 text-right"
                      title={FPS_TIER_META[tier].note}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <span
                          className={cn(
                            "size-2 shrink-0 rounded-full",
                            tier === "green" && "animate-fps-pulse",
                          )}
                          style={{ background: FPS_TIER_META[tier].colorVar }}
                        />
                        <span className="text-sm font-semibold">
                          {entry.fpsAvg}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          fps
                        </span>
                      </div>
                      {entry.notes && (
                        <div className="mt-0.5 text-[10px] text-muted-foreground">
                          {entry.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {/* legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border bg-surface/60 px-4 py-3 text-xs text-muted-foreground">
        {(["green", "yellow", "orange", "red"] as const).map((tier) => {
          const meta = FPS_TIER_META[tier];
          return (
            <span key={tier} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ background: meta.colorVar }}
              />
              {tier === "green"
                ? "144+"
                : tier === "yellow"
                  ? "60–143"
                  : tier === "orange"
                    ? "30–59"
                    : "<30"}{" "}
              FPS · {meta.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
