/** Reserves catalog layout space while CatalogClient (useSearchParams) loads. */
export function CatalogSkeleton() {
  return (
    <div
      className="grid gap-8 md:grid-cols-[260px_1fr]"
      aria-busy="true"
      aria-label="Завантаження каталогу"
    >
      <aside
        className="h-[520px] rounded-lg border border-border bg-surface/95 p-5 md:sticky md:top-[calc(var(--header-h,64px)+16px)]"
        aria-hidden
      >
        <div className="mb-6 h-3 w-16 rounded bg-muted/60" />
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-3 w-20 rounded bg-muted/60" />
            <div className="h-4 w-full rounded bg-muted/40" />
            <div className="h-1.5 w-full rounded-full bg-muted/50" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-32 rounded bg-muted/60" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 rounded bg-muted/30" />
            ))}
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-4 h-5 w-28 rounded bg-muted/50" aria-hidden />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-border bg-surface"
              aria-hidden
            >
              <div className="aspect-[4/3] bg-muted/40" />
              <div className="space-y-3 p-5">
                <div className="h-7 w-3/4 rounded bg-muted/50" />
                <div className="h-16 rounded bg-muted/30" />
                <div className="h-9 rounded bg-muted/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
