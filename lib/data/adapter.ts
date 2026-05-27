/**
 * Single source of data for /dlya landing blocks. Backed by local mocks today.
 * Sanity swap: rewrite each function to use the Sanity client + GROQ.
 * Blocks and pages must NEVER import mocks directly — only through here.
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
import { cs2 } from "./mocks/games/cs2";
import { allBuilds } from "./mocks/builds";
import { allTestimonials } from "./mocks/testimonials";
import { cs2Landing } from "./mocks/pages/cs2-landing";
import { montazh4kLanding } from "./mocks/pages/montazh-4k-landing";
import { montazh4k } from "./mocks/useCases";

const GAMES: Record<string, Game> = { cs2 };
const USE_CASES: Record<string, UseCase> = { "montazh-4k": montazh4k };
const BUILDS_BY_SLUG: Record<string, Build> = Object.fromEntries(
  allBuilds.map((b) => [b.slug, b]),
);
const PAGES_BY_SLUG: Record<string, LandingPage> = {
  cs2: cs2Landing,
  "montazh-4k": montazh4kLanding,
};

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
  const order: Record<Build["tier"], number> = { budget: 0, mid: 1, high: 2 };
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

export async function getLandingPageBySlug(
  slug: string,
): Promise<LandingPage | null> {
  return PAGES_BY_SLUG[slug] ?? null;
}

export async function getAllLandingPageSlugs(): Promise<string[]> {
  return Object.keys(PAGES_BY_SLUG);
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
      displayName: game?.nameUk ?? ref.refSlug,
    };
  }
  if (ref.refType === "use_case") {
    const useCase = await getUseCaseBySlug(ref.refSlug);
    return {
      refType: ref.refType,
      refSlug: ref.refSlug,
      useCase: useCase ?? undefined,
      displayName: useCase?.nameUk ?? ref.refSlug,
    };
  }
  // event — placeholder until events are wired
  return {
    refType: ref.refType,
    refSlug: ref.refSlug,
    displayName: ref.refSlug,
  };
}
