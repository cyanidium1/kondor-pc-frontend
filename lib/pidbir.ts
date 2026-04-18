import type { Build, Resolution } from "@/types/build";
import { BUILDS } from "@/lib/mock/builds";

export interface PidbirCriteria {
  games: string[];
  budgetMin: number;
  budgetMax: number;
  resolution?: Resolution;
}

export type BadgeKey = "cheapest" | "recommended" | "with-headroom";

export interface PidbirResult {
  build: Build;
  score: number;
  badge?: BadgeKey;
}

export function parseBudget(input?: string | null): {
  min: number;
  max: number;
} {
  if (!input) return { min: 0, max: 200000 };
  const m = input.match(/^(\d+)-(\d+)$/);
  if (m) return { min: Number(m[1]) * 1000, max: Number(m[2]) * 1000 };
  const single = Number(input);
  if (!Number.isNaN(single)) return { min: 0, max: single };
  return { min: 0, max: 200000 };
}

export function parseGames(input?: string | null): string[] {
  if (!input) return [];
  return input.split(",").filter(Boolean).slice(0, 3);
}

function scoreBuild(build: Build, c: PidbirCriteria): number {
  const res = c.resolution ?? build.targetResolution;
  if (c.games.length === 0) {
    // fallback: use tier ranking
    const tierRank = { starter: 1, base: 2, prime: 3, phantom: 4, pulsar: 5 }[
      build.tier
    ];
    return tierRank * 10;
  }
  return c.games.reduce((sum, slug) => {
    const entry = build.fps.find(
      (f) => f.gameSlug === slug && f.resolution === res,
    );
    return sum + (entry?.fpsAvg ?? 0);
  }, 0);
}

export function pickBuilds(
  c: PidbirCriteria,
  limit = 5,
): { results: PidbirResult[]; fallback: boolean } {
  const inBudget = BUILDS.filter(
    (b) => b.priceUah >= c.budgetMin && b.priceUah <= c.budgetMax,
  );

  let pool = inBudget;
  let fallback = false;
  if (pool.length === 0) {
    // Widen: +40% of max, -20% of min
    pool = BUILDS.filter(
      (b) =>
        b.priceUah >= Math.max(0, c.budgetMin * 0.8) &&
        b.priceUah <= c.budgetMax * 1.4,
    );
    fallback = true;
  }

  const ranked = pool
    .map((build) => ({ build, score: scoreBuild(build, c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (ranked.length >= 2) {
    const priced = [...ranked].sort(
      (a, b) => a.build.priceUah - b.build.priceUah,
    );
    const cheapest = priced[0];
    const expensive = priced[priced.length - 1];
    const middle = ranked[Math.floor(ranked.length / 2)];

    (cheapest as PidbirResult).badge = "cheapest";
    if (expensive !== cheapest) {
      (expensive as PidbirResult).badge = "with-headroom";
    }
    if (middle !== cheapest && middle !== expensive) {
      (middle as PidbirResult).badge = "recommended";
    }
  }

  return { results: ranked, fallback };
}

export const BADGE_META: Record<
  BadgeKey,
  { label: string; tone: "green" | "neutral" | "blue" }
> = {
  cheapest: { label: "💰 Найдоступніше", tone: "neutral" },
  recommended: { label: "✓ Рекомендовано", tone: "green" },
  "with-headroom": { label: "⚡ З запасом", tone: "blue" },
};
