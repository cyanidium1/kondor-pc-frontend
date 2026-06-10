export function TopBuildsSkeleton() {
  return (
    <section
      className="relative container-site py-[92px] lg:pt-[154px] lg:pb-[90px]"
      aria-busy="true"
    >
      <div className="mb-10 h-24 animate-pulse rounded-lg bg-surface/60" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[480px] animate-pulse rounded-lg border border-border bg-surface/40"
          />
        ))}
      </div>
    </section>
  );
}
