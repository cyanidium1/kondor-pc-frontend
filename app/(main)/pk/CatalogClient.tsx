"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { BuildCard } from "@/components/shared/BuildCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { GAMES } from "@/lib/mock/games";
import { formatUah } from "@/lib/format";
import type { Build, Resolution } from "@/types/build";
import { cn } from "@/lib/utils";
import Link from "next/link";

const RESOLUTIONS: { value: "all" | Resolution; label: string }[] = [
  { value: "all", label: "Усі" },
  { value: "fullhd", label: "Full HD" },
  { value: "2k", label: "2K" },
  { value: "4k", label: "4K" },
];

const SORTS = [
  { value: "popular", label: "За популярністю" },
  { value: "price_asc", label: "Від дешевих" },
  { value: "price_desc", label: "Від дорогих" },
] as const;

const POPULAR_GAMES = GAMES.filter((g) => g.isPopular);

export function CatalogClient({ builds }: { builds: Build[] }) {
  const [budget, setBudget] = useState<[number, number]>([20, 200]);
  const [gameSlug, setGameSlug] = useState<string | "all">("all");
  const [resolution, setResolution] = useState<"all" | Resolution>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]["value"]>("popular");

  const filtered = useMemo(() => {
    const min = budget[0] * 1000;
    const max = budget[1] * 1000;
    let res = builds.filter(
      (b) => b.priceUah >= min && b.priceUah <= max,
    );
    if (resolution !== "all") {
      res = res.filter((b) => b.fps.some((f) => f.resolution === resolution));
    }
    if (gameSlug !== "all") {
      const wantRes = resolution === "all" ? undefined : resolution;
      res = res.filter((b) =>
        b.fps.some(
          (f) =>
            f.gameSlug === gameSlug &&
            (!wantRes || f.resolution === wantRes) &&
            f.fpsAvg >= 60,
        ),
      );
    }
    if (sort === "price_asc") res.sort((a, b) => a.priceUah - b.priceUah);
    if (sort === "price_desc") res.sort((a, b) => b.priceUah - a.priceUah);
    return res;
  }, [builds, budget, gameSlug, resolution, sort]);

  const activeFilters =
    (budget[0] > 20 || budget[1] < 200 ? 1 : 0) +
    (gameSlug !== "all" ? 1 : 0) +
    (resolution !== "all" ? 1 : 0);

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="sticky top-20 h-fit space-y-6 rounded-lg border border-border bg-surface/60 p-5">
        <div>
          <div className="flex items-center justify-between">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Бюджет
            </Label>
            {activeFilters > 0 && (
              <button
                type="button"
                onClick={() => {
                  setBudget([20, 200]);
                  setGameSlug("all");
                  setResolution("all");
                }}
                className="text-xs text-muted-foreground transition hover:text-foreground"
              >
                Скинути
              </button>
            )}
          </div>
          <div className="tabular mt-2 flex items-baseline justify-between text-sm">
            <span className="font-semibold">{formatUah(budget[0] * 1000)} ₴</span>
            <span className="text-muted-foreground">—</span>
            <span className="font-semibold">{formatUah(budget[1] * 1000)} ₴</span>
          </div>
          <Slider
            className="mt-3"
            min={20}
            max={200}
            step={5}
            value={budget}
            onValueChange={(v) => setBudget([v[0]!, v[1]!] as [number, number])}
          />
        </div>

        <div>
          <Label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Під гру
          </Label>
          <select
            value={gameSlug}
            onChange={(e) => setGameSlug(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus-visible:border-ring focus-visible:outline-none"
          >
            <option value="all">Усі ігри</option>
            {POPULAR_GAMES.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.ukrName || g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Роздільна
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {RESOLUTIONS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setResolution(r.value)}
                className={cn(
                  buttonVariants({
                    variant: resolution === r.value ? "default" : "outline",
                    size: "xs",
                  }),
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Сортування
          </Label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus-visible:border-ring focus-visible:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <div>
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Знайдено: <span className="font-semibold text-foreground">{filtered.length}</span>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-10 text-center">
            <div className="font-display text-xl font-bold">
              За такими критеріями нічого не знайдено
            </div>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Спробуй: збільшити бюджет, прибрати обмеження по роздільній або
              обрати іншу гру.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Button
                variant="default"
                onClick={() => {
                  setBudget([20, 200]);
                  setGameSlug("all");
                  setResolution("all");
                }}
              >
                Скинути фільтри
              </Button>
              <Link
                href="/pidbir"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Пройти підбір
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((b) => (
              <BuildCard
                key={b.slug}
                build={b}
                variant="full"
                highlightGames={
                  gameSlug !== "all"
                    ? [gameSlug]
                    : ["cs2", "warzone", "cyberpunk"]
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
