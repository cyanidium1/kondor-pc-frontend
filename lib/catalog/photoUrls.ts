import { lcpImageUrl } from "@/lib/sanity/lcpImageUrl";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImageRef } from "@/types/catalog";

export type CatalogPhotoSet = {
  main: string;
  thumb: string;
  full: string;
  alt: string;
};

export function buildCatalogPhotoUrls(
  photos: SanityImageRef[],
): (CatalogPhotoSet | null)[] {
  return photos.map((p) =>
    p?.asset
      ? {
          main: urlFor(p)
            .width(960)
            .height(960)
            .fit("crop")
            .quality(85)
            .url(),
          thumb: urlFor(p)
            .width(240)
            .height(240)
            .fit("crop")
            .quality(80)
            .url(),
          full: urlFor(p).width(1920).fit("max").quality(90).url(),
          alt: p.alt || "",
        }
      : null,
  );
}

export function catalogLcpSrc(photo?: SanityImageRef): string | null {
  if (!photo?.asset) return null;
  const url = urlFor(photo)
    .width(960)
    .height(960)
    .fit("crop")
    .quality(80)
    .url();
  return lcpImageUrl(url);
}
