import type { Metadata } from "next";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { BuildCard } from "@/components/shared/BuildCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { parseBudget, parseGames, pickBuilds, BADGE_META } from "@/lib/pidbir";
import { gameLabel } from "@/lib/mock/games";
import type { Resolution } from "@/types/build";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Результат підбору",
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const games = parseGames(sp.games);
  const { min, max } = parseBudget(sp.budget);
  const resolution = (sp.resolution ?? undefined) as Resolution | undefined;

  const { results, fallback } = pickBuilds({
    games,
    budgetMin: min,
    budgetMax: max,
    resolution,
  });

  const budgetLabel =
    min === 0
      ? `до ${Math.round(max / 1000)}к ₴`
      : `${Math.round(min / 1000)}–${Math.round(max / 1000)}к ₴`;

  const gamesLabel =
    games.length > 0
      ? games.map(gameLabel).join(" + ")
      : "усіх популярних ігор";

  return (
    <div className="container-site py-12 md:py-16">
      <div className="mb-10">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Результат підбору
        </div>
        <h1 className="font-display text-3xl font-bold md:text-5xl">
          Для {gamesLabel}
          <br />
          <span className="text-muted-foreground">у бюджеті {budgetLabel}</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          {fallback
            ? `У точному діапазоні ${budgetLabel} не знайшлось оптимального варіанту. Ось найближчі — з невеликим відхиленням по ціні:`
            : `Знайдено ${results.length} ідеальних варіантів.`}
        </p>
      </div>

      {results.length === 0 ? (
        <FallbackEmpty />
      ) : (
        <>
          <ExplanationBlock games={games} budgetLabel={budgetLabel} />

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => (
              <div key={r.build.slug} className="relative">
                {r.badge && (
                  <div
                    className={cn(
                      "absolute -top-3 left-5 z-10 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                      r.badge === "recommended" &&
                        "border-[color:var(--fps-green)]/50 bg-[color:var(--fps-green)]/10 text-[color:var(--fps-green)]",
                      r.badge === "cheapest" &&
                        "border-border bg-surface text-foreground",
                      r.badge === "with-headroom" &&
                        "border-[color:var(--sku-pulsar)]/50 bg-[color:var(--sku-pulsar)]/10 text-[color:var(--sku-pulsar)]",
                    )}
                  >
                    {BADGE_META[r.badge].label}
                  </div>
                )}
                <BuildCard
                  build={r.build}
                  variant="full"
                  highlightGames={
                    games.length > 0
                      ? games
                      : ["cs2", "warzone", "cyberpunk"]
                  }
                />
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-16 border-t border-border pt-10 text-center">
        <div className="mb-4 text-sm text-muted-foreground">
          Не знайшов оптимальне?
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sborka"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "h-12 px-6")}
          >
            Кастомна збірка під твої вимоги →
          </Link>
          <Link
            href="/pidbir"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Змінити критерії
          </Link>
        </div>
      </div>
    </div>
  );
}

function ExplanationBlock({
  games,
  budgetLabel,
}: {
  games: string[];
  budgetLabel: string;
}) {
  return (
    <aside className="rounded-lg border border-border bg-surface/60 p-5 text-sm">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        💡 Чому саме ці збірки
      </div>
      <p className="text-muted-foreground">
        У бюджет {budgetLabel}
        {games.length > 0 ? (
          <>
            {" "}входять збірки, які дають стабільний FPS у{" "}
            <span className="text-foreground">{games.map(gameLabel).join(", ")}</span>.
          </>
        ) : (
          <> входять збірки різних рівнів потужності.</>
        )}{" "}
        Менш потужні — не дадуть 144 FPS у сучасних іграх; потужніші — переплата
        за запас, який ти не відчуєш.
      </p>
    </aside>
  );
}

function FallbackEmpty() {
  return (
    <div className="rounded-lg border border-border bg-surface p-10 text-center">
      <div className="font-display text-2xl font-bold">
        У цьому діапазоні нічого не знайшлося
      </div>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        Спробуй розширити бюджет або обрати інші ігри.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/pidbir"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Змінити критерії
        </Link>
        <Link href="/pk" className={cn(buttonVariants({ variant: "outline" }))}>
          Переглянути весь каталог
        </Link>
      </div>
    </div>
  );
}
