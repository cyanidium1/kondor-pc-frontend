import { preload } from "react-dom";
import { BuildCardStatic } from "@/components/shared/BuildCardStatic";
import { lcpImageUrl } from "@/lib/sanity/lcpImageUrl";
import type { Build } from "@/types/build";

export function HomeHeroBuild({ build }: { build: Build }) {
  const src = build.galleryImageUrls?.[0] ?? build.heroImageUrl;
  if (src) {
    preload(lcpImageUrl(src), { as: "image", fetchPriority: "high" });
  }

  return (
    <BuildCardStatic
      build={build}
      variant="full"
      priority
      highlightGames={["cs2", "warzone", "cyberpunk"]}
    />
  );
}
