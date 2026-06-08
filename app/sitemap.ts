import type { MetadataRoute } from "next";
import { getAllBuilds } from "@/lib/sanity-pc/builds";
import { LEGAL_PAGES } from "@/lib/mock/legal-pages";
import { fetchLandingSlugs } from "@/lib/sanity/landingAdapter";
import { getAllCategories, getCatalogItems } from "@/lib/sanity/fetchers";
import {
  getAllBlogPostSlugs,
  getAllBlogPosts,
} from "@/lib/sanity/blogFetchers";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kondor-pc.ua";

/**
 * Auto-generated sitemap.
 *
 * Pulls dynamic slugs from Sanity at build/revalidate time:
 *   - /pk/[slug]         — builds (mock + future Sanity, currently mock)
 *   - /catalog/[slug]    — accessory categories
 *   - /catalog/{slug}    — accessory products
 *   - /dlya/[slug]       — Sanity-driven landings (filtering by expiresAt
 *                          happens inside fetchLandingSlugs)
 *   - /promo/[slug]      — promo landings (also expiresAt-filtered)
 *   - /blog              — list
 *   - /blog/[article]    — articles
 *   - /legal/[slug]      — privacy/cookies/terms
 *
 * Site stays noindex (robots.ts blocks bots) — the sitemap is generated
 * pre-launch so when we open indexing, Google has the complete URL graph
 * from day one.
 */
export const revalidate = 60;

type Entry = MetadataRoute.Sitemap[number];
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const builds = await getAllBuilds();

  const staticPages: Entry[] = [
    { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "daily", lastModified: now },
    { url: `${BASE_URL}/pk`, priority: 0.9, changeFrequency: "daily", lastModified: now },
    { url: `${BASE_URL}/catalog`, priority: 0.8, changeFrequency: "daily", lastModified: now },
    { url: `${BASE_URL}/pidbir`, priority: 0.9, changeFrequency: "weekly", lastModified: now },
    { url: `${BASE_URL}/sborka`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${BASE_URL}/garantiya`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE_URL}/dostavka-oplata`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE_URL}/kontakty`, priority: 0.5, changeFrequency: "monthly", lastModified: now },
  ];

  const buildPages: MetadataRoute.Sitemap = builds.map((b) => ({
    url: `${BASE_URL}/pk/${b.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: now,
  }));

  const legalPages: Entry[] = LEGAL_PAGES.map((p) => ({
    url: `${BASE_URL}/legal/${p.slug}`,
    priority: 0.3,
    changeFrequency: "yearly",
    lastModified: new Date(p.updatedAt),
  }));

  // ─── Dynamic from Sanity ────────────────────────────────────────
  // Run in parallel — sitemap shouldn't be a serial chain of waits.
  // Anything that throws is swallowed locally so a single bad fetcher
  // can't blank the sitemap (each branch falls back to []).
  const [
    dlyaSlugs,
    promoSlugs,
    categories,
    catalogItems,
    blogSlugs,
    blogPostsForDates,
  ] = await Promise.all([
    fetchLandingSlugs("dlya").catch(() => [] as string[]),
    fetchLandingSlugs("promo").catch(() => [] as string[]),
    getAllCategories().catch(() => []),
    getCatalogItems().catch(() => []),
    getAllBlogPostSlugs().catch(() => [] as string[]),
    getAllBlogPosts().catch(() => []),
  ]);

  const blogDateBySlug = new Map<string, Date>();
  for (const p of blogPostsForDates) {
    if (p.slug && p._createdAt) {
      blogDateBySlug.set(p.slug, new Date(p._createdAt));
    }
  }

  const dlyaPages: Entry[] = dlyaSlugs.map((slug) => ({
    url: `${BASE_URL}/dlya/${slug}`,
    priority: 0.7,
    changeFrequency: "weekly",
    lastModified: now,
  }));

  const promoPages: Entry[] = promoSlugs.map((slug) => ({
    url: `${BASE_URL}/promo/${slug}`,
    priority: 0.6,
    changeFrequency: "daily",
    lastModified: now,
  }));

  const resolveSlug = (s: unknown): string | undefined => {
    if (typeof s === "string") return s;
    if (s && typeof s === "object" && "current" in s) {
      const v = (s as { current?: unknown }).current;
      return typeof v === "string" ? v : undefined;
    }
    return undefined;
  };

  const categoryPages: Entry[] = [];
  for (const c of categories) {
    const slug = resolveSlug(c.slug);
    if (!slug) continue;
    categoryPages.push({
      url: `${BASE_URL}/catalog/${slug}`,
      priority: 0.6,
      changeFrequency: "weekly",
      lastModified: now,
    });
  }

  const productPages: Entry[] = [];
  for (const item of catalogItems) {
    const slug = resolveSlug(item.slug);
    if (!slug) continue;
    productPages.push({
      url: `${BASE_URL}/catalog/${slug}`,
      priority: 0.6,
      changeFrequency: "weekly",
      lastModified: now,
    });
  }

  const blogPostPages: Entry[] = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: blogDateBySlug.get(slug) ?? now,
  }));

  return [
    ...staticPages,
    ...buildPages,
    ...dlyaPages,
    ...promoPages,
    ...categoryPages,
    ...productPages,
    ...blogPostPages,
    ...legalPages,
  ];
}
