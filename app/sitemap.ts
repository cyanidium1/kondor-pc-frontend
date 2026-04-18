import type { MetadataRoute } from "next";
import { BUILDS } from "@/lib/mock/builds";
import { SEO_LANDINGS } from "@/lib/mock/seo-landings";
import { LEGAL_PAGES } from "@/lib/mock/legal-pages";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kondor-pc.ua";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "daily", lastModified: now },
    { url: `${BASE_URL}/pk`, priority: 0.9, changeFrequency: "daily", lastModified: now },
    { url: `${BASE_URL}/pidbir`, priority: 0.9, changeFrequency: "weekly", lastModified: now },
    { url: `${BASE_URL}/sborka`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE_URL}/garantiya`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE_URL}/dostavka-oplata`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE_URL}/kontakty`, priority: 0.5, changeFrequency: "monthly", lastModified: now },
  ];

  const buildPages: MetadataRoute.Sitemap = BUILDS.map((b) => ({
    url: `${BASE_URL}/pk/${b.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: now,
  }));

  const seoPages: MetadataRoute.Sitemap = SEO_LANDINGS.map((l) => ({
    url: `${BASE_URL}/${l.slug}`,
    priority: 0.7,
    changeFrequency: "weekly",
    lastModified: now,
  }));

  const legalPages: MetadataRoute.Sitemap = LEGAL_PAGES.map((p) => ({
    url: `${BASE_URL}/legal/${p.slug}`,
    priority: 0.3,
    changeFrequency: "yearly",
    lastModified: new Date(p.updatedAt),
  }));

  return [...staticPages, ...buildPages, ...seoPages, ...legalPages];
}
