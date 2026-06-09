import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getAllBuilds } from "@/lib/sanity-pc/builds";
import { LEGAL_PAGES } from "@/lib/mock/legal-pages";
import { fetchLandingSlugs } from "@/lib/sanity/landingAdapter";
import { getAllCategories, getCatalogItems } from "@/lib/sanity/fetchers";
import { getAllBlogPostSlugs, getAllBlogPosts } from "@/lib/sanity/blogFetchers";

type SitemapUrl = {
  loc: string;
  lastmod: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const DEFAULT_BASE_URL = "https://kondor-pc.ua";

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

async function resolveBaseUrl(): Promise<string> {
  if (SITE_URL) return normalizeBaseUrl(SITE_URL);

  const headersList = await headers();
  const host = headersList.get("host") || headersList.get("x-forwarded-host");

  if (!host) return DEFAULT_BASE_URL;

  const protocol =
    headersList.get("x-forwarded-proto") ||
    (process.env.NODE_ENV === "production" ? "https" : "http");

  return `${protocol}://${host}`;
}

function toIsoDate(value?: string): string {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSitemapXml(baseUrl: string, urls: SitemapUrl[]): string {
  const entries = urls
    .map((url) => {
      const normalizedLoc = url.loc.startsWith("/") ? url.loc : `/${url.loc}`;

      return `  <url>
    <loc>${xmlEscape(`${baseUrl}${normalizedLoc}`)}</loc>
    <lastmod>${toIsoDate(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

function resolveSlug(slugValue: unknown): string | undefined {
  if (typeof slugValue === "string") return slugValue;
  if (slugValue && typeof slugValue === "object" && "current" in slugValue) {
    const current = (slugValue as { current?: unknown }).current;
    return typeof current === "string" ? current : undefined;
  }
  return undefined;
}

export async function GET() {
  try {
    const baseUrl = normalizeBaseUrl(await resolveBaseUrl());
    const now = new Date().toISOString();

    const staticPages: SitemapUrl[] = [
      { loc: "/", lastmod: now, changefreq: "daily", priority: 1.0 },
      { loc: "/pk", lastmod: now, changefreq: "daily", priority: 0.9 },
      { loc: "/catalog", lastmod: now, changefreq: "daily", priority: 0.8 },
      { loc: "/pidbir", lastmod: now, changefreq: "weekly", priority: 0.9 },
      { loc: "/sborka", lastmod: now, changefreq: "monthly", priority: 0.7 },
      { loc: "/blog", lastmod: now, changefreq: "weekly", priority: 0.7 },
      { loc: "/garantiya", lastmod: now, changefreq: "monthly", priority: 0.6 },
      { loc: "/dostavka-oplata", lastmod: now, changefreq: "monthly", priority: 0.6 },
      { loc: "/kontakty", lastmod: now, changefreq: "monthly", priority: 0.5 },
    ];

    const [builds, dlyaSlugs, promoSlugs, categories, catalogItems, blogSlugs, blogPosts] =
      await Promise.all([
        getAllBuilds().catch(() => []),
        fetchLandingSlugs("dlya").catch(() => [] as string[]),
        fetchLandingSlugs("promo").catch(() => [] as string[]),
        getAllCategories().catch(() => []),
        getCatalogItems().catch(() => []),
        getAllBlogPostSlugs().catch(() => [] as string[]),
        getAllBlogPosts().catch(() => []),
      ]);

    const buildPages: SitemapUrl[] = builds.map((build) => ({
      loc: `/pk/${build.slug}`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    }));

    const dlyaPages: SitemapUrl[] = dlyaSlugs.map((slug) => ({
      loc: `/dlya/${slug}`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.7,
    }));

    const promoPages: SitemapUrl[] = promoSlugs.map((slug) => ({
      loc: `/promo/${slug}`,
      lastmod: now,
      changefreq: "daily",
      priority: 0.6,
    }));

    const categoryPages: SitemapUrl[] = categories
      .map((category) => resolveSlug(category.slug))
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({
        loc: `/catalog/${slug}`,
        lastmod: now,
        changefreq: "weekly",
        priority: 0.6,
      }));

    const productPages: SitemapUrl[] = catalogItems
      .map((item) => resolveSlug(item.slug))
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({
        loc: `/catalog/${slug}`,
        lastmod: now,
        changefreq: "weekly",
        priority: 0.6,
      }));

    const blogDateBySlug = new Map<string, string>();
    for (const post of blogPosts) {
      if (post.slug && post._createdAt) {
        blogDateBySlug.set(post.slug, post._createdAt);
      }
    }

    const blogPostPages: SitemapUrl[] = blogSlugs.map((slug) => ({
      loc: `/blog/${slug}`,
      lastmod: blogDateBySlug.get(slug) ?? now,
      changefreq: "monthly",
      priority: 0.6,
    }));

    const legalPages: SitemapUrl[] = LEGAL_PAGES.map((page) => ({
      loc: `/legal/${page.slug}`,
      lastmod: page.updatedAt,
      changefreq: "yearly",
      priority: 0.3,
    }));

    const xml = generateSitemapXml(baseUrl, [
      ...staticPages,
      ...buildPages,
      ...dlyaPages,
      ...promoPages,
      ...categoryPages,
      ...productPages,
      ...blogPostPages,
      ...legalPages,
    ]);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
