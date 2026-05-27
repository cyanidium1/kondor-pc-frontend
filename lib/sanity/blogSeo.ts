/**
 * Convert Sanity `seoSettings` payload into Next.js Metadata for the blog.
 * Pattern mirrors what nbyg-front's getMetadataFromSanity did, adapted to
 * Kondor PC's SITE_URL and brand defaults.
 */
import type { Metadata } from "next";
import type { PageSeo, SanityImage } from "@/types/blogPost";
import { contentImageUrl } from "./contentClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kondor-pc.ua";

function canonical(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface MetadataFromSeoParams {
  seo: PageSeo | null | undefined;
  path: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

export function buildBlogMetadata({
  seo,
  path,
  defaultTitle = "Блог Kondor PC",
  defaultDescription =
    "Гайди, огляди та поради по ігровим ПК, комплектуючим та оптимізації.",
}: MetadataFromSeoParams): Metadata {
  const canonicalUrl = canonical(path);

  const metaTitle = seo?.metaTitle || defaultTitle;
  const metaDescription = seo?.metaDescription || defaultDescription;

  let keywords: string[] | undefined;
  if (seo?.keywords) {
    if (Array.isArray(seo.keywords)) {
      keywords = seo.keywords.length > 0 ? seo.keywords : undefined;
    } else if (typeof seo.keywords === "string") {
      const parsed = seo.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      keywords = parsed.length > 0 ? parsed : undefined;
    }
  }

  let ogImageUrl: string | undefined;
  if (seo?.opengraphImage) {
    ogImageUrl = contentImageUrl(seo.opengraphImage as unknown as SanityImage)
      .width(1200)
      .height(630)
      .fit("fill")
      .url();
  }

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "uk-UA": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      locale: "uk_UA",
      siteName: "Kondor PC",
      url: canonicalUrl,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: seo?.opengraphImage?.alt || metaTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export function blogCanonicalUrl(path: string): string {
  return canonical(path);
}
