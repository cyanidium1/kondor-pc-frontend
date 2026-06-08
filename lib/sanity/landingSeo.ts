import type {Metadata} from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kondor-pc.ua";

function canonical(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface LandingSeoParams {
  seo: {
    title: string;
    description: string;
    ogImage?: string;
    noindex?: boolean;
  };
  path: string;
}

/** Next.js Metadata for /dlya and /promo landing pages from Sanity `page.seo`. */
export function buildLandingMetadata({
  seo,
  path,
}: LandingSeoParams): Metadata {
  const canonicalUrl = canonical(path);

  return {
    title: seo.title,
    description: seo.description,
    ...(seo.noindex
      ? {robots: {index: false, follow: false}}
      : {}),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "uk-UA": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "uk_UA",
      siteName: "Kondor PC",
      url: canonicalUrl,
      images: seo.ogImage
        ? [{url: seo.ogImage, width: 1200, height: 630, alt: seo.title}]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}
