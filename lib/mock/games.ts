import type { Game } from "@/types/build";

/**
 * Steam CDN header images — publicly served, stable URLs.
 * For games outside Steam (Fortnite, Valorant, Minecraft), GameTile falls back
 * to its gradient+emoji pattern until the client ships artwork via Sanity.
 */
const steamHeader = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

export const GAMES: Game[] = [
  {
    slug: "cs2",
    name: "Counter-Strike 2",
    ukrName: "Контр Страйк 2",
    genre: "fps",
    isPopular: true,
    coverImageUrl: steamHeader(730),
  },
  {
    slug: "warzone",
    name: "Call of Duty: Warzone",
    ukrName: "Warzone",
    genre: "battle_royale",
    isPopular: true,
    isSystemHeavy: true,
    // Warzone on Steam is bundled with Modern Warfare — no standalone header; fallback tile.
  },
  {
    slug: "gta5",
    name: "Grand Theft Auto V",
    ukrName: "GTA 5",
    genre: "sandbox",
    isPopular: true,
    isSystemHeavy: true,
    coverImageUrl: steamHeader(271590),
  },
  {
    slug: "fortnite",
    name: "Fortnite",
    ukrName: "Фортнайт",
    genre: "battle_royale",
    isPopular: true,
    // Epic-only; tile fallback
  },
  {
    slug: "dota2",
    name: "Dota 2",
    ukrName: "Дота 2",
    genre: "moba",
    isPopular: true,
    coverImageUrl: steamHeader(570),
  },
  {
    slug: "valorant",
    name: "Valorant",
    ukrName: "Валорант",
    genre: "fps",
    isPopular: true,
    // Riot-only; tile fallback
  },
  {
    slug: "minecraft",
    name: "Minecraft",
    ukrName: "Майнкрафт",
    genre: "sandbox",
    isPopular: true,
    // Mojang/Microsoft-only; tile fallback
  },
  {
    slug: "cyberpunk",
    name: "Cyberpunk 2077",
    genre: "rpg",
    isPopular: true,
    isSystemHeavy: true,
    coverImageUrl: steamHeader(1091500),
  },
  {
    slug: "pubg",
    name: "PUBG",
    genre: "battle_royale",
    isSystemHeavy: true,
    coverImageUrl: steamHeader(578080),
  },
  {
    slug: "apex",
    name: "Apex Legends",
    ukrName: "Apex",
    genre: "battle_royale",
    isSystemHeavy: true,
    coverImageUrl: steamHeader(1172470),
  },
];

export function gameBySlug(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export function gameLabel(slug: string): string {
  const g = gameBySlug(slug);
  return g?.ukrName || g?.name || slug;
}
