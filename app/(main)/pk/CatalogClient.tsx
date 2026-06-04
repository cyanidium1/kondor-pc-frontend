"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BuildCard } from "@/components/shared/BuildCard";
import { TechButton, TechButtonLink } from "@/components/shared/TechButton";
import { buttonVariants } from "@/components/ui/button";
import { formatUah } from "@/lib/format";
import { makeGameShortLabelMap } from "@/lib/sanity-pc/games";
import type { Build, Game, Resolution } from "@/types/build";
import { cn } from "@/lib/utils";
import ArrowInCircleIcon from "@/components/icons/ArrowInCircleIcon";

const BUDGET_MIN = 20;
const BUDGET_MAX = 200;
const BUDGET_STEP = 5;
const DEFAULT_BUDGET: [number, number] = [BUDGET_MIN, BUDGET_MAX];

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

type SortValue = (typeof SORTS)[number]["value"];

/** Усі ігри та задачі — без фільтра по FPS; custom — обрані slug-и в URL. */
type GameFilterMode = "all" | "custom";

type CatalogFilters = {
  budget: [number, number];
  gameFilterMode: GameFilterMode;
  gameSlugs: string[];
  resolution: "all" | Resolution;
  sort: SortValue;
};

function clampBudget(value: number): number {
  const stepped =
    Math.round(value / BUDGET_STEP) * BUDGET_STEP;
  return Math.min(BUDGET_MAX, Math.max(BUDGET_MIN, stepped));
}

function parseBudgetParam(
  raw: string | null,
  fallback: number,
): number {
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return clampBudget(n);
}

function parseFiltersFromSearchParams(
  searchParams: URLSearchParams | null,
  validGameSlugs: Set<string>,
): CatalogFilters {
  const budget: [number, number] = [
    parseBudgetParam(searchParams?.get("min") ?? null, DEFAULT_BUDGET[0]),
    parseBudgetParam(searchParams?.get("max") ?? null, DEFAULT_BUDGET[1]),
  ];
  if (budget[0] > budget[1]) {
    budget[0] = DEFAULT_BUDGET[0];
    budget[1] = DEFAULT_BUDGET[1];
  }

  // Порожній `?games=` = custom без обраних ігор; відсутній ключ = «Усі ігри».
  const gamesKeyPresent = searchParams?.has("games") ?? false;
  const gamesRaw = searchParams?.get("games")?.trim();
  const gameFilterMode: GameFilterMode = gamesKeyPresent ? "custom" : "all";
  const gameSlugs = gamesKeyPresent
    ? (gamesRaw
        ? gamesRaw
            .split(",")
            .map((s) => s.trim())
            .filter((slug) => slug && validGameSlugs.has(slug))
        : [])
    : [];

  const resRaw = searchParams?.get("res");
  const resolution: "all" | Resolution =
    resRaw === "fullhd" || resRaw === "2k" || resRaw === "4k" ? resRaw : "all";

  const sortRaw = searchParams?.get("sort");
  const sort: SortValue =
    sortRaw === "price_asc" || sortRaw === "price_desc" ? sortRaw : "popular";

  return { budget, gameFilterMode, gameSlugs, resolution, sort };
}

function filtersToQueryString(filters: CatalogFilters): string {
  const sp = new URLSearchParams();

  if (filters.budget[0] !== DEFAULT_BUDGET[0]) {
    sp.set("min", String(filters.budget[0]));
  }
  if (filters.budget[1] !== DEFAULT_BUDGET[1]) {
    sp.set("max", String(filters.budget[1]));
  }
  if (filters.gameFilterMode === "custom") {
    sp.set("games", filters.gameSlugs.join(","));
  }
  if (filters.resolution !== "all") {
    sp.set("res", filters.resolution);
  }
  if (filters.sort !== "popular") {
    sp.set("sort", filters.sort);
  }

  return sp.toString();
}

const DEFAULT_HIGHLIGHT_GAMES = ["cs2", "warzone", "cyberpunk"] as const;

const GAME_FILTER_CHECKBOX_CLASS =
  "border-white bg-transparent data-checked:border-primary data-checked:bg-primary";

