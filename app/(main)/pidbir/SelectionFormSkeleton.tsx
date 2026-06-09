/** Placeholder while SelectionForm JS loads — matches layout to avoid CLS. */
export function SelectionFormSkeleton() {
  return (
    <div className="space-y-12" aria-busy="true" aria-label="Завантаження форми підбору">
      <section>
        <div className="mb-9 md:mb-5 flex flex-col md:flex-row items-baseline justify-between gap-6">
          <div className="h-8 w-48 rounded bg-muted/50" />
          <div className="h-4 w-20 rounded bg-muted/40" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-lg bg-muted/30 lg:aspect-[295/126]"
            />
          ))}
        </div>
      </section>
      <section>
        <div className="mb-5 h-8 w-56 rounded bg-muted/50" />
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[72px] rounded-lg bg-muted/30" />
          ))}
        </div>
      </section>
      <div className="h-[49px] rounded-xl bg-muted/40" />
    </div>
  );
}
