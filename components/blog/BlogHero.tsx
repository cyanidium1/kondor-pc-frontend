export default function BlogHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(32,222,255,0.18),transparent_55%)]" />
      <div className="container-site py-16 md:py-24">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-brand-primary">
          Блог Kondor PC
          <span className="ml-3 inline-block size-2 rounded-full bg-brand-primary align-middle" />
        </p>
        <h1 className="font-display text-[32px] font-bold uppercase leading-[110%] text-foreground md:text-[48px] lg:text-[64px]">
          Гайди, огляди та поради
        </h1>
        <p className="mt-5 max-w-[680px] text-[14px] leading-[150%] text-muted-foreground md:text-[16px]">
          Тестуємо залізо, розбираємо ігрові ПК і ділимось знаннями — все, що
          треба знати перед покупкою або апгрейдом.
        </p>
      </div>
    </section>
  );
}