export function CatalogClient({
  builds,
  games,
}: {
  builds: Build[];
  games: Game[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const popularGames = games.filter((g) => g.isPopular);
  const gameLabels = Object.fromEntries(
    games.map((g) => [g.slug, g.ukrName || g.name]),
  );
  const gameShortLabels = makeGameShortLabelMap(games);
  const validGameSlugs = useMemo(
    () => new Set(games.map((g) => g.slug)),
    [games],
  );

  const initialFilters = useMemo(
    () => parseFiltersFromSearchParams(searchParams, validGameSlugs),
    [searchParams, validGameSlugs],
  );

  const [budget, setBudget] = useState<[number, number]>(
    () => initialFilters.budget,
  );
  const [gameFilterMode, setGameFilterMode] = useState<GameFilterMode>(
    () => initialFilters.gameFilterMode,
  );
  const [gameSlugs, setGameSlugs] = useState<string[]>(
    () => initialFilters.gameSlugs,
  );
  const [resolution, setResolution] = useState<"all" | Resolution>(
    () => initialFilters.resolution,
  );
  const [sort, setSort] = useState<SortValue>(() => initialFilters.sort);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const hasHydratedFromUrl = useRef(false);
  const hasSyncedToUrl = useRef(false);

  useEffect(() => {
    const fromUrl = parseFiltersFromSearchParams(searchParams, validGameSlugs);
    setBudget(fromUrl.budget);
    setGameFilterMode(fromUrl.gameFilterMode);
    setGameSlugs(fromUrl.gameSlugs);
    setResolution(fromUrl.resolution);
    setSort(fromUrl.sort);
    hasHydratedFromUrl.current = true;
  }, [searchParams, validGameSlugs]);

  useEffect(() => {
    if (!hasHydratedFromUrl.current) return;
    if (!hasSyncedToUrl.current) {
      hasSyncedToUrl.current = true;
      return;
    }
    if (typeof window === "undefined") return;

    const query = filtersToQueryString({
      budget,
      gameFilterMode,
      gameSlugs,
      resolution,
      sort,
    });
    const next = `${window.location.pathname}${query ? `?${query}` : ""}`;
    const current = `${window.location.pathname}${window.location.search}`;
    if (next === current) return;
    router.replace(next, { scroll: false });
  }, [budget, gameFilterMode, gameSlugs, resolution, sort, router]);

  const resetFilters = useCallback(() => {
    setBudget(DEFAULT_BUDGET);
    setGameFilterMode("all");
    setGameSlugs([]);
    setResolution("all");
    setSort("popular");
  }, []);

  const allGamesSelected = gameFilterMode === "all";

  const toggleGame = useCallback((slug: string, checked: boolean) => {
    setGameFilterMode("custom");
    setGameSlugs((prev) =>
      checked ? [...prev, slug] : prev.filter((s) => s !== slug),
    );
  }, []);

  const toggleAllGames = useCallback((checked: boolean) => {
    if (checked) {
      setGameFilterMode("all");
      setGameSlugs([]);
      return;
    }
    setGameFilterMode("custom");
    setGameSlugs([]);
  }, []);

  const filtered = useMemo(() => {
    const min = budget[0] * 1000;
    const max = budget[1] * 1000;
    let res = builds.filter((b) => b.priceUah >= min && b.priceUah <= max);
    if (resolution !== "all") {
      res = res.filter((b) => b.fps.some((f) => f.resolution === resolution));
    }
    if (gameFilterMode === "custom" && gameSlugs.length > 0) {
      const wantRes = resolution === "all" ? undefined : resolution;
      res = res.filter((b) =>
        gameSlugs.every((slug) =>
          b.fps.some(
            (f) =>
              f.gameSlug === slug &&
              (!wantRes || f.resolution === wantRes) &&
              f.fpsAvg >= 60,
          ),
        ),
      );
    }
    if (sort === "price_asc") res.sort((a, b) => a.priceUah - b.priceUah);
    if (sort === "price_desc") res.sort((a, b) => b.priceUah - a.priceUah);
    return res;
  }, [builds, budget, gameFilterMode, gameSlugs, resolution, sort]);

  const activeFilters =
    (budget[0] > BUDGET_MIN || budget[1] < BUDGET_MAX ? 1 : 0) +
    (gameFilterMode === "custom" && gameSlugs.length > 0 ? 1 : 0) +
    (resolution !== "all" ? 1 : 0);

  const highlightGames =
    gameFilterMode === "custom" && gameSlugs.length > 0
      ? gameSlugs
      : [...DEFAULT_HIGHLIGHT_GAMES];

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="sticky top-[calc(var(--header-h,64px)+16px)] z-10 h-fit space-y-6 rounded-lg border border-border bg-surface/95 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Фільтри
          </p>
          <button
            type="button"
            onClick={() => setFiltersExpanded((open) => !open)}
            aria-expanded={filtersExpanded}
            aria-label={
              filtersExpanded ? "Згорнути фільтри" : "Розгорнути фільтри"
            }
            className="md:hidden text-foreground transition-opacity hover:opacity-80"
          >
            <ArrowInCircleIcon
              className={cn(
                "transition-transform duration-300",
                !filtersExpanded && "rotate-180",
              )}
            />
          </button>
        </div>
        {filtersExpanded && (
          <>
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Бюджет
                </Label>
                {activeFilters > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-muted-foreground transition hover:text-foreground"
                  >
                    Скинути
                  </button>
                )}
              </div>
              <div className="tabular mt-2 flex items-baseline justify-between text-sm">
                <span className="font-semibold">
                  {formatUah(budget[0] * 1000)} ₴
                </span>
                <span className="text-muted-foreground">—</span>
                <span className="font-semibold">
                  {formatUah(budget[1] * 1000)} ₴
                </span>
              </div>
              <Slider
                className="mt-3"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={BUDGET_STEP}
                value={budget}
                onValueChange={(v) => {
                  if (Array.isArray(v))
                    setBudget([v[0], v[1]] as [number, number]);
                }}
              />
            </div>

            <div>
              <Label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">
                Під гру або задачу
                {gameFilterMode === "custom" && gameSlugs.length > 0 && (
                  <span className="ml-1.5 normal-case tracking-normal text-foreground">
                    ({gameSlugs.length})
                  </span>
                )}
              </Label>
              <ul className="scrollbar-thin-sidebar max-h-48 space-y-1 overflow-y-auto pr-0.5">
                <li>
                  <label className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm font-medium transition hover:bg-accent/50">
                    <Checkbox
                      className={GAME_FILTER_CHECKBOX_CLASS}
                      checked={allGamesSelected}
                      onCheckedChange={toggleAllGames}
                    />
                    <span className="flex-1">Усі ігри та задачі</span>
                  </label>
                </li>
                {popularGames.map((g) => {
                  const active = allGamesSelected
                    ? true
                    : gameSlugs.includes(g.slug);
                  return (
                    <li key={g.slug}>
                      <label className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm transition hover:bg-accent/50">
                        <Checkbox
                          className={GAME_FILTER_CHECKBOX_CLASS}
                          checked={active}
                          onCheckedChange={(value) =>
                            toggleGame(g.slug, value === true)
                          }
                        />
                        <span className="flex-1">{g.ukrName || g.name}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
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
                        variant:
                          resolution === r.value ? "default" : "outline",
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
              <Select
                value={sort}
                onValueChange={(v) => {
                  if (v) setSort(v as SortValue);
                }}
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue>
                    {SORTS.find((s) => s.value === sort)?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {SORTS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </aside>

      <div>
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Знайдено:{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-10 text-center">
            <div className="font-display text-xl font-bold">
              За такими критеріями нічого не знайдено
            </div>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Спробуй: збільшити бюджет, прибрати обмеження по роздільній або
              обрати менше ігор.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <TechButton
                onClick={resetFilters}
                variant="white"
                className="font-heading tracking-normal h-9"
              >
                Скинути фільтри
              </TechButton>
              <TechButtonLink
                href="/pidbir"
                className="font-heading tracking-normal h-9"
              >
                Пройти підбір
              </TechButtonLink>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((b) => (
              <BuildCard
                key={b.slug}
                build={b}
                variant="full"
                gameLabels={gameLabels}
                gameShortLabels={gameShortLabels}
                highlightGames={highlightGames}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
