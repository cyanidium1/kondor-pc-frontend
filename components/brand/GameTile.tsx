import Image from "next/image";
import { cn } from "@/lib/utils";

interface GameStyle {
  from: string;
  to: string;
  accent: string;
  emoji: string;
}

const GAME_STYLES: Record<string, GameStyle> = {
  cs2: { from: "oklch(0.55 0.18 35)", to: "oklch(0.25 0.14 30)", accent: "oklch(0.8 0.18 60)", emoji: "🎯" },
  warzone: { from: "oklch(0.55 0.15 55)", to: "oklch(0.22 0.1 45)", accent: "oklch(0.78 0.17 75)", emoji: "🎖️" },
  gta5: { from: "oklch(0.55 0.17 150)", to: "oklch(0.22 0.1 140)", accent: "oklch(0.82 0.16 135)", emoji: "🚗" },
  fortnite: { from: "oklch(0.55 0.2 280)", to: "oklch(0.22 0.15 290)", accent: "oklch(0.78 0.17 290)", emoji: "⚡" },
  dota2: { from: "oklch(0.45 0.17 25)", to: "oklch(0.18 0.12 20)", accent: "oklch(0.72 0.2 30)", emoji: "⚔️" },
  valorant: { from: "oklch(0.55 0.18 15)", to: "oklch(0.22 0.14 10)", accent: "oklch(0.78 0.19 15)", emoji: "💥" },
  minecraft: { from: "oklch(0.5 0.14 155)", to: "oklch(0.2 0.1 150)", accent: "oklch(0.78 0.17 150)", emoji: "⛏️" },
  cyberpunk: { from: "oklch(0.55 0.2 85)", to: "oklch(0.22 0.15 80)", accent: "oklch(0.85 0.18 95)", emoji: "🌆" },
  pubg: { from: "oklch(0.5 0.1 65)", to: "oklch(0.2 0.08 60)", accent: "oklch(0.78 0.13 70)", emoji: "🪖" },
  apex: { from: "oklch(0.55 0.17 20)", to: "oklch(0.22 0.13 15)", accent: "oklch(0.78 0.18 25)", emoji: "🏹" },
};

const DEFAULT_STYLE: GameStyle = {
  from: "oklch(0.3 0.02 265)",
  to: "oklch(0.15 0.02 265)",
  accent: "oklch(0.75 0.05 260)",
  emoji: "🎮",
};

export function GameTile({
  slug,
  name,
  ukrName,
  heavy,
  coverImageUrl,
  className,
  size = "md",
}: {
  slug: string;
  name: string;
  ukrName?: string;
  heavy?: boolean;
  coverImageUrl?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const style = GAME_STYLES[slug] ?? DEFAULT_STYLE;

  const titleSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl md:text-2xl",
  }[size];
  const emojiSize = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  }[size];

  const withCover = Boolean(coverImageUrl);

  return (
    <div
      className={cn("relative overflow-hidden rounded-md", className)}
      style={
        withCover
          ? undefined
          : { backgroundImage: `linear-gradient(135deg, ${style.from}, ${style.to})` }
      }
      aria-hidden
    >
      {/* Cover image backdrop (preferred) */}
      {withCover && (
        <Image
          src={coverImageUrl!}
          alt=""
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      )}

      {/* Dark gradient overlay for text readability */}
      {withCover && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 10%, oklch(0 0 0 / 0.1) 40%, oklch(0 0 0 / 0.85) 100%)",
          }}
        />
      )}

      {/* Grid pattern overlay (subtler when cover present) */}
      <svg
        className={cn(
          "absolute inset-0 size-full",
          withCover ? "opacity-[0.08]" : "opacity-[0.12]",
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${slug}`}
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 18 0 L 0 0 0 18" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${slug})`} />
      </svg>

      {/* Accent glow corner */}
      <div
        className="absolute -right-6 -top-6 size-24 rounded-full blur-2xl"
        style={{ background: style.accent, opacity: withCover ? 0.25 : 0.35 }}
      />

      {/* Top rim */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: style.accent, opacity: 0.7 }}
      />

      <div className="relative flex h-full flex-col justify-between p-4">
        <div
          className={cn(
            "leading-none",
            emojiSize,
            withCover && "drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]",
          )}
        >
          {style.emoji}
        </div>
        <div>
          <div
            className={cn(
              "font-display font-semibold uppercase leading-tight tracking-wide",
              withCover && "drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]",
              titleSize,
            )}
          >
            {ukrName || name}
          </div>
          {heavy && (
            <div className="mt-1 text-[10px] uppercase tracking-wider text-white/60">
              Вимоглива
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
