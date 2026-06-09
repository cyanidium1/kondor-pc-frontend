/** Sidebar placeholder while filter controls JS loads. */
export function CatalogFiltersSkeleton() {
  return (
    <aside
      className="sticky top-[calc(var(--header-h,64px)+16px)] z-10 h-[520px] space-y-6 rounded-lg border border-border bg-surface/95 p-5 backdrop-blur-md"
      aria-busy="true"
      aria-label="Завантаження фільтрів"
    >
      <div className="h-3 w-16 rounded bg-muted/60" />
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
  );
}
