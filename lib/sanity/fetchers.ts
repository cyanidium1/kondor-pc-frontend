import { sanityClient } from "./client";
import {
  ALL_CATEGORIES,
  CATALOG_ITEMS,
  ITEM_BY_SLUG,
  SIMILAR_ITEMS,
  ADDON_ITEMS,
} from "./queries";
import type {
  CategorySummary,
  CatalogProductDetail,
  CatalogProductListItem,
} from "@/types/catalog";

/**
 * Thin server-side fetchers. Next.js caches GROQ responses by URL automatically
 * via its fetch layer; we add explicit `revalidate` hints for clarity.
 */

const REVALIDATE_LIST = 300; // 5 min
const REVALIDATE_DETAIL = 600; // 10 min

export async function getAllCategories(): Promise<CategorySummary[]> {
  return sanityClient.fetch(ALL_CATEGORIES, {}, {
    next: { revalidate: REVALIDATE_LIST, tags: ["sanity:categories"] },
  });
}

export async function getCatalogItems(
  categorySlugs: string[] = [],
): Promise<CatalogProductListItem[]> {
  return sanityClient.fetch(
    CATALOG_ITEMS,
    { categorySlugs },
    {
      next: { revalidate: REVALIDATE_LIST, tags: ["sanity:items"] },
    },
  );
}

export async function getItemBySlug(
  slug: string,
): Promise<CatalogProductDetail | null> {
  return sanityClient.fetch(
    ITEM_BY_SLUG,
    { slug },
    {
      next: {
        revalidate: REVALIDATE_DETAIL,
        tags: ["sanity:items", `sanity:item:${slug}`],
      },
    },
  );
}

export async function getSimilarItems(
  slug: string,
  categorySlug: string,
): Promise<CatalogProductListItem[]> {
  return sanityClient.fetch(
    SIMILAR_ITEMS,
    { slug, categorySlug },
    {
      next: { revalidate: REVALIDATE_LIST, tags: ["sanity:items"] },
    },
  );
}

export async function getAddonItems(): Promise<CatalogProductListItem[]> {
  return sanityClient.fetch(ADDON_ITEMS, {}, {
    next: { revalidate: REVALIDATE_LIST, tags: ["sanity:items", "sanity:addons"] },
  });
}
