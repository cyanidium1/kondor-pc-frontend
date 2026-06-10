/** Placeholder while contacts load from Sanity. */
export function ContactsPanelSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Завантаження контактів">
      <div className="rounded-lg border border-border bg-surface p-6 space-y-4">
        <div className="h-4 w-24 rounded bg-muted/50" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="size-9 rounded-md bg-muted/30" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-16 rounded bg-muted/40" />
              <div className="h-4 w-40 rounded bg-muted/30" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="h-4 w-24 rounded bg-muted/50 mb-4" />
        <div className="grid gap-2 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md bg-muted/30" />
          ))}
        </div>
      </div>
    </div>
  );
}
