/**
 * Single source of data for /dlya and /promo landing blocks.
 *
 * Sanity-first since Sprint 2: pages live in the kondor-pc-admin project
 * (`if6dzz62`). Local mocks remain as fallback for `cs2` and `montazh-4k`
 * because those pages use rich game-context blocks (FPS tables, system specs,
 * recommended builds) that depend on the still-mocked `Game` / `Build` data.
 *
 * Block components and pages must NEVER import mocks or the Sanity client
 * directly — only through this adapter.
 */
import type {
  Build,
  Game,
  LandingPage,
  LandingPageContextRef,
  ResolvedPageContext,
  Testimonial,
  UseCase,
} from "./types";
import {cs2} from "./mocks/games/cs2";
import {allBuilds} from "./mocks/builds";
import {allTestimonials} from "./mocks/testimonials";
import {cs2Landing} from "./mocks/pages/cs2-landing";
import {montazh4kLanding} from "./mocks/pages/montazh-4k-landing";
import {montazh4k} from "./mocks/useCases";
import {
  fetchLandingPageBySlug,
  fetchLandingSlugs,
  buildSanityPageContext,
  type LandingPathPrefix,
} from "@/lib/sanity/landingAdapter";

const GAMES: Record<string, Game> = {cs2};
const USE_CASES: Record<string, UseCase> = {"montazh-4k": montazh4k};
const BUILDS_BY_SLUG: Record<string, Build> = Object.fromEntries(
  allBuilds.map((b) => [b.slug, b]),
);
const MOCK_PAGES_BY_SLUG: Record<string, LandingPage> = {
  cs2: cs2Landing,
  "montazh-4k": montazh4kLanding,
};
const MOCK_SLUGS = new Set(Object.keys(MOCK_PAGES_BY_SLUG));

export async function getGameBySlug(slug: string): Promise<Game | null> {
  return GAMES[slug] ?? null;
}

export async function getUseCaseBySlug(slug: string): Promise<UseCase | null> {
  return USE_CASES[slug] ?? null;
}

export async function getBuildBySlug(slug: string): Promise<Build | null> {
  return BUILDS_BY_SLUG[slug] ?? null;
}

export async function getAllBuilds(): Promise<Build[]> {
  return allBuilds;
}

export async function getBuildsRecommendedForGame(
  gameSlug: string,
): Promise<Build[]> {
  const order: Record<Build["tier"], number> = {budget: 0, mid: 1, high: 2};
  const matches = allBuilds
    .filter((b) => b.recommendedForGames.includes(gameSlug))
    .sort((a, b) => order[a.tier] - order[b.tier]);
  if (matches.length >= 3) return matches.slice(0, 3);
  const fallback = [...allBuilds].sort(
    (a, b) => order[a.tier] - order[b.tier],
  );
  const seen = new Set(matches.map((m) => m.slug));
  for (const b of fallback) {
    if (matches.length >= 3) break;
    if (!seen.has(b.slug)) {
      matches.push(b);
      seen.add(b.slug);
    }
  }
  return matches.slice(0, 3);
}

export async function getTestimonialsByGameTag(
  gameTag: string,
  limit?: number,
): Promise<Testimonial[]> {
  const list = allTestimonials.filter((t) => t.gameTags.includes(gameTag));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/**
 * Resolve a landing page by slug + path prefix.
 *
 * Strategy:
 *   1. For /dlya/{cs2,montazh-4k} → rich mocks (game-context blocks
 *      not yet modelled in Sanity).
 *   2. Otherwise → Sanity.
 *   3. Last-resort fallback to mocks by slug alone.
 */
export async function getLandingPageBySlug(
  slug: string,
  prefix: LandingPathPrefix = "dlya",
): Promise<LandingPage | null> {
  if (prefix === "dlya" && MOCK_SLUGS.has(slug)) {
    return MOCK_PAGES_BY_SLUG[slug];
  }
  const sanity = await fetchLandingPageBySlug(slug, prefix);
  if (sanity) return sanity;
  if (prefix === "dlya" && MOCK_PAGES_BY_SLUG[slug]) {
    return MOCK_PAGES_BY_SLUG[slug];
  }
  return null;
}

export async function getAllLandingPageSlugs(
  prefix: LandingPathPrefix = "dlya",
): Promise<string[]> {
  const sanitySlugs = await fetchLandingSlugs(prefix);
  if (prefix === "dlya") {
    const set = new Set<string>([
      ...Object.keys(MOCK_PAGES_BY_SLUG),
      ...sanitySlugs,
    ]);
    return [...set];
  }
  return sanitySlugs;
}

export async function resolvePageContext(
  ref: LandingPageContextRef,
): Promise<ResolvedPageContext> {
  if (ref.refType === "game") {
    const game = await getGameBySlug(ref.refSlug);
    return {
      refType: ref.refType,
      refSlug: ref.refSlug,
      game: game ?? undefined,
      displayName: game?.nameUk ?? prettifySlug(ref.refSlug),
    };
  }
  if (ref.refType === "use_case") {
    const useCase = await getUseCaseBySlug(ref.refSlug);
    return {
      refType: ref.refType,
      refSlug: ref.refSlug,
      useCase: useCase ?? undefined,
      displayName: useCase?.nameUk ?? prettifySlug(ref.refSlug),
    };
  }
  // event / Sanity-promo placeholder
  return {
    refType: ref.refType,
    refSlug: ref.refSlug,
    displayName: prettifySlug(ref.refSlug),
  };
}

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export type {LandingPathPrefix};
export {buildSanityPageContext};
